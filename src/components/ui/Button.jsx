import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...classes) => twMerge(clsx(classes))

const variants = {
  primary:  'bg-teki-600 text-white hover:bg-teki-700 active:bg-teki-800 shadow-sm',
  secondary:'bg-white text-teki-600 border border-teki-200 hover:bg-teki-50 active:bg-teki-100',
  ghost:    'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200',
  danger:   'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  action:   'bg-teki-600 text-white hover:bg-teki-700 active:scale-95 shadow-md font-semibold',
  success:  'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
}

export default function Button({ children, variant = 'primary', size = 'md', className, disabled, fullWidth, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
        'transition-all duration-150 focus:outline-none focus-visible:ring-2',
        'focus-visible:ring-teki-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
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
