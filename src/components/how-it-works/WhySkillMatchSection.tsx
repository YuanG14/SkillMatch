import { Card, CardContent } from '@/components/ui/Card'
import { CheckIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'

const traditional = [
  'Search through hundreds of listings',
  'Guess whether you\u2019re qualified',
  'Keyword-heavy discovery',
  'No clear skill gap feedback',
  'Applications can become difficult to organize',
]

const skillmatch = [
  'Personalized opportunities',
  'Skill-based matching',
  'A clear match score',
  'Skill gap insights',
  'More informed decisions',
]

export function WhySkillMatchSection() {
  return (
    <section
      id="why-skillmatch"
      className="mx-auto max-w-5xl scroll-mt-[140px] px-6 pt-20 pb-28"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Why SkillMatch"
          title="A Better Way to Find Internships"
          align="center"
          className="mx-auto"
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Traditional Internship Search
              </p>
              <ul className="flex flex-col gap-3">
                {traditional.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-ink-600">
                    <AlertTriangleIcon
                      className="mt-0.5 shrink-0 text-ink-400"
                      width={15}
                      height={15}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card className="h-full border-primary-100 bg-primary-50/40">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                SkillMatch
              </p>
              <ul className="flex flex-col gap-3">
                {skillmatch.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-ink-800">
                    <CheckIcon
                      className="mt-0.5 shrink-0 text-primary-600"
                      width={15}
                      height={15}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
