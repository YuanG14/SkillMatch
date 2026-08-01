import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { BookmarkIcon, MapPinIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'
import { FOCUS_RING } from '@/utils/a11y'
import type { MockRecommendedInternship } from '@/mock/studentDashboardData'

interface InternshipRecommendationCardProps {
  internship: MockRecommendedInternship
  onToggleSave?: (id: string) => void
}

export function InternshipRecommendationCard({
  internship,
  onToggleSave,
}: InternshipRecommendationCardProps) {
  const { id, title, companyName, matchPercent, employmentType, location, saved } =
    internship

  return (
    <Card interactive className="flex items-center gap-4 p-4">
      <MatchRing value={matchPercent} size={56} />

      <div className="min-w-0 flex-1">
        <p className="font-display truncate text-sm font-semibold text-ink-900">
          {title}
        </p>
        <p className="truncate text-sm text-ink-600">{companyName}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone="primary">{employmentType}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-ink-600">
            <MapPinIcon className="h-3.5 w-3.5" />
            {location}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onToggleSave?.(id)}
        aria-pressed={saved}
        aria-label={saved ? 'Remove from saved internships' : 'Save internship'}
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
          FOCUS_RING,
          saved
            ? 'border-primary-100 bg-primary-50 text-primary-600'
            : 'border-border text-ink-600 hover:bg-surface-muted',
        )}
      >
        <BookmarkIcon className="h-4.5 w-4.5" fill={saved ? 'currentColor' : 'none'} />
      </button>
    </Card>
  )
}
