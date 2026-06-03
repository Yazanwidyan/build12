import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'

const cn = (...classes) => twMerge(clsx(classes))

const Input = forwardRef(function Input({ label, error, hint, className, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm',
          'text-gray-900 placeholder:text-gray-400',
          'focus:border-teki-500 focus:outline-none focus:ring-2 focus:ring-teki-500/20',
          'transition-colors duration-150',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className,
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
})

export default Input
