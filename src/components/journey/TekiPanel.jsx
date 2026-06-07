import { motion, AnimatePresence } from 'framer-motion'
import { useTekiStore } from '@/stores/tekiStore'
import { useMissionEngine } from '@/engines/missionEngine'
import { useProgressStore } from '@/stores/progressStore'
import { ACTS } from '@/data/curriculum'
import TekiCharacter from '@/components/teki/TekiCharacter'
import MissionRunner from './MissionRunner'

export default function TekiPanel() {
  const { currentMessage, displayedText, isTyping, mood } = useTekiStore()
  const {
    currentMission,
    currentStep,
    currentStepIndex,
    totalSteps,
    advanceStep,
    progressPercent,
  } = useMissionEngine()
  const xp = useProgressStore((s) => s.xp)

  const act = ACTS.find((a) => a.number === currentMission?.act)
  const shownText = displayedText || currentMessage || ''

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--app-surface)' }}>

      {/* ── Mission strip ──────────────────────────────────────────── */}
      <div className="shrink-0 px-4 py-2 flex items-center gap-3" style={{ borderBottom: '1px solid var(--bubble-border)' }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {act && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md text-white shrink-0"
                style={{ background: act.color }}
              >
                Act {act.number}
              </span>
            )}
            <span className="text-sm font-semibold text-gray-700 truncate">
              {currentMission?.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: act?.color ?? '#6366f1' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] text-gray-400 shrink-0">
              {currentStepIndex + 1}/{totalSteps}
            </span>
          </div>
        </div>

        <span className="xp-badge shrink-0">⭐ {xp} XP</span>
      </div>

      {/* ── TEKI + bubble + interaction ────────────────────────────── */}
      <div className="flex-1 flex items-start gap-3 px-4 py-3 overflow-y-auto min-h-0">

        {/* TEKI character */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="shrink-0 mt-1"
        >
          <TekiCharacter size={60} mood={mood} />
        </motion.div>

        {/* Right column: bubble then interaction */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">

          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {shownText && (
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative rounded-2xl px-4 py-3"
                style={{ backgroundColor: 'var(--bubble-bg)', border: '1px solid var(--bubble-border)', borderRadius: 20, boxShadow: "var(--bubble-shadow)" }}
              >
                <p className="text-base leading-relaxed" style={{ color: 'var(--bubble-text)' }}>
                  {shownText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-3.5 ml-0.5 animate-pulse align-middle" style={{ background: 'var(--bubble-text)' }} />
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step interaction content */}
          <div className="flex-1">
            <MissionRunner
              step={currentStep}
              stepIndex={currentStepIndex}
              onComplete={advanceStep}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
