import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timelineData } from '@/data/timeline'
import { SectionHeader } from '@/components/SectionWrapper'

function TimelineCard({ item, index }: { item: (typeof timelineData)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-start"
    >
      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
        <motion.div
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-[0_0_20px_var(--accent-glow)]"
        >
          <div className="w-3 h-3 rounded-full bg-white/90" />
        </motion.div>
      </div>

      {/* Year / role */}
      <div className={isLeft ? 'md:text-right md:pr-14' : 'md:col-start-2 md:pl-14 md:row-start-1'}>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="section-pill mb-4 inline-flex"
        >
          {item.year}
        </motion.span>
        <h3 className="text-lg md:text-xl font-bold text-[var(--fg)] mb-1">{item.role}</h3>
        <p className="text-sm text-[var(--fg-secondary)]">{item.company}</p>
      </div>

      {/* Card */}
      <div className={isLeft ? 'md:pl-14' : 'md:pr-14 md:col-start-1 md:row-start-1'}>
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="glass-card p-6 space-y-4 group"
        >
          <p className="text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
            {item.project}
          </p>

          {[
            { label: 'Problem',  color: 'text-red-400',     text: item.problem },
            { label: 'Decision', color: 'text-yellow-400',  text: item.decision },
            { label: 'Impact',   color: 'text-emerald-400', text: item.impact },
          ].map(({ label, color, text }) => (
            <div key={label}>
              <div className={`text-[10px] font-semibold ${color} uppercase tracking-widest mb-1.5`}>
                {label}
              </div>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{text}</p>
            </div>
          ))}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function CareerTimeline() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          pill="Career Story"
          title={<>Not what I built.<br /><span className="text-[var(--fg-secondary)]">Why and how.</span></>}
          subtitle="Each chapter includes the real problem, the decision made, and the measurable impact."
        />

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />
          <div className="space-y-14 md:space-y-20">
            {timelineData.map((item, i) => (
              <TimelineCard key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
