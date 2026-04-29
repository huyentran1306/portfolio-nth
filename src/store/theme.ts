import { create } from 'zustand'

interface ThemeStore {
  dark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  toggle: () => {
    const next = !get().dark
    set({ dark: next })
    if (next) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
}))

// Apply on init
if (useThemeStore.getState().dark) {
  document.documentElement.classList.add('dark')
}
