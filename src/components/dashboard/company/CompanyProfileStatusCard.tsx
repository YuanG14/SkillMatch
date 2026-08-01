import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { VERIFICATION_STATUS_DISPLAY } from '@/utils/verificationStatus'
import type { CompanyProfile } from '@/types/companyProfile'

interface CompanyProfileStatusCardProps {
  profile: CompanyProfile | null
  isLoading: boolean
}

/**
 * Real (non-mock) company verification status, carried over from the
 * previous dashboard page. Verification gates whether the company can post
 * listings, so it stays visible as its own callout rather than being
 * folded into the mock KPI/recruitment content.
 *
 * Shares its loading-skeleton shape (badge/ring placeholder + two text
 * lines + one button) with the Student dashboard's ProfileCompletionCard so
 * both dashboards' "profile status" card feels like the same component
 * while loading.
 */
export function CompanyProfileStatusCard({
  profile,
  isLoading,
}: CompanyProfileStatusCardProps) {
  if (isLoading) {
    return (
      <Card
        role="status"
        aria-label="Loading company profile status"
        className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-24 shrink-0 rounded-md" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3.5 w-56" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 rounded-md" />
      </Card>
    )
  }

  const statusDisplay =
    VERIFICATION_STATUS_DISPLAY[profile?.verificationStatus ?? 'pending']
  const hasCompanyDetails = Boolean(profile?.companyName)

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Badge tone={statusDisplay.tone} className="shrink-0">
          {statusDisplay.label}
        </Badge>
        <div>
          <p className="font-display text-base font-semibold text-ink-900">
            {hasCompanyDetails ? profile?.companyName : 'Company profile'}
          </p>
          <p className="text-sm text-ink-600">{statusDisplay.description}</p>
        </div>
      </div>

      <Link to="/company/profile" className="shrink-0">
        <Button size="sm" variant={hasCompanyDetails ? 'outline' : 'primary'}>
          {hasCompanyDetails ? 'Edit profile' : 'Complete your profile'}
        </Button>
      </Link>
    </Card>
  )
}
