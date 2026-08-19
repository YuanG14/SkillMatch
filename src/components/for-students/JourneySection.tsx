import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

const journey = [
  {
    stage: 'Uncertainty',
    quote: '\u201cI don\u2019t know where to start.\u201d',
  },
  {
    stage: 'Discovery',
    quote: '\u201cI found opportunities that fit me.\u201d',
  },
  {
    stage: 'Confidence',
    quote: '\u201cI understand why I\u2019m a good match.\u201d',
  },
  {
    stage: 'Growth',
    quote: '\u201cI know what I should improve.\u201d',
  },
  {
    stage: 'Action',
    quote: '\u201cI\u2019m ready to apply.\u201d',
  },
]

export function JourneySection() {
  return (
    <section
      id="your-journey"
      className="scroll-mt-[140px] border-t border-border bg-surface-muted py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Your Journey"
            title="From uncertainty to a well-fitted opportunity."
          />
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((step, index) => (
            <Reveal key={step.stage} delay={index * 60}>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                {step.stage}
              </p>
              <p className="mt-2 font-display text-base font-semibold text-ink-900">
                {step.quote}
              </p>
            </Reveal>
          ))}
        </div>

        <NextSectionLink targetId="benefits" label="Benefits" />
      </div>
    </section>
  )
}
