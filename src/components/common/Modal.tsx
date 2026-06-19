import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-overlay/70" onClick={onClose} />
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-xl bg-surface-2 border border-hairline p-6',
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-headline font-semibold text-ink">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto rounded-md p-1 text-ink-subtle hover:bg-surface-3 hover:text-ink transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
