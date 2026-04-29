import { motion } from 'framer-motion'
import { aiIntegrations, leadershipData } from '@/data/aiLeadership'

export function AIAndLeadership() {
  return (
    <>
      {/* AI Integration */}
      <section id="ai" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
              AI Integration
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
              I use AI as an
              <br />
              <span className="text-[var(--accent)]">engineering tool, not a trend.</span>
            </h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              Four ways I integrated AI into production workflows at FPT Software — each with a real problem it solved.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {aiIntegrations.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[var(--fg)] mb-0.5">{item.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--fg-tertiary)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-red-400 uppercase tracking-wider mb-1">Problem</div>
                    <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider mb-1">Solution</div>
                    <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.solution}</p>
                  </div>
                  <div className="pt-2 border-t border-[var(--border)]">
                    <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">Impact</div>
                    <p className="text-sm font-medium text-[var(--fg)]">{item.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
              Leadership & Work Style
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
              I lead by
              <br />
              <span className="text-[var(--accent)]">doing, not directing.</span>
            </h2>
            <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
              How I run teams, mentor developers, and handle production pressure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {leadershipData.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-semibold text-[var(--fg)]">{item.title}</h3>
                </div>
                <ul className="space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm">
                      <span className="text-[var(--accent)] flex-shrink-0 mt-0.5">→</span>
                      <span className="text-[var(--fg-secondary)] leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
