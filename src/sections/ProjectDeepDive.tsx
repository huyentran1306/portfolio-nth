import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ruleEngineRules } from '@/data/ruleEngine'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { RuleEnginePipeline } from '@/components/RuleEnginePipeline'

function ArchDiagram() {
  const nodes = [
    { id: 'fe', label: 'Frontend', sub: 'React App', color: 'bg-blue-500/20 border-blue-500/40 text-blue-400' },
    { id: 'api', label: 'API Gateway', sub: '.NET Web API', color: 'bg-violet-500/20 border-violet-500/40 text-violet-400' },
    { id: 're', label: 'Rule Engine', sub: 'NuGet Library', color: 'bg-[var(--accent)]/20 border-[var(--accent)]/40 text-[var(--accent)]' },
    { id: 'db', label: 'Cosmos DB', sub: 'Rules + Rewards', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' },
    { id: 'sb', label: 'Service Bus', sub: 'Azure ASB', color: 'bg-orange-500/20 border-orange-500/40 text-orange-400' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-8">
      {nodes.map((node, i) => (
        <div key={node.id} className="flex items-center gap-3">
          <div className={cn('px-4 py-3 rounded-xl border text-center min-w-[100px]', node.color)}>
            <div className="text-xs font-bold">{node.label}</div>
            <div className="text-xs opacity-70 mt-0.5">{node.sub}</div>
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight size={16} className="text-[var(--fg-tertiary)] flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function RuleEngineDemo() {
  return <RuleEnginePipeline />
}

function EngineeringDecisions() {
  const decisions = [
    {
      tech: 'Azure Service Bus',
      why: 'Durable async messaging for reward processing. Decouples high-frequency writes from rule evaluation. Dead-letter queue ensures no reward is silently dropped.',
      alt: 'Could have used HTTP callbacks, but they fail silently under load.',
    },
    {
      tech: 'Cosmos DB',
      why: 'Schema-flexible rule documents. Each campaign type has different fields — SQL would require constant migrations. Partition key on userId enables horizontal scale.',
      alt: 'Considered PostgreSQL JSONB, but Cosmos DB multi-region replication was required by SLA.',
    },
    {
      tech: 'Separate Rule Engine from CMS',
      why: 'Separation of concerns: CMS owns rule authoring (write path), Rule Engine owns evaluation (read path). CMS can be down without affecting reward processing.',
      alt: 'Previous design had CMS as a dependency in the hot path — one CMS deploy could drop reward processing.',
    },
  ]

  return (
    <div className="space-y-4">
      {decisions.map((d) => (
        <div key={d.tech} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <div className="font-semibold text-[var(--fg)] mb-2">
            Why <span className="text-[var(--accent)]">{d.tech}</span>?
          </div>
          <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-2">{d.why}</p>
          <p className="text-xs text-[var(--fg-tertiary)] italic">{d.alt}</p>
        </div>
      ))}
    </div>
  )
}

export function ProjectDeepDive() {
  const [activeTab, setActiveTab] = useState<'arch' | 'sim' | 'decisions'>('sim')

  const tabs = [
    { id: 'arch', label: 'Architecture' },
    { id: 'sim', label: 'Rule Engine Demo ⚡' },
    { id: 'decisions', label: 'Key Decisions' },
  ] as const

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            Project Deep Dive
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
            CapitaStar Loyalty Platform
          </h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            A production loyalty system processing 500k+ daily reward transactions.
            This is the architecture, the simulation, and the reasoning behind it.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[var(--bg-secondary)] p-1 rounded-xl w-fit mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-[var(--card)] text-[var(--fg)] shadow-sm'
                  : 'text-[var(--fg-secondary)] hover:text-[var(--fg)]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-8"
          >
            {activeTab === 'arch' && (
              <div>
                <h3 className="font-semibold text-[var(--fg)] mb-2">System Architecture</h3>
                <p className="text-sm text-[var(--fg-secondary)] mb-6">
                  Event-driven microservices on Azure AKS. Each service has a single responsibility and communicates async via Service Bus.
                </p>
                <ArchDiagram />
                <div className="mt-6 space-y-3">
                  {[
                    { flow: 'Frontend → API Gateway', desc: 'REST calls authenticated via Azure AD B2C' },
                    { flow: 'API → Rule Engine', desc: 'In-process evaluation, no network hop (shared library)' },
                    { flow: 'Rule Engine → Cosmos DB', desc: 'Rules loaded at startup, refreshed via event. Rewards written after evaluation.' },
                    { flow: 'Rule Engine → Service Bus', desc: 'Async publish of RewardGranted events for downstream consumers' },
                  ].map((item) => (
                    <div key={item.flow} className="flex gap-4 text-sm">
                      <span className="font-mono text-[var(--accent)] flex-shrink-0">{item.flow}</span>
                      <span className="text-[var(--fg-secondary)]">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'sim' && (
              <div>
                <h3 className="font-semibold text-[var(--fg)] mb-1">Rule Engine Simulation</h3>
                <p className="text-sm text-[var(--fg-secondary)] mb-6">
                  Enter a transaction and see how the rule engine evaluates {ruleEngineRules.length} rules in priority order.
                </p>
                <RuleEngineDemo />
              </div>
            )}
            {activeTab === 'decisions' && (
              <div>
                <h3 className="font-semibold text-[var(--fg)] mb-1">Key Engineering Decisions</h3>
                <p className="text-sm text-[var(--fg-secondary)] mb-6">
                  Every tech choice was made deliberately. Here's the reasoning.
                </p>
                <EngineeringDecisions />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
