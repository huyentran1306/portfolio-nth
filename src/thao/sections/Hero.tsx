import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/skills'

// ── Typing animation hook ──────────────────────────────────────
function useTypewriter(texts: string[], speed = 65, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setIdx(i => (i + 1) % texts.length)
    }
  }, [charIdx, deleting, idx, texts, speed, pause])

  useEffect(() => {
    setDisplay(texts[idx].slice(0, charIdx))
  }, [charIdx, idx, texts])

  return display
}

// ── Animated counter ───────────────────────────────────────────
function AnimCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = Math.ceil(to / 40)
        const t = setInterval(() => {
          start = Math.min(start + step, to)
          setVal(start)
          if (start >= to) clearInterval(t)
        }, 35)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Mini terminal ──────────────────────────────────────────────
const TERMINAL_LINES = [
  { delay: 0,    text: '$ katalon run --suite regression --env staging', type: 'cmd' },
  { delay: 900,  text: '✓ TC-001  Login with valid credentials          2.1s', type: 'pass' },
  { delay: 1300, text: '✓ TC-002  Add item to loyalty cart              1.8s', type: 'pass' },
  { delay: 1700, text: '✓ TC-003  Redeem voucher (Rule Engine)          3.2s', type: 'pass' },
  { delay: 2100, text: '✗ TC-047  Edge case: concurrent redemption      FAIL', type: 'fail' },
  { delay: 2500, text: '  → Raised bug #BG-2847 · severity: High', type: 'info' },
  { delay: 3000, text: '✓ TC-048  Retry after hotfix deploy             1.1s', type: 'pass' },
  { delay: 3400, text: '────────────────────────────────────────────────', type: 'sep' },
  { delay: 3600, text: '  Passed: 47  Failed: 0  Skipped: 2  Time: 4m23s', type: 'summary' },
]

function Terminal() {
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        TERMINAL_LINES.forEach((line, i) => {
          setTimeout(() => setVisible(i + 1), line.delay)
        })
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const colorMap: Record<string, string> = {
    cmd: 'var(--t-accent)', pass: '#34d399', fail: '#f87171',
    info: '#fbbf24', sep: 'rgba(56,189,248,0.2)', summary: 'var(--t-fg)',
  }

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden font-mono text-xs leading-relaxed"
      style={{ background: 'rgba(2,8,18,0.9)', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 8px 40px rgba(56,189,248,0.1)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(56,189,248,0.12)', background: 'rgba(6,21,37,0.5)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        <span className="ml-2" style={{ color: 'rgba(125,211,252,0.45)' }}>katalon-runner — regression suite</span>
      </div>
      <div className="p-4 space-y-1.5 min-h-[220px]">
        {TERMINAL_LINES.slice(0, visible).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }} style={{ color: colorMap[line.type] || 'var(--t-fg)' }}>
            {line.text}
            {i === visible - 1 && visible < TERMINAL_LINES.length && <span className="animate-pulse ml-0.5">▌</span>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Floating tech tags ─────────────────────────────────────────
const TECH_TAGS = [
  { label: 'Katalon', x: '4%',  y: '20%', delay: 0.3 },
  { label: 'Postman', x: '76%', y: '14%', delay: 0.6 },
  { label: 'SQL',     x: '87%', y: '52%', delay: 0.9 },
  { label: 'Cypress', x: '2%',  y: '68%', delay: 1.2 },
  { label: 'Jira',    x: '80%', y: '76%', delay: 0.7 },
  { label: 'Azure',   x: '10%', y: '85%', delay: 1.0 },
]

export function ThaoHero() {
  const role = useTypewriter(['Senior QA Engineer', 'Test Automation Lead', 'ISTQB CTAL Certified', 'Agile-Native Tester'])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 t-grid-bg opacity-60" />
      <div className="t-orb-1" />
      <div className="t-orb-2" />

      {/* Floating tags */}
      {TECH_TAGS.map(tag => (
        <motion.div key={tag.label}
          className="absolute hidden lg:flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg pointer-events-none select-none"
          style={{ left: tag.x, top: tag.y, background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.18)', color: 'var(--t-accent)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0], y: [0, -8, -8, 0] }}
          transition={{ delay: tag.delay, duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--t-accent)' }} />
          {tag.label}
        </motion.div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, var(--t-bg))' }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 t-section-pill mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              FPT Software · 4 Years Experience
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl font-bold tracking-tight mb-4" style={{ color: 'var(--t-fg)' }}>
              Pham Thi <span className="t-gradient-text">Thanh Thao</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-xl font-mono mb-5 h-8 flex items-center gap-2 justify-center lg:justify-start"
              style={{ color: 'var(--t-accent)' }}>
              <span className="text-xs opacity-40">→</span>
              {role}
              <span className="animate-pulse text-base">|</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-base max-w-md mx-auto lg:mx-0 leading-relaxed mb-8" style={{ color: 'var(--t-fg-secondary)' }}>
              I don't just find bugs — I build the system that{' '}
              <span style={{ color: 'var(--t-accent)' }}>prevents them.</span>{' '}
              ISTQB CTAL certified. Agile-native. 5 enterprise projects delivered.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <a href="#projects" className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0ea5e9)', color: '#fff', boxShadow: '0 4px 20px rgba(14,165,233,0.35)' }}>
                View Projects →
              </a>
              <a href="#certifications" className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
                style={{ borderColor: 'rgba(56,189,248,0.4)', color: 'var(--t-accent)', background: 'rgba(56,189,248,0.06)' }}>
                ISTQB × PSM
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <motion.div key={s.label} className="t-glass-card rounded-xl p-3 text-center"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08, type: 'spring', stiffness: 200, damping: 18 }}>
                  <div className="text-xl mb-0.5">{s.icon}</div>
                  <div className="text-xl font-bold t-gradient-text">
                    <AnimCounter to={parseInt(s.value) || 4} suffix={s.value.replace(/[0-9]/g, '')} />
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--t-fg-secondary)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Terminal */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }} className="hidden lg:block">
            <Terminal />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.8 }}
              className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-xs font-mono" style={{ color: '#34d399' }}>
                Avg test pass rate: <strong>97.9%</strong> across all 5 projects
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="mt-16 flex justify-center"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(56,189,248,0.3)' }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: 'var(--t-accent)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
