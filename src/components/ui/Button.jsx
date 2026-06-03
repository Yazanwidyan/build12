import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...classes) => twMerge(clsx(classes))

// ── Color tokens ───────────────────────────────────────────────────────────────
const COLORS = {
  blue:    { base: '#2cbaff', dark: '#06a4f0', border: '#06a4f0', soft: 'rgba(44,186,255,0.12)',  softBorder: 'rgba(44,186,255,0.3)' },
  green:   { base: '#22c55e', dark: '#16a34a', border: '#16a34a', soft: 'rgba(34,197,94,0.12)',   softBorder: 'rgba(34,197,94,0.3)'  },
  red:     { base: '#ef4444', dark: '#dc2626', border: '#dc2626', soft: 'rgba(239,68,68,0.12)',   softBorder: 'rgba(239,68,68,0.3)'  },
  yellow:  { base: '#f59e0b', dark: '#d97706', border: '#d97706', soft: 'rgba(245,158,11,0.12)',  softBorder: 'rgba(245,158,11,0.3)' },
  purple:  { base: '#8b5cf6', dark: '#7c3aed', border: '#7c3aed', soft: 'rgba(139,92,246,0.12)', softBorder: 'rgba(139,92,246,0.3)' },
  neutral: { base: null, dark: null, border: null, soft: null, softBorder: null },
}

// ── Variant → inline style builder ────────────────────────────────────────────
function buildStyle(variant, c) {
  if (c === 'neutral') {
    const map = {
      solid:   { background: 'var(--ink)',         color: 'var(--app-bg)',    border: '2px solid var(--ink)'         },
      outline: { background: 'transparent',         color: 'var(--ink)',       border: '2px solid var(--app-border)'  },
      soft:    { background: 'var(--app-raised)',   color: 'var(--ink)',       border: '2px solid var(--app-border)'  },
      ghost:   { background: 'transparent',         color: 'var(--ink-muted)', border: '2px solid transparent'        },
      link:    { background: 'transparent',         color: 'var(--ink-muted)', border: 'none', padding: 0            },
    }
    return map[variant] ?? map.solid
  }
  const t = COLORS[c]
  const map = {
    solid:   { background: t.base,   color: '#fff',   border: `2px solid ${t.border}`    },
    outline: { background: 'transparent', color: t.base, border: `2px solid ${t.base}`   },
    soft:    { background: t.soft,   color: t.base,   border: `2px solid ${t.softBorder}` },
    ghost:   { background: 'transparent', color: t.base, border: '2px solid transparent' },
    link:    { background: 'transparent', color: t.base, border: 'none', padding: 0      },
  }
  return map[variant] ?? map.solid
}

// ── Legacy variant name → new API ─────────────────────────────────────────────
const LEGACY = {
  primary:   { variant: 'solid',   color: 'blue'    },
  action:    { variant: 'solid',   color: 'blue'    },
  secondary: { variant: 'outline', color: 'neutral' },
  danger:    { variant: 'solid',   color: 'red'     },
  success:   { variant: 'solid',   color: 'green'   },
}

// ── Sizes ──────────────────────────────────────────────────────────────────────
const SIZES = {
  xs: 'px-2.5 py-1    text-xs  rounded-lg',
  sm: 'px-3   py-1.5  text-xs  rounded-lg',
  md: 'px-4   py-2    text-sm  rounded-xl',
  lg: 'px-5   py-2.5  text-sm  rounded-xl',
  xl: 'px-8   py-3.5  text-base rounded-2xl',
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function Button({
  children,
  variant  = 'solid',
  color    = 'blue',
  size     = 'md',
  icon,
  iconRight,
  loading  = false,
  fullWidth = false,
  disabled,
  className,
  style,
  ...props
}) {
  // Normalise legacy variant names
  if (LEGACY[variant]) {
    const l = LEGACY[variant]
    variant = l.variant
    if (color === 'blue') color = l.color   // only override when caller didn't set color
  }

  const resolvedColor = COLORS[color] ? color : 'blue'
  const inlineStyle   = buildStyle(variant, resolvedColor)

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans font-semibold',
        'transition-all duration-150 cursor-pointer select-none whitespace-nowrap',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2cbaff] focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variant !== 'link' && 'hover:opacity-80 active:scale-95',
        variant === 'link'  && 'hover:underline underline-offset-2',
        SIZES[size] ?? SIZES.md,
        fullWidth && 'w-full',
        className,
      )}
      style={{ ...inlineStyle, ...style }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path  className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon && <span className="shrink-0">{icon}</span>}
      {children}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}
