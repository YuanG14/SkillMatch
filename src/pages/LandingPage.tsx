import { Link, Navigate } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import { PageStatus } from '@/features/auth/ProtectedRoute'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'

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
    title: 'Create Your Profile',
    description: 'Tell SkillMatch about your background and goals.',
  },
  {
    number: '02',
    title: 'Add Your Skills',
    description: 'List what you know -- SkillMatch handles the rest.',
  },
  {
    number: '03',
    title: 'Discover Matches',
    description: 'Get a ranked list of internships that fit.',
  },
  {
    number: '04',
    title: 'Apply & Track',
    description: 'Submit applications and follow their progress.',
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
      {/* Hero */}
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={APP_ROUTES.register}>
                <Button size="lg">Find Your Match</Button>
              </Link>
              <Link to={`${APP_ROUTES.register}?as=company`}>
                <Button size="lg" variant="outline">
                  I&apos;m a Company
                </Button>
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

      {/* Features */}
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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
              How it works
            </h2>
            <Link
              to={APP_ROUTES.howItWorks}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              See How It Works &rarr;
            </Link>
          </div>
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
        </div>
      </section>

      {/* For companies */}
      <section
        id="for-companies"
        className="border-t border-border bg-surface-muted py-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-950">
              Hiring interns? Skip the noise.
            </h2>
            <p className="mt-2 max-w-md text-ink-600">
              Post a listing and see candidates ranked by real skill fit, not keyword
              matching.
            </p>
          </div>
          <Link to="/signup?as=company">
            <Button size="lg" variant="outline">
              I&apos;m a Company
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
