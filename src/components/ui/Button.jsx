import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...classes) => twMerge(clsx(classes))

// Inline-style approach for primary colours — avoids any Tailwind-cache surprises.
const VARIANT_STYLES = {
  primary: {
    background: '#2cbaff',
    color: '#fff',
    border: '1px solid #06a4f0',
    '--hover-bg': '#06a4f0',
  },
  action: {
    background: '#2cbaff',
    color: '#fff',
    border: '1px solid rgba(6,164,240,0.7)',
    boxShadow: '0 2px 12px rgba(44,186,255,0.35)',
    '--hover-bg': '#06a4f0',
  },
  secondary: null,  // CSS-variable driven, handled via className
  ghost: null,
  danger: {
    background: '#ef4444',
    color: '#fff',
    border: '1px solid #dc2626',
    '--hover-bg': '#dc2626',
  },
  success: {
    background: '#22c55e',
    color: '#fff',
    border: '1px solid #16a34a',
    '--hover-bg': '#16a34a',
  },
}

const VARIANT_CLASSES = {
  primary:   'font-semibold hover:opacity-90 active:scale-95',
  action:    'font-bold tracking-wide hover:opacity-90 active:scale-95',
  secondary: 'font-semibold bg-transparent border border-[var(--app-border)] text-[var(--ink)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] active:scale-95',
  ghost:     'font-medium bg-transparent border border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--app-raised)] active:scale-95',
  danger:    'font-semibold hover:opacity-90 active:scale-95',
  success:   'font-semibold hover:opacity-90 active:scale-95',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-2.5 text-sm rounded-xl',
  xl: 'px-8 py-3.5 text-base rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  fullWidth,
  style,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans',
        'transition-all duration-150 cursor-pointer select-none',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2cbaff] focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100',
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
        sizes[size] ?? sizes.md,
        fullWidth && 'w-full',
        className,
      )}
      style={{ ...(VARIANT_STYLES[variant] ?? {}), ...style }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
