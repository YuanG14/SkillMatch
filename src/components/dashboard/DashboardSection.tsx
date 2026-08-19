import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface DashboardSectionProps {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Shared wrapper for a titled block of dashboard content (e.g. "Recommended
 * for You", "Recent Applications"). Establishes one consistent header style
 * and vertical rhythm so later phases (hero, KPI row, two-column content,
 * tables) don't each invent their own spacing.
 */
export function DashboardSection({
  title,
  description,
  actions,
  children,
  className,
}: DashboardSectionProps) {
  return (
    <section className={cn('flex flex-col gap-4', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-4">
          <div>
            {title && (
              <h2 className="font-display text-lg font-semibold text-ink-900">{title}</h2>
            )}
            {description && <p className="text-sm text-ink-600">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
