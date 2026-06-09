import { useMissionEngine } from "@/engines/missionEngine";

import MissionRunner from "./MissionRunner";

// Step types that render inside FloatingTeki's bubble — everything else is
// handled here invisibly so the step can register its action and advance.
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
  const { currentMission, currentStep, currentStepIndex, advanceStep } = useMissionEngine();

  if (!currentMission || !currentStep || POPUP_TYPES.has(currentStep.type)) return null;

  return (
    <div style={{ display: "none" }} aria-hidden="true">
      <MissionRunner
        step={currentStep}
        stepIndex={currentStepIndex}
        onComplete={advanceStep}
      />
    </div>
  );
}
