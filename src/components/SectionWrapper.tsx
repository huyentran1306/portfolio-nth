import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function SectionWrapper({ children, className, id, delay = 0 }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      className={cn('relative', className)}
    >
      {children}
    </motion.section>
  )
}

interface SectionHeaderProps {
  pill: string
  title: ReactNode
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ pill, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={cn('mb-16 md:mb-20', centered && 'text-center')}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn('mb-5', centered && 'flex justify-center')}
      >
        <span className="section-pill">{pill}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.07 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--fg)] leading-[1.1] mb-5"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-[var(--fg-secondary)] max-w-xl mx-auto text-base md:text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
