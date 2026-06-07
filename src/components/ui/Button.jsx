import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classes) => twMerge(clsx(classes));

// ── Color tokens ───────────────────────────────────────────────────────────────
// base   = fill
// shadow = hard offset shadow color (no blur)
// border = border color
// text   = for outline / soft / ghost
// soft   = translucent tint fill
const COLORS = {
  blue: {
    base: "#3b82f6",
    shadow: "#1e3a8a",
    border: "#1d4ed8",
    text: "#60a5fa",
    soft: "rgba(59,130,246,0.12)",
    softBorder: "rgba(59,130,246,0.4)",
  },
  green: {
    base: "#22c55e",
    shadow: "#14532d",
    border: "#15803d",
    text: "#4ade80",
    soft: "rgba(34,197,94,0.12)",
    softBorder: "rgba(34,197,94,0.4)",
  },
  red: {
    base: "#ef4444",
    shadow: "#7f1d1d",
    border: "#b91c1c",
    text: "#f87171",
    soft: "rgba(239,68,68,0.12)",
    softBorder: "rgba(239,68,68,0.4)",
  },
  yellow: {
    base: "#fbbf24",
    shadow: "#78350f",
    border: "#b45309",
    text: "#fcd34d",
    soft: "rgba(251,191,36,0.12)",
    softBorder: "rgba(251,191,36,0.4)",
  },
  purple: {
    base: "#a855f7",
    shadow: "#3b0764",
    border: "#7e22ce",
    text: "#c084fc",
    soft: "rgba(168,85,247,0.12)",
    softBorder: "rgba(168,85,247,0.4)",
  },
  neutral: null,
};

// ── Sizes ──────────────────────────────────────────────────────────────────────
const SIZES = {
  xs: "px-3.5 py-1.5  text-[10px] rounded-full tracking-widest",
  sm: "px-5   py-2    text-xs     rounded-full tracking-widest",
  md: "px-6   py-2.5  text-xs     rounded-full tracking-widest",
  lg: "px-8   py-3    text-sm     rounded-full tracking-widest",
  xl: "px-10  py-4    text-sm     rounded-full tracking-[0.2em]",
};

// ── Legacy variant name → new API ─────────────────────────────────────────────
const LEGACY = {
  primary: { variant: "solid", color: "blue" },
  action: { variant: "solid", color: "blue" },
  secondary: { variant: "outline", color: "neutral" },
  danger: { variant: "solid", color: "red" },
  success: { variant: "solid", color: "green" },
};

// ── Style builder ──────────────────────────────────────────────────────────────
function buildStyle(variant, color, t) {
  if (color === "neutral") {
    switch (variant) {
      case "solid":
        return {
          background: "var(--ink)",
          color: "var(--app-bg)",
          border: "2px solid var(--ink)",
          boxShadow: "0px 0px 0px var(--app-border)",
          "--tw-translate-x": "0px",
          "--tw-translate-y": "0px",
        };
      case "outline":
        return {
          background: "transparent",
          color: "var(--ink)",
          border: "2px solid var(--app-border)",
          "--btn-hover": "var(--app-raised)",
        };
      case "soft":
        return {
          background: "var(--app-raised)",
          color: "var(--ink)",
          border: "2px solid var(--app-border)",
          "--btn-hover": "var(--app-border)",
        };
      case "ghost":
        return {
          background: "transparent",
          color: "var(--ink-muted)",
          "--btn-hover": "var(--app-raised)",
        };
      case "link":
        return { background: "transparent", color: "var(--ink-muted)" };
      default:
        return {};
    }
  }

  switch (variant) {
    case "solid":
      return {
        background: t.base,
        color: "#fff",
        border: `2px solid ${t.border}`,
        boxShadow: `0px 4px 0px ${t.shadow}`,
      };
    case "outline":
      return {
        background: "transparent",
        color: t.text,
        border: `2px solid ${t.text}`,
        "--btn-hover": t.soft,
      };
    case "soft":
      return {
        background: t.soft,
        color: t.text,
        border: `2px solid ${t.softBorder}`,
        "--btn-hover": t.softBorder,
      };
    case "ghost":
      return {
        background: "transparent",
        color: t.text,
        "--btn-hover": t.soft,
      };
    case "link":
      return { background: "transparent", color: t.text };
    default:
      return {};
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function Button({
  children,
  variant = "solid",
  color = "blue",
  size = "md",
  icon,
  iconRight,
  loading = false,
  fullWidth = false,
  disabled,
  className,
  style,
  ...props
}) {
  if (LEGACY[variant]) {
    const l = LEGACY[variant];
    variant = l.variant;
    if (color === "blue") color = l.color;
  }

  const resolvedColor = COLORS[color] ? color : "blue";
  const t = COLORS[resolvedColor];
  const inlineStyle = buildStyle(variant, resolvedColor, t);
  const isSolid = variant === "solid";
  const isLink = variant === "link";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-sans font-black uppercase",
        "transition-[transform,box-shadow,background-color] duration-100 ease-out",
        "cursor-pointer select-none whitespace-nowrap",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",

        // Solid: shadow collapses + shift on press (press-in effect)
        isSolid && [
          "hover:brightness-[1.06]",
          "active:translate-x-[0px] active:translate-y-[4px] active:[box-shadow:0_0_0_transparent]",
        ],

        !isSolid &&
          !isLink && ["hover:bg-[var(--btn-hover)]", "active:scale-[0.96]"],

        isLink && "hover:underline underline-offset-2",

        SIZES[size] ?? SIZES.md,
        fullWidth && "w-full",
        className,
      )}
      style={{ ...inlineStyle, ...style }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      {children}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
