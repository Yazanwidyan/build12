import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useProgressStore } from '@/stores/progressStore'
import Button from '@/components/ui/Button'

export const BUILDERS = [
  { id: 'website', label: 'Website Builder', emoji: '🌐', desc: 'Build any website',     unlockAdventure: 'Website Adventure', route: '/builder' },
  { id: 'game',    label: 'Game Builder',    emoji: '🎮', desc: 'Design and code games', unlockAdventure: 'Game Adventure' },
  { id: 'mobile',  label: 'Mobile Builder',  emoji: '📱', desc: 'Create mobile apps',    unlockAdventure: 'Mobile Adventure' },
]

export default function BuilderCard({ builder: b }) {
  const navigate   = useNavigate()
  const isUnlocked = useProgressStore((s) => s.isBuilderUnlocked(b.id))

  if (!isUnlocked) {
    return (
      <div
        className="rounded-2xl p-5 opacity-60"
        style={{ backgroundColor: 'var(--app-raised)', border: '2px solid var(--app-border)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{b.emoji}</span>
          <div>
            <h3 className="font-bold text-muted text-base">{b.label}</h3>
            <p className="text-sm text-faint">{b.desc}</p>
          </div>
          <Lock size={16} className="ml-auto" style={{ color: 'var(--ink-faint)' }} />
        </div>
        <div
          className="text-sm rounded-lg px-3 py-2 text-center font-medium"
          style={{ backgroundColor: 'var(--app-surface)', border: '2px solid var(--app-border)', color: 'var(--ink-faint)' }}
        >
          Complete {b.unlockAdventure} to unlock
        </div>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card-hover p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{b.emoji}</span>
        <div>
          <h3 className="font-bold text-ink text-base">{b.label}</h3>
          <p className="text-sm text-muted">{b.desc}</p>
        </div>
        <span className="ml-auto text-base font-bold" style={{ color: '#4ade80' }}>✓</span>
      </div>
      <Button variant="solid" color="blue" size="sm" fullWidth onClick={() => navigate({ to: b.route })}>
        Open Builder
      </Button>
    </motion.div>
  )
}
