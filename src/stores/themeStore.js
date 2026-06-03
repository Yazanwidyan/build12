import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const useThemeStore = create(
  persist(
    (set) => ({
      dark: true,   // dark by default (Codedex-inspired)

      setDark: (dark) => {
        applyTheme(dark)
        set({ dark })
      },

      toggle: () => {
        set((s) => {
          const next = !s.dark
          applyTheme(next)
          return { dark: next }
        })
      },

      init: () => {
        const stored = useThemeStore.getState().dark
        applyTheme(stored)
      },
    }),
    { name: 'hbi-theme' }
  )
)
