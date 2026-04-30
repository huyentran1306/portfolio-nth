import { motion } from 'framer-motion'
import { certifications } from '../data/skills'

const QA_MINDSET = [
  { icon: '🔍', title: 'Shift Left', desc: 'I join projects at requirement phase — catching ambiguity before it becomes a bug.' },
  { icon: '📋', title: 'Test Case Craft', desc: 'Each test case is a specification: clear, reproducible, and traceable to user value.' },
  { icon: '🤝', title: 'Dev Collaboration', desc: 'I pair with developers to investigate root causes — not just report symptoms.' },
  { icon: '��', title: 'Continuous Quality', desc: 'Every sprint ends with a quality report. No exception. No shortcuts.' },
]

export function ThaoCertifications() {
  return (
    <section id="certifications" className="py-28 px-6" style={{ background: 'var(--t-bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="t-section-pill">🎖️ Credentials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4" style={{ color: 'var(--t-fg)' }}>
            Certified to the{' '}
            <span className="t-gradient-text">Highest Standard.</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--t-fg-secondary)' }}>
            ISTQB Advanced — the gold standard in software testing excellence.
          </p>
        </motion.div>

        {/* Certs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="t-glass-card rounded-2xl p-6 text-center group"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 220, damping: 20 }}
              whileHover={{ y: -6 }}
            >
              {/* Glow */}
              <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: cert.color }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                />
                <span className="text-3xl relative z-10">{cert.icon}</span>
              </div>
              <div className="text-xs font-mono font-bold tracking-widest mb-2" style={{ color: cert.color }}>
                {cert.name}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--t-fg-secondary)' }}>
                {cert.full}
              </div>
            </motion.div>
          ))}
        </div>

        {/* QA Mindset */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="t-section-pill">🧠 QA Mindset</span>
          <h3 className="text-2xl font-bold mt-6 mb-2" style={{ color: 'var(--t-fg)' }}>
            How I Think About Quality
          </h3>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QA_MINDSET.map((item, i) => (
            <motion.div
              key={item.title}
              className="t-glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--t-accent)' }}>{item.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--t-fg-secondary)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
