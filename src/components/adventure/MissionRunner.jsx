import { AnimatePresence, motion } from 'framer-motion'
import TekiMessageStep from './steps/TekiMessageStep'
import InputStep from './steps/InputStep'
import ColorPickerStep from './steps/ColorPickerStep'
import TopicPickerStep from './steps/TopicPickerStep'
import VisualBuilderStep from './steps/VisualBuilderStep'
import ObservationStep from './steps/ObservationStep'
import CodeRevealStep from './steps/CodeRevealStep'
import CodeChallengeStep from './steps/CodeChallengeStep'
import ActCompleteStep from './steps/ActCompleteStep'

const STEP_COMPONENTS = {
  'teki-message':   TekiMessageStep,
  'input':          InputStep,
  'color-picker':   ColorPickerStep,
  'topic-picker':   TopicPickerStep,
  'visual-builder': VisualBuilderStep,
  'observation':    ObservationStep,
  'code-reveal':    CodeRevealStep,
  'code-challenge': CodeChallengeStep,
  'act-complete':   ActCompleteStep,
}

export default function MissionRunner({ step, stepIndex, onComplete }) {
  if (!step) return null

  const StepComponent = STEP_COMPONENTS[step.type]

  if (!StepComponent) {
    return (
      <div className="text-center text-sm text-gray-400 py-8">
        Unknown step type: {step.type}
      </div>
    )
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
  )
}
