import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { useAgeConfig, getExplanation } from '@/engines/ageEngine'
import { interpolateCode } from '@/engines/previewEngine'
import Button from '@/components/ui/Button'

export default function CodeChallengeStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak)
  const website = useAdventureStore((s) => s.website)
  const { ageGroup } = useAgeConfig()
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    speak(step.teki || 'Your turn!', { mood: 'thinking' })
  }, [step.id])

  const explanation = getExplanation(step, ageGroup)
  const code = interpolateCode(step.code, website)

  const parts = code.split(/(___)/)
  let blankIdx = 0

  const check = () => {
    const count = (code.match(/___/g) || []).length
    let correct = true
    for (let i = 0; i < count; i++) {
      const expected = step.blanks?.[i]?.answer || ''
      if ((answers[i] || '').trim().toLowerCase() !== expected.toLowerCase()) { correct = false; break }
    }
    setResult(correct ? 'correct' : 'wrong')
    setAttempts((a) => a + 1)
    if (correct) {
      speak([step.successMessage || 'Perfect! 🎯', "You're writing real code!"], { mood: 'excited' })
      setTimeout(onComplete, 1200)
    } else {
      speak(attempts >= 1
        ? [`Hint: the answer is "${step.blanks?.[0]?.answer}"!`]
        : ['Almost! Try again — you\'re close!'],
        { mood: 'happy' }
      )
      setTimeout(() => setResult(null), 1500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="bg-gray-900 rounded-xl p-3 font-mono text-xs leading-relaxed">
        {parts.map((part, i) => {
          if (part === '___') {
            const bi = blankIdx++
            return (
              <input
                key={i}
                value={answers[bi] || ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [bi]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && check()}
                placeholder={ageGroup === 'young' ? step.blanks?.[bi]?.answer : '...'}
                className="inline-block bg-teki-900 border-2 border-teki-500 rounded px-1.5 text-teki-200
                           placeholder:text-teki-700 focus:outline-none w-16 text-center"
                style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
                autoFocus={bi === 0}
              />
            )
          }
          return <span key={i} className="text-gray-300 whitespace-pre-wrap">{part}</span>
        })}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold
              ${result === 'correct' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}
          >
            {result === 'correct' ? <Check size={14} /> : <X size={14} />}
            {result === 'correct' ? 'Correct!' : 'Not quite — try again!'}
          </motion.div>
        )}
      </AnimatePresence>

      {explanation && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
          <p className="text-xs text-amber-800 leading-relaxed">💡 {explanation}</p>
        </div>
      )}

      <Button variant="action" fullWidth onClick={check}>
        {step.action || 'Check my answer!'}
      </Button>
    </motion.div>
  )
}
