import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@/components/ui/Table'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import type { MockApplication, ApplicationStatus } from '@/mock/studentDashboardData'

const STATUS_TONE: Record<ApplicationStatus, BadgeTone> = {
  Applied: 'neutral',
  'Under Review': 'primary',
  'Interview Scheduled': 'warning',
  Accepted: 'success',
  Rejected: 'danger',
}

function formatAppliedDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface RecentApplicationsTableProps {
  applications: MockApplication[]
}

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Your internship applications will appear here once you apply."
        action={
          <Link to="/student/internships">
            <Button size="sm">Browse Internships</Button>
          </Link>
        }
      />
    )
  }

  return (
    <Table className="min-w-[560px]">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Job Title</TableHeaderCell>
          <TableHeaderCell>Company</TableHeaderCell>
          <TableHeaderCell>Match</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Applied Date</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.jobTitle}</TableCell>
            <TableCell className="text-ink-600">{application.companyName}</TableCell>
            <TableCell className="font-semibold text-primary-600">
              {application.matchPercent}%
            </TableCell>
            <TableCell>
              <Badge tone={STATUS_TONE[application.status]}>{application.status}</Badge>
            </TableCell>
            <TableCell className="text-ink-600">
              {formatAppliedDate(application.appliedDate)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
