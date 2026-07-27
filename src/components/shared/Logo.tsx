import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'font-display inline-flex items-center gap-2 text-lg font-semibold text-ink-900',
        className,
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600 text-sm font-bold text-white">
        S
      </span>
      SkillMatch
    </Link>
  )
}
