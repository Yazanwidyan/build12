import { create } from 'zustand'

export const useQuizStore = create((set) => ({
  isOpen:      false,
  actId:       null,
  actTitle:    null,
  actEmoji:    null,
  questions:   [],
  onComplete:  null,

  openQuiz: (actId, actTitle, actEmoji, questions, onComplete) =>
    set({ isOpen: true, actId, actTitle, actEmoji, questions, onComplete }),

  closeQuiz: () =>
    set({ isOpen: false, actId: null, actTitle: null, actEmoji: null, questions: [], onComplete: null }),
}))
