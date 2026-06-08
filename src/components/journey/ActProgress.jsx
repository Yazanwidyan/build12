import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useProfileStore } from '@/stores/profileStore'
import { useProgressStore } from '@/stores/progressStore'
import { getActsForLevel } from '@/data/curriculum'
import { useMissionEngine } from '@/engines/missionEngine'

export default function ActProgress() {
  const ageGroup       = useProfileStore((s) => s.ageGroup) ?? 'young'
  const completedActs  = useProgressStore((s) => s.completedActs)
  const { currentMission } = useMissionEngine()
  const acts           = getActsForLevel(ageGroup)

  const currentActNumber = currentMission?.act ?? acts[0]?.number

  return (
    <div
      className="flex items-center gap-0 overflow-x-auto px-3 shrink-0"
      style={{
        height: 40,
        backgroundColor: 'var(--app-surface)',
      }}
    >
      {acts.map((act, i) => {
        const done    = completedActs.includes(act.id)
        const active  = act.number === currentActNumber
        const past    = act.number < currentActNumber

        return (
          <div key={act.id} className="flex items-center shrink-0">
            {/* Step */}
            <div className="flex items-center gap-1.5 px-2">
              {/* Circle */}
              <motion.div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                animate={{
                  backgroundColor: done
                    ? '#22c55e'
                    : active
                    ? act.color || 'var(--accent)'
                    : 'var(--app-raised)',
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  border: done
                    ? '2px solid #22c55e'
                    : active
                    ? `2px solid ${act.color || 'var(--accent)'}`
                    : '2px solid var(--app-border)',
                  color: done || active ? '#fff' : 'var(--ink-faint)',
                }}
              >
                {done ? <Check size={10} strokeWidth={3} /> : act.number}
              </motion.div>

              {/* Label — only show for active */}
              {active && (
                <motion.span
                  className="text-[10px] font-black uppercase tracking-wide whitespace-nowrap"
                  style={{ color: act.color || 'var(--accent)' }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  {act.title}
                </motion.span>
              )}
            </div>

            {/* Connector line */}
            {i < acts.length - 1 && (
              <div
                className="h-px w-4 shrink-0"
                style={{
                  backgroundColor: past || done
                    ? '#22c55e'
                    : 'var(--app-border)',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
