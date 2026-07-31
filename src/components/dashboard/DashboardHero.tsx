import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface DashboardHeroProps {
  eyebrow?: string
  title: ReactNode
  description: string
  actions?: ReactNode
  illustration?: ReactNode
  className?: string
}

/**
 * Wide horizontal dashboard hero: text content on the left, an illustration
 * (with optional floating stat cards layered over it) on the right. Shared
 * shell so the Student and Company dashboards use the same desktop
 * composition and visual language while filling in their own copy, data,
 * and illustration.
 */
export function DashboardHero({
  eyebrow,
  title,
  description,
  actions,
  illustration,
  className,
}: DashboardHeroProps) {
  return (
    <section
      className={cn(
        'relative rounded-2xl border border-border bg-gradient-to-br from-primary-50 via-surface to-surface',
        'p-6 sm:p-8 lg:p-12',
        className,
      )}
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        <div className="flex flex-col gap-5">
          {eyebrow && <p className="text-sm font-medium text-ink-600">{eyebrow}</p>}

          <h1 className="font-display text-3xl font-semibold leading-[1.15] text-ink-950 lg:text-4xl">
            {title}
          </h1>

          <p className="max-w-md text-base text-ink-600">{description}</p>

          {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
        </div>

        {illustration && <div className="relative">{illustration}</div>}
      </div>
    </section>
  )
}
