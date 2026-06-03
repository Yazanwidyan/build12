import { useEffect, useRef } from 'react'
import { useTekiStore } from '@/stores/tekiStore'

const TYPING_SPEED = 28 // ms per character

// Shared typing animation — must be mounted exactly once while TEKI is active.
// Run this in whichever component renders TEKI (Teki.jsx or FloatingTeki.jsx).
export function useTekiTyping() {
  const { currentMessage, isTyping, setDisplayedText, messageTyped } = useTekiStore()
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!currentMessage || !isTyping) return

    setDisplayedText('')
    clearInterval(intervalRef.current)

    let index = 0
    intervalRef.current = setInterval(() => {
      index += 1
      setDisplayedText(currentMessage.slice(0, index))

      if (index >= currentMessage.length) {
        clearInterval(intervalRef.current)
        setTimeout(() => messageTyped(), 300)
      }
    }, TYPING_SPEED)

    return () => clearInterval(intervalRef.current)
  }, [currentMessage, isTyping])
}
