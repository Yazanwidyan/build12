import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

const CONTACT_OPTIONS = [
  {
    icon: <Mail size={20} />,
    title: "Email us",
    desc: "hello@helloworldkids.org",
    color: "#2cbaff",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "General enquiries",
    desc: "Questions about the platform",
    color: "#22c55e",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Curriculum & edu",
    desc: "For schools and educators",
    color: "#8b5cf6",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full flex flex-col gap-16">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center flex flex-col gap-3"
        >
          <h1 className="text-5xl font-black text-ink">Get in touch</h1>
          <p className="text-xl text-muted max-w-md mx-auto">
            We'd love to hear from you — whether it's a question, a bug, or just
            a hello.
          </p>
        </motion.section>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Contact options */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            {CONTACT_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card p-5 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: opt.color + "18",
                    color: opt.color,
                    border: `2px solid ${opt.color}35`,
                  }}
                >
                  {opt.icon}
                </div>
                <div>
                  <p className="font-bold text-ink text-base">{opt.title}</p>
                  <p className="text-sm text-muted mt-0.5">{opt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-8 flex-1"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <span className="text-6xl">🎉</span>
                <h2 className="text-3xl font-black text-ink">Message sent!</h2>
                <p className="text-lg text-muted max-w-sm">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <Button
                  variant="outline"
                  color="neutral"
                  onClick={() => setSent(false)}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-2xl font-black text-ink">
                  Send us a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your name"
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={set("name")}
                  />
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="ada@example.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="What's it about?"
                  value={form.subject}
                  onChange={set("subject")}
                />

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-base font-semibold"
                    style={{ color: "var(--ink)" }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us everything..."
                    value={form.message}
                    onChange={set("message")}
                    className="input-base resize-none"
                  />
                </div>

                <Button
                  variant="solid"
                  color="blue"
                  size="lg"
                  type="submit"
                  loading={loading}
                  disabled={!form.name || !form.email || !form.message}
                >
                  Send message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
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
