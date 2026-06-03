import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus } from 'lucide-react'
import { useTekiStore } from '@/stores/tekiStore'
import { useMissionEngine } from '@/engines/missionEngine'
import { useProgressStore } from '@/stores/progressStore'
import { ACTS, LEVEL_INFO, getActsForLevel } from '@/data/curriculum'
import TekiCharacter from './TekiCharacter'
import MissionRunner from '@/components/adventure/MissionRunner'

export default function FloatingTeki() {
  const { currentMessage, displayedText, isTyping, mood } = useTekiStore()
  const { currentMission, currentStep, currentStepIndex, totalSteps, advanceStep, progressPercent, ageGroup } = useMissionEngine()
  const xp = useProgressStore((s) => s.xp)
  const completedActs = useProgressStore((s) => s.completedActs)

  const [minimized, setMinimized] = useState(false)
  const constraintsRef = useRef(null)

  const shownText   = displayedText || currentMessage || ''
  const act         = ACTS.find((a) => a.number === currentMission?.act)
  const levelInfo   = LEVEL_INFO[ageGroup]
  const levelActs   = getActsForLevel(ageGroup)
  const doneActs    = completedActs.filter((id) => levelActs.some((a) => a.id === id)).length
  const levelPct    = levelActs.length > 0 ? Math.round((doneActs / levelActs.length) * 100) : 0

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 select-none"
        style={{ touchAction: 'none', cursor: 'grab' }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        {/* ── Panel ── */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 12 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              style={{ width: 380 }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-3 py-2 border-b border-gray-100"
                style={{ background: levelInfo?.color ?? act?.color ?? '#4f46e5' }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider shrink-0">
                    {levelInfo?.emoji} {levelInfo?.label}
                  </span>
                  <span className="text-[11px] font-semibold text-white truncate">
                    {currentMission?.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-yellow-300 font-semibold">⭐{xp}</span>
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setMinimized(true)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                </div>
              </div>

              {/* Level progress bar */}
              <div className="px-3 pt-2 pb-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: levelInfo?.color ?? '#4f46e5' }}
                      animate={{ width: `${levelPct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {doneActs}/{levelActs.length} acts
                  </span>
                </div>
              </div>

              {/* Speech bubble */}
              <AnimatePresence mode="wait">
                {shownText && (
                  <motion.div
                    key={currentMessage}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mx-3 mt-1 mb-2 bg-gray-50 rounded-xl border border-gray-100 px-4 py-3"
                  >
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {shownText}
                      {isTyping && (
                        <span className="inline-block w-0.5 h-3.5 bg-teki-500 ml-0.5 align-middle animate-pulse" />
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step interaction */}
              <div
                className="px-3 pb-3 overflow-y-auto"
                style={{ maxHeight: '48vh' }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <MissionRunner
                  step={currentStep}
                  stepIndex={currentStepIndex}
                  onComplete={advanceStep}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TEKI character */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="self-end"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setMinimized((m) => !m)}
          style={{ cursor: 'pointer' }}
        >
          <div className="relative">
            <TekiCharacter size={72} mood={mood} />
            {minimized && currentMessage && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white
                           flex items-center justify-center text-white text-[8px] font-bold"
              >
                !
              </motion.span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
