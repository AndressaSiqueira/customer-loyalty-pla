import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TrendUp, TrendDown, Users, Sparkle, ChartLine, Target, Lightbulb } from '@phosphor-icons/react'

const kpiData = [
  {
    id: 'active-members',
    label: 'Active Members',
    value: '847,293',
    change: '+12.4%',
    trend: 'up' as const,
    target: '1M',
    progress: 85,
    color: 'var(--ai-agents)'
  },
  {
    id: 'engagement-rate',
    label: 'Engagement Rate',
    value: '11.2%',
    change: '+3.2%',
    trend: 'up' as const,
    target: '12%',
    progress: 93,
    color: 'var(--microservices)'
  },
  {
    id: 'redemption-rate',
    label: 'Redemption Rate',
    value: '24.8%',
    change: '+5.1%',
    trend: 'up' as const,
    target: '30%',
    progress: 83,
    color: 'var(--data-platform)'
  },
  {
    id: 'avg-transaction',
    label: 'Avg Transaction',
    value: '$127.50',
    change: '-2.3%',
    trend: 'down' as const,
    target: '$135',
    progress: 94,
    color: 'var(--security)'
  }
]

const operationalHealth = [
  {
    id: 'system-uptime',
    label: 'System Uptime',
    status: '99.94%',
    health: 'excellent' as const
  },
  {
    id: 'api-latency',
    label: 'API Latency',
    status: '142ms',
    health: 'good' as const
  },
  {
    id: 'active-campaigns',
    label: 'Active Campaigns',
    status: '23',
    health: 'excellent' as const
  },
  {
    id: 'support-tickets',
    label: 'Open Tickets',
    status: '47',
    health: 'good' as const
  }
]

const recommendations = [
  {
    id: 'rec-1',
    title: 'Focus on Declining Engagement Segment',
    description: 'Try Campaign Designer: "Show customers with declining engagement in the last 30 days"',
    agent: 'campaign-designer' as const,
    priority: 'high' as const
  },
  {
    id: 'rec-2',
    title: 'Optimize High-Value Customer Retention',
    description: 'Try Campaign Designer: "Suggest a targeted campaign for customers who spent $500+ last quarter"',
    agent: 'campaign-designer' as const,
    priority: 'medium' as const
  },
  {
    id: 'rec-3',
    title: 'Monitor Recent API Latency Increase',
    description: 'Try Support Operations: "Is the current API latency spike within normal range?"',
    agent: 'support-operations' as const,
    priority: 'medium' as const
  }
]

interface DashboardOverviewProps {
  onRecommendationClick?: (agent: 'campaign-designer' | 'support-operations', prompt: string) => void
}

export default function DashboardOverview({ onRecommendationClick }: DashboardOverviewProps) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'warning': return 'text-amber-600 bg-amber-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-amber-500 bg-amber-50'
      case 'low': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const extractPrompt = (description: string) => {
    const match = description.match(/"([^"]+)"/)
    return match ? match[1] : ''
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
          <ChartLine className="w-5 h-5 text-primary" weight="duotone" />
          Customer Loyalty Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          Real-time overview of loyalty program performance and operational health
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.id} className="border-2 hover:shadow-md transition-all duration-200">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="text-xs text-muted-foreground font-medium">{kpi.label}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${kpi.trend === 'up' ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'}`}
                  >
                    {kpi.trend === 'up' ? (
                      <TrendUp className="w-3 h-3 mr-1" weight="bold" />
                    ) : (
                      <TrendDown className="w-3 h-3 mr-1" weight="bold" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Target: {kpi.target}</span>
                    <span className="font-semibold">{kpi.progress}%</span>
                  </div>
                  <Progress value={kpi.progress} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Operational Health & Recommendations Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Operational Health */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4" weight="duotone" />
              Operational Health
            </CardTitle>
            <CardDescription className="text-xs">System status and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operationalHealth.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.status}</span>
                    <Badge className={`text-xs ${getHealthColor(item.health)}`}>
                      {item.health}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" weight="duotone" />
              Recommended Actions
            </CardTitle>
            <CardDescription className="text-xs">AI-powered insights to focus your efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recommendations.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => {
                    const prompt = extractPrompt(rec.description)
                    if (onRecommendationClick && prompt) {
                      onRecommendationClick(rec.agent, prompt)
                    }
                  }}
                  className={`w-full text-left p-3 rounded-lg border-l-4 ${getPriorityColor(rec.priority)} hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="font-semibold text-xs mb-1 flex items-center gap-2">
                        {rec.agent === 'campaign-designer' ? (
                          <Sparkle className="w-3 h-3" weight="duotone" />
                        ) : (
                          <Lightbulb className="w-3 h-3" weight="duotone" />
                        )}
                        {rec.title}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {rec.priority}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
