import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkle, Lightbulb, Trash } from '@phospho



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
    ]
}
export default function DemoView() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const currentAgent = agentConfig[selectedAgent]
  con
   


      content: prompt.trim(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    try {





        id: 
     

      setMessages(prev => [...prev
      toast.error('Failed to get
      setIsLoading(
  }
  const handleUseSample = (
  }

  }
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
              </div>
                <CardTi
              <

              
                onClick={handleClearChat}
                <Trash className="w-4 h-4" />
            )}
        </CardHeader>
        <Card
            {messages.length === 0 ? (
        >
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                   
                      onClick={() => handleUseSample(sample)}
                    >
               
                </div>
              </div>
                <div
                  className={`flex ${message.role === 'user
                  <div
            </div>
                        : 'bg-card border border-border'
                  >
                      {message.role === 'user' ? 'You' : curr
                    <p classNa
                </div>
            )}


              onChange={(e) => setPrompt(e.targe
        <CardHeader>
                  handleSendPrompt()
              }}
              disab
            />
              <p className="text-xs text-muted-foreground">
              >
                onClick={handleSendPrompt} 
                size
                {is
                    <span className="animate-pulse">Thinking...</span>
                ) : (
                    
                )}
            </div>
        </CardContent>
    </div>
}
                onClick={handleClearChat}

                <Trash className="w-4 h-4" />



















                    >

                    </button>

                </div>

            ) : (

                <div











                      {message.role === 'user' ? 'You' : currentAgent.persona}



                </div>

            )}



            <Textarea





                  handleSendPrompt()

              }}

              disabled={isLoading}

            />



              </p>



                size="sm"

                {isLoading ? (






                  </>

              </Button>

          </div>

      </Card>

  )

