import { motion } from 'framer-motion'
import { Award, ShieldCheck, BarChart3, Code2, Database, TrendingUp, Sparkles, Bot, Cpu } from 'lucide-react'
import { SectionWrapper } from '@/components/SectionWrapper'

interface Cert {
  id: string
  title: string
  issuer: string
  category: 'ai' | 'scrum' | 'agile' | 'microsoft' | 'google'
  color: string
  icon: React.ReactNode
  badge: string
  year?: string
}

const CERTS: Cert[] = [
  // ── AI & Cloud Architecture ──────────────────────────────────────
  {
    id: 'ccaf',
    title: 'Claude Certified Architect – Foundations',
    issuer: 'Anthropic',
    category: 'ai',
    color: '#f97316',
    icon: <Sparkles size={22} />,
    badge: 'CCAF',
  },
  {
    id: 'ai-200',
    title: 'Microsoft Certified: Azure AI Cloud Developer Associate',
    issuer: 'Microsoft',
    category: 'ai',
    color: '#3b82f6',
    icon: <Cpu size={22} />,
    badge: 'AI-200',
  },
  {
    id: 'dp-800',
    title: 'Microsoft Certified: SQL AI Developer Associate',
    issuer: 'Microsoft',
    category: 'ai',
    color: '#06b6d4',
    icon: <Database size={22} />,
    badge: 'DP-800',
  },
  {
    id: 'gh-300',
    title: 'GitHub Certified: GitHub Copilot',
    issuer: 'GitHub',
    category: 'ai',
    color: '#a855f7',
    icon: <Bot size={22} />,
    badge: 'GH-300',
  },

  // ── Scrum & Agile ────────────────────────────────────────────────
  {
    id: 'psm2',
    title: 'Professional Scrum Master™ II',
    issuer: 'Scrum.org',
    category: 'scrum',
    color: '#6366f1',
    icon: <ShieldCheck size={22} />,
    badge: 'PSM II',
  },
  {
    id: 'psm1',
    title: 'Professional Scrum Master™ I',
    issuer: 'Scrum.org',
    category: 'scrum',
    color: '#818cf8',
    icon: <ShieldCheck size={22} />,
    badge: 'PSM I',
  },
  {
    id: 'pspo2',
    title: 'Professional Scrum Product Owner II',
    issuer: 'Scrum.org',
    category: 'scrum',
    color: '#a855f7',
    icon: <Award size={22} />,
    badge: 'PSPO II',
  },
  {
    id: 'pspo1',
    title: 'Professional Scrum Product Owner I',
    issuer: 'Scrum.org',
    category: 'scrum',
    color: '#c084fc',
    icon: <Award size={22} />,
    badge: 'PSPO I',
  },
  {
    id: 'safe-sm',
    title: 'Certified SAFe® 6 Scrum Master',
    issuer: 'Scaled Agile',
    category: 'agile',
    color: '#f59e0b',
    icon: <TrendingUp size={22} />,
    badge: 'SAFe SM',
  },
  {
    id: 'safe-agilist',
    title: 'Certified SAFe® 6 Agilist',
    issuer: 'Scaled Agile',
    category: 'agile',
    color: '#fbbf24',
    icon: <TrendingUp size={22} />,
    badge: 'SAFe 6',
  },

  // ── Microsoft Foundations ─────────────────────────────────────────
  {
    id: 'ms-csharp',
    title: 'Microsoft Specialist: Programming in C#',
    issuer: 'Microsoft',
    category: 'microsoft',
    color: '#0ea5e9',
    icon: <Code2 size={22} />,
    badge: 'MS C#',
  },
  {
    id: 'ms-db',
    title: 'Microsoft Technology Associate: Database Fundamentals',
    issuer: 'Microsoft',
    category: 'microsoft',
    color: '#38bdf8',
    icon: <Database size={22} />,
    badge: 'MTA DB',
  },

  // ── Google & Marketing ───────────────────────────────────────────
  {
    id: 'google-analytics',
    title: 'Google Analytics Certification',
    issuer: 'Google',
    category: 'google',
    color: '#34d399',
    icon: <BarChart3 size={22} />,
    badge: 'GA',
  },
  {
    id: 'google-marketing',
    title: 'The Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    category: 'google',
    color: '#6ee7b7',
    icon: <TrendingUp size={22} />,
    badge: 'GDG',
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  ai: '🤖 AI & Cloud Architecture',
  scrum: '🏃 Scrum',
  agile: '⚡ Agile / SAFe',
  microsoft: '🪟 Microsoft',
  google: '🔍 Google',
}

const CATEGORY_ORDER = ['ai', 'scrum', 'agile', 'microsoft', 'google']

export function Certifications() {
  const grouped = CATEGORY_ORDER.reduce<Record<string, Cert[]>>((acc, cat) => {
    acc[cat] = CERTS.filter(c => c.category === cat)
    return acc
  }, {})

  return (
    <SectionWrapper id="certifications">
        <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono mb-6"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
            <Award size={14} />
            Certifications
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {CERTS.length} Certifications.{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Zero shortcuts.
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Spanning AI engineering, Agile frameworks, cloud platforms, and software architecture.
          </p>
        </motion.div>

        {/* Groups */}
        <div className="space-y-12">
          {CATEGORY_ORDER.map((cat, catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3 className="text-sm font-mono mb-5 flex items-center gap-2" style={{ color: 'var(--fg-secondary)' }}>
                {CATEGORY_LABELS[cat]}
                <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  {grouped[cat]?.length ?? 0}
                </span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {grouped[cat]?.map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + i * 0.06, type: 'spring', stiffness: 200, damping: 22 }}
                    className="group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: `1px solid var(--border)`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.borderColor = cert.color + '60'
                      el.style.boxShadow = `0 4px 24px ${cert.color}20`
                      el.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'var(--border)'
                      el.style.boxShadow = 'none'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cert.color + '18', color: cert.color, border: `1px solid ${cert.color}30` }}>
                      {cert.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--fg)' }}>
                        {cert.title}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Badge */}
                    <div className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg flex-shrink-0"
                      style={{ background: cert.color + '15', color: cert.color, border: `1px solid ${cert.color}30` }}>
                      {cert.badge}
                    </div>

                    {/* Glow line */}
                    <div className="absolute bottom-0 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {[
            { label: 'Total Certs', value: String(CERTS.length), color: '#6366f1' },
            { label: 'AI & Architecture', value: String(grouped['ai']?.length ?? 0), color: '#f97316' },
            { label: 'Scrum & Agile', value: String((grouped['scrum']?.length ?? 0) + (grouped['agile']?.length ?? 0)), color: '#a855f7' },
            { label: 'Microsoft', value: String(grouped['microsoft']?.length ?? 0), color: '#0ea5e9' },
            { label: 'Google', value: String(grouped['google']?.length ?? 0), color: '#34d399' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div className="text-3xl font-black font-mono" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
