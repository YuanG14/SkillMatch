import type { ComponentType, ReactNode, SVGProps } from 'react'
import { CircleDashedIcon } from '@/components/ui/icons'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = CircleDashedIcon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-strong bg-surface-muted px-6 py-12 text-center motion-safe:animate-[fade-in_0.3s_ease-out]">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-600"
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-base font-semibold text-ink-900">{title}</h3>
        {description && <p className="max-w-sm text-sm text-ink-600">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
