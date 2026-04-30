import { motion } from 'framer-motion'
import { aiIntegrations, leadershipData } from '@/data/aiLeadership'
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper'

export function AIAndLeadership() {
  return (
    <>
      <SectionWrapper id="ai">
        <SectionHeader
          pill="🤖 AI Integration"
          title={<>I use AI as an <span className="gradient-text">engineering tool</span>, not a trend.</>}
          subtitle="Four ways I integrated AI into production workflows at FPT Software — each with a real problem it solved."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {aiIntegrations.map((item, i) => (
            <motion.div
              key={item.id}
              className="glass-card rounded-2xl p-6 space-y-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-[var(--fg)] mb-0.5">{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tech.map((t) => (
                      <span key={t} className="tag-chip">{t}</span>
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
      </SectionWrapper>

      <SectionWrapper id="leadership" className="bg-[var(--bg-secondary)]">
        <SectionHeader
          pill="👥 Leadership"
          title={<>I lead by <span className="gradient-text">doing</span>, not directing.</>}
          subtitle="How I run teams, mentor developers, and handle production pressure."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {leadershipData.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
              whileHover={{ y: -4, scale: 1.01 }}
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
      </SectionWrapper>
    </>
  )
}
