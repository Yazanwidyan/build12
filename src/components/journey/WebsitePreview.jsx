import Button from "@/components/ui/Button";
import { useWebsiteLayout } from "@/contexts/WebsiteLayoutContext";
import { generateWebsiteHTML } from "@/engines/previewEngine";
import { useJourneyStore } from "@/stores/journeyStore";
import { motion } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

export default function WebsitePreview() {
  const website = useJourneyStore((s) => s.website);
  const reactDemo = useJourneyStore((s) => s.reactDemo);
  const [viewport, setViewport] = useState("desktop");
  const { iframeRef } = useWebsiteLayout();

  const html = generateWebsiteHTML(website, reactDemo);
  const siteName = (website.name || "mywebsite")
    .toLowerCase()
    .replace(/\s+/g, "");

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "var(--app-bg)" }}
    >
      {/* Preview area */}
      <div
        className="flex-1 overflow-hidden flex items-stretch justify-center p-2"
        style={{ backgroundColor: "var(--app-line)" }}
      >
        <motion.div
          layout
          className="overflow-hidden rounded-2xl flex flex-col"
          style={{
            width: viewport === "mobile" ? 375 : "100%",
            maxWidth: viewport === "mobile" ? 375 : 1280,
            boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
            backgroundColor: "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={html}
            className="w-full flex-1 border-0 block"
            title="Website Preview"
            sandbox="allow-scripts"
          />
        </motion.div>
      </div>
    </div>
  );
}
