import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const BUILDER_POWERS = {
  'act1-complete': { id: 'builder',   label: 'Builder',           emoji: '🏗️' },
  'act2-complete': { id: 'designer',  label: 'Designer',          emoji: '🎨' },
  'act3-complete': { id: 'coder',     label: 'HTML Coder',        emoji: '📝' },
  'act4-complete': { id: 'memory',    label: 'Memory Master',     emoji: '🧠' },
  'act5-complete': { id: 'thinker',   label: 'Logic Thinker',     emoji: '🤔' },
  'act6-complete': { id: 'animator',  label: 'Action Creator',    emoji: '⚡' },
  'act7-complete': { id: 'collector', label: 'Data Collector',    emoji: '📦' },
  'act8-complete': { id: 'engineer',  label: 'Function Engineer', emoji: '🔧' },
  'act9-complete': { id: 'react',     label: 'React Builder',     emoji: '🧩' },
  'act10-complete':{ id: 'connector', label: 'Data Connector',    emoji: '🌎' },
  'act11-complete':{ id: 'creator',   label: 'Full Creator',      emoji: '🏆' },
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
      // Tracks which age-group levels have been fully completed
      completedLevels: [],

      addXP: (amount) => {
        const newXP = get().xp + amount
        set({ xp: newXP, level: Math.floor(newXP / 500) + 1 })
      },

      completeMission: (missionId, xpReward = 100) => {
        if (get().completedMissions.includes(missionId)) return
        set((s) => ({
          completedMissions: [...s.completedMissions, missionId],
          xp: s.xp + xpReward,
        }))
      },

      completeAct: (actId) => {
        if (get().completedActs.includes(actId)) return
        const power = BUILDER_POWERS[`${actId}-complete`]
        set((s) => ({
          completedActs: [...s.completedActs, actId],
          builderPowers: power ? [...s.builderPowers, power] : s.builderPowers,
        }))
      },

      // Called when a user finishes the last act of their level
      completeLevel: (ageGroup) => {
        if (get().completedLevels.includes(ageGroup)) return
        set((s) => ({
          completedLevels: [...s.completedLevels, ageGroup],
          // Unlock the builder when any level is finished
          unlockedBuilders: s.unlockedBuilders.includes('website')
            ? s.unlockedBuilders
            : [...s.unlockedBuilders, 'website'],
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
      isActComplete:     (actId)     => get().completedActs.includes(actId),
      isLevelComplete:   (ageGroup)  => get().completedLevels.includes(ageGroup),
      isBuilderUnlocked: (builderId) => get().unlockedBuilders.includes(builderId),

      reset: () => set({
        xp: 0,
        level: 1,
        completedMissions: [],
        completedActs: [],
        earnedBadges: [],
        builderPowers: [],
        unlockedBuilders: [],
        completedLevels: [],
      }),
    }),
    { name: 'hbi-progress' }
  )
)
