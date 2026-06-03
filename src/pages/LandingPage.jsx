import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleStart = () =>
    navigate({ to: isAuthenticated ? "/dashboard" : "/signup" });

  return (
    <div className="min-h-screen bg-app flex flex-col">
      {/* ── Nav ── */}
      <nav className="border-b sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black text-white"
              style={{
                background: "linear-gradient(135deg, #2cbaff, #06a4f0)",
              }}
            >
              H
            </div>
            <span className="text-lg font-black text-ink tracking-tight">
              HelloBuildIt
            </span>
          </div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 max-w-lg"
          >
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
              <h1 className="text-4xl font-black text-ink leading-tight">
                Build it.
                <br />
                <span style={{ color: "#2cbaff" }}>Understand it.</span>
                <br />
                Own it.
              </h1>
              <p className="text-lg leading-relaxed text-muted">
                Learn to code by building real websites, games, and apps —
                guided by TEKI, your AI companion.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="action" size="xl" onClick={handleStart}>
                Start Building — it's free
              </Button>
            </motion.div>

            <p className="text-xs text-faint">No experience needed · Ages 8+</p>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="card p-4 text-left"
              >
                <div className="text-2xl mb-2">{f.emoji}</div>
                <h3 className="font-bold text-ink text-sm">{f.label}</h3>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-6 text-center text-xs border-t"
        style={{ borderColor: "var(--app-border)", color: "var(--ink-faint)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          © {new Date().getFullYear()} HelloBuildIt by HelloWorldKids
        </div>
      </footer>
    </div>
  );
}
