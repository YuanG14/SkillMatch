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

export function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-950">Dashboard</h1>
        <p className="text-sm text-ink-600">
          This is a shell for Sprint 1 to fill in with real data.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        <Card className="sm:col-span-2 lg:col-span-2">
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
