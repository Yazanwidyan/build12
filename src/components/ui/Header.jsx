import Button from "@/components/ui/Button";
import LogoCube from "@/components/ui/logos/LogoCube";
import LogoHB from "@/components/ui/logos/LogoHB";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate, useRouterState } from "@tanstack/react-router";

const LOGOS = [
  { L: LogoCube, label: "cube" },
  // { L: LogoHB,   label: "monogram" },
];

export default function Header() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const navLink = (to, label) => {
    const active = location.pathname === to;
    return (
      <button
        key={to}
        onClick={() => navigate({ to })}
        className="relative flex items-center px-3 text-sm font-bold transition-colors"
        style={{ color: active ? "#2cbaff" : "var(--ink-muted)" }}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.color = "var(--ink)";
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.color = "var(--ink-muted)";
        }}
      >
        {label}
        {active && (
          <span
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ background: "#2cbaff" }}
          />
        )}
      </button>
    );
  };

  return (
    <nav className="border-b-2 border-app-border bg-app sticky top-0 z-10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-[54px] flex items-center gap-6">
        <div className="flex items-center gap-1 shrink-0">
          {LOGOS.map(({ L, label }) => (
            <L key={label} />
          ))}
          <span className="font-black text-[1.35rem] text-ink tracking-tighter shrink-0">
            HelloBuildIt
          </span>
        </div>
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
              <Button
                variant="ghost"
                color="neutral"
                size="sm"
                onClick={() => navigate({ to: "/login" })}
              >
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate({ to: "/signup" })}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
