import type { ArchitectureComponent, AIAgent, MigrationPhase, MigrationBlocker, BusinessMetric } from './types'

export const architectureComponents: ArchitectureComponent[] = [
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'Customer-facing iOS and Android loyalty application',
    technologies: ['React Native', 'Azure App Center'],
    layer: 'user'
  },
  {
    id: 'admin-portal',
    name: 'Admin Web Portal',
    description: 'Marketing and HQ management interface',
    technologies: ['React', 'TypeScript', 'Azure Static Web Apps'],
    layer: 'user'
  },
  {
    id: 'store-app',
    name: 'Store Associate App',
    description: 'In-store customer interaction and loyalty lookup',
    technologies: ['Progressive Web App', 'Azure App Service'],
    layer: 'user'
  },
  {
    id: 'front-door',
    name: 'Azure Front Door',
    description: 'Global load balancing, CDN, and WAF protection',
    technologies: ['Azure Front Door', 'WAF'],
    layer: 'gateway'
  },
  {
    id: 'api-management',
    name: 'API Management',
    description: 'API gateway with rate limiting, authentication, and monitoring',
    technologies: ['Azure API Management'],
    layer: 'gateway'
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Microservice handling customer profile and authentication',
    technologies: ['Azure Kubernetes Service', '.NET 8', 'Dapr'],
    layer: 'microservices'
  },
  {
    id: 'loyalty-service',
    name: 'Loyalty Service',
    description: 'Points, rewards, and transaction processing',
    technologies: ['Azure Kubernetes Service', '.NET 8', 'Dapr'],
    layer: 'microservices'
  },
  {
    id: 'campaign-service',
    name: 'Campaign Service',
    description: 'Marketing campaign management and execution',
    technologies: ['Azure Kubernetes Service', '.NET 8', 'Dapr'],
    layer: 'microservices'
  },
  {
    id: 'transaction-service',
    name: 'Transaction Service',
    description: 'Purchase and transaction event processing',
    technologies: ['Azure Functions', 'Event-driven'],
    layer: 'microservices'
  },
  {
    id: 'campaign-designer-agent',
    name: 'Campaign Designer Agent',
    description: 'AI-powered marketing assistant using Azure OpenAI',
    technologies: ['Azure OpenAI', 'AI Studio', 'Semantic Kernel'],
    layer: 'ai-agents'
  },
  {
    id: 'support-operations-agent',
    name: 'Support & Operations Agent',
    description: 'Automated triage and operational health monitoring',
    technologies: ['Azure OpenAI', 'AI Studio', 'Azure Monitor'],
    layer: 'ai-agents'
  },
  {
    id: 'azure-sql',
    name: 'Azure SQL Database',
    description: 'Transactional data for customers, loyalty, and campaigns',
    technologies: ['Azure SQL', 'Elastic Pool'],
    layer: 'data'
  },
  {
    id: 'cosmos-db',
    name: 'Cosmos DB',
    description: 'Global distributed database for high-scale transactions',
    technologies: ['Azure Cosmos DB', 'NoSQL'],
    layer: 'data'
  },
  {
    id: 'data-lake',
    name: 'Data Lake Storage',
    description: 'Historical data warehouse and analytics foundation',
    technologies: ['Azure Data Lake Gen2', 'Parquet'],
    layer: 'data'
  },
  {
    id: 'event-hubs',
    name: 'Event Hubs',
    description: 'Real-time event streaming for transactions and interactions',
    technologies: ['Azure Event Hubs', 'Kafka API'],
    layer: 'data'
  },
  {
    id: 'synapse',
    name: 'Synapse Analytics',
    description: 'Unified analytics for big data and data warehousing',
    technologies: ['Azure Synapse', 'Apache Spark'],
    layer: 'data'
  },
  {
    id: 'ai-search',
    name: 'AI Search',
    description: 'Intelligent search over customer and campaign data',
    technologies: ['Azure AI Search', 'Vector Search'],
    layer: 'data'
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    description: 'Business intelligence and reporting dashboards',
    technologies: ['Power BI', 'Embedded Analytics'],
    layer: 'data'
  },
  {
    id: 'entra-id',
    name: 'Microsoft Entra ID',
    description: 'Identity and access management for users and services',
    technologies: ['Entra ID', 'B2C', 'Conditional Access'],
    layer: 'security'
  },
  {
    id: 'key-vault',
    name: 'Key Vault',
    description: 'Secrets, keys, and certificate management',
    technologies: ['Azure Key Vault', 'Managed Identity'],
    layer: 'security'
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps',
    description: 'CI/CD pipelines, repos, and release management',
    technologies: ['Azure DevOps', 'YAML Pipelines'],
    layer: 'devops'
  },
  {
    id: 'app-insights',
    name: 'Application Insights',
    description: 'APM, distributed tracing, and performance monitoring',
    technologies: ['Application Insights', 'OpenTelemetry'],
    layer: 'devops'
  },
  {
    id: 'log-analytics',
    name: 'Log Analytics',
    description: 'Centralized logging and log aggregation workspace',
    technologies: ['Log Analytics', 'KQL'],
    layer: 'devops'
  }
]

