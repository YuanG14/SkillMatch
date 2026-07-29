import { Card, CardContent } from '@/components/ui/Card'
import { CheckIcon, UserIcon, BuildingIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'

const studentPoints = [
  'Build your profile',
  'Showcase your skills',
  'Discover matching internships',
  'Understand skill gaps',
  'Find opportunities aligned with your goals',
]

const companyPoints = [
  'Create a company profile',
  'Post internship opportunities',
  'Define required skills',
  'Discover relevant candidates',
  'Review candidate matches',
]

export function AudienceSection() {
  return (
    <section className="border-t border-border bg-surface-muted py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Built for Both Sides"
            title="One Platform, Two Perspectives"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <UserIcon width={20} height={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-950">
                    Find opportunities that fit you.
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {studentPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-ink-700"
                    >
                      <CheckIcon className="text-primary-600" width={16} height={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <BuildingIcon width={20} height={20} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-950">
                    Find candidates with the right skills.
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {companyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-ink-700"
                    >
                      <CheckIcon className="text-primary-600" width={16} height={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
