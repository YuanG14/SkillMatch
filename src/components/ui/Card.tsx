import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Marks a card as a whole clickable/actionable unit (e.g. a list row
   * that leads to a detail view or action) so it gets the shared hover
   * elevation. Purely informational cards (KPI stats, status callouts)
   * should leave this off -- their own inner button already has a hover
   * state, and hovering the whole card would be misleading.
   */
  interactive?: boolean
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
        interactive &&
          'transition-shadow duration-150 hover:border-border-strong hover:shadow-[0_4px_16px_rgba(16,24,40,0.08)]',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 p-5 pb-0', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-display text-base font-semibold text-ink-900', className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-ink-600', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center gap-3 border-t border-border p-5', className)}
      {...props}
    />
  )
}
