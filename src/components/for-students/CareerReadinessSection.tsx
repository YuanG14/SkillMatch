import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'

const outcomes = [
  'Understand your current strengths',
  'Identify the skills worth learning next',
  'Build a profile that grows with you',
  'Discover opportunities aligned with your goals',
  'Become more intentional about your career direction',
]

export function CareerReadinessSection() {
  return (
    <section
      id="career-readiness"
      className="scroll-mt-[140px] border-t border-border bg-surface-muted py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Beyond the Search"
              title="Your internship search can also be your career roadmap."
            />
          </Reveal>

          <Reveal delay={80}>
            <ul className="flex flex-col gap-3">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                  {outcome}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
