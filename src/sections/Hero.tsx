import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { TimeTravelSlider } from '@/components/TimeTravelSlider'

export function Hero() {
  return (
    <>
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-6 glow-text">
            Tech Lead · FPT Software · 8+ Years
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--fg)] leading-[1.05] mb-8"
        >
          I design scalable systems
          <br />
          <span className="gradient-text">that reward millions</span>
          <br />
          of users reliably.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-[var(--fg-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Tech Lead &nbsp;·&nbsp; .NET &nbsp;·&nbsp; Rule Engine &nbsp;·&nbsp; Azure AKS &nbsp;·&nbsp;
          Microservices &nbsp;·&nbsp; Event-Driven Architecture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#think"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity glow-accent"
          >
            See how I think
            <ArrowDown size={16} />
          </a>
          <a
            href="#projects"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--fg)] rounded-xl font-semibold text-sm tracking-wide hover:bg-[var(--bg-secondary)] hover:border-[var(--accent)]/50 transition-all"
          >
            View projects
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: '8+', label: 'Years experience' },
            { value: '500k+', label: 'DAU system' },
            { value: '80+', label: 'Rule types built' },
            { value: '60%', label: 'Latency reduced' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-[var(--fg)] mb-1">{stat.value}</div>
              <div className="text-xs text-[var(--fg-tertiary)] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--fg-tertiary)]"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>

    {/* Time Travel slider placed right after hero */}
    <section className="px-6 pb-20">
      <TimeTravelSlider />
    </section>
    </>
  )
}
