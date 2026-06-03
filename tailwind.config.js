/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Brand cyan-blue  #2CBAFF ──────────────────────────────────────────
        teki: {
          50: "#f0f9ff",
          100: "#e0f4ff",
          200: "#b9e9ff",
          300: "#7cd8ff",
          400: "#38c8ff",
          500: "#2cbaff", // ← primary brand colour
          600: "#06a4f0",
          700: "#0284c7",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // ── Secondary gold  #FDE047 ───────────────────────────────────────────
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047", // ← main gold
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        // ── Semantic tokens via CSS variables ─────────────────────────────────
        // Use these anywhere you want theme-aware colours.
        app: {
          bg: "var(--app-bg)",
          surface: "var(--app-surface)",
          raised: "var(--app-raised)",
          border: "var(--app-border)",
          line: "var(--app-line)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
        },
      },

      maxWidth: {
        "6xl": "68rem",
      },

      fontFamily: {
        sans: ['"Space Grotesk"', "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Courier New"', "monospace"],
      },

      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        "slide-up": "slideUp 0.2s ease-out",
        "blink-cursor": "blinkCursor 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blinkCursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
