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
import { MatchRing } from '@/components/ui/MatchRing'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Spinner } from '@/components/ui/Spinner'
import { useAuth } from '@/features/auth/useAuth'
import { useStudentProfile } from '@/features/studentProfile/useStudentProfile'
import { calculateProfileCompletion } from '@/utils/profileCompletion'

export function StudentDashboardPage() {
  const { profile: account } = useAuth()
  const { profile, isLoading } = useStudentProfile()
  const completion = calculateProfileCompletion(profile)

  const displayName = account?.fullName ?? account?.email ?? 'there'
  const firstName = displayName.split(' ')[0].split('@')[0]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-1 text-sm text-ink-600">Find your next opportunity.</p>
      </div>

      {/* Profile completion -- the one thing every student can act on today,
          so it leads the dashboard rather than sharing a row with everything else. */}
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2 className="font-display text-base font-semibold text-ink-900">
              Profile completion
            </h2>
            <p className="mt-1 text-sm text-ink-600">
              {completion.percent === 100
                ? 'Your profile is complete.'
                : 'A complete profile improves your matches.'}
            </p>

            {isLoading ? (
              <div className="mt-4">
                <Spinner label="Loading…" />
              </div>
            ) : (
              <>
                <div className="mt-4 max-w-sm">
                  <ProgressBar value={completion.percent} />
                </div>
                {completion.missingFields.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {completion.missingFields.map((field) => (
                      <Badge key={field} tone="neutral">
                        {field}
                      </Badge>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <Link to="/student/profile" className="shrink-0">
            <Button variant={completion.percent === 100 ? 'outline' : 'primary'}>
              {completion.percent === 100 ? 'Edit profile' : 'Complete your profile'}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Top match</CardTitle>
            <CardDescription>
              Once your profile is complete, matches appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-10">
            <MatchRing value={0} label="No matches yet" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent applications</CardTitle>
            <CardDescription>Track applications as you submit them.</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="No applications yet"
              description="Once you apply to an internship, it will show up here."
              action={<Button size="sm">Browse internships</Button>}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
