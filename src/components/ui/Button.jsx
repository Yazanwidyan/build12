import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classes) => twMerge(clsx(classes));

// ── Color tokens ───────────────────────────────────────────────────────────────
// base   = button fill
// border = outer border (medium dark)
// inner  = inset ring (bright highlight)
// shadow = hard bottom depth (darkest)
const COLORS = {
  blue: {
    base: "#2cbaff",
    border: "#0a90d4",
    inner: "rgba(255,255,255,0.28)",
    shadow: "#005f8a",
    soft: "rgba(44,186,255,0.12)",
    softBorder: "rgba(44,186,255,0.35)",
  },
  green: {
    base: "#22c55e",
    border: "#16a34a",
    inner: "rgba(255,255,255,0.28)",
    shadow: "#14532d",
    soft: "rgba(34,197,94,0.12)",
    softBorder: "rgba(34,197,94,0.35)",
  },
  red: {
    base: "#ef4444",
    border: "#dc2626",
    inner: "rgba(255,255,255,0.28)",
    shadow: "#7f1d1d",
    soft: "rgba(239,68,68,0.12)",
    softBorder: "rgba(239,68,68,0.35)",
  },
  yellow: {
    base: "#FACC15", // vibrant game-like yellow
    border: "#EAB308",
    inner: "rgba(255,255,255,0.35)",
    shadow: "#A16207",
    soft: "rgba(250,204,21,0.12)",
    softBorder: "rgba(250,204,21,0.35)",
  },
  purple: {
    base: "#8b5cf6",
    border: "#7c3aed",
    inner: "rgba(255,255,255,0.28)",
    shadow: "#3b0764",
    soft: "rgba(139,92,246,0.12)",
    softBorder: "rgba(139,92,246,0.35)",
  },
  neutral: {
    base: null,
    border: null,
    inner: "rgba(255,255,255,0.2)",
    shadow: null,
    soft: null,
    softBorder: null,
  },
};

// ── Sizes ──────────────────────────────────────────────────────────────────────
const SIZES = {
  xs: "px-2.5 py-1    text-sm  rounded-lg",
  sm: "px-3   py-1.5  text-sm  rounded-lg",
  md: "px-4   py-2    text-base  rounded-lg",
  lg: "px-6   py-2.5  text-base  rounded-lg",
  xl: "px-8   py-3.5  text-lg rounded-lg",
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
          border: "3px solid var(--app-border)",
          "--btn-inner": "rgba(255,255,255,0.2)",
          "--btn-shadow": "rgba(0,0,0,0.35)",
        };
      case "outline":
        return {
          background: "transparent",
          color: "var(--ink)",
          border: "3px solid var(--app-border)",
          "--btn-hover": "var(--app-raised)",
        };
      case "soft":
        return {
          background: "var(--app-raised)",
          color: "var(--ink)",
          border: "3px solid var(--app-border)",
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
        border: `3px solid ${t.border}`,
        "--btn-inner": t.inner,
        "--btn-shadow": t.shadow,
      };
    case "outline":
      return {
        background: "transparent",
        color: t.base,
        border: `2px solid ${t.base}`,
        "--btn-hover": t.soft,
      };
    case "soft":
      return {
        background: t.soft,
        color: t.base,
        border: `2px solid ${t.softBorder}`,
        "--btn-hover": t.softBorder,
      };
    case "ghost":
      return {
        background: "transparent",
        color: t.base,
        "--btn-hover": t.soft,
      };
    case "link":
      return { background: "transparent", color: t.base };
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
  // Normalise legacy variant names
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
        "inline-flex items-center justify-center gap-2 font-sans font-bold",
        "transition-[transform,opacity,background-color,filter] duration-100 cursor-pointer select-none whitespace-nowrap",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2cbaff] focus-visible:ring-offset-2",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",

        // 3-D solid: inset ring + bottom shadow; brighten on hover, collapse shadow on press
        isSolid && [
          "shadow-[inset_0_0_0_3px_var(--btn-inner),0_4px_0_var(--btn-shadow)]",
          "hover:brightness-[1.1]",
        ],

        // Flat variants: color tint on hover, scale on press
        !isSolid &&
          !isLink && ["hover:bg-[var(--btn-hover)]", "active:scale-95"],

        // Link: underline on hover
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
