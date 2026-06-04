import { CharacterPixel, CharacterSpark } from "@/components/ui/BuilderCharacters";
import { useProfileStore } from "@/stores/profileStore";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function JourneyStartPage() {
  const navigate = useNavigate();
  const { builderName, avatar } = useProfileStore();
  const [visible, setVisible] = useState(true);

  const SelectedChar = avatar === "pixel" ? CharacterPixel : CharacterSpark;

  useEffect(() => {
    const fadeOut  = setTimeout(() => setVisible(false), 2800);
    const leave    = setTimeout(() => navigate({ to: "/adventure" }), 3600);
    return () => { clearTimeout(fadeOut); clearTimeout(leave); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#03060e 0%,#050c1a 40%,#080f20 70%,#03060e 100%)" }}>

      {/* Atmosphere glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(44,186,255,0.09) 0%, transparent 70%)" }} />

      <AnimatePresence>
        {visible && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col items-center gap-8 text-center px-6"
          >
            {/* Character */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <SelectedChar size={200} selected />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="flex flex-col items-center gap-1"
            >
              <p className="text-4xl font-black tracking-tight" style={{ color: "#f1f5f9" }}>
                The adventure
              </p>
              <p className="text-4xl font-black tracking-tight" style={{ color: "#2cbaff" }}>
                begins, {builderName || "builder"}!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
