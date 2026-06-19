import { cn } from '../../lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-focus/50 disabled:opacity-40 disabled:cursor-not-allowed',
        {
          'bg-primary text-white hover:bg-primary-hover':                          variant === 'primary',
          'bg-surface-1 border border-hairline text-ink hover:bg-surface-2':       variant === 'secondary',
          'text-ink-subtle hover:bg-surface-1 hover:text-ink':                     variant === 'ghost',
          'bg-red-700 text-white hover:bg-red-600':                                variant === 'danger',
          'px-3 py-1.5 text-[13px]': size === 'sm',
          'px-3.5 py-2 text-button': size === 'md',
          'px-5 py-2.5 text-body':   size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
