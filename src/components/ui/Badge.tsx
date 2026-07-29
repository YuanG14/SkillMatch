import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-ink-700 border-border',
  primary: 'bg-primary-50 text-primary-700 border-primary-100',
  success: 'bg-success-50 text-success-600 border-success-50',
  warning: 'bg-warning-50 text-warning-600 border-warning-50',
  danger: 'bg-danger-50 text-danger-600 border-danger-50',
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
