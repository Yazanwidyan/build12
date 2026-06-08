import ThemeToggle from "@/components/ui/ThemeToggle";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCw, Star } from "lucide-react";

export default function BrowserChrome({
  website,
  onExit,
  builderName,
  children,
}) {
  const name = website?.name || "My Website";
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const fakeUrl = `https://${slug}.hellobuild.it`;

  return (
    <div
      className="flex flex-col h-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: "var(--app-surface)" }}
    >
      {/* ── Tab bar ── */}
      <div
        className="flex items-center gap-2 px-3 shrink-0"
        style={{
          height: 36,
          borderBottom: "1px solid var(--app-border)",
          backgroundColor: "var(--app-raised)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={onExit}
            title="Exit journey"
            className="w-3 h-3 rounded-full shrink-0 transition-opacity"
            style={{ backgroundColor: "#ff5f57" }}
          />
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: "#febc2e" }}
          />
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: "#28c840" }}
          />
        </div>

        {/* Active tab */}
        <div
          className="flex items-center gap-1.5 px-3 rounded-t-lg text-xs font-medium truncate shrink-0 max-w-[180px] h-full"
          style={{
            backgroundColor: "var(--app-surface)",
            color: "var(--ink-muted)",
            borderLeft: "1px solid var(--app-border)",
            borderRight: "1px solid var(--app-border)",
            borderTop: "1px solid var(--app-border)",
          }}
        >
          <span style={{ fontSize: 11 }}>🌐</span>
          <span className="truncate">{name}</span>
        </div>
      </div>

      {/* ── Address bar ── */}
      <div
        className="flex items-center gap-2 px-3 shrink-0"
        style={{ height: 36, borderBottom: "1px solid var(--app-border)" }}
      >
        {/* Nav buttons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            disabled
            className="w-6 h-6 flex items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--ink-faint)", cursor: "default" }}
          >
            <ArrowLeft size={13} />
          </button>
          <button
            disabled
            className="w-6 h-6 flex items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--ink-faint)", cursor: "default" }}
          >
            <ArrowRight size={13} />
          </button>
          <button
            disabled
            className="w-6 h-6 flex items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--ink-faint)", cursor: "default" }}
          >
            <RotateCw size={12} />
          </button>
        </div>

        {/* URL bar */}
        <div
          className="flex-1 flex items-center gap-2 h-6 rounded-full px-3"
          style={{
            backgroundColor: "var(--app-raised)",
            border: "1px solid var(--app-border)",
          }}
        >
          <span style={{ fontSize: 10, color: "#22c55e" }}>🔒</span>
          <span
            className="text-xs truncate flex-1"
            style={{ color: "var(--ink-faint)", fontFamily: "monospace" }}
          >
            {fakeUrl}
          </span>
        </div>

        {/* Star (decorative) */}
        <button
          disabled
          className="w-6 h-6 flex items-center justify-center shrink-0"
          style={{ color: "var(--ink-faint)", cursor: "default" }}
        >
          <Star size={13} />
        </button>
      </div>

      {/* ── Website content ── */}
      <div className="flex-1 overflow-hidden relative">{children}</div>
    </div>
  );
}
