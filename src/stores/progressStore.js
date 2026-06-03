import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const BUILDER_POWERS = {
  'act1-complete': { id: 'builder',    label: 'Builder',           emoji: '🏗️', description: 'You built your first website!' },
  'act2-complete': { id: 'designer',   label: 'Designer',          emoji: '🎨', description: 'You mastered design!' },
  'act3-complete': { id: 'coder',      label: 'HTML Coder',        emoji: '📝', description: 'You speak HTML!' },
  'act4-complete': { id: 'memory',     label: 'Memory Master',     emoji: '🧠', description: 'Variables unlocked!' },
  'act5-complete': { id: 'thinker',    label: 'Logic Thinker',     emoji: '🤔', description: 'Conditionals mastered!' },
  'act6-complete': { id: 'animator',   label: 'Action Creator',    emoji: '⚡', description: 'Events unlocked!' },
  'act7-complete': { id: 'collector',  label: 'Data Collector',    emoji: '📦', description: 'Arrays & loops!' },
  'act8-complete': { id: 'engineer',   label: 'Function Engineer', emoji: '🔧', description: 'Functions mastered!' },
  'act9-complete': { id: 'react',      label: 'React Builder',     emoji: '🧩', description: 'React unlocked!' },
  'act10-complete':{ id: 'connector',  label: 'Data Connector',    emoji: '🌎', description: 'APIs mastered!' },
  'act11-complete':{ id: 'creator',    label: 'Full Creator',      emoji: '🏆', description: 'Adventure complete!' },
}

export const useProgressStore = create(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      completedMissions: [],
      completedActs: [],
      earnedBadges: [],
      builderPowers: [],
      unlockedBuilders: [],

      addXP: (amount) => {
        const newXP = get().xp + amount
        const newLevel = Math.floor(newXP / 500) + 1
        set({ xp: newXP, level: newLevel })
      },

      completeMission: (missionId, xpReward = 100) => {
        const { completedMissions } = get()
        if (completedMissions.includes(missionId)) return
        set((s) => ({
          completedMissions: [...s.completedMissions, missionId],
          xp: s.xp + xpReward,
        }))
      },

      completeAct: (actId) => {
        const { completedActs, builderPowers } = get()
        if (completedActs.includes(actId)) return
        const power = BUILDER_POWERS[`${actId}-complete`]
        set((s) => ({
          completedActs: [...s.completedActs, actId],
          builderPowers: power ? [...s.builderPowers, power] : s.builderPowers,
        }))
      },

      earnBadge: (badge) => {
        set((s) => ({
          earnedBadges: s.earnedBadges.find((b) => b.id === badge.id)
            ? s.earnedBadges
            : [...s.earnedBadges, { ...badge, earnedAt: new Date().toISOString() }],
        }))
      },

      unlockBuilder: (builderId) => {
        set((s) => ({
          unlockedBuilders: s.unlockedBuilders.includes(builderId)
            ? s.unlockedBuilders
            : [...s.unlockedBuilders, builderId],
        }))
      },

      isMissionComplete: (missionId) => get().completedMissions.includes(missionId),
      isActComplete: (actId) => get().completedActs.includes(actId),
      isBuilderUnlocked: (builderId) => get().unlockedBuilders.includes(builderId),

      reset: () => set({
        xp: 0,
        level: 1,
        completedMissions: [],
        completedActs: [],
        earnedBadges: [],
        builderPowers: [],
        unlockedBuilders: [],
      }),
    }),
    { name: 'hbi-progress' }
  )
)
