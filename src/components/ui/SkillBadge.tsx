import { CheckIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface SkillBadgeProps {
  skill: string
  /** matched: skill the student already has. gap: a skill worth improving. */
  status: 'matched' | 'gap'
  className?: string
}

/**
 * A single skill with a matched/gap indicator -- the recurring "✓ React" /
 * "⚠ Next.js" pattern used across match score, skill gap, and journey UI.
 */
export function SkillBadge({ skill, status, className }: SkillBadgeProps) {
  const isMatched = status === 'matched'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm',
        isMatched ? 'text-ink-800' : 'text-ink-700',
        className,
      )}
    >
      {isMatched ? (
        <CheckIcon className="text-success-600" width={15} height={15} />
      ) : (
        <AlertTriangleIcon className="text-warning-600" width={15} height={15} />
      )}
      {skill}
    </span>
  )
}
