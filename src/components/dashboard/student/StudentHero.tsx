import { Link } from 'react-router-dom'
import heroIllustration from '@/assets/dashboard/student-hero-illustration.png'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { BriefcaseIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/useAuth'
import { useStudentProfile } from '@/features/studentProfile/useStudentProfile'
import { calculateProfileCompletion } from '@/utils/profileCompletion'
import { MOCK_TOP_MATCH, MOCK_RECOMMENDED_PREVIEW } from '@/mock/studentDashboardData'

const todaysDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function StudentHero() {
  const { profile: authProfile } = useAuth()
  const { profile: studentProfile } = useStudentProfile()
  const completion = calculateProfileCompletion(studentProfile)
  const firstName = authProfile?.fullName?.trim().split(' ')[0]
  const recommendedPreview = MOCK_RECOMMENDED_PREVIEW.slice(0, 2)

  return (
    <DashboardHero
      eyebrow={todaysDate}
      title={
        <>
          Hello, <span className="text-primary-600">{firstName ?? 'Future Intern'}!</span>
        </>
      }
      description="Discover internship opportunities that match your skills, goals, and passion."
      actions={
        <Link to="/student/internships">
          <Button size="lg">Browse internships</Button>
        </Link>
      }
      illustration={
        <div className="relative mx-auto flex w-full max-w-xs items-center justify-center py-6 lg:max-w-sm lg:py-4">
          {/* Soft background shape ties the illustration into the blue/white palette */}
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-[2.5rem] bg-primary-100/70 blur-2xl"
          />

          <img
            src={heroIllustration}
            alt="Student intern reviewing recommended internships on a tablet"
            className="relative z-10 h-auto w-48 rounded-2xl object-cover shadow-lg sm:w-56 lg:w-64"
          />

          {/* Top match -- mock: matching isn't built yet, shown for layout only */}
          <Card className="absolute -left-2 top-2 z-20 hidden w-36 flex-col items-center gap-2 p-3 shadow-md sm:flex lg:-left-6">
            <MatchRing value={MOCK_TOP_MATCH.matchPercent} size={44} />
            <div className="text-center">
              <p className="text-xs font-semibold leading-tight text-ink-900">
                {MOCK_TOP_MATCH.internshipTitle}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-600">
                {MOCK_TOP_MATCH.companyName}
              </p>
            </div>
          </Card>

          {/* Recommended preview -- mock: real recommendations aren't built yet */}
          <Card className="absolute -right-2 top-0 z-20 hidden w-44 p-3 shadow-md sm:block lg:-right-6">
            <p className="mb-2 text-xs font-semibold text-ink-900">Recommended for you</p>
            <ul className="flex flex-col gap-2">
              {recommendedPreview.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <BriefcaseIcon className="h-3 w-3" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-medium text-ink-900">
                    {item.internshipTitle}
                  </span>
                  <Badge tone="success" className="shrink-0">
                    {item.matchPercent}%
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>

          {/* Profile completion -- REAL data, same metric shown in the dashboard content below */}
          <Card className="absolute -bottom-3 right-2 z-20 hidden items-center gap-3 p-3 shadow-md sm:flex lg:right-2">
            <MatchRing value={completion.percent} size={40} />
            <div>
              <p className="text-xs font-semibold text-ink-900">Profile</p>
              <p className="text-[11px] text-ink-600">Completeness</p>
            </div>
          </Card>
        </div>
      }
    />
  )
}
