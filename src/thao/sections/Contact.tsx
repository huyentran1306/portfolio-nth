import { motion } from 'framer-motion'
import { Mail, MapPin, Building2, GraduationCap, ArrowUpRight } from 'lucide-react'

const links = [
  { icon: <Mail size={18} />, label: 'Email', value: 'thao.ptt@fpt.com.vn', href: 'mailto:thao.ptt@fpt.com.vn' },
  { icon: <Building2 size={18} />, label: 'Company', value: 'FPT Software', href: 'https://fpt-software.com' },
  { icon: <GraduationCap size={18} />, label: 'University', value: 'HCMC Univ. of Education', href: '#' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Ho Chi Minh City, Vietnam', href: '#' },
]

export function ThaoContact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="t-section-pill">✉️ Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4" style={{ color: 'var(--t-fg)' }}>
            Let's build{' '}
            <span className="t-gradient-text">quality together.</span>
          </h2>
          <p className="text-base mb-12" style={{ color: 'var(--t-fg-secondary)' }}>
            Looking for a QA engineer who brings both precision and collaboration? Let's connect.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="t-glass-card rounded-2xl p-5 flex items-center gap-4 group text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(56,189,248,0.1)', color: 'var(--t-accent)', border: '1px solid rgba(56,189,248,0.2)' }}>
                {link.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono mb-0.5" style={{ color: 'var(--t-fg-secondary)' }}>{link.label}</div>
                <div className="text-sm font-medium" style={{ color: 'var(--t-fg)' }}>{link.value}</div>
              </div>
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--t-accent)' }} />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-xs font-mono"
          style={{ color: 'rgba(56,189,248,0.35)' }}
        >
          Pham Thi Thanh Thao · Senior QA Engineer · FPT Software · 2025
        </motion.div>
      </div>
    </section>
  )
}
