import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Sparkle, Lightbulb, Trash, UserCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import DashboardOverview from '@/components/DashboardOverview'

declare const spark: Window['spark']

type Agent = 'campaign-designer' | 'support-operations' | 'store-associate-coach'

interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

const agentConfig = {
  'campaign-designer': {
    name: 'Campaign Designer Agent',
    persona: 'Marketing Manager',
    color: 'var(--ai-agents)',
    description: 'AI-powered marketing assistant for campaign optimization and customer insights',
    samplePrompts: [
      'Show me customers who spent over $500 last quarter',
      'What campaign generated the highest ROI in the last 3 months?',
      'Suggest a targeted campaign for customers with declining engagement',
      'Forecast the impact of a 20% points bonus on redemption rates'
    ]
  },
  'support-operations': {
    name: 'Support Operations Agent',
    persona: 'Support Manager',
    color: 'var(--security)',
    description: 'Automated triage and operational health monitoring for support teams',
    samplePrompts: [
      'Why hasn\'t customer ID 12345\'s recent purchase been credited?',
      'Show me all critical errors in the loyalty service from the past hour',
      'Is the current API latency spike within normal range?',
      'What are the top 3 support issues reported today?'
    ]
  },
  'store-associate-coach': {
    name: 'Store Associate Coach',
    persona: 'Store Associate',
    color: 'var(--data-platform)',
    description: 'Real-time customer insights and recommendations for front-line workers',
    samplePrompts: [
      'Customer Emily Chen just checked in, what should I know about her?',
      'What offers should I recommend for customer ID 789?',
      'Guide me through redeeming points for this customer',
      'What training resources help with high-value customer interactions?'
    ]
  }
}

export default function DemoView() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>('campaign-designer')
  const [messages, setMessages] = useState<Message[]>([])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatAreaRef = useRef<HTMLDivElement>(null)

  const currentAgent = agentConfig[selectedAgent]

  const handleSendPrompt = async () => {
    if (!prompt.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setPrompt('')
    setIsLoading(true)

    try {
      const agentPrompt = spark.llmPrompt`You are the ${agentConfig[selectedAgent].name}, an AI assistant for the Neo Contoso Customer Loyalty Platform.

Your role: ${agentConfig[selectedAgent].description}

User query: ${userMessage.content}

Provide a helpful, specific response that demonstrates how you would help with this query. Be concise but informative.`

      const response = await spark.llm(agentPrompt)

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])
    } catch (error) {
      toast.error('Failed to get response from agent')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseSample = (samplePrompt: string) => {
    setPrompt(samplePrompt)
  }

  const handleClearChat = () => {
    setMessages([])
  }

  const handleRecommendationClick = (agent: Agent, prompt: string) => {
    setSelectedAgent(agent)
    setPrompt(prompt)
    // Scroll to the chat area
    setTimeout(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-3">Interactive AI Agent Demo</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Experience how AI agents transform platform interactions. Select an agent below and try natural language queries 
          to see how they can help your team make data-driven decisions.
        </p>
      </div>

      {/* Dashboard Overview */}
      <DashboardOverview onRecommendationClick={handleRecommendationClick} />

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card
          className={`cursor-pointer transition-all duration-200 border-2 ${
            selectedAgent === 'campaign-designer' 
              ? 'border-[var(--ai-agents)] bg-[var(--ai-agents)]/10 shadow-lg' 
              : 'border-border hover:border-[var(--ai-agents)]/50'
          }`}
          onClick={() => setSelectedAgent('campaign-designer')}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: agentConfig['campaign-designer'].color }}
              >
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              </div>
              <Badge variant={selectedAgent === 'campaign-designer' ? 'default' : 'outline'}>
                {agentConfig['campaign-designer'].persona}
              </Badge>
            </div>
            <CardTitle className="text-base">{agentConfig['campaign-designer'].name}</CardTitle>
            <CardDescription className="text-xs">
              {agentConfig['campaign-designer'].description}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 border-2 ${
            selectedAgent === 'support-operations' 
              ? 'border-[var(--security)] bg-[var(--security)]/10 shadow-lg' 
              : 'border-border hover:border-[var(--security)]/50'
          }`}
          onClick={() => setSelectedAgent('support-operations')}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: agentConfig['support-operations'].color }}
              >
                <Lightbulb className="w-5 h-5 text-white" weight="duotone" />
              </div>
              <Badge variant={selectedAgent === 'support-operations' ? 'default' : 'outline'}>
                {agentConfig['support-operations'].persona}
              </Badge>
            </div>
            <CardTitle className="text-base">{agentConfig['support-operations'].name}</CardTitle>
            <CardDescription className="text-xs">
              {agentConfig['support-operations'].description}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 border-2 ${
            selectedAgent === 'store-associate-coach' 
              ? 'border-[var(--data-platform)] bg-[var(--data-platform)]/10 shadow-lg' 
              : 'border-border hover:border-[var(--data-platform)]/50'
          }`}
          onClick={() => setSelectedAgent('store-associate-coach')}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: agentConfig['store-associate-coach'].color }}
              >
                <UserCircle className="w-5 h-5 text-white" weight="duotone" />
              </div>
              <Badge variant={selectedAgent === 'store-associate-coach' ? 'default' : 'outline'}>
                {agentConfig['store-associate-coach'].persona}
              </Badge>
            </div>
            <CardTitle className="text-base">{agentConfig['store-associate-coach'].name}</CardTitle>
            <CardDescription className="text-xs">
              {agentConfig['store-associate-coach'].description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-2" ref={chatAreaRef}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{currentAgent.name}</CardTitle>
              <CardDescription className="text-xs">Ask questions using natural language</CardDescription>
            </div>
            {messages.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClearChat}
              >
                <Trash className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 p-4 rounded-lg bg-muted/30">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: currentAgent.color }}
                >
                  <Sparkle className="w-8 h-8 text-white" weight="duotone" />
                </div>
                <h3 className="font-semibold text-base mb-2">Try these sample queries</h3>
                <div className="space-y-2 max-w-md mx-auto">
                  {currentAgent.samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left p-3 rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all text-sm"
                      onClick={() => handleUseSample(sample)}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-2">
                      {message.role === 'user' ? 'You' : currentAgent.persona}
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-card border border-border">
                  <div className="font-semibold text-xs mb-2">{currentAgent.persona}</div>
                  <p className="text-sm text-muted-foreground animate-pulse">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder={`Ask ${currentAgent.name} anything...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendPrompt()
                }
              }}
              disabled={isLoading}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
              <Button 
                onClick={handleSendPrompt} 
                disabled={!prompt.trim() || isLoading}
                size="sm"
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Thinking...</span>
                  </>
                ) : (
                  'Send'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
