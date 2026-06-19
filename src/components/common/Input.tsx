import { cn } from '../../lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-body-sm font-medium text-ink-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-md border border-hairline bg-surface-1 px-3 py-2 text-body-sm text-ink transition-colors',
            'placeholder:text-ink-tertiary',
            'focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary-focus/50',
            error && 'border-red-700 focus:border-red-700 focus:ring-red-700/30',
            className
          )}
          {...props}
        />
        {error && <p className="text-caption text-red-400">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
