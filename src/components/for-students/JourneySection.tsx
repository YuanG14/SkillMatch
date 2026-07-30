import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

const journey = [
  {
    number: '01',
    title: 'Build your profile',
    description: 'Add your education, skills, projects, experience, and preferences.',
  },
  {
    number: '02',
    title: 'Discover opportunities',
    description: 'Browse internships that line up with your profile.',
  },
  {
    number: '03',
    title: 'Understand your match',
    description: 'See your Match Score and why an opportunity fits.',
  },
  {
    number: '04',
    title: 'Apply with confidence',
    description: 'Use skill gap insights and recommendations to apply smarter.',
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
          <SectionHeading eyebrow="Your Journey" title="Your journey with SkillMatch" />
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step, index) => (
            <Reveal key={step.number} delay={index * 60}>
              <span className="font-display text-3xl font-semibold text-primary-600">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-ink-600">{step.description}</p>
            </Reveal>
          ))}
        </div>

        <NextSectionLink targetId="benefits" label="Benefits" />
      </div>
    </section>
  )
}
