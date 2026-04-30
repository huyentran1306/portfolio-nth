import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

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
          background: scrolled ? 'rgba(4,13,24,0.9)' : 'rgba(4,13,24,0.5)',
          border: '1px solid rgba(56,189,248,0.15)',
          backdropFilter: 'blur(20px)',
          transition: 'background 0.3s',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', color: '#fff' }}>T</div>
          <span className="text-sm font-semibold" style={{ color: '#e0f2fe' }}>Thanh Thao</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors"
              style={{ color: 'rgba(125,211,252,0.8)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(125,211,252,0.8)')}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Back to home */}
        <button
          onClick={() => navigate('/')}
          className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
          style={{ background: 'rgba(56,189,248,0.08)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}
        >
          ← Home
        </button>
      </div>
    </motion.nav>
  )
}
