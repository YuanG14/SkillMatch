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
import { MatchRing } from '@/components/ui/MatchRing'
import { Spinner } from '@/components/ui/Spinner'
import { useStudentProfile } from '@/features/studentProfile/useStudentProfile'
import { calculateProfileCompletion } from '@/utils/profileCompletion'

export function StudentDashboardPage() {
  const { profile, isLoading } = useStudentProfile()
  const completion = calculateProfileCompletion(profile)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">Dashboard</h1>
        <p className="text-sm text-ink-600">
          Here's where things stand with your SkillMatch profile.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile completion</CardTitle>
            <CardDescription>
              {completion.percent === 100
                ? 'Your profile is complete.'
                : 'A complete profile improves your matches.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {isLoading ? (
              <Spinner label="Loading…" />
            ) : (
              <>
                <MatchRing value={completion.percent} />
                <Link to="/student/profile">
                  <Button
                    size="sm"
                    variant={completion.percent === 100 ? 'outline' : 'primary'}
                  >
                    {completion.percent === 100
                      ? 'Edit profile'
                      : 'Complete your profile'}
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top match</CardTitle>
            <CardDescription>
              Once your profile is complete, matches appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <MatchRing value={0} label="No matches yet" />
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
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
