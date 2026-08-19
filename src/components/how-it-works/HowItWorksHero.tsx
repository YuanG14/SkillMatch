import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { ArrowDownIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/how-it-works/Reveal'

export function HowItWorksHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl">
            How SkillMatch Works
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-600">
            From your skills to your next opportunity. SkillMatch looks at your education,
            skills, projects, and experience, then matches your profile against internship
            requirements -- so you know where you fit and where you can grow.
          </p>
        </Reveal>

        {/* Interactive workflow visualization: profile -> engine -> match -> internship */}
        <Reveal delay={100}>
          <Card className="p-6">
            <CardContent className="flex flex-col items-center gap-4 p-0">
              <div className="w-full rounded-lg border border-border bg-surface-muted p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Your Profile
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <Badge tone="primary">Skills</Badge>
                  <Badge tone="primary">Education</Badge>
                  <Badge tone="primary">Projects</Badge>
                </div>
              </div>

              <ArrowDownIcon className="text-ink-400" width={16} height={16} />

              <div className="w-full rounded-lg border border-primary-100 bg-primary-50 p-4 text-center">
                <p className="font-display text-sm font-semibold text-primary-700">
                  SkillMatch Engine
                </p>
                <p className="mt-1 text-xs text-primary-600">
                  Comparing your profile to internship requirements
                </p>
              </div>

              <ArrowDownIcon className="text-ink-400" width={16} height={16} />

              <div className="flex w-full items-center justify-between rounded-lg border border-border bg-surface p-4">
                <MatchRing value={92} size={64} />
                <div className="text-right">
                  <p className="font-display text-sm font-semibold text-ink-900">
                    Frontend Developer Intern
                  </p>
                  <p className="text-sm text-ink-600">Northline Analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
