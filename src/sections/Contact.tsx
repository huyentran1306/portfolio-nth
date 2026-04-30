import { motion, type Variants } from 'framer-motion'
import { GitFork, ExternalLink, Mail, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/SectionWrapper'

const links = [
  {
    icon: GitFork,
    label: 'GitHub',
    href: 'https://github.com/',
    sub: 'github.com/huyentran',
    color: 'from-gray-500 to-gray-700',
  },
  {
    icon: ExternalLink,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/',
    sub: 'linkedin.com/in/huyentran',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:huyen.tran@example.com',
    sub: 'huyen.tran@example.com',
    color: 'from-[var(--accent)] to-[var(--accent-2)]',
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative">
        <SectionHeader
          pill="Contact"
          title={<>Let&apos;s build something<br /><span className="gradient-text">impactful together.</span></>}
          subtitle="If you value how I think about systems — the trade-offs, the engineering depth, the leadership approach — I'd love to connect."
        />

        {/* Links */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          {links.map(({ icon: Icon, label, href, sub, color }) => (
            <motion.a
              key={label}
              href={href}
              variants={item}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card flex items-center gap-4 px-6 py-5 group text-left flex-1 min-h-[64px]"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                  {label}
                </div>
                <div className="text-xs text-[var(--fg-tertiary)] truncate">{sub}</div>
              </div>
              <ArrowUpRight size={14} className="text-[var(--fg-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.a>
          ))}
        </motion.div>

        <div className="border-t border-[var(--border)] pt-10">
          <p className="text-[var(--fg-tertiary)] text-sm">
            © 2024 Nguyen Thi Huyen Tran &nbsp;·&nbsp; Tech Lead &nbsp;·&nbsp; FPT Software
          </p>
        </div>
      </div>
    </section>
  )
}
