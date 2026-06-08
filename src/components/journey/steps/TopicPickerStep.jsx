import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { useStepAction } from '@/contexts/StepActionContext'
import Input from '@/components/ui/Input'

const TOPIC_EMOJIS = {
  Pets: '🐾', Space: '🚀', Music: '🎵', Sports: '⚽', Gaming: '🎮',
  Art: '🎨', Science: '🔬', Food: '🍕', Travel: '✈️', Fashion: '👗',
}

export default function TopicPickerStep({ step, onComplete }) {
  const speak   = useTekiStore((s) => s.speak)
  const journey = useJourneyStore()
  const { setStepAction } = useStepAction()
  const [selected, setSelected] = useState('')
  const [custom, setCustom]     = useState('')

  const active = custom.trim() || selected

  const confirm = () => {
    if (!active) return
    const topic = custom.trim() || selected
    journey.setWebsiteTopic(topic)
    speak(`${topic}? That's going to be amazing! 🌟`, { mood: 'excited' })
    setTimeout(onComplete, 700)
  }

  useEffect(() => {
    speak(step.teki || 'What is your website about?', { mood: 'thinking' })
  }, [step.id])

  // Re-register when selection changes so disabled state is fresh
  useEffect(() => {
    setStepAction({ label: step.action || "That's what it's about!", onClick: confirm, disabled: !active })
  }, [selected, custom, step.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="grid grid-cols-4 gap-2">
        {(step.options || []).map((topic) => (
          <motion.button
            key={topic}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => { setSelected(topic); setCustom('') }}
            className="flex flex-col items-center gap-0.5 p-2 rounded-xl border-2 text-sm font-semibold transition-all"
            style={{
              borderColor: selected === topic && !custom ? '#3b82f6' : 'var(--app-border)',
              backgroundColor: selected === topic && !custom ? 'rgba(59,130,246,0.1)' : 'var(--app-raised)',
              color: selected === topic && !custom ? '#3b82f6' : 'var(--ink-muted)',
            }}
          >
            <span className="text-xl">{TOPIC_EMOJIS[topic] || '📌'}</span>
            <span className="leading-tight">{topic}</span>
          </motion.button>
        ))}
      </div>

      <Input
        placeholder="Or type your own..."
        value={custom}
        onChange={(e) => { setCustom(e.target.value); setSelected('') }}
        onKeyDown={(e) => e.key === 'Enter' && confirm()}
      />
    </motion.div>
  )
}
