import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MatchRing } from '@/components/ui/MatchRing'
import type { ProfileCompletion } from '@/utils/profileCompletion'

interface ProfileCompletionCardProps {
  completion: ProfileCompletion
}

/**
 * Standalone profile-completion callout, separate from the KPI row so it
 * stays visible without competing with Total Applications / Interviews /
 * Average Match Score for the same visual weight. Uses the same
 * calculateProfileCompletion result the hero and profile page already rely
 * on -- no hardcoded percentage.
 */
export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
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
