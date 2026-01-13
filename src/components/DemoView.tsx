import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkle, PaperPlaneTilt, Lightbulb }


  id: string

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
      const agentPrompt = spark.llmPrompt`You are the ${agentConfig[selectedAgent].name}, an AI assistant for the Neo Contoso Customer Loyalty Platform.

Your role: ${agentConfig[selectedAgent].description}

      const response 

        role: 'agent',



      toast.error('Failed to get resp
    } finally {
    }

    setPrompt(samplePrompt)


    toast.success('Chat cleared')


    <div className="space-y-6">
        <h2 className="text-2xl font-semib
          Exper
      </div>
     
   

          }`}
        >
   

              <Badge variant={sel
              </Bad
            <Card
              {agentConfig['campa
   

          className={`cursor-pointer transition-a

          
        >
            <div className="flex items-center justify
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
              <Badge variant={selectedAgent === 'support-operations' ? 
              </Badge>
            
            

      </div>
      <Card cl
          <div className="flex items-center justify-between">
              <div 
                style={{ backgroundColor: currentAgent.color }}
                <Sparkle className="w-5 h-5 text-white" weight="duotone" />
             
                <CardDescription className="text-xs">{currentAg
         
              <Button variant="outline"
              </Button>
          </div>


          {messages.length === 0 ? (
              <div className="flex items-start gap-2 text-
                <div>
                  
                      <button
                        onClick={() => handleUseS
                      >
                      </button
                  </div
              <

              
                  key={message.id}
                >
                    className={`max-w-[80%] rounded-lg p-4 ${
                        ? 'bg-primary text-primary-foreground'
             
                    <div className="text-xs opacity-70 mb-1">
         
                    <div className="tex
                    </div>
                </div>
            </div>

            <Textarea
              value={prompt}
              onKeyDow
                  
                }
              rows={3}
            />
              <p className="te
              </p>
               
            

                    <div classNam
                  </>
                  <>
                    Send
                )}
            </div>
        </CardContent>

        <CardHeader>
        </CardHeader
          <p classN
            and support operations. The agents use Azure OpenAI to understand 
            analytics platforms, and operational systems to deliver actionable insights and a
        </CardConten
    </div>
}































































































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
