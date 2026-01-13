import { useState } from 'react'
import { Textarea } from '@/components/ui/texta
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkle, PaperPlaneTilt, Lightbulb } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface Message {

  timestamp: Date

  const [selectedAgent, 
  const [messages

 

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
       
    }

    if (!prompt.trim()) {
      return

      id: Date.now().toString(),
      content: prompt,
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    try {





        id: (Date.now() +
        content: response,
      }
     

    } finally {
    }

    setPrompt(samplePr

    s

  const currentAgent = agentConfig[selectedAgen
  return (
      <div className="

         
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

  const currentAgent = agentConfig[selectedAgent]

  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">Experience AI Agents</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Try the interactive demo below. Select an agent and ask natural language questions to see 
          how they can transform business workflows.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all duration-300 border-2 ${
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
          className={`cursor-pointer transition-all duration-300 border-2 ${
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

      <Card className="border-2">
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
                <CardTitle className="text-base">{currentAgent.name}</CardTitle>
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

        <CardContent className="space-y-4">
          <div className="min-h-[300px] max-h-[400px] overflow-y-auto space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
            {messages.length === 0 ? (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <p className="mb-3">Try asking something like:</p>
                  <div className="space-y-2">
                    {currentAgent.samplePrompts.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleUseSample(sample)}
                        className="block w-full text-left p-2 rounded bg-card hover:bg-accent/10 border border-border text-xs italic transition-colors"
              <p classN
                        "{sample}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
            </div>
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
      </Card>
                  <div
        <CardHeader>
                      message.role === 'user'
        <CardContent>
                        : 'bg-card border border-border'
                    }`}
                  >
          </p>
                      {message.role === 'user' ? 'You' : currentAgent.name}
}
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>

              ))
            )}
          </div>

          <div className="space-y-2">


              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendPrompt()

              }}
              placeholder={`Ask ${currentAgent.name} anything...`}

              disabled={isLoading}

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line

              <Button onClick={handleSendPrompt} disabled={isLoading || !prompt.trim()}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Thinking...

                ) : (

                    <PaperPlaneTilt className="w-4 h-4 mr-2" weight="fill" />

                  </>

              </Button>

          </div>



















