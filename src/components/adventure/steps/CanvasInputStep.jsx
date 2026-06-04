import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTekiStore } from "@/stores/tekiStore";
import { useAdventureStore } from "@/stores/adventureStore";
import Button from "@/components/ui/Button";

export default function CanvasInputStep({ step, onComplete }) {
  const speak          = useTekiStore((s) => s.speak);
  const setHighlight   = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const adventure      = useAdventureStore();

  useEffect(() => {
    speak(step.teki || "Click on the website and type!", { mood: "excited" });
    const hl = step.highlight || step.canvasInput?.section;
    if (hl) setHighlight(hl);
    else clearHighlight();
  }, [step.id]);

  const handleDone = () => {
    // Always build the section instantly with current content so the preview updates immediately
    const section = step.canvasInput?.section;
    if (section) {
      adventure.buildSection(section, adventure.website.sections[section]?.content || {});
    }

    // Final step for this section — celebrate then advance
    if (step.buildSectionOnComplete) {
      speak("Amazing! Look at that! 🎉", { mood: "excited" });
      setTimeout(onComplete, 700);
    } else {
      onComplete();
    }
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
