import { Card, CardContent } from '@/components/ui/Card'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { MatchRing } from '@/components/ui/MatchRing'
import { ArrowRightIcon } from '@/components/ui/icons'

const matchedSkills = ['React', 'TypeScript', 'Git']
const gapSkills = ['Next.js']

export function MatchingShowcaseSection() {
  return (
    <section className="border-t border-border bg-surface-muted py-20">
      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Matching Engine"
            title="Know why you're a match."
            subtitle="SkillMatch compares your profile against each internship's requirements and shows you exactly how you stack up -- not just a yes or no."
          />

          <Card className="mx-auto w-full max-w-md">
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink-800">
                  Your Profile
                </div>
                <ArrowRightIcon className="shrink-0 text-ink-400" width={16} height={16} />
                <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-2.5 text-sm font-medium text-primary-700">
                  Internship
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-border pt-5">
                <MatchRing value={92} size={72} />
                <div>
                  <p className="font-display text-base font-semibold text-ink-900">
                    Excellent Match
                  </p>
                  <p className="text-sm text-ink-600">
                    Frontend Developer Intern &middot; Northline Analytics
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-border pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    You have
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {matchedSkills.map((skill) => (
                      <li key={skill}>
                        <SkillBadge skill={skill} status="matched" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    To improve
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {gapSkills.map((skill) => (
                      <li key={skill}>
                        <SkillBadge skill={skill} status="gap" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </section>
  )
}
