import { useTekiStore } from '@/stores/tekiStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

const SECTION_META = {
  header:   { label: 'Header Built!',   emoji: '🏷️', color: '#3b82f6' },
  hero:     { label: 'Hero Built!',     emoji: '⚡',  color: '#8b5cf6' },
  footer:   { label: 'Footer Built!',   emoji: '🎉',  color: '#10b981' },
  about:    { label: 'About Built!',    emoji: '📋',  color: '#f59e0b' },
  features: { label: 'Features Built!', emoji: '⭐',  color: '#ec4899' },
  gallery:  { label: 'Gallery Built!',  emoji: '🖼️',  color: '#f97316' },
  contact:  { label: 'Contact Built!',  emoji: '📬',  color: '#14b8a6' },
}

const CONFETTI_COLORS = [
  '#3b82f6', '#8b5cf6', '#10b981', '#fde047',
  '#f43f5e', '#f97316', '#ec4899', '#22d3ee',
]

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2
      const dist = 55 + (i % 5) * 28   // 55, 83, 111, 139, 167 px
      return {
        id: i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 5 + (i % 5) * 2,
        h: 3 + (i % 3) * 2,
        rot: (i * 53) % 360,
        delay: (i % 8) * 0.025,
      }
    }), [])

  return (
    <div className="absolute" style={{ top: '50%', left: '50%' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{ width: p.w, height: p.h, backgroundColor: p.color, top: 0, left: 0 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{ x: p.tx, y: p.ty, opacity: [1, 1, 0], scale: [0, 1.4, 0.8], rotate: p.rot }}
          transition={{ duration: 1.0, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function BuildCelebration() {
  const buildFlash = useTekiStore((s) => s.buildFlash)
  const meta = SECTION_META[buildFlash] ?? { label: `${buildFlash} Built!`, emoji: '✅', color: '#3b82f6' }

  return (
    <AnimatePresence>
      {buildFlash && (
        <motion.div
          key={buildFlash}
          className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          {/* Radial color burst — expands from center and fades */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${meta.color}55 0%, ${meta.color}25 45%, transparent 70%)`,
            }}
            initial={{ opacity: 1, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />

          {/* Expanding ring 1 */}
          <motion.div
            className="absolute rounded-full"
            style={{
              border: `3px solid ${meta.color}`,
              width: 260, height: 260,
              top: '50%', left: '50%',
              marginTop: -130, marginLeft: -130,
            }}
            initial={{ scale: 0.15, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />

          {/* Expanding ring 2 — slightly delayed */}
          <motion.div
            className="absolute rounded-full"
            style={{
              border: `2px solid ${meta.color}70`,
              width: 340, height: 340,
              top: '50%', left: '50%',
              marginTop: -170, marginLeft: -170,
            }}
            initial={{ scale: 0.12, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          />

          {/* Confetti burst */}
          <Confetti />

          {/* Center badge */}
          <motion.div
            className="relative flex flex-col items-center gap-1.5 px-8 py-5 rounded-2xl"
            style={{
              backgroundColor: 'var(--app-surface)',
              border: `3px solid ${meta.color}`,
              boxShadow: `0 0 0 6px ${meta.color}22, 0 0 40px ${meta.color}55, 0 12px 40px rgba(0,0,0,0.25)`,
            }}
            initial={{ scale: 0, opacity: 0, y: 12 }}
            animate={{ scale: [0, 1.2, 0.93, 1.05, 1], opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Glow halo behind emoji */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 30%, ${meta.color}20 0%, transparent 65%)` }}
            />

            <motion.span
              className="text-5xl leading-none select-none relative"
              animate={{ rotate: [0, -12, 12, -6, 4, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              {meta.emoji}
            </motion.span>

            <p className="text-lg font-black leading-none relative" style={{ color: meta.color }}>
              {meta.label}
            </p>

            <p
              className="text-[11px] font-bold uppercase tracking-widest relative"
              style={{ color: 'var(--ink-faint)' }}
            >
              Section unlocked
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
