import { motion } from 'framer-motion'
import { stats } from '../data/skills'

export function ThaoHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Ocean animated background */}
      <div className="absolute inset-0 t-grid-bg opacity-60" />
      <div className="t-orb-1" />
      <div className="t-orb-2" />

      {/* Floating wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, var(--t-bg))' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 t-section-pill mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          Senior QA Engineer · FPT Software
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--t-fg)' }}
        >
          Pham Thi{' '}
          <span className="t-gradient-text">Thanh Thao</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: 'var(--t-fg-secondary)' }}
        >
          I don't just find bugs — I build the system that{' '}
          <span style={{ color: 'var(--t-accent)' }}>prevents them.</span>
          <br className="hidden sm:block" />
          4 years turning requirements into confidence. ISTQB certified. Agile-native.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          <a href="#projects"
            className="px-7 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'linear-gradient(135deg, #0284c7, #0ea5e9)', color: '#fff', boxShadow: '0 4px 20px rgba(14,165,233,0.35)' }}>
            View Projects →
          </a>
          <a href="#certifications"
            className="px-7 py-3 rounded-xl text-sm font-semibold border transition-all"
            style={{ borderColor: 'rgba(56,189,248,0.4)', color: 'var(--t-accent)', background: 'rgba(56,189,248,0.06)' }}>
            Certifications
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="t-glass-card rounded-2xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + i * 0.08, type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold t-gradient-text">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--t-fg-secondary)' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(56,189,248,0.3)' }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: 'var(--t-accent)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
