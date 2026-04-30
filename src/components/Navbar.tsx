import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { BookOpen, Brain, FolderOpen, FlaskConical, Bot, Mail, Award } from 'lucide-react'

const NAV_LINKS = [
  { href: '#story',          label: 'Career',       icon: BookOpen },
  { href: '#certifications', label: 'Certs',        icon: Award },
  { href: '#think',          label: 'Think',        icon: Brain },
  { href: '#projects',       label: 'Projects',     icon: FolderOpen },
  { href: '#lab',            label: 'Lab',          icon: FlaskConical },
  { href: '#ai',             label: 'AI & Lead',    icon: Bot },
  { href: '#contact',        label: 'Contact',      icon: Mail },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      // detect active section
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${id}`)
          return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ─── Desktop top nav ─────────────────────────────── */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white text-xs font-bold shadow-[0_0_12px_var(--accent-glow)] group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-shadow">
              HT
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--fg)] hidden sm:inline">
              Huyen Tran<span className="text-[var(--accent)]">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-1.5 rounded-lg text-sm transition-colors',
                  active === link.href
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]'
                )}
              >
                {active === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
              style={{ background: 'rgba(99,102,241,0.08)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              ← Home
            </button>
            <ThemeToggle />
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-mono px-2 py-1 rounded-lg transition-all"
              style={{ background: 'rgba(99,102,241,0.08)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              ← Home
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ─── Mobile bottom tab bar ───────────────────────── */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 30 }}
          className="mobile-nav md:hidden"
        >
          <div className="flex items-center justify-around px-2 h-16">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex flex-col items-center gap-0.5 px-3 py-2 min-w-[44px] min-h-[44px] justify-center rounded-xl relative transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-[var(--accent-glow)] rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <Icon
                    size={18}
                    className={cn(
                      'relative transition-colors',
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--fg-tertiary)]'
                    )}
                  />
                  <span className={cn(
                    'relative text-[9px] font-medium transition-colors',
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--fg-tertiary)]'
                  )}>
                    {link.label}
                  </span>
                </a>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
