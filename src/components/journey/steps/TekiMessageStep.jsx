import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import Button from '@/components/ui/Button'

export default function TekiMessageStep({ step, onComplete }) {
  const speak          = useTekiStore((s) => s.speak)
  const setHighlight   = useTekiStore((s) => s.setHighlight)
  const clearHighlight = useTekiStore((s) => s.clearHighlight)
  const isTyping       = useTekiStore((s) => s.isTyping)

  useEffect(() => {
    speak(step.messages || [step.teki], { mood: step.mood || 'happy' })
    const hl = step.highlight || step.highlightSection
    if (hl) setHighlight(hl)
    else clearHighlight()
  }, [step.id])

  // Auto-advance once the message finishes — no button needed
  useEffect(() => {
    if (!step.autoAdvance || isTyping) return
    const t = setTimeout(onComplete, step.autoAdvanceDelay ?? 2200)
    return () => clearTimeout(t)
  }, [step.autoAdvance, isTyping])

  if (step.autoAdvance) return null

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
