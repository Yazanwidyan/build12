import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useProgressStore } from '@/stores/progressStore'
import Button from '@/components/ui/Button'

export default function ActCompleteStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)
  const { addXP, completeAct } = useProgressStore()

  useEffect(() => {
    speak([`${step.title}! 🏆`, step.message], { mood: 'proud' })
    completeAct(step.actId)
    if (step.xpBonus) addXP(step.xpBonus)
  }, [step.id])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-4 py-2"
    >
      <motion.div
        animate={{ rotate: [0, 12, -12, 8, -8, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="text-5xl"
      >
        {step.power?.emoji || '🏆'}
      </motion.div>

      {step.power && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-0.5"
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Builder Power Unlocked</p>
          <p className="font-bold text-teki-700">{step.power.label}</p>
        </motion.div>
      )}

      {step.xpBonus && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="xp-badge"
        >
          ⭐ +{step.xpBonus} XP bonus!
        </motion.span>
      )}

      <Button variant="action" fullWidth onClick={onComplete}>
        {step.action || 'Continue!'}
      </Button>
    </motion.div>
  )
}
