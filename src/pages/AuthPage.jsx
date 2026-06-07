import TekiCharacter from "@/components/teki/TekiCharacter";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function AuthPage({ mode = "signup" }) {
  const navigate = useNavigate();
  const { signup, login } = useAuthStore();
  const profile = useProfileStore();
  const [error, setError] = useState("");
  const isSignup = mode === "signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  });

  const onSubmit = (data) => {
    setError("");
    if (isSignup) {
      signup(data.email, data.password);
      navigate({ to: "/onboarding" });
    } else {
      const r = login(data.email, data.password);
      if (r.success)
        navigate({
          to: profile.onboardingComplete ? "/dashboard" : "/onboarding",
        });
      else setError(r.error);
    }
  };

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <Header />

      <div
        className="flex-1 flex flex-col items-center p-4"
        style={{ paddingTop: "3.8rem" }}
      >
        <div className="w-full max-w-md flex flex-col items-center gap-4">
          {/* TEKI + Speech bubble side by side */}
          <div className="flex items-center gap-6 w-full">
            {/* TEKI */}
            <motion.div
              className="shrink-0"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <TekiCharacter size={65} mood={isSignup ? "excited" : "happy"} />
            </motion.div>

            {/* Speech bubble with left-pointing tail */}
            <div className="relative flex-1">
              {/* Left tail — border layer */}

              {/* Left tail — fill layer */}

              <div
                className="w-full rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={{
                  backgroundColor: "var(--bubble-bg)",
                  border: "1px solid var(--bubble-border)",
                  borderRadius: 20,
                  boxShadow: "var(--bubble-shadow)",
                  color: "var(--ink-muted)",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {isSignup
                  ? "Hey there! Let's create your builder account!"
                  : "Welcome back, builder! Ready to get back to building?"}
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="card p-8 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />
              {error && (
                <p className="text-base text-red-400 text-center">{error}</p>
              )}
              <Button
                variant="solid"
                color="blue"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                {isSignup ? "Create account" : "Log in"}
              </Button>
            </form>

            <p className="text-base text-muted text-center mt-4">
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <Button
                variant="link"
                color="blue"
                size="sm"
                onClick={() =>
                  navigate({ to: isSignup ? "/login" : "/signup" })
                }
              >
                {isSignup ? "Log in" : "Sign up free"}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
