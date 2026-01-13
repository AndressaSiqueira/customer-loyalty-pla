export interface ArchitectureComponent {
  id: string
  name: string
  description: string
  technologies?: string[]
  layer: 'user' | 'gateway' | 'microservices' | 'ai-agents' | 'data' | 'security' | 'devops'
}

export interface AIAgent {
  id: string
  name: string
  persona: string
  description: string
  capabilities: string[]
  useCases: string[]
  businessImpact: {
    metric: string
    improvement: string
  }[]
  sampleQueries: string[]
}

export interface MigrationPhase {
  id: string
  name: string
  description: string
  activities: string[]
  outcomes: string[]
  duration: string
}

export interface MigrationBlocker {
  id: string
  blocker: string
  solution: string
  azureServices: string[]
}

export interface BusinessMetric {
  id: string
  name: string
  category: 'performance' | 'efficiency' | 'quality' | 'engagement'
  before: string
  after: string
  improvement: string
  description: string
}
