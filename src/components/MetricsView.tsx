import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { businessMetrics } from '@/lib/data'
import { TrendUp, Lightning, ShieldCheck, Users } from '@phosphor-icons/react'

const categoryConfig = {
  performance: {
    label: 'Performance',
    icon: Lightning,
    color: 'text-[var(--data-platform)]',
    bgColor: 'bg-[var(--data-platform)]/10'
  },
  efficiency: {
    label: 'Efficiency',
    icon: TrendUp,
    color: 'text-[var(--microservices)]',
    bgColor: 'bg-[var(--microservices)]/10'
  },
  quality: {
    label: 'Quality',
    icon: ShieldCheck,
    color: 'text-[var(--security)]',
    bgColor: 'bg-[var(--security)]/10'
  },
  engagement: {
    label: 'Engagement',
    icon: Users,
    color: 'text-[var(--ai-agents)]',
    bgColor: 'bg-[var(--ai-agents)]/10'
  }
}

export default function MetricsView() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-3">Business Impact Metrics</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Quantifiable improvements expected from the Customer Loyalty Platform modernization—
          demonstrating clear ROI and strategic value across performance, efficiency, quality, and engagement.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon
          const count = businessMetrics.filter(m => m.category === key).length
          
          return (
            <Card key={key} className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} weight="duotone" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{config.label}</div>
                    <div className="text-xs text-muted-foreground">{count} metrics</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {businessMetrics.map((metric) => {
          const config = categoryConfig[metric.category]
          const Icon = config.icon

          return (
            <Card 
              key={metric.id} 
              className="border-2 hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} weight="duotone" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {config.label}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{metric.name}</CardTitle>
                <CardDescription className="text-sm pt-2">
                  {metric.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground font-medium">Before</div>
                    <div className="text-lg font-semibold text-foreground">{metric.before}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground font-medium">After</div>
                    <div className="text-lg font-semibold text-accent">{metric.after}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Improvement</span>
                    <span className="text-sm font-bold text-accent">{metric.improvement}</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-2 border-primary bg-primary/5 mt-12">
        <CardHeader>
          <CardTitle className="text-lg">Strategic Business Value</CardTitle>
          <CardDescription>
            How these improvements align with Neo Contoso's 3-year transformation goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Double Userbase Growth</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Improved system uptime (99.95%), faster release cycles (12x), and AI-powered personalization 
                create the scalable, engaging platform needed to support 2x customer growth.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">AI-Driven Decision Making</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Marketing productivity increases 3x through NLQ access to data, eliminating SQL dependencies 
                and enabling real-time scenario forecasting and campaign optimization.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Operational Excellence</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automated support triage (60% faster resolution), 90% faster incident detection, and 
                modern CI/CD pipelines dramatically reduce operational overhead and improve reliability.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Competitive Differentiation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Customer engagement increases 40% through intelligent, personalized experiences that competitors 
                using legacy platforms cannot match—creating sustainable competitive advantage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-2 border-dashed border-border">
        <CardHeader>
          <CardTitle className="text-lg">Implementation Timeline</CardTitle>
          <CardDescription>When to expect metric improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-24 shrink-0">
                <Badge variant="outline" className="text-xs">Months 1-3</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Quick Wins:</strong> CI/CD improvements, deployment automation, 
                basic monitoring—expect 50% of DevOps metric improvements
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-24 shrink-0">
                <Badge variant="outline" className="text-xs">Months 4-6</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Core Migration:</strong> Microservices deployed, data platform live, 
                reliability and performance metrics show significant gains
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-24 shrink-0">
                <Badge variant="outline" className="text-xs">Months 7-9</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">AI Activation:</strong> Campaign Designer and Support Agents deployed, 
                marketing and support efficiency metrics reach targets
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-24 shrink-0">
                <Badge variant="outline" className="text-xs">Month 10+</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Optimization:</strong> Full metric realization, continuous improvement, 
                customer engagement metrics show sustained growth
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
