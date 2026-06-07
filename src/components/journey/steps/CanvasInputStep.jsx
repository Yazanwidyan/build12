import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTekiStore } from "@/stores/tekiStore";
import { useJourneyStore } from "@/stores/journeyStore";
import Button from "@/components/ui/Button";

export default function CanvasInputStep({ step, onComplete }) {
  const speak          = useTekiStore((s) => s.speak);
  const setHighlight   = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const journey      = useJourneyStore();

  useEffect(() => {
    speak(step.teki || "Click on the website and type!", { mood: "excited" });
    const hl = step.highlight || step.canvasInput?.section;
    if (hl) setHighlight(hl);
    else clearHighlight();
  }, [step.id]);

  const handleDone = () => {
    // Build the section on the final canvas step for this section, then advance.
    // Advance happens immediately so the overlay disappears before the built HTML renders.
    // The observation step that follows handles the celebration.
    if (step.buildSectionOnComplete) {
      journey.buildSection(
        step.buildSectionOnComplete,
        journey.website.sections[step.buildSectionOnComplete]?.content || {}
      );
    }
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="flex flex-col gap-3"
    >
      <p className="text-xs text-muted text-center font-mono">
        ✏ Type directly on your website above
      </p>
      <Button variant="solid" color="blue" fullWidth onClick={handleDone}>
        {step.action || "Looks good!"}
      </Button>
    </motion.div>
  );
}
