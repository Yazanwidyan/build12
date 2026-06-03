import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signup: (email, password, name) => {
        const user = {
          id: crypto.randomUUID(),
          email,
          name,
          createdAt: new Date().toISOString(),
        }
        set({ user, isAuthenticated: true })
        return { success: true }
      },

      login: (email, password) => {
        const stored = get().user
        if (stored && stored.email === email) {
          set({ isAuthenticated: true })
          return { success: true }
        }
        return { success: false, error: 'Invalid credentials' }
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'hbi-auth' }
  )
)
