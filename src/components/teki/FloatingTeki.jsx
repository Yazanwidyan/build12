import MissionRunner from "@/components/journey/MissionRunner";
import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { useMissionEngine } from "@/engines/missionEngine";
import { useProgressStore } from "@/stores/progressStore";
import { useTekiStore } from "@/stores/tekiStore";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import TekiCharacter from "./TekiCharacter";

const TEKI_WIDTH = 390;
const DEFAULT_LEFT = typeof window !== "undefined" ? Math.max(20, (window.innerWidth - TEKI_WIDTH) / 2) : 20;
const DEFAULT_TOP = typeof window !== "undefined" ? Math.max(44, window.innerHeight / 2 - 120) : 300;

const FLOAT = {
  animate: { y: [0, -7, 0] },
  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
};

// Steps with rich content → show inside a card panel
const PANEL_STEPS = new Set([
  "code-challenge",
  "input",
  "canvas-input",
  "color-picker",
  "topic-picker",
  "visual-builder",
  "act-complete",
  "react-gateway",
  "react-spotlight",
  "react-concept",
  "react-live-demo",
]);

// Reading time: proportional to message length, capped between 2s and 4s
function readTime(msg) {
  return Math.max(2000, Math.min(msg.length * 30, 4000));
}

export default function FloatingTeki() {
  const {
    currentMessage,
    isTyping,
    mood,
    messageTyped,
    highlightSection,
  } = useTekiStore();
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const { currentStep, currentStepIndex, advanceStep } = useMissionEngine();
  const xp = useProgressStore((s) => s.xp);
  const constraintsRef = useRef(null);
  const { sectionBounds } = useWebsiteLayout();

  const travelTop = useMemo(() => {
    if (!highlightSection) return null;
    const bound = sectionBounds[highlightSection];
    if (!bound) return null;
    if (
      currentStep?.type === "canvas-input" &&
      currentStep?.canvasInput?.section
    ) {
      return Math.max(
        44,
        Math.min(bound.top + bound.height + 12, window.innerHeight - 220),
      );
    }
    return Math.max(44, bound.top + bound.height / 2 - 36);
  }, [highlightSection, sectionBounds, currentStep?.id]);

  const effectiveTop = travelTop ?? DEFAULT_TOP;
  const posX = useMotionValue(0);
  const posY = useMotionValue(effectiveTop);

  useEffect(() => {
    animate(posX, 0, { type: "spring", stiffness: 260, damping: 34 });
    animate(posY, effectiveTop, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    });
  }, [effectiveTop]);

  useEffect(() => {
    const hasHighlight =
      currentStep?.highlight ||
      currentStep?.highlightSection ||
      currentStep?.section ||
      currentStep?.canvasInput?.section;
    if (!hasHighlight) clearHighlight();
  }, [currentStep?.id]);

  // Advance multi-message queues after a proper reading delay
  useEffect(() => {
    if (!currentMessage || !isTyping) return;
    const t = setTimeout(messageTyped, readTime(currentMessage));
    return () => clearTimeout(t);
  }, [currentMessage, isTyping]);

  const isPanel = currentStep ? PANEL_STEPS.has(currentStep.type) : false;

  return (
    <>
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        className="fixed z-50 flex flex-col gap-2 select-none"
        style={{
          top: 0,
          left: DEFAULT_LEFT,
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
        {/* Speech bubble — always above, cross-fades between messages */}
        <AnimatePresence mode="popLayout">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              className="relative pointer-events-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                boxShadow: "0 2px 20px rgba(99,102,241,0.18)",
              }}
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
                  fontSize: 16,
                }}
              >
                {currentMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row: Techi alone on the left, content to his right */}
        <div className="flex items-start gap-3">
          {/* Techi — always alone on the left */}
          <div className="shrink-0 pointer-events-none">
            <motion.div {...FLOAT}>
              <TekiCharacter size={72} mood={mood} />
            </motion.div>
          </div>

          {/* Content: always visible, no hiding during message delivery */}
          <div
            className="flex-1 min-w-0 pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {currentStep && (
              isPanel ? (
                <div
                  className="rounded-2xl overflow-y-auto pointer-events-auto"
                  style={{
                    backgroundColor: "var(--app-surface)",
                    border: "1px solid var(--bubble-border)",
                    padding: "12px",
                    maxHeight: "60vh",
                  }}
                >
                  <MissionRunner
                    step={currentStep}
                    stepIndex={currentStepIndex}
                    onComplete={advanceStep}
                  />
                </div>
              ) : (
                <div className="pointer-events-auto">
                  <MissionRunner
                    step={currentStep}
                    stepIndex={currentStepIndex}
                    onComplete={advanceStep}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
