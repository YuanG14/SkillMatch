import { Card } from '@/components/ui/Card'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { UsersIcon } from '@/components/ui/icons'
import { LISTING_STATUS_TONE } from '@/utils/statusTone'
import type { MockActiveInternship, InternshipStatus } from '@/mock/companyDashboardData'

const STATUS_TONE: Record<InternshipStatus, BadgeTone> = LISTING_STATUS_TONE

interface ActiveInternshipCardProps {
  internship: MockActiveInternship
}

export function ActiveInternshipCard({ internship }: ActiveInternshipCardProps) {
  const { title, applicantCount, avgMatchPercent, status } = internship

  return (
    <Card interactive className="flex items-center gap-4 p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-display truncate text-sm font-semibold text-ink-900">
            {title}
          </p>
          <Badge tone={STATUS_TONE[status]}>{status}</Badge>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-600">
          <span className="inline-flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" />
            {applicantCount} Applicants
          </span>
          <span className="font-medium text-primary-600">
            {avgMatchPercent}% Avg. Match
          </span>
        </div>
      </div>

      <Button size="sm" variant="outline" className="shrink-0">
        View Applicants
      </Button>
    </Card>
  )
}
