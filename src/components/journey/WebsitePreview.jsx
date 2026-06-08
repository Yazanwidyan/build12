import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { generateWebsiteHTML } from "@/engines/previewEngine";
import { useJourneyStore } from "@/stores/journeyStore";
import { useCallback, useEffect, useRef, useState } from "react";

// Keys that require a full iframe reload (structural changes).
// Content-only field changes (title, navLinks, headline, etc.) are sent as
// postMessage DOM patches instead — no reload, no flicker.
function structuralKey(website, reactDemo) {
  const s = website.sections;
  return [
    website.name, website.color, website.topic,
    JSON.stringify(website.styles),
    s.header?.built, s.header?.styled,
    s.hero?.built, s.hero?.styled,
    s.about?.built, s.about?.styled,
    s.features?.built, s.features?.styled,
    s.gallery?.built, s.gallery?.styled,
    s.testimonials?.built, s.testimonials?.styled,
    s.contact?.built, s.contact?.styled,
    s.footer?.built, s.footer?.styled,
    JSON.stringify(reactDemo),
  ].join("|");
}

function contentPayload(website) {
  return {
    siteName: website.sections.header?.content?.title || website.name || "",
    navLinks: website.sections.header?.content?.navLinks || [],
    headline: website.sections.hero?.content?.headline || "",
    subtext: website.sections.hero?.content?.subtext || "",
    buttonText: website.sections.hero?.content?.buttonText || "",
    copyright: website.sections.footer?.content?.copyright || "",
    footerLinks: website.sections.footer?.content?.links || [],
  };
}

export default function WebsitePreview() {
  const website = useJourneyStore((s) => s.website);
  const reactDemo = useJourneyStore((s) => s.reactDemo);
  const { iframeRef: contextIframeRef } = useWebsiteLayout();

  // Local ref for postMessage — iframeRef from context is a callback ref (function),
  // not a ref object, so .current doesn't exist on it.
  const elRef = useRef(null);
  const structKeyRef = useRef(null);
  const [srcDoc, setSrcDoc] = useState(null);

  // Initialize on first render (can't use useState lazy init because we also
  // need to set structKeyRef, which is a side effect — do it in an effect instead).
  useEffect(() => {
    structKeyRef.current = structuralKey(website, reactDemo);
    setSrcDoc(generateWebsiteHTML(website, reactDemo));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // On every website/reactDemo change: patch DOM if only content changed,
  // regenerate srcDoc if structure changed.
  useEffect(() => {
    if (structKeyRef.current === null) return; // still initializing
    const newKey = structuralKey(website, reactDemo);
    if (newKey !== structKeyRef.current) {
      structKeyRef.current = newKey;
      setSrcDoc(generateWebsiteHTML(website, reactDemo));
    } else {
      elRef.current?.contentWindow?.postMessage(
        { type: "content-update", updates: contentPayload(website) },
        "*",
      );
    }
  }, [website, reactDemo]);

  // Dual ref: feed the element to both the context (for section-bounds measurement)
  // and our local ref (for postMessage).
  const setRef = useCallback(
    (el) => {
      contextIframeRef(el);
      elRef.current = el;
    },
    [contextIframeRef],
  );

  if (!srcDoc) return null;

  return (
    <iframe
      ref={setRef}
      srcDoc={srcDoc}
      className="w-full h-full border-0 block"
      title="Website Preview"
      sandbox="allow-scripts"
    />
  );
}
