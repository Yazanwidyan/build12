import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useJourneyStore } from "@/stores/journeyStore";
import { AGE_GROUPS, useProfileStore } from "@/stores/profileStore";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TOTAL_STEPS = 4;

// ── Shared layout wrapper ──────────────────────────────────────────────────────
// Top bar (progress + skip), centered TEKI, wide speech bubble, content, big button
function OnboardingShell({
  step,
  totalSteps,
  onBack,
  onSkip,
  tekiMood = "happy",
  tekiTop = false,
  bubble,
  children,
  action,
  onAction,
  actionDisabled,
}) {
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-app flex flex-col">
      {/* ── Progress bar + Back + Skip ── */}
      {step > 0 && (
        <div className="w-full max-w-2xl mx-auto flex items-center gap-4 pt-5">
          {onBack ? (
            <Button variant="ghost" color="neutral" size="sm" onClick={onBack}>
              ← Back
            </Button>
          ) : (
            <div className="w-[64px]" />
          )}
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--app-raised)" }}
          >
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ background: "#22c55e" }}
            />
          </div>
          {onSkip ? (
            <Button variant="ghost" color="neutral" size="sm" onClick={onSkip}>
              Skip
            </Button>
          ) : (
            <div className="w-[64px]" />
          )}
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center px-6 py-8 pb-28 justify-center">
        <div className="w-full max-w-2xl flex flex-col items-center  gap-6">
          {tekiTop ? (
            /* ── Top layout: big TEKI above, upward tail bubble below ── */
            <>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TekiCharacter size={130} mood={tekiMood} />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={bubble}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full"
                >
                  <div
                    className="w-full rounded-2xl px-6 py-4 text-base leading-relaxed"
                    style={{
                      backgroundColor: "var(--bubble-bg)",
                      border: "1px solid var(--bubble-border)",
                      borderRadius: 20,
                      boxShadow: "var(--bubble-shadow)",
                      color: "var(--ink-muted)",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {bubble}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            /* ── Side layout: small TEKI left, left-tail bubble ── */
            <div className="flex items-center gap-6 w-full">
              <motion.div
                className="shrink-0"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TekiCharacter size={80} mood={tekiMood} />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={bubble}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex-1"
                >
                  <div
                    className="w-full rounded-2xl px-5 py-4 text-base leading-relaxed"
                    style={{
                      backgroundColor: "var(--bubble-bg)",
                      border: "1px solid var(--bubble-border)",
                      borderRadius: 20,
                      borderBottomLeftRadius: 0,
                      boxShadow: "var(--bubble-shadow)",
                      color: "var(--ink-muted)",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {bubble}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Step-specific content */}
          {children && <div className="w-full">{children}</div>}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      {action && (
        <div
          className="fixed bottom-0 left-0 right-0 flex justify-center px-6 pb-8 pt-4"
          style={{
            background:
              "linear-gradient(to top, var(--app-bg) 70%, transparent)",
          }}
        >
          <Button
            variant="solid"
            color="blue"
            size="lg"
            fullWidth
            disabled={actionDisabled}
            onClick={onAction}
            className="max-w-sm"
          >
            {action}
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Main flow ──────────────────────────────────────────────────────────────────
export default function OnboardingFlow() {
  const navigate = useNavigate();
  const profile = useProfileStore();
  const journey = useJourneyStore();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const totalSteps = TOTAL_STEPS;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const skip = () => {
    // Skip only makes sense after choosing age group
    if (step >= 3 && profile.ageGroup) {
      journey.startJourney("website", 1);
      profile.completeOnboarding();
      navigate({ to: "/journey" });
    }
  };

  const submitName = () => {
    if (name.trim().length < 2) {
      setNameError("At least 2 characters");
      return;
    }
    profile.setBuilderName(name.trim());
    next();
  };

  const selectJourney = () => {
    journey.startJourney("website", 1);
    profile.completeOnboarding();
    navigate({ to: "/journey" });
  };

  // ── Step 0: Hello ──────────────────────────────────────────────────────────
  if (step === 0)
    return (
      <OnboardingShell
        step={0}
        totalSteps={totalSteps}
        tekiMood="excited"
        tekiTop
        bubble="Hey there! I'm TEKI — your personal coding companion!"
        action="Continue"
        onAction={next}
      />
    );

  // ── Step 1: Builder name ──────────────────────────────────────────────────
  if (step === 1)
    return (
      <OnboardingShell
        step={1}
        totalSteps={totalSteps}
        onBack={back}
        tekiMood="happy"
        bubble="What should I call you, builder?"
        action="Continue"
        onAction={submitName}
        actionDisabled={name.trim().length < 2}
      >
        <Input
          className="max-w-xs mx-auto"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          placeholder="Enter username..."
          error={nameError}
          onKeyDown={(e) => e.key === "Enter" && submitName()}
          autoFocus
        />
      </OnboardingShell>
    );

  // ── Step 2: Age group ──────────────────────────────────────────────────────
  if (step === 2)
    return (
      <OnboardingShell
        step={2}
        totalSteps={totalSteps}
        onBack={back}
        tekiMood="thinking"
        bubble="I'll teach you the right way for your level. How old are you?"
        action="Continue"
        onAction={next}
        actionDisabled={!profile.ageGroup}
      >
        <div className="flex flex-col gap-2">
          {AGE_GROUPS.map((g) => (
            g.locked ? (
              <div
                key={g.id}
                className="flex items-center justify-between p-4 rounded-2xl border-2 opacity-40 cursor-not-allowed"
                style={{
                  borderColor: "var(--app-border)",
                  backgroundColor: "var(--app-raised)",
                }}
              >
                <div>
                  <p className="font-bold text-muted text-base">{g.label}</p>
                  <p className="text-sm text-faint">{g.range}</p>
                </div>
                <span className="text-xl">🔒</span>
              </div>
            ) : (
              <motion.button
                key={g.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => profile.setAgeGroup(g.id)}
                className="flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all"
                style={{
                  borderColor:
                    profile.ageGroup === g.id ? "#3b82f6" : "var(--app-border)",
                  backgroundColor:
                    profile.ageGroup === g.id
                      ? "rgba(59,130,246,0.08)"
                      : "var(--app-raised)",
                }}
              >
                <div>
                  <p className="font-bold text-ink text-base">{g.label}</p>
                  <p className="text-sm text-muted">{g.range}</p>
                </div>
                {profile.ageGroup === g.id && (
                  <span style={{ color: "#3b82f6" }} className="font-black text-xl">
                    ✓
                  </span>
                )}
              </motion.button>
            )
          ))}
        </div>
      </OnboardingShell>
    );

  // ── Step 3: Choose journey ────────────────────────────────────────────────
  if (step === 3)
    return (
      <OnboardingShell
        step={3}
        totalSteps={totalSteps}
        onBack={back}
        onSkip={skip}
        tekiMood="excited"
        bubble="Amazing! Let's start building. Pick one!"
        action="Start Building"
        onAction={selectJourney}
      >
        <div className="flex flex-col gap-2">
          {/* Website journey (active) */}
          <div
            className="flex items-center gap-4 p-4 rounded-2xl border-2"
            style={{
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.08)",
            }}
          >
            <span className="text-4xl">🌐</span>
            <div>
              <p className="font-bold text-ink text-base">Website Journey</p>
              <p className="text-sm text-muted mt-0.5">
                Build a real website from blueprint to live site
              </p>
            </div>
            <span className="ml-auto font-bold" style={{ color: "#3b82f6" }}>
              ✓
            </span>
          </div>
          {/* Coming soon */}
          {[
            { emoji: "🎮", label: "Game Journey" },
            { emoji: "📱", label: "Mobile Journey" },
          ].map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 opacity-50 cursor-not-allowed"
              style={{
                borderColor: "var(--app-border)",
                backgroundColor: "var(--app-raised)",
              }}
            >
              <span className="text-4xl">{a.emoji}</span>
              <div>
                <p className="font-semibold text-muted text-base">{a.label}</p>
                <p className="text-sm text-faint">Coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </OnboardingShell>
    );

  return null;
}
