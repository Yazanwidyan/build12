import { useAdventureStore } from "@/stores/adventureStore";
import { useMissionEngine } from "@/engines/missionEngine";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

// Heights of each section in the iframe based on build state
const SECTION_H = {
  header: { built: 62,  unbuilt: 116 },
  hero:   { built: 360, unbuilt: 180 },
  footer: { built: 80,  unbuilt: 100 },
};

const IFRAME_TOP = 90;

function getSectionTop(sections, sectionKey) {
  let top = IFRAME_TOP;
  if (sectionKey === "header") return top;
  top += sections.header.built ? SECTION_H.header.built : SECTION_H.header.unbuilt;
  if (sectionKey === "hero") return top;
  top += sections.hero.built ? SECTION_H.hero.built : SECTION_H.hero.unbuilt;
  return top; // footer
}

// Visual config for each canvas field
const FIELD_CONFIGS = {
  "header-title": {
    offsetTop: 18, centered: false, left: 32,
    width: "min(260px,38%)",
    style: { fontSize:"1.2rem", fontWeight:800, color:"white",
      background:"rgba(255,255,255,0.15)", border:"2px dashed rgba(255,255,255,0.7)",
      borderRadius:6, padding:"4px 12px", outline:"none" },
  },
  "header-nav": {
    offsetTop: 18, centered: false, rightFromPanel: 32,
    width: "min(260px,35%)",
    style: { fontSize:"0.875rem", color:"white",
      background:"rgba(255,255,255,0.12)", border:"2px dashed rgba(255,255,255,0.6)",
      borderRadius:6, padding:"4px 12px", outline:"none", textAlign:"right" },
    hint: "Home, About, Contact…",
    isArray: true,
  },
  "hero-headline": {
    offsetTop: 52, centered: true,
    width: "min(520px,62%)",
    style: { fontSize:"1.7rem", fontWeight:800, textAlign:"center",
      color:"#111827", background:"rgba(255,255,255,0.88)",
      border:"2.5px dashed #2cbaff", borderRadius:10, padding:"8px 16px", outline:"none" },
  },
  "hero-subtext": {
    offsetTop: 116, centered: true,
    width: "min(440px,54%)",
    style: { fontSize:"1rem", textAlign:"center", color:"#374151",
      background:"rgba(255,255,255,0.85)", border:"2px dashed #2cbaff",
      borderRadius:8, padding:"6px 14px", outline:"none" },
  },
  "hero-button": {
    offsetTop: 168, centered: true,
    width: "min(180px,26%)",
    style: { fontSize:"0.9rem", fontWeight:700, textAlign:"center",
      color:"white", background:"rgba(44,186,255,0.8)",
      border:"2px dashed rgba(44,186,255,1)", borderRadius:8,
      padding:"10px 20px", outline:"none" },
  },
  "footer-copyright": {
    offsetTop: 20, centered: true,
    width: "min(380px,52%)",
    style: { fontSize:"0.875rem", textAlign:"center",
      color:"rgba(255,255,255,0.8)", background:"rgba(255,255,255,0.1)",
      border:"1px dashed rgba(255,255,255,0.5)", borderRadius:6,
      padding:"4px 12px", outline:"none" },
  },
  "footer-links": {
    offsetTop: 52, centered: true,
    width: "min(340px,48%)",
    style: { fontSize:"0.8rem", textAlign:"center",
      color:"rgba(255,255,255,0.65)", background:"rgba(255,255,255,0.08)",
      border:"1px dashed rgba(255,255,255,0.4)", borderRadius:6,
      padding:"4px 12px", outline:"none" },
    hint: "Privacy, Terms, Contact…",
    isArray: true,
  },
};

function CanvasInput({ fieldKey, canvasInput, absoluteTop }) {
  const adventure = useAdventureStore();
  const cfg = FIELD_CONFIGS[fieldKey];
  const ref = useRef(null);

  const getRaw = () => {
    const val = adventure.website.sections[canvasInput.section]?.content[canvasInput.storeKey];
    return Array.isArray(val) ? val.join(", ") : (val || "");
  };

  const handleChange = (raw) => {
    const parsed = cfg.isArray ? raw.split(",").map((s) => s.trim()).filter(Boolean) : raw;
    adventure.updateSection(canvasInput.section, { [canvasInput.storeKey]: parsed });
  };

  useEffect(() => { setTimeout(() => ref.current?.focus(), 120); }, [fieldKey]);

  const posStyle = {};
  if (cfg.centered) {
    posStyle.left = "50%";
    posStyle.transform = "translateX(-50%)";
  } else if (cfg.rightFromPanel !== undefined) {
    posStyle.right = cfg.rightFromPanel;
  } else {
    posStyle.left = cfg.left ?? 32;
  }

  return (
    <motion.div
      key={fieldKey}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{ position: "absolute", top: absoluteTop + cfg.offsetTop, width: cfg.width, ...posStyle }}
      className="pointer-events-auto"
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{ boxShadow: ["0 0 0 0 rgba(44,186,255,0.4)", "0 0 0 8px rgba(44,186,255,0)", "0 0 0 0 rgba(44,186,255,0)"] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <input
        ref={ref}
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

export default function CanvasEditor() {
  const { currentStep } = useMissionEngine();
  const sections = useAdventureStore((s) => s.website.sections);

  if (!currentStep || currentStep.type !== "canvas-input") return null;

  const { canvasInput } = currentStep;
  if (!canvasInput) return null;

  const sectionTop = getSectionTop(sections, canvasInput.section);

  return (
    <div className="fixed inset-0 z-[30] pointer-events-none" style={{ right: 380 }}>
      <AnimatePresence mode="wait">
        <CanvasInput
          key={currentStep.id}
          fieldKey={canvasInput.fieldKey}
          canvasInput={canvasInput}
          absoluteTop={sectionTop}
        />
      </AnimatePresence>
    </div>
  );
}
