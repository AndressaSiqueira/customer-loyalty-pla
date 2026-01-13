import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { aiAgents } from '@/lib/data'
import { Sparkle, ChartLineUp, UsersFour } from '@phosphor-icons/react'

export default function AIAgentsView() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-3">AI-Powered Agents</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Intelligent assistants that transform how teams interact with data, automate workflows, 
          and make decisions—built on Azure OpenAI and deployed through AI Studio.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {aiAgents.map((agent, index) => (
          <Card 
            key={agent.id} 
            className="border-2 border-[var(--ai-agents)] bg-[var(--ai-agents)]/5 hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--ai-agents)] flex items-center justify-center">
                  <Sparkle className="w-6 h-6 text-white" weight="duotone" />
                </div>
                <Badge variant="outline" className="text-xs border-[var(--ai-agents)] text-[var(--ai-agents)]">
                  {agent.persona}
                </Badge>
              </div>
              <CardTitle className="text-xl">{agent.name}</CardTitle>
              <CardDescription className="text-sm pt-2 leading-relaxed">
                {agent.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <ChartLineUp className="w-4 h-4" weight="duotone" />
                  Core Capabilities
                </h4>
                <ul className="space-y-2">
                  {agent.capabilities.map((capability, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--ai-agents)]">
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-sm mb-3">Sample Natural Language Queries</h4>
                <div className="space-y-2">
                  {agent.sampleQueries.slice(0, 2).map((query, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-lg bg-card border border-border text-sm text-foreground italic"
                    >
                      "{query}"
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <UsersFour className="w-4 h-4" weight="duotone" />
                  Business Impact
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {agent.businessImpact.map((impact, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-card border border-border">
                      <div className="text-xs text-muted-foreground mb-1">{impact.metric}</div>
                      <div className="font-semibold text-accent text-sm">{impact.improvement}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">AI Agent Strategy</CardTitle>
          <CardDescription>Why AI agents are critical to the modernization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Unlock Data Value</h4>
                <p className="text-sm text-muted-foreground">
                  Neo Contoso has massive datasets but lacks mechanisms to convert them into actionable intelligence. 
                  NLQ agents democratize access without SQL dependencies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Automate Manual Workflows</h4>
                <p className="text-sm text-muted-foreground">
                  Support teams operate semi-manually with non-aggregated logs. AI-powered triage and diagnostics 
                  reduce workload and improve resolution times.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Enable Guided Workflows</h4>
                <p className="text-sm text-muted-foreground">
                  Recent security incidents highlight the need for guided, secure workflows. AI agents can enforce 
                  compliance and provide contextual security recommendations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Accelerate Decision Making</h4>
                <p className="text-sm text-muted-foreground">
                  Forecasting and what-if analysis capabilities allow marketers to test scenarios and optimize 
                  campaigns before execution, reducing risk and improving ROI.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
