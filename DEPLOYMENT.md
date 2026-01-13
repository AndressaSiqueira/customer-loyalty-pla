# Deployment Guide - Customer Loyalty Platform

This guide provides step-by-step instructions for deploying the Customer Loyalty Platform to Azure Kubernetes Service (AKS).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend API Deployment](#backend-api-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- **Azure Subscription** with appropriate permissions
- **Azure CLI** installed and configured (`az --version`)
- **kubectl** installed (`kubectl version --client`)
- **Docker** installed (`docker --version`)
- **Node.js 20+** installed (`node --version`)

### Login to Azure

```bash
az login
az account set --subscription "your-subscription-id"
```

## Database Setup

### Option 1: Azure SQL Database (Recommended for Production)

1. **Create Resource Group**
   ```bash
   az group create \
     --name loyalty-platform-rg \
     --location eastus
   ```

2. **Create Azure SQL Server**
   ```bash
   az sql server create \
     --name loyalty-platform-sql \
     --resource-group loyalty-platform-rg \
     --location eastus \
     --admin-user sqladmin \
     --admin-password 'YourSecureP@ssw0rd123!'
   ```

3. **Configure Firewall (Allow Azure Services)**
   ```bash
   az sql server firewall-rule create \
     --resource-group loyalty-platform-rg \
     --server loyalty-platform-sql \
     --name AllowAzureServices \
     --start-ip-address 0.0.0.0 \
     --end-ip-address 0.0.0.0
   ```

4. **Create Database**
   ```bash
   az sql db create \
     --resource-group loyalty-platform-rg \
     --server loyalty-platform-sql \
     --name loyalty_platform \
     --service-objective S0
   ```

5. **Initialize Schema**
   ```bash
   # Connect using sqlcmd or Azure Data Studio
   sqlcmd -S loyalty-platform-sql.database.windows.net \
     -d loyalty_platform \
     -U sqladmin \
     -P 'YourSecureP@ssw0rd123!' \
     -i backend/database/schema-mssql.sql
   ```

### Option 2: Azure Database for PostgreSQL

1. **Create PostgreSQL Server**
   ```bash
   az postgres flexible-server create \
     --resource-group loyalty-platform-rg \
     --name loyalty-platform-pg \
     --location eastus \
     --admin-user pgadmin \
     --admin-password 'YourSecureP@ssw0rd123!' \
     --sku-name Standard_B1ms \
     --storage-size 32 \
     --version 15
   ```

2. **Configure Firewall**
   ```bash
   az postgres flexible-server firewall-rule create \
     --resource-group loyalty-platform-rg \
     --name loyalty-platform-pg \
     --rule-name AllowAzureServices \
     --start-ip-address 0.0.0.0 \
     --end-ip-address 0.0.0.0
   ```

3. **Create Database**
   ```bash
   az postgres flexible-server db create \
     --resource-group loyalty-platform-rg \
     --server-name loyalty-platform-pg \
     --database-name loyalty_platform
   ```

4. **Initialize Schema**
   ```bash
   psql "host=loyalty-platform-pg.postgres.database.azure.com port=5432 dbname=loyalty_platform user=pgadmin password=YourSecureP@ssw0rd123! sslmode=require" \
     -f backend/database/schema.sql
   ```

## Backend API Deployment

### Step 1: Create AKS Cluster

```bash
az aks create \
  --resource-group loyalty-platform-rg \
  --name loyalty-platform-aks \
  --node-count 3 \
  --node-vm-size Standard_B2s \
  --enable-managed-identity \
  --generate-ssh-keys \
  --network-plugin azure
```

### Step 2: Connect to AKS Cluster

```bash
az aks get-credentials \
  --resource-group loyalty-platform-rg \
  --name loyalty-platform-aks
```

Verify connection:
```bash
kubectl get nodes
```

### Step 3: Create Azure Container Registry (ACR)

```bash
az acr create \
  --resource-group loyalty-platform-rg \
  --name loyaltyplatformacr \
  --sku Standard
```

### Step 4: Attach ACR to AKS

```bash
az aks update \
  --resource-group loyalty-platform-rg \
  --name loyalty-platform-aks \
  --attach-acr loyaltyplatformacr
```

### Step 5: Build and Push Docker Image

```bash
# Login to ACR
az acr login --name loyaltyplatformacr

# Build backend image
cd backend
docker build -t loyalty-api:latest .

# Tag for ACR
docker tag loyalty-api:latest loyaltyplatformacr.azurecr.io/loyalty-api:latest

# Push to ACR
docker push loyaltyplatformacr.azurecr.io/loyalty-api:latest
```

### Step 6: Update Kubernetes Manifests

Edit `k8s/deployment.yaml` and replace `${CONTAINER_REGISTRY}` with your ACR name:

```yaml
image: loyaltyplatformacr.azurecr.io/loyalty-api:latest
```

Edit `k8s/configmap.yaml` with your database configuration:

For Azure SQL:
```yaml
data:
  DB_TYPE: "mssql"
  DB_SERVER: "loyalty-platform-sql.database.windows.net"
  DB_NAME: "loyalty_platform"
```

For PostgreSQL:
```yaml
data:
  DB_TYPE: "postgres"
  DB_HOST: "loyalty-platform-pg.postgres.database.azure.com"
  DB_PORT: "5432"
  DB_NAME: "loyalty_platform"
  DB_SSL: "true"
```

### Step 7: Create Kubernetes Secret

```bash
kubectl create secret generic loyalty-api-secrets \
  --from-literal=DB_USER='sqladmin' \
  --from-literal=DB_PASSWORD='YourSecureP@ssw0rd123!'
```

### Step 8: Deploy to Kubernetes

```bash
cd ..  # Return to root directory
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
```

### Step 9: Get External IP

Wait for the LoadBalancer to assign an external IP (may take 2-5 minutes):

```bash
kubectl get service loyalty-api-service -w
```

Once you see the EXTERNAL-IP, press Ctrl+C and note the IP address.

### Step 10: Test Backend API

```bash
# Replace <EXTERNAL-IP> with the actual IP
curl http://<EXTERNAL-IP>/api/health

# Test dashboard endpoint
curl http://<EXTERNAL-IP>/api/dashboard
```

## Frontend Deployment

### Option 1: Azure Static Web Apps (Recommended)

1. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name loyalty-platform-frontend \
     --resource-group loyalty-platform-rg \
     --location eastus2
   ```

2. **Build Frontend with Backend API URL**
   ```bash
   # Set the API URL environment variable
   export VITE_API_URL=http://<BACKEND-EXTERNAL-IP>/api
   
   # Build
   npm run build
   ```

3. **Deploy to Static Web App**
   ```bash
   # Use Azure Static Web Apps CLI or GitHub Actions
   # See: https://docs.microsoft.com/azure/static-web-apps/
   ```

### Option 2: Azure App Service

1. **Create App Service Plan**
   ```bash
   az appservice plan create \
     --name loyalty-platform-plan \
     --resource-group loyalty-platform-rg \
     --sku B1 \
     --is-linux
   ```

2. **Create Web App**
   ```bash
   az webapp create \
     --name loyalty-platform-frontend \
     --resource-group loyalty-platform-rg \
     --plan loyalty-platform-plan \
     --runtime "NODE:20-lts"
   ```

3. **Configure and Deploy**
   ```bash
   # Set environment variable
   az webapp config appsettings set \
     --name loyalty-platform-frontend \
     --resource-group loyalty-platform-rg \
     --settings VITE_API_URL=http://<BACKEND-EXTERNAL-IP>/api
   
   # Deploy (requires additional configuration)
   # See: https://docs.microsoft.com/azure/app-service/
   ```

### Option 3: Local Development

For local testing with the deployed backend:

1. **Update .env.local**
   ```bash
   echo "VITE_API_URL=http://<BACKEND-EXTERNAL-IP>/api" > .env.local
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

## Verification

### 1. Check Backend Pods

```bash
kubectl get pods -l app=loyalty-api
```

All pods should show `STATUS: Running`

### 2. Check Logs

```bash
kubectl logs -l app=loyalty-api --tail=50
```

Should show:
```
Database initialized successfully
Server is running on port 3000
```

### 3. Test API Endpoints

```bash
BACKEND_IP=$(kubectl get service loyalty-api-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

# Health check
curl http://$BACKEND_IP/api/health

# KPIs
curl http://$BACKEND_IP/api/kpis

# Dashboard
curl http://$BACKEND_IP/api/dashboard
```

### 4. Test Frontend

Navigate to your frontend URL and verify:
- Dashboard displays KPI data
- "Demo Mode" badge is NOT shown (indicates API connection)
- Data refreshes automatically

## Troubleshooting

### Backend Pods Not Starting

```bash
# Check pod status
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Common issues:
# - Database connection failure: Check credentials in secret
# - Image pull errors: Verify ACR attachment to AKS
# - Health check failures: Ensure database is accessible
```

### Database Connection Issues

```bash
# Test database connectivity from a pod
kubectl run -it --rm debug --image=postgres:15 --restart=Never -- bash
# Then try: psql -h <db-host> -U <user> -d loyalty_platform
```

For Azure SQL firewall issues:
```bash
az sql server firewall-rule create \
  --resource-group loyalty-platform-rg \
  --server loyalty-platform-sql \
  --name AllowAKS \
  --start-ip-address <AKS-OUTBOUND-IP> \
  --end-ip-address <AKS-OUTBOUND-IP>
```

### Frontend Not Connecting to Backend

1. Check CORS settings in backend ConfigMap
2. Verify EXTERNAL-IP is accessible from your network
3. Check browser console for errors
4. Verify VITE_API_URL is set correctly

### HPA Not Scaling

```bash
# Check HPA status
kubectl get hpa loyalty-api-hpa

# Check metrics server
kubectl top pods

# If metrics not available, install metrics server:
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## Security Best Practices

1. **Use Azure Key Vault** for secrets instead of Kubernetes Secrets
2. **Enable HTTPS** with Azure Front Door or Application Gateway
3. **Use Managed Identities** for Azure resource access
4. **Enable Network Policies** in AKS
5. **Regular Updates**: Keep container images and dependencies updated
6. **Monitor Logs**: Use Azure Monitor and Application Insights

## Cleanup

To delete all resources:

```bash
# Delete AKS cluster
az aks delete --resource-group loyalty-platform-rg --name loyalty-platform-aks --yes

# Delete entire resource group
az group delete --name loyalty-platform-rg --yes
```

## Support

For issues or questions:
- Check the [backend README](backend/README.md) for detailed API documentation
- Review Kubernetes logs: `kubectl logs -l app=loyalty-api`
- Check Azure Portal for resource health
- Verify database connectivity and firewall rules

## Next Steps

- Configure Azure Front Door for CDN and WAF
- Set up Azure Monitor and Application Insights
- Implement Azure Key Vault for secrets management
- Configure CI/CD with Azure DevOps or GitHub Actions
- Enable auto-scaling rules based on custom metrics
- Set up backup and disaster recovery
