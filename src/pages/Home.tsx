import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const PROFILES = [
  {
    path: '/huyen-tran',
    name: 'Nguyen Thi Huyen Tran',
    role: 'Tech Lead · Senior .NET Developer',
    company: 'FPT Software',
    years: '8+ years',
    icon: '⚡',
    tags: ['.NET Core', 'AKS', 'Azure', 'Microservices', 'Rule Engine'],
    accent: '#818cf8',
    accent2: '#6366f1',
    glow: 'rgba(129,140,248,0.25)',
    bg: 'rgba(15,10,40,0.95)',
    border: 'rgba(129,140,248,0.2)',
    initial: { x: -60, opacity: 0 },
    description: 'Building loyalty platforms processing 10M+ transactions daily. Expert in distributed systems, cloud-native AKS architecture, and custom Rule Engines.',
  },
  {
    path: '/thao',
    name: 'Pham Thi Thanh Thao',
    role: 'Senior QA Engineer · Test Manager',
    company: 'FPT Software',
    years: '4+ years',
    icon: '🔍',
    tags: ['ISTQB Advanced', 'Cypress', 'Postman', 'Agile', 'SQL'],
    accent: '#38bdf8',
    accent2: '#0ea5e9',
    glow: 'rgba(56,189,248,0.25)',
    bg: 'rgba(4,13,24,0.95)',
    border: 'rgba(56,189,248,0.2)',
    initial: { x: 60, opacity: 0 },
    description: 'Ensuring software quality across Loyalty & Healthcare platforms. ISTQB Advanced certified. Scrum Master. 5 cross-domain projects delivered.',
  },
] as const

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 py-16"
      style={{ background: '#060912' }}>
      {/* Star grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Left glow */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)' }} />
      {/* Right glow */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.09), transparent 70%)' }} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="text-center mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-6"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          FPT Software · Ho Chi Minh City · Vietnam
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Portfolio
        </h1>
        <p className="text-gray-500 text-base max-w-sm mx-auto">
          Two engineers. Two disciplines.<br />One team at FPT Software.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 grid md:grid-cols-2 gap-5 max-w-4xl w-full">
        {PROFILES.map((p, i) => (
          <motion.div
            key={p.path}
            initial={p.initial as any}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 160, damping: 22 }}
            onClick={() => navigate(p.path)}
            className="group cursor-pointer rounded-3xl overflow-hidden relative"
            style={{ background: p.bg, border: `1px solid ${p.border}` }}
            whileHover={{ scale: 1.025, y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.glow}, transparent 65%)` }} />
            {/* Top accent bar */}
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${p.accent2}, ${p.accent})` }} />

            <div className="p-7">
              {/* Avatar area */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${p.accent}18`, border: `2px solid ${p.accent}40` }}>
                  {p.icon}
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-wider mb-1" style={{ color: p.accent }}>
                    {p.company} · {p.years}
                  </div>
                  <h2 className="text-lg font-bold text-white leading-tight">{p.name}</h2>
                  <p className="text-sm mt-0.5 text-gray-500">{p.role}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5 text-gray-500">{p.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                    style={{ background: `${p.accent}10`, color: p.accent, border: `1px solid ${p.accent}20` }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow CTA */}
              <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.accent }}>
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.4 }}>
                  Explore Portfolio →
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="relative z-10 mt-12 text-xs font-mono text-gray-800">
        React · Framer Motion · Tailwind CSS · 2025
      </motion.p>
    </div>
  )
}
