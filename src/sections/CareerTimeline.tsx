import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timelineData } from '@/data/timeline'

function TimelineCard({ item, index }: { item: (typeof timelineData)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative grid md:grid-cols-2 gap-8 items-start"
    >
      {/* Year marker */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-[var(--accent)] items-center justify-center z-10 shadow-lg">
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Left col */}
      <div className={index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16 md:row-start-1'}>
        <span className="inline-block text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full mb-3">
          {item.year}
        </span>
        <h3 className="text-lg font-bold text-[var(--fg)] mb-1">{item.role}</h3>
        <p className="text-sm text-[var(--fg-secondary)]">{item.company}</p>
      </div>

      {/* Right col – card */}
      <div className={index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:col-start-1 md:row-start-1'}>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 space-y-4">
          <p className="text-sm font-semibold text-[var(--fg)]">{item.project}</p>

          <div>
            <div className="text-xs font-medium text-red-400 uppercase tracking-wider mb-1">Problem</div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.problem}</p>
          </div>

          <div>
            <div className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-1">Decision</div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.decision}</p>
          </div>

          <div>
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">Impact</div>
            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">{item.impact}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-md bg-[var(--bg-secondary)] text-[var(--fg-tertiary)] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CareerTimeline() {
  return (
    <section id="story" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            Career Story
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
            Not what I built.
            <br />
            <span className="text-[var(--fg-secondary)]">Why and how I built it.</span>
          </h2>
          <p className="text-[var(--fg-secondary)] max-w-xl mx-auto">
            Each chapter includes the real problem, the decision made, and the measurable impact.
          </p>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[var(--border)]" />
          <div className="space-y-16">
            {timelineData.map((item, i) => (
              <TimelineCard key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
