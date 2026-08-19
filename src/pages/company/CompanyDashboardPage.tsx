import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { CompanyHero } from '@/components/dashboard/company/CompanyHero'
import { CompanyProfileStatusCard } from '@/components/dashboard/company/CompanyProfileStatusCard'
import { DashboardSection } from '@/components/dashboard/DashboardSection'
import { SectionLink } from '@/components/dashboard/SectionLink'
import { StatCard } from '@/components/dashboard/StatCard'
import {
  StatCardSkeleton,
  ListRowSkeleton,
  TableSkeleton,
} from '@/components/dashboard/DashboardSkeletons'
import { RecentApplicantCard } from '@/components/dashboard/company/RecentApplicantCard'
import { ActiveInternshipCard } from '@/components/dashboard/company/ActiveInternshipCard'
import { RecentApplicationsTable } from '@/components/dashboard/company/RecentApplicationsTable'
import { RecruitmentOverview } from '@/components/dashboard/company/RecruitmentOverview'
import { BriefcaseIcon, UsersIcon, CheckIcon, ChartIcon } from '@/components/ui/icons'
import { useCompanyProfile } from '@/features/companyProfile/useCompanyProfile'
import {
  MOCK_APPLICANTS,
  MOCK_ACTIVE_INTERNSHIPS,
  MOCK_COMPANY_APPLICATIONS,
  MOCK_COMPANY_DASHBOARD_STATS,
  MOCK_RECRUITMENT_OVERVIEW,
} from '@/mock/companyDashboardData'

export function CompanyDashboardPage() {
  const { profile, isLoading } = useCompanyProfile()
  const canPostListing = profile?.verificationStatus === 'verified'

  return (
    <div className="flex flex-col gap-8">
      <CompanyHero canPostListing={canPostListing} />

      <CompanyProfileStatusCard profile={profile} isLoading={isLoading} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Active Internships"
              value={String(MOCK_COMPANY_DASHBOARD_STATS.activeInternships)}
              supportingText={MOCK_COMPANY_DASHBOARD_STATS.activeInternshipsTrend}
              icon={BriefcaseIcon}
              trend="up"
            />
            <StatCard
              label="Total Applicants"
              value={String(MOCK_COMPANY_DASHBOARD_STATS.totalApplicants)}
              supportingText={MOCK_COMPANY_DASHBOARD_STATS.totalApplicantsTrend}
              icon={UsersIcon}
              trend="up"
            />
            <StatCard
              label="Shortlisted"
              value={String(MOCK_COMPANY_DASHBOARD_STATS.shortlisted)}
              supportingText={MOCK_COMPANY_DASHBOARD_STATS.shortlistedTrend}
              icon={CheckIcon}
              trend="up"
            />
            <StatCard
              label="Interviews"
              value={String(MOCK_COMPANY_DASHBOARD_STATS.interviews)}
              supportingText={MOCK_COMPANY_DASHBOARD_STATS.interviewsTrend}
              icon={ChartIcon}
              trend="up"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
        <DashboardSection
          title="Recent Applicants"
          description="Students who recently applied to your internships."
          actions={<SectionLink to="/company/candidates">View all</SectionLink>}
          className="lg:col-span-3"
        >
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <ListRowSkeleton />
              <ListRowSkeleton />
            </div>
          ) : MOCK_APPLICANTS.length > 0 ? (
            <div className="flex flex-col gap-4">
              {MOCK_APPLICANTS.map((applicant) => (
                <RecentApplicantCard key={applicant.id} applicant={applicant} />
              ))}
            </div>
          ) : (
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
          )}
        </DashboardSection>

        <DashboardSection
          title="Active Internships"
          description="Listings currently open for applications."
          actions={<SectionLink to="/company/listings">View all</SectionLink>}
          className="lg:col-span-2"
        >
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <ListRowSkeleton />
              <ListRowSkeleton />
            </div>
          ) : MOCK_ACTIVE_INTERNSHIPS.length > 0 ? (
            <div className="flex flex-col gap-4">
              {MOCK_ACTIVE_INTERNSHIPS.map((internship) => (
                <ActiveInternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BriefcaseIcon}
              title="No internships posted yet"
              description="Create your first internship opportunity to start receiving applications."
              action={
                <Button size="sm" disabled={!canPostListing}>
                  Post an Internship
                </Button>
              }
            />
          )}
        </DashboardSection>
      </div>

      <DashboardSection
        title="Recent Applications"
        description="Track every candidate's status across your open listings."
      >
        {isLoading ? (
          <TableSkeleton rows={4} columns={6} />
        ) : (
          <RecentApplicationsTable applications={MOCK_COMPANY_APPLICATIONS} />
        )}
      </DashboardSection>

      <DashboardSection
        title="Recruitment Overview"
        description="Your hiring pipeline at a glance."
      >
        <RecruitmentOverview overview={MOCK_RECRUITMENT_OVERVIEW} />
      </DashboardSection>
    </div>
  )
}
