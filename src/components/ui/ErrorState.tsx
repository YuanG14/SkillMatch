import type { ComponentType, ReactNode, SVGProps } from 'react'
import { AlertTriangleIcon } from '@/components/ui/icons'

interface ErrorStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export function ErrorState({
  title,
  description,
  action,
  icon: Icon = AlertTriangleIcon,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-danger-50 bg-danger-50 px-6 py-12 text-center">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-danger-600"
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-base font-semibold text-danger-600">{title}</h3>
        {description && <p className="max-w-sm text-sm text-ink-700">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
