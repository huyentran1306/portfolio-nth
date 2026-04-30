import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillGroups } from '../data/skills'

function SkillBar({ level, delay }: { level: number; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="t-skill-bar mt-1">
      <motion.div
        className="t-skill-bar-fill"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: level / 100 } : {}}
        transition={{ delay, duration: 0.9, ease: 'easeOut' }}
      />
    </div>
  )
}

export function ThaoSkills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="t-section-pill">🛠️ Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4" style={{ color: 'var(--t-fg)' }}>
            Built for{' '}
            <span className="t-gradient-text">Quality.</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--t-fg-secondary)' }}>
            From manual test design to automation pipelines — a full QA toolkit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="t-glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{group.icon}</span>
                <h3 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--t-accent)' }}>
                  {group.category}
                </h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: 'var(--t-fg)' }}>{skill.name}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--t-fg-secondary)' }}>{skill.level}%</span>
                    </div>
                    <SkillBar level={skill.level} delay={gi * 0.1 + si * 0.06} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
