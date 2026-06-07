import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useJourneyStore } from "@/stores/journeyStore";
import { buildSectionBounds } from "@/lib/sectionLayout";

const WebsiteLayoutContext = createContext(null);

// Fallback before the iframe is measured on first render.
const FALLBACK_RECT = { top: 90, left: 8, width: 800, right: 808 };

export function WebsiteLayoutProvider({ children }) {
  const [iframeEl, setIframeEl] = useState(null);
  const [iframeRect, setIframeRect] = useState(FALLBACK_RECT);

  const headerBuilt = useJourneyStore((s) => s.website.sections.header.built);
  const heroBuilt   = useJourneyStore((s) => s.website.sections.hero.built);
  const footerBuilt = useJourneyStore((s) => s.website.sections.footer.built);
  const sections    = useJourneyStore((s) => s.website.sections);

  // Callback ref: fires synchronously when the iframe mounts/unmounts.
  const iframeRef = useCallback((el) => {
    if (!el) return;
    setIframeEl(el);
    const r = el.getBoundingClientRect();
    setIframeRect({ top: r.top, left: r.left, width: r.width, right: r.right });
  }, []);

  // Re-measure whenever the iframe element changes size (layout animation settling,
  // viewport toggle, window resize) using ResizeObserver + window resize fallback.
  useEffect(() => {
    if (!iframeEl) return;
    const measure = () => {
      const r = iframeEl.getBoundingClientRect();
      setIframeRect((prev) => {
        if (prev.top === r.top && prev.left === r.left && prev.width === r.width) return prev;
        return { top: r.top, left: r.left, width: r.width, right: r.right };
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(iframeEl);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [iframeEl]);

  const sectionBounds = useMemo(
    () => buildSectionBounds(sections, iframeRect.top),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerBuilt, heroBuilt, footerBuilt, iframeRect.top]
  );

  return (
    <WebsiteLayoutContext.Provider value={{ iframeRef, iframeRect, sectionBounds }}>
      {children}
    </WebsiteLayoutContext.Provider>
  );
}

export function useWebsiteLayout() {
  const ctx = useContext(WebsiteLayoutContext);
  if (!ctx) throw new Error("useWebsiteLayout must be used inside WebsiteLayoutProvider");
  return ctx;
}
