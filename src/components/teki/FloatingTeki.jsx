import Button from "@/components/ui/Button";
import { useStepAction } from "@/contexts/StepActionContext";
import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { useMissionEngine } from "@/engines/missionEngine";
import { useTekiStore } from "@/stores/tekiStore";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import TekiCharacter from "./TekiCharacter";

const TEKI_W = 300;

// ── Stable viewport snapshot (valid until hard reload) ────────────────────────
const VW = typeof window !== "undefined" ? window.innerWidth  : 1440;
const VH = typeof window !== "undefined" ? window.innerHeight : 800;

// ── Zone X anchors ─────────────────────────────────────────────────────────────
// MissionPopup: fixed bottom-14, left: 50vw-190px, width: 380px.
// TEKI docks LEFT of the popup during interaction and RIGHT during observation.
// CENTER is the horizontal midpoint when no popup competes.
const POPUP_HALF = 190;   // half of 380px popup
const GAP        = 14;    // gap between TEKI edge and popup edge

const X_LEFT   = Math.max(16, Math.round(VW / 2) - POPUP_HALF - TEKI_W - GAP);
const X_CENTER = Math.max(16, Math.round((VW - TEKI_W) / 2));
const X_RIGHT  = Math.min(VW - TEKI_W - 16, Math.round(VW / 2) + POPUP_HALF + GAP);

// ── Default docking Y — just above where the popup normally lives ─────────────
// This keeps TEKI in the bottom zone without overlapping the preview content.
const DOCK_Y = VH - 310;

// Minimum Y so the speech bubble (≈90px tall) stays on screen
const MIN_Y  = 200;
// Maximum Y so TEKI doesn't go below popup area
const MAX_Y  = VH - 220;

// ── Springs ───────────────────────────────────────────────────────────────────
const SPRING_X = { type: "spring", stiffness: 130, damping: 25 };
const SPRING_Y = { type: "spring", stiffness: 160, damping: 26 };

// ── Mood float keyframes ──────────────────────────────────────────────────────
const MOOD_FLOAT = {
  happy:    { y: [0, -8,  0],             rotate: [0,    0,    0],  dur: 2.8 },
  excited:  { y: [0, -14, 3, -13, 0],    rotate: [-3,   3,   -2, 0], dur: 1.4 },
  thinking: { y: [0, -3,  -6, -3, 0],    rotate: [-1.5, 1.5, -1, 0], dur: 4.2 },
  proud:    { y: [0, -12, -1, 0],         rotate: [0,    0,    0],  dur: 2.0 },
  amazed:   { y: [0, -18, 5,  -12, 0],   rotate: [-5,   5,   -3, 0], dur: 1.6 },
  sad:      { y: [3,  1,   3],            rotate: [2,   -1,    2],  dur: 5.0 },
};
const getMoodCfg = (m) => MOOD_FLOAT[m] ?? MOOD_FLOAT.happy;
const MOOD_POP_ROTATE = { excited: 14, proud: -8, amazed: 10, thinking: -5, sad: 4 };

function readTime(msg) {
  return Math.max(2000, Math.min(msg.length * 30, 4000));
}

// Step type → travel zone
function zoneForStep(step) {
  if (!step) return "center";
  switch (step.type) {
    case "code-challenge":
    case "canvas-input":
    case "topic-picker":
    case "color-picker":
    case "input":
    case "visual-builder":
      return "left";
    case "observation":
      return "right";
    default:
      return "center";
  }
}

