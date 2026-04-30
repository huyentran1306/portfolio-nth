import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

export function ThaoProjects() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section id="projects" className="py-28 px-6" style={{ background: 'var(--t-bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="t-section-pill">📦 Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4" style={{ color: 'var(--t-fg)' }}>
            5 Projects.<br />
            <span className="t-gradient-text">Zero shortcuts.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--t-fg-secondary)' }}>
            Loyalty platforms, healthcare migrations, car auctions — each project strengthened my QA craft.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="t-glass-card rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
              onClick={() => setSelected(selected === project.id ? null : project.id)}
            >
              {/* Row header */}
              <div className="flex items-center gap-4 p-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-base" style={{ color: 'var(--t-fg)' }}>{project.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                      {project.domain}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: 'var(--t-fg-secondary)' }}>{project.period}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs" style={{ color: 'var(--t-fg-secondary)' }}>{project.size} members</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: selected === project.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs ml-auto flex-shrink-0"
                  style={{ color: 'var(--t-accent)' }}
                >
                  ▼
                </motion.div>
              </div>

              {/* Expanded */}
              <AnimatePresence>
                {selected === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t" style={{ borderColor: 'rgba(56,189,248,0.1)' }}>
                      <p className="text-sm mt-4 mb-4 leading-relaxed" style={{ color: 'var(--t-fg-secondary)' }}>
                        {project.summary}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--t-accent)' }}>Key Contributions</div>
                          <ul className="space-y-1.5">
                            {project.highlights.map(h => (
                              <li key={h} className="flex gap-2 text-sm">
                                <span style={{ color: 'var(--t-accent)' }}>→</span>
                                <span style={{ color: 'var(--t-fg-secondary)' }}>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--t-accent)' }}>Technologies</div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map(t => (
                              <span key={t} className="t-tag">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
