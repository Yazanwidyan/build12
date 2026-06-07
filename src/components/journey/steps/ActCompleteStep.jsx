import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useProgressStore } from '@/stores/progressStore'
import { useProfileStore } from '@/stores/profileStore'
import { isLastActForLevel, LEVEL_INFO } from '@/data/curriculum'
import Button from '@/components/ui/Button'

export default function ActCompleteStep({ step, onComplete }) {
  const speak    = useTekiStore((s) => s.speak)
  const { addXP, completeAct } = useProgressStore()
  const ageGroup = useProfileStore((s) => s.ageGroup) ?? 'young'

  const actNumber  = parseInt(step.actId.replace('act', ''), 10)
  const isLevelEnd = isLastActForLevel(actNumber, ageGroup)
  const levelInfo  = LEVEL_INFO[ageGroup]

  useEffect(() => {
    completeAct(step.actId)
    if (step.xpBonus) addXP(step.xpBonus)

    if (isLevelEnd) {
      speak(
        [`${levelInfo?.label} — COMPLETE! 🎓`, "You finished your entire level!", "The Website Builder is now yours."],
        { mood: 'proud' }
      )
    } else {
      speak([`${step.title}! 🏆`, step.message], { mood: 'proud' })
    }
  }, [step.id])

  if (isLevelEnd) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="flex flex-col items-center gap-4 py-2 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 1 }}
          className="text-6xl"
        >
          🎓
        </motion.div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#2cbaff' }}>
            {levelInfo?.emoji} {levelInfo?.label} Complete!
          </p>
          <p className="text-base text-muted leading-relaxed max-w-xs">
            You've finished every act in your level. The Website Builder is unlocked!
          </p>
        </div>

        {step.xpBonus && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="xp-badge"
          >
            ⭐ +{step.xpBonus} XP bonus!
          </motion.span>
        )}

        <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
          🔓 Open Website Builder
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-4 py-2 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 12, -12, 8, -8, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 0.9 }}
        className="text-6xl"
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
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ink-faint)' }}>
            Builder Power Unlocked
          </p>
          <p className="font-bold" style={{ color: '#2cbaff' }}>{step.power.label}</p>
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

      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || 'Continue!'}
      </Button>
    </motion.div>
  )
}
