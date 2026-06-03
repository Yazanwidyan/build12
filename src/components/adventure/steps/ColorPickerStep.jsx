import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import Button from '@/components/ui/Button'

const PRESET_COLORS = [
  { label: 'Sky Blue',   value: '#2cbaff' },
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
  const adventure = useAdventureStore()
  const [selected, setSelected] = useState(adventure.website.color || '#2cbaff')

  useEffect(() => {
    speak(step.teki || 'Pick your main color!', { mood: 'excited' })
  }, [step.id])

  const pick = (color) => {
    setSelected(color)
    adventure.setWebsiteColor(color)
  }

  const confirm = () => {
    speak('Perfect color! 🎨', { mood: 'excited' })
    setTimeout(onComplete, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="grid grid-cols-6 gap-2">
        {PRESET_COLORS.map((c) => (
          <motion.button
            key={c.value}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => pick(c.value)}
            title={c.label}
            className="relative aspect-square rounded-xl shadow-sm focus:outline-none"
            style={{
              background: c.value,
              outline: selected === c.value ? `3px solid ${c.value}` : 'none',
              outlineOffset: 2,
            }}
          >
            {selected === c.value && (
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">✓</span>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={selected}
          onChange={(e) => pick(e.target.value)}
          className="h-8 w-12 rounded-lg cursor-pointer p-0.5 shrink-0"
          style={{ border: '2px solid var(--app-border)', backgroundColor: 'var(--app-raised)' }}
        />
        <div
          className="flex-1 h-8 rounded-xl flex items-center px-3"
          style={{ border: '2px solid var(--app-border)', background: selected + '22' }}
        >
          <span className="text-xs font-mono" style={{ color: 'var(--ink-muted)' }}>{selected}</span>
        </div>
      </div>

      <Button variant="action" fullWidth onClick={confirm}>
        {step.action || "That's the color!"}
      </Button>
    </motion.div>
  )
}
