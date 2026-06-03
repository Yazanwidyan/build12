import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const PRESET_COLORS = [
  '#6366f1','#3b82f6','#10b981','#f43f5e','#f59e0b',
  '#8b5cf6','#14b8a6','#ec4899','#0ea5e9','#f97316','#1e293b','#ffffff',
]

function TagsField({ value = [], onChange, suggestions = [] }) {
  const [input, setInput] = useState('')
  const add = (tag) => { const t = tag.trim(); if (t && !value.includes(t)) onChange([...value, t]); setInput('') }
  const remove = (tag) => onChange(value.filter((v) => v !== tag))
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-1 bg-teki-50 text-teki-700 border border-teki-200 rounded-lg px-2 py-0.5 text-xs font-medium">
            {tag}
            <button onClick={() => remove(tag)} className="hover:text-red-500"><X size={9} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) } }}
          placeholder="Type and press Enter..."
          className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-teki-500 focus:outline-none focus:ring-2 focus:ring-teki-500/20"
        />
        <button onClick={() => add(input)} className="p-2 text-teki-600 hover:bg-teki-50 rounded-xl border border-teki-200">
          <Plus size={12} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1">
        {suggestions.filter((s) => !value.includes(s)).slice(0, 5).map((s) => (
          <button key={s} onClick={() => add(s)}
            className="text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-0.5 hover:bg-gray-50">
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
          <button key={c} onClick={() => onChange(c)}
            style={{ background: c, border: value === c ? '2px solid #6366f1' : '2px solid transparent' }}
            className="aspect-square rounded-lg shadow-sm hover:scale-110 transition-transform" />
        ))}
      </div>
      <input type="color" value={value || '#6366f1'} onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full rounded-xl border border-gray-200 cursor-pointer p-0.5" />
    </div>
  )
}

function SelectField({ value, onChange, options, labels }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt, i) => (
        <button key={opt} onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-xl text-xs border-2 font-medium transition-colors
            ${value === opt ? 'border-teki-500 bg-teki-50 text-teki-700' : 'border-gray-200 text-gray-600 hover:border-teki-200'}`}>
          {labels?.[i] ?? opt}
        </button>
      ))}
    </div>
  )
}

export default function VisualBuilderStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)
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
    if (step.isStyleUpdate) {
      adventure.updateStyles({ [field.storeSubKey]: val })
    } else if (step.section) {
      adventure.updateSection(step.section, { [field.storeSubKey]: val })
    }
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
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            {field.label}{field.hint && <span className="font-normal text-gray-400"> — {field.hint}</span>}
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

      <Button variant="action" fullWidth onClick={handleComplete}>
        {step.action || 'Done!'}
      </Button>
    </motion.div>
  )
}
