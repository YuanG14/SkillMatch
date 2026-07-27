import type { ReactNode } from 'react'

interface ErrorStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-danger-50 bg-danger-50 px-6 py-12 text-center">
      <h3 className="font-display text-base font-semibold text-danger-600">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-700">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
