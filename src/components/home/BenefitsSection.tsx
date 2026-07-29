import { Card, CardContent } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import { CheckIcon } from '@/components/ui/icons'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'

const recommendations = [
  { title: 'Frontend Developer Intern', company: 'Northline Analytics', match: 92 },
  { title: 'UI/UX Developer Intern', company: 'Fieldstone Studio', match: 86 },
  { title: 'Full Stack Developer Intern', company: 'Corriente Labs', match: 81 },
]

const benefits = [
  'Stop guessing which internships fit',
  'Understand your strengths',
  'Discover skills to improve',
  'Find opportunities aligned with your goals',
  'Make more informed applications',
]

export function BenefitsSection() {
  return (
    <section className="border-t border-border py-20">
      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Card className="order-2 mx-auto w-full max-w-md lg:order-1">
            <CardContent className="flex flex-col gap-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Recommended For You
              </p>
              {recommendations.map((role) => (
                <div
                  key={role.title}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink-900">{role.title}</p>
                    <p className="text-xs text-ink-600">{role.company}</p>
                  </div>
                  <MatchRing value={role.match} size={44} />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="order-1 lg:order-2">
            <SectionHeading
              title="More than an internship search."
              subtitle="SkillMatch is built to help you make sense of internship search -- not just add another list of listings."
            />
            <ul className="mt-6 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-ink-700">
                  <CheckIcon
                    className="mt-0.5 shrink-0 text-primary-600"
                    width={17}
                    height={17}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
