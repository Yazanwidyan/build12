import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useProgressStore } from '@/stores/progressStore'
import Button from '@/components/ui/Button'

export const BUILDERS = [
  { id: 'website', label: 'Website Builder', emoji: '🌐', desc: 'Build any website',  unlockAdventure: 'Website Adventure', route: '/builder' },
  { id: 'game',    label: 'Game Builder',    emoji: '🎮', desc: 'Design and code games', unlockAdventure: 'Game Adventure' },
  { id: 'mobile',  label: 'Mobile Builder',  emoji: '📱', desc: 'Create mobile apps',  unlockAdventure: 'Mobile Adventure' },
]

export default function BuilderCard({ builder: b }) {
  const navigate = useNavigate()
  const isUnlocked = useProgressStore((s) => s.isBuilderUnlocked(b.id))

  if (!isUnlocked) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 opacity-70">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{b.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-500 text-sm">{b.label}</h3>
            <p className="text-xs text-gray-400">{b.desc}</p>
          </div>
          <Lock size={16} className="ml-auto text-gray-400" />
        </div>
        <div className="text-xs text-gray-500 bg-white/60 border border-gray-200 rounded-lg px-3 py-2 text-center">
          Complete {b.unlockAdventure} to unlock
        </div>
      </div>
    )
  }

  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{b.emoji}</span>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">{b.label}</h3>
          <p className="text-xs text-gray-500">{b.desc}</p>
        </div>
        <span className="ml-auto text-green-500 font-bold text-sm">✓</span>
      </div>
      <Button variant="primary" size="sm" fullWidth onClick={() => navigate({ to: b.route })}>
        Open Builder
      </Button>
    </motion.div>
  )
}
