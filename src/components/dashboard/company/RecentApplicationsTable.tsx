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
import { UsersIcon } from '@/components/ui/icons'
import { APPLICATION_STATUS_TONE } from '@/utils/statusTone'
import { FOCUS_RING } from '@/utils/a11y'
import { cn } from '@/utils/cn'
import type {
  MockCompanyApplication,
  ApplicationStatus,
} from '@/mock/companyDashboardData'

const STATUS_TONE: Record<ApplicationStatus, BadgeTone> = {
  'Under Review': APPLICATION_STATUS_TONE['Under Review'],
  Shortlisted: APPLICATION_STATUS_TONE.Shortlisted,
  Interview: APPLICATION_STATUS_TONE.Interview,
  Rejected: APPLICATION_STATUS_TONE.Rejected,
}

function formatAppliedDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

interface RecentApplicationsTableProps {
  applications: MockCompanyApplication[]
}

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <EmptyState
        icon={UsersIcon}
        title="No applicants yet"
        description="Applicants will appear here when students apply to your internships."
        action={
          <Link to="/company/listings">
            <Button size="sm">View Internships</Button>
          </Link>
        }
      />
    )
  }

  return (
    <Table className="min-w-[720px]">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Candidate</TableHeaderCell>
          <TableHeaderCell>Internship</TableHeaderCell>
          <TableHeaderCell>Match</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Applied</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.candidateName}</TableCell>
            <TableCell className="text-ink-600">{application.internshipTitle}</TableCell>
            <TableCell className="font-semibold text-primary-600">
              {application.matchPercent}%
            </TableCell>
            <TableCell>
              <Badge tone={STATUS_TONE[application.status]}>{application.status}</Badge>
            </TableCell>
            <TableCell className="text-ink-600">
              {formatAppliedDate(application.appliedDate)}
            </TableCell>
            <TableCell>
              <button
                type="button"
                className={cn(
                  'rounded text-sm font-medium text-primary-600 hover:text-primary-700',
                  FOCUS_RING,
                )}
              >
                View
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
