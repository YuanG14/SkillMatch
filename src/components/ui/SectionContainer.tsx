import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const maxWidthClasses = {
  narrow: 'max-w-2xl',
  content: 'max-w-4xl',
  default: 'max-w-7xl',
} as const

type SectionContainerWidth = keyof typeof maxWidthClasses

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** narrow: copy blocks (~42rem). content: focused single-column content (~56rem). default: standard section width (~80rem). */
  width?: SectionContainerWidth
}

/**
 * Centers content with a consistent max-width and horizontal padding.
 * Standardizes the `mx-auto max-w-* px-6` pattern repeated across sections.
 */
export function SectionContainer({
  width = 'default',
  className,
  ...props
}: SectionContainerProps) {
  return (
    <div className={cn('mx-auto px-6', maxWidthClasses[width], className)} {...props} />
  )
}
