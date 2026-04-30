import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/theme'

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function ThaoNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { dark, toggle } = useThemeStore()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div
        className="max-w-5xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-2xl"
        style={{
          background: scrolled ? 'var(--t-navbar-bg)' : 'rgba(4,13,24,0.4)',
          border: '1px solid var(--t-navbar-border)',
          backdropFilter: 'blur(20px)',
          transition: 'background 0.3s',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#fff' }}>T</div>
          <span className="text-sm font-semibold" style={{ color: 'var(--t-fg)' }}>Thanh Thao</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors"
              style={{ color: 'var(--t-fg-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--t-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--t-fg-secondary)')}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Back to home + Theme toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg transition-all"
            style={{ color: 'var(--t-fg-secondary)', background: 'var(--t-accent-light)', border: '1px solid var(--t-glass-border)' }}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
            style={{ background: 'var(--t-accent-light)', color: 'var(--t-accent)', border: '1px solid var(--t-glass-border)' }}
          >
            ← Home
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
