import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTekiStore } from "@/stores/tekiStore";
import { useAdventureStore } from "@/stores/adventureStore";
import Button from "@/components/ui/Button";

export default function CanvasInputStep({ step, onComplete }) {
  const speak          = useTekiStore((s) => s.speak);
  const setHighlight   = useTekiStore((s) => s.setHighlight);
  const clearHighlight = useTekiStore((s) => s.clearHighlight);
  const setGenerating  = useTekiStore((s) => s.setGenerating);
  const clearGenerating = useTekiStore((s) => s.clearGenerating);
  const adventure      = useAdventureStore();

  useEffect(() => {
    speak(step.teki || "Click on the website and type!", { mood: "excited" });
    const hl = step.highlight || step.canvasInput?.section;
    if (hl) setHighlight(hl);
    else clearHighlight();
  }, [step.id]);

  const handleDone = () => {
    const buildSection = step.buildSectionOnComplete;
    if (buildSection) {
      setGenerating(buildSection);
      const content = adventure.website.sections[buildSection]?.content || {};
      setTimeout(() => {
        adventure.buildSection(buildSection, content);
        clearGenerating();
        speak("Amazing! Look at that! 🎉", { mood: "excited" });
        setTimeout(onComplete, 700);
      }, 1800);
      return;
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
