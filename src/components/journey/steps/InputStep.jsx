import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { useStepAction } from '@/contexts/StepActionContext'
import Input from '@/components/ui/Input'

export default function InputStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)
  const journey = useJourneyStore()
  const { setStepAction } = useStepAction()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!value.trim()) { setError('Please type something!'); return }
    if (step.minLength && value.trim().length < step.minLength) {
      setError(`Needs at least ${step.minLength} characters`)
      return
    }
    switch (step.storeKey) {
      case 'websiteName':  journey.setWebsiteName(value.trim()); break
      case 'websiteTopic': journey.setWebsiteTopic(value.trim()); break
    }
    speak(`"${value.trim()}" — love it! ✨`, { mood: 'excited' })
    setTimeout(onComplete, 700)
  }

  useEffect(() => {
    speak(step.teki || '', { mood: 'happy' })
  }, [step.id])

  // Re-register when value changes so disabled state and onClick closure are fresh
  useEffect(() => {
    setStepAction({ label: step.action || 'Continue', onClick: handleSubmit, disabled: !value.trim() })
  }, [value, step.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {step.tekiHint && (
        <p className="text-sm italic" style={{ color: 'var(--ink-faint)' }}>{step.tekiHint}</p>
      )}
      <Input
        value={value}
        onChange={(e) => { setValue(e.target.value); setError('') }}
        placeholder={step.placeholder}
        error={error}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
      />
    </motion.div>
  )
}
