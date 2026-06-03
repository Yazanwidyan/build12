import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useAgeConfig } from '@/engines/ageEngine'
import Button from '@/components/ui/Button'

// ── Animated concept: Blueprint → many components ──────────────────────────────
function BlueprintToComponentsAnim() {
  const [phase, setPhase] = useState(0) // 0=show blueprint, 1=show arrow, 2=show buttons

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const buttons = ['Adopt Now', 'Learn More', 'Contact Us', 'Join Now']

  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center gap-3 select-none">
      {/* Blueprint */}
      <motion.div
        animate={{ scale: phase === 0 ? 1.06 : 0.95, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white border-2 border-dashed border-indigo-300 rounded-xl px-6 py-3 text-center shadow-sm"
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Blueprint</span>
        <div className="mt-1 bg-indigo-50 rounded-lg px-4 py-1.5 font-mono text-sm font-bold text-indigo-600">
          {'<Button />'}
        </div>
      </motion.div>

      {/* Arrow */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={{ originY: 0 }}
            className="flex flex-col items-center gap-0.5 text-indigo-400"
          >
            <div className="w-0.5 h-5 bg-indigo-300" />
            <span className="text-base font-bold leading-none">↓</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Many buttons */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {buttons.map((btn, i) => (
              <motion.button
                key={btn}
                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                {btn}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {phase >= 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-400 text-center"
        >
          4 buttons — 1 blueprint
        </motion.p>
      )}
    </div>
  )
}

// ── Animated concept: Props + State data flow ──────────────────────────────────
function PropsStateFlowAnim() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3 select-none">
      {/* Parent */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-100 border-2 border-indigo-300 rounded-xl p-3 text-center"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Parent Component</p>
        <code className="text-xs text-indigo-700 font-mono bg-white rounded px-2 py-0.5">
          const [theme, setTheme] = useState()
        </code>
      </motion.div>

      {/* Props arrow */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            key="props-arrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="flex-1 h-px bg-sky-300" />
            <span className="text-xs font-bold text-sky-600 px-2 py-0.5 bg-sky-50 border border-sky-200 rounded-full">
              props ↓
            </span>
            <div className="flex-1 h-px bg-sky-300" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Children */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            key="children"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-2"
          >
            {['Header', 'Hero', 'Footer'].map((child, i) => (
              <motion.div
                key={child}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-sky-50 border-2 border-sky-200 rounded-xl p-2.5 text-center"
              >
                <p className="text-xs font-bold text-sky-700">{child}</p>
                <code className="text-[10px] text-sky-500 font-mono mt-0.5 block">theme=…</code>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {phase >= 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-gray-400 text-center"
        >
          State lives in the parent. Props flow down to every child.
        </motion.p>
      )}
    </div>
  )
}

// ── Registry of concept animations ────────────────────────────────────────────
const CONCEPTS = {
  'blueprint-to-components': BlueprintToComponentsAnim,
  'props-state-flow':        PropsStateFlowAnim,
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ReactConceptStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)
  const { ageGroup } = useAgeConfig()
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    speak(step.teki || 'Check this out!', { mood: step.mood || 'excited' })
    const t = setTimeout(() => setShowCode(true), 2200)
    return () => clearTimeout(t)
  }, [step.id])

  const ConceptAnim = CONCEPTS[step.conceptType] || CONCEPTS['blueprint-to-components']
  const explanation = step.explanation?.[ageGroup] ?? step.explanation?.junior ?? ''

  const langBadge = {
    jsx:        'bg-teki-50 border-teki-200 text-teki-700',
    javascript: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    html:       'bg-orange-50 border-orange-200 text-orange-700',
    css:        'bg-blue-50 border-blue-200 text-blue-700',
  }[step.language || 'jsx'] || 'bg-teki-50 border-teki-200 text-teki-700'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <ConceptAnim />

      <AnimatePresence>
        {showCode && step.codeReveal && (
          <motion.div
            key="code"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            <span className={`self-start text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded border ${langBadge}`}>
              {step.language || 'jsx'}
            </span>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-3 text-xs leading-relaxed overflow-x-auto">
              <code>{step.codeReveal}</code>
            </pre>
            {explanation && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                <p className="text-xs text-amber-800 leading-relaxed">💡 {explanation}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showCode && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
            {step.action || 'Next!'}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
