import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Zap, ArrowRight, Trash2 } from "lucide-react";

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
      <nav className="border-b-2 sticky border-app-border top-0 z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-black text-ink text-base tracking-tight">
              {`{ HelloBuildIt }`}
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
                  variant="ghost" color="neutral"
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
              <Button variant="solid" color="blue" size="xl" onClick={handleStart}>
                Start Building — it's free
              </Button>
            </motion.div>

            <p className="text-xs text-faint">No experience needed · Ages 8+</p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {FEATURES.map((f) => (
              <div key={f.label} className="card p-4 text-left">
                <div className="text-2xl mb-2">{f.emoji}</div>
                <h3 className="font-bold text-ink text-sm">{f.label}</h3>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Button showcase ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 w-full flex flex-col gap-12">
        <div>
          <p className="section-label mb-1">Design System</p>
          <h2 className="text-2xl font-black text-ink">Button Components</h2>
        </div>

        {/* Variants × Colors */}
        {[
          { variant: 'solid',   label: 'Solid'   },
          { variant: 'outline', label: 'Outline' },
          { variant: 'soft',    label: 'Soft'    },
          { variant: 'ghost',   label: 'Ghost'   },
          { variant: 'link',    label: 'Link'    },
        ].map(({ variant, label }) => (
          <div key={variant} className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted font-mono">{label}</p>
            <div className="flex flex-wrap items-center gap-3">
              {['blue', 'green', 'red', 'yellow', 'purple', 'neutral'].map((color) => (
                <Button key={color} variant={variant} color={color} size="md">
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {/* Sizes */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted font-mono">Sizes</p>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { size: 'xs', label: 'Extra Small' },
              { size: 'sm', label: 'Small'       },
              { size: 'md', label: 'Medium'      },
              { size: 'lg', label: 'Large'       },
              { size: 'xl', label: 'Extra Large' },
            ].map(({ size, label }) => (
              <Button key={size} variant="solid" color="blue" size={size}>{label}</Button>
            ))}
          </div>
        </div>

        {/* With icons */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted font-mono">With Icons</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="solid"   color="blue"   icon={<Star size={14} />}>Favourite</Button>
            <Button variant="solid"   color="green"  icon={<Zap size={14} />}>Power Up</Button>
            <Button variant="outline" color="purple" iconRight={<ArrowRight size={14} />}>Continue</Button>
            <Button variant="soft"    color="red"    icon={<Trash2 size={14} />}>Delete</Button>
          </div>
        </div>

        {/* States */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted font-mono">States</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="solid"   color="blue"    >Default</Button>
            <Button variant="solid"   color="blue"    disabled>Disabled</Button>
            <Button variant="solid"   color="blue"    loading>Loading</Button>
            <Button variant="outline" color="neutral" fullWidth>Full Width</Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-6 text-center text-xs border-t-2"
        style={{ borderColor: "var(--app-border)", color: "var(--ink-faint)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          © {new Date().getFullYear()} HelloBuildIt by HelloWorldKids
        </div>
      </footer>
    </div>
  );
}