export const aiAgents: AIAgent[] = [
  {
    id: 'campaign-designer',
    name: 'Campaign Designer Agent',
    persona: 'Marketing Manager / HQ',
    description: 'An AI-powered assistant that transforms how marketing teams create, analyze, and optimize loyalty campaigns by providing natural language access to customer data, predictive analytics, and automated campaign generation.',
    capabilities: [
      'Natural Language Query (NLQ) over business data - churn risk, high-value customers, trending categories',
      'AI-assisted campaign creation with segment recommendations',
      'Scenario forecasting and what-if analysis',
      'Automated A/B test design and statistical analysis',
      'Secure workflow guidance with compliance checks',
      'Real-time campaign performance insights'
    ],
    useCases: [
      '"Show me high-value customers at risk of churning in the next 30 days"',
      '"Create a campaign targeting customers who bought electronics but haven\'t returned in 60 days"',
      '"What would be the expected ROI if we offered 20% off to lapsed premium members?"',
      '"Suggest optimal send times for our holiday campaign based on historical engagement"'
    ],
    businessImpact: [
      { metric: 'Campaign Creation Time', improvement: '75% reduction' },
      { metric: 'Customer Engagement Rate', improvement: '40% increase' },
      { metric: 'Marketing Team Productivity', improvement: '3x improvement' },
      { metric: 'SQL Query Dependency', improvement: 'Eliminated' }
    ],
    sampleQueries: [
      'Show me customers who spent over $500 last quarter but haven\'t purchased this month',
      'Which product categories are trending up this week vs last week?',
      'Create a win-back campaign for customers who churned in the last 90 days',
      'Forecast the impact of a 15% discount on premium member reactivation'
    ]
  },
  {
    id: 'support-operations',
    name: 'Support & Operations Agent',
    persona: 'Support Team / Internal Ops',
    description: 'An intelligent operations assistant that automates support case triage, monitors system health, detects anomalies, and provides actionable insights to reduce manual workload and improve platform reliability.',
    capabilities: [
      'Automated loyalty case triage and priority assignment',
      'Intelligent routing to appropriate support specialists',
      'Release health monitoring and rollback recommendations',
      'Anomaly detection in transaction patterns and system logs',
      'Root cause analysis for common support issues',
      'Self-service resolution suggestions for customers'
    ],
    useCases: [
      '"Analyze this customer\'s loyalty account and identify why points aren\'t showing"',
      '"What\'s the current health of the campaign service deployment?"',
      '"Detect any unusual patterns in today\'s transaction volume"',
      '"Suggest a resolution for customers reporting delayed point credits"'
    ],
    businessImpact: [
      { metric: 'Support Case Resolution Time', improvement: '60% faster' },
      { metric: 'Manual Triage Workload', improvement: '80% reduction' },
      { metric: 'Incident Detection Time', improvement: '90% faster' },
      { metric: 'Self-Service Resolution Rate', improvement: '45% increase' }
    ],
    sampleQueries: [
      'Why hasn\'t customer ID 12345\'s recent purchase been credited to their account?',
      'Show me all critical errors in the loyalty service from the past hour',
      'Is the current API latency spike within normal range for this time of day?',
      'What are the top 3 support issues reported today and their common patterns?'
    ]
  }
]

export const migrationPhases: MigrationPhase[] = [
  {
    id: 'assessment',
    name: 'Assessment',
    description: 'Comprehensive inventory and readiness evaluation',
    activities: [
      'Inventory current workloads, dependencies, and data flows',
      'Assess application architecture and identify legacy components',
      'Evaluate data estate and storage requirements',
      'Prioritize workloads based on business impact and complexity',
      'Identify security, compliance, and governance requirements',
      'Calculate current vs projected cloud costs (TCO analysis)'
    ],
    outcomes: [
      'Complete application portfolio catalog',
      'Migration priority matrix',
      'Dependency mapping and risk assessment',
      'Azure service recommendations per workload'
    ],
    duration: '4-6 weeks'
  },
  {
    id: 'planning',
    name: 'Planning',
    description: 'Detailed migration roadmap and preparation',
    activities: [
      'Define migration roadmap with phased approach',
      'Select appropriate Azure services (App Service, AKS, Azure SQL, Cosmos DB)',
      'Establish governance model and subscription structure',
      'Design landing zones and network architecture',
      'Create detailed cutover plans with rollback procedures',
      'Set up Azure DevOps pipelines and automation'
    ],
    outcomes: [
      'Migration roadmap with timelines',
      'Azure architecture design documents',
      'Security baseline and compliance framework',
      'Disaster recovery and business continuity plans'
    ],
    duration: '6-8 weeks'
  },
  {
    id: 'migration',
    name: 'Phased Migration',
    description: 'Incremental workload migration with validation',
    activities: [
      'Begin with non-critical workloads to validate process',
      'Migrate databases using Azure Database Migration Service',
      'Refactor applications for cloud-native patterns (12-factor)',
      'Deploy microservices to Azure Kubernetes Service',
      'Implement API Management and Front Door',
      'Enable monitoring, logging, and alerting infrastructure'
    ],
    outcomes: [
      'Core services running on Azure',
      'Validated migration processes and runbooks',
      'Monitoring and observability baseline',
      'Updated CI/CD pipelines for cloud deployment'
    ],
    duration: '12-16 weeks'
  },
  {
    id: 'optimization',
    name: 'Optimization',
    description: 'Performance tuning and AI enablement',
    activities: [
      'Optimize Azure resource sizing and cost management',
      'Implement autoscaling and performance tuning',
      'Deploy AI agents (Campaign Designer, Support & Operations)',
      'Enable advanced analytics with Synapse and Power BI',
      'Implement chaos engineering and resilience testing',
      'Establish SLOs and continuous improvement processes'
    ],
    outcomes: [
      'Optimized cloud costs (20-30% reduction)',
      'AI-powered campaign and support capabilities',
      'Modern observability and incident response',
      'Documented best practices and operational runbooks'
    ],
    duration: '8-12 weeks'
  }
]

