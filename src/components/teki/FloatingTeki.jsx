import MissionRunner from "@/components/adventure/MissionRunner";
import { useMissionEngine } from "@/engines/missionEngine";
import { useAdventureStore } from "@/stores/adventureStore";
import { useProgressStore } from "@/stores/progressStore";
import { useTekiStore } from "@/stores/tekiStore";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import TekiCharacter from "./TekiCharacter";

const SECTION_H = {
  header: { built: 62,  unbuilt: 116 },
  hero:   { built: 360, unbuilt: 180 },
  footer: { built: 80,  unbuilt: 100 },
};
const IFRAME_TOP  = 90;   // top bar (36px) + browser chrome (~54px)
const DEFAULT_TOP = 250;  // resting position when no section is highlighted

// offsetTop of each canvas-input field within its section (mirrors CanvasEditor FIELD_CONFIGS)
const FIELD_OFFSET_TOP = {
  'header-title':     18,
  'header-nav':       18,
  'hero-headline':    52,
  'hero-subtext':    116,
  'hero-button':     168,
  'footer-copyright': 20,
  'footer-links':     52,
};

function getSectionTop(key, sections) {
  let top = IFRAME_TOP;
  if (key === 'header') return top;
  top += sections.header.built ? SECTION_H.header.built : SECTION_H.header.unbuilt;
  if (key === 'hero') return top;
  top += sections.hero.built ? SECTION_H.hero.built : SECTION_H.hero.unbuilt;
  return top;
}

function getSectionCenter(key, sections) {
  return getSectionTop(key, sections) + (sections[key].built ? SECTION_H[key].built : SECTION_H[key].unbuilt) / 2;
}

const FLOAT = {
  animate:    { y: [0, -7, 0] },
  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
};

export default function FloatingTeki() {
  const {
    currentMessage, displayedText, isTyping, mood,
    setDisplayedText, messageTyped, highlightSection,
  } = useTekiStore();
  const headerBuilt    = useAdventureStore((s) => s.website.sections.header.built);
  const heroBuilt      = useAdventureStore((s) => s.website.sections.hero.built);
  const footerBuilt    = useAdventureStore((s) => s.website.sections.footer.built);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const { currentStep, currentStepIndex, advanceStep } = useMissionEngine();
  const xp             = useProgressStore((s) => s.xp);
  const constraintsRef = useRef(null);

  const shownText = displayedText || currentMessage || "";

  const travelTop = useMemo(() => {
    if (!highlightSection) return null;
    const sections = {
      header: { built: headerBuilt },
      hero:   { built: heroBuilt },
      footer: { built: footerBuilt },
    };

    // For canvas-input steps, align Teki with the specific field being edited
    if (currentStep?.type === 'canvas-input' && currentStep?.canvasInput?.fieldKey) {
      const { fieldKey, section } = currentStep.canvasInput;
      const sTop    = getSectionTop(section, sections);
      const fOffset = FIELD_OFFSET_TOP[fieldKey] ?? 18;
      return Math.max(44, sTop + fOffset);
    }

    return Math.max(44, getSectionCenter(highlightSection, sections) - 36);
  }, [highlightSection, headerBuilt, heroBuilt, footerBuilt, currentStep?.id]);

  const effectiveTop = travelTop ?? DEFAULT_TOP;

  // Clear stale highlight when current step doesn't own one
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
      style={{ right: 20, cursor: 'grab' }}
      whileDrag={{ cursor: 'grabbing' }}
      initial={{ opacity: 0, x: 30, top: effectiveTop }}
      animate={{ opacity: 1, x: 0, top: effectiveTop }}
      transition={{
        opacity: { duration: 0.2 },
        x:   { type: "spring", stiffness: 260, damping: 34 },
        top: { type: "spring", stiffness: 200, damping: 30 },
      }}
    >
      {/* Left panel: bubble + step actions */}
      <div className="flex flex-col gap-2" style={{ width: 280 }}>

        {/* Speech bubble */}
        {shownText && (
          <div className="relative pointer-events-auto">
            {/* Border tail */}
            <div
              className="absolute -right-[13px] top-5 w-0 h-0"
              style={{
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
                borderLeft: "12px solid var(--app-border)",
              }}
            />
            {/* Fill tail */}
            <div
              className="absolute -right-[11px] top-5 w-0 h-0"
              style={{
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "11px solid var(--bubble-bg)",
              }}
            />
            <div
              className="rounded-2xl px-4 py-3 text-sm leading-relaxed font-mono shadow-lg"
              style={{
                backgroundColor: "var(--bubble-bg)",
                border: "2px solid var(--app-border)",
                color: "var(--bubble-text)",
              }}
            >
              {shownText}
              {isTyping && (
                <span
                  className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse"
                  style={{ background: "#2cbaff" }}
                />
              )}
            </div>
          </div>
        )}

        {/* Step interaction — always mounted so speak() fires once per step.
            Collapsed + hidden while Teki is typing. */}
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
          <MissionRunner
            step={currentStep}
            stepIndex={currentStepIndex}
            onComplete={advanceStep}
          />
        </div>
      </div>

      {/* TEKI character + XP badge */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <motion.div {...FLOAT}>
          <TekiCharacter size={72} mood={mood} />
        </motion.div>
        <span className="text-xs font-bold" style={{ color: "#fbbf24" }}>
          ⭐ {xp}
        </span>
      </div>
    </motion.div>
    </>
  );
}
