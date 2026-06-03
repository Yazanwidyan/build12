import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useProfileStore, AVATARS, AGE_GROUPS } from '@/stores/profileStore'
import { useAdventureStore } from '@/stores/adventureStore'
import { getMissionsForLevel } from '@/data/curriculum'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Input from '@/components/ui/Input'
import { CharacterPixel, CharacterSpark } from '@/components/ui/BuilderCharacters'

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

const TOPIC_OPTIONS = ['Pets','Space','Music','Sports','Gaming','Art','Science','Food','Travel','Fashion']

const TOTAL_STEPS  = 5   // non-senior
const SENIOR_STEPS = 6

// ── Shared layout wrapper ──────────────────────────────────────────────────────
// Top bar (progress + skip), centered TEKI, wide speech bubble, content, big button
function OnboardingShell({ step, totalSteps, onSkip, tekiMood = 'happy', bubble, children, action, onAction, actionDisabled }) {
  const pct = Math.round((step / totalSteps) * 100)

  return (
    <div className="min-h-screen bg-app flex flex-col">

      {/* ── Progress bar + Skip ── */}
      <div className="flex items-center gap-4 px-6 pt-5">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--app-raised)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: 'linear-gradient(90deg, #2cbaff, #4ade80)' }}
          />
        </div>
        {onSkip && (
          <button
            onClick={onSkip}
            className="text-sm font-semibold shrink-0 transition-colors"
            style={{ color: 'var(--ink-faint)' }}
          >
            Skip
          </button>
        )}
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg flex flex-col items-center gap-6">

          {/* TEKI character */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TekiCharacter size={130} mood={tekiMood} />
          </motion.div>

          {/* Speech bubble with upward tail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full"
            >
              {/* Upward-pointing tail */}
              <div
                className="absolute left-1/2 -top-3 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft:   '10px solid transparent',
                  borderRight:  '10px solid transparent',
                  borderBottom: '12px solid var(--app-border)',
                }}
              />
              <div
                className="absolute left-1/2 -top-[10px] -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft:   '9px solid transparent',
                  borderRight:  '9px solid transparent',
                  borderBottom: '11px solid var(--bubble-bg)',
                }}
              />

              {/* Bubble body */}
              <div
                className="w-full rounded-2xl px-6 py-4 text-sm leading-relaxed font-mono"
                style={{
                  backgroundColor: 'var(--bubble-bg)',
                  border: '1px solid var(--app-border)',
                  color: 'var(--bubble-text)',
                }}
              >
                {bubble}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step-specific content */}
          {children && (
            <div className="w-full">
              {children}
            </div>
          )}

          {/* Action button */}
          {action && (
            <motion.button
              whileHover={!actionDisabled ? { scale: 1.02 } : {}}
              whileTap={!actionDisabled ? { scale: 0.97 } : {}}
              onClick={onAction}
              disabled={actionDisabled}
              className="w-full py-3.5 rounded-xl text-base font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: '#2cbaff',
                boxShadow: actionDisabled ? 'none' : '0 4px 20px rgba(44,186,255,0.4)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {action}
            </motion.button>
          )}

        </div>
      </div>
    </div>
  )
}

