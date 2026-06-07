import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import TekiCharacter from './TekiCharacter'

const FADE_MS = 420

export default function Teki() {
  const {
    currentMessage, isTyping, choices, onChoice,
    mood, isVisible, isBubbleOpen,
    messageTyped, openBubble, closeBubble,
  } = useTekiStore()

  // After the fade completes, advance the message queue
  useEffect(() => {
    if (!currentMessage || !isTyping) return
    const t = setTimeout(messageTyped, FADE_MS)
    return () => clearTimeout(t)
  }, [currentMessage, isTyping])

  const handleChoice = (choice) => {
    onChoice?.(choice)
    useTekiStore.getState().clearChoices()
  }

  const showBubble = isBubbleOpen && currentMessage

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {showBubble && (
          <motion.div
            key={currentMessage}
            className="pointer-events-auto"
            style={{ maxWidth: 280 }}
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: 1, y: 0,
              boxShadow: [
                "0 0 28px 8px rgba(99,102,241,0.55)",
                "0 2px 12px rgba(99,102,241,0.10)",
              ],
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="teki-bubble mb-1">
              <p className="text-base leading-relaxed" style={{ color: 'var(--bubble-text)' }}>
                {currentMessage}
              </p>
            </div>

            {/* Choices */}
            <AnimatePresence>
              {!isTyping && choices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-2 mt-2 justify-end"
                >
                  {choices.map((choice) => (
                    <button
                      key={choice.value ?? choice.label}
                      onClick={() => handleChoice(choice)}
                      className="rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors"
                      style={{
                        background: 'var(--bubble-bg)',
                        border: '1px solid var(--bubble-border)',
                        color: 'var(--bubble-text)',
                      }}
                    >
                      {choice.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teki body */}
      <motion.button
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => (isBubbleOpen ? closeBubble() : openBubble())}
        className="pointer-events-auto relative focus:outline-none"
        aria-label="Toggle TEKI"
      >
        <TekiCharacter size={72} mood={mood} />
        {!isBubbleOpen && currentMessage && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}
