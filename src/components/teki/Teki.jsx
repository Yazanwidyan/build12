import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import TekiCharacter from './TekiCharacter'

const TYPING_SPEED = 28 // ms per character

export default function Teki() {
  const {
    currentMessage,
    displayedText,
    isTyping,
    choices,
    onChoice,
    mood,
    isVisible,
    isBubbleOpen,
    setDisplayedText,
    messageTyped,
    openBubble,
    closeBubble,
  } = useTekiStore()

  const intervalRef = useRef(null)
  const [charIndex, setCharIndex] = useState(0)

  // Typing animation
  useEffect(() => {
    if (!currentMessage || !isTyping) return

    setCharIndex(0)
    setDisplayedText('')

    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        const next = prev + 1
        const slice = currentMessage.slice(0, next)
        setDisplayedText(slice)

        if (next >= currentMessage.length) {
          clearInterval(intervalRef.current)
          setTimeout(() => messageTyped(), 300)
        }

        return next
      })
    }, TYPING_SPEED)

    return () => clearInterval(intervalRef.current)
  }, [currentMessage, isTyping])

  const handleChoice = (choice) => {
    onChoice?.(choice)
    useTekiStore.getState().clearChoices()
  }

  const showBubble = isBubbleOpen && (currentMessage || displayedText)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto"
            style={{ maxWidth: 280 }}
          >
            {/* Message bubble */}
            <div className="teki-bubble mb-1">
              <p className="text-base leading-relaxed" style={{ color: 'var(--bubble-text)' }}>
                {displayedText || currentMessage}
                {isTyping && (
                  <span className="inline-block w-0.5 h-3.5 ml-0.5 animate-pulse align-middle" style={{ background: 'var(--bubble-text)' }} />
                )}
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
                      className="bg-white border border-teki-200 text-teki-700 rounded-xl px-3 py-1.5 text-sm font-medium
                                 hover:bg-teki-50 hover:border-teki-400 active:bg-teki-100 transition-colors shadow-sm"
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

      {/* TEKI body — clicking toggles the bubble */}
      <motion.button
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => (isBubbleOpen ? closeBubble() : openBubble())}
        className="pointer-events-auto relative focus:outline-none"
        aria-label="Toggle TEKI"
      >
        <TekiCharacter size={72} mood={mood} />

        {/* Notification dot */}
        {!isBubbleOpen && currentMessage && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}
