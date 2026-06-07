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

const DEFAULT_TOP = 250;

const FLOAT = {
  animate: { y: [0, -7, 0] },
  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
};

// How long the fade-in lasts before actions unlock
const FADE_MS = 420;

export default function FloatingTeki() {
  const { currentMessage, isTyping, mood, messageTyped, highlightSection } =
    useTekiStore();
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const { currentStep, currentStepIndex, advanceStep } = useMissionEngine();
  const xp = useProgressStore((s) => s.xp);
  const constraintsRef = useRef(null);
  const { sectionBounds } = useWebsiteLayout();

  // Teki travel position
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

  // After the fade completes, advance the message queue
  useEffect(() => {
    if (!currentMessage || !isTyping) return;
    const t = setTimeout(messageTyped, FADE_MS);
    return () => clearTimeout(t);
  }, [currentMessage, isTyping]);

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
        className="fixed z-50 flex flex-col gap-1 select-none"
        style={{
          top: 0,
          right: 20,
          width: 350,
          x: posX,
          y: posY,
          cursor: "grab",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.2 } }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Speech bubble — fades in with purple glow */}
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              className="relative pointer-events-auto"
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  "0 0 28px 8px rgba(99,102,241,0.55)",
                  "0 2px 12px rgba(99,102,241,0.10)",
                ],
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="px-4 py-3 text-sm leading-relaxed"
                style={{
                  backgroundColor: "var(--bubble-bg)",
                  border: "1px solid var(--bubble-border)",
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                }}
              >
                {currentMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom row: Teki + actions */}
        <div className="flex items-start gap-3 mt-1">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <motion.div {...FLOAT}>
              <TekiCharacter size={72} mood={mood} />
            </motion.div>
          </div>

          <div
            className="pointer-events-auto overflow-hidden flex-1 min-w-0"
            style={{
              maxHeight: isTyping ? 0 : "42vh",
              opacity: isTyping ? 0 : 1,
              transition: "opacity 0.2s, max-height 0.25s",
              pointerEvents: isTyping ? "none" : "auto",
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <MissionRunner
                step={currentStep}
                stepIndex={currentStepIndex}
                onComplete={advanceStep}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
