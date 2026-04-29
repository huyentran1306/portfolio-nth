import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { decisionScenarios, type DecisionOption } from '@/data/decisions'
import { cn } from '@/lib/utils'
import { ChevronRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { useSystemStore } from '@/store/system'

function OptionCard({
  option,
  selected,
  isMyChoice,
  onSelect,
  revealed,
}: {
  option: DecisionOption
  selected: boolean
  isMyChoice: boolean
  onSelect: () => void
  revealed: boolean
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-5 rounded-xl border transition-all duration-200',
        selected
          ? 'border-[var(--accent)] bg-[var(--accent)]/5'
          : 'border-[var(--card-border)] hover:border-[var(--fg-tertiary)] bg-[var(--card)]',
        revealed && isMyChoice && 'border-emerald-500 bg-emerald-500/5',
        revealed && selected && !isMyChoice && 'border-red-400/50'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors',
            selected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--fg-tertiary)]',
            revealed && isMyChoice && 'border-emerald-500 bg-emerald-500'
          )}
        />
        <div>
          <p className="text-sm font-semibold text-[var(--fg)] mb-1">{option.label}</p>
          {revealed && (
            <div className="mt-3 space-y-3">
              <div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 mb-1">
                  <CheckCircle2 size={12} /> Pros
                </div>
                <ul className="space-y-1">
                  {option.pros.map((p) => (
                    <li key={p} className="text-xs text-[var(--fg-secondary)] flex gap-2">
                      <span className="text-emerald-400 flex-shrink-0">+</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-medium text-red-400 mb-1">
                  <XCircle size={12} /> Cons
                </div>
                <ul className="space-y-1">
                  {option.cons.map((c) => (
                    <li key={c} className="text-xs text-[var(--fg-secondary)] flex gap-2">
                      <span className="text-red-400 flex-shrink-0">−</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs font-medium text-yellow-400 mb-1">
                  <AlertTriangle size={12} /> Risks
                </div>
                <ul className="space-y-1">
                  {option.risks.map((r) => (
                    <li key={r} className="text-xs text-[var(--fg-secondary)] flex gap-2">
                      <span className="text-yellow-400 flex-shrink-0">⚠</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export function DecisionSimulator() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const { setMetrics } = useSystemStore()

  const scenario = decisionScenarios[activeScenario]

  const handleSelect = (id: string) => {
    setSelected(id)
    setRevealed(false)
  }

  const handleReveal = () => {
    setRevealed(true)
    const isOptimal = selected === scenario.myChoice
    setMetrics({
      systemStatus: isOptimal ? 'optimized' : 'loading',
      cacheHitRate: isOptimal ? 87 : 45,
      latency: isOptimal ? 142 : 380,
    })
  }

  const handleNext = (i: number) => {
    setActiveScenario(i)
    setSelected(null)
    setRevealed(false)
  }

  return (
    <section id="think" className="py-32 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            Decision Simulator
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
            How I think through
            <br />
            <span className="text-[var(--accent)]">hard engineering decisions</span>
          </h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            Pick an option. Then see my actual reasoning, trade-offs, and final decision.
          </p>
        </motion.div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {decisionScenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleNext(i)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                i === activeScenario
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--card)] border border-[var(--card-border)] text-[var(--fg-secondary)] hover:text-[var(--fg)]'
              )}
            >
              {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Context */}
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 mb-6">
              <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-2">Scenario</div>
              <p className="text-[var(--fg-secondary)] text-sm leading-relaxed">{scenario.context}</p>
              <p className="mt-4 font-semibold text-[var(--fg)]">{scenario.question}</p>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {scenario.options.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={selected === opt.id}
                  isMyChoice={opt.id === scenario.myChoice}
                  onSelect={() => handleSelect(opt.id)}
                  revealed={revealed}
                />
              ))}
            </div>

            {/* Reveal button */}
            {selected && !revealed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
                <button
                  onClick={handleReveal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Show my reasoning <ChevronRight size={16} />
                </button>
              </motion.div>
            )}

            {/* My reasoning */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[var(--card)] border border-emerald-500/30 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">My reasoning</span>
                  </div>
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{scenario.myReasoning}</p>
                  <div className="border-t border-[var(--border)] pt-4">
                    <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-2">
                      Final Decision
                    </div>
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
