import Blueprint from "@/components/journey/Blueprint";
import Button from "@/components/ui/Button";
import { useTekiStore } from "@/stores/tekiStore";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ObservationStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak);
  const setHighlight = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);

  useEffect(() => {
    speak(step.tekiMessages || [step.teki], { mood: step.mood || "excited" });
    const hl = step.highlight || step.highlightSection;
    if (hl) setHighlight(hl);
    else clearHighlight();
  }, [step.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || "Continue"}
      </Button>
    </motion.div>
  );
}
