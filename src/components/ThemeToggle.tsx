import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/theme'

export function ThemeToggle() {
  const { dark, toggle } = useThemeStore()
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)] transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
