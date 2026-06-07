import Button from "@/components/ui/Button";
import { LEVEL_INFO, getActsForLevel } from "@/data/curriculum";
import { useProfileStore } from "@/stores/profileStore";
import { useProgressStore } from "@/stores/progressStore";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const JOURNEYS = [
  {
    id: "website",
    label: "Website Journey",
    emoji: "🌐",
    desc: "Build a real website",
    color: "#3b82f6",
    active: true,
    route: "/journey",
  },
  {
    id: "game",
    label: "Game Journey",
    emoji: "🎮",
    desc: "Design a game",
    color: "#10b981",
    active: false,
  },
  {
    id: "mobile",
    label: "Mobile Journey",
    emoji: "📱",
    desc: "Build a mobile app",
    color: "#f59e0b",
    active: false,
  },
];

export default function JourneyCard({ journey: adv }) {
  const navigate = useNavigate();
  const completedActs = useProgressStore((s) => s.completedActs);
  const completedMissions = useProgressStore((s) => s.completedMissions);
  const ageGroup = useProfileStore((s) => s.ageGroup) ?? "young";

  if (!adv.active) {
    return (
      <div
        className="rounded-2xl p-5 opacity-50"
        style={{
          backgroundColor: "var(--app-raised)",
          border: "1px solid var(--app-border)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{adv.emoji}</span>
          <div>
            <h3 className="font-bold text-muted text-base">{adv.label}</h3>
            <p className="text-sm text-faint">{adv.desc}</p>
          </div>
        </div>
        <div
          className="text-sm rounded-lg px-3 py-1.5 text-center font-semibold"
          style={{
            backgroundColor: "var(--app-border)",
            color: "var(--ink-faint)",
          }}
        >
          Coming Soon
        </div>
      </div>
    );
  }

  const levelActs = getActsForLevel(ageGroup);
  const levelInfo = LEVEL_INFO[ageGroup];
  const doneActs = completedActs.filter((id) =>
    levelActs.some((a) => a.id === id),
  ).length;
  const pct =
    levelActs.length > 0 ? Math.round((doneActs / levelActs.length) * 100) : 0;
  const started = completedMissions.length > 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card-hover p-5"
      onClick={() => navigate({ to: adv.route })}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl">{adv.emoji}</span>
        <div>
          <h3 className="font-bold text-ink text-base">{adv.label}</h3>
          <p className="text-sm text-muted">{adv.desc}</p>
        </div>
      </div>
      <div className="mb-3">
        <div
          className="flex justify-between text-sm mb-1"
          style={{ color: "var(--ink-faint)" }}
        >
          <span>
            {levelInfo?.emoji} {doneActs}/{levelActs.length} acts ·{" "}
            {levelInfo?.label}
          </span>
          <span className="font-mono font-bold">{pct}%</span>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
      <Button
        variant="solid"
        color="blue"
        size="sm"
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          navigate({ to: adv.route });
        }}
      >
        {started ? "Continue Learning" : "Start Learning"}
      </Button>
    </motion.div>
  );
}
