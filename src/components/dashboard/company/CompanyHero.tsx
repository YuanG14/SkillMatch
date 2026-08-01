import { Link } from 'react-router-dom'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { UsersIcon, CheckIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/useAuth'
import { useCompanyProfile } from '@/features/companyProfile/useCompanyProfile'
import { MOCK_TOP_CANDIDATE, MOCK_HERO_STATS } from '@/mock/companyDashboardData'

const todaysDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const HERO_STAT_ICONS = {
  applicants: UsersIcon,
  shortlisted: CheckIcon,
} as const

interface CompanyHeroProps {
  canPostListing: boolean
}

export function CompanyHero({ canPostListing }: CompanyHeroProps) {
  const { profile: authProfile } = useAuth()
  const { profile: companyProfile } = useCompanyProfile()
  const companyName = companyProfile?.companyName ?? authProfile?.fullName?.trim()

  return (
    <DashboardHero
      eyebrow={todaysDate}
      title={
        <>
          Hello, <span className="text-primary-600">{companyName ?? 'Hiring Team'}!</span>
        </>
      }
      description="Find skilled students, manage internship opportunities, and build your next great team."
      actions={
        <>
          {canPostListing ? (
            <Link to="/company/listings">
              <Button size="lg">Post an Internship</Button>
            </Link>
          ) : (
            <Button size="lg" disabled>
              Post an Internship
            </Button>
          )}
          <Link to="/company/candidates">
            <Button size="lg" variant="outline">
              View Applicants
            </Button>
          </Link>
        </>
      }
      illustration={
        <div className="relative mx-auto flex w-full max-w-xs items-center justify-center py-8 lg:max-w-sm lg:py-6">
          {/* Soft background shape ties the visual into the blue/white palette */}
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-[2.5rem] bg-primary-100/70 blur-2xl"
          />

          {/* Central candidate-match visual -- mock: real matching isn't built yet, shown for layout only */}
          <Card className="relative z-10 flex w-64 flex-col gap-3 p-5 shadow-lg sm:w-72">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
              {MOCK_TOP_CANDIDATE.candidateName}
            </p>

            <div className="flex items-center gap-3">
              <MatchRing value={MOCK_TOP_CANDIDATE.matchPercent} size={56} />
              <p className="font-display text-sm font-semibold leading-tight text-ink-900">
                {MOCK_TOP_CANDIDATE.internshipTitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {MOCK_TOP_CANDIDATE.skills.map((skill) => (
                <Badge key={skill} tone="primary">
                  {skill}
                </Badge>
              ))}
            </div>

            <Button size="sm" variant="outline" className="mt-1 w-full">
              View Candidate
            </Button>
          </Card>

          {/* Floating recruitment stats -- mock: real applicant counts aren't built yet */}
          {MOCK_HERO_STATS.map((stat, index) => {
            const Icon = HERO_STAT_ICONS[stat.id as keyof typeof HERO_STAT_ICONS]
            return (
              <Card
                key={stat.id}
                className={
                  index === 0
                    ? 'absolute -left-2 top-2 z-20 hidden w-36 flex-col gap-2 p-3 shadow-md sm:flex lg:-left-6'
                    : 'absolute -bottom-3 right-2 z-20 hidden w-36 flex-col gap-2 p-3 shadow-md sm:flex lg:right-2'
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold leading-none text-ink-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink-900">{stat.label}</p>
                  <p className="text-[11px] text-ink-600">{stat.supportingText}</p>
                </div>
              </Card>
            )
          })}
        </div>
      }
    />
  )
}
