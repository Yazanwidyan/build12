import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

const TEAM = [
  { name: "Yazan", role: "Founder & Builder", emoji: "🏗️" },
  { name: "TEKI", role: "AI Companion", emoji: "🤖" },
];

const VALUES = [
  {
    emoji: "🎯",
    title: "Learn by Doing",
    desc: "We believe the best way to learn programming is by building real projects from day one — not toy exercises.",
  },
  {
    emoji: "🤝",
    title: "Guided, Not Alone",
    desc: "TEKI walks alongside every builder, giving hints, encouragement, and explanations at every step.",
  },
  {
    emoji: "🌍",
    title: "Accessible to All",
    desc: "HelloBuildIt is free and designed for ages 8–18, regardless of background or prior experience.",
  },
  {
    emoji: "🚀",
    title: "Real-World Skills",
    desc: "Every project produces something real — a deployed website, a working game, a live mobile app.",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full flex flex-col gap-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <TekiCharacter size={90} />
          <div className="flex flex-col gap-3 max-w-2xl">
            <h1 className="text-5xl font-black text-ink leading-tight">
              We believe every kid deserves to build.
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              HelloBuildIt is a coding platform built for ages 8–18 that turns
              learning into real creation — guided by TEKI, your AI companion.
            </p>
          </div>
        </motion.section>

        {/* Mission */}
        <section className="card p-10 flex flex-col gap-4 text-center">
          <p className="section-label">Our Mission</p>
          <p className="text-3xl font-black text-ink leading-snug max-w-3xl mx-auto">
            To make coding education feel like a{" "}
            <span style={{ color: "#3b82f6" }}>journey</span>, not a lecture.
          </p>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            We designed every mission and act to produce something
            tangible — so builders feel the thrill of shipping real work from
            day one.
          </p>
        </section>

        {/* Values */}
        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-black text-ink">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card p-6 flex flex-col gap-3"
              >
                <span className="text-4xl">{v.emoji}</span>
                <h3 className="text-xl font-bold text-ink">{v.title}</h3>
                <p className="text-base text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-black text-ink">The team</h2>
          <div className="flex gap-4 flex-wrap">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="card p-6 flex flex-col items-center gap-3 text-center w-44"
              >
                <span className="text-5xl">{m.emoji}</span>
                <div>
                  <p className="font-bold text-ink text-base">{m.name}</p>
                  <p className="text-sm text-muted">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="card p-10 flex flex-col items-center gap-4 text-center"
          style={{ borderColor: "rgba(59,130,246,0.35)" }}
        >
          <h2 className="text-3xl font-black text-ink">
            Ready to start building?
          </h2>
          <p className="text-lg text-muted">
            Join thousands of young builders on their coding journey.
          </p>
          <Button
            variant="solid"
            color="blue"
            size="lg"
            onClick={() => navigate({ to: "/signup" })}
          >
            Start for free
          </Button>
        </section>
      </main>

      <footer
        className="py-6 text-center text-sm border-t-2"
        style={{ borderColor: "var(--app-border)", color: "var(--ink-faint)" }}
      >
        © {new Date().getFullYear()} HelloBuildIt by HelloWorldKids
      </footer>
    </div>
  );
}
