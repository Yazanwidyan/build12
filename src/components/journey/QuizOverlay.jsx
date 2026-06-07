import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Trophy, Star, ArrowRight } from 'lucide-react'
import { useQuizStore } from '@/stores/quizStore'
import { useProgressStore } from '@/stores/progressStore'
import Button from '@/components/ui/Button'

// ── Option button ──────────────────────────────────────────────────────────────
function Option({ label, index, selected, correct, answered, onClick }) {
  const isSelected = selected === index
  const isCorrect  = index === correct
  const showResult = answered

  let bg = 'var(--app-surface)'
  let border = 'var(--app-border)'
  let text = 'var(--ink)'

  if (showResult && isCorrect) {
    bg = 'rgba(34,197,94,0.12)'; border = '#22c55e'; text = '#16a34a'
  } else if (showResult && isSelected && !isCorrect) {
    bg = 'rgba(239,68,68,0.10)'; border = '#ef4444'; text = '#dc2626'
  }

  return (
    <motion.button
      whileHover={!answered ? { scale: 1.015, y: -1 } : {}}
      whileTap={!answered ? { scale: 0.98 } : {}}
      onClick={() => !answered && onClick(index)}
      className="w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3 font-semibold text-sm transition-all"
      style={{
        backgroundColor: bg,
        border: `2px solid ${border}`,
        color: text,
        cursor: answered ? 'default' : 'pointer',
      }}
      animate={{ backgroundColor: bg, borderColor: border }}
      transition={{ duration: 0.2 }}
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={{
          backgroundColor: showResult && isCorrect ? '#22c55e' : showResult && isSelected ? '#ef4444' : 'var(--app-raised)',
          color: showResult && (isCorrect || isSelected) ? '#fff' : 'var(--ink-muted)',
        }}
      >
        {showResult && isCorrect
          ? <CheckCircle2 size={14} />
          : showResult && isSelected
          ? <XCircle size={14} />
          : String.fromCharCode(65 + index)}
      </span>
      <span>{label}</span>
    </motion.button>
  )
}

// ── Score screen ───────────────────────────────────────────────────────────────
function ScoreScreen({ score, total, actTitle, actEmoji, onDone }) {
  const pct    = Math.round((score / total) * 100)
  const stars  = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
  const msg    = pct === 100
    ? 'Perfect score! 🔥'
    : pct >= 80
    ? 'Great work!'
    : pct >= 50
    ? 'Good effort!'
    : 'Keep practicing!'

  return (
    <motion.div
      className="flex flex-col items-center gap-6 py-4 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="text-6xl"
        animate={{ rotate: [0, 15, -15, 8, -8, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 0.9 }}
      >
        {actEmoji || '🏆'}
      </motion.div>

      <div>
        <p className="text-3xl font-black" style={{ color: 'var(--ink)' }}>
          {score}/{total}
        </p>
        <p className="text-base font-semibold mt-1" style={{ color: 'var(--ink-muted)' }}>
          {msg}
        </p>
      </div>

      {/* Stars */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: i < stars ? 1 : 0.5, rotate: 0 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 300, damping: 18 }}
          >
            <Star
              size={36}
              fill={i < stars ? '#fbbf24' : 'transparent'}
              stroke={i < stars ? '#fbbf24' : 'var(--app-border)'}
            />
          </motion.div>
        ))}
      </div>

      {/* Score bar */}
      <div className="w-full rounded-full overflow-hidden h-3" style={{ backgroundColor: 'var(--app-raised)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
      <p className="text-sm font-bold" style={{ color: 'var(--ink-faint)' }}>{pct}% correct</p>

      <Button variant="solid" color="blue" fullWidth onClick={onDone}>
        Continue <ArrowRight size={14} className="ml-1" />
      </Button>
    </motion.div>
  )
}

// ── Inner quiz panel (rendered when isOpen) ────────────────────────────────────
function QuizPanel({ actTitle, actEmoji, questions, onComplete, closeQuiz }) {
  const addXP = useProgressStore((s) => s.addXP)

  const [qIndex,   setQIndex]   = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score,    setScore]    = useState(0)
  const [done,     setDone]     = useState(false)

  const current   = questions[qIndex]
  const progress  = (qIndex / questions.length) * 100

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === current.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (qIndex >= questions.length - 1) {
      const finalScore = selected === current.correct ? score + 1 : score
      const pct = Math.round((finalScore / questions.length) * 100)
      if (pct >= 80) addXP(50)
      else if (pct >= 50) addXP(20)
      setDone(true)
    } else {
      setQIndex((i) => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleDone = () => {
    closeQuiz()
    onComplete?.()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          backgroundColor: 'var(--app-surface)',
          border: '1.5px solid var(--app-border)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
        }}
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--ink-faint)' }}>
                ACT QUIZ
              </p>
              <p className="text-sm font-bold" style={{ color: 'var(--ink)' }}>
                {actTitle}
              </p>
            </div>
            {!done && (
              <span className="text-sm font-black" style={{ color: 'var(--ink-muted)' }}>
                {qIndex + 1} / {questions.length}
              </span>
            )}
          </div>

          {/* Progress bar */}
          {!done && (
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--app-raised)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), #818cf8)' }}
                animate={{ width: `${progress + (100 / questions.length)}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {done ? (
              <ScoreScreen
                key="score"
                score={score}
                total={questions.length}
                actTitle={actTitle}
                actEmoji={actEmoji}
                onDone={handleDone}
              />
            ) : (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-4"
              >
                {/* Question */}
                <p className="text-lg font-bold leading-snug pt-1" style={{ color: 'var(--ink)' }}>
                  {current.question}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {current.options.map((opt, i) => (
                    <Option
                      key={i}
                      index={i}
                      label={opt}
                      selected={selected}
                      correct={current.correct}
                      answered={answered}
                      onClick={handleSelect}
                    />
                  ))}
                </div>

                {/* Explanation + Next */}
                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-3"
                    >
                      {current.explanation && (
                        <p
                          className="text-sm leading-relaxed px-3 py-2 rounded-xl"
                          style={{
                            backgroundColor: selected === current.correct ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.07)',
                            color: selected === current.correct ? '#16a34a' : '#dc2626',
                            border: `1px solid ${selected === current.correct ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.2)'}`,
                          }}
                        >
                          {selected === current.correct ? '✓ ' : '✗ '}{current.explanation}
                        </p>
                      )}
                      <Button variant="solid" color="blue" fullWidth onClick={handleNext}>
                        {qIndex >= questions.length - 1 ? 'See Results' : 'Next Question'}
                        <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main overlay ───────────────────────────────────────────────────────────────
export default function QuizOverlay() {
  const { isOpen, actTitle, actEmoji, questions, onComplete, closeQuiz } = useQuizStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <QuizPanel
          key="quiz"
          actTitle={actTitle}
          actEmoji={actEmoji}
          questions={questions}
          onComplete={onComplete}
          closeQuiz={closeQuiz}
        />
      )}
    </AnimatePresence>
  )
}
