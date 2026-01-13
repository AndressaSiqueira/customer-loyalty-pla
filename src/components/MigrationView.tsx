import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { migrationPhases, migrationBlockers } from '@/lib/data'
import { ClipboardText, CheckCircle, Warning, Lightbulb } from '@phosphor-icons/react'

export default function MigrationView() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-3">Azure Migration Strategy</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          A phased, risk-managed approach to migrating the Customer Loyalty Platform from legacy 
          infrastructure to Azure—designed to minimize downtime and maximize business continuity.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

        <div className="space-y-6">
          {migrationPhases.map((phase, index) => (
            <Card 
              key={phase.id} 
              className="border-2 hover:shadow-lg transition-all duration-300 md:ml-20 relative"
            >
              <div className="absolute -left-[4.5rem] top-8 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl border-4 border-background hidden md:flex">
                {index + 1}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{phase.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {phase.duration}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {phase.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <ClipboardText className="w-4 h-4" weight="duotone" />
                    Key Activities
                  </h4>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-primary">
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--microservices)]" weight="duotone" />
                    Expected Outcomes
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {phase.outcomes.map((outcome, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-[var(--microservices)] shrink-0">✓</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-2 border-[var(--security)] bg-[var(--security)]/5 mt-12">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Warning className="w-6 h-6 text-[var(--security)]" weight="duotone" />
            <CardTitle className="text-lg">Overcoming Migration Blockers</CardTitle>
          </div>
          <CardDescription>
            Common challenges and proven strategies to ensure successful migration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {migrationBlockers.map((blocker) => (
              <AccordionItem key={blocker.id} value={blocker.id}>
                <AccordionTrigger className="text-sm font-semibold hover:text-primary">
                  <div className="flex items-center gap-2">
                    <Warning className="w-4 h-4 text-[var(--security)]" weight="fill" />
                    {blocker.blocker}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="flex gap-3">
                      <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="duotone" />
                      <div className="space-y-3 flex-1">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {blocker.solution}
                        </p>
                        <div>
                          <h5 className="text-xs font-semibold text-foreground mb-2">Azure Services</h5>
                          <div className="flex flex-wrap gap-2">
                            {blocker.azureServices.map((service) => (
                              <Badge key={service} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-2 border-dashed border-border">
        <CardHeader>
          <CardTitle className="text-lg">Migration Success Factors</CardTitle>
          <CardDescription>Critical elements for a smooth transition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Executive Sponsorship</h4>
              <p className="text-sm text-muted-foreground">
                Strong leadership commitment ensures resources, priority, and organizational alignment
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Incremental Validation</h4>
              <p className="text-sm text-muted-foreground">
                Starting with non-critical workloads validates the process before migrating core services
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Continuous Learning</h4>
              <p className="text-sm text-muted-foreground">
                Investing in team training and establishing a cloud center of excellence builds long-term capability
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
