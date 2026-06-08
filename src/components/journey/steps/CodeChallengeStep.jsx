import { useStepAction } from "@/contexts/StepActionContext";
import { getExplanation, useAgeConfig } from "@/engines/ageEngine";
import { interpolateCode } from "@/engines/previewEngine";
import { useJourneyStore } from "@/stores/journeyStore";
import { useTekiStore } from "@/stores/tekiStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CodeChallengeStep({ step, onComplete }) {
  const speak = useTekiStore((s) => s.speak);
  const flashChallenge = useTekiStore((s) => s.flashChallenge);
  const website = useJourneyStore((s) => s.website);
  const buildSection = useJourneyStore((s) => s.buildSection);
  const styledSection = useJourneyStore((s) => s.styledSection);
  const enableInteractivity = useJourneyStore((s) => s.enableInteractivity);
  const { ageGroup } = useAgeConfig();
  const { setStepAction } = useStepAction();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    speak(step.teki || "Your turn!", { mood: "thinking" });
    setStepAction({
      label: step.action || "Check my answer!",
      onClick: () => check(),
    });
  }, [step.id]);

  // Re-register so the action closure always sees the latest answers/attempts
  useEffect(() => {
    setStepAction({
      label: step.action || "Check my answer!",
      onClick: () => check(),
    });
  }, [answers, attempts]);

  const explanation = getExplanation(step, ageGroup);
  const code = interpolateCode(step.code, website);

  const parts = code.split(/(___)/);
  let blankIdx = 0;

  const check = () => {
    const count = (code.match(/___/g) || []).length;
    let correct = true;
    for (let i = 0; i < count; i++) {
      const expected = step.blanks?.[i]?.answer || "";
      if ((answers[i] || "").trim().toLowerCase() !== expected.toLowerCase()) {
        correct = false;
        break;
      }
    }
    const verdict = correct ? "correct" : "wrong";
    setResult(verdict);
    flashChallenge(verdict);
    setAttempts((a) => a + 1);
    if (correct) {
      // Apply completion effect — makes something visible on the website preview
      const fx = step.completionEffect;
      if (fx) {
        if (fx.buildSection) buildSection(fx.buildSection);
        if (fx.styleSection) styledSection(fx.styleSection);
        if (fx.enableInteractivity) enableInteractivity();
      }
      speak(
        [step.successMessage || "Perfect! 🎯", "You're writing real code!"],
        { mood: "excited" },
      );
      setTimeout(onComplete, 2000);
    } else {
      speak(
        attempts >= 1
          ? [`Hint: the answer is "${step.blanks?.[0]?.answer}"!`]
          : ["Almost! Try again — you're close!"],
        { mood: "happy" },
      );
      setTimeout(() => setResult(null), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm leading-relaxed">
        {parts.map((part, i) => {
          if (part === "___") {
            const bi = blankIdx++;
            return (
              <input
                key={i}
                value={answers[bi] || ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [bi]: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && check()}
                placeholder={
                  ageGroup === "young" ? step.blanks?.[bi]?.answer : "..."
                }
                className="inline-block rounded px-1.5 focus:outline-none w-16 text-center"
                style={{
                  backgroundColor: "rgba(59,130,246,0.1)",
                  border: "2px solid #3b82f6",
                  color: "#93c5fd",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
                autoFocus={bi === 0}
              />
            );
          }
          return (
            <span key={i} className="text-gray-300 whitespace-pre-wrap">
              {part}
            </span>
          );
        })}
      </div>


      {explanation && (
        <div
          className="rounded-xl p-3"
          style={{
            backgroundColor: "#fffbeb",
            border: "1px solid #fcd34d",
          }}
        >
          <p
            className="text-sm leading-relaxed font-medium"
            style={{
              color: "#92400e",
            }}
          >
            💡 {explanation}
          </p>
        </div>
      )}
    </motion.div>
  );
}
