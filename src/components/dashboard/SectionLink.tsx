import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { FOCUS_RING } from '@/utils/a11y'

/**
 * The small text-link used in a DashboardSection's `actions` slot (e.g.
 * "View all"). Pulled out as its own component so every section header
 * link across the Student and Company dashboards shares one hover/focus
 * treatment instead of three copies of the same className string.
 */
export function SectionLink({ className, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        'rounded text-sm font-medium text-primary-600 transition-colors hover:text-primary-700',
        FOCUS_RING,
        className,
      )}
      {...props}
    />
  )
}
