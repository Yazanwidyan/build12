import { useJourneyStore } from "@/stores/journeyStore";
import { useTekiStore } from "@/stores/tekiStore";
import { useStepAction } from "@/contexts/StepActionContext";
import { useEffect } from "react";

export default function CanvasInputStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak);
  const setHighlight = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const journey = useJourneyStore();
  const { setStepAction } = useStepAction();

  const handleDone = () => {
    if (step.buildSectionOnComplete) {
      journey.buildSection(
        step.buildSectionOnComplete,
        journey.website.sections[step.buildSectionOnComplete]?.content || {},
      );
    }
    onComplete();
  };

  useEffect(() => {
    speak(step.teki || "Click on the website and type!", { mood: "excited" });
    const hl = step.highlight || step.canvasInput?.section;
    if (hl) setHighlight(hl);
    else clearHighlight();
    setStepAction({ label: step.action || "Looks good!", onClick: handleDone });
  }, [step.id]);

  return null;
}
