import type { ComponentType, SVGProps } from 'react'
import { Card } from '@/components/ui/Card'
import { TrendingUpIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface StatCardProps {
  label: string
  value: string
  supportingText?: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  trend?: 'up' | 'neutral'
  className?: string
}

/**
 * Compact KPI card used in the dashboard stat row (e.g. "Total
 * Applications", "Average Match Score"). Shared shell so student and
 * company dashboards can report their own metrics with one consistent look.
 */
export function StatCard({
  label,
  value,
  supportingText,
  icon: Icon,
  trend = 'neutral',
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'p-5 transition-[box-shadow,border-color] duration-200 ease-out hover:border-border-strong hover:shadow-[0_4px_16px_rgba(16,24,40,0.06)]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink-600">{label}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-200">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>

      <p className="font-display mt-3 text-3xl font-semibold text-ink-950">{value}</p>

      {supportingText && (
        <p
          className={cn(
            'mt-1.5 flex items-center gap-1 text-xs font-medium',
            trend === 'up' ? 'text-success-600' : 'text-ink-600',
          )}
        >
          {trend === 'up' && <TrendingUpIcon className="h-3.5 w-3.5" />}
          {supportingText}
        </p>
      )}
    </Card>
  )
}
