import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { useMissionEngine } from "@/engines/missionEngine";
import { useJourneyStore } from "@/stores/journeyStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

// ── Field pixel widths ─────────────────────────────────────────────────────────
// These are the pixel caps from `min(Xpx, Y%)` in the width values below.
// Used to compute exact `left` positions without CSS transform (which conflicts
// with Framer Motion's own transform system).
const PIXEL_WIDTHS = {
  "header-title": 260,
  "header-nav": 260,
  "hero-headline": 520,
  "hero-subtext": 440,
  "hero-button": 180,
  "footer-copyright": 380,
  "footer-links": 340,
};

// ── Field configs ──────────────────────────────────────────────────────────────
// `align`    : "start" | "center" | "end" — relative to iframe bounds
// `insetX`   : pixels inward from the aligned edge (matches CSS section padding)
// `offsetTop`: pixels from the section top
const FIELD_CONFIGS = {
  "header-title": {
    align: "start",
    insetX: 32,
    offsetTop: 12,
    width: "min(260px,38%)",
    style: {
      fontSize: "1.1rem",
      fontWeight: 800,
      color: "#1e293b",
      background: "rgba(255,255,255,0.92)",
      border: "2px dashed #3b82f6",
      borderRadius: 6,
      padding: "4px 12px",
      outline: "none",
    },
  },
  "header-nav": {
    align: "end",
    insetX: 32,
    offsetTop: 12,
    width: "min(260px,35%)",
    style: {
      fontSize: "0.875rem",
      color: "#1e293b",
      background: "rgba(255,255,255,0.92)",
      border: "2px dashed #3b82f6",
      borderRadius: 6,
      padding: "4px 12px",
      outline: "none",
      textAlign: "right",
    },
    hint: "Home, About, Contact…",
    isArray: true,
  },
  "hero-headline": {
    align: "center",
    offsetTop: 105, // within 320px unbuilt hero (centered content area)
    width: "min(520px,62%)",
    style: {
      fontSize: "1.7rem",
      fontWeight: 800,
      textAlign: "center",
      color: "#111827",
      background: "rgba(255,255,255,0.92)",
      border: "2.5px dashed #3b82f6",
      borderRadius: 10,
      padding: "8px 16px",
      outline: "none",
    },
  },
  "hero-subtext": {
    align: "center",
    offsetTop: 170, // below headline in the 320px section
    width: "min(440px,54%)",
    style: {
      fontSize: "1rem",
      textAlign: "center",
      color: "#374151",
      background: "rgba(255,255,255,0.9)",
      border: "2px dashed #3b82f6",
      borderRadius: 8,
      padding: "6px 14px",
      outline: "none",
    },
  },
  "hero-button": {
    align: "center",
    offsetTop: 228, // below subtext in the 320px section
    width: "min(180px,26%)",
    style: {
      fontSize: "0.9rem",
      fontWeight: 700,
      textAlign: "center",
      color: "white",
      background: "rgba(59,130,246,0.85)",
      border: "2px dashed rgba(59,130,246,1)",
      borderRadius: 8,
      padding: "10px 20px",
      outline: "none",
    },
  },
  "footer-copyright": {
    align: "center",
    offsetTop: 32,
    width: "min(380px,52%)",
    style: {
      fontSize: "0.875rem",
      textAlign: "center",
      color: "rgba(255,255,255,0.85)",
      background: "rgba(255,255,255,0.1)",
      border: "1px dashed rgba(255,255,255,0.55)",
      borderRadius: 6,
      padding: "4px 12px",
      outline: "none",
    },
  },
  "footer-links": {
    align: "center",
    offsetTop: 68,
    width: "min(340px,48%)",
    style: {
      fontSize: "0.8rem",
      textAlign: "center",
      color: "rgba(255,255,255,0.7)",
      background: "rgba(255,255,255,0.08)",
      border: "1px dashed rgba(255,255,255,0.4)",
      borderRadius: 6,
      padding: "4px 12px",
      outline: "none",
    },
    hint: "Privacy, Terms, Contact…",
    isArray: true,
  },
};

// ── Single canvas input field ──────────────────────────────────────────────────
function CanvasInput({ fieldKey, canvasInput, sectionTop }) {
  const journey = useJourneyStore();
  const { iframeRect } = useWebsiteLayout();
  const cfg = FIELD_CONFIGS[fieldKey];
  const inputRef = useRef(null);
  const pixelWidth = PIXEL_WIDTHS[fieldKey] ?? 300;

  const getRaw = () => {
    const val =
      journey.website.sections[canvasInput.section]?.content[
        canvasInput.storeKey
      ];
    return Array.isArray(val) ? val.join(", ") : val || "";
  };

  const handleChange = (raw) => {
    const parsed = cfg.isArray
      ? raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : raw;
    journey.updateSection(canvasInput.section, {
      [canvasInput.storeKey]: parsed,
    });
  };

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 120);
  }, [fieldKey]);

  // ── Compute exact pixel left — no CSS transform (conflicts with Framer Motion) ──
  let leftPx;
  if (cfg.align === "center") {
    leftPx = iframeRect.left + iframeRect.width / 2 - pixelWidth / 2;
  } else if (cfg.align === "start") {
    leftPx = iframeRect.left + cfg.insetX;
  } else {
    // "end"
    leftPx = iframeRect.right - cfg.insetX - pixelWidth;
  }

  return (
    <motion.div
      key={fieldKey}
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        position: "absolute",
        top: sectionTop + cfg.offsetTop,
        left: leftPx,
        width: cfg.width,
      }}
      className="pointer-events-auto"
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(59,130,246,0.4)",
            "0 0 0 8px rgba(59,130,246,0)",
            "0 0 0 0 rgba(59,130,246,0)",
          ],
        }}
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
    </motion.div>
  );
}

// ── Canvas editor root ─────────────────────────────────────────────────────────
// Input is now rendered inside MissionPopup (CanvasInputStep) so the preview
// stays clean and the user can watch their text appear live in the website above.
export default function CanvasEditor() {
  return null;
}
