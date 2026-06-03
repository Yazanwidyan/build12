import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { Search, Bell, Lock, ChevronRight, Zap, Trophy, Star, Flame } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore, AVATARS } from '@/stores/profileStore'
import { useProgressStore } from '@/stores/progressStore'
import { getActsForLevel, LEVEL_INFO } from '@/data/curriculum'
import TekiCharacter from '@/components/teki/TekiCharacter'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'

// ── Explore cards data ─────────────────────────────────────────────────────────
const EXPLORE = [
  {
    id: 'game',
    label: 'Game Adventure',
    desc: 'Design and code your own game from scratch.',
    emoji: '🎮',
    color: '#10b981',
    soon: true,
  },
  {
    id: 'mobile',
    label: 'Mobile Adventure',
    desc: 'Build a mobile app and ship it.',
    emoji: '📱',
    color: '#f59e0b',
    soon: true,
  },
  {
    id: 'builder',
    label: 'Website Builder',
    desc: 'Free-build any website using your skills.',
    emoji: '🏗️',
    color: '#8b5cf6',
    route: '/builder',
    requiresLevel: true,
  },
  {
    id: 'challenges',
    label: 'Challenge Packs',
    desc: 'Bite-sized code challenges to sharpen your skills.',
    emoji: '⚡',
    color: '#06b6d4',
    soon: true,
  },
]

// ── Hero adventure banner ──────────────────────────────────────────────────────
function JumpBackInCard({ ageGroup, xp }) {
  const navigate          = useNavigate()
  const completedActs     = useProgressStore((s) => s.completedActs)
  const completedMissions = useProgressStore((s) => s.completedMissions)
  const levelInfo  = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young
  const levelActs  = getActsForLevel(ageGroup)
  const doneActs   = completedActs.filter((id) => levelActs.some((a) => a.id === id)).length
  const pct        = levelActs.length > 0 ? Math.round((doneActs / levelActs.length) * 100) : 0
  const started    = completedMissions.length > 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => navigate({ to: '/adventure' })}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 200 }}
    >
      {/* Illustrated background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f2740 0%, #1a1066 35%, #2d1b69 60%, #0d4f4f 100%)',
        }}
      />
      {/* Decorative stars */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width:  i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            top:    `${8 + (i * 17) % 55}%`,
            left:   `${(i * 23 + 5) % 90}%`,
            opacity: 0.25 + (i % 4) * 0.15,
          }}
        />
      ))}
      {/* Floating shapes */}
      <div className="absolute right-12 top-6 w-24 h-24 rounded-full opacity-10"
           style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
      <div className="absolute right-36 bottom-4 w-16 h-16 rounded-full opacity-10"
           style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
      {/* Grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10"
           style={{
             backgroundImage: 'linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)',
             backgroundSize: '32px 32px',
             maskImage: 'linear-gradient(to top, black, transparent)',
           }} />

      {/* Content overlay */}
      <div className="relative px-6 py-5 flex flex-col gap-3">
        {/* Label */}
        <span className="section-label" style={{ color: 'rgba(167,139,250,0.8)' }}>ADVENTURE</span>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-black text-white leading-tight">Website Adventure</h3>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {started
              ? `${levelInfo.emoji} ${doneActs} / ${levelActs.length} acts complete · ${levelInfo.label}`
              : `${levelInfo.emoji} ${levelInfo.label} — ready to start`}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span>Progress</span>
            <span className="font-mono font-bold" style={{ color: pct === 100 ? '#4ade80' : 'rgba(255,255,255,0.7)' }}>{pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                background: pct === 100
                  ? 'linear-gradient(90deg,#4ade80,#22d3ee)'
                  : 'linear-gradient(90deg,#7c3aed,#a78bfa)',
                boxShadow: '0 0 8px rgba(167,139,250,0.6)',
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={(e) => { e.stopPropagation(); navigate({ to: '/adventure' }) }}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 4px 16px rgba(124,58,237,0.5)' }}
          >
            {started ? 'Continue Learning' : 'Start Adventure'}
          </button>
          <button
            className="text-sm font-medium transition-opacity hover:opacity-100"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            View details
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Explore card ───────────────────────────────────────────────────────────────
function ExploreCard({ item, isBuilderUnlocked }) {
  const navigate = useNavigate()

  const locked = item.soon || (item.requiresLevel && !isBuilderUnlocked)

  return (
    <motion.div
      whileHover={!locked ? { y: -2 } : {}}
      onClick={() => !locked && item.route && navigate({ to: item.route })}
      className="flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200"
      style={{
        backgroundColor: 'var(--app-surface)',
        borderColor: 'var(--app-border)',
        cursor: locked ? 'default' : 'pointer',
        opacity: locked ? 0.55 : 1,
      }}
    >
      <div
        className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: item.color + '20', border: `1px solid ${item.color}40` }}
      >
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-ink">{item.label}</h4>
          {item.soon && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: 'var(--app-raised)', color: 'var(--ink-faint)' }}>
              Soon
            </span>
          )}
          {item.requiresLevel && !isBuilderUnlocked && (
            <Lock size={12} style={{ color: 'var(--ink-faint)' }} />
          )}
        </div>
        <p className="text-xs mt-0.5 text-muted">{item.desc}</p>
        {item.requiresLevel && !isBuilderUnlocked && (
          <p className="text-[11px] mt-1" style={{ color: 'var(--ink-faint)' }}>Complete the adventure to unlock</p>
        )}
      </div>
      {!locked && <ChevronRight size={16} style={{ color: 'var(--ink-faint)' }} className="shrink-0 mt-0.5" />}
    </motion.div>
  )
}

