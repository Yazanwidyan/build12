import { create } from 'zustand'

export const useTekiStore = create((set, get) => ({
  // Message queue
  queue: [],
  currentMessage: '',
  displayedText: '',
  isTyping: false,
  choices: [],
  onChoice: null,
  mood: 'happy', // happy | excited | thinking | surprised | proud
  isVisible: true,
  isBubbleOpen: true,

  speak: (messages, { choices = [], onChoice = null, mood = 'happy' } = {}) => {
    const q = Array.isArray(messages) ? messages : [messages]
    set({
      queue: q,
      currentMessage: q[0],
      displayedText: '',
      isTyping: true,
      choices: q.length === 1 ? choices : [],
      onChoice: q.length === 1 ? onChoice : null,
      mood,
    })
  },

  // Called by the typing animation when one message finishes
  messageTyped: () => {
    const { queue, currentMessage, choices, onChoice } = get()
    const idx = queue.indexOf(currentMessage)
    const isLast = idx === queue.length - 1

    if (isLast) {
      set({ isTyping: false })
    } else {
      // Pause then show next
      setTimeout(() => {
        const next = queue[idx + 1]
        const isNextLast = idx + 1 === queue.length - 1
        set({
          currentMessage: next,
          displayedText: '',
          isTyping: true,
          choices: isNextLast ? choices : [],
          onChoice: isNextLast ? onChoice : null,
        })
      }, 800)
    }
  },

  setDisplayedText: (text) => set({ displayedText: text }),

  setChoices: (choices, onChoice) => set({ choices, onChoice }),

  clearChoices: () => set({ choices: [], onChoice: null }),

  // Section highlight / AI-generation state
  highlightSection: null,   // 'header' | 'hero' | 'footer' | null
  generatingSection: null,  // same — shown with sweep animation
  setHighlight: (section) => set({ highlightSection: section }),
  clearHighlight: () => set({ highlightSection: null }),
  setGenerating: (section) => set({ generatingSection: section, highlightSection: section }),
  clearGenerating: () => set({ generatingSection: null, highlightSection: null }),

  setMood: (mood) => set({ mood }),

  setVisible: (isVisible) => set({ isVisible }),

  openBubble: () => set({ isBubbleOpen: true }),
  closeBubble: () => set({ isBubbleOpen: false }),
}))
