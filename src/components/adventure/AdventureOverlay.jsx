import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { useTekiStore } from "@/stores/tekiStore";
import { AnimatePresence, motion } from "framer-motion";

const DIM = "rgba(0,0,0,0.45)";

export default function AdventureOverlay() {
  const highlightSection  = useTekiStore((s) => s.highlightSection);
  const generatingSection = useTekiStore((s) => s.generatingSection);
  const { sectionBounds, iframeRect } = useWebsiteLayout();

  const zone = highlightSection ? sectionBounds[highlightSection] : null;

  // Sides of the iframe that aren't the preview (visible on wide screens with max-w)
  const leftGutter  = iframeRect.left;
  const rightGutter = typeof window !== "undefined" ? window.innerWidth - iframeRect.right : 0;

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
            {/* ── Dim panels (9 cells: above, sides, below) ── */}
            {/* Full row above zone */}
            <div className="absolute left-0 right-0"
              style={{ top: 0, height: zone.top, background: DIM }} />
            {/* Full row below zone */}
            <div className="absolute left-0 right-0"
              style={{ top: zone.top + zone.height, bottom: 0, background: DIM }} />
            {/* Left gutter beside zone */}
            {leftGutter > 0 && (
              <div className="absolute"
                style={{ top: zone.top, left: 0, width: leftGutter, height: zone.height, background: DIM }} />
            )}
            {/* Right gutter beside zone */}
            {rightGutter > 0 && (
              <div className="absolute"
                style={{ top: zone.top, right: 0, width: rightGutter, height: zone.height, background: DIM }} />
            )}

            {/* ── Glowing border — aligned to the iframe ── */}
            <div
              className="absolute"
              style={{
                top:    zone.top,
                left:   iframeRect.left,
                width:  iframeRect.width,
                height: zone.height,
                border: `2px solid ${zone.color}`,
                borderRadius: 8,
              }}
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ boxShadow: `inset 0 0 0 1px ${zone.color}66, 0 0 24px ${zone.color}55` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Corner dots */}
              {[
                { top: -3,    left: -3  },
                { top: -3,    right: -3 },
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

              {/* AI generation sweep */}
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
                      style={{ background: "rgba(0,0,0,0.65)", color: zone.color, border: `1px solid ${zone.color}44` }}>
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