// ── Profile sidebar ────────────────────────────────────────────────────────────
function ProfileSidebar({ profile, avatar, xp, level, levelInfo, earnedBadges, builderPowers, completedMissions, onLogout }) {
  const RANK_LABELS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
  const rank = RANK_LABELS[Math.min(Math.floor(xp / 500), RANK_LABELS.length - 1)]

  const stats = [
    { label: 'Total XP',  value: xp,                    icon: <Star size={14} className="text-yellow-400" />    },
    { label: 'Rank',      value: rank,                   icon: <Trophy size={14} className="text-amber-500" />   },
    { label: 'Badges',    value: earnedBadges.length,    icon: <span className="text-sm">🏅</span>               },
    { label: 'Missions',  value: completedMissions.length, icon: <Zap size={14} className="text-teki-400" />     },
  ]

  return (
    <div className="flex flex-col gap-4">

      {/* Profile card */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
          >
            {avatar?.emoji ?? '🧭'}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-ink truncate">{profile.builderName || 'Builder'}</p>
            <p className="text-xs text-muted">Level {level} · {levelInfo?.label}</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((s) => (
            <div key={s.label}
                 className="rounded-xl p-3"
                 style={{ background: 'var(--app-raised)', border: '1px solid var(--app-border)' }}>
              <div className="flex items-center gap-1.5 mb-1">{s.icon}<span className="text-[11px] text-muted font-medium">{s.label}</span></div>
              <p className="font-black text-ink text-lg leading-none font-mono">{s.value}</p>
            </div>
          ))}
        </div>

        <button
          className="w-full py-2 rounded-xl border text-sm font-semibold transition-all hover:border-teki-400 hover:text-accent active:scale-95"
          style={{ borderColor: 'var(--app-border)', color: 'var(--ink-muted)' }}
        >
          View profile
        </button>
      </div>

      {/* Builder Powers */}
      {builderPowers.length > 0 && (
        <div className="card p-4">
          <p className="section-label mb-3">Builder Powers</p>
          <div className="flex flex-wrap gap-2">
            {builderPowers.map((p) => (
              <div
                key={p.id}
                className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold"
                style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--accent-light)' }}
              >
                <span>{p.emoji}</span> {p.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {earnedBadges.length > 0 && (
        <div className="card p-4">
          <p className="section-label mb-3">Badges</p>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map((b) => (
              <div
                key={b.id}
                className="flex flex-col items-center gap-1 rounded-xl p-2.5 text-center"
                style={{ background: 'var(--app-raised)', border: '1px solid var(--app-border)', minWidth: 56 }}
              >
                <span className="text-xl">{b.emoji}</span>
                <span className="text-[10px] font-semibold text-muted leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log out */}
      <button
        onClick={onLogout}
        className="text-xs font-medium text-center py-2 rounded-xl transition-colors hover:bg-red-500/10 hover:text-red-400"
        style={{ color: 'var(--ink-faint)' }}
      >
        Log out
      </button>

    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const profile  = useProfileStore()
  const { xp, level, earnedBadges, builderPowers, completedMissions, isBuilderUnlocked } = useProgressStore()
  const avatar    = AVATARS.find((a) => a.id === profile.avatar)
  const ageGroup  = profile.ageGroup ?? 'young'
  const levelInfo = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young

  const handleLogout = () => { logout(); navigate({ to: '/' }) }

  const welcomeMessages = [
    `Welcome back, ${profile.builderName || 'Builder'}! We missed you! 👋`,
    `Ready to build something amazing today?`,
    `Every great website started exactly where you are. Keep going!`,
  ]
  const welcomeMsg = welcomeMessages[Math.floor(Date.now() / 86400000) % welcomeMessages.length]

  return (
    <div className="min-h-screen bg-app">

      {/* ── Top nav ── */}
      <nav
        className="sticky top-0 z-30 border-b px-6 h-14 flex items-center gap-6"
        style={{
          backgroundColor: 'var(--app-surface)',
          borderColor: 'var(--app-border)',
          borderTop: '3px solid var(--accent)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base font-black text-white"
            style={{ background: 'linear-gradient(135deg, var(--accent), #4f46e5)' }}
          >
            H
          </div>
          <span className="font-black text-ink text-base tracking-tight">HelloBuildIt</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {['Learn', 'Practice', 'Build'].map((link) => (
            <button
              key={link}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-raised"
              style={{ color: 'var(--ink-muted)' }}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-raised"
            style={{ color: 'var(--ink-faint)' }}
          >
            <Search size={16} />
          </button>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-raised"
            style={{ color: 'var(--ink-faint)' }}
          >
            <Bell size={16} />
          </button>
          <ThemeToggle />
          <div
            className="flex items-center gap-2 pl-2 ml-1 border-l"
            style={{ borderColor: 'var(--app-border)' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
            >
              {avatar?.emoji ?? '🧭'}
            </div>
            <span className="text-sm font-semibold text-ink hidden sm:block">{profile.builderName}</span>
          </div>
          <button
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 hidden sm:block"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 2px 8px rgba(245,158,11,0.4)' }}
          >
            ⭐ {xp} XP
          </button>
        </div>
      </nav>

      {/* ── Page body ── */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8 items-start">

        {/* ── Main column ── */}
        <main className="flex-1 min-w-0 flex flex-col gap-8">

          {/* Welcome row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="shrink-0"
            >
              <TekiCharacter size={76} mood="excited" />
            </motion.div>

            {/* Speech bubble */}
            <div
              className="relative mt-2 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed max-w-sm"
              style={{
                backgroundColor: 'var(--bubble-bg)',
                border: '1px solid var(--bubble-border)',
                color: 'var(--bubble-text)',
              }}
            >
              {/* Tail */}
              <span
                className="absolute -left-2 top-3 w-0 h-0"
                style={{
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderRight: '8px solid var(--bubble-border)',
                }}
              />
              <span
                className="absolute -left-1.5 top-3 w-0 h-0"
                style={{
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderRight: '8px solid var(--bubble-bg)',
                }}
              />
              {welcomeMsg}
            </div>
          </motion.div>

          {/* Jump back in */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="text-xl font-black text-ink mb-4">Jump back in</h2>
            <JumpBackInCard ageGroup={ageGroup} xp={xp} />
          </motion.section>

          {/* Explore more */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            <h2 className="text-xl font-black text-ink mb-4">Explore more</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPLORE.map((item) => (
                <ExploreCard
                  key={item.id}
                  item={item}
                  isBuilderUnlocked={isBuilderUnlocked('website')}
                />
              ))}
            </div>
          </motion.section>

        </main>

        {/* ── Right sidebar ── */}
        <motion.aside
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 }}
          className="w-72 shrink-0 hidden lg:block"
        >
          <ProfileSidebar
            profile={profile}
            avatar={avatar}
            xp={xp}
            level={level}
            levelInfo={levelInfo}
            earnedBadges={earnedBadges}
            builderPowers={builderPowers}
            completedMissions={completedMissions}
            onLogout={handleLogout}
          />
        </motion.aside>

      </div>
    </div>
  )
}
