import { motion } from 'framer-motion'
import { GitFork, ExternalLink, Mail } from 'lucide-react'

export function Contact() {
  const links = [
    {
      icon: GitFork,
      label: 'GitHub',
      href: 'https://github.com/',
      sub: 'github.com/huyentran',
    },
    {
      icon: ExternalLink,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/',
      sub: 'linkedin.com/in/huyentran',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:huyen.tran@example.com',
      sub: 'huyen.tran@example.com',
    },
  ]

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-6">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-6">
            Let's build something
            <br />
            <span className="text-[var(--accent)]">impactful together.</span>
          </h2>
          <p className="text-lg text-[var(--fg-secondary)] mb-12 max-w-xl mx-auto leading-relaxed">
            If you value how I think about systems — the trade-offs, the engineering depth, the leadership approach —
            I'd love to connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {links.map(({ icon: Icon, label, href, sub }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 border border-[var(--border)] rounded-xl hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group"
              >
                <Icon size={20} className="text-[var(--fg-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--fg)]">{label}</div>
                  <div className="text-xs text-[var(--fg-tertiary)]">{sub}</div>
                </div>
                <ExternalLink size={14} className="text-[var(--fg-tertiary)] ml-auto opacity-50" />
              </a>
            ))}
          </div>

          <div className="border-t border-[var(--border)] pt-12">
            <p className="text-[var(--fg-tertiary)] text-sm">
              © 2024 Nguyen Thi Huyen Tran · Tech Lead · FPT Software
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
