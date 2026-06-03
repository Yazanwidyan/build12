import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useProfileStore, AVATARS, AGE_GROUPS } from '@/stores/profileStore'
import { useAdventureStore } from '@/stores/adventureStore'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const STEP_COUNT = 5

export default function OnboardingFlow() {
  const navigate = useNavigate()
  const profile = useProfileStore()
  const adventure = useAdventureStore()

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  const submitName = () => {
    if (name.trim().length < 2) { setNameError('At least 2 characters'); return }
    profile.setBuilderName(name.trim())
    next()
  }

  const selectAdventure = (id) => {
    if (id !== 'website') return
    adventure.startAdventure(id)
    profile.completeOnboarding()
    navigate({ to: '/adventure' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'bg-teki-500 w-6' : 'bg-gray-200 w-3'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0 — TEKI intro */}
          {step === 0 && (
            <motion.div key="intro"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-6 text-center"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <TekiCharacter size={100} mood="excited" />
              </motion.div>
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-bold text-gray-900">Hey future builder! 👋</p>
                <p className="text-gray-500 leading-relaxed text-sm">Every website, game, and app starts as an idea.</p>
                <p className="text-gray-500 leading-relaxed text-sm">Today we're going to build one together.</p>
              </div>
              <Button variant="action" size="lg" onClick={next}>Let's go! 🚀</Button>
            </motion.div>
          )}

          {/* Step 1 — Name */}
          {step === 1 && (
            <motion.div key="name"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="happy" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  What should I call you?
                </div>
              </div>
              <Input
                label="Your Builder Name"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError('') }}
                placeholder="e.g. Alex, Jordan, Zara..."
                error={nameError}
                onKeyDown={(e) => e.key === 'Enter' && submitName()}
                autoFocus
              />
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={back}>Back</Button>
                <Button variant="action" fullWidth onClick={submitName}>That's me!</Button>
              </div>
            </motion.div>
          )}

          {/* Step 2 — Avatar */}
          {step === 2 && (
            <motion.div key="avatar"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="excited" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  Nice to meet you, {profile.builderName}! Choose your builder style.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {AVATARS.map((av) => (
                  <motion.button key={av.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => profile.setAvatar(av.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors ${
                      profile.avatar === av.id ? 'border-teki-500 bg-teki-50' : 'border-gray-200 hover:border-teki-200'
                    }`}
                  >
                    <span className="text-3xl">{av.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{av.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={back}>Back</Button>
                <Button variant="action" fullWidth onClick={next} disabled={!profile.avatar}>That's me!</Button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Age group */}
          {step === 3 && (
            <motion.div key="age"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="thinking" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  One more thing — how old are you? I'll teach you the right way!
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {AGE_GROUPS.map((g) => (
                  <motion.button key={g.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => profile.setAgeGroup(g.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-colors ${
                      profile.ageGroup === g.id ? 'border-teki-500 bg-teki-50' : 'border-gray-200 hover:border-teki-200'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{g.label}</p>
                      <p className="text-xs text-gray-500">{g.range}</p>
                    </div>
                    {profile.ageGroup === g.id && <span className="text-teki-600 font-bold">✓</span>}
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={back}>Back</Button>
                <Button variant="action" fullWidth onClick={next} disabled={!profile.ageGroup}>Let's build!</Button>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Choose adventure */}
          {step === 4 && (
            <motion.div key="adventure"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="excited" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  Choose your first adventure!
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => selectAdventure('website')}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-teki-300 bg-teki-50 text-left hover:border-teki-500 transition-colors"
                >
                  <span className="text-3xl">🌐</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Website Adventure</p>
                    <p className="text-xs text-gray-500">Build a real website — from blueprint to live site</p>
                  </div>
                  <span className="text-teki-600 font-bold text-lg">→</span>
                </motion.button>

                {[{ emoji: '🎮', label: 'Game Adventure', desc: 'Build a game' },
                  { emoji: '📱', label: 'Mobile App Adventure', desc: 'Build a mobile app' }].map((a) => (
                  <div key={a.label} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed">
                    <span className="text-3xl">{a.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-500">{a.label}</p>
                      <p className="text-xs text-gray-400">{a.desc} — coming soon!</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">Soon</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={back} className="self-start">← Back</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