export default function FloatingTeki() {
  const {
    currentMessage, isTyping, mood, messageTyped,
    highlightSection, challengeFlash,
  } = useTekiStore();
  const clearHighlight   = useTekiStore((s) => s.clearHighlight);
  const { currentStep }  = useMissionEngine();
  const { sectionBounds } = useWebsiteLayout();
  const { stepAction }   = useStepAction();
  const constraintsRef   = useRef(null);

  const floatControls    = useAnimation();
  const reactionControls = useAnimation();

  // ── Section-based Y: TEKI sits just below the highlighted section ─────────
  // Applies to both canvas-input (TEKI near what's being edited) and
  // observation (TEKI watches what just appeared). The speech bubble
  // floats upward toward the section.
  const travelY = useMemo(() => {
    if (!highlightSection) return null;
    const bound = sectionBounds[highlightSection];
    if (!bound) return null;
    const below = bound.top + bound.height + 16;
    return Math.max(MIN_Y, Math.min(below, MAX_Y));
  }, [highlightSection, sectionBounds, currentStep?.id]);

  const zone    = useMemo(() => zoneForStep(currentStep), [currentStep?.id]);
  const targetX = zone === "left" ? X_LEFT : zone === "right" ? X_RIGHT : X_CENTER;
  // travelY (section-following) only applies during observation (right zone, popup hidden).
  // During canvas-input / code-challenge the popup IS visible — TEKI must stay at DOCK_Y
  // so it never lands on top of the popup or its action button.
  const targetY = zone === "right" ? (travelY ?? DOCK_Y) : DOCK_Y;

  // posX/posY are absolute screen coordinates (element anchored top-left: 0,0)
  const posX = useMotionValue(X_CENTER);
  const posY = useMotionValue(DOCK_Y + 60); // start slightly below — entrance effect

  useEffect(() => { animate(posX, targetX, SPRING_X); }, [targetX]);
  useEffect(() => { animate(posY, targetY, SPRING_Y); }, [targetY]);

  // ── Mood-driven float loop ─────────────────────────────────────────────────
  useEffect(() => {
    const cfg = getMoodCfg(mood);
    floatControls.start({
      y: cfg.y,
      rotate: cfg.rotate,
      transition: { duration: cfg.dur, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
    });
  }, [mood]);

  // ── Challenge verdict reaction ─────────────────────────────────────────────
  useEffect(() => {
    if (!challengeFlash) return;
    if (challengeFlash === "correct") {
      reactionControls.start({
        scale:  [1, 1.38, 0.88, 1.14, 1],
        rotate: [0, -10, 12, -6, 0],
        y:      [0, -20,  4, -8, 0],
        transition: { duration: 0.7, ease: "easeOut" },
      });
    } else {
      reactionControls.start({
        x:      [0, -10, 10, -10, 10, -6, 6, 0],
        rotate: [0, -5,   5,  -4,  4,  0],
        transition: { duration: 0.55, ease: "easeInOut" },
      });
    }
  }, [challengeFlash]);

  // ── Clear highlight when step doesn't declare one ─────────────────────────
  useEffect(() => {
    const has =
      currentStep?.highlight || currentStep?.highlightSection ||
      currentStep?.section   || currentStep?.canvasInput?.section;
    if (!has) clearHighlight();
  }, [currentStep?.id]);

  // ── Auto-advance message queue ────────────────────────────────────────────
  useEffect(() => {
    if (!currentMessage || !isTyping) return;
    const t = setTimeout(messageTyped, readTime(currentMessage));
    return () => clearTimeout(t);
  }, [currentMessage, isTyping]);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        className="fixed z-50 select-none"
        style={{
          top: 0,
          left: 0,
          width: TEKI_W,
          x: posX,
          y: posY,
          cursor: "grab",
        }}
        // Entrance: fade + scale in (y handled by posY starting offset)
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        whileDrag={{ cursor: "grabbing", scale: 1.04 }}
      >
        {/* Speech bubble — anchored above the character, grows upward */}
        <AnimatePresence mode="popLayout">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              className="absolute pointer-events-auto"
              style={{ bottom: "100%", left: 0, width: "100%", paddingBottom: 8 }}
              initial={{ opacity: 0, y: 14, scale: 0.88 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={  { opacity: 0, y: -10, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <div
                className="px-4 py-3 leading-relaxed"
                style={{
                  backgroundColor: "var(--bubble-bg)",
                  border: "1px solid var(--bubble-border)",
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  fontWeight: 500,
                  fontSize: 15,
                  boxShadow: "0 2px 20px rgba(99,102,241,0.18)",
                  color: "var(--ink-muted)",
                }}
              >
                {currentMessage}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character + action button */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 pointer-events-none">
            {/* Flash-reaction wrapper (shake / bounce) */}
            <motion.div animate={reactionControls}>
              {/* Mood-driven float */}
              <motion.div animate={floatControls}>
                {/* Pop-in when mood changes */}
                <motion.div
                  key={mood}
                  initial={{ scale: 0.78, rotate: MOOD_POP_ROTATE[mood] ?? 0 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 16 }}
                >
                  <TekiCharacter size={68} mood={mood} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {stepAction && (
              <motion.div
                key={stepAction.label}
                className="flex-1 pointer-events-auto"
                initial={{ opacity: 0, x: 14, scale: 0.9  }}
                animate={{ opacity: 1, x: 0,  scale: 1    }}
                exit={  { opacity: 0, x: -10, scale: 0.88 }}
                transition={{ type: "spring", stiffness: 360, damping: 26 }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Button
                  variant="solid"
                  color="blue"
                  onClick={stepAction.onClick}
                  disabled={stepAction.disabled}
                >
                  {stepAction.label}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
