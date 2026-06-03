import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useProgressStore } from '@/stores/progressStore'
import { ACTS } from '@/data/curriculum'
import Button from '@/components/ui/Button'

export const ADVENTURES = [
  { id: 'website', label: 'Website Adventure', emoji: '🌐', desc: 'Build a real website', color: '#6366f1', active: true,  route: '/adventure' },
  { id: 'game',    label: 'Game Adventure',    emoji: '🎮', desc: 'Design a game',        color: '#10b981', active: false },
  { id: 'mobile',  label: 'Mobile Adventure',  emoji: '📱', desc: 'Build a mobile app',   color: '#f59e0b', active: false },
]

export default function AdventureCard({ adventure: adv }) {
  const navigate = useNavigate()
  const completedActs = useProgressStore((s) => s.completedActs)
  const completedMissions = useProgressStore((s) => s.completedMissions)

  if (!adv.active) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 opacity-60">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{adv.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-500 text-sm">{adv.label}</h3>
            <p className="text-xs text-gray-400">{adv.desc}</p>
          </div>
        </div>
        <div className="text-xs text-gray-400 bg-gray-100 rounded-lg px-3 py-1.5 text-center font-medium">
          Coming Soon
        </div>
      </div>
    )
  }

  const doneActs = completedActs.filter((a) => a.startsWith('act')).length
  const pct = Math.round((doneActs / ACTS.length) * 100)
  const started = completedMissions.length > 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer shadow-sm"
      onClick={() => navigate({ to: adv.route })}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{adv.emoji}</span>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">{adv.label}</h3>
          <p className="text-xs text-gray-500">{adv.desc}</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{doneActs}/{ACTS.length} acts</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: adv.color }} />
        </div>
      </div>
      <Button variant="primary" size="sm" fullWidth onClick={(e) => { e.stopPropagation(); navigate({ to: adv.route }) }}>
        {started ? 'Continue Adventure' : 'Start Adventure'}
      </Button>
    </motion.div>
  )
}
