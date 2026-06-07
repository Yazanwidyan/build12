import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getMissionsForLevel } from "@/data/curriculum";
import { useJourneyStore } from "@/stores/journeyStore";
import { AGE_GROUPS, useProfileStore } from "@/stores/profileStore";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const PRESET_COLORS = [
  { label: "Sky", value: "#3b82f6" },
  { label: "Gold", value: "#fde047" },
  { label: "Emerald", value: "#10b981" },
  { label: "Rose", value: "#f43f5e" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
  { label: "Teal", value: "#14b8a6" },
];

const TOPIC_OPTIONS = [
  "Pets",
  "Space",
  "Music",
  "Sports",
  "Gaming",
  "Art",
  "Science",
  "Food",
  "Travel",
  "Fashion",
];

const TOTAL_STEPS = 4; // non-senior
const SENIOR_STEPS = 5;

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
                      borderRadius: 20,                      boxShadow: "var(--bubble-shadow)",                      color: "var(--bubble-text)",
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
                      borderRadius: 20,                      boxShadow: "var(--bubble-shadow)",                      color: "var(--bubble-text)",
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

  const [siteName, setSiteName] = useState("");
  const [siteColor, setSiteColor] = useState("#3b82f6");
  const [siteTopic, setSiteTopic] = useState("");
  const [siteTopicCustom, setSiteTopicCustom] = useState("");
  const [siteNameError, setSiteNameError] = useState("");

  const isSenior = profile.ageGroup === "senior";
  const totalSteps = isSenior ? SENIOR_STEPS : TOTAL_STEPS;

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
    if (isSenior) {
      next();
    } else {
      journey.startJourney("website", 1);
      profile.completeOnboarding();
      navigate({ to: "/journey" });
    }
  };

  const launchSenior = () => {
    const finalName = siteName.trim();
    const finalTopic = siteTopicCustom.trim() || siteTopic;
    if (!finalName) {
      setSiteNameError("Give your website a name!");
      return;
    }
    if (!finalTopic) {
      setSiteNameError("Pick a topic first");
      return;
    }
    journey.autoGenerateWebsite(finalName, siteColor, finalTopic);
    const firstMission = getMissionsForLevel("senior")[0]?.number ?? 21;
    journey.startJourney("website", firstMission);
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          placeholder="Your builder name..."
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
                <span
                  style={{ color: "#3b82f6" }}
                  className="font-black text-xl"
                >
                  ✓
                </span>
              )}
            </motion.button>
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
        bubble={
          isSenior
            ? "Since you're 15+, I've prepared a special React path just for you!"
            : "Amazing! Let's start building. Pick one!"
        }
        action={isSenior ? "Set Up My Website →" : "Start Building"}
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
                {isSenior
                  ? "Auto-generate your site, then dive into React"
                  : "Build a real website from blueprint to live site"}
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

  // ── Step 4 (SENIOR): Website setup ─────────────────────────────────────────
  if (step === 4 && isSenior)
    return (
      <OnboardingShell
        step={4}
        totalSteps={totalSteps}
        onBack={back}
        tekiMood="excited"
        bubble="Let's set up your website. I'll generate it instantly — then we learn React on it!"
        action="Generate My Website ✨"
        onAction={launchSenior}
        actionDisabled={
          !siteName.trim() || (!siteTopic && !siteTopicCustom.trim())
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Website Name"
            value={siteName}
            onChange={(e) => {
              setSiteName(e.target.value);
              setSiteNameError("");
            }}
            placeholder="e.g. Space Paws, My Portfolio..."
            error={siteNameError}
            autoFocus
          />

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-ink">
              Main Color
            </label>
            <div className="grid grid-cols-8 gap-2">
              {PRESET_COLORS.map((c) => (
                <motion.button
                  key={c.value}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSiteColor(c.value)}
                  title={c.label}
                  className="aspect-square rounded-xl"
                  style={{
                    background: c.value,
                    outline:
                      siteColor === c.value ? `3px solid ${c.value}` : "none",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
            <input
              type="color"
              value={siteColor}
              onChange={(e) => setSiteColor(e.target.value)}
              className="h-8 w-full rounded-xl cursor-pointer p-0.5"
              style={{
                border: "2px solid var(--bubble-border)",
                backgroundColor: "var(--app-raised)",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-ink">Topic</label>
            <div className="flex flex-wrap gap-2">
              {TOPIC_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSiteTopic(t);
                    setSiteTopicCustom("");
                  }}
                  className="px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all"
                  style={{
                    borderColor:
                      siteTopic === t && !siteTopicCustom
                        ? "#3b82f6"
                        : "var(--app-border)",
                    backgroundColor:
                      siteTopic === t && !siteTopicCustom
                        ? "rgba(59,130,246,0.1)"
                        : "var(--app-raised)",
                    color:
                      siteTopic === t && !siteTopicCustom
                        ? "#3b82f6"
                        : "var(--ink-muted)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <Input
              placeholder="Or type your own..."
              value={siteTopicCustom}
              onChange={(e) => {
                setSiteTopicCustom(e.target.value);
                setSiteTopic("");
              }}
              onKeyDown={(e) => e.key === "Enter" && launchSenior()}
            />
          </div>
        </div>
      </OnboardingShell>
    );

  return null;
}
