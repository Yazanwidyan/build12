import Button from "@/components/ui/Button";
import LogoCube from "@/components/ui/logos/LogoCube";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Header({ overlay = false }) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const onDark = overlay && !scrolled;

  const navLink = (to, label) => {
    const active = location.pathname === to;
    return (
      <button
        key={to}
        onClick={() => navigate({ to })}
        className="relative flex items-center px-3 font-semibold transition-colors"
        style={{
          color: active
            ? "#3b82f6"
            : onDark
              ? "rgba(255,255,255,0.7)"
              : "var(--ink-muted)",
        }}
        onMouseEnter={(e) => {
          if (!active)
            e.currentTarget.style.color = onDark ? "#ffffff" : "var(--ink)";
        }}
        onMouseLeave={(e) => {
          if (!active)
            e.currentTarget.style.color = onDark
              ? "rgba(255,255,255,0.7)"
              : "var(--ink-muted)";
        }}
      >
        {label}
        {active && (
          <span
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: "#3b82f6" }}
          />
        )}
      </button>
    );
  };

  const navClass = [
    overlay ? "fixed top-0 left-0 right-0 w-full z-50" : "sticky top-0 z-10",
    overlay && scrolled ? "bg-app border-b-2 border-app-border shadow-sm" : "",
    overlay && !scrolled ? "bg-transparent border-b-2 border-transparent" : "",
    !overlay ? "bg-app border-b-2 border-app-border" : "",
    "backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 h-[54px] flex items-center gap-6">
        <button
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-1 shrink-0"
        >
          <LogoCube size={28} />
          <span
            className="font-black text-[1.35rem] tracking-tighter shrink-0 transition-colors duration-300"
            style={{ color: onDark ? "#ffffff" : "var(--ink)" }}
          >
            HelloBuildIt
          </span>
        </button>
        <div className="hidden md:flex self-stretch items-stretch gap-1">
          {navLink("/about", "About")}
          {navLink("/pricing", "Pricing")}
          {navLink("/contact", "Contact Us")}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button size="sm" onClick={() => navigate({ to: "/dashboard" })}>
              Dashboard
            </Button>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Button
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  onClick={() => navigate({ to: "/login" })}
                >
                  Log in
                </Button>
              )}
              {location.pathname !== "/signup" && (
                <Button size="sm" onClick={() => navigate({ to: "/signup" })}>
                  Sign up
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
