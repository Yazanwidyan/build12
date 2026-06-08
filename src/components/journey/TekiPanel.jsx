import TekiCharacter from "@/components/teki/TekiCharacter";
import { ACTS } from "@/data/curriculum";
import { useMissionEngine } from "@/engines/missionEngine";
import { useProgressStore } from "@/stores/progressStore";
import { useTekiStore } from "@/stores/tekiStore";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import MissionRunner from "./MissionRunner";

// ── Mood-driven float configs ─────────────────────────────────────────────────
const MOOD_FLOAT = {
  happy:    { y: [0, -6, 0],              rotate: [0, 0, 0],           dur: 2.8 },
  excited:  { y: [0, -11, 3, -10, 0],    rotate: [-3, 3, -2, 0],      dur: 1.4 },
  thinking: { y: [0, -2, -5, -2, 0],     rotate: [-1.5, 1.5, -1, 0],  dur: 4.2 },
  proud:    { y: [0, -9, -1, 0],          rotate: [0, 0, 0],           dur: 2.0 },
  amazed:   { y: [0, -14, 4, -9, 0],     rotate: [-5, 5, -3, 0],      dur: 1.6 },
  sad:      { y: [2, 1, 2],              rotate: [2, -1, 2],           dur: 5.0 },
};
const getMoodConfig = (m) => MOOD_FLOAT[m] ?? MOOD_FLOAT.happy;
const MOOD_POP_ROTATE = { excited: 12, proud: -7, amazed: 9, thinking: -4, sad: 3 };

// ── Inner character widget: handles float + reactions independently ────────────
function PanelTekiCharacter({ mood, challengeFlash }) {
  const floatControls    = useAnimation();
  const reactionControls = useAnimation();

  // Restart float loop whenever mood changes
  useEffect(() => {
    const cfg = getMoodConfig(mood);
    floatControls.start({
      y: cfg.y,
      rotate: cfg.rotate,
      transition: { duration: cfg.dur, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
    });
  }, [mood]);

  // React to code-challenge verdicts
  useEffect(() => {
    if (!challengeFlash) return;
    if (challengeFlash === "correct") {
      reactionControls.start({
        scale:  [1, 1.35, 0.88, 1.12, 1],
        rotate: [0, -10, 12, -6, 0],
        y:      [0, -18, 4, -7, 0],
        transition: { duration: 0.65, ease: "easeOut" },
      });
    } else {
      reactionControls.start({
        x:      [0, -9, 9, -9, 9, -5, 5, 0],
        rotate: [0, -5, 5, -4, 4, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }
  }, [challengeFlash]);

  return (
    <div className="shrink-0 mt-1">
      {/* Flash reaction wrapper */}
      <motion.div animate={reactionControls}>
        {/* Mood float wrapper */}
        <motion.div animate={floatControls}>
          {/* Pop-in on mood change */}
          <motion.div
            key={mood}
            initial={{ scale: 0.78, rotate: MOOD_POP_ROTATE[mood] ?? 0 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 16 }}
          >
            <TekiCharacter size={60} mood={mood} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────
export default function TekiPanel() {
  const { currentMessage, displayedText, isTyping, mood, challengeFlash } = useTekiStore();
  const {
    currentMission,
    currentStep,
    currentStepIndex,
    totalSteps,
    advanceStep,
    progressPercent,
  } = useMissionEngine();
  const xp = useProgressStore((s) => s.xp);

  const act = ACTS.find((a) => a.number === currentMission?.act);
  const shownText = displayedText || currentMessage || "";

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "var(--app-surface)" }}
    >
      {/* ── Mission strip ──────────────────────────────────────────── */}
      <div
        className="shrink-0 px-4 py-2 flex items-center gap-3"
        style={{ borderBottom: "1px solid var(--bubble-border)" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {act && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md text-white shrink-0"
                style={{ background: act.color }}
              >
                Act {act.number}
              </span>
            )}
            <span className="text-sm font-semibold text-gray-700 truncate">
              {currentMission?.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: act?.color ?? "#6366f1" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] text-gray-400 shrink-0">
              {currentStepIndex + 1}/{totalSteps}
            </span>
          </div>
        </div>

        <span className="xp-badge shrink-0">⭐ {xp} XP</span>
      </div>

      {/* ── TEKI + bubble + interaction ────────────────────────────── */}
      <div className="flex-1 flex items-start gap-3 px-4 py-3 overflow-y-auto min-h-0">
        <PanelTekiCharacter mood={mood} challengeFlash={challengeFlash} />

        {/* Right column: bubble then interaction */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {shownText && (
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={  { opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: "var(--bubble-bg)",
                  border: "1px solid var(--bubble-border)",
                  borderRadius: 20,
                  boxShadow: "var(--bubble-shadow)",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                <p className="text-base leading-relaxed" style={{ color: "var(--bubble-text)" }}>
                  {shownText}
                  {isTyping && (
                    <span className="inline-flex gap-0.5 ml-2 align-middle">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "var(--bubble-text)", display: "inline-block",
                          }}
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </span>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step interaction content */}
          <div className="flex-1">
            <MissionRunner
              step={currentStep}
              stepIndex={currentStepIndex}
              onComplete={advanceStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
