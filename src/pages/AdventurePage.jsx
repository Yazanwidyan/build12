import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useAdventureStore } from '@/stores/adventureStore'
import { useProfileStore } from '@/stores/profileStore'
import { useProgressStore } from '@/stores/progressStore'
import { useTekiStore } from '@/stores/tekiStore'
import { LEVEL_INFO } from '@/data/curriculum'
import WebsitePreview from '@/components/adventure/WebsitePreview'
import FloatingTeki from '@/components/teki/FloatingTeki'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'

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
        className="rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-6 text-center"
        style={{ backgroundColor: 'var(--app-surface)', border: '2px solid var(--app-border)' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TekiCharacter size={90} mood="proud" />
        </motion.div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#2cbaff' }}>
            Level Complete!
          </p>
          <h2 className="text-2xl font-black text-ink mb-2">
            {levelInfo.emoji} {levelInfo.label}
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            You finished all {levelInfo.totalActs} acts in your level.
            The Website Builder is now unlocked — build anything you imagine!
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button variant="solid" color="blue" fullWidth onClick={onOpenBuilder}>
            🔓 Open Website Builder
          </Button>
          <Button variant="ghost" color="neutral" fullWidth onClick={onGoToDashboard}>
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
      <div className="absolute top-0 left-0 right-0 z-30 backdrop-blur-md border-b-2 px-4 h-9 flex items-center gap-2"
           style={{ backgroundColor: 'rgba(var(--app-surface),0.85)', borderColor: 'var(--app-border)',
                    background: 'color-mix(in srgb, var(--app-surface) 85%, transparent)' }}>
        <Button variant="ghost" color="neutral" size="xs" icon={<ArrowLeft size={12} />} onClick={() => navigate({ to: '/dashboard' })}>
          Dashboard
        </Button>
        <span style={{ color: 'var(--app-border)' }} className="text-xs">|</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--ink-muted)' }}>Website Adventure</span>
        <div className="flex-1" />
        <ThemeToggle />
        <span className="text-xs ml-1" style={{ color: 'var(--ink-faint)' }}>
          {profile.builderName}
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
