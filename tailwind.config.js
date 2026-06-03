/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand violet (same hue both themes) ───────────────────────────────
        teki: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // ── Semantic tokens via CSS variables ─────────────────────────────────
        // Use these anywhere you want theme-aware colours.
        app: {
          bg:      'var(--app-bg)',
          surface: 'var(--app-surface)',
          raised:  'var(--app-raised)',
          border:  'var(--app-border)',
          line:    'var(--app-line)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted:   'var(--ink-muted)',
          faint:   'var(--ink-faint)',
        },
        // ── Neon (same both themes — context-dimmed in light) ─────────────────
        neon: {
          green:  '#4ade80',
          yellow: '#fbbf24',
          cyan:   '#22d3ee',
          red:    '#f87171',
        },
      },

      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },

      boxShadow: {
        'glow-sm':    '0 0 12px var(--glow-color)',
        'glow':       '0 0 22px var(--glow-color)',
        'glow-lg':    '0 0 40px var(--glow-color)',
        'glow-green': '0 0 16px rgba(74,222,128,0.3)',
        'card':       'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },

      animation: {
        'float':        'float 4s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2.2s ease-in-out infinite',
        'slide-up':     'slideUp 0.2s ease-out',
        'blink-cursor': 'blinkCursor 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px var(--glow-color)' },
          '50%':      { boxShadow: '0 0 28px var(--glow-color-bright)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
