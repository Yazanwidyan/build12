import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useJourneyStore } from "@/stores/journeyStore";
import { useProfileStore } from "@/stores/profileStore";
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

const TOPICS = [
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

const HOW_IT_WORKS = [
  {
    emoji: "📋",
    label: "Missions",
    desc: "Small focused tasks — each one teaches one real concept.",
  },
  {
    emoji: "🎯",
    label: "Acts",
    desc: "Groups of missions that build toward a visible goal.",
  },
  {
    emoji: "🌐",
    label: "Journey",
    desc: "Complete all acts to ship a real live website.",
  },
];

const STEPS = [
  {
    bubble:
      "Welcome, future builder! I'm TEKI — your coding companion. 🚀 Here's how it works:",
  },
  { bubble: "What's your website called? Pick something you love!" },
  { bubble: "Pick a color that feels like you — this becomes your brand!" },
  { bubble: "What's your website about? This shapes your whole project!" },
];

export default function JourneyIntro({ onDone }) {
  const { builderName, ageGroup } = useProfileStore();
  const { setWebsiteName, setWebsiteColor, setWebsiteTopic } =
    useJourneyStore();

  const isYoung = ageGroup === 'young';

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [topic, setTopic] = useState("");
  const [custom, setCustom] = useState("");

  const next = () => setStep((s) => s + 1);

  const handleName = () => {
    if (name.trim().length < 2) {
      setNameErr("Give your website a name!");
      return;
    }
    setNameErr("");
    next();
  };

  const handleDone = () => {
    const finalTopic = custom.trim() || topic;
    setWebsiteName(name.trim());
    setWebsiteColor(color);
    setWebsiteTopic(finalTopic || "General");
    onDone();
  };

  // Under-11: skip name/color/topic, use auto defaults
  const handleStartYoung = () => {
    setWebsiteName(builderName ? `${builderName}'s Website` : 'My Website');
    setWebsiteColor('#3b82f6');
    setWebsiteTopic('General');
    onDone();
  };

  const canFinish = topic || custom.trim();
  const visibleSteps = isYoung ? STEPS.slice(0, 1) : STEPS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(1px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
        className="w-full max-w-lg flex flex-col gap-5"
      >
        {/* TEKI + bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-0"
          >
            <motion.div
              className="shrink-0"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <TekiCharacter
                size={72}
                mood={step === 0 ? "excited" : "happy"}
              />
            </motion.div>
            <div className="relative flex-1">
              
              
              <div
                className="w-full rounded-2xl px-5 py-3 text-sm leading-relaxed"
                style={{
                  backgroundColor: "var(--bubble-bg)",
                  border: "1px solid var(--bubble-border)",
                  borderRadius: 20,                  boxShadow: "var(--bubble-shadow)",                  color: "var(--bubble-text)",
                }}
              >
                {STEPS[step].bubble}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card */}
        <div className="card p-6 flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {/* Step 0: How it works */}
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-3">
                  {HOW_IT_WORKS.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{
                        background: "var(--app-raised)",
                        border: "1px solid var(--bubble-border)",
                      }}
                    >
                      <span className="text-2xl shrink-0">{h.emoji}</span>
                      <div>
                        <p className="font-bold text-ink text-sm">{h.label}</p>
                        <p className="text-xs text-muted mt-0.5">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="solid"
                  color="blue"
                  size="lg"
                  fullWidth
                  onClick={isYoung ? handleStartYoung : next}
                >
                  {isYoung ? 'Start Building! 🚀' : "Let's set up my website!"}
                </Button>
              </motion.div>
            )}

            {/* Step 1: Website name */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <Input
                  label="Website name"
                  placeholder="e.g. Space Paws, My Portfolio…"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameErr("");
                  }}
                  error={nameErr}
                  onKeyDown={(e) => e.key === "Enter" && handleName()}
                  autoFocus
                />
                <Button
                  variant="solid"
                  color="blue"
                  size="lg"
                  fullWidth
                  onClick={handleName}
                  disabled={name.trim().length < 2}
                >
                  Continue →
                </Button>
              </motion.div>
            )}

            {/* Step 2: Color */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-8 gap-2">
                  {PRESET_COLORS.map((c) => (
                    <motion.button
                      key={c.value}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setColor(c.value)}
                      className="aspect-square rounded-xl"
                      style={{
                        background: c.value,
                        outline:
                          color === c.value ? `3px solid ${c.value}` : "none",
                        outlineOffset: 2,
                      }}
                      title={c.label}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-9 w-full rounded-xl cursor-pointer p-0.5"
                  style={{
                    border: "2px solid var(--bubble-border)",
                    backgroundColor: "var(--app-raised)",
                  }}
                />
                {/* Preview swatch */}
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: "var(--app-raised)",
                    border: "1px solid var(--bubble-border)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg shrink-0"
                    style={{ background: color }}
                  />
                  <p className="text-sm text-muted">
                    This will be your website's brand color.
                  </p>
                </div>
                <Button
                  variant="solid"
                  color="blue"
                  size="lg"
                  fullWidth
                  onClick={next}
                >
                  Continue →
                </Button>
              </motion.div>
            )}

            {/* Step 3: Topic */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTopic(t);
                        setCustom("");
                      }}
                      className="px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all"
                      style={{
                        borderColor:
                          topic === t && !custom
                            ? "#3b82f6"
                            : "var(--app-border)",
                        backgroundColor:
                          topic === t && !custom
                            ? "rgba(59,130,246,0.1)"
                            : "var(--app-raised)",
                        color:
                          topic === t && !custom
                            ? "#3b82f6"
                            : "var(--ink-muted)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <Input
                  placeholder="Or type your own topic…"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setTopic("");
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && canFinish && handleDone()
                  }
                />
                <Button
                  variant="solid"
                  color="blue"
                  size="lg"
                  fullWidth
                  onClick={handleDone}
                  disabled={!canFinish}
                >
                  Start Building! 🚀
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2">
          {visibleSteps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                backgroundColor:
                  i === step ? "#3b82f6" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
