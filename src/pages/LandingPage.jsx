import TekiCharacter from "@/components/teki/TekiCharacter";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const FEATURES = [
  {
    emoji: "🏗️",
    label: "Build Real Things",
    desc: "Not exercises — actual websites, games, and apps.",
  },
  {
    emoji: "🤖",
    label: "Learn with TEKI",
    desc: "Your AI companion guides every step of the journey.",
  },
  {
    emoji: "🎯",
    label: "At Your Own Pace",
    desc: "Adapted for every age group and learning style.",
  },
  {
    emoji: "🔓",
    label: "Unlock As You Go",
    desc: "Earn builder powers as you complete adventures.",
  },
];

const BUILD_TAGS = [
  { label: "Websites", emoji: "🌐" },
  { label: "Games", emoji: "🎮" },
  { label: "AI Builder", emoji: "🤖" },
  { label: "Adventures", emoji: "🚀" },
  { label: "Mobile Apps", emoji: "📱" },
];

// Pre-seeded constellation stars
const STARS = [
  { x: 5, y: 8, s: 2 },
  { x: 14, y: 3, s: 1 },
  { x: 24, y: 11, s: 3 },
  { x: 38, y: 5, s: 1 },
  { x: 50, y: 9, s: 2 },
  { x: 62, y: 4, s: 1 },
  { x: 74, y: 12, s: 2 },
  { x: 85, y: 6, s: 3 },
  { x: 94, y: 10, s: 1 },
  { x: 8, y: 22, s: 1 },
  { x: 20, y: 28, s: 2 },
  { x: 33, y: 20, s: 1 },
  { x: 45, y: 25, s: 3 },
  { x: 58, y: 18, s: 1 },
  { x: 70, y: 26, s: 2 },
  { x: 80, y: 20, s: 1 },
  { x: 92, y: 28, s: 2 },
  { x: 3, y: 40, s: 2 },
  { x: 16, y: 48, s: 1 },
  { x: 28, y: 38, s: 3 },
  { x: 40, y: 44, s: 1 },
  { x: 55, y: 42, s: 2 },
  { x: 66, y: 50, s: 1 },
  { x: 78, y: 38, s: 2 },
  { x: 90, y: 45, s: 1 },
  { x: 7, y: 60, s: 1 },
  { x: 18, y: 65, s: 2 },
  { x: 32, y: 58, s: 1 },
  { x: 48, y: 68, s: 3 },
  { x: 60, y: 62, s: 1 },
  { x: 72, y: 70, s: 2 },
  { x: 84, y: 60, s: 1 },
  { x: 96, y: 65, s: 2 },
  { x: 10, y: 78, s: 2 },
  { x: 25, y: 82, s: 1 },
  { x: 42, y: 76, s: 2 },
  { x: 56, y: 84, s: 1 },
  { x: 68, y: 78, s: 3 },
  { x: 82, y: 82, s: 1 },
  { x: 93, y: 75, s: 2 },
];

// Constellation line pairs (index into STARS)
const LINES = [
  [0, 1],
  [1, 2],
  [2, 4],
  [4, 6],
  [6, 7],
  [8, 9],
  [9, 11],
  [11, 13],
  [13, 15],
  [16, 17],
  [17, 19],
  [19, 21],
  [21, 23],
  [23, 25],
  [25, 26],
  [26, 28],
  [28, 30],
  [30, 32],
  [32, 34],
  [34, 36],
  [36, 38],
  [38, 39],
];

// ── Dark background ────────────────────────────────────────────────────────────
function HeroDark() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg,#03060e 0%,#050c1a 30%,#080f20 55%,#050918 80%,#03060e 100%)",
        }}
      />

      {/* Atmosphere glow — centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%,rgba(44,186,255,0.08) 0%,rgba(44,186,255,0.03) 45%,transparent 70%)",
        }}
      />

      {/* Top-right planet */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ top: "-12%", right: "-8%", width: 320, height: 320 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%,rgba(80,100,200,0.18),rgba(40,60,160,0.08) 50%,transparent 70%)",
            border: "1px solid rgba(44,186,255,0.08)",
          }}
        />
      </motion.div>

      {/* Constellation — SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.18 }}
      >
        {LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={`${STARS[a].x}%`}
            y1={`${STARS[a].y}%`}
            x2={`${STARS[b].x}%`}
            y2={`${STARS[b].y}%`}
            stroke="rgba(44,186,255,0.6)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Star dots */}
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
          animate={{ opacity: [0.7, 0.2, 0.7], scale: [1, 1.3, 1] }}
          transition={{
            duration: 2 + (i % 5) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(44,186,255,0.2) 40%,rgba(44,186,255,0.2) 60%,transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 5,
        }}
      />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const handleStart = () =>
    navigate({ to: isAuthenticated ? "/dashboard" : "/signup" });

  const txt = "#f1f5f9";
  const sub = "rgba(255,255,255,0.5)";
  const dim = "rgba(255,255,255,0.35)";
  const div = "1px solid rgba(44,186,255,0.15)";

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{ minHeight: "92vh" }}
      >
        <HeroDark />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 py-20">
          {/* Left — text */}
          <div className="flex-1 flex flex-col gap-7 items-start text-left">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-6xl font-black leading-[1.05] tracking-tight"
              style={{ color: txt }}
            >
              Code your
              <br />
              <span style={{ color: "#2cbaff" }}>own adventure.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-base leading-relaxed max-w-md"
              style={{ color: sub }}
            >
              Build real websites, games, and apps — step by step, guided by
              TEKI your AI companion. No experience needed.
            </motion.p>

            {/* Build tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22 }}
              className="flex flex-wrap gap-2"
            >
              {BUILD_TAGS.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {t.emoji} {t.label}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
            >
              <Button
                variant="solid"
                color="blue"
                size="xl"
                iconRight={<ArrowRight size={17} />}
                onClick={handleStart}
              >
                Start Your Adventure
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36 }}
              className="flex items-center gap-8 pt-4"
              style={{ borderTop: div }}
            >
              {[
                { value: "50+", label: "Missions" },
                { value: "3", label: "Adventures" },
                { value: "8–18", label: "Ages" },
                { value: "AI", label: "Builder" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-black" style={{ color: txt }}>
                    {s.value}
                  </span>
                  <span className="text-sm" style={{ color: dim }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — TEKI with orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex items-center justify-center shrink-0"
            style={{ width: 340, height: 340 }}
          >
            {/* Outer orbit ring */}
            <motion.div
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{
                width: 320,
                height: 320,
                border: "1px dashed rgba(44,186,255,0.25)",
                borderRadius: "50%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#2cbaff",
                }}
              />
            </motion.div>

            {/* Inner orbit ring */}
            <motion.div
              className="absolute"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                width: 230,
                height: 230,
                border: "1px dashed rgba(44,186,255,0.15)",
                borderRadius: "50%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: -3,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(44,186,255,0.7)",
                }}
              />
            </motion.div>

            {/* Glow behind TEKI */}
            <div
              className="absolute"
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(44,186,255,0.2) 0%,transparent 70%)",
                filter: "blur(14px)",
              }}
            />

            {/* TEKI */}
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <TekiCharacter size={160} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="card p-5 flex flex-col gap-3 text-left"
            >
              <span className="text-4xl">{f.emoji}</span>
              <div>
                <h3 className="font-bold text-ink text-base">{f.label}</h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-6 text-center text-sm border-t-2"
        style={{ borderColor: "var(--app-border)", color: "var(--ink-faint)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          © {new Date().getFullYear()} HelloBuildIt by HelloWorldKids
        </div>
      </footer>
    </div>
  );
}
