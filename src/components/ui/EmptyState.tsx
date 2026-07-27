import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border-strong bg-surface-muted px-6 py-12 text-center">
      <h3 className="font-display text-base font-semibold text-ink-900">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-600">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
