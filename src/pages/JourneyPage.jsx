import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ScrollText } from 'lucide-react'
import { useJourneyStore } from '@/stores/journeyStore'
import { useProfileStore } from '@/stores/profileStore'
import { useTekiStore } from '@/stores/tekiStore'
import { LEVEL_INFO } from '@/data/curriculum'
import JourneyIntro from '@/components/journey/JourneyIntro'
import JourneyOverlay from '@/components/journey/JourneyOverlay'
import JourneyLog from '@/components/journey/JourneyLog'
import CanvasEditor from '@/components/journey/CanvasEditor'
import WebsitePreview from '@/components/journey/WebsitePreview'
import FloatingTeki from '@/components/teki/FloatingTeki'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { WebsiteLayoutProvider } from '@/contexts/WebsiteLayoutContext'

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
        style={{ backgroundColor: 'var(--app-surface)', border: '1px solid var(--bubble-border)' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TekiCharacter size={90} mood="proud" />
        </motion.div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#3b82f6' }}>
            Level Complete!
          </p>
          <h2 className="text-3xl font-black text-ink mb-2">
            {levelInfo.emoji} {levelInfo.label}
          </h2>
          <p className="text-muted text-base leading-relaxed">
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

const LOG_WIDTH = 300

// ── Main journey page ──────────────────────────────────────────────────────────
export default function JourneyPage() {
  const navigate       = useNavigate()
  const journey        = useJourneyStore()
  const profile        = useProfileStore()
  const speak          = useTekiStore((s) => s.speak)
  const logPanelOpen   = useTekiStore((s) => s.logPanelOpen)
  const toggleLogPanel = useTekiStore((s) => s.toggleLogPanel)
  const logCount       = useTekiStore((s) => s.log.length)
  const ageGroup       = profile.ageGroup ?? 'young'

  const introDone = useJourneyStore((s) => !!(s.website?.name))

  useEffect(() => {
    if (!journey.currentJourney) navigate({ to: '/onboarding' })
  }, [journey.currentJourney])

  useEffect(() => {
    if (!introDone) return
    const { currentMessage } = useTekiStore.getState()
    if (!currentMessage) {
      speak(
        ["Hey! I'm TEKI — your building companion! 👋", "Let's bring your website to life!"],
        { mood: 'excited' }
      )
    }
  }, [introDone])

  if (!journey.currentJourney) return null

  return (
    <WebsiteLayoutProvider>
    <div className="h-screen w-screen overflow-hidden relative">

      {/* ── Slim top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-30 backdrop-blur-md border-b-2 px-4 h-9 flex items-center gap-2"
           style={{ background: 'color-mix(in srgb, var(--app-surface) 85%, transparent)', borderColor: 'var(--app-border)' }}>
        <Button variant="ghost" color="neutral" size="xs" icon={<ArrowLeft size={12} />} onClick={() => navigate({ to: '/dashboard' })}>
          Dashboard
        </Button>
        <span style={{ color: 'var(--app-border)' }} className="text-sm">|</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--ink-muted)' }}>Website Journey</span>
        <div className="flex-1" />

        {/* Log toggle */}
        <button
          onClick={toggleLogPanel}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
          style={{
            background: logPanelOpen ? 'rgba(59,130,246,0.15)' : 'transparent',
            border: `1px solid ${logPanelOpen ? 'rgba(59,130,246,0.4)' : 'var(--app-border)'}`,
            color: logPanelOpen ? '#3b82f6' : 'var(--ink-muted)',
          }}
        >
          <ScrollText size={12} />
          Log
          {logCount > 0 && (
            <span className="rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black"
              style={{ background: logPanelOpen ? '#3b82f6' : 'var(--app-raised)', color: logPanelOpen ? '#fff' : 'var(--ink-muted)' }}>
              {logCount > 99 ? '99' : logCount}
            </span>
          )}
        </button>

        <ThemeToggle />
        <span className="text-sm ml-1" style={{ color: 'var(--ink-faint)' }}>
          {profile.builderName}
        </span>
      </div>

      {/* ── Website preview — shrinks left when log panel is open ── */}
      <div
        className="absolute inset-0 pt-9"
        style={{
          left: logPanelOpen ? LOG_WIDTH : 0,
          transition: 'left 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <WebsitePreview />
      </div>

      {/* ── Log panel — slides in from left ── */}
      <AnimatePresence>
        {logPanelOpen && (
          <motion.div
            key="log-panel"
            className="fixed z-[28]"
            style={{ top: 36, left: 0, bottom: 0, width: LOG_WIDTH }}
            initial={{ x: -LOG_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -LOG_WIDTH }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <JourneyLog />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Section highlight overlay ── */}
      {introDone && <JourneyOverlay />}

      {/* ── Inline canvas editor ── */}
      {introDone && <CanvasEditor />}

      {/* ── Floating TEKI (mission driver) ── */}
      {introDone && <FloatingTeki />}

      {/* ── Journey intro overlay ── */}
      {!introDone && <JourneyIntro onDone={() => {}} />}

      {/* ── Level complete overlay ── */}
      {journey.levelComplete && (
        <LevelCompleteScreen
          ageGroup={ageGroup}
          onGoToDashboard={() => navigate({ to: '/dashboard' })}
          onOpenBuilder={() => navigate({ to: '/builder' })}
        />
      )}
    </div>
    </WebsiteLayoutProvider>
  )
}
