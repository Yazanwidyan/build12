import { useAdventureStore } from "@/stores/adventureStore";
import { useTekiStore } from "@/stores/tekiStore";
import { AnimatePresence, motion } from "framer-motion";

const SECTION_H = {
  header: { built: 62,  unbuilt: 116 },
  hero:   { built: 360, unbuilt: 180 },
  footer: { built: 80,  unbuilt: 100 },
};
const IFRAME_TOP = 90;

const SECTION_META = {
  header: { label: "Header",       color: "#2cbaff" },
  hero:   { label: "Hero Section", color: "#8b5cf6" },
  footer: { label: "Footer",       color: "#10b981" },
};

function buildZones(sections) {
  const hH = sections.header.built ? SECTION_H.header.built : SECTION_H.header.unbuilt;
  const roH = sections.hero.built   ? SECTION_H.hero.built   : SECTION_H.hero.unbuilt;
  const fH = sections.footer.built  ? SECTION_H.footer.built : SECTION_H.footer.unbuilt;
  return {
    header: { top: IFRAME_TOP,           height: hH,  ...SECTION_META.header },
    hero:   { top: IFRAME_TOP + hH,      height: roH, ...SECTION_META.hero   },
    footer: { top: IFRAME_TOP + hH + roH, height: fH, ...SECTION_META.footer },
  };
}

const DIM = "rgba(0,0,0,0.45)";
const PANEL_W = 400; // width reserved for FloatingTeki panel

export default function AdventureOverlay() {
  const highlightSection  = useTekiStore((s) => s.highlightSection);
  const generatingSection = useTekiStore((s) => s.generatingSection);
  const sections          = useAdventureStore((s) => s.website.sections);

  const ZONES = buildZones(sections);
  const zone  = highlightSection ? ZONES[highlightSection] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[25]">
      <AnimatePresence>
        {zone && (
          <motion.div
            key={highlightSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* ── Four dim panels — no 9999px shadow ── */}
            {/* Above zone */}
            <div className="absolute left-0 right-0" style={{ top: 0, height: zone.top, background: DIM }} />
            {/* Below zone */}
            <div className="absolute left-0 right-0" style={{ top: zone.top + zone.height, bottom: 0, background: DIM }} />
            {/* Right of zone (FloatingTeki panel area) */}
            <div className="absolute" style={{ top: zone.top, height: zone.height, right: 0, width: PANEL_W, background: DIM }} />

            {/* ── Glowing border — static, only opacity pulses ── */}
            <div
              className="absolute"
              style={{
                top: zone.top, left: 0, right: PANEL_W, height: zone.height,
                border: `2px solid ${zone.color}`,
                borderRadius: 8,
              }}
            >
              {/* Pulsing glow overlay — opacity only, GPU-friendly */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ boxShadow: `inset 0 0 0 1px ${zone.color}66, 0 0 24px ${zone.color}55` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Corner dots — pure CSS, no SVG overhead */}
              {[
                { top: -3,   left: -3   },
                { top: -3,   right: -3  },
                { bottom: -3, left: -3  },
                { bottom: -3, right: -3 },
              ].map((pos, i) => (
                <div key={i} className="absolute w-2 h-2 rounded-full"
                  style={{ ...pos, background: zone.color }} />
              ))}

              {/* Section label */}
              <div className="absolute -top-6 left-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-black text-white tracking-widest uppercase"
                  style={{ background: zone.color }}>
                  {zone.label}
                </span>
              </div>

              {/* AI generation sweep — only when generating */}
              {generatingSection === highlightSection && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    style={{ background: `linear-gradient(90deg,transparent,${zone.color}33,transparent)` }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold"
                      style={{ background:"rgba(0,0,0,0.65)", color: zone.color, border:`1px solid ${zone.color}44` }}>
                      ✦ Building {zone.label}…
                    </span>
                  </div>
                </>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
