import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useAdventureStore } from '@/stores/adventureStore'
import { useProfileStore, AVATARS } from '@/stores/profileStore'
import { useProgressStore } from '@/stores/progressStore'
import { useTekiStore } from '@/stores/tekiStore'
import { LEVEL_INFO } from '@/data/curriculum'
import WebsitePreview from '@/components/adventure/WebsitePreview'
import FloatingTeki from '@/components/teki/FloatingTeki'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'

// ── Level complete overlay ─────────────────────────────────────────────────────
function LevelCompleteScreen({ ageGroup, onGoToDashboard, onOpenBuilder }) {
  const levelInfo = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 bg-black/60 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-sm w-full flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TekiCharacter size={90} mood="proud" />
        </motion.div>

        <div>
          <p className="text-xs font-semibold text-teki-500 uppercase tracking-widest mb-2">
            Level Complete!
          </p>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {levelInfo.emoji} {levelInfo.label}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            You finished all {levelInfo.totalActs} acts in your level.
            The Website Builder is now unlocked — build anything you imagine!
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button variant="action" fullWidth onClick={onOpenBuilder}>
            🔓 Open Website Builder
          </Button>
          <Button variant="ghost" fullWidth onClick={onGoToDashboard}>
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main adventure page ────────────────────────────────────────────────────────
export default function AdventurePage() {
  const navigate    = useNavigate()
  const adventure   = useAdventureStore()
  const profile     = useProfileStore()
  const progress    = useProgressStore()
  const speak       = useTekiStore((s) => s.speak)
  const avatar      = AVATARS.find((a) => a.id === profile.avatar)
  const ageGroup    = profile.ageGroup ?? 'young'

  useEffect(() => {
    if (!adventure.currentAdventure) navigate({ to: '/onboarding' })
  }, [adventure.currentAdventure])

  useEffect(() => {
    const { currentMessage } = useTekiStore.getState()
    if (!currentMessage) {
      speak(
        ["Hey! I'm TEKI — your building companion! 👋", "Let's bring your website to life!"],
        { mood: 'excited' }
      )
    }
  }, [])

  if (!adventure.currentAdventure) return null

  return (
    <div className="h-screen w-screen overflow-hidden relative">

      {/* ── Slim top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-4 h-9 flex items-center gap-2">
        <button
          onClick={() => navigate({ to: '/dashboard' })}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={12} />
          Dashboard
        </button>
        <span className="text-gray-200 text-xs">|</span>
        <span className="text-xs text-gray-500 font-medium">Website Adventure</span>
        <div className="flex-1" />
        <span className="text-xs text-gray-400">
          {profile.builderName} {avatar?.emoji}
        </span>
      </div>

      {/* ── Full-screen website preview ── */}
      <div className="absolute inset-0 pt-9">
        <WebsitePreview />
      </div>

      {/* ── Floating TEKI (mission driver) ── */}
      <FloatingTeki />

      {/* ── Level complete overlay ── */}
      {adventure.levelComplete && (
        <LevelCompleteScreen
          ageGroup={ageGroup}
          onGoToDashboard={() => navigate({ to: '/dashboard' })}
          onOpenBuilder={() => navigate({ to: '/builder' })}
        />
      )}
    </div>
  )
}
