import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { Reveal } from '@/components/how-it-works/Reveal'
import { APP_ROUTES } from '@/constants/routes'

const candidates = [
  { name: 'Frontend Developer Intern', match: 92, skills: ['React', 'TypeScript'] },
  { name: 'Full-Stack Developer Intern', match: 81, skills: ['Node.js', 'SQL'] },
]

export function ForCompaniesHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl">
            Hire interns who already fit the role.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-600">
            Post your requirements and see applicants ranked by real skill fit --
            not keyword matching -- so your team spends time on candidates worth
            interviewing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={`${APP_ROUTES.register}?as=company`}>
              <Button size="lg">Post an Internship</Button>
            </Link>
            <Link
              to={APP_ROUTES.howItWorks}
              className="text-sm font-medium text-ink-700 hover:text-ink-900"
            >
              How it works &rarr;
            </Link>
          </div>
        </Reveal>

        {/* Hero product visual: a ranked applicant list, not the student-facing card */}
        <Reveal delay={100}>
          <Card className="p-6">
            <CardContent className="flex flex-col gap-4 p-0">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Applicants for Frontend Developer Intern
              </p>
              {candidates.map((candidate) => (
                <div
                  key={candidate.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-muted p-4"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-ink-900">
                      {candidate.name}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} tone="primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <MatchRing value={candidate.match} size={56} />
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
