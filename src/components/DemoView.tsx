import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHe
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Sparkle, PaperPlaneTilt, Lightbulb } from '@phosphor-icons/react'
import { toast } from 'sonner'

type Agent = 'campaign-designer' | 'support-operations'

interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}


    'campaign-designer': {
      persona: 'Marketing Manager',
      description: 'AI-powered marketing assistant for ca
        'Show me customers who spent over $500 last

      ]
    'support-operations': 
      persona: 'Support Manager',
      description: 'AI assistant fo
        'What are the top 5 supp
        'Analyze sentiment trends in support conversations',
      ]
  }
  const handleSendPrompt = async () => {
      return

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

            <div className="flex items-center jus

          
              </div>
                {agentConfig['campaign-designer'].per
            </div>
            <CardDescription className="text-xs">
            </CardDescription>
        </Card>
        <Car
            

          onClick={() => setSelectedAgent('suppor
          <Ca
              <div 
                style={{ backgroundColor: agentCo
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              <Badge variant={selectedAgent === 'support-operation
             
            <CardTitle className="text-base">{agentConfig['supp
         
          </CardHeader
      </div>
      <Card classNa
          <div className="flex items-center justify-between">
              <div 
               
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              <div>
                <CardDescription className="text-xs">{currentAgent.persona}</CardDescription>
            </div>
              <Button 
              </Bu
          </div>

          <div className="min-h-[300px] max-h-[400px] overfl
              <div className="
                <div>
               

             
                      >
                      </button>
                  </div>
              </div>
             
                  key={message.id}
         
                    cl
                        ? 'bg-primary text-primary-foreground'
                   
                    <p className="text-xs font-semibold mb-1 opacity-80">
                    </p>
               
              ))
          </div>
          <div className="space-y-2">
              value={prompt}
              onKeyDow
                  
                }
              placeholder={`Ask ${currentAgent.na
              disabled={isLoading}
            <div className="fl
                Press E
              <
            

                ) : (
                    
                  </>
              </Button>
          </div>
      </Card>
  )





























                      >









                  key={message.id}

                >

                    className={`max-w-[80%] rounded-lg p-3 ${

                        ? 'bg-primary text-primary-foreground'



                    <p className="text-xs font-semibold mb-1 opacity-80">

                    </p>


                </div>





            <Textarea
              value={prompt}





                }


              className="min-h-[80px]"

            />



              </p>





                  </>

                  <>

                    Send

                )}

            </div>

        </CardContent>
      </Card>
    </div>
  )
}
