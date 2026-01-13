import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { architectureComponents } from '@/lib/data'
import type { ArchitectureComponent } from '@/lib/types'
import { DeviceMobile, Globe, Gear, Sparkle, Database, ShieldCheck, GitBranch } from '@phosphor-icons/react'

const layerConfig = {
  user: { 
    title: 'User Channels', 
    color: 'border-primary bg-primary/5',
    icon: DeviceMobile 
  },
  gateway: { 
    title: 'Gateway & API Layer', 
    color: 'border-[var(--data-platform)] bg-[var(--data-platform)]/5',
    icon: Globe 
  },
  microservices: { 
    title: 'Microservices', 
    color: 'border-[var(--microservices)] bg-[var(--microservices)]/5',
    icon: Gear 
  },
  'ai-agents': { 
    title: 'AI Agents', 
    color: 'border-[var(--ai-agents)] bg-[var(--ai-agents)]/5',
    icon: Sparkle 
  },
  data: { 
    title: 'Data Platform', 
    color: 'border-[var(--data-platform)] bg-[var(--data-platform)]/5',
    icon: Database 
  },
  security: { 
    title: 'Security & Identity', 
    color: 'border-[var(--security)] bg-[var(--security)]/5',
    icon: ShieldCheck 
  },
  devops: { 
    title: 'DevOps & Observability', 
    color: 'border-[var(--devops)] bg-[var(--devops)]/5',
    icon: GitBranch 
  }
}

export default function ArchitectureView() {
  const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponent | null>(null)

  const layers = [
    'user',
    'gateway',
    'microservices',
    'ai-agents',
    'data',
    'security',
    'devops'
  ] as const

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-3">Azure Cloud Architecture</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          A modern, cloud-native platform built on Azure with microservices, AI-powered agents, 
          and comprehensive security. Click any component to explore its role in the ecosystem.
        </p>
      </div>

      <div className="space-y-6">
        {layers.map((layer) => {
          const components = architectureComponents.filter((c) => c.layer === layer)
          const config = layerConfig[layer]
          const Icon = config.icon

          return (
            <Card key={layer} className={`border-2 ${config.color} transition-all duration-300 hover:shadow-lg`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border-2 border-current opacity-60">
                    <Icon className="w-5 h-5" weight="duotone" />
                  </div>
                  <CardTitle className="text-lg">{config.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {components.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => setSelectedComponent(component)}
                      className="text-left p-4 rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-200 group"
                    >
                      <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                        {component.name}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {component.description}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedComponent} onOpenChange={() => setSelectedComponent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedComponent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedComponent.name}</DialogTitle>
                <DialogDescription className="text-base pt-2">
                  {selectedComponent.description}
                </DialogDescription>
              </DialogHeader>
              
              {selectedComponent.technologies && selectedComponent.technologies.length > 0 && (
                <div className="space-y-3 pt-4">
                  <h4 className="font-semibold text-sm text-foreground">Technologies & Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponent.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Layer: </strong>
                  {layerConfig[selectedComponent.layer].title}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Card className="bg-muted/30 border-2 border-dashed border-border">
        <CardHeader>
          <CardTitle className="text-lg">Architecture Principles</CardTitle>
          <CardDescription>Key design decisions driving the modernization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Microservices</h4>
              <p className="text-sm text-muted-foreground">
                Independent services enable faster releases and better scaling
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Event-Driven</h4>
              <p className="text-sm text-muted-foreground">
                Asynchronous communication improves resilience and performance
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">Zero Trust Security</h4>
              <p className="text-sm text-muted-foreground">
                Identity-based access control and encryption at every layer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
