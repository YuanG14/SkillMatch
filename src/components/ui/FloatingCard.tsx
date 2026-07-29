import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

/**
 * A small, elevated card for hero-style floating UI callouts (e.g. "92%
 * Match", "2 skills to improve"). Unstyled for position -- the caller sets
 * `absolute`/`top`/`left` etc. via className.
 */
export function FloatingCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-3 shadow-[var(--shadow-elevated)]',
        className,
      )}
      {...props}
    />
  )
}
