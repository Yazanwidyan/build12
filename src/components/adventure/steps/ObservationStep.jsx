import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import Blueprint from '@/components/adventure/Blueprint'
import Button from '@/components/ui/Button'

export default function ObservationStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)

  useEffect(() => {
    speak(step.tekiMessages || [step.teki], { mood: step.mood || 'excited' })
  }, [step.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {step.showBlueprint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Blueprint />
        </motion.div>
      )}

      {step.highlightSection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring' }}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-center"
          style={{
            backgroundColor: 'rgba(44,186,255,0.1)',
            border: '1px solid rgba(44,186,255,0.3)',
            color: '#2cbaff',
          }}
        >
          ✅ {step.highlightSection.charAt(0).toUpperCase() + step.highlightSection.slice(1)} built!
        </motion.div>
      )}

      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || 'Continue'}
      </Button>
    </motion.div>
  )
}
