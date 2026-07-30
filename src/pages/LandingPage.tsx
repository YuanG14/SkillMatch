import { Link, Navigate } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import { PageStatus } from '@/features/auth/ProtectedRoute'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { UserIcon, BuildingIcon, ArrowRightIcon } from '@/components/ui/icons'

const features = [
  {
    title: 'Skill-Based Matching',
    description:
      'Opportunities are ranked by how closely they line up with the skills you actually have.',
  },
  {
    title: 'Skill Gap Analysis',
    description:
      'See exactly which skills stand between you and a role you want, before you apply.',
  },
  {
    title: 'Personalized Opportunities',
    description:
      'A feed shaped by your profile, goals, and preferences -- not a generic list.',
  },
  {
    title: 'Application Tracking',
    description: 'Follow every application from submitted to offer in one place.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description: 'Tell us about your skills and experience.',
  },
  {
    number: '02',
    title: 'Discover Opportunities',
    description: 'Explore internships relevant to you.',
  },
  {
    number: '03',
    title: 'See Your Match',
    description: 'Understand how well you fit each opportunity.',
  },
  {
    number: '04',
    title: 'Improve & Apply',
    description: 'Identify skill gaps and make informed decisions.',
  },
]

export function LandingPage() {
  const { isLoading, user, profile } = useAuth()

  if (isLoading) return <PageStatus message="Loading…" />
  if (user && !user.email_confirmed_at)
    return <Navigate to={APP_ROUTES.verifyEmail} replace />
  if (profile) return <Navigate to={ROLE_DASHBOARD_ROUTES[profile.role]} replace />

  return (
    <>
      {/* Hero -- one primary CTA, no competing buttons */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl">
              Find internships that match your skills.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-600">
              SkillMatch connects students with internship opportunities based on their
              skills, experience, goals, and career preferences.
            </p>
            <div className="mt-8">
              <Link to={APP_ROUTES.register}>
                <Button size="lg">Get Started &rarr;</Button>
              </Link>
            </div>
          </div>

          {/* Signature hero visual: skills matching into a role, scored with a MatchRing */}
          <Card className="p-6">
            <CardContent className="flex flex-col gap-6 p-0">
              <div className="flex flex-wrap gap-2">
                <Badge tone="primary">React</Badge>
                <Badge tone="primary">TypeScript</Badge>
                <Badge tone="primary">SQL</Badge>
                <Badge tone="neutral">Figma</Badge>
              </div>

              <div className="flex items-center gap-3 text-ink-400">
                <div className="h-px flex-1 border-t border-dashed border-border-strong" />
                <span className="text-xs font-medium uppercase tracking-wide">
                  matched to
                </span>
                <div className="h-px flex-1 border-t border-dashed border-border-strong" />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-surface-muted p-4">
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">
                    Frontend Engineering Intern
                  </p>
                  <p className="text-sm text-ink-600">Northline Analytics</p>
                </div>
                <MatchRing value={92} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features -- purely informational, no CTA */}
      <section
        id="for-students"
        className="border-t border-border bg-surface-muted py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
            Built around how matching actually works
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent>
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works (teaser -- full walkthrough lives on the dedicated page) */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
            How SkillMatch Works
          </h2>
          <p className="mt-2 max-w-lg text-ink-600">
            Find opportunities that fit your skills, experience, and career goals.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="font-display text-3xl font-semibold text-primary-600">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{step.description}</p>
              </div>
            ))}
          </div>
          <Link
            to={APP_ROUTES.howItWorks}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            See How It Works
            <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
      </section>

      {/* Student / Company -- informational, text links only, no competing buttons */}
      <section
        id="for-companies"
        className="border-t border-border bg-surface-muted py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <UserIcon width={18} height={18} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink-950">
                  Students
                </h3>
                <p className="text-sm text-ink-600">
                  Find internships that match your skills and career goals.
                </p>
                <Link
                  to={APP_ROUTES.howItWorks}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Explore Student Experience
                  <ArrowRightIcon width={15} height={15} />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col gap-3 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <BuildingIcon width={18} height={18} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink-950">
                  Companies
                </h3>
                <p className="text-sm text-ink-600">
                  Find candidates whose skills align with your internship requirements.
                </p>
                <Link
                  to={APP_ROUTES.howItWorks}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Explore Company Experience
                  <ArrowRightIcon width={15} height={15} />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA -- the one strong conversion point after the story has been told */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
            Ready to find your match?
          </h2>
          <p className="mt-3 text-ink-600">
            Build your profile and discover internships that fit your skills.
          </p>
          <div className="mt-8">
            <Link to={APP_ROUTES.register}>
              <Button size="lg">Get Started &rarr;</Button>
            </Link>
          </div>
          <Link
            to={`${APP_ROUTES.register}?as=company`}
            className="mt-4 inline-block text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            I&apos;m a company &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
