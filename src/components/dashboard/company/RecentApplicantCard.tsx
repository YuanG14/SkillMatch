import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MatchRing } from '@/components/ui/MatchRing'
import type { MockApplicant } from '@/mock/companyDashboardData'

interface RecentApplicantCardProps {
  applicant: MockApplicant
}

export function RecentApplicantCard({ applicant }: RecentApplicantCardProps) {
  const { candidateName, internshipTitle, matchPercent, skills } = applicant

  return (
    <Card interactive className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <MatchRing value={matchPercent} size={56} />

        <div className="min-w-0 flex-1">
          <p className="font-display truncate text-sm font-semibold text-ink-900">
            {candidateName}
          </p>
          <p className="truncate text-sm text-ink-600">{internshipTitle}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {skills.map((skill) => (
              <Badge key={skill} tone="neutral">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Button size="sm" variant="outline" className="w-full shrink-0 sm:w-auto">
        View Profile
      </Button>
    </Card>
  )
}
