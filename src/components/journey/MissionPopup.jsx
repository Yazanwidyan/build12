import { ACTS } from "@/data/curriculum";
import { useMissionEngine } from "@/engines/missionEngine";
import { AnimatePresence, motion } from "framer-motion";

import MissionRunner from "./MissionRunner";

// Step types that render visible interactive UI — everything else (teki-message,
// observation, act-complete) is handled purely through Teki speech + action button.
const POPUP_TYPES = new Set([
  "code-challenge",
  "canvas-input",
  "topic-picker",
  "color-picker",
  "input",
  "visual-builder",
  "react-gateway",
  "react-concept",
  "react-spotlight",
  "react-live-demo",
]);

export default function MissionPopup() {
  const {
    currentMission,
    currentStep,
    currentStepIndex,
    totalSteps,
    advanceStep,
    progressPercent,
  } = useMissionEngine();

  const show = !!(currentMission && currentStep && POPUP_TYPES.has(currentStep.type));
  const act = ACTS.find((a) => a.number === currentMission?.act);
  const accentColor = act?.color ?? "#3b82f6";

  return (
    <>
      {/* Always mount the runner for non-popup steps so they can register their
          step action (and advance the step) even though no popup UI is shown. */}
      {currentMission && currentStep && !POPUP_TYPES.has(currentStep.type) && (
        <div style={{ display: "none" }} aria-hidden="true">
          <MissionRunner
            step={currentStep}
            stepIndex={currentStepIndex}
            onComplete={advanceStep}
          />
        </div>
      )}

      {/* Visual popup — only for interactive steps */}
      <AnimatePresence>
        {show && (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-30 pointer-events-auto"
            style={{
              bottom: 14,
              left: "calc(50% - 190px)",
              width: 380,
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--app-surface)",
                border: "1.5px solid var(--app-border)",
                borderRadius: 16,
                boxShadow: "0 8px 36px rgba(0,0,0,0.14)",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--app-border)" }}
              >
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
                <span className="text-sm font-bold flex-1 truncate" style={{ color: "var(--ink)" }}>
                  {currentMission.title}
                </span>
                <span className="text-xs shrink-0" style={{ color: "var(--ink-faint)" }}>
                  {currentStepIndex + 1} / {totalSteps}
                </span>
              </div>

              {/* Progress bar */}
              <div className="px-4 pt-2 pb-0">
                <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--app-raised)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: accentColor }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Step content */}
              <div className="px-4 pt-3 pb-4">
                <MissionRunner
                  step={currentStep}
                  stepIndex={currentStepIndex}
                  onComplete={advanceStep}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
