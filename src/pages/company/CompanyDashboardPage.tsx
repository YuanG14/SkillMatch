import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { useCompanyProfile } from '@/features/companyProfile/useCompanyProfile'
import { VERIFICATION_STATUS_DISPLAY } from '@/utils/verificationStatus'

export function CompanyDashboardPage() {
  const { profile, isLoading } = useCompanyProfile()
  const statusDisplay =
    VERIFICATION_STATUS_DISPLAY[profile?.verificationStatus ?? 'pending']
  const hasCompanyDetails = Boolean(profile?.companyName)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Dashboard</h1>
          <p className="text-sm text-ink-600">
            Here's where things stand with your company account.
          </p>
        </div>
        <Button size="sm" disabled={statusDisplay.tone !== 'success'}>
          Post a listing
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Company profile</CardTitle>
            <CardDescription>
              {hasCompanyDetails
                ? profile?.companyName
                : 'Add your company details to get started.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-4">
            {isLoading ? (
              <Spinner label="Loading…" />
            ) : (
              <>
                <Badge tone={statusDisplay.tone}>{statusDisplay.label}</Badge>
                <Link to="/company/profile">
                  <Button size="sm" variant={hasCompanyDetails ? 'outline' : 'primary'}>
                    {hasCompanyDetails ? 'Edit profile' : 'Complete your profile'}
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Your listings</CardTitle>
            <CardDescription>
              Internship postings and their candidate pipelines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="No listings yet"
              description={
                statusDisplay.tone === 'success'
                  ? 'Post your first internship to start matching with students.'
                  : 'Listings unlock once your company is verified.'
              }
              action={
                <Button size="sm" disabled={statusDisplay.tone !== 'success'}>
                  Post a listing
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
