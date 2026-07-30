import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { Reveal } from '@/components/how-it-works/Reveal'

const matchedSkills = ['React', 'TypeScript', 'Git', 'HTML/CSS']
const skillGaps = ['Next.js', 'REST APIs']

interface ForStudentsHeroProps {
  primaryCta: { label: string; to: string }
}

export function ForStudentsHero({ primaryCta }: ForStudentsHeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl">
            Find internships that match your skills.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-600">
            Stop applying blindly. SkillMatch analyzes your skills, education,
            experience, projects, and preferences to surface internships that actually
            fit what you know and where you want to go.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={primaryCta.to}>
              <Button size="lg">{primaryCta.label}</Button>
            </Link>
            <a
              href="#matching"
              className="text-sm font-medium text-ink-700 hover:text-ink-900"
            >
              How it works &rarr;
            </a>
          </div>
        </Reveal>

        {/* Hero product visual: internship card with match + skill breakdown */}
        <Reveal delay={100}>
          <div className="relative">
            <Card className="relative z-10 p-6">
              <CardContent className="flex flex-col gap-6 p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-base font-semibold text-ink-900">
                      Frontend Developer Intern
                    </p>
                    <p className="text-sm text-ink-600">Northline Analytics</p>
                  </div>
                  <MatchRing value={92} size={64} />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Matched skills
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.map((skill) => (
                      <Badge key={skill} tone="success">
                        &#10003; {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Skill gaps
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skillGaps.map((skill) => (
                      <Badge key={skill} tone="warning">
                        &#9888; {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Badge
              tone="primary"
              className="absolute -top-4 -right-4 z-20 hidden shadow-[0_4px_12px_rgba(42,82,224,0.18)] sm:inline-flex"
            >
              Recommended for you
            </Badge>
            <Badge
              tone="neutral"
              className="absolute -bottom-4 -left-4 z-20 hidden bg-surface shadow-[0_4px_12px_rgba(16,24,40,0.08)] sm:inline-flex"
            >
              3 matched skills &middot; 2 to improve
            </Badge>
            <div
              aria-hidden
              className="absolute inset-8 -z-10 rounded-full bg-primary-100/60 blur-3xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
