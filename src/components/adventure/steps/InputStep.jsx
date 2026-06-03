import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function InputStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)
  const adventure = useAdventureStore()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Question goes in the bubble; hint shown below the input
    speak(step.teki || '', { mood: 'happy' })
  }, [step.id])

  const handleSubmit = () => {
    if (!value.trim()) { setError('Please type something!'); return }
    if (step.minLength && value.trim().length < step.minLength) {
      setError(`Needs at least ${step.minLength} characters`)
      return
    }

    switch (step.storeKey) {
      case 'websiteName':  adventure.setWebsiteName(value.trim()); break
      case 'websiteTopic': adventure.setWebsiteTopic(value.trim()); break
    }

    speak(`"${value.trim()}" — love it! ✨`, { mood: 'excited' })
    setTimeout(onComplete, 700)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {step.tekiHint && (
        <p className="text-xs text-gray-400 italic">{step.tekiHint}</p>
      )}
      <Input
        value={value}
        onChange={(e) => { setValue(e.target.value); setError('') }}
        placeholder={step.placeholder}
        error={error}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
      />
      <Button variant="action" fullWidth onClick={handleSubmit} disabled={!value.trim()}>
        {step.action || 'Continue'}
      </Button>
    </motion.div>
  )
}
