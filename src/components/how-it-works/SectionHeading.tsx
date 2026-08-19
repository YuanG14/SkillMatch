import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display mt-2 text-2xl font-semibold text-ink-950 sm:text-3xl',
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-ink-600">{subtitle}</p>}
    </div>
  )
}
