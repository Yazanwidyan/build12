import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...classes) => twMerge(clsx(classes))

// All variant colours reference CSS variables so they auto-adapt to light/dark.
const variants = {
  // Solid accent — primary CTA
  primary: [
    'text-white font-semibold',
    'bg-teki-600 dark:bg-teki-500',
    'border border-teki-700 dark:border-teki-400',
    'hover:bg-teki-700 dark:hover:bg-teki-600',
    'active:scale-95',
    'shadow-sm dark:shadow-glow-sm',
  ].join(' '),

  // Same as primary — used as the main "action" button in missions
  action: [
    'text-white font-bold tracking-wide',
    'bg-teki-600 dark:bg-teki-500',
    'border border-teki-700/60 dark:border-teki-400/50',
    'hover:bg-teki-700 dark:hover:bg-teki-600',
    'active:scale-95',
    'shadow-md dark:shadow-glow',
  ].join(' '),

  // Outlined — secondary action
  secondary: [
    'font-semibold',
    'bg-transparent',
    'border border-[var(--app-border)] hover:border-[var(--accent-border)]',
    'text-[var(--ink)] hover:text-[var(--accent)]',
    'hover:bg-[var(--accent-bg)]',
    'active:scale-95',
  ].join(' '),

  // Ghost — tertiary, nav back buttons etc.
  ghost: [
    'font-medium',
    'bg-transparent',
    'border border-transparent',
    'text-[var(--ink-muted)] hover:text-[var(--ink)]',
    'hover:bg-[var(--app-raised)]',
    'active:scale-95',
  ].join(' '),

  // Danger
  danger: [
    'text-white font-semibold',
    'bg-red-600 dark:bg-red-500',
    'border border-red-700 dark:border-red-400',
    'hover:bg-red-700 dark:hover:bg-red-600',
    'active:scale-95',
  ].join(' '),

  // Success
  success: [
    'text-white font-semibold',
    'bg-emerald-600 dark:bg-emerald-500',
    'border border-emerald-700 dark:border-emerald-400',
    'hover:bg-emerald-700 dark:hover:bg-emerald-600',
    'active:scale-95',
    'dark:shadow-glow-green',
  ].join(' '),
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
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans',
        'transition-all duration-150 cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-teki-500 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-offset-[#0d1117]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
