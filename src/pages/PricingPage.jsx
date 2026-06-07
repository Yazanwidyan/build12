import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to start building.",
    color: "var(--app-border)",
    features: [
      "Website Journey (full access)",
      "TEKI AI companion",
      "50+ guided missions",
      "XP & badge system",
      "Progress tracking",
      "Light & dark mode",
    ],
    cta: "Get started free",
    ctaVariant: "outline",
    ctaColor: "neutral",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    desc: "Unlock every journey and get priority TEKI support.",
    color: "#2cbaff",
    features: [
      "Everything in Free",
      "Game Journey (coming soon)",
      "Mobile Journey (coming soon)",
      "Priority TEKI responses",
      "Parent progress dashboard",
      "Certificate of completion",
      "Early access to new features",
    ],
    cta: "Start Pro — coming soon",
    ctaVariant: "solid",
    ctaColor: "blue",
    highlight: true,
  },
];

const FAQS = [
  {
    q: "Is the free plan really free?",
    a: "Yes — no credit card required. The full Website Journey and all 50+ missions are completely free forever.",
  },
  {
    q: "When does Pro launch?",
    a: "Pro is coming soon. Sign up for free now and you'll be the first to know when it's available.",
  },
  {
    q: "Is HelloBuildIt safe for kids?",
    a: "Absolutely. We don't collect unnecessary data, there's no social feed, and all content is age-appropriate for 8–18.",
  },
  {
    q: "What do I need to get started?",
    a: "Just a browser. No installs, no downloads, no prior coding knowledge needed.",
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full flex flex-col gap-20">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center flex flex-col gap-3"
        >
          <h1 className="text-5xl font-black text-ink">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-muted max-w-lg mx-auto">
            Start for free. Upgrade when you're ready for more.
          </p>
        </motion.section>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-8 flex flex-col gap-6 relative"
              style={plan.highlight ? { borderColor: "#2cbaff" } : {}}
            >
              {plan.highlight && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold"
                  style={{ background: "#2cbaff", color: "#fff" }}
                >
                  Most Popular
                </span>
              )}

              <div className="flex flex-col gap-1">
                <p className="text-base font-bold text-muted uppercase tracking-widest">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-ink">
                    {plan.price}
                  </span>
                  <span className="text-base text-muted mb-2">
                    / {plan.period}
                  </span>
                </div>
                <p className="text-base text-muted">{plan.desc}</p>
              </div>

              <div className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(44,186,255,0.15)" }}
                    >
                      <Check
                        size={11}
                        style={{ color: "#2cbaff" }}
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-base text-ink">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.ctaVariant}
                color={plan.ctaColor}
                fullWidth
                size="lg"
                disabled={plan.highlight}
                onClick={() => !plan.highlight && navigate({ to: "/signup" })}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <section className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
          <h2 className="text-3xl font-black text-ink text-center">
            Frequently asked
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card p-6 flex flex-col gap-2"
              >
                <p className="font-bold text-ink text-base">{faq.q}</p>
                <p className="text-base text-muted leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
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
