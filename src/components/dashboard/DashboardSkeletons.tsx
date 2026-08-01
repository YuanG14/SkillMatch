import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

/**
 * Placeholder for a StatCard (KPI) while its backing data is loading.
 * Mirrors StatCard's real layout (label + icon, big value, supporting
 * line) so the grid doesn't jump in height once real data arrives.
 */
export function StatCardSkeleton() {
  return (
    <Card role="status" aria-label="Loading stat" className="p-5">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
      </div>
      <Skeleton className="mt-3 h-8 w-16" />
      <Skeleton className="mt-2.5 h-3.5 w-28" />
    </Card>
  )
}

/**
 * Placeholder for a single list row -- the shape shared by the
 * recommendation, applicant, and active-listing cards (a leading
 * ring/avatar, two lines of text, and a trailing action). Used while
 * dashboard list sections are loading.
 */
export function ListRowSkeleton() {
  return (
    <Card role="status" aria-label="Loading item" className="flex items-center gap-4 p-4">
      <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3.5 w-1/3" />
        <div className="flex gap-1.5 pt-0.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>
      <Skeleton className="hidden h-8 w-24 shrink-0 rounded-md sm:block" />
    </Card>
  )
}

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

/**
 * Placeholder for a data table -- a header bar plus a handful of evenly
 * spaced rows of varying-width bars, so the eye reads it as "rows of
 * data" rather than a solid gray block.
 */
export function TableSkeleton({ rows = 4, columns = 5 }: TableSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading table"
      className="overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div className="border-b border-border bg-surface-muted px-4 py-3">
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-6 px-4 py-3.5">
            {Array.from({ length: columns }).map((__, columnIndex) => (
              <Skeleton
                key={columnIndex}
                className="h-4 flex-1"
                style={{ maxWidth: columnIndex === 0 ? '9rem' : '5.5rem' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
