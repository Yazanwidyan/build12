import { useEffect } from 'react'
import { useTekiStore } from '@/stores/tekiStore'
import { useStepAction } from '@/contexts/StepActionContext'

export default function TekiMessageStep({ step, onComplete }) {
  const speak          = useTekiStore((s) => s.speak)
  const setHighlight   = useTekiStore((s) => s.setHighlight)
  const clearHighlight = useTekiStore((s) => s.clearHighlight)
  const isTyping       = useTekiStore((s) => s.isTyping)
  const { setStepAction } = useStepAction()

  useEffect(() => {
    speak(step.messages || [step.teki], { mood: step.mood || 'happy' })
    const hl = step.highlight || step.highlightSection
    if (hl) setHighlight(hl)
    else clearHighlight()
  }, [step.id])

  useEffect(() => {
    if (step.autoAdvance) {
      setStepAction(null)
    } else {
      setStepAction({ label: step.action || 'Got it!', onClick: onComplete })
    }
  }, [step.id])

  // Auto-advance once the message finishes
  useEffect(() => {
    if (!step.autoAdvance || isTyping) return
    const t = setTimeout(onComplete, step.autoAdvanceDelay ?? 2200)
    return () => clearTimeout(t)
  }, [step.autoAdvance, isTyping])

  return null
}
