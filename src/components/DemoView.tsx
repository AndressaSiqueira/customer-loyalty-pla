import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Sparkle, PaperPlaneTilt, Lightbulb } from '@phosphor-icons/react'

type Agent = 'campaign-designer' | 'support-operations'

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
    description: 'AI assistant for customer support optimization and issue resolution',
    samplePrompts: [
      'What are the top 5 support issues this week?',
      'Show me customers with open tickets older than 48 hours',
      'Analyze sentiment trends in support conversations',
      'Recommend proactive outreach for at-risk accounts'
    ]
  }
}

export default function DemoView() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>('campaign-designer')
  const [messages, setMessages] = useState<Message[]>([])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const currentAgent = agentConfig[selectedAgent]

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setPrompt('')
    setIsLoading(true)

    try {
      const agentPromptText = `You are the ${agentConfig[selectedAgent].name}, an AI assistant for the Neo Contoso Customer Loyalty Platform.

Your role: ${agentConfig[selectedAgent].description}

User query: ${userMessage.content}

Provide a helpful, specific response that demonstrates how you would help with this query. Be concise but informative.`

      const response = await window.spark.llm(agentPromptText)

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])
    } catch (error) {
      toast.error('Failed to get response from agent')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseSample = (samplePrompt: string) => {
    setPrompt(samplePrompt)
  }

  const handleClearChat = () => {
    setMessages([])
    toast.success('Chat cleared')
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-3">Interactive AI Agent Demo</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Experience how AI agents transform platform interactions. Select an agent below and try natural language queries 
          to see how they can help your team make data-driven decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
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
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
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
      </div>

      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: currentAgent.color }}
              >
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              </div>
              <div>
                <CardTitle className="text-lg">{currentAgent.name}</CardTitle>
                <CardDescription className="text-xs">{currentAgent.persona}</CardDescription>
              </div>
            </div>
            {messages.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearChat}
              >
                Clear Chat
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-4 bg-muted/30 rounded-lg space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-primary" weight="duotone" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">Try one of these sample prompts:</p>
                <div className="space-y-2 max-w-md mx-auto">
                  {currentAgent.samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUseSample(sample)}
                      className="w-full text-left p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-card/80 transition-all text-xs"
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
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-80">
                      {message.role === 'user' ? 'You' : currentAgent.name}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendPrompt()
                }
              }}
              placeholder={`Ask ${currentAgent.name} anything...`}
              disabled={isLoading}
              className="min-h-[80px]"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
              <Button 
                onClick={handleSendPrompt} 
                disabled={isLoading || !prompt.trim()}
                size="sm"
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Thinking...</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt className="w-4 h-4 mr-2" weight="duotone" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
