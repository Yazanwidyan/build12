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
                className="inline-block rounded px-1.5 focus:outline-none w-16 text-center"
                style={{ backgroundColor: 'rgba(44,186,255,0.1)', border: '2px solid #2cbaff', color: '#7cd8ff' }}
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
            className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold"
            style={result === 'correct'
              ? { backgroundColor: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }
              : { backgroundColor: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
          >
            {result === 'correct' ? <Check size={14} /> : <X size={14} />}
            {result === 'correct' ? 'Correct!' : 'Not quite — try again!'}
          </motion.div>
        )}
      </AnimatePresence>

      {explanation && (
        <div className="rounded-xl p-2.5" style={{ backgroundColor: 'rgba(253,224,71,0.1)', border: '1px solid rgba(253,224,71,0.25)' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#fde047' }}>💡 {explanation}</p>
        </div>
      )}

      <Button variant="action" fullWidth onClick={check}>
        {step.action || 'Check my answer!'}
      </Button>
    </motion.div>
  )
}
