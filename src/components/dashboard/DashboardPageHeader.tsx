import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface DashboardPageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

/**
 * Top-of-page heading used across every authenticated dashboard route.
 * Keeps title/description/actions typography consistent so the Student,
 * Company, and Admin dashboards read as one product.
 */
export function DashboardPageHeader({
  title,
  description,
  actions,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-950 lg:text-[1.75rem]">
          {title}
        </h1>
        {description && <p className="mt-1.5 text-sm text-ink-600">{description}</p>}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  )
}