export const migrationBlockers: MigrationBlocker[] = [
  {
    id: 'legacy-dependencies',
    blocker: 'Legacy System Dependencies',
    solution: 'Use Azure Migrate to assess workloads and identify dependencies. Implement strangler fig pattern to gradually refactor components. Leverage Azure App Service Environment for legacy rehosting while modernization proceeds.',
    azureServices: ['Azure Migrate', 'App Service Environment', 'Azure Arc']
  },
  {
    id: 'data-migration',
    blocker: 'Data Migration Challenges',
    solution: 'Employ Azure Database Migration Service for seamless transfer with minimal downtime. Validate data integrity at each phase. Use Azure Data Factory for complex ETL scenarios. Plan for phased cutover with parallel run validation.',
    azureServices: ['Database Migration Service', 'Data Factory', 'Azure SQL', 'Cosmos DB']
  },
  {
    id: 'security-compliance',
    blocker: 'Security and Compliance Concerns',
    solution: 'Implement Microsoft Defender for Cloud for continuous security posture management. Use Policy and Blueprints for compliance automation. Enable Entra ID for zero-trust identity. Implement Key Vault for secrets management from day one.',
    azureServices: ['Defender for Cloud', 'Azure Policy', 'Entra ID', 'Key Vault']
  },
  {
    id: 'skills-gap',
    blocker: 'Cloud Skills Gap',
    solution: 'Provide targeted training via Microsoft Learn and Azure certifications. Leverage Microsoft FastTrack for hands-on guidance during migration. Partner with Azure experts for knowledge transfer. Establish cloud center of excellence.',
    azureServices: ['Microsoft Learn', 'FastTrack', 'Azure Support']
  }
]

export const businessMetrics: BusinessMetric[] = [
  {
    id: 'release-frequency',
    name: 'Release Frequency',
    category: 'performance',
    before: 'Quarterly',
    after: 'Weekly',
    improvement: '12x faster',
    description: 'Modern CI/CD with Azure DevOps enables rapid, safe deployments'
  },
  {
    id: 'deployment-time',
    name: 'Deployment Time',
    category: 'performance',
    before: '4-6 hours',
    after: '15 minutes',
    improvement: '16x faster',
    description: 'Automated pipelines and containerization eliminate manual steps'
  },
  {
    id: 'campaign-creation',
    name: 'Campaign Creation Time',
    category: 'efficiency',
    before: '2-3 days',
    after: '2-3 hours',
    improvement: '75% reduction',
    description: 'AI Campaign Designer Agent automates segmentation and targeting'
  },
  {
    id: 'support-resolution',
    name: 'Support Case Resolution',
    category: 'efficiency',
    before: '48 hours',
    after: '12 hours',
    improvement: '60% faster',
    description: 'Automated triage and AI-assisted diagnostics accelerate resolution'
  },
  {
    id: 'system-uptime',
    name: 'System Uptime',
    category: 'quality',
    before: '99.5%',
    after: '99.95%',
    improvement: '10x improvement',
    description: 'Azure SLA guarantees and microservices resilience'
  },
  {
    id: 'incident-detection',
    name: 'Incident Detection',
    category: 'quality',
    before: '30+ minutes',
    after: '<3 minutes',
    improvement: '90% faster',
    description: 'Application Insights and AI anomaly detection provide real-time alerts'
  },
  {
    id: 'customer-engagement',
    name: 'Customer Engagement Rate',
    category: 'engagement',
    before: '8%',
    after: '12%',
    improvement: '40% increase',
    description: 'AI-powered personalization and targeted campaigns'
  },
  {
    id: 'marketing-productivity',
    name: 'Marketing Team Productivity',
    category: 'efficiency',
    before: 'Baseline',
    after: '3x baseline',
    improvement: '200% increase',
    description: 'NLQ eliminates SQL dependencies and automates analysis'
  }
]
