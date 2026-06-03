import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore, AVATARS } from '@/stores/profileStore'
import { useProgressStore } from '@/stores/progressStore'
import AdventureCard, { ADVENTURES } from '@/components/dashboard/AdventureCard'
import BuilderCard, { BUILDERS } from '@/components/dashboard/BuilderCard'
import Teki from '@/components/teki/Teki'
import Button from '@/components/ui/Button'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const profile = useProfileStore()
  const { xp, level, earnedBadges, builderPowers, completedMissions } = useProgressStore()
  const avatar = AVATARS.find((a) => a.id === profile.avatar)

  const handleLogout = () => { logout(); navigate({ to: '/' }) }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <span className="font-black text-teki-600 text-lg">HelloBuildIt</span>
        <div className="flex items-center gap-3">
          <div className="xp-badge">⭐ {xp} XP · Lv {level}</div>
          <span>{avatar?.emoji ?? '🧭'}</span>
          <span className="text-sm font-medium text-gray-700">{profile.builderName}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile.builderName}! {avatar?.emoji}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {completedMissions.length === 0
              ? 'Ready to start your first adventure?'
              : `${completedMissions.length} missions complete — keep going!`}
          </p>
        </motion.div>

        {/* Builder Powers */}
        {builderPowers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Your Builder Powers</h2>
            <div className="flex flex-wrap gap-2">
              {builderPowers.map((p) => (
                <div key={p.id} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm">
                  <span>{p.emoji}</span>
                  <span className="text-xs font-medium text-gray-700">{p.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Learn */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ADVENTURES.map((a) => <AdventureCard key={a.id} adventure={a} />)}
          </div>
        </motion.section>

        {/* Builder */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Builder</h2>
          <p className="text-xs text-gray-400 mb-3">Complete adventures to unlock builders</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUILDERS.map((b) => <BuilderCard key={b.id} builder={b} />)}
          </div>
        </motion.section>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Badges</h2>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map((b) => (
                <div key={b.id} className="flex flex-col items-center gap-1 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <span className="text-2xl">{b.emoji}</span>
                  <span className="text-xs font-medium text-gray-700">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Teki />
    </div>
  )
}
