import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'

const cn = (...classes) => twMerge(clsx(classes))

const Input = forwardRef(function Input({ label, error, hint, className, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold font-sans" style={{ color: 'var(--ink)' }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'input-base',
          error && '!border-red-400 focus:!border-red-500 focus:![box-shadow:0_0_0_3px_rgba(239,68,68,0.15)]',
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs" style={{ color: 'var(--ink-faint)' }}>{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
})

export default Input
