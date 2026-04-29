import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RefreshCw, Zap, AlertTriangle } from 'lucide-react'

interface Instance {
  id: string
  name: string
  balance: number
  synced: boolean
}

function CacheInconsistencyDemo() {
  const [instances, setInstances] = useState<Instance[]>([
    { id: 'a', name: 'Instance A', balance: 500, synced: true },
    { id: 'b', name: 'Instance B', balance: 500, synced: true },
  ])
  const [log, setLog] = useState<string[]>(['System initialized. Both instances in sync.'])
  const [phase, setPhase] = useState<'idle' | 'inconsistent' | 'syncing' | 'synced'>('idle')

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 8))

  const triggerTransaction = async () => {
    setPhase('inconsistent')
    // Instance A updates via Service Bus event
    addLog('💳 Transaction: User spends $100, earns 200 points')
    await new Promise((r) => setTimeout(r, 500))
    setInstances((prev) =>
      prev.map((i) => (i.id === 'a' ? { ...i, balance: 700, synced: false } : { ...i, synced: false }))
    )
    addLog('⚡ Instance A: balance updated to 700 (DB write complete)')
    addLog('⚠️  Instance B: still showing 500 — STALE DATA!')
  }

  const triggerSync = async () => {
    setPhase('syncing')
    addLog('📨 Service Bus: BalanceUpdated event published')
    await new Promise((r) => setTimeout(r, 700))
    addLog('🔄 Instance B: received invalidation event, evicting cache...')
    await new Promise((r) => setTimeout(r, 500))
    setInstances((prev) => prev.map((i) => ({ ...i, balance: 700, synced: true })))
    setPhase('synced')
    addLog('✅ Both instances synchronized. Consistency restored.')
  }

  const reset = () => {
    setInstances([
      { id: 'a', name: 'Instance A', balance: 500, synced: true },
      { id: 'b', name: 'Instance B', balance: 500, synced: true },
    ])
    setLog(['System reset. Both instances in sync.'])
    setPhase('idle')
  }

  return (
    <div className="space-y-6">
      {/* Instances */}
      <div className="grid grid-cols-2 gap-4">
        {instances.map((inst) => (
          <div
            key={inst.id}
            className={cn(
              'p-5 rounded-xl border transition-all duration-500',
              inst.synced
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-red-400/40 bg-red-400/5'
            )}
          >
            <div className="text-xs font-mono text-[var(--fg-tertiary)] mb-2">{inst.name}</div>
            <div className="text-3xl font-bold text-[var(--fg)] mb-1">{inst.balance}</div>
            <div className="text-xs text-[var(--fg-secondary)]">cached balance</div>
            <div
              className={cn(
                'mt-3 text-xs px-2 py-1 rounded-full inline-block font-medium',
                inst.synced ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
              )}
            >
              {inst.synced ? '✓ In sync' : '⚠ Stale'}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={triggerTransaction}
          disabled={phase !== 'idle'}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          <Zap size={14} /> Trigger Transaction
        </button>
        <button
          onClick={triggerSync}
          disabled={phase !== 'inconsistent'}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          <RefreshCw size={14} /> Sync via Service Bus
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2.5 border border-[var(--border)] text-[var(--fg-secondary)] rounded-lg text-sm hover:text-[var(--fg)] transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Log */}
      <div className="bg-[var(--bg)] rounded-xl border border-[var(--border)] p-4 font-mono text-xs space-y-1.5 min-h-[140px]">
        <AnimatePresence>
          {log.map((entry, i) => (
            <motion.div
              key={`${entry}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[var(--fg-secondary)]"
            >
              <span className="text-[var(--fg-tertiary)]">{String(log.length - i).padStart(2, '0')}</span>{' '}
              {entry}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function RuleConflictDemo() {
  const [rules] = useState([
    { id: 'R1', name: 'Flash Sale: 3× points', priority: 10, condition: 'spend ≥ $50 AND campaign=FlashSale', active: true },
    { id: 'R2', name: 'Weekend Bonus: 2× points', priority: 7, condition: 'spend ≥ $50 AND day=Weekend', active: true },
    { id: 'R3', name: 'Base Rate: 1× points', priority: 1, condition: 'spend ≥ $0', active: true },
  ])
  const [scenario, setScenario] = useState<'conflict' | 'resolved' | null>(null)

  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--fg-secondary)]">
        A user spends $80 on a Saturday during a Flash Sale. <strong className="text-[var(--fg)]">Which rule wins?</strong>
      </p>

      <div className="space-y-2">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center gap-3 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
            <div className="text-xs font-mono text-[var(--accent)] w-8">{rule.id}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[var(--fg)]">{rule.name}</div>
              <div className="text-xs text-[var(--fg-tertiary)] font-mono mt-0.5">{rule.condition}</div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--fg-secondary)]">
              P{rule.priority}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setScenario('conflict')}
          className="px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
        >
          <AlertTriangle size={14} className="inline mr-1.5" />
          Show conflict (no priority)
        </button>
        <button
          onClick={() => setScenario('resolved')}
          className="px-4 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors"
        >
          Show resolution (with priority)
        </button>
      </div>

      <AnimatePresence>
        {scenario && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'p-5 rounded-xl border',
              scenario === 'conflict'
                ? 'border-red-500/30 bg-red-500/5'
                : 'border-emerald-500/30 bg-emerald-500/5'
            )}
          >
            {scenario === 'conflict' ? (
              <>
                <div className="text-sm font-semibold text-red-400 mb-2">❌ Without priority system</div>
                <p className="text-sm text-[var(--fg-secondary)]">
                  R1 and R2 both match. System applies both: 3× + 2× = 5× points? Or applies last evaluated? 
                  Result: <strong className="text-red-400">inconsistent behavior, potential reward fraud.</strong>
                </p>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-emerald-400 mb-2">✅ With priority-based resolution</div>
                <p className="text-sm text-[var(--fg-secondary)]">
                  R1 (P10) &gt; R2 (P7) &gt; R3 (P1). Highest priority wins. User gets 3× (Flash Sale), R2 and R3 skipped.{' '}
                  <strong className="text-[var(--fg)]">$80 × 3 = 240 points. Deterministic and auditable.</strong>
                </p>
                <div className="mt-3 p-3 bg-[var(--bg)] rounded-lg font-mono text-xs text-[var(--fg-secondary)]">
                  EvaluateRules(rules.OrderByDesc(r =&gt; r.Priority).FirstOrDefault(r =&gt; r.Matches(tx)))
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProblemSolutionLab() {
  const [activeTab, setActiveTab] = useState<'cache' | 'conflict'>('cache')

  return (
    <section id="lab" className="py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            Problem–Solution Lab
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
            Real problems.
            <br />
            <span className="text-[var(--accent)]">Demonstrated solutions.</span>
          </h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            These aren't theoretical. Both problems caused production incidents before we solved them.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[var(--bg)] p-1 rounded-xl w-fit mx-auto border border-[var(--border)]">
          {[
            { id: 'cache', label: '⚡ Cache Inconsistency' },
            { id: 'conflict', label: '🔀 Rule Conflict' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-white'
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
            {activeTab === 'cache' ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-2">Cache Inconsistency Across Instances</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <div className="font-medium text-red-400 mb-1">Problem</div>
                      <p className="text-[var(--fg-secondary)]">AKS runs 3+ pod replicas. Each has its own in-memory cache. After a reward transaction, only one pod's cache is updated. Others serve stale balance.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="font-medium text-emerald-400 mb-1">Solution</div>
                      <p className="text-[var(--fg-secondary)]">Event-driven cache invalidation. DB write publishes BalanceUpdated to Service Bus. All pod instances subscribe and evict their local cache entry.</p>
                    </div>
                  </div>
                </div>
                <CacheInconsistencyDemo />
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-2">Rule Conflict in Campaign System</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <div className="font-medium text-red-400 mb-1">Problem</div>
                      <p className="text-[var(--fg-secondary)]">Multiple campaigns overlap in time. User matches 3 rules simultaneously. Without conflict resolution, system behavior is non-deterministic.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="font-medium text-emerald-400 mb-1">Solution</div>
                      <p className="text-[var(--fg-secondary)]">Priority-based rule evaluation. Each rule has an explicit numeric priority. Evaluation stops at first match (configurable). Marketing sets priorities in CMS.</p>
                    </div>
                  </div>
                </div>
                <RuleConflictDemo />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
