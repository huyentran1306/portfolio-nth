import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#story', label: 'Career' },
  { href: '#think', label: 'How I Think' },
  { href: '#projects', label: 'Projects' },
  { href: '#lab', label: 'Problem Lab' },
  { href: '#ai', label: 'AI & Lead' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold tracking-tight text-[var(--fg)]">
          Huyen Tran <span className="text-[var(--accent)]">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[var(--fg-secondary)]"
          >
            <div className="space-y-1">
              <div className={cn('w-5 h-0.5 bg-current transition-all', menuOpen && 'rotate-45 translate-y-1.5')} />
              <div className={cn('w-5 h-0.5 bg-current transition-all', menuOpen && 'opacity-0')} />
              <div className={cn('w-5 h-0.5 bg-current transition-all', menuOpen && '-rotate-45 -translate-y-1.5')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)] border-b border-[var(--border)] px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-[var(--fg-secondary)] hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
