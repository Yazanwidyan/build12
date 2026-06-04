import Blueprint from "@/components/adventure/Blueprint";
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
      {step.highlightSection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="rounded-xl px-4 py-2.5 text-base font-semibold text-center"
          style={{
            backgroundColor: "rgba(44,186,255,0.1)",
            border: "1px solid rgba(44,186,255,0.3)",
            color: "#2cbaff",
          }}
        >
          ✅{" "}
          {step.highlightSection.charAt(0).toUpperCase() +
            step.highlightSection.slice(1)}{" "}
          built!
        </motion.div>
      )}

      <Button variant="solid" color="blue" fullWidth onClick={onComplete}>
        {step.action || "Continue"}
      </Button>
    </motion.div>
  );
}
