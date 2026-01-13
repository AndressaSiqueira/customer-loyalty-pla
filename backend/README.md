# Customer Loyalty Platform - Backend API

A Node.js/Express backend API for the Customer Loyalty Platform, designed to be deployed on Azure Kubernetes Service (AKS).

## Features

- RESTful API for dashboard KPIs and operational health data
- Support for both PostgreSQL and Azure SQL databases
- TypeScript for type safety
- Docker containerization
- Kubernetes-ready with manifests for AKS deployment
- Health check endpoints
- Horizontal Pod Autoscaling (HPA)

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL or Azure SQL Database
- Docker (for containerization)
- kubectl (for Kubernetes deployment)
- Azure CLI (for AKS deployment)

## Installation

### Local Development

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Initialize database**
   
   For PostgreSQL:
   ```bash
   psql -U postgres -d loyalty_platform -f database/schema.sql
   ```
   
   For Azure SQL:
   ```bash
   sqlcmd -S your-server.database.windows.net -d loyalty_platform -U sqladmin -P your-password -i database/schema-mssql.sql
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Health Check
- `GET /api/health` - API health status

### Dashboard Data
- `GET /api/dashboard` - Complete dashboard data (KPIs + operational health)
- `GET /api/kpis` - KPI metrics only
- `GET /api/operational-health` - Operational health metrics only

### Response Format

All endpoints return responses in the following format:

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-13T21:48:00.000Z"
}
```

## Docker

### Build Docker Image

```bash
cd backend
docker build -t loyalty-api:latest .
```

### Run Docker Container

```bash
docker run -d \
  -p 3000:3000 \
  -e DB_TYPE=postgres \
  -e DB_HOST=your-db-host \
  -e DB_PORT=5432 \
  -e DB_NAME=loyalty_platform \
  -e DB_USER=postgres \
  -e DB_PASSWORD=your-password \
  --name loyalty-api \
  loyalty-api:latest
```

## Azure Kubernetes Service (AKS) Deployment

### Prerequisites

1. **Create AKS cluster**
   ```bash
   az aks create \
     --resource-group loyalty-platform-rg \
     --name loyalty-platform-aks \
     --node-count 3 \
     --enable-managed-identity \
     --generate-ssh-keys
   ```

2. **Get AKS credentials**
   ```bash
   az aks get-credentials \
     --resource-group loyalty-platform-rg \
     --name loyalty-platform-aks
   ```

3. **Create Azure Container Registry (ACR)**
   ```bash
   az acr create \
     --resource-group loyalty-platform-rg \
     --name loyaltyplatformacr \
     --sku Standard
   ```

4. **Attach ACR to AKS**
   ```bash
   az aks update \
     --resource-group loyalty-platform-rg \
     --name loyalty-platform-aks \
     --attach-acr loyaltyplatformacr
   ```

### Build and Push Docker Image

```bash
# Login to ACR
az acr login --name loyaltyplatformacr

# Tag and push image
docker tag loyalty-api:latest loyaltyplatformacr.azurecr.io/loyalty-api:latest
docker push loyaltyplatformacr.azurecr.io/loyalty-api:latest
```

### Deploy to AKS

1. **Update the deployment manifest**
   
   Edit `k8s/deployment.yaml` and replace `${CONTAINER_REGISTRY}` with your ACR name:
   ```yaml
   image: loyaltyplatformacr.azurecr.io/loyalty-api:latest
   ```

2. **Update ConfigMap with your database settings**
   
   Edit `k8s/configmap.yaml` to configure your database connection.

3. **Update Secret with your database credentials**
   
   Edit `k8s/secret.yaml` or create the secret directly:
   ```bash
   kubectl create secret generic loyalty-api-secrets \
     --from-literal=DB_USER=your-user \
     --from-literal=DB_PASSWORD=your-password
   ```

4. **Deploy to Kubernetes**
   ```bash
   # Apply Kubernetes manifests
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/secret.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   kubectl apply -f k8s/hpa.yaml
   ```

5. **Verify deployment**
   ```bash
   # Check pods
   kubectl get pods -l app=loyalty-api
   
   # Check service
   kubectl get service loyalty-api-service
   
   # Get external IP (may take a few minutes)
   kubectl get service loyalty-api-service -w
   ```

6. **Test the API**
   ```bash
   # Once external IP is assigned
   curl http://<EXTERNAL-IP>/api/health
   ```

## Database Configuration

### PostgreSQL (Recommended for Development)

Set these environment variables:
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=loyalty_platform
DB_USER=postgres
DB_PASSWORD=your-password
DB_SSL=false
```

### Azure SQL (Recommended for Production)

Set these environment variables:
```env
DB_TYPE=mssql
DB_SERVER=your-server.database.windows.net
DB_NAME=loyalty_platform
DB_USER=sqladmin
DB_PASSWORD=your-secure-password
```

## Monitoring and Scaling

### View Logs

```bash
# View all logs
kubectl logs -l app=loyalty-api --tail=100 -f

# View specific pod logs
kubectl logs <pod-name> -f
```

### Check HPA Status

```bash
kubectl get hpa loyalty-api-hpa
```

### Manual Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment loyalty-api --replicas=5
```

## Troubleshooting

### Database Connection Issues

1. Verify database credentials in ConfigMap and Secret
2. Check database firewall rules (Azure SQL)
3. Verify network connectivity from AKS to database
4. Check pod logs for connection errors

### Pod Startup Issues

```bash
# Describe pod to see events
kubectl describe pod <pod-name>

# Check pod logs
kubectl logs <pod-name>
```

### Service Not Accessible

```bash
# Check service endpoints
kubectl get endpoints loyalty-api-service

# Verify pod status
kubectl get pods -l app=loyalty-api
```

## Security Best Practices

1. **Never commit secrets**: Use Kubernetes Secrets or Azure Key Vault
2. **Enable SSL/TLS**: For database connections in production
3. **Use managed identities**: For Azure resource access
4. **Network policies**: Restrict pod-to-pod communication
5. **Regular updates**: Keep dependencies and base images updated

## Architecture

```
┌─────────────────┐
│   LoadBalancer  │
│    (Service)    │
└────────┬────────┘
         │
    ┌────▼────┐
    │   HPA   │
    └────┬────┘
         │
┌────────▼─────────┐
│   Deployment     │
│   (2-10 pods)    │
└────────┬─────────┘
         │
    ┌────▼────┐
    │  Pods   │
    │ (API)   │
    └────┬────┘
         │
    ┌────▼────────┐
    │  Database   │
    │  (Azure SQL │
    │   or PgSQL) │
    └─────────────┘
```

## License

MIT
