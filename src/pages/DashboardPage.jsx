import TekiCharacter from "@/components/teki/TekiCharacter";
import AvatarDisplay from "@/components/ui/AvatarDisplay";
import Button from "@/components/ui/Button";
import { LEVEL_INFO, getActsForLevel } from "@/data/curriculum";
import { useAuthStore } from "@/stores/authStore";
import { AVATARS, useProfileStore } from "@/stores/profileStore";
import { useProgressStore } from "@/stores/progressStore";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Lock,
  LogOut,
  Moon,
  Search,
  Star,
  Sun,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { useState, useRef, useEffect } from "react";

// ── Adventures shown in the Learn tab ─────────────────────────────────────────
const ADVENTURES_LIST = [
  {
    id: "website",
    label: "Website Adventure",
    desc: "Build a real website from blueprint to live site.",
    emoji: "🌐",
    color: "#2cbaff",
    gradient: "linear-gradient(135deg, #071e36 0%, #0a3a5c 60%, #0c5a72 100%)",
    route: "/adventure",
    active: true,
  },
  {
    id: "game",
    label: "Game Adventure",
    desc: "Design and code your own game from scratch.",
    emoji: "🎮",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #001a0d 0%, #012e16 60%, #033d1e 100%)",
    soon: true,
  },
  {
    id: "mobile",
    label: "Mobile Adventure",
    desc: "Build and ship a real mobile app.",
    emoji: "📱",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #1a0d00 0%, #2a1800 60%, #3a2400 100%)",
    soon: true,
  },
];

// ── Hero adventure banner ──────────────────────────────────────────────────────
function JumpBackInCard({ ageGroup, xp }) {
  const navigate = useNavigate();
  const completedActs = useProgressStore((s) => s.completedActs);
  const completedMissions = useProgressStore((s) => s.completedMissions);
  const levelInfo = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young;
  const levelActs = getActsForLevel(ageGroup);
  const doneActs = completedActs.filter((id) =>
    levelActs.some((a) => a.id === id),
  ).length;
  const pct =
    levelActs.length > 0 ? Math.round((doneActs / levelActs.length) * 100) : 0;
  const started = completedMissions.length > 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => navigate({ to: "/adventure" })}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 200 }}
    >
      {/* Illustrated background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #071e36 0%, #0a3a5c 40%, #0c5a72 70%, #0d4f3c 100%)",
        }}
      />
      {/* Decorative stars */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            top: `${8 + ((i * 17) % 55)}%`,
            left: `${(i * 23 + 5) % 90}%`,
            opacity: 0.25 + (i % 4) * 0.15,
          }}
        />
      ))}
      {/* Floating shapes */}
      <div
        className="absolute right-12 top-6 w-24 h-24 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #2cbaff, transparent)" }}
      />
      <div
        className="absolute right-36 bottom-4 w-16 h-16 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #fde047, transparent)" }}
      />
      {/* Grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(44,186,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,186,255,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {/* Content overlay */}
      <div className="relative px-6 py-5 flex flex-col gap-3">
        {/* Label */}
        <span
          className="section-label"
          style={{ color: "rgba(44,186,255,0.9)" }}
        >
          ADVENTURE
        </span>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-black text-white leading-tight">
            Website Adventure
          </h3>
          <p
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {started
              ? `${levelInfo.emoji} ${doneActs} / ${levelActs.length} acts complete · ${levelInfo.label}`
              : `${levelInfo.emoji} ${levelInfo.label} — ready to start`}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48">
          <div
            className="flex justify-between text-xs mb-1"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <span>Progress</span>
            <span
              className="font-mono font-bold"
              style={{
                color: pct === 100 ? "#4ade80" : "rgba(255,255,255,0.7)",
              }}
            >
              {pct}%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                background:
                  pct === 100
                    ? "linear-gradient(90deg,#4ade80,#22d3ee)"
                    : "linear-gradient(90deg,#2cbaff,#fde047)",
                boxShadow: "0 0 8px rgba(44,186,255,0.6)",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate({ to: "/adventure" });
            }}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#2cbaff,#06a4f0)",
              boxShadow: "0 4px 16px rgba(44,186,255,0.45)",
            }}
          >
            {started ? "Continue Learning" : "Start Adventure"}
          </button>
          <button
            className="text-sm font-medium transition-opacity hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            View details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Adventure card used in the Learn tab's "Explore" grid ─────────────────────
