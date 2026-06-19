import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2.5 py-0.5 text-caption font-medium',
        {
          'bg-surface-2 text-ink-muted':           variant === 'default',
          'bg-success/10 text-success':            variant === 'success',
          'bg-yellow-500/10 text-yellow-400':      variant === 'warning',
          'bg-red-700/20 text-red-400':            variant === 'danger',
          'bg-primary/10 text-primary-hover':      variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
