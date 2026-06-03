import { motion } from 'framer-motion'
import { Star, Trophy } from 'lucide-react'
import { useMissionEngine } from '@/engines/missionEngine'
import { useProgressStore } from '@/stores/progressStore'
import { ACTS } from '@/data/curriculum'
import MissionRunner from './MissionRunner'

export default function MissionPanel() {
  const { currentMission, currentStep, currentStepIndex, totalSteps, advanceStep, progressPercent } = useMissionEngine()
  const xp = useProgressStore((s) => s.xp)

  if (!currentMission) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No active mission
      </div>
    )
  }

  const act = ACTS.find((a) => a.number === currentMission.act)

  return (
    <div className="flex flex-col h-full">
      {/* Mission header */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-100 shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {/* Act label */}
            {act && (
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 truncate">
                ACT {act.number} — {act.title}
              </p>
            )}
            {/* Mission title */}
            <h2 className="text-base font-bold text-gray-900 leading-tight">
              {currentMission.number}. {currentMission.title}
            </h2>
            <p className="text-xs text-gray-500 truncate">{currentMission.subtitle}</p>
          </div>

          {/* XP */}
          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className="xp-badge">
              ⭐ {xp} XP
            </span>
            {currentMission.badge && (
              <span className="text-xs text-gray-400">{currentMission.badge.emoji} Badge</span>
            )}
          </div>
        </div>

        {/* Step progress bar */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: act?.color ?? '#6366f1' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs text-gray-400 shrink-0">
            {currentStepIndex + 1}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Step content — scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        <MissionRunner
          step={currentStep}
          stepIndex={currentStepIndex}
          onComplete={advanceStep}
        />
      </div>
    </div>
  )
}
