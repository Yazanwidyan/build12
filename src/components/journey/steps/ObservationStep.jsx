import { useEffect } from "react";
import { useTekiStore } from "@/stores/tekiStore";
import { useStepAction } from "@/contexts/StepActionContext";

export default function ObservationStep({ step, onComplete }) {
  const speak          = useTekiStore((s) => s.speak);
  const setHighlight   = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const isTyping       = useTekiStore((s) => s.isTyping);
  const { setStepAction } = useStepAction();

  useEffect(() => {
    speak(step.tekiMessages || [step.teki], { mood: step.mood || "excited" });
    const hl = step.highlight || step.highlightSection;
    if (hl) setHighlight(hl);
    else clearHighlight();
    setStepAction(step.autoAdvance ? null : { label: step.action || "Continue", onClick: onComplete });
  }, [step.id]);

  useEffect(() => {
    if (!step.autoAdvance || isTyping) return;
    const t = setTimeout(onComplete, step.autoAdvanceDelay ?? 2200);
    return () => clearTimeout(t);
  }, [step.autoAdvance, isTyping]);

  return null;
}
