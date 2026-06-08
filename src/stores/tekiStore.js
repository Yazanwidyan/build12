import { create } from 'zustand'

let _logId = 0
const nextId = () => ++_logId

export const useTekiStore = create((set, get) => ({
  // ── Message queue ──────────────────────────────────────────────────────────
  queue: [],
  currentMessage: '',
  isTyping: false,
  choices: [],
  onChoice: null,
  mood: 'happy', // happy | excited | thinking | surprised | proud
  isVisible: true,
  isBubbleOpen: true,

  speak: (messages, { choices = [], onChoice = null, mood = 'happy' } = {}) => {
    const q = Array.isArray(messages) ? messages : [messages]
    // Auto-log every message spoken
    const newEntries = q.map((text) => ({ id: nextId(), type: 'message', text }))
    set((s) => ({
      queue: q,
      currentMessage: q[0],
      isTyping: true,
      choices: q.length === 1 ? choices : [],
      onChoice: q.length === 1 ? onChoice : null,
      mood,
      log: [...s.log, ...newEntries],
    }))
  },

  messageTyped: () => {
    const { queue, currentMessage, choices, onChoice } = get()
    const idx = queue.indexOf(currentMessage)
    const isLast = idx === queue.length - 1

    if (isLast) {
      set({ isTyping: false })
    } else {
      setTimeout(() => {
        const next = queue[idx + 1]
        const isNextLast = idx + 1 === queue.length - 1
        set({
          currentMessage: next,
          isTyping: true,
          choices: isNextLast ? choices : [],
          onChoice: isNextLast ? onChoice : null,
        })
      }, 400)
    }
  },

  setChoices: (choices, onChoice) => set({ choices, onChoice }),
  clearChoices: () => set({ choices: [], onChoice: null }),

  // ── Section highlight / AI-generation state ────────────────────────────────
  highlightSection: null,
  generatingSection: null,
  setHighlight: (section) => set({ highlightSection: section }),
  clearHighlight: () => set({ highlightSection: null }),
  setGenerating: (section) => set({ generatingSection: section, highlightSection: section }),
  clearGenerating: () => set({ generatingSection: null, highlightSection: null }),

  // ── Challenge flash (correct / wrong border glow on left panel) ───────────────
  challengeFlash: null,
  flashChallenge: (result) => {
    set({ challengeFlash: result })
    setTimeout(() => set({ challengeFlash: null }), 1800)
  },

  setMood: (mood) => set({ mood }),
  setVisible: (isVisible) => set({ isVisible }),
  openBubble: () => set({ isBubbleOpen: true }),
  closeBubble: () => set({ isBubbleOpen: false }),

  // ── Journey Log ────────────────────────────────────────────────────────────
  log: [],
  logPanelOpen: false,

  logCode: ({ language, code, explanation, label }) =>
    set((s) => ({
      log: [
        ...s.log,
        { id: nextId(), type: 'code', language, code, explanation: explanation || null, label: label || language },
      ],
    })),

  logHint: (text) =>
    set((s) => ({
      log: [...s.log, { id: nextId(), type: 'hint', text }],
    })),

  clearLog: () => set({ log: [] }),

  toggleLogPanel: () => set((s) => ({ logPanelOpen: !s.logPanelOpen })),
  openLogPanel:   () => set({ logPanelOpen: true }),
  closeLogPanel:  () => set({ logPanelOpen: false }),
}))
