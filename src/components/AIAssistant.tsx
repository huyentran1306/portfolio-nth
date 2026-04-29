import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const QA: Record<string, string> = {
  'rule engine':
    "The Rule Engine is a shared .NET NuGet library that loads rules from Cosmos DB at startup and evaluates them in-process (no network hop). Rules are priority-sorted using Chain of Responsibility pattern. When marketing saves a rule via CMS, a Service Bus event triggers all instances to refresh their in-memory rule cache within 30s.",
  'caching':
    "I use a tiered caching strategy: Redis L1 (hot user data, 5min TTL) + in-memory L2 (per-instance, 30s). Cache invalidation happens via Azure Service Bus events on any balance mutation. This gave us 70% reduction in Cosmos DB RU consumption while keeping data fresh within 5s — acceptable per product SLA.",
  'microservices':
    "We migrated from monolith to microservices incrementally using the strangler fig pattern. Key principle: extract services based on measured bottlenecks, not speculation. The Rule Engine was extracted first (biggest bottleneck), then Notification Service, then User Profile. Each extraction took 2-3 weeks with dual-run validation.",
  'azure':
    "I use Azure AKS for container orchestration, Azure Service Bus for async messaging (durable, dead-letter queue), Cosmos DB for flexible schema storage (rules and rewards), and Azure AI Search for the knowledge base RAG system. Application Insights for observability with custom telemetry on rule evaluation paths.",
  'leadership':
    "My leadership principle: context-first. Developers make better decisions when they understand the WHY. I write design docs myself then invite challenge — opinions need skin in the game. Weekly 1:1s focus on blockers and growth, not status. I'm on-call rotation too — leads shouldn't be exempt from systems they build.",
  'latency':
    "The 60% latency reduction came from three changes: (1) Redis caching eliminated repeat Cosmos DB reads for hot data, (2) async processing via Service Bus decoupled reward processing from the HTTP response path, (3) connection pool tuning on .NET HttpClient to Azure services. P99 dropped from 3.2s → 1.1s.",
  'cosmosdb':
    "Cosmos DB was chosen for schema flexibility (each campaign type has different rule fields — SQL requires constant migrations), and for its partition key model enabling horizontal scale by userId. The multi-region replication was required by CapitaStar's SLA. Tradeoff: eventual consistency, which we handle with optimistic locking on reward writes.",
  'ai':
    "I integrated AI in four ways: (1) GPT-4o for test case generation from rule specs — 80% time reduction, (2) RAG chatbot over Confluence wikis for dev onboarding, (3) ML anomaly detection on App Insights telemetry — proactive alerts 10min before threshold breach, (4) LLM-based sprint planning with velocity matching.",
}

const SUGGESTIONS = [
  'How does the Rule Engine work?',
  'Tell me about caching strategy',
  'Explain the microservices migration',
  'How do you use Azure?',
  'What\'s your leadership style?',
]

function findAnswer(query: string): string {
  const q = query.toLowerCase()
  for (const [key, answer] of Object.entries(QA)) {
    if (q.includes(key)) return answer
  }
  return "That's a great question. I'd be happy to discuss it in detail — feel free to reach out via LinkedIn or email. The short answer: every architectural decision I've made comes down to measuring the real bottleneck first, then solving that specifically, not the imagined one."
}

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm a knowledge base about Huyen's engineering work. Ask me about the Rule Engine, caching strategy, microservices architecture, or leadership approach.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600))
    const answer = findAnswer(text)
    setTyping(false)
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'assistant', text: answer }])
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg shadow-[var(--accent)]/30"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '480px' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                <Bot size={16} className="text-[var(--accent)]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--fg)]">Engineering Knowledge Base</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-[var(--accent)] text-white rounded-br-sm'
                        : 'bg-[var(--bg-secondary)] text-[var(--fg)] rounded-bl-sm'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-secondary)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--fg-tertiary)]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--fg-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--border)] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Ask about architecture, caching, AI..."
                className="flex-1 bg-[var(--bg-secondary)] rounded-xl px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--fg-tertiary)] outline-none border border-transparent focus:border-[var(--accent)]/50"
              />
              <button
                onClick={() => send(input)}
                className="w-10 h-10 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
