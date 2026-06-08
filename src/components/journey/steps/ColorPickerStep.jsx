import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useJourneyStore } from '@/stores/journeyStore'
import { useStepAction } from '@/contexts/StepActionContext'

const PRESET_COLORS = [
  { label: 'Sky Blue',   value: '#3b82f6' },
  { label: 'Gold',       value: '#fde047' },
  { label: 'Emerald',    value: '#10b981' },
  { label: 'Rose',       value: '#f43f5e' },
  { label: 'Amber',      value: '#f59e0b' },
  { label: 'Violet',     value: '#8b5cf6' },
  { label: 'Teal',       value: '#14b8a6' },
  { label: 'Pink',       value: '#ec4899' },
  { label: 'Cyan',       value: '#0ea5e9' },
  { label: 'Orange',     value: '#f97316' },
  { label: 'Midnight',   value: '#1e293b' },
  { label: 'Mint',       value: '#6ee7b7' },
]

export default function ColorPickerStep({ step, onComplete }) {
  const speak   = useTekiStore((s) => s.speak)
  const journey = useJourneyStore()
  const { setStepAction } = useStepAction()
  const [selected, setSelected] = useState(journey.website.color || '#3b82f6')

  const confirm = () => {
    speak('Perfect color! 🎨', { mood: 'excited' })
    setTimeout(onComplete, 500)
  }

  useEffect(() => {
    speak(step.teki || 'Pick your main color!', { mood: 'excited' })
    setStepAction({ label: step.action || "That's the color!", onClick: confirm })
  }, [step.id])

  const pick = (color) => {
    setSelected(color)
    journey.setWebsiteColor(color)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="grid grid-cols-6 gap-1.5">
        {PRESET_COLORS.map((c) => (
          <motion.button
            key={c.value}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => pick(c.value)}
            title={c.label}
            className="relative focus:outline-none"
            style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: c.value,
              outline: selected === c.value ? `2.5px solid ${c.value}` : 'none',
              outlineOffset: 2,
              flexShrink: 0,
            }}
          >
            {selected === c.value && (
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold" style={{ fontSize: 11 }}>✓</span>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={selected}
          onChange={(e) => pick(e.target.value)}
          className="rounded cursor-pointer p-0.5 shrink-0"
          style={{ height: 24, width: 36, border: '1.5px solid var(--app-border)', backgroundColor: 'var(--app-raised)' }}
        />
        <div
          className="flex-1 rounded-lg flex items-center px-2"
          style={{ height: 24, border: '1.5px solid var(--app-border)', background: selected + '22' }}
        >
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ink-muted)' }}>{selected}</span>
        </div>
      </div>

    </motion.div>
  )
}
