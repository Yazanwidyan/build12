import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'

export default function ThemeToggle({ className = '' }) {
  const { dark, toggle } = useThemeStore()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold
                  transition-all duration-200 border select-none ${className}`}
      style={{
        background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
        borderColor: 'var(--app-border)',
        color: 'var(--ink-muted)',
      }}
    >
      <motion.span
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -20, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0,   opacity: 1, scale: 1 }}
        exit={{ rotate: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {dark ? <Moon size={13} /> : <Sun size={13} />}
      </motion.span>
      <span>{dark ? 'Dark' : 'Light'}</span>
    </motion.button>
  )
}
