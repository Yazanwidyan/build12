import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...classes) => twMerge(clsx(classes))

export default function Card({ children, className, padding = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm',
        padding && 'p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
