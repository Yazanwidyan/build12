import { AnimatePresence, motion } from "framer-motion";

import ActCompleteStep from "./steps/ActCompleteStep";
import CanvasInputStep from "./steps/CanvasInputStep";
import CodeChallengeStep from "./steps/CodeChallengeStep";
import CodeRevealStep from "./steps/CodeRevealStep";
import ColorPickerStep from "./steps/ColorPickerStep";
import InputStep from "./steps/InputStep";
import ObservationStep from "./steps/ObservationStep";
import ReactConceptStep from "./steps/ReactConceptStep";
import ReactGatewayStep from "./steps/ReactGatewayStep";
import ReactLiveDemoStep from "./steps/ReactLiveDemoStep";
import ReactSpotlightStep from "./steps/ReactSpotlightStep";
import TekiMessageStep from "./steps/TekiMessageStep";
import TopicPickerStep from "./steps/TopicPickerStep";
import VisualBuilderStep from "./steps/VisualBuilderStep";

const STEP_COMPONENTS = {
  "teki-message": TekiMessageStep,
  input: InputStep,
  "color-picker": ColorPickerStep,
  "topic-picker": TopicPickerStep,
  "visual-builder": VisualBuilderStep,
  observation: ObservationStep,
  "code-reveal": CodeRevealStep,
  "code-challenge": CodeChallengeStep,
  "act-complete": ActCompleteStep,
  "canvas-input": CanvasInputStep,
  // ── React-path (Act 9+) ──
  "react-gateway": ReactGatewayStep,
  "react-spotlight": ReactSpotlightStep,
  "react-concept": ReactConceptStep,
  "react-live-demo": ReactLiveDemoStep,
};

export default function MissionRunner({ step, stepIndex, onComplete }) {
  if (!step) return null;

  const StepComponent = STEP_COMPONENTS[step.type];

  if (!StepComponent) {
    return (
      <div className="text-center text-base text-gray-400 py-8">
        Unknown step type: {step.type}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${step.id}-${stepIndex}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <StepComponent step={step} onComplete={onComplete} />
      </motion.div>
    </AnimatePresence>
  );
}
