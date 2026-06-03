import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const PRESET_COLORS = [
  '#2cbaff','#fde047','#10b981','#f43f5e','#f59e0b',
  '#8b5cf6','#14b8a6','#ec4899','#0ea5e9','#f97316','#1e293b','#ffffff',
]

function TagsField({ value = [], onChange, suggestions = [] }) {
  const [input, setInput] = useState('')
  const add    = (tag) => { const t = tag.trim(); if (t && !value.includes(t)) onChange([...value, t]); setInput('') }
  const remove = (tag) => onChange(value.filter((v) => v !== tag))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-sm font-medium"
            style={{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-light)' }}
          >
            {tag}
            <button onClick={() => remove(tag)} className="hover:text-red-400 transition-colors"><X size={9} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) } }}
          placeholder="Type and press Enter..."
          className="input-base flex-1 text-sm"
        />
        <button
          onClick={() => add(input)}
          className="p-2 rounded-xl border transition-colors"
          style={{
            borderColor: 'var(--accent-border)',
            backgroundColor: 'var(--accent-bg)',
            color: 'var(--accent)',
          }}
        >
          <Plus size={12} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1">
        {suggestions.filter((s) => !value.includes(s)).slice(0, 5).map((s) => (
          <button
            key={s}
            onClick={() => add(s)}
            className="text-sm rounded-lg px-2 py-0.5 transition-colors"
            style={{
              color: 'var(--ink-faint)',
              border: '2px solid var(--app-border)',
            }}
          >
            + {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function ColorField({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-6 gap-1.5">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            style={{
              background: c,
              border: value === c ? '2px solid #2cbaff' : '2px solid transparent',
            }}
            className="aspect-square rounded-lg shadow-sm hover:scale-110 transition-transform"
          />
        ))}
      </div>
      <input
        type="color"
        value={value || '#2cbaff'}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full rounded-xl cursor-pointer p-0.5"
        style={{ border: '2px solid var(--app-border)', backgroundColor: 'var(--app-raised)' }}
      />
    </div>
  )
}

function SelectField({ value, onChange, options, labels }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all"
          style={{
            borderColor: value === opt ? '#2cbaff' : 'var(--app-border)',
            backgroundColor: value === opt ? 'rgba(44,186,255,0.1)' : 'var(--app-raised)',
            color: value === opt ? '#2cbaff' : 'var(--ink-muted)',
          }}
        >
          {labels?.[i] ?? opt}
        </button>
      ))}
    </div>
  )
}

export default function VisualBuilderStep({ step, onComplete }) {
  const speak   = useTekiStore((s) => s.speak)
  const adventure = useAdventureStore()

  const getInit = () => {
    const vals = {}
    for (const f of step.fields || []) {
      vals[f.id] = step.isStyleUpdate
        ? adventure.website.styles[f.storeSubKey] || ''
        : adventure.website.sections[step.section]?.content[f.storeSubKey] ?? ''
    }
    return vals
  }

  const [values, setValues] = useState(getInit)

  useEffect(() => {
    speak(step.teki || 'Customize this section!', { mood: 'happy' })
  }, [step.id])

  const setField = (fieldId, val) => {
    const newVals = { ...values, [fieldId]: val }
    setValues(newVals)
    const field = step.fields.find((f) => f.id === fieldId)
    if (!field) return
    if (step.isStyleUpdate) adventure.updateStyles({ [field.storeSubKey]: val })
    else if (step.section) adventure.updateSection(step.section, { [field.storeSubKey]: val })
  }

  const handleComplete = () => {
    if (step.section && !step.isStyleUpdate) {
      const content = {}
      for (const f of step.fields) content[f.storeSubKey] = values[f.id]
      adventure.buildSection(step.section, content)
    }
    speak('Looking great! 🎉', { mood: 'excited' })
    setTimeout(onComplete, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {step.fields?.map((field) => (
        <div key={field.id}>
          <label className="text-sm font-semibold block mb-1" style={{ color: 'var(--ink-muted)' }}>
            {field.label}
            {field.hint && <span className="font-normal" style={{ color: 'var(--ink-faint)' }}> — {field.hint}</span>}
          </label>

          {field.type === 'text' && (
            <Input value={values[field.id] || ''} onChange={(e) => setField(field.id, e.target.value)} placeholder={field.placeholder} />
          )}
          {field.type === 'tags' && (
            <TagsField value={values[field.id] || []} onChange={(v) => setField(field.id, v)} suggestions={field.suggestions} />
          )}
          {field.type === 'color' && (
            <ColorField value={values[field.id]} onChange={(v) => setField(field.id, v)} />
          )}
          {field.type === 'select' && (
            <SelectField value={values[field.id]} onChange={(v) => setField(field.id, v)} options={field.options} labels={field.labels} />
          )}
        </div>
      ))}

      <Button variant="solid" color="blue" fullWidth onClick={handleComplete}>
        {step.action || 'Done!'}
      </Button>
    </motion.div>
  )
}
