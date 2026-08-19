import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { StudentHero } from '@/components/dashboard/student/StudentHero'
import { DashboardSection } from '@/components/dashboard/DashboardSection'
import { SectionLink } from '@/components/dashboard/SectionLink'
import { StatCard } from '@/components/dashboard/StatCard'
import {
  StatCardSkeleton,
  ListRowSkeleton,
  TableSkeleton,
} from '@/components/dashboard/DashboardSkeletons'
import { InternshipRecommendationCard } from '@/components/dashboard/student/InternshipRecommendationCard'
import { RecentApplicationsTable } from '@/components/dashboard/student/RecentApplicationsTable'
import { ProfileCompletionCard } from '@/components/dashboard/student/ProfileCompletionCard'
import { FileTextIcon, UsersIcon, ChartIcon, BriefcaseIcon } from '@/components/ui/icons'
import { useStudentProfile } from '@/features/studentProfile/useStudentProfile'
import { calculateProfileCompletion } from '@/utils/profileCompletion'
import {
  MOCK_RECOMMENDED_INTERNSHIPS,
  MOCK_APPLICATIONS,
  MOCK_DASHBOARD_STATS,
} from '@/mock/studentDashboardData'

export function StudentDashboardPage() {
  const { profile, isLoading } = useStudentProfile()
  const completion = calculateProfileCompletion(profile)

  return (
    <div className="flex flex-col gap-8">
      <StudentHero />

      <div className="grid gap-5 sm:grid-cols-3">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Total Applications"
              value={String(MOCK_DASHBOARD_STATS.totalApplications)}
              supportingText={MOCK_DASHBOARD_STATS.totalApplicationsTrend}
              icon={FileTextIcon}
              trend="up"
            />
            <StatCard
              label="Interviews"
              value={String(MOCK_DASHBOARD_STATS.interviews)}
              supportingText={MOCK_DASHBOARD_STATS.interviewsTrend}
              icon={UsersIcon}
              trend="up"
            />
            <StatCard
              label="Average Match Score"
              value={`${MOCK_DASHBOARD_STATS.averageMatchScore}%`}
              supportingText={MOCK_DASHBOARD_STATS.averageMatchScoreTrend}
              icon={ChartIcon}
            />
          </>
        )}
      </div>

      <ProfileCompletionCard completion={completion} isLoading={isLoading} />

      <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
        <DashboardSection
          title="Recommended for You"
          description="Internships matched to your skills and goals."
          actions={<SectionLink to="/student/internships">View all</SectionLink>}
          className="lg:col-span-3"
        >
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <ListRowSkeleton />
              <ListRowSkeleton />
            </div>
          ) : MOCK_RECOMMENDED_INTERNSHIPS.length > 0 ? (
            <div className="flex flex-col gap-4">
              {MOCK_RECOMMENDED_INTERNSHIPS.map((internship) => (
                <InternshipRecommendationCard
                  key={internship.id}
                  internship={internship}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BriefcaseIcon}
              title="No recommendations yet"
              description="Complete your profile to unlock personalized internship matches."
              action={
                <Link to="/student/profile">
                  <Button size="sm">Complete Profile</Button>
                </Link>
              }
            />
          )}
        </DashboardSection>

        <DashboardSection
          title="Recent Applications"
          description="Track the status of internships you've applied to."
          className="lg:col-span-2"
        >
          {isLoading ? (
            <TableSkeleton rows={3} columns={4} />
          ) : (
            <RecentApplicationsTable applications={MOCK_APPLICATIONS} />
          )}
        </DashboardSection>
      </div>
    </div>
  )
}
