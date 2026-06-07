// ─── Teki Engine ──────────────────────────────────────────────────────────────
// Provides helpers for triggering TEKI dialogue from mission/journey code.
// ──────────────────────────────────────────────────────────────────────────────

import { useTekiStore } from '@/stores/tekiStore'

export function tekiSpeak(messages, options = {}) {
  useTekiStore.getState().speak(messages, options)
}

export function tekiReact(mood) {
  useTekiStore.getState().setMood(mood)
}

export function tekiSetChoices(choices, onChoice) {
  useTekiStore.getState().setChoices(choices, onChoice)
}

export function tekiClear() {
  useTekiStore.getState().clearChoices()
}

// Predefined TEKI scripts for common situations
export const TEKI_SCRIPTS = {
  missionComplete: (missionTitle) => [
    `${missionTitle} — DONE! 🎉`,
    "You're getting better every second!",
  ],

  actComplete: (actTitle) => [
    `ACT COMPLETE! 🏆`,
    `You finished "${actTitle}"!`,
    "Keep building!",
  ],

  codeRevealPrompt: "Want to see what builders write to create this?",

  encouragement: [
    "You've got this! 💪",
    "Keep going — you're doing amazing!",
    "Every builder started exactly where you are now.",
    "One step at a time — you're building something real!",
    "Look how far you've come!",
  ],

  wrongAnswer: [
    "Almost! Try again — you're close!",
    "Not quite. Take another look!",
    "Hmm, not that one. Give it another shot!",
  ],

  correctAnswer: [
    "YES! That's exactly right! 🎯",
    "Perfect! You nailed it!",
    "Brilliant! That's the one!",
  ],
}

export function getEncouragement() {
  const msgs = TEKI_SCRIPTS.encouragement
  return msgs[Math.floor(Math.random() * msgs.length)]
}
