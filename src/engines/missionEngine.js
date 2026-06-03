import { useAdventureStore } from '@/stores/adventureStore'
import { useProgressStore } from '@/stores/progressStore'
import { useProfileStore } from '@/stores/profileStore'
import {
  getAllMissions,
  getMissionByNumber,
  getMissionsForLevel,
  isLastActForLevel,
} from '@/data/curriculum'

export function useMissionEngine() {
  const adventure  = useAdventureStore()
  const progress   = useProgressStore()
  const ageGroup   = useProfileStore((s) => s.ageGroup) ?? 'young'

  const currentMission = getMissionByNumber(adventure.currentMissionNumber)
  const currentStep    = currentMission?.steps[adventure.currentStepIndex] ?? null
  const totalSteps     = currentMission?.steps.length ?? 0
  const isLastStep     = adventure.currentStepIndex >= totalSteps - 1

  // All missions the user's level should go through, in order
  const levelMissions    = getMissionsForLevel(ageGroup)
  const totalLevelMissions = levelMissions.length

  // How many level-missions are done (for a global progress indicator)
  const doneLevelMissions  = levelMissions.filter((m) =>
    progress.isMissionComplete(m.id)
  ).length

  // Step-level progress within the current mission
  const stepProgressPercent = totalSteps > 0
    ? Math.round((adventure.currentStepIndex / totalSteps) * 100)
    : 0

  function advanceStep() {
    if (isLastStep) {
      completeMission()
    } else {
      adventure.advanceStep()
    }
  }

  function completeMission() {
    const mission = currentMission
    if (!mission) return

    progress.completeMission(mission.id, mission.xp)
    if (mission.badge) progress.earnBadge(mission.badge)

    // Check if the whole act is now done
    const allActMissions  = getAllMissions().filter((m) => m.act === mission.act)
    const allActComplete  = allActMissions.every(
      (m) => m.id === mission.id || progress.isMissionComplete(m.id)
    )

    if (allActComplete) {
      const actId = `act${mission.act}`
      progress.completeAct(actId)

      // Is this the LAST act for the user's level? → level complete
      if (isLastActForLevel(mission.act, ageGroup)) {
        progress.completeLevel(ageGroup)
        adventure.setLevelComplete()
        return // stop — don't advance to next mission
      }
    }

    // Find the next mission that belongs to this level
    const currentIndexInLevel = levelMissions.findIndex((m) => m.id === mission.id)
    const nextLevelMission    = levelMissions[currentIndexInLevel + 1]

    if (nextLevelMission) {
      adventure.setMission(nextLevelMission.number)
    }
    // If no next level mission and we somehow get here, level is done
  }

  return {
    currentMission,
    currentStep,
    currentStepIndex:  adventure.currentStepIndex,
    totalSteps,
    isLastStep,
    advanceStep,
    completeMission,
    progressPercent:     stepProgressPercent,
    levelMissions,
    totalLevelMissions,
    doneLevelMissions,
    ageGroup,
  }
}
