import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star, Trash2, Zap } from "lucide-react";

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

export default function LandingPage() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleStart = () =>
    navigate({ to: isAuthenticated ? "/dashboard" : "/signup" });

  const navLink = (to, label) => {
    const active = location.pathname === to;
    return (
      <button
        key={to}
        onClick={() => navigate({ to })}
        className="relative flex items-center px-3 text-base font-medium transition-colors"
        style={{ color: active ? "#2cbaff" : "var(--ink-muted)" }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--ink)" }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--ink-muted)" }}
      >
        {label}
        {active && <span className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "#2cbaff" }} />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-app flex flex-col">
      {/* ── Nav ── */}
      <nav className="border-b-2 sticky border-app-border bg-app top-0 z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-[54px] flex items-center gap-6">
          <span className="font-black text-2xl text-ink tracking-tighter shrink-0">HelloBuildIt</span>
          <div className="hidden md:flex self-stretch items-stretch gap-1">
            {navLink("/about",   "About")}
            {navLink("/pricing", "Pricing")}
            {navLink("/contact", "Contact")}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Button size="sm" onClick={() => navigate({ to: "/dashboard" })}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  onClick={() => navigate({ to: "/login" })}
                >
                  Log in
                </Button>
                <Button size="sm" onClick={() => navigate({ to: "/signup" })}>
                  Sign up free
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center gap-16">
          {/* Hero block */}
          <div className="flex flex-col items-center gap-8 max-w-lg">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <TekiCharacter size={120} mood="excited" />
            </motion.div>

            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-black text-ink leading-tight">
                Build it.
                <br />
                <span style={{ color: "#2cbaff" }}>Understand it.</span>
                <br />
                Own it.
              </h1>
              <p className="text-xl leading-relaxed text-muted">
                Learn to code by building real websites, games, and apps —
                guided by TEKI, your AI companion.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="solid"
                color="blue"
                size="xl"
                onClick={handleStart}
              >
                Start Building — it's free
              </Button>
            </motion.div>

            <p className="text-sm text-faint">No experience needed · Ages 8+</p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {FEATURES.map((f) => (
              <div key={f.label} className="card p-4 text-left">
                <div className="text-3xl mb-2">{f.emoji}</div>
                <h3 className="font-bold text-ink text-base">{f.label}</h3>
                <p className="text-sm text-muted mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

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
