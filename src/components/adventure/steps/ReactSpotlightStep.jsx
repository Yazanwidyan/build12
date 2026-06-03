import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import Button from '@/components/ui/Button'

// Spotlight step: TEKI points to elements on the website preview.
// Optionally asks a yes/no question and reacts to the answer.
export default function ReactSpotlightStep({ step, onComplete }) {
  const speak        = useTekiStore((s) => s.speak)
  const setReactDemo = useAdventureStore((s) => s.setReactDemo)
  const [answeredWith, setAnsweredWith] = useState(null)
  const [ready, setReady]               = useState(!step.question)

  useEffect(() => {
    if (step.demoState) setReactDemo(step.demoState)
    speak(step.teki ? [step.teki] : (step.messages || []), { mood: step.mood || 'happy' })

    // Auto-show continue button after a short delay if no question
    if (!step.question) {
      const t = setTimeout(() => setReady(true), 600)
      return () => clearTimeout(t)
    }
  }, [step.id])

  const handleOption = (opt) => {
    setAnsweredWith(opt.id)
    const reaction = step.tekiReaction?.[opt.id]
    if (reaction) {
      speak(reaction.messages, { mood: reaction.mood || 'happy' })
    }
    // Show continue after reaction delay
    setTimeout(() => setReady(true), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Element label badges (shown when pointing to specific UI elements) */}
      {step.highlightLabels && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {step.highlightLabels.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-sm font-semibold text-indigo-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {label}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Yes / No (or custom option) question */}
      <AnimatePresence>
        {step.question && !answeredWith && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-2.5"
          >
            <p className="text-base font-semibold text-gray-700 leading-snug">{step.question}</p>
            <div className="flex gap-2">
              {(step.options || []).map((opt) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOption(opt)}
                  className="flex-1 py-2.5 px-4 rounded-xl border-2 border-gray-200 text-base font-semibold text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected answer badge */}
      <AnimatePresence>
        {answeredWith && (
          <motion.div
            key="answered"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-base text-gray-500"
          >
            <span className="text-green-500 font-bold">✓</span>
            <span>You answered: <strong>{step.options?.find(o => o.id === answeredWith)?.label}</strong></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <AnimatePresence>
        {ready && (
          <motion.div
            key="continue"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
              {step.action || 'Continue'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
