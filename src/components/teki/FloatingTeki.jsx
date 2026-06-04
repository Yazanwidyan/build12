import MissionRunner from "@/components/adventure/MissionRunner";
import { useMissionEngine } from "@/engines/missionEngine";
import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { useProgressStore } from "@/stores/progressStore";
import { useTekiStore } from "@/stores/tekiStore";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import TekiCharacter from "./TekiCharacter";

const DEFAULT_TOP = 250;

const FLOAT = {
  animate:    { y: [0, -7, 0] },
  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
};

export default function FloatingTeki() {
  const {
    currentMessage, displayedText, isTyping, mood,
    setDisplayedText, messageTyped, highlightSection,
  } = useTekiStore();
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const { currentStep, currentStepIndex, advanceStep } = useMissionEngine();
  const xp             = useProgressStore((s) => s.xp);
  const constraintsRef = useRef(null);
  const { sectionBounds } = useWebsiteLayout();

  const shownText = displayedText || currentMessage || "";

  const travelTop = useMemo(() => {
    if (!highlightSection) return null;
    const bound = sectionBounds[highlightSection];
    if (!bound) return null;

    // For canvas-input steps, sit Teki just below the active section so he
    // never overlaps the inline input fields.
    if (currentStep?.type === "canvas-input" && currentStep?.canvasInput?.section) {
      return Math.max(44, Math.min(bound.top + bound.height + 12, window.innerHeight - 220));
    }

    return Math.max(44, bound.top + bound.height / 2 - 36);
  }, [highlightSection, sectionBounds, currentStep?.id]);

  const effectiveTop = travelTop ?? DEFAULT_TOP;

  const posX = useMotionValue(0);
  const posY = useMotionValue(effectiveTop);

  useEffect(() => {
    animate(posX, 0,           { type: "spring", stiffness: 260, damping: 34 });
    animate(posY, effectiveTop, { type: "spring", stiffness: 200, damping: 30 });
  }, [effectiveTop]);

  // Clear stale highlight when the current step doesn't own one
  useEffect(() => {
    const hasHighlight =
      currentStep?.highlight ||
      currentStep?.highlightSection ||
      currentStep?.section ||
      currentStep?.canvasInput?.section;
    if (!hasHighlight) clearHighlight();
  }, [currentStep?.id]);

  // Typewriter
  useEffect(() => {
    if (!isTyping || !currentMessage) return;
    let i = 0;
    setDisplayedText("");
    const iv = setInterval(() => {
      i++;
      setDisplayedText(currentMessage.slice(0, i));
      if (i >= currentMessage.length) {
        clearInterval(iv);
        setTimeout(messageTyped, 900);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [currentMessage, isTyping]);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.06}
        dragMomentum={false}
        className="fixed z-50 flex items-start gap-2 select-none"
        style={{ top: 0, right: 20, x: posX, y: posY, cursor: "grab" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.2 } }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Left panel: bubble + step actions */}
        <div className="flex flex-col gap-2" style={{ width: 280 }}>

          {/* Speech bubble */}
          {shownText && (
            <div className="relative pointer-events-auto">
              <div className="absolute -right-[13px] top-5 w-0 h-0"
                style={{ borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "12px solid var(--app-border)" }} />
              <div className="absolute -right-[11px] top-5 w-0 h-0"
                style={{ borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "11px solid var(--bubble-bg)" }} />
              <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed font-mono shadow-lg"
                style={{ backgroundColor: "var(--bubble-bg)", border: "2px solid var(--app-border)", color: "var(--bubble-text)" }}>
                {shownText}
                {isTyping && (
                  <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse"
                    style={{ background: "#2cbaff" }} />
                )}
              </div>
            </div>
          )}

          {/* Step interaction */}
          <div
            className="pointer-events-auto overflow-hidden"
            style={{
              maxHeight: isTyping ? 0 : "42vh",
              opacity:   isTyping ? 0 : 1,
              transition: "opacity 0.2s, max-height 0.25s",
              pointerEvents: isTyping ? "none" : "auto",
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <MissionRunner step={currentStep} stepIndex={currentStepIndex} onComplete={advanceStep} />
          </div>
        </div>

        {/* TEKI character + XP badge */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <motion.div {...FLOAT}>
            <TekiCharacter size={72} mood={mood} />
          </motion.div>
          <span className="text-xs font-bold" style={{ color: "#fbbf24" }}>⭐ {xp}</span>
        </div>
      </motion.div>
    </>
  );
}
