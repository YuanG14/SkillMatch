import { Card, CardContent } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import { CheckIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'
import { cn } from '@/utils/cn'

const solutionInputs = ['Skills', 'Education', 'Projects', 'Experience', 'Preferences']

function FlowArrow() {
  return (
    <span aria-hidden className={cn('text-xl leading-none text-ink-400', 'rotate-90 lg:rotate-0')}>
      &rarr;
    </span>
  )
}

export function MatchingSection() {
  return (
    <section id="matching" className="mx-auto max-w-7xl scroll-mt-[140px] px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="How Matching Works"
          title="Know which opportunities actually fit you."
          subtitle="SkillMatch looks past keyword matching. It weighs your skills, education, experience, projects, and preferences against what an internship actually requires."
        />
      </Reveal>

      <Reveal
        delay={80}
        className="mt-12 flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4"
      >
        <Card className="w-full max-w-xs p-5 text-center lg:w-64">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
            Your profile
          </p>
          <p className="mt-2 text-sm text-ink-700">{solutionInputs.join(' \u00b7 ')}</p>
        </Card>
        <FlowArrow />
        <Card className="w-full max-w-xs border-primary-100 bg-primary-50 p-5 text-center lg:w-64">
          <p className="font-display text-sm font-semibold text-primary-700">SkillMatch</p>
          <p className="mt-2 text-sm text-primary-700/80">Compares fit</p>
        </Card>
        <FlowArrow />
        <Card className="w-full max-w-xs p-5 text-center lg:w-64">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
            Internship requirements
          </p>
          <p className="mt-2 text-sm text-ink-700">What the role needs</p>
        </Card>
        <FlowArrow />
        <Card className="w-full max-w-xs p-5 text-center lg:w-64">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
            Match score &amp; skill gaps
          </p>
          <p className="mt-2 text-sm text-ink-700">Where you stand, and why</p>
        </Card>
      </Reveal>

      <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h3 className="font-display text-xl font-semibold text-ink-950">
            Your skills. Their requirements. One clear match.
          </h3>
          <p className="mt-2 max-w-md text-ink-600">
            Every internship is scored against your actual profile, so you can see at a
            glance whether it&apos;s worth your time to apply.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <Card className="p-6">
            <CardContent className="flex flex-col gap-5 p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">
                    Frontend Developer Intern
                  </p>
                  <p className="text-sm text-ink-600">92% Match</p>
                </div>
                <MatchRing value={92} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Matched skills
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {['React', 'TypeScript', 'Git', 'HTML/CSS'].map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-sm text-ink-700"
                      >
                        <CheckIcon className="text-success-600" width={15} height={15} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Skills to improve
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {['Next.js', 'REST APIs'].map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-sm text-ink-700"
                      >
                        <AlertTriangleIcon
                          className="text-warning-600"
                          width={15}
                          height={15}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <NextSectionLink targetId="match-score" label="Match Score" />
    </section>
  )
}
