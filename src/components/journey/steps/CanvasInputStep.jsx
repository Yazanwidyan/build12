import { useStepAction } from "@/contexts/StepActionContext";
import { useJourneyStore } from "@/stores/journeyStore";
import { useTekiStore } from "@/stores/tekiStore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CanvasInputStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak);
  const setHighlight = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const updateSection = useJourneyStore((s) => s.updateSection);
  const getSection = useJourneyStore((s) => s.website.sections);
  const { setStepAction } = useStepAction();
  const inputRef = useRef(null);

  const { canvasInput } = step;

  const getStored = () => {
    const raw = getSection[canvasInput.section]?.content?.[canvasInput.storeKey];
    return Array.isArray(raw) ? raw.join(", ") : raw || "";
  };

  const [value, setValue] = useState(getStored);
  const [hasTyped, setHasTyped] = useState(false);

  const handleChange = (raw) => {
    setValue(raw);
    setHasTyped(raw.trim().length > 0);
    updateSection(canvasInput.section, {
      [canvasInput.storeKey]: canvasInput.isArray
        ? raw.split(",").map((s) => s.trim()).filter(Boolean)
        : raw,
    });
  };

  // Re-init when step changes (component is remounted via AnimatePresence key,
  // but keep this as a safety net)
  useEffect(() => {
    const initial = getStored();
    setValue(initial);
    setHasTyped(false);

    speak(step.teki || "Fill this in!", { mood: "excited" });

    const hl = step.highlight || canvasInput?.section;
    if (hl) setHighlight(hl);
    else clearHighlight();

    // Use a stable closure — onComplete and clearHighlight are stable store refs
    setStepAction({
      label: step.action || "Looks good!",
      onClick: () => {
        clearHighlight();
        onComplete();
      },
    });

    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  // step.id is the only dep that meaningfully changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.id]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--ink-faint)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {canvasInput.label}
        </span>
        {canvasInput.isArray && (
          <span style={{ fontSize: "0.68rem", color: "var(--ink-faint)", fontStyle: "italic" }}>
            separate with commas
          </span>
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !canvasInput.isArray) {
            clearHighlight();
            onComplete();
          }
        }}
        placeholder={canvasInput.placeholder || "Type here…"}
        style={{
          width: "100%",
          padding: "0.625rem 0.875rem",
          fontSize: "0.9375rem",
          borderRadius: 10,
          border: "2px solid var(--accent)",
          background: "var(--app-raised)",
          color: "var(--ink)",
          outline: "none",
          caretColor: "var(--accent)",
          boxShadow: "0 0 0 3px rgba(59,130,246,0.12)",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      />

      {/* Live indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <motion.div
          animate={
            hasTyped
              ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }
              : { scale: 1, opacity: 0.35 }
          }
          transition={hasTyped ? { duration: 1.1, repeat: Infinity } : {}}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: hasTyped ? "#22c55e" : "var(--ink-faint)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            color: hasTyped ? "#22c55e" : "var(--ink-faint)",
            transition: "color 0.25s",
          }}
        >
          {hasTyped ? "Live — watch your website update above ↑" : "Start typing to see it appear ↑"}
        </span>
      </div>
    </div>
  );
}
