import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { generateWebsiteHTML } from "@/engines/previewEngine";
import { useJourneyStore } from "@/stores/journeyStore";

export default function WebsitePreview() {
  const website = useJourneyStore((s) => s.website);
  const reactDemo = useJourneyStore((s) => s.reactDemo);
  const { iframeRef } = useWebsiteLayout();

  const html = generateWebsiteHTML(website, reactDemo);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      className="w-full h-full border-0 block"
      title="Website Preview"
      sandbox="allow-scripts"
    />
  );
}
