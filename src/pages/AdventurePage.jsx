import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAdventureStore } from '@/stores/adventureStore'
import { useProfileStore, AVATARS } from '@/stores/profileStore'
import { useTekiStore } from '@/stores/tekiStore'
import WebsitePreview from '@/components/adventure/WebsitePreview'
import FloatingTeki from '@/components/teki/FloatingTeki'

export default function AdventurePage() {
  const navigate = useNavigate()
  const adventure = useAdventureStore()
  const profile = useProfileStore()
  const speak = useTekiStore((s) => s.speak)
  const avatar = AVATARS.find((a) => a.id === profile.avatar)

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

      {/* ── Pixel top bar overlay ── */}
      <div
        className="absolute top-0 left-0 right-0 z-30 bg-pixel-dark border-b-3 border-pixel-dark
                   px-4 h-9 flex items-center gap-3"
        style={{ boxShadow: '0 3px 0 #1A0040' }}
      >
        <button
          onClick={() => navigate({ to: '/dashboard' })}
          className="font-pixel text-[7px] text-white/60 hover:text-white transition-colors"
        >
          ← DASHBOARD
        </button>
        <span className="text-white/20 font-pixel text-[8px]">|</span>
        <span className="font-pixel text-[7px] text-white/80">WEBSITE ADVENTURE</span>
        <div className="flex-1" />
        <span className="font-pixel text-[7px] text-white/50">
          {profile.builderName?.toUpperCase()} {avatar?.emoji}
        </span>
      </div>

      {/* ── Full-screen website preview ── */}
      <div className="absolute inset-0 pt-9">
        <WebsitePreview />
      </div>

      {/* ── Floating TEKI ── */}
      <FloatingTeki />
    </div>
  )
}
