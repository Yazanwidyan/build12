import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'

const FEATURES = [
  { emoji: '🏗️', label: 'Build Real Things',  desc: 'Not exercises — actual websites, games, and apps.' },
  { emoji: '🤖', label: 'Learn with TEKI',     desc: 'Your AI companion guides every step of the journey.' },
  { emoji: '🎯', label: 'At Your Own Pace',    desc: 'Adapted for every age group and learning style.' },
  { emoji: '🔓', label: 'Unlock As You Go',    desc: 'Earn builder powers as you complete adventures.' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const handleStart = () => navigate({ to: isAuthenticated ? '/dashboard' : '/signup' })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <span className="text-xl font-black text-teki-600">HelloBuildIt</span>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <Button size="sm" onClick={() => navigate({ to: '/dashboard' })}>Dashboard</Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate({ to: '/login' })}>Log in</Button>
              <Button size="sm" onClick={() => navigate({ to: '/signup' })}>Sign up free</Button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8 max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TekiCharacter size={120} mood="excited" />
          </motion.div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-black text-gray-900 leading-tight">
              Build it.<br />
              <span className="text-teki-600">Understand it.</span><br />
              Own it.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Learn to code by building real websites, games, and apps — guided by TEKI, your AI companion.
            </p>
          </div>

          <Button variant="action" size="xl" onClick={handleStart}>
            Start Building — it's free
          </Button>

          <p className="text-xs text-gray-400">No experience needed · Ages 8+</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-2 gap-4 mt-20 w-full max-w-xl"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-4 text-left"
            >
              <div className="text-2xl mb-2">{f.emoji}</div>
              <h3 className="font-bold text-gray-800 text-sm">{f.label}</h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} HelloBuildIt by HelloWorldKids
      </footer>
    </div>
  )
}
