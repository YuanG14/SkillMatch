import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
}

/**
 * Base shimmer block for loading states. A skeleton should always mirror a
 * real isLoading flag from a hook/service -- it means "the real value
 * hasn't arrived yet," never a stand-in for data that doesn't exist yet.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('rounded-md bg-surface-muted motion-safe:animate-pulse', className)}
    />
  )
}
