import ActProgress from "@/components/journey/ActProgress";
import BrowserChrome from "@/components/journey/BrowserChrome";
import CanvasEditor from "@/components/journey/CanvasEditor";
import JourneyIntro from "@/components/journey/JourneyIntro";
import JourneyOverlay from "@/components/journey/JourneyOverlay";
import MissionPanel from "@/components/journey/MissionPanel";
import QuizOverlay from "@/components/journey/QuizOverlay";
import WebsitePreview from "@/components/journey/WebsitePreview";
import FloatingTeki from "@/components/teki/FloatingTeki";
import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import { StepActionProvider } from "@/contexts/StepActionContext";
import { WebsiteLayoutProvider } from "@/contexts/WebsiteLayoutContext";
import { LEVEL_INFO } from "@/data/curriculum";
import { useJourneyStore } from "@/stores/journeyStore";
import { useProfileStore } from "@/stores/profileStore";
import { useTekiStore } from "@/stores/tekiStore";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
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

// ── Main journey page ──────────────────────────────────────────────────────────
export default function JourneyPage() {
  const navigate = useNavigate();
  const journey = useJourneyStore();
  const profile = useProfileStore();
  const speak = useTekiStore((s) => s.speak);
  const challengeFlash = useTekiStore((s) => s.challengeFlash);
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

  const cardStyle = {
    backgroundColor: "var(--app-surface)",
    border: "1.5px solid var(--app-border)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  };

  return (
    <WebsiteLayoutProvider>
      <StepActionProvider>
        <div
          className="h-screen w-screen overflow-hidden flex gap-3 p-3"
          style={{ backgroundColor: "var(--app-raised)" }}
        >
          {/* ── Left panel: mission runner (1/3) ── */}
          {introDone && (
            <motion.div
              className="flex flex-col overflow-hidden rounded-2xl shrink-0"
              animate={{
                boxShadow: challengeFlash === "correct"
                  ? "0 0 0 2px #4ade80, 0 0 32px rgba(74,222,128,0.45)"
                  : challengeFlash === "wrong"
                    ? "0 0 0 2px #f87171, 0 0 32px rgba(248,113,113,0.45)"
                    : "0 2px 16px rgba(0,0,0,0.07)",
                borderColor: challengeFlash === "correct"
                  ? "#4ade80"
                  : challengeFlash === "wrong"
                    ? "#f87171"
                    : "var(--app-border)",
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: "33%",
                minWidth: 280,
                maxWidth: 420,
                backgroundColor: "var(--app-surface)",
                border: "1.5px solid var(--app-border)",
              }}
            >
              <ActProgress />
              <div className="flex-1 overflow-hidden">
                <MissionPanel />
              </div>
            </motion.div>
          )}

          {/* ── Right panel: website preview with browser chrome (2/3) ── */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)", borderRadius: 16, border: "1.5px solid var(--app-border)" }}
          >
            <BrowserChrome
              website={journey.website}
              onExit={() => navigate({ to: "/dashboard" })}
              builderName={profile.builderName}
            >
              <WebsitePreview />
              {introDone && <JourneyOverlay />}
              {introDone && <CanvasEditor />}
            </BrowserChrome>
          </div>

          {/* ── Floating TEKI (speech + action button) ── */}
          {introDone && <FloatingTeki />}

          {/* ── Quiz overlay ── */}
          <QuizOverlay />

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
      </StepActionProvider>
    </WebsiteLayoutProvider>
  );
}
