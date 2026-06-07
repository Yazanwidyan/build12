import CanvasEditor from "@/components/journey/CanvasEditor";
import JourneyIntro from "@/components/journey/JourneyIntro";
import JourneyLog from "@/components/journey/JourneyLog";
import JourneyOverlay from "@/components/journey/JourneyOverlay";
import WebsitePreview from "@/components/journey/WebsitePreview";
import FloatingTeki from "@/components/teki/FloatingTeki";
import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { WebsiteLayoutProvider } from "@/contexts/WebsiteLayoutContext";
import { LEVEL_INFO } from "@/data/curriculum";
import { useJourneyStore } from "@/stores/journeyStore";
import { useProfileStore } from "@/stores/profileStore";
import { useTekiStore } from "@/stores/tekiStore";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollText, X } from "lucide-react";
import { useEffect } from "react";

// ── Level complete overlay ─────────────────────────────────────────────────────
function LevelCompleteScreen({ ageGroup, onGoToDashboard, onOpenBuilder }) {
  const levelInfo = LEVEL_INFO[ageGroup] ?? LEVEL_INFO.young;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 bg-black/60 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center gap-6 text-center"
        style={{
          backgroundColor: "var(--app-surface)",
          border: "1px solid var(--bubble-border)",
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <TekiCharacter size={90} mood="proud" />
        </motion.div>

        <div>
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#3b82f6" }}
          >
            Level Complete!
          </p>
          <h2 className="text-3xl font-black text-ink mb-2">
            {levelInfo.emoji} {levelInfo.label}
          </h2>
          <p className="text-muted text-base leading-relaxed">
            You finished all {levelInfo.totalActs} acts in your level. The
            Website Builder is now unlocked — build anything you imagine!
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button
            variant="solid"
            color="blue"
            fullWidth
            onClick={onOpenBuilder}
          >
            🔓 Open Website Builder
          </Button>
          <Button
            variant="ghost"
            color="neutral"
            fullWidth
            onClick={onGoToDashboard}
          >
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const LOG_WIDTH = 300;

// ── Main journey page ──────────────────────────────────────────────────────────
export default function JourneyPage() {
  const navigate = useNavigate();
  const journey = useJourneyStore();
  const profile = useProfileStore();
  const speak = useTekiStore((s) => s.speak);
  const logPanelOpen = useTekiStore((s) => s.logPanelOpen);
  const toggleLogPanel = useTekiStore((s) => s.toggleLogPanel);
  const logCount = useTekiStore((s) => s.log.length);
  const ageGroup = profile.ageGroup ?? "young";

  const introDone = useJourneyStore((s) => !!s.website?.name);

  useEffect(() => {
    if (!journey.currentJourney) navigate({ to: "/onboarding" });
  }, [journey.currentJourney]);

  useEffect(() => {
    if (!introDone) return;
    const { currentMessage } = useTekiStore.getState();
    if (!currentMessage) {
      speak(
        [
          "Hey! I'm TEKI — your building companion! 👋",
          "Let's bring your website to life!",
        ],
        { mood: "excited" },
      );
    }
  }, [introDone]);

  if (!journey.currentJourney) return null;

  return (
    <WebsiteLayoutProvider>
      <div
        className="h-screen w-screen overflow-hidden flex"
        style={{ backgroundColor: "var(--app-raised)" }}
      >
        {/* ── Log panel — flex child, slides in from left ── */}
        <AnimatePresence initial={false}>
          {logPanelOpen && (
            <motion.div
              key="log-panel"
              className="h-full shrink-0 overflow-hidden z-[28]"
              style={{ width: LOG_WIDTH }}
              initial={{ width: 0 }}
              animate={{ width: LOG_WIDTH }}
              exit={{ width: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <JourneyLog />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main card ── */}
        <div className="flex-1 p-6 flex flex-col overflow-hidden min-w-0">
          <div
            className="flex-1 flex flex-col overflow-hidden rounded-2xl"
            style={{
              backgroundColor: "var(--app-surface)",
              border: "1.5px solid var(--app-border)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            }}
          >
            {/* Top bar — inside the card */}
            <div
              className="h-9 shrink-0 flex items-center gap-2 px-3 border-b"
              style={{ borderColor: "var(--app-border)" }}
            >
              <Button
                variant="ghost"
                color="neutral"
                size="xs"
                icon={<X size={14} />}
                onClick={() => navigate({ to: "/dashboard" })}
              />
              <div className="flex-1" />

              {/* Log toggle */}
              <button
                onClick={toggleLogPanel}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                style={{
                  background: logPanelOpen
                    ? "rgba(59,130,246,0.15)"
                    : "transparent",
                  border: `1px solid ${logPanelOpen ? "rgba(59,130,246,0.4)" : "var(--app-border)"}`,
                  color: logPanelOpen ? "#3b82f6" : "var(--ink-muted)",
                }}
              >
                <ScrollText size={12} />
                Log
                {logCount > 0 && (
                  <span
                    className="rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black"
                    style={{
                      background: logPanelOpen
                        ? "#3b82f6"
                        : "var(--app-raised)",
                      color: logPanelOpen ? "#fff" : "var(--ink-muted)",
                    }}
                  >
                    {logCount > 99 ? "99" : logCount}
                  </span>
                )}
              </button>

              <ThemeToggle />
              <span
                className="text-xs ml-1"
                style={{ color: "var(--ink-faint)" }}
              >
                {profile.builderName}
              </span>
            </div>

            {/* Website preview iframe */}
            <div className="flex-1 overflow-hidden relative">
              <WebsitePreview />

              {/* ── Section highlight overlay ── */}
              {introDone && <JourneyOverlay />}

              {/* ── Inline canvas editor ── */}
              {introDone && <CanvasEditor />}
            </div>
          </div>
        </div>

        {/* ── Floating TEKI (mission driver) ── */}
        {introDone && <FloatingTeki />}

        {/* ── Journey intro overlay ── */}
        {!introDone && <JourneyIntro onDone={() => {}} />}

        {/* ── Level complete overlay ── */}
        {journey.levelComplete && (
          <LevelCompleteScreen
            ageGroup={ageGroup}
            onGoToDashboard={() => navigate({ to: "/dashboard" })}
            onOpenBuilder={() => navigate({ to: "/builder" })}
          />
        )}
      </div>
    </WebsiteLayoutProvider>
  );
}
