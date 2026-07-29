import { Card, CardContent } from '@/components/ui/Card'
import { CheckIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

const haveSkills = ['React', 'TypeScript', 'Git']
const improveSkills = ['Next.js', 'REST APIs']

export function SkillGapSection() {
  return (
    <section
      id="skill-gaps"
      className="scroll-mt-[140px] border-t border-border bg-surface-muted py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Skill Gap Analysis"
              title="Know What to Improve"
              subtitle="SkillMatch doesn't just show you opportunities. It helps you understand the skills you can develop to become a stronger candidate -- useful even when you're not a perfect match yet."
            />
          </Reveal>

          <Reveal delay={100} className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-ink-600">Your Match</p>
                  <span className="font-display text-2xl font-semibold text-ink-900">
                    78%
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    You already have
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {haveSkills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-sm text-ink-800"
                      >
                        <CheckIcon className="text-success-600" width={16} height={16} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    Consider improving
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {improveSkills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-sm text-ink-700"
                      >
                        <AlertTriangleIcon
                          className="text-warning-600"
                          width={16}
                          height={16}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <NextSectionLink targetId="recommendations" label="Recommendations" />
      </div>
    </section>
  )
}
