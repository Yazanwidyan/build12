// ─── Mission Engine ───────────────────────────────────────────────────────────
// Drives users through mission steps and connects to progress/adventure stores.
// ──────────────────────────────────────────────────────────────────────────────

import { useAdventureStore } from '@/stores/adventureStore'
import { useProgressStore } from '@/stores/progressStore'
import { getAllMissions, getMissionByNumber, getActById } from '@/data/curriculum'
import { tekiSpeak } from '@/engines/tekiEngine'

export function useMissionEngine() {
  const adventure = useAdventureStore()
  const progress = useProgressStore()

  const currentMission = getMissionByNumber(adventure.currentMissionNumber)
  const currentStep = currentMission?.steps[adventure.currentStepIndex] ?? null
  const totalSteps = currentMission?.steps.length ?? 0
  const isLastStep = adventure.currentStepIndex >= totalSteps - 1

  function advanceStep() {
    if (isLastStep) {
      completeMission()
    } else {
      adventure.advanceStep()
    }
  }

  function goToStep(index) {
    adventure.setStep(index)
  }

  function completeMission() {
    const mission = currentMission
    if (!mission) return

    progress.completeMission(mission.id, mission.xp)

    if (mission.badge) {
      progress.earnBadge(mission.badge)
    }

    // Check act completion
    const allMissions = getAllMissions()
    const actMissions = allMissions.filter((m) => m.act === mission.act)
    const allActComplete = actMissions.every((m) =>
      m.id === mission.id || progress.isMissionComplete(m.id)
    )

    if (allActComplete) {
      const actId = `act${mission.act}`
      progress.completeAct(actId)
      if (actId === 'act11') {
        progress.unlockBuilder('website')
      }
    }

    // Advance to next mission
    const allMissionsList = getAllMissions()
    const nextMission = allMissionsList.find(
      (m) => m.number === mission.number + 1
    )

    if (nextMission) {
      adventure.setMission(nextMission.number)
    }
  }

  function startMission(missionNumber) {
    adventure.setMission(missionNumber)
  }

  return {
    currentMission,
    currentStep,
    currentStepIndex: adventure.currentStepIndex,
    totalSteps,
    isLastStep,
    advanceStep,
    goToStep,
    completeMission,
    startMission,
    progressPercent: totalSteps > 0
      ? Math.round((adventure.currentStepIndex / totalSteps) * 100)
      : 0,
  }
}

export function getNextMissionNumber(currentNumber) {
  const all = getAllMissions()
  const next = all.find((m) => m.number === currentNumber + 1)
  return next?.number ?? null
}
