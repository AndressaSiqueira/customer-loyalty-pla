import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sparkle, PaperPlaneTilt, Lightbulb } from '@phosphor-icons/react'
import { toast } from 'sonner'

type Agent = 'campaign-designer' | 'support-operations'

interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

export default function DemoView() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>('campaign-designer')
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const agentConfig = {
    'campaign-designer': {
      name: 'Campaign Designer Agent',
      persona: 'Marketing Manager',
      color: 'var(--ai-agents)',
      description: 'AI-powered marketing assistant for campaign creation and customer insights',
      samplePrompts: [
        'Show me customers who spent over $500 last quarter but haven\'t purchased this month',
        'Create a win-back campaign for customers who churned in the last 90 days',
        'Which product categories are trending up this week vs last week?',
        'Forecast the impact of a 15% discount on premium member reactivation'
      ]
    },
    'support-operations': {
      name: 'Support & Operations Agent',
      persona: 'Support Team',
      color: 'var(--security)',
      description: 'Intelligent operations assistant for support triage and system monitoring',
      samplePrompts: [
        'Why hasn\'t customer ID 12345\'s recent purchase been credited to their account?',
        'Show me all critical errors in the loyalty service from the past hour',
        'Is the current API latency spike within normal range for this time of day?',
        'What are the top 3 support issues reported today and their common patterns?'
      ]
    }
  }

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
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
      const agentName = agentConfig[selectedAgent].name
      const agentDesc = agentConfig[selectedAgent].description
      const userQuery = prompt
      
      const promptText = `You are the ${agentName}, an AI assistant for the Neo Contoso Customer Loyalty Platform.

Your role: ${agentDesc}

User query: ${userQuery}

Provide a helpful, detailed response that demonstrates your capabilities. Include specific data points, insights, or recommendations where appropriate. Be conversational but professional.`

      const response = await window.spark.llm(promptText, 'gpt-4o')

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])
      toast.success('Response received')
    } catch (error) {
      toast.error('Failed to get response from agent')
      console.error('Agent error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt)
  }

  const handleClearChat = () => {
    setMessages([])
    setPrompt('')
    toast.success('Chat cleared')
  }

  const currentAgent = agentConfig[selectedAgent]

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">Interactive AI Agent Demo</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Experience the power of our AI agents by asking questions and getting intelligent responses in real-time.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card 
          className={`cursor-pointer transition-all duration-300 ${
            selectedAgent === 'campaign-designer' 
              ? 'border-2 border-[var(--ai-agents)] bg-[var(--ai-agents)]/10 shadow-lg' 
              : 'border-2 border-border hover:border-[var(--ai-agents)]/50'
          }`}
          onClick={() => setSelectedAgent('campaign-designer')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[var(--ai-agents)] flex items-center justify-center">
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              </div>
              <Badge variant={selectedAgent === 'campaign-designer' ? 'default' : 'outline'}>
                {agentConfig['campaign-designer'].persona}
              </Badge>
            </div>
            <CardTitle className="text-lg pt-2">{agentConfig['campaign-designer'].name}</CardTitle>
            <CardDescription className="text-sm">
              {agentConfig['campaign-designer'].description}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-300 ${
            selectedAgent === 'support-operations' 
              ? 'border-2 border-[var(--security)] bg-[var(--security)]/10 shadow-lg' 
              : 'border-2 border-border hover:border-[var(--security)]/50'
          }`}
          onClick={() => setSelectedAgent('support-operations')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[var(--security)] flex items-center justify-center">
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              </div>
              <Badge variant={selectedAgent === 'support-operations' ? 'default' : 'outline'}>
                {agentConfig['support-operations'].persona}
              </Badge>
            </div>
            <CardTitle className="text-lg pt-2">{agentConfig['support-operations'].name}</CardTitle>
            <CardDescription className="text-sm">
              {agentConfig['support-operations'].description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader className="pb-4">
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
              <Button variant="outline" size="sm" onClick={handleClearChat}>
                Clear Chat
              </Button>
            )}
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <p className="font-medium mb-2">Try these sample prompts:</p>
                  <div className="space-y-2">
                    {currentAgent.samplePrompts.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleUseSamplePrompt(sample)}
                        className="block w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors text-foreground text-sm"
                      >
                        "{sample}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      {message.role === 'user' ? 'You' : currentAgent.name}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
              <Button 
                onClick={handleSendPrompt} 
                disabled={isLoading || !prompt.trim()}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt className="w-4 h-4" weight="bold" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">About This Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This interactive demo showcases how Neo Contoso's AI agents can transform workflows for marketing teams 
            and support operations. The agents use Azure OpenAI to understand natural language queries and provide 
            intelligent, context-aware responses. In production, these agents would be connected to real customer data, 
            analytics platforms, and operational systems to deliver actionable insights and automate complex tasks.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
