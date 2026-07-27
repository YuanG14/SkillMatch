import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export function CompanyDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Dashboard</h1>
          <p className="text-sm text-ink-600">
            This is a shell for Sprint 1 to fill in with real data.
          </p>
        </div>
        <Button size="sm">Post a listing</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your listings</CardTitle>
          <CardDescription>
            Internship postings and their candidate pipelines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No listings yet"
            description="Post your first internship to start matching with students."
            action={<Button size="sm">Post a listing</Button>}
          />
        </CardContent>
      </Card>
    </div>
  )
}
