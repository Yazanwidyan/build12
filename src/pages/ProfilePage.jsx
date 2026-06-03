import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit2, Check, X, Star, Trophy, Zap, Shield } from 'lucide-react'
import { useProfileStore, AVATARS, AGE_GROUPS } from '@/stores/profileStore'
import { useProgressStore } from '@/stores/progressStore'
import { useAuthStore } from '@/stores/authStore'
import { getActsForLevel, LEVEL_INFO, ACTS } from '@/data/curriculum'
import AvatarDisplay from '@/components/ui/AvatarDisplay'
import { CharacterPixel, CharacterSpark } from '@/components/ui/BuilderCharacters'
import Button from '@/components/ui/Button'

// ── Rank helpers ────────────────────────────────────────────────────────────────
const RANKS = [
  { label: 'Bronze',   min: 0,    color: '#cd7f32', next: 500  },
  { label: 'Silver',   min: 500,  color: '#94a3b8', next: 1500 },
  { label: 'Gold',     min: 1500, color: '#fde047', next: 3000 },
  { label: 'Platinum', min: 3000, color: '#7cd8ff', next: 6000 },
  { label: 'Diamond',  min: 6000, color: '#a78bfa', next: null },
]
function getRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].min) return RANKS[i]
  }
  return RANKS[0]
}

// ── Stat tile ───────────────────────────────────────────────────────────────────
function StatTile({ icon, label, value, accent }) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span style={{ color: accent ?? 'var(--accent)' }}>{icon}</span>
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-black text-ink font-mono leading-none">{value}</p>
    </div>
  )
}

// ── Editable name ───────────────────────────────────────────────────────────────
function EditableName({ name, onSave }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal]         = useState(name)

  const save = () => {
    if (val.trim().length >= 2) { onSave(val.trim()); setEditing(false) }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
          className="input-base text-xl font-black w-48"
          autoFocus
        />
        <Button variant="ghost" color="blue" size="xs" onClick={save}><Check size={16} /></Button>
        <Button variant="ghost" color="red"  size="xs" onClick={() => setEditing(false)}><X size={16} /></Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group">
      <h1 className="text-2xl font-black text-ink">{name}</h1>
      <button
        onClick={() => setEditing(true)}
        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--ink-faint)' }}
      >
        <Edit2 size={14} />
      </button>
    </div>
  )
}

// ── Avatar picker ────────────────────────────────────────────────────────────────
function AvatarPicker({ current, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { id: 'pixel', Char: CharacterPixel },
        { id: 'spark', Char: CharacterSpark },
      ].map(({ id, Char }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(id)}
          className="flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all"
          style={{
            borderColor: 'var(--app-border)',
            backgroundColor: current === id ? 'rgba(44,186,255,0.07)' : 'var(--app-raised)',
          }}
        >
          <Char size={72} selected={current === id} />
          <span className="text-xs font-bold text-ink capitalize">{id}</span>
        </motion.button>
      ))}
    </div>
  )
}