function AdventureExploreCard({ item }) {
  const navigate = useNavigate();
  const locked = item.soon;

  return (
    <motion.div
      whileHover={!locked ? { y: -3 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      onClick={() => !locked && item.route && navigate({ to: item.route })}
      className="rounded-2xl overflow-hidden border flex flex-col transition-all duration-200"
      style={{
        backgroundColor: "var(--app-surface)",
        borderColor: locked ? "var(--app-border)" : `${item.color}35`,
        cursor: locked ? "default" : "pointer",
        opacity: locked ? 0.6 : 1,
      }}
    >
      {/* Header illustration */}
      <div
        className="relative h-24 flex items-center justify-center overflow-hidden"
        style={{ background: item.gradient }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, ${item.color} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${item.color}35 0%, transparent 65%)`,
          }}
        />
        <motion.span
          animate={!locked ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-4xl z-10 drop-shadow-lg"
        >
          {item.emoji}
        </motion.span>
        {item.soon && (
          <span
            className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(4px)",
            }}
          >
            Soon
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-black text-ink text-sm">{item.label}</h4>
          {!locked && <ChevronRight size={14} style={{ color: item.color }} />}
        </div>
        <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

// ── AI Builder tab view ────────────────────────────────────────────────────────
function AIBuilderView() {
  return (
    <motion.div
      key="ai-builder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col gap-8"
    >
      {/* Hero */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ minHeight: 200 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a0a36 0%, #2d1b5c 50%, #0d2a4a 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(167,139,250,0.2) 0%, transparent 60%)",
          }}
        />
        <div className="relative px-8 py-8 flex items-center gap-6">
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl drop-shadow-lg shrink-0"
          >
            🤖
          </motion.span>
          <div>
            <span
              className="section-label"
              style={{ color: "rgba(167,139,250,0.8)" }}
            >
              COMING SOON
            </span>
            <h2 className="text-2xl font-black text-white mt-1">AI Builder</h2>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              TEKI-powered code generation, smart suggestions, and AI-assisted
              building.
            </p>
          </div>
        </div>
      </div>

      {/* Feature teasers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            emoji: "✨",
            label: "AI Code Generation",
            desc: "Describe what you want — TEKI writes the code.",
            color: "#a78bfa",
          },
          {
            emoji: "🔍",
            label: "Smart Suggestions",
            desc: "Real-time hints and completions as you build.",
            color: "#2cbaff",
          },
          {
            emoji: "💬",
            label: "Ask TEKI Anything",
            desc: "Chat with your AI companion about any concept.",
            color: "#fde047",
          },
        ].map((f) => (
          <div
            key={f.label}
            className="card p-5 flex flex-col gap-3 opacity-70"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: f.color + "18",
                border: `1px solid ${f.color}35`,
              }}
            >
              {f.emoji}
            </div>
            <div>
              <h4 className="font-bold text-ink text-sm">{f.label}</h4>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── My Projects tab view ────────────────────────────────────────────────────────
function MyProjectsView({ completedMissions, earnedBadges, builderPowers }) {
  const hasActivity = completedMissions.length > 0 || earnedBadges.length > 0;

  return (
    <motion.div
      key="my-projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col gap-6"
    >
      <h2 className="text-xl font-black text-ink">My Projects</h2>

      {!hasActivity ? (
        <div className="card p-12 flex flex-col items-center gap-4 text-center">
          <span className="text-5xl opacity-40">📁</span>
          <p className="font-bold text-ink">No projects yet</p>
          <p className="text-sm text-muted max-w-xs">
            Complete adventures and build things — they'll appear here as your
            portfolio grows.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Completed missions as project list */}
          {completedMissions.length > 0 && (
            <div className="card p-5">
              <p className="section-label mb-3">Completed Missions</p>
              <div className="flex flex-wrap gap-2">
                {completedMissions.slice(0, 12).map((id) => (
                  <div
                    key={id}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{
                      background: "var(--accent-bg)",
                      border: "1px solid var(--accent-border)",
                      color: "var(--accent-light)",
                    }}
                  >
                    {id.replace(/-/g, " ")}
                  </div>
                ))}
                {completedMissions.length > 12 && (
                  <div
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-muted"
                    style={{
                      background: "var(--app-raised)",
                      border: "1px solid var(--app-border)",
                    }}
                  >
                    +{completedMissions.length - 12} more
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Badges earned */}
          {earnedBadges.length > 0 && (
            <div className="card p-5">
              <p className="section-label mb-3">Badges Earned</p>
              <div className="flex flex-wrap gap-3">
                {earnedBadges.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col items-center gap-1 rounded-xl p-3"
                    style={{
                      background: "var(--app-raised)",
                      border: "1px solid var(--app-border)",
                      minWidth: 64,
                    }}
                  >
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="text-[10px] font-semibold text-muted text-center leading-tight">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Builder powers */}
          {builderPowers.length > 0 && (
            <div className="card p-5">
              <p className="section-label mb-3">Builder Powers Unlocked</p>
              <div className="flex flex-wrap gap-2">
                {builderPowers.map((p) => (
                  <div
                    key={p.id}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                    style={{
                      background: "var(--accent-bg)",
                      border: "1px solid var(--accent-border)",
                      color: "var(--accent-light)",
                    }}
                  >
                    {p.emoji} {p.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Profile sidebar ────────────────────────────────────────────────────────────
function ProfileSidebar({
  profile,
  xp,
  level,
  levelInfo,
  earnedBadges,
  builderPowers,
  completedMissions,
  onLogout,
}) {
  const navigate = useNavigate();
  const RANK_LABELS = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  const rank =
    RANK_LABELS[Math.min(Math.floor(xp / 500), RANK_LABELS.length - 1)];

  const stats = [
    {
      label: "Total XP",
      value: xp,
      icon: <Star size={14} className="text-yellow-400" />,
    },
    {
      label: "Rank",
      value: rank,
      icon: <Trophy size={14} className="text-amber-500" />,
    },
    {
      label: "Badges",
      value: earnedBadges.length,
      icon: <span className="text-sm">🏅</span>,
    },
    {
      label: "Missions",
      value: completedMissions.length,
      icon: <Zap size={14} className="text-teki-400" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Profile card */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
          >
            <AvatarDisplay avatarId={profile.avatar} size={44} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-ink truncate">
              {profile.builderName || "Builder"}
            </p>
            <p className="text-xs text-muted">
              Level {level} · {levelInfo?.label}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3"
              style={{
                background: "var(--app-raised)",
                border: "1px solid var(--app-border)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {s.icon}
                <span className="text-[11px] text-muted font-medium">
                  {s.label}
                </span>
              </div>
              <p className="font-black text-ink text-lg leading-none font-mono">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate({ to: "/profile" })}
          className="w-full py-2 rounded-xl border text-sm font-semibold transition-all active:scale-95"
          style={{
            borderColor: "var(--app-border)",
            color: "var(--ink-muted)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#2cbaff'; e.currentTarget.style.color = '#2cbaff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--app-border)'; e.currentTarget.style.color = 'var(--ink-muted)' }}
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
                style={{
                  background: "var(--accent-bg)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent-light)",
                }}
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
                style={{
                  background: "var(--app-raised)",
                  border: "1px solid var(--app-border)",
                  minWidth: 56,
                }}
              >
                <span className="text-xl">{b.emoji}</span>
                <span className="text-[10px] font-semibold text-muted leading-tight">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log out */}
      <button
        onClick={onLogout}
        className="text-xs font-medium text-center py-2 rounded-xl transition-colors hover:bg-red-500/10 hover:text-red-400"
        style={{ color: "var(--ink-faint)" }}
      >
        Log out
      </button>
    </div>
  );
}

// ── User menu (avatar dropdown) ────────────────────────────────────────────────
function UserMenu({ profile, navigate, onLogout }) {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useThemeStore();
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const MENU = [
    {
      icon: <User size={14} />,
      label: "View Profile",
      onClick: () => { navigate({ to: "/profile" }); setOpen(false); },
    },
    {
      icon: dark ? <Sun size={14} /> : <Moon size={14} />,
      label: dark ? "Light Mode" : "Dark Mode",
      onClick: () => { toggle(); setOpen(false); },
    },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-2 ml-1 border-l py-1 rounded-lg transition-colors hover:bg-raised"
        style={{ borderColor: "var(--app-border)" }}
      >
        <div
          className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shrink-0"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
        >
          <AvatarDisplay avatarId={profile.avatar} size={28} />
        </div>
        <span className="text-sm font-semibold text-ink hidden sm:block pr-1">
          {profile.builderName}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
            style={{
              backgroundColor: "var(--app-surface)",
              border: "1px solid var(--app-border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid var(--app-border)", backgroundColor: "var(--app-raised)" }}
            >
              <div
                className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
              >
                <AvatarDisplay avatarId={profile.avatar} size={36} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink truncate">{profile.builderName || "Builder"}</p>
                <p className="text-xs text-muted truncate capitalize">{profile.ageGroup ?? "builder"}</p>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1.5">
              {MENU.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left"
                  style={{ color: "var(--ink-muted)" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--app-raised)"; e.currentTarget.style.color = "var(--ink)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Logout */}
            <div style={{ borderTop: "1px solid var(--app-border)" }} className="py-1.5">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors text-left"
                style={{ color: "#f87171" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.08)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TABS = [
  { id: "learn", label: "Learn" },
  { id: "ai-builder", label: "AI Builder" },
  { id: "my-projects", label: "My Projects" },
];

// ── Main page ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const profile = useProfileStore();
  const {
    xp,
    level,
    earnedBadges,
    builderPowers,
    completedMissions,
    isBuilderUnlocked,
  } = useProgressStore();
  const avatar = AVATARS.find((a) => a.id === profile.avatar);
  const ageGroup = profile.ageGroup ?? "young";
  const levelInfo = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young;
  const [activeTab, setActiveTab] = useState("learn");

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const welcomeMessages = [
    `Welcome back, ${profile.builderName || "Builder"}! We missed you! 👋`,
    `Ready to build something amazing today?`,
    `Every great website started exactly where you are. Keep going!`,
  ];
  const welcomeMsg =
    welcomeMessages[Math.floor(Date.now() / 86400000) % welcomeMessages.length];

  return (
    <div className="min-h-screen bg-app">
      {/* ── Top nav ── */}
      <nav className="sticky top-0 z-30 border-b border-app-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-black text-ink text-base tracking-tight">
              {`{ HelloBuildIt }`}
            </span>
          </div>

          {/* Nav tabs */}
          <div className="hidden md:flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150"
                style={
                  activeTab === tab.id
                    ? {
                        backgroundColor: "rgba(44,186,255,0.12)",
                        color: "#2cbaff",
                        border: "1px solid rgba(44,186,255,0.3)",
                      }
                    : {
                        color: "var(--ink-muted)",
                        border: "1px solid transparent",
                      }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* XP pill */}
            <span
              className="px-3 py-1.5 rounded-lg text-xs font-bold hidden sm:block"
              style={{
                background: "linear-gradient(135deg, #fde047, #facc15)",
                color: "#1a1200",
                boxShadow: "0 2px 8px rgba(253,224,71,0.35)",
              }}
            >
              ⭐ {xp} XP
            </span>

            {/* Avatar menu trigger */}
            <UserMenu
              profile={profile}
              navigate={navigate}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </nav>

      {/* ── Page body ── */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8 items-start">
        {/* ── Main column ── */}
        <main className="flex-1 min-w-0 flex flex-col gap-8">
          <AnimatePresence mode="wait">
            {/* ── Learn tab (home) ── */}
            {activeTab === "learn" && (
              <motion.div
                key="learn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-8"
              >
                {/* TEKI welcome */}
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="shrink-0"
                  >
                    <TekiCharacter size={76} mood="excited" />
                  </motion.div>
                  <div
                    className="relative mt-2 rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed max-w-sm"
                    style={{
                      backgroundColor: "var(--bubble-bg)",
                      border: "1px solid var(--bubble-border)",
                      color: "var(--bubble-text)",
                    }}
                  >
                    <span
                      className="absolute -left-2 top-3 w-0 h-0"
                      style={{
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderRight: "8px solid var(--bubble-border)",
                      }}
                    />
                    <span
                      className="absolute -left-1.5 top-3 w-0 h-0"
                      style={{
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderRight: "8px solid var(--bubble-bg)",
                      }}
                    />
                    {welcomeMsg}
                  </div>
                </div>

                {/* Jump back in */}
                <section>
                  <h2 className="text-xl font-black text-ink mb-4">
                    Jump back in
                  </h2>
                  <JumpBackInCard ageGroup={ageGroup} xp={xp} />
                </section>

                {/* Explore adventures */}
                <section>
                  <h2 className="text-xl font-black text-ink mb-4">
                    Explore more
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {ADVENTURES_LIST.map((item) => (
                      <AdventureExploreCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* ── AI Builder tab ── */}
            {activeTab === "ai-builder" && <AIBuilderView />}

            {/* ── My Projects tab ── */}
            {activeTab === "my-projects" && (
              <MyProjectsView
                completedMissions={completedMissions}
                earnedBadges={earnedBadges}
                builderPowers={builderPowers}
              />
            )}
          </AnimatePresence>
        </main>

        {/* ── Right sidebar ── */}
        <aside className="w-72 shrink-0 hidden lg:block">
          <ProfileSidebar
            profile={profile}
            xp={xp}
            level={level}
            levelInfo={levelInfo}
            earnedBadges={earnedBadges}
            builderPowers={builderPowers}
            completedMissions={completedMissions}
            onLogout={handleLogout}
          />
        </aside>
      </div>
    </div>
  );
}
