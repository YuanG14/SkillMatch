import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MatchRing } from '@/components/ui/MatchRing'
import { Skeleton } from '@/components/ui/Skeleton'
import type { ProfileCompletion } from '@/utils/profileCompletion'

interface ProfileCompletionCardProps {
  completion: ProfileCompletion
  isLoading?: boolean
}

/**
 * Standalone profile-completion callout, separate from the KPI row so it
 * stays visible without competing with Total Applications / Interviews /
 * Average Match Score for the same visual weight. Uses the same
 * calculateProfileCompletion result the hero and profile page already rely
 * on -- no hardcoded percentage.
 *
 * Shares its loading-skeleton shape (badge/ring placeholder + two text
 * lines + one button) with CompanyProfileStatusCard so both dashboards'
 * "profile status" card feels like the same component while loading.
 */
export function ProfileCompletionCard({
  completion,
  isLoading = false,
}: ProfileCompletionCardProps) {
  if (isLoading) {
    return (
      <Card
        role="status"
        aria-label="Loading profile completion"
        className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3.5 w-52" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 rounded-md" />
      </Card>
    )
  }

  const isComplete = completion.percent === 100

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <MatchRing value={completion.percent} size={56} />
        <div>
          <p className="font-display text-base font-semibold text-ink-900">
            Profile completion
          </p>
          <p className="text-sm text-ink-600">
            {isComplete
              ? 'Your profile is complete.'
              : 'A complete profile improves your matches.'}
          </p>
        </div>
      </div>

      <Link to="/student/profile" className="shrink-0">
        <Button size="sm" variant={isComplete ? 'outline' : 'primary'}>
          {isComplete ? 'Edit profile' : 'Complete your profile'}
        </Button>
      </Link>
    </Card>
  )
}
