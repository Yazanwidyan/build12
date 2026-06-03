import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useProfileStore, AVATARS, AGE_GROUPS } from '@/stores/profileStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { getMissionsForLevel } from '@/data/curriculum'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const PRESET_COLORS = [
  { label: 'Sky',     value: '#2cbaff' },
  { label: 'Gold',    value: '#fde047' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Rose',    value: '#f43f5e' },
  { label: 'Violet',  value: '#8b5cf6' },
  { label: 'Orange',  value: '#f97316' },
  { label: 'Pink',    value: '#ec4899' },
  { label: 'Teal',    value: '#14b8a6' },
]

const TOPIC_OPTIONS = ['Pets', 'Space', 'Music', 'Sports', 'Gaming', 'Art', 'Science', 'Food', 'Travel', 'Fashion']

const BASE_STEPS = 5

const slide = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -30 },
  transition: { duration: 0.2 },
}

// Reusable card wrapper
function Card({ children }) {
  return (
    <div className="card rounded-3xl p-8 flex flex-col gap-5">
      {children}
    </div>
  )
}

// Reusable TEKI bubble row
function TekiBubble({ mood = 'happy', children }) {
  return (
    <div className="flex items-center gap-3">
      <TekiCharacter size={48} mood={mood} />
      <div
        className="rounded-2xl rounded-tl-sm px-4 py-2 text-sm"
        style={{
          backgroundColor: 'var(--bubble-bg)',
          border: '1px solid var(--bubble-border)',
          color: 'var(--bubble-text)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function OnboardingFlow() {
  const navigate  = useNavigate()
  const profile   = useProfileStore()
  const adventure = useAdventureStore()

  const [step, setStep]           = useState(0)
  const [name, setName]           = useState('')
  const [nameError, setNameError] = useState('')

  const [siteName, setSiteName]               = useState('')
  const [siteColor, setSiteColor]             = useState('#2cbaff')
  const [siteTopic, setSiteTopic]             = useState('')
  const [siteTopicCustom, setSiteTopicCustom] = useState('')
  const [siteNameError, setSiteNameError]     = useState('')

  const isSenior    = profile.ageGroup === 'senior'
  const totalSteps  = isSenior ? BASE_STEPS + 1 : BASE_STEPS
  const progressPct = Math.round((step / totalSteps) * 100)

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  const submitName = () => {
    if (name.trim().length < 2) { setNameError('At least 2 characters'); return }
    profile.setBuilderName(name.trim())
    next()
  }

  const selectAdventure = (id) => {
    if (id !== 'website') return
    if (isSenior) { next() }
    else {
      adventure.startAdventure(id, 1)
      profile.completeOnboarding()
      navigate({ to: '/adventure' })
    }
  }

  const launchSenior = () => {
    const finalName  = siteName.trim()
    const finalTopic = siteTopicCustom.trim() || siteTopic
    if (!finalName)  { setSiteNameError('Give your website a name!'); return }
    if (!finalTopic) { setSiteNameError('Pick a topic first');        return }

    adventure.autoGenerateWebsite(finalName, siteColor, finalTopic)
    const seniorMissions = getMissionsForLevel('senior')
    const firstMission   = seniorMissions[0]?.number ?? 21
    adventure.startAdventure('website', firstMission)
    profile.completeOnboarding()
    navigate({ to: '/adventure' })
  }

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress bar */}
        <div className="h-1 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: 'var(--app-raised)' }}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
            style={{ background: 'linear-gradient(90deg, #2cbaff, #fde047)' }}
          />
        </div>

        <AnimatePresence mode="wait">

          {/* Step 0: Intro */}
          {step === 0 && (
            <motion.div key="intro" {...slide}>
              <Card>
                <div className="flex flex-col items-center gap-6 text-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <TekiCharacter size={100} mood="excited" />
                  </motion.div>
                  <div>
                    <p className="text-2xl font-black text-ink">Hey future builder! 👋</p>
                    <p className="text-muted leading-relaxed text-sm mt-2">
                      Every website, game, and app starts as an idea.
                      Today we're going to build one together.
                    </p>
                  </div>
                  <Button variant="action" size="lg" onClick={next}>Let's go! 🚀</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div key="name" {...slide}>
              <Card>
                <TekiBubble mood="happy">What should I call you?</TekiBubble>
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
              </Card>
            </motion.div>
          )}

          {/* Step 2: Avatar */}
          {step === 2 && (
            <motion.div key="avatar" {...slide}>
              <Card>
                <TekiBubble mood="excited">Nice to meet you, {profile.builderName}! Choose your builder style.</TekiBubble>
                <div className="grid grid-cols-2 gap-3">
                  {AVATARS.map((av) => (
                    <motion.button
                      key={av.id}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => profile.setAvatar(av.id)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
                      style={{
                        borderColor: profile.avatar === av.id ? '#2cbaff' : 'var(--app-border)',
                        backgroundColor: profile.avatar === av.id ? 'rgba(44,186,255,0.08)' : 'var(--app-raised)',
                      }}
                    >
                      <span className="text-3xl">{av.emoji}</span>
                      <span className="text-sm font-semibold text-ink">{av.label}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" onClick={back}>Back</Button>
                  <Button variant="action" fullWidth onClick={next} disabled={!profile.avatar}>That's me!</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Age group */}
          {step === 3 && (
            <motion.div key="age" {...slide}>
              <Card>
                <TekiBubble mood="thinking">I'll teach you the right way for your level!</TekiBubble>
                <div className="flex flex-col gap-2">
                  {AGE_GROUPS.map((g) => (
                    <motion.button
                      key={g.id}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => profile.setAgeGroup(g.id)}
                      className="flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all"
                      style={{
                        borderColor: profile.ageGroup === g.id ? '#2cbaff' : 'var(--app-border)',
                        backgroundColor: profile.ageGroup === g.id ? 'rgba(44,186,255,0.08)' : 'var(--app-raised)',
                      }}
                    >
                      <div>
                        <p className="font-bold text-ink text-sm">{g.label}</p>
                        <p className="text-xs text-muted">{g.range}</p>
                      </div>
                      {profile.ageGroup === g.id && (
                        <span style={{ color: '#2cbaff' }} className="font-bold">✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" onClick={back}>Back</Button>
                  <Button variant="action" fullWidth onClick={next} disabled={!profile.ageGroup}>Let's build!</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Choose adventure */}
          {step === 4 && (
            <motion.div key="adventure" {...slide}>
              <Card>
                <TekiBubble mood="excited">
                  {isSenior
                    ? "Since you're 15+, I've got a special path — straight to React!"
                    : "Choose your first adventure!"}
                </TekiBubble>

                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => selectAdventure('website')}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all"
                    style={{ borderColor: '#2cbaff', backgroundColor: 'rgba(44,186,255,0.08)' }}
                  >
                    <span className="text-3xl">🌐</span>
                    <div className="flex-1">
                      <p className="font-bold text-ink">Website Adventure</p>
                      <p className="text-xs text-muted mt-0.5">
                        {isSenior
                          ? 'Auto-generate your site, then dive into React'
                          : 'Build a real website from blueprint to live site'}
                      </p>
                    </div>
                    <span style={{ color: '#2cbaff' }} className="font-bold text-lg">→</span>
                  </motion.button>

                  {[
                    { emoji: '🎮', label: 'Game Adventure',   desc: 'Build a game' },
                    { emoji: '📱', label: 'Mobile Adventure', desc: 'Build a mobile app' },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="flex items-center gap-4 p-4 rounded-2xl border-2 opacity-50 cursor-not-allowed"
                      style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-raised)' }}
                    >
                      <span className="text-3xl">{a.emoji}</span>
                      <div>
                        <p className="font-bold text-muted">{a.label}</p>
                        <p className="text-xs text-faint">{a.desc} — coming soon!</p>
                      </div>
                      <span className="ml-auto text-xs text-faint rounded-full px-2 py-0.5"
                            style={{ backgroundColor: 'var(--app-border)' }}>Soon</span>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" size="sm" onClick={back} className="self-start">← Back</Button>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Senior website setup */}
          {step === 5 && isSenior && (
            <motion.div key="senior-setup" {...slide}>
              <Card>
                <TekiBubble mood="excited">
                  Let's set up your site. I'll generate it instantly — then we learn React on it!
                </TekiBubble>

                <Input
                  label="Website Name"
                  value={siteName}
                  onChange={(e) => { setSiteName(e.target.value); setSiteNameError('') }}
                  placeholder="e.g. Space Paws, My Portfolio..."
                  error={siteNameError}
                  autoFocus
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Main Color</label>
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
                    className="h-8 w-full rounded-xl cursor-pointer p-0.5"
                    style={{ border: '1.5px solid var(--app-border)', backgroundColor: 'var(--app-raised)' }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Topic</label>
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_OPTIONS.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setSiteTopic(t); setSiteTopicCustom('') }}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all"
                        style={{
                          borderColor: siteTopic === t && !siteTopicCustom ? '#2cbaff' : 'var(--app-border)',
                          backgroundColor: siteTopic === t && !siteTopicCustom ? 'rgba(44,186,255,0.1)' : 'var(--app-raised)',
                          color: siteTopic === t && !siteTopicCustom ? '#2cbaff' : 'var(--ink-muted)',
                        }}
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
              </Card>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
