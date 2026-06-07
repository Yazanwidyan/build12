import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import Button from '@/components/ui/Button'

// TEKI speaks the messages in the bubble — this just renders the "continue" button.
export default function TekiMessageStep({ step, onComplete }) {
  const speak        = useTekiStore((s) => s.speak)
  const setHighlight = useTekiStore((s) => s.setHighlight)
  const clearHighlight = useTekiStore((s) => s.clearHighlight)

  useEffect(() => {
    speak(step.messages || [step.teki], { mood: step.mood || 'happy' })
    const hl = step.highlight || step.highlightSection
    if (hl) setHighlight(hl)
    else clearHighlight()
  }, [step.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || 'Got it!'}
      </Button>
    </motion.div>
  )
}
