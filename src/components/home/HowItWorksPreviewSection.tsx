import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRightIcon } from '@/components/ui/icons'

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description: 'Tell us about your skills and experience.',
  },
  {
    number: '02',
    title: 'Discover Opportunities',
    description: 'Explore internships relevant to you.',
  },
  {
    number: '03',
    title: 'See Your Match',
    description: 'Understand how well you fit each opportunity.',
  },
  {
    number: '04',
    title: 'Understand Your Skill Gaps',
    description: 'See what would make you an even stronger candidate.',
  },
]

export function HowItWorksPreviewSection() {
  return (
    <section className="border-t border-border py-20">
      <SectionContainer>
        <SectionHeading
          title="How SkillMatch Works"
          subtitle="Find opportunities that fit your skills, experience, and career goals."
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-display text-3xl font-semibold text-primary-600">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-ink-600">{step.description}</p>
            </div>
          ))}
        </div>

        <Link
          to={APP_ROUTES.howItWorks}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          See How It Works
          <ArrowRightIcon width={15} height={15} />
        </Link>
      </SectionContainer>
    </section>
  )
}
