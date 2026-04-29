import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { simulateRuleEngine } from '@/data/ruleEngine'
import { useSystemStore } from '@/store/system'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, Zap, ArrowRight } from 'lucide-react'

const TIERS = ['Silver', 'Gold', 'Platinum']

const PIPELINE_STAGES = [
  { id: 'tx', label: 'Transaction', icon: '💳', color: 'blue' },
  { id: 'queue', label: 'Service Bus Queue', icon: '📨', color: 'violet' },
  { id: 'engine', label: 'Rule Engine', icon: '⚙️', color: 'indigo' },
  { id: 'db', label: 'Cosmos DB Write', icon: '🗄️', color: 'emerald' },
  { id: 'result', label: 'Reward Granted', icon: '🏆', color: 'yellow' },
]

const stageColorMap: Record<string, string> = {
  blue: 'border-blue-500/60 bg-blue-500/10 text-blue-400',
  violet: 'border-violet-500/60 bg-violet-500/10 text-violet-400',
  indigo: 'border-indigo-500/60 bg-indigo-500/10 text-indigo-400',
  emerald: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400',
  yellow: 'border-yellow-500/60 bg-yellow-500/10 text-yellow-400',
}

export function RuleEnginePipeline() {
  const [spend, setSpend] = useState(150)
  const [campaign, setCampaign] = useState(true)
  const [tier, setTier] = useState('Gold')
  const [activeStageIdx, setActiveStageIdx] = useState<number | null>(null)
  const [result, setResult] = useState<ReturnType<typeof simulateRuleEngine> | null>(null)
  const [running, setRunning] = useState(false)
  const { failureMode, setMetrics } = useSystemStore()

  const handleSimulate = async () => {
    setRunning(true)
    setResult(null)
    setActiveStageIdx(null)

    // Update system metrics during simulation
    setMetrics({ systemStatus: 'loading', latency: failureMode ? 3200 : 142 })

    for (let i = 0; i < PIPELINE_STAGES.length; i++) {
      setActiveStageIdx(i)
      const delay = failureMode
        ? i === 1 ? 2000 : 600  // queue overload in failure mode
        : 500
      await new Promise((r) => setTimeout(r, delay))

      if (failureMode && i === 1) {
        // Simulate queue overflow in failure mode
        setMetrics({ errorRate: 24.5 })
      }
    }

    const sim = simulateRuleEngine({ spendAmount: spend, campaignActive: campaign, tier })
    setResult(sim)
    setActiveStageIdx(null)
    setRunning(false)
    setMetrics({ systemStatus: failureMode ? 'error' : 'optimized' })
  }

  return (
    <div className="space-y-6">
      {/* Input grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-[var(--fg-secondary)] mb-2 block">Spend Amount ($)</label>
          <input
            type="number"
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            min={0}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--fg-secondary)] mb-2 block">Member Tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)]"
          >
            {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--fg-secondary)] mb-2 block">Campaign Active</label>
          <button
            onClick={() => setCampaign(!campaign)}
            className={cn(
              'w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all',
              campaign
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-[var(--border)] text-[var(--fg-secondary)]'
            )}
          >
            {campaign ? '✓ Campaign ON' : '✗ Campaign OFF'}
          </button>
        </div>
      </div>

      {/* Pipeline visualization */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max mx-auto justify-center">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.id} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: activeStageIdx === i ? 1.08 : 1,
                  boxShadow: activeStageIdx === i
                    ? '0 0 20px rgba(99,102,241,0.4)'
                    : '0 0 0px transparent',
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'px-4 py-3 rounded-xl border text-center min-w-[110px] transition-all duration-300',
                  activeStageIdx === i
                    ? stageColorMap[stage.color]
                    : activeStageIdx !== null && i < activeStageIdx
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400/70'
                    : 'border-[var(--card-border)] bg-[var(--card)] text-[var(--fg-tertiary)]'
                )}
              >
                <div className="text-lg mb-1">{stage.icon}</div>
                <div className="text-[11px] font-semibold leading-tight">{stage.label}</div>
                {activeStageIdx === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1.5 flex justify-center"
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full border-2 border-current border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                )}
                {activeStageIdx !== null && i < activeStageIdx && (
                  <div className="mt-1 text-emerald-400 flex justify-center">
                    <CheckCircle2 size={12} />
                  </div>
                )}
              </motion.div>
              {i < PIPELINE_STAGES.length - 1 && (
                <motion.div
                  animate={{ opacity: activeStageIdx !== null && i < activeStageIdx ? 1 : 0.3 }}
                >
                  <ArrowRight size={14} className="text-[var(--fg-tertiary)]" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Run button */}
      <button
        onClick={handleSimulate}
        disabled={running}
        className={cn(
          'w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all',
          failureMode
            ? 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50'
            : 'bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-50'
        )}
      >
        {running ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}>
              <Zap size={16} />
            </motion.div>
            {failureMode ? 'Queue overloaded...' : 'Processing transaction...'}
          </>
        ) : (
          <>
            <Zap size={16} />
            {failureMode ? '⚠ Run (Failure Mode)' : 'Run Rule Engine'}
          </>
        )}
      </button>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="text-xs font-medium text-[var(--fg-secondary)] uppercase tracking-wider">
              {result.matchedRules.filter((r) => r.applied).length} of {result.matchedRules.length} rules matched
            </div>
            {result.matchedRules.map(({ rule, applied, reason, pointsAdded }) => (
              <div
                key={rule.id}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border text-sm',
                  applied ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[var(--card-border)] opacity-50'
                )}
              >
                {applied
                  ? <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  : <XCircle size={16} className="text-[var(--fg-tertiary)] flex-shrink-0 mt-0.5" />
                }
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-[var(--fg)]">{rule.name}</span>
                    {applied && <span className="text-xs text-emerald-400 font-mono">+{pointsAdded} pts</span>}
                  </div>
                  <p className="text-xs text-[var(--fg-tertiary)] mt-0.5">
                    {applied ? rule.description : `Skipped: ${reason}`}
                  </p>
                </div>
              </div>
            ))}

            <div className={cn(
              'rounded-xl p-5 text-center border',
              failureMode
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-[var(--accent)]/10 border-[var(--accent)]/30'
            )}>
              <div className="text-xs text-[var(--accent)] font-medium uppercase tracking-wider mb-2">Total Reward</div>
              <div className="text-4xl font-bold text-[var(--fg)]">{result.totalPoints}</div>
              <div className="text-sm text-[var(--fg-secondary)] mt-1">points earned</div>
              <div className="text-xs text-[var(--fg-tertiary)] mt-2 font-mono">{result.breakdown}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
