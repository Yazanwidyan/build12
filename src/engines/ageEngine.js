// ─── Age Adaptation Engine ────────────────────────────────────────────────────
// Adapts content depth and code exposure based on the user's age group.
// ageGroup: 'young' | 'junior' | 'senior'
// ──────────────────────────────────────────────────────────────────────────────

import { useProfileStore } from '@/stores/profileStore'

export const AGE_CONFIG = {
  young: {
    codeExposure: 'visual',      // 70% visual, 20% guided, 10% independent
    showCodeReveal: true,         // always show, but read-only
    editorType: 'guided',
    labelPrefix: '',
    conceptNames: {
      components: 'Reusable Pieces',
      state: 'Memory Crystals',
      events: 'Action Signals',
      routing: 'Portal Network',
      apis: 'Data Connections',
    },
  },
  junior: {
    codeExposure: 'guided',      // modify code, complete snippets
    showCodeReveal: true,
    editorType: 'snippet',
    labelPrefix: '',
    conceptNames: {
      components: 'Components',
      state: 'State',
      events: 'Events',
      routing: 'Routing',
      apis: 'APIs',
    },
  },
  senior: {
    codeExposure: 'full',        // full Monaco editor
    showCodeReveal: true,
    editorType: 'monaco',
    labelPrefix: '',
    conceptNames: {
      components: 'React Components',
      state: 'useState Hook',
      events: 'Event Handlers',
      routing: 'Client-Side Routing',
      apis: 'REST APIs / fetch',
    },
  },
}

export function getAgeConfig(ageGroup) {
  return AGE_CONFIG[ageGroup] ?? AGE_CONFIG.young
}

export function getExplanation(step, ageGroup) {
  if (!step.explanations) return null
  return step.explanations[ageGroup] ?? step.explanations.junior ?? null
}

export function getCodeExposure(step, ageGroup) {
  if (!step.ageExposure) return 'read-only'
  return step.ageExposure[ageGroup] ?? 'read-only'
}

export function getConceptName(concept, ageGroup) {
  const config = getAgeConfig(ageGroup)
  return config.conceptNames[concept] ?? concept
}

export function useAgeConfig() {
  const ageGroup = useProfileStore((s) => s.ageGroup) ?? 'young'
  return { ageGroup, config: getAgeConfig(ageGroup) }
}
