import { motion, type Variants } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { TimeTravelSlider } from '@/components/TimeTravelSlider'

const STATS = [
  { value: '8+',    label: 'Years Experience', color: 'text-[var(--accent)]' },
  { value: '500k+', label: 'DAU System',        color: 'text-purple-400' },
  { value: '80+',   label: 'Rule Types',        color: 'text-emerald-400' },
  { value: '60%',   label: 'Latency Reduced',   color: 'text-orange-400' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <>
      <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 pt-20 pb-12 relative overflow-hidden">

        {/* ── Background layers ────────────────────────── */}
        {/* Grid */}
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        {/* Orb 1 — large center */}
        <div
          className="orb-1 absolute top-1/2 left-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Orb 2 — top right */}
        <div
          className="orb-2 absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Orb 3 — bottom left */}
        <div
          className="orb-3 absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* ── Content ──────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto text-center w-full"
        >
          {/* Pill badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="section-pill gap-1.5">
              <Sparkles size={11} />
              Tech Lead · FPT Software · 8+ Years
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-8"
          >
            <span className="text-[var(--fg)]">I design scalable</span>
            <br />
            <span className="gradient-text">systems that reward</span>
            <br />
            <span className="text-[var(--fg)]">millions reliably.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg md:text-xl text-[var(--fg-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            .NET · Rule Engine · Azure AKS · Microservices · Event-Driven Architecture
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20"
          >
            <a href="#think" className="btn-primary w-full sm:w-auto justify-center">
              See how I think
              <ArrowDown size={16} />
            </a>
            <a href="#projects" className="btn-secondary w-full sm:w-auto justify-center">
              View projects
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card p-4 md:p-5 text-center cursor-default"
              >
                <div className={`text-2xl md:text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] text-[var(--fg-tertiary)] uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--fg-tertiary)]"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* Time Travel slider */}
      <section className="px-4 sm:px-6 pb-20 md:pb-28">
        <TimeTravelSlider />
      </section>
    </>
  )
}
