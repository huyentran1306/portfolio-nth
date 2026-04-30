import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { decisionScenarios, type DecisionOption } from '@/data/decisions'
import { cn } from '@/lib/utils'
import { ChevronRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { useSystemStore } from '@/store/system'
import { SectionHeader } from '@/components/SectionWrapper'

function OptionCard({
  option, selected, isMyChoice, onSelect, revealed,
}: {
  option: DecisionOption; selected: boolean; isMyChoice: boolean
  onSelect: () => void; revealed: boolean
}) {
  const base = 'w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden group'
  const state = revealed && isMyChoice
    ? 'border-emerald-500 bg-emerald-500/6 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
    : revealed && selected && !isMyChoice
      ? 'border-red-400/60 bg-red-400/5'
      : selected
        ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_0_20px_var(--accent-glow)]'
        : 'border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:shadow-md'

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(base, state)}
    >
      {/* Shimmer on selected */}
      {selected && !revealed && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/4 to-transparent pointer-events-none" />
      )}
      <div className="flex items-start gap-3 relative">
        <div className={cn(
          'mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors',
          selected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--fg-tertiary)]',
          revealed && isMyChoice && 'border-emerald-500 bg-emerald-500',
        )} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--fg)] mb-1">{option.label}</p>
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden mt-3 space-y-3"
              >
                {[
                  { icon: CheckCircle2, color: 'text-emerald-400', label: 'Pros', sign: '+', items: option.pros },
                  { icon: XCircle,      color: 'text-red-400',     label: 'Cons', sign: '−', items: option.cons },
                  { icon: AlertTriangle,color: 'text-yellow-400',  label: 'Risks', sign: '⚠', items: option.risks },
                ].map(({ icon: Icon, color, label, sign, items }) => (
                  <div key={label}>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${color} mb-1`}>
                      <Icon size={11} /> {label}
                    </div>
                    <ul className="space-y-0.5">
                      {items.map(t => (
                        <li key={t} className="text-xs text-[var(--fg-secondary)] flex gap-1.5">
                          <span className={`${color} flex-shrink-0`}>{sign}</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  )
}

export function DecisionSimulator() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const { setMetrics } = useSystemStore()

  const scenario = decisionScenarios[activeScenario]

  const handleSelect = (id: string) => { setSelected(id); setRevealed(false) }

  const handleReveal = () => {
    setRevealed(true)
    const isOptimal = selected === scenario.myChoice
    setMetrics({ systemStatus: isOptimal ? 'optimized' : 'loading', cacheHitRate: isOptimal ? 87 : 45, latency: isOptimal ? 142 : 380 })
  }

  const handleNext = (i: number) => { setActiveScenario(i); setSelected(null); setRevealed(false) }

  return (
    <section id="think" className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader
          pill="Decision Simulator"
          title={<>How I think through<br /><span className="gradient-text">hard engineering decisions</span></>}
          subtitle="Pick an option, then see my actual reasoning, trade-offs, and final decision."
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {decisionScenarios.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => handleNext(i)}
              whileTap={{ scale: 0.96 }}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px]',
                i === activeScenario
                  ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-[0_0_20px_var(--accent-glow)]'
                  : 'glass-card hover:border-[var(--accent)]/30 text-[var(--fg-secondary)] hover:text-[var(--fg)]'
              )}
            >
              {s.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Context card */}
            <div className="glass-card p-6 mb-6">
              <div className="text-[10px] font-semibold text-[var(--accent)] uppercase tracking-widest mb-3">
                Scenario
              </div>
              <p className="text-[var(--fg-secondary)] text-sm leading-relaxed mb-4">{scenario.context}</p>
              <p className="font-semibold text-[var(--fg)] text-base">{scenario.question}</p>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {scenario.options.map(opt => (
                <OptionCard
                  key={opt.id} option={opt}
                  selected={selected === opt.id} isMyChoice={opt.id === scenario.myChoice}
                  onSelect={() => handleSelect(opt.id)} revealed={revealed}
                />
              ))}
            </div>

            {/* Reveal */}
            <AnimatePresence>
              {selected && !revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center mb-6"
                >
                  <motion.button
                    onClick={handleReveal}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                  >
                    Show my reasoning <ChevronRight size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reasoning */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-6 border-emerald-500/30 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">My reasoning</span>
                  </div>
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{scenario.myReasoning}</p>
                  <div className="border-t border-[var(--border)] pt-4">
                    <div className="text-[10px] font-semibold text-[var(--accent)] uppercase tracking-widest mb-2">Final Decision</div>
                    <p className="text-sm font-semibold text-[var(--fg)]">{scenario.finalDecision}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