// ── Act progress row ─────────────────────────────────────────────────────────────
function ActProgressRow({ act, done }) {
  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: '2px solid var(--app-border)' }}>
      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: done ? act.color : 'var(--app-border)' }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink truncate">{act.title}</p>
        <p className="text-xs text-muted truncate">{act.tagline}</p>
      </div>
      {done ? (
        <span className="text-xs font-bold shrink-0" style={{ color: '#4ade80' }}>✓ Done</span>
      ) : (
        <span className="text-xs font-semibold shrink-0 text-faint">Locked</span>
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate  = useNavigate()
  const profile   = useProfileStore()
  const { logout } = useAuthStore()
  const {
    xp, level,
    completedMissions, completedActs, earnedBadges,
    builderPowers, completedLevels,
  } = useProgressStore()

  const ageGroup  = profile.ageGroup ?? 'young'
  const levelInfo = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young
  const levelActs = getActsForLevel(ageGroup)
  const rank      = getRank(xp)
  const nextRank  = rank.next ? getRank(rank.next) : null
  const rankPct   = rank.next ? Math.min(100, Math.round(((xp - rank.min) / (rank.next - rank.min)) * 100)) : 100

  const ageLabel  = AGE_GROUPS.find((g) => g.id === ageGroup)?.label ?? ageGroup
  const [editingAvatar, setEditingAvatar] = useState(false)

  return (
    <div className="min-h-screen bg-app">

      {/* ── Nav ── */}
      <nav className="border-b-2 sticky top-0 z-30" style={{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <Button variant="ghost" color="neutral" size="sm" icon={<ArrowLeft size={15} />} onClick={() => navigate({ to: '/dashboard' })}>
            Dashboard
          </Button>
          <span className="text-sm font-black text-ink ml-2">Profile</span>
          <div className="flex-1" />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start">

        {/* ── Left column ── */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-5">

          {/* Avatar card */}
          <div className="card p-6 flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div
                className="w-28 h-28 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'var(--accent-bg)', border: '2px solid var(--app-border)' }}
              >
                <AvatarDisplay avatarId={profile.avatar} size={108} />
              </div>
              <button
                onClick={() => setEditingAvatar((v) => !v)}
                className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-colors"
                style={{ background: '#2cbaff', color: 'white' }}
              >
                <Edit2 size={12} />
              </button>
            </div>

            {/* Avatar picker (inline toggle) */}
            {editingAvatar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="w-full"
              >
                <AvatarPicker
                  current={profile.avatar}
                  onSelect={(id) => { profile.setAvatar(id); setEditingAvatar(false) }}
                />
              </motion.div>
            )}

            <EditableName name={profile.builderName || 'Builder'} onSave={profile.setBuilderName} />

            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold" style={{ color: rank.color }}>
                {rank.label} Rank
              </span>
              <span className="text-xs text-muted">{levelInfo.emoji} {ageLabel} · Level {level}</span>
            </div>

            {/* Rank progress */}
            {rank.next && (
              <div className="w-full">
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span style={{ color: rank.color }}>{rank.label}</span>
                  <span>{rankPct}%</span>
                  <span style={{ color: nextRank?.color }}>{nextRank?.label}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--app-raised)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${rankPct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(90deg, ${rank.color}, ${nextRank?.color ?? rank.color})` }}
                  />
                </div>
                <p className="text-[11px] text-muted mt-1 text-center">
                  {rank.next - xp} XP to {nextRank?.label}
                </p>
              </div>
            )}

            <Button variant="solid" color="red" size="sm" fullWidth onClick={() => { logout(); navigate({ to: '/' }) }}>
              Log out
            </Button>
          </div>

          {/* Quick stats */}
          <div className="card p-4 flex flex-col gap-2">
            <p className="section-label mb-1">Quick Stats</p>
            {[
              { label: 'Total XP',         value: xp,                     color: '#fde047' },
              { label: 'Level',            value: level,                  color: '#2cbaff' },
              { label: 'Missions Done',    value: completedMissions.length, color: '#4ade80' },
              { label: 'Acts Complete',    value: completedActs.length,    color: '#f59e0b' },
              { label: 'Badges Earned',    value: earnedBadges.length,     color: '#a78bfa' },
              { label: 'Powers Unlocked',  value: builderPowers.length,    color: '#22d3ee' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: '2px solid var(--app-border)' }}>
                <span className="text-xs text-muted">{s.label}</span>
                <span className="text-sm font-black font-mono" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

        </aside>

        {/* ── Right column ── */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">

          {/* ── Stats row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatTile icon={<Star size={16} />}   label="Total XP"    value={xp}                      accent="#fde047" />
            <StatTile icon={<Trophy size={16} />} label="Rank"        value={rank.label}              accent={rank.color} />
            <StatTile icon={<Zap size={16} />}    label="Missions"    value={completedMissions.length} accent="#4ade80" />
            <StatTile icon={<Shield size={16} />} label="Acts Done"   value={completedActs.length}    accent="#2cbaff" />
          </div>

          {/* ── Builder Powers ── */}
          {builderPowers.length > 0 && (
            <div className="card p-5">
              <p className="section-label mb-4">Builder Powers</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {builderPowers.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--app-raised)', border: '2px solid var(--app-border)' }}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-ink">{p.label}</p>
                      <p className="text-[10px] text-muted">Power unlocked</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Badges ── */}
          {earnedBadges.length > 0 ? (
            <div className="card p-5">
              <p className="section-label mb-4">Badges Earned</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {earnedBadges.map((b) => (
                  <motion.div
                    key={b.id}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl text-center"
                    style={{ background: 'var(--app-raised)', border: '2px solid var(--app-border)' }}
                  >
                    <span className="text-3xl">{b.emoji}</span>
                    <span className="text-[11px] font-semibold text-ink leading-tight">{b.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-8 flex flex-col items-center gap-3 text-center opacity-50">
              <span className="text-4xl">🏅</span>
              <p className="font-bold text-ink text-sm">No badges yet</p>
              <p className="text-xs text-muted">Complete missions to earn your first badge.</p>
            </div>
          )}

          {/* ── Adventure progress ── */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="section-label">Adventure Progress</p>
              <span className="text-xs font-semibold text-muted">
                {completedActs.length} / {levelActs.length} acts
              </span>
            </div>
            <div>
              {levelActs.map((act) => (
                <ActProgressRow
                  key={act.id}
                  act={act}
                  done={completedActs.includes(act.id)}
                />
              ))}
            </div>
            {completedLevels.includes(ageGroup) && (
              <div
                className="mt-4 rounded-xl px-4 py-3 text-sm font-semibold text-center"
                style={{ background: 'rgba(74,222,128,0.12)', border: '2px solid var(--app-border)', color: '#4ade80' }}
              >
                🎓 {levelInfo.label} — Complete!
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
