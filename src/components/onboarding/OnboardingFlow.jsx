import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useProfileStore, AVATARS, AGE_GROUPS } from '@/stores/profileStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { getMissionsForLevel } from '@/data/curriculum'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

// Color presets for senior setup
const PRESET_COLORS = [
  { label: 'Indigo',   value: '#6366f1' },
  { label: 'Sky',      value: '#0ea5e9' },
  { label: 'Emerald',  value: '#10b981' },
  { label: 'Rose',     value: '#f43f5e' },
  { label: 'Amber',    value: '#f59e0b' },
  { label: 'Violet',   value: '#8b5cf6' },
  { label: 'Pink',     value: '#ec4899' },
  { label: 'Teal',     value: '#14b8a6' },
]

const TOPIC_OPTIONS = ['Pets', 'Space', 'Music', 'Sports', 'Gaming', 'Art', 'Science', 'Food', 'Travel', 'Fashion']

// Standard steps: 0 intro, 1 name, 2 avatar, 3 age, 4 adventure
// Senior gets step 5: website setup before launch
const BASE_STEPS = 5

const slide = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -30 },
  transition: { duration: 0.2 },
}

export default function OnboardingFlow() {
  const navigate  = useNavigate()
  const profile   = useProfileStore()
  const adventure = useAdventureStore()

  const [step, setStep]             = useState(0)
  const [name, setName]             = useState('')
  const [nameError, setNameError]   = useState('')

  // Senior website setup state
  const [siteName, setSiteName]     = useState('')
  const [siteColor, setSiteColor]   = useState('#6366f1')
  const [siteTopic, setSiteTopic]   = useState('')
  const [siteTopicCustom, setSiteTopicCustom] = useState('')
  const [siteNameError, setSiteNameError] = useState('')

  const isSenior     = profile.ageGroup === 'senior'
  const totalSteps   = isSenior ? BASE_STEPS + 1 : BASE_STEPS
  const progressPct  = Math.round((step / totalSteps) * 100)

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  const submitName = () => {
    if (name.trim().length < 2) { setNameError('At least 2 characters'); return }
    profile.setBuilderName(name.trim())
    next()
  }

  // Non-senior: click adventure → start immediately at mission 1
  const selectAdventure = (id) => {
    if (id !== 'website') return
    if (isSenior) {
      // Senior goes to website setup step first
      next()
    } else {
      adventure.startAdventure(id, 1)
      profile.completeOnboarding()
      navigate({ to: '/adventure' })
    }
  }

  // Senior: auto-generate website and start at first React mission (21)
  const launchSenior = () => {
    const finalName  = siteName.trim()
    const finalTopic = siteTopicCustom.trim() || siteTopic

    if (!finalName) { setSiteNameError('Give your website a name!'); return }
    if (!finalTopic) { setSiteNameError('Pick a topic first'); return }

    adventure.autoGenerateWebsite(finalName, siteColor, finalTopic)

    const seniorMissions = getMissionsForLevel('senior')
    const firstMission   = seniorMissions[0]?.number ?? 21

    adventure.startAdventure('website', firstMission)
    profile.completeOnboarding()
    navigate({ to: '/adventure' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-teki-500 rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 0: TEKI intro ── */}
          {step === 0 && (
            <motion.div key="intro" {...slide}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-6 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TekiCharacter size={100} mood="excited" />
              </motion.div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold text-gray-900">Hey future builder! 👋</p>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Every website, game, and app starts as an idea.
                  Today we're going to build one together.
                </p>
              </div>
              <Button variant="action" size="lg" onClick={next}>Let's go! 🚀</Button>
            </motion.div>
          )}

          {/* ── Step 1: Name ── */}
          {step === 1 && (
            <motion.div key="name" {...slide}
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

          {/* ── Step 2: Avatar ── */}
          {step === 2 && (
            <motion.div key="avatar" {...slide}
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
                  <motion.button
                    key={av.id}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => profile.setAvatar(av.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors
                      ${profile.avatar === av.id ? 'border-teki-500 bg-teki-50' : 'border-gray-200 hover:border-teki-200'}`}
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

          {/* ── Step 3: Age group ── */}
          {step === 3 && (
            <motion.div key="age" {...slide}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="thinking" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  One more thing — I'll teach you the right way for your level!
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {AGE_GROUPS.map((g) => (
                  <motion.button
                    key={g.id}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => profile.setAgeGroup(g.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-colors
                      ${profile.ageGroup === g.id ? 'border-teki-500 bg-teki-50' : 'border-gray-200 hover:border-teki-200'}`}
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

          {/* ── Step 4: Choose adventure ── */}
          {step === 4 && (
            <motion.div key="adventure" {...slide}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="excited" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  {isSenior
                    ? "Since you're 15+, I've got a special path for you — straight to React!"
                    : "Choose your first adventure!"}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => selectAdventure('website')}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-teki-300 bg-teki-50 text-left hover:border-teki-500 transition-colors"
                >
                  <span className="text-3xl">🌐</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Website Adventure</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {isSenior
                        ? 'Auto-generate your site, then dive into React'
                        : 'Build a real website from blueprint to live site'}
                    </p>
                  </div>
                  <span className="text-teki-600 font-bold text-lg">→</span>
                </motion.button>

                {[
                  { emoji: '🎮', label: 'Game Adventure',   desc: 'Build a game' },
                  { emoji: '📱', label: 'Mobile Adventure', desc: 'Build a mobile app' },
                ].map((a) => (
                  <div key={a.label}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  >
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

          {/* ── Step 5 (SENIOR ONLY): Website setup ── */}
          {step === 5 && isSenior && (
            <motion.div key="senior-setup" {...slide}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <TekiCharacter size={48} mood="excited" />
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-gray-700">
                  Let's set up your site. I'll generate it instantly — then we learn React on it!
                </div>
              </div>

              {/* Site name */}
              <Input
                label="Website Name"
                value={siteName}
                onChange={(e) => { setSiteName(e.target.value); setSiteNameError('') }}
                placeholder="e.g. Space Paws, My Portfolio..."
                error={siteNameError}
                autoFocus
              />

              {/* Color */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Main Color</label>
                <div className="grid grid-cols-8 gap-2">
                  {PRESET_COLORS.map((c) => (
                    <motion.button
                      key={c.value}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSiteColor(c.value)}
                      title={c.label}
                      className="aspect-square rounded-xl"
                      style={{
                        background: c.value,
                        outline: siteColor === c.value ? `3px solid ${c.value}` : 'none',
                        outlineOffset: 2,
                      }}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={siteColor}
                  onChange={(e) => setSiteColor(e.target.value)}
                  className="h-8 w-full rounded-xl border border-gray-200 cursor-pointer p-0.5"
                />
              </div>

              {/* Topic */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Topic</label>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setSiteTopic(t); setSiteTopicCustom('') }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors
                        ${siteTopic === t && !siteTopicCustom
                          ? 'border-teki-500 bg-teki-50 text-teki-700'
                          : 'border-gray-200 text-gray-600 hover:border-teki-200'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <Input
                  placeholder="Or type your own..."
                  value={siteTopicCustom}
                  onChange={(e) => { setSiteTopicCustom(e.target.value); setSiteTopic('') }}
                  onKeyDown={(e) => e.key === 'Enter' && launchSenior()}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={back}>Back</Button>
                <Button
                  variant="action"
                  fullWidth
                  onClick={launchSenior}
                  disabled={!siteName.trim() || (!siteTopic && !siteTopicCustom.trim())}
                >
                  Generate My Website! ✨
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
