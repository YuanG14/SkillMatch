import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
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
 */
export function CompanyProfileStatusCard({
  profile,
  isLoading,
}: CompanyProfileStatusCardProps) {
  const statusDisplay =
    VERIFICATION_STATUS_DISPLAY[profile?.verificationStatus ?? 'pending']
  const hasCompanyDetails = Boolean(profile?.companyName)

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      {isLoading ? (
        <Spinner label="Loading company profile…" />
      ) : (
        <>
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
        </>
      )}
    </Card>
  )
}
