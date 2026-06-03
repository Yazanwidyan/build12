import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'

export default function ThemeToggle({ className = '' }) {
  const { dark, toggle } = useThemeStore()

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={toggle}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`p-2 rounded-lg transition-colors hover:bg-[var(--app-raised)] ${className}`}
      style={{ color: 'var(--ink-muted)' }}
    >
      <motion.div
        key={dark ? 'sun' : 'moon'}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0,   opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </motion.button>
  )
}
