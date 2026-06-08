import Button from "@/components/ui/Button";
import { useStepAction } from "@/contexts/StepActionContext";
import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { useMissionEngine } from "@/engines/missionEngine";
import { useTekiStore } from "@/stores/tekiStore";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import TekiCharacter from "./TekiCharacter";

const TEKI_WIDTH = 300;

// ── One-time geometry (computed at module load) ────────────────────────────────
const _panelW      = typeof window !== "undefined" ? Math.min(Math.max(window.innerWidth * 0.33, 280), 420) : 340;
const _rightStart  = typeof window !== "undefined" ? 12 + _panelW + 12 : 460;
const _rightW      = typeof window !== "undefined" ? window.innerWidth - _rightStart - 12 : 700;
const _iH          = typeof window !== "undefined" ? window.innerHeight : 800;
const _iW          = typeof window !== "undefined" ? window.innerWidth  : 1440;

// LEFT  — bottom-center of the mission panel
const LEFT_X  = Math.max(0, 12 + _panelW / 2 - TEKI_WIDTH / 2);
const LEFT_Y  = Math.max(44, _iH - 200);

// CENTER — middle of the full screen (default resting spot)
const CENTER_X = Math.max(0, (_iW - TEKI_WIDTH) / 2);
const CENTER_Y = Math.round(_iH * 0.38);

// RIGHT  — centered in the website preview panel
const RIGHT_X = _rightStart + Math.max(0, (_rightW - TEKI_WIDTH) / 2);
const RIGHT_Y = Math.round(_iH * 0.42);

const FLOAT = {
  animate: { y: [0, -7, 0] },
  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
};

const SPRING_X = { type: "spring", stiffness: 160, damping: 28 };
const SPRING_Y = { type: "spring", stiffness: 200, damping: 30 };

function readTime(msg) {
  return Math.max(2000, Math.min(msg.length * 30, 4000));
}

// ── Zone rules ─────────────────────────────────────────────────────────────────
// left  → steps where the user interacts with the mission panel
// right → observation steps (watching what changed on the website)
// center → everything else (default resting zone)
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
  const { currentMessage, isTyping, mood, messageTyped, highlightSection } =
    useTekiStore();
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const { currentStep } = useMissionEngine();
  const { sectionBounds } = useWebsiteLayout();
  const { stepAction } = useStepAction();
  const constraintsRef = useRef(null);

  // Y position when travelling toward a highlighted section (observation / canvas-input)
  const travelTop = useMemo(() => {
    if (!highlightSection) return null;
    const bound = sectionBounds[highlightSection];
    if (!bound) return null;
    if (currentStep?.type === "canvas-input" && currentStep?.canvasInput?.section) {
      return Math.max(44, Math.min(bound.top + bound.height + 12, _iH - 220));
    }
    return Math.max(44, bound.top + bound.height / 2 - 36);
  }, [highlightSection, sectionBounds, currentStep?.id]);

  const zone = useMemo(() => zoneForStep(currentStep), [currentStep?.id]);

  // Resolve target coordinates
  const targetLeft =
    zone === "left" ? LEFT_X : zone === "right" ? RIGHT_X : CENTER_X;
  const targetTop =
    zone === "left"   ? LEFT_Y :
    zone === "right"  ? (travelTop ?? RIGHT_Y) :
    CENTER_Y;

  // posX is an offset from LEFT_X (the CSS `left` anchor)
  const posX = useMotionValue(CENTER_X - LEFT_X); // start at center
  const posY = useMotionValue(CENTER_Y);

  useEffect(() => {
    animate(posX, targetLeft - LEFT_X, SPRING_X);
  }, [targetLeft]);

  useEffect(() => {
    animate(posY, targetTop, SPRING_Y);
  }, [targetTop]);

  // Clear section highlight when the step doesn't declare one
  useEffect(() => {
    const hasHighlight =
      currentStep?.highlight || currentStep?.highlightSection ||
      currentStep?.section   || currentStep?.canvasInput?.section;
    if (!hasHighlight) clearHighlight();
  }, [currentStep?.id]);

  // Auto-advance multi-message queues
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
          left: LEFT_X,
          width: TEKI_WIDTH,
          x: posX,
          y: posY,
          cursor: "grab",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.2 } }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Speech bubble — grows upward, always anchored bottom-left toward the character */}
        <AnimatePresence mode="popLayout">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              className="absolute pointer-events-auto"
              style={{ bottom: "100%", left: 0, width: "100%", paddingBottom: 8 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div
                className="px-4 py-3 leading-relaxed"
                style={{
                  backgroundColor: "var(--bubble-bg)",
                  border: "1px solid var(--bubble-border)",
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  color: "var(--ink-muted)",
                  fontWeight: 500,
                  fontSize: 15,
                  boxShadow: "0 2px 20px rgba(99,102,241,0.18)",
                }}
              >
                {currentMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Teki character + action button */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 pointer-events-none">
            <motion.div {...FLOAT}>
              <TekiCharacter size={68} mood={mood} />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {stepAction && (
              <motion.div
                key={stepAction.label}
                className="flex-1 pointer-events-auto"
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18 }}
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
