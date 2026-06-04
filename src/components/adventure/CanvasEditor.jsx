import { useAdventureStore } from "@/stores/adventureStore";
import { useMissionEngine } from "@/engines/missionEngine";
import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

// ── Field configs ──────────────────────────────────────────────────────────────
// `align`  : "start" = left side of iframe, "end" = right side, "center" = iframe center
// `insetX` : pixels inward from the aligned edge (matches the section's CSS padding)
// `offsetTop` : pixels from the section's top (matches where the element sits in the built HTML)
const FIELD_CONFIGS = {
  "header-title": {
    align: "start", insetX: 32,  // header padding-left: 2rem = 32px
    offsetTop: 16,               // header padding-top: 1rem = 16px
    width: "min(260px,38%)",
    style: {
      fontSize: "1.2rem", fontWeight: 800, color: "white",
      background: "rgba(255,255,255,0.15)", border: "2px dashed rgba(255,255,255,0.7)",
      borderRadius: 6, padding: "4px 12px", outline: "none",
    },
  },
  "header-nav": {
    align: "end", insetX: 32,   // header padding-right: 2rem = 32px
    offsetTop: 16,
    width: "min(260px,35%)",
    style: {
      fontSize: "0.875rem", color: "white",
      background: "rgba(255,255,255,0.12)", border: "2px dashed rgba(255,255,255,0.6)",
      borderRadius: 6, padding: "4px 12px", outline: "none", textAlign: "right",
    },
    hint: "Home, About, Contact…",
    isArray: true,
  },
  "hero-headline": {
    align: "center",
    offsetTop: 52,              // within unbuilt hero (180px): upper third
    width: "min(520px,62%)",
    style: {
      fontSize: "1.7rem", fontWeight: 800, textAlign: "center",
      color: "#111827", background: "rgba(255,255,255,0.88)",
      border: "2.5px dashed #2cbaff", borderRadius: 10, padding: "8px 16px", outline: "none",
    },
  },
  "hero-subtext": {
    align: "center",
    offsetTop: 108,             // middle of unbuilt hero
    width: "min(440px,54%)",
    style: {
      fontSize: "1rem", textAlign: "center", color: "#374151",
      background: "rgba(255,255,255,0.85)", border: "2px dashed #2cbaff",
      borderRadius: 8, padding: "6px 14px", outline: "none",
    },
  },
  "hero-button": {
    align: "center",
    offsetTop: 148,             // near bottom of unbuilt hero (155 - some breathing room)
    width: "min(180px,26%)",
    style: {
      fontSize: "0.9rem", fontWeight: 700, textAlign: "center",
      color: "white", background: "rgba(44,186,255,0.8)",
      border: "2px dashed rgba(44,186,255,1)", borderRadius: 8,
      padding: "10px 20px", outline: "none",
    },
  },
  "footer-copyright": {
    align: "center",
    offsetTop: 32,              // footer padding-top: 2rem = 32px
    width: "min(380px,52%)",
    style: {
      fontSize: "0.875rem", textAlign: "center",
      color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.1)",
      border: "1px dashed rgba(255,255,255,0.5)", borderRadius: 6,
      padding: "4px 12px", outline: "none",
    },
  },
  "footer-links": {
    align: "center",
    offsetTop: 64,              // footer: 32px padding + ~12px first line + ~20px gap
    width: "min(340px,48%)",
    style: {
      fontSize: "0.8rem", textAlign: "center",
      color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.08)",
      border: "1px dashed rgba(255,255,255,0.4)", borderRadius: 6,
      padding: "4px 12px", outline: "none",
    },
    hint: "Privacy, Terms, Contact…",
    isArray: true,
  },
};

// ── Single canvas input field ──────────────────────────────────────────────────
function CanvasInput({ fieldKey, canvasInput, sectionTop }) {
  const adventure  = useAdventureStore();
  const { iframeRect } = useWebsiteLayout();
  const cfg = FIELD_CONFIGS[fieldKey];
  const inputRef = useRef(null);

  const getRaw = () => {
    const val = adventure.website.sections[canvasInput.section]?.content[canvasInput.storeKey];
    return Array.isArray(val) ? val.join(", ") : (val || "");
  };

  const handleChange = (raw) => {
    const parsed = cfg.isArray ? raw.split(",").map((s) => s.trim()).filter(Boolean) : raw;
    adventure.updateSection(canvasInput.section, { [canvasInput.storeKey]: parsed });
  };

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 120); }, [fieldKey]);

  // ── Horizontal position relative to measured iframe ──────────────────────────
  const posStyle = {};
  if (cfg.align === "center") {
    posStyle.left = iframeRect.left + iframeRect.width / 2;
    posStyle.transform = "translateX(-50%)";
  } else if (cfg.align === "start") {
    posStyle.left = iframeRect.left + cfg.insetX;
  } else {
    // "end": anchor to iframe right edge, offset inward
    posStyle.left = iframeRect.right - cfg.insetX;
    posStyle.transform = "translateX(-100%)";
  }

  return (
    <motion.div
      key={fieldKey}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        position: "absolute",
        top: sectionTop + cfg.offsetTop,
        width: cfg.width,
        ...posStyle,
      }}
      className="pointer-events-auto"
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{ boxShadow: ["0 0 0 0 rgba(44,186,255,0.4)", "0 0 0 8px rgba(44,186,255,0)", "0 0 0 0 rgba(44,186,255,0)"] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />

      <input
        ref={inputRef}
        type="text"
        defaultValue={getRaw()}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={cfg.hint || canvasInput.placeholder || "Type here…"}
        style={{ width: "100%", display: "block", ...cfg.style }}
      />

      {/* Floating label */}
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{
          position: "absolute", top: -22, left: 4,
          fontSize: 10, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.12em", color: "#2cbaff", whiteSpace: "nowrap",
        }}
      >
        ✏ {canvasInput.label || fieldKey.replace(/-/g, " ")}
      </motion.span>
    </motion.div>
  );
}

// ── Canvas editor root ─────────────────────────────────────────────────────────
export default function CanvasEditor() {
  const { currentStep }   = useMissionEngine();
  const { sectionBounds } = useWebsiteLayout();

  if (!currentStep || currentStep.type !== "canvas-input") return null;

  const { canvasInput } = currentStep;
  if (!canvasInput) return null;

  const sectionTop = sectionBounds[canvasInput.section]?.top ?? 90;

  return (
    <div className="fixed inset-0 z-[30] pointer-events-none">
      <AnimatePresence mode="wait">
        <CanvasInput
          key={currentStep.id}
          fieldKey={canvasInput.fieldKey}
          canvasInput={canvasInput}
          sectionTop={sectionTop}
        />
      </AnimatePresence>
    </div>
  );
}
