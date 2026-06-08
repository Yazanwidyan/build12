import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useJourneyStore } from "@/stores/journeyStore";
import { buildSectionBounds, SECTION_META } from "@/lib/sectionLayout";

const WebsiteLayoutContext = createContext(null);

const FALLBACK_RECT = { top: 90, left: 8, width: 800, right: 808 };

export function WebsiteLayoutProvider({ children }) {
  const [iframeEl, setIframeEl] = useState(null);
  const [iframeRect, setIframeRect] = useState(FALLBACK_RECT);
  const [iframeBounds, setIframeBounds] = useState(null);

  const headerBuilt = useJourneyStore((s) => s.website.sections.header.built);
  const heroBuilt   = useJourneyStore((s) => s.website.sections.hero.built);
  const footerBuilt = useJourneyStore((s) => s.website.sections.footer.built);
  const sections    = useJourneyStore((s) => s.website.sections);

  const iframeRef = useCallback((el) => {
    if (!el) return;
    setIframeEl(el);
    const r = el.getBoundingClientRect();
    setIframeRect({ top: r.top, left: r.left, width: r.width, right: r.right });
  }, []);

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

  // Listen for real section positions reported by the iframe script
  useEffect(() => {
    function onMessage(e) {
      if (e.data?.type !== "section-bounds") return;
      setIframeBounds(e.data);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // When sections change the iframe reloads — clear stale bounds so fallback is used briefly
  useEffect(() => {
    setIframeBounds(null);
  }, [headerBuilt, heroBuilt, footerBuilt]);

  const sectionBounds = useMemo(() => {
    if (iframeBounds) {
      const offset = iframeRect.top;
      return {
        header: { top: offset + iframeBounds.header.top, height: iframeBounds.header.height, ...SECTION_META.header },
        hero:   { top: offset + iframeBounds.hero.top,   height: iframeBounds.hero.height,   ...SECTION_META.hero   },
        footer: { top: offset + iframeBounds.footer.top, height: iframeBounds.footer.height, ...SECTION_META.footer },
      };
    }
    return buildSectionBounds(sections, iframeRect.top);
  }, [iframeBounds, iframeRect.top, headerBuilt, heroBuilt, footerBuilt, sections]);

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
