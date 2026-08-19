import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

/**
 * Base shimmer block for loading states. A skeleton should always mirror a
 * real isLoading flag from a hook/service -- it means "the real value
 * hasn't arrived yet," never a stand-in for data that doesn't exist yet.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('rounded-md bg-surface-muted motion-safe:animate-pulse', className)}
      {...props}
    />
  )
}
