import { motion } from 'framer-motion'
import { useMissionEngine } from '@/engines/missionEngine'
import { useProgressStore } from '@/stores/progressStore'
import { ACTS } from '@/data/curriculum'
import MissionRunner from './MissionRunner'

export default function MissionPanel() {
  const { currentMission, currentStep, currentStepIndex, totalSteps, advanceStep, progressPercent } = useMissionEngine()
  const xp = useProgressStore((s) => s.xp)

  if (!currentMission) {
    return (
      <div className="flex items-center justify-center h-full text-base" style={{ color: 'var(--ink-faint)' }}>
        No active mission
      </div>
    )
  }

  const act = ACTS.find((a) => a.number === currentMission.act)

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--app-surface)' }}>
      {/* Mission header */}
      <div className="px-4 pt-3 pb-2 shrink-0" style={{ borderBottom: '2px solid var(--app-border)' }}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {act && (
              <p className="text-sm font-semibold uppercase tracking-wider truncate" style={{ color: 'var(--ink-faint)' }}>
                ACT {act.number} — {act.title}
              </p>
            )}
            <h2 className="text-lg font-bold leading-tight text-ink">
              {currentMission.number}. {currentMission.title}
            </h2>
            <p className="text-sm truncate text-muted">{currentMission.subtitle}</p>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className="xp-badge">⭐ {xp} XP</span>
            {currentMission.badge && (
              <span className="text-sm" style={{ color: 'var(--ink-faint)' }}>{currentMission.badge.emoji} Badge</span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--app-raised)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: act?.color ?? '#2cbaff' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm shrink-0" style={{ color: 'var(--ink-faint)' }}>
            {currentStepIndex + 1}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Step content */}
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
