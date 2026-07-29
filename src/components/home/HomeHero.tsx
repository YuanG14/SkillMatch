import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { FloatingCard } from '@/components/ui/FloatingCard'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { AlertTriangleIcon } from '@/components/ui/icons'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Soft decorative glow -- supports the UI, doesn't compete with it */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary-50 opacity-70 blur-3xl"
      />

      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl">
              Find internships that match your skills.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-600">
              SkillMatch connects students with internship opportunities based on their
              skills, experience, goals, and career preferences.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to={APP_ROUTES.register}>
                <Button size="lg">Get Started &rarr;</Button>
              </Link>
              <Link
                to={APP_ROUTES.howItWorks}
                className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
              >
                How It Works &rarr;
              </Link>
            </div>
          </div>

          {/* Signature hero visual: an internship match, with floating
              match/gap callouts layered around it for depth. */}
          <div className="relative mx-auto w-full max-w-md pt-5 pr-5 pb-5 pl-5">
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

            <FloatingCard className="absolute -top-2 -right-2 hidden items-center gap-2 sm:flex">
              <MatchRing value={92} size={40} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Skill Match
                </p>
                <p className="font-display text-sm font-semibold text-primary-700">
                  Excellent
                </p>
              </div>
            </FloatingCard>

            <FloatingCard className="absolute -bottom-2 -left-2 hidden items-center gap-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warning-50 text-warning-600">
                <AlertTriangleIcon width={16} height={16} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Skill Gaps
                </p>
                <p className="font-display text-sm font-semibold text-ink-900">
                  2 to improve
                </p>
              </div>
            </FloatingCard>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
