import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ProfileHeaderProps {
  title: string
  description?: string
  rightSlot?: ReactNode
  className?: string
}

/**
 * Desktop profile header: title/description on the left, a role-specific
 * status slot (profile completion ring, verification badge, etc.) on the
 * right, separated by a divider on large screens. Stacks with a top divider
 * on mobile. Shared by the Student and Company profile pages so both feel
 * like the same product while keeping their own identity content and
 * right-side status content.
 */
export function ProfileHeader({
  title,
  description,
  rightSlot,
  className,
}: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-xl border border-border bg-surface p-6',
        'lg:flex-row lg:items-center lg:justify-between lg:p-8',
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold text-ink-950 lg:text-[1.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-xl text-sm text-ink-600">{description}</p>
        )}
      </div>

      {rightSlot && (
        <div
          className={cn(
            'flex shrink-0 items-center gap-4 border-t border-border pt-6',
            'lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0',
          )}
        >
          {rightSlot}
        </div>
      )}
    </div>
  )
}
