import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CloudArrowUp, Robot, ChartBar, Cube } from '@phosphor-icons/react'
import ArchitectureView from '@/components/ArchitectureView'
import AIAgentsView from '@/components/AIAgentsView'
import MigrationView from '@/components/MigrationView'
import MetricsView from '@/components/MetricsView'

function App() {
  const [activeTab, setActiveTab] = useState('architecture')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
                Customer Loyalty Platform
              </h1>
              <p className="text-muted-foreground text-base">
                Azure Architecture & AI-First Modernization Strategy
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-primary mb-1">Neo Contoso</div>
              <div className="text-xs text-muted-foreground">Enterprise Transformation Initiative</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-auto p-1">
            <TabsTrigger 
              value="architecture" 
              className="flex items-center gap-2 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Cube className="w-4 h-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger 
              value="ai-agents" 
              className="flex items-center gap-2 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Robot className="w-4 h-4" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger 
              value="migration" 
              className="flex items-center gap-2 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <CloudArrowUp className="w-4 h-4" />
              Migration Strategy
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="flex items-center gap-2 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <ChartBar className="w-4 h-4" />
              Business Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="mt-0">
            <ArchitectureView />
          </TabsContent>

          <TabsContent value="ai-agents" className="mt-0">
            <AIAgentsView />
          </TabsContent>

          <TabsContent value="migration" className="mt-0">
            <MigrationView />
          </TabsContent>

          <TabsContent value="metrics" className="mt-0">
            <MetricsView />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Customer Loyalty Platform Architecture Demonstration • Powered by Microsoft Azure</p>
        </div>
      </footer>
    </div>
  )
}

export default App