// ── Main flow ──────────────────────────────────────────────────────────────────
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

  const isSenior   = profile.ageGroup === 'senior'
  const totalSteps = isSenior ? SENIOR_STEPS : TOTAL_STEPS

  const next = () => setStep((s) => s + 1)

  const skip = () => {
    // Skip only makes sense after choosing age group
    if (step >= 3 && profile.ageGroup) {
      adventure.startAdventure('website', 1)
      profile.completeOnboarding()
      navigate({ to: '/adventure' })
    }
  }

  const submitName = () => {
    if (name.trim().length < 2) { setNameError('At least 2 characters'); return }
    profile.setBuilderName(name.trim())
    next()
  }

  const selectAdventure = () => {
    if (isSenior) { next() }
    else {
      adventure.startAdventure('website', 1)
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
    const firstMission = getMissionsForLevel('senior')[0]?.number ?? 21
    adventure.startAdventure('website', firstMission)
    profile.completeOnboarding()
    navigate({ to: '/adventure' })
  }

  // ── Step 0: Hello ──────────────────────────────────────────────────────────
  if (step === 0) return (
    <OnboardingShell
      step={0} totalSteps={totalSteps}
      tekiMood="excited"
      bubble="Hey there! I'm TEKI — your personal coding companion!"
      action="Continue"
      onAction={next}
    />
  )

  // ── Step 1: Builder name ───────────────────────────────────────────────────
  if (step === 1) return (
    <OnboardingShell
      step={1} totalSteps={totalSteps}
      tekiMood="happy"
      bubble="What should I call you, builder?"
      action="Continue"
      onAction={submitName}
      actionDisabled={name.trim().length < 2}
    >
      <Input
        value={name}
        onChange={(e) => { setName(e.target.value); setNameError('') }}
        placeholder="Your builder name..."
        error={nameError}
        onKeyDown={(e) => e.key === 'Enter' && submitName()}
        autoFocus
      />
    </OnboardingShell>
  )

  // ── Step 2: Avatar ─────────────────────────────────────────────────────────
  if (step === 2) return (
    <OnboardingShell
      step={2} totalSteps={totalSteps}
      tekiMood="excited"
      bubble={`Nice to meet you, ${profile.builderName}! Choose your builder style.`}
      action="Continue"
      onAction={next}
      actionDisabled={!profile.avatar}
    >
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'pixel', label: 'Pixel', desc: 'The techy builder',    Char: CharacterPixel },
          { id: 'spark', label: 'Spark', desc: 'The creative builder',  Char: CharacterSpark },
        ].map(({ id, label, desc, Char }) => {
          const selected = profile.avatar === id
          return (
            <motion.button
              key={id}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => profile.setAvatar(id)}
              className="flex flex-col items-center gap-3 py-5 px-4 rounded-2xl border-2 transition-all"
              style={{
                borderColor: selected ? '#2cbaff' : 'var(--app-border)',
                backgroundColor: selected ? 'rgba(44,186,255,0.06)' : 'var(--app-raised)',
                boxShadow: selected ? '0 0 0 4px rgba(44,186,255,0.12)' : 'none',
              }}
            >
              <Char size={88} selected={selected} />
              <div className="text-center">
                <p className="font-bold text-ink text-sm">{label}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
              {selected && (
                <span className="text-xs font-bold" style={{ color: '#2cbaff' }}>Selected ✓</span>
              )}
            </motion.button>
          )
        })}
      </div>
    </OnboardingShell>
  )

  // ── Step 3: Age group ──────────────────────────────────────────────────────
  if (step === 3) return (
    <OnboardingShell
      step={3} totalSteps={totalSteps}
      tekiMood="thinking"
      bubble="I'll teach you the right way for your level. How old are you?"
      action="Continue"
      onAction={next}
      actionDisabled={!profile.ageGroup}
    >
      <div className="flex flex-col gap-2">
        {AGE_GROUPS.map((g) => (
          <motion.button
            key={g.id}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
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
            {profile.ageGroup === g.id && <span style={{ color: '#2cbaff' }} className="font-black text-lg">✓</span>}
          </motion.button>
        ))}
      </div>
    </OnboardingShell>
  )

  // ── Step 4: Choose adventure ────────────────────────────────────────────────
  if (step === 4) return (
    <OnboardingShell
      step={4} totalSteps={totalSteps}
      onSkip={skip}
      tekiMood="excited"
      bubble={isSenior
        ? "Since you're 15+, I've prepared a special React path just for you!"
        : "Amazing! Let's start your first adventure. Pick one!"}
      action={isSenior ? "Set Up My Website →" : "Start Website Adventure"}
      onAction={selectAdventure}
    >
      <div className="flex flex-col gap-2">
        {/* Website adventure (active) */}
        <div
          className="flex items-center gap-4 p-4 rounded-2xl border-2"
          style={{ borderColor: '#2cbaff', backgroundColor: 'rgba(44,186,255,0.08)' }}
        >
          <span className="text-3xl">🌐</span>
          <div>
            <p className="font-bold text-ink text-sm">Website Adventure</p>
            <p className="text-xs text-muted mt-0.5">
              {isSenior ? 'Auto-generate your site, then dive into React' : 'Build a real website from blueprint to live site'}
            </p>
          </div>
          <span className="ml-auto font-bold" style={{ color: '#2cbaff' }}>✓</span>
        </div>
        {/* Coming soon */}
        {[{ emoji: '🎮', label: 'Game Adventure' }, { emoji: '📱', label: 'Mobile Adventure' }].map((a) => (
          <div key={a.label}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 opacity-50 cursor-not-allowed"
            style={{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-raised)' }}
          >
            <span className="text-3xl">{a.emoji}</span>
            <div>
              <p className="font-semibold text-muted text-sm">{a.label}</p>
              <p className="text-xs text-faint">Coming soon</p>
            </div>
          </div>
        ))}
      </div>
    </OnboardingShell>
  )

  // ── Step 5 (SENIOR): Website setup ─────────────────────────────────────────
  if (step === 5 && isSenior) return (
    <OnboardingShell
      step={5} totalSteps={totalSteps}
      tekiMood="excited"
      bubble="Let's set up your website. I'll generate it instantly — then we learn React on it!"
      action="Generate My Website ✨"
      onAction={launchSenior}
      actionDisabled={!siteName.trim() || (!siteTopic && !siteTopicCustom.trim())}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Website Name"
          value={siteName}
          onChange={(e) => { setSiteName(e.target.value); setSiteNameError('') }}
          placeholder="e.g. Space Paws, My Portfolio..."
          error={siteNameError}
          autoFocus
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink">Main Color</label>
          <div className="grid grid-cols-8 gap-2">
            {PRESET_COLORS.map((c) => (
              <motion.button
                key={c.value}
                whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
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
            type="color" value={siteColor}
            onChange={(e) => setSiteColor(e.target.value)}
            className="h-8 w-full rounded-xl cursor-pointer p-0.5"
            style={{ border: '1.5px solid var(--app-border)', backgroundColor: 'var(--app-raised)' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink">Topic</label>
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
      </div>
    </OnboardingShell>
  )

  return null
}
