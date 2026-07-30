import { Card, CardContent } from '@/components/ui/Card'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import {
  BriefcaseIcon,
  ChartIcon,
  FileTextIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from '@/components/ui/icons'

const benefits = [
  {
    icon: SearchIcon,
    title: 'Find better-fit internships',
    description: 'Spend less time browsing listings that were never going to fit.',
  },
  {
    icon: ChartIcon,
    title: 'Understand your strengths',
    description: 'See which skills make you a strong candidate for a role.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Identify skill gaps',
    description: 'Know exactly what to learn next to become a stronger applicant.',
  },
  {
    icon: UsersIcon,
    title: 'Build a stronger profile',
    description: 'Showcase your education, projects, skills, and experience in one place.',
  },
  {
    icon: FileTextIcon,
    title: 'Make better applications',
    description: 'Understand an opportunity before you spend time applying.',
  },
  {
    icon: SettingsIcon,
    title: 'Track your progress',
    description: 'Keep every application organized from submitted to offer.',
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="mx-auto max-w-7xl scroll-mt-[140px] px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Benefits" title="Built around your career journey." />
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 60}>
            <Card className="h-full">
              <CardContent>
                <benefit.icon className="text-primary-600" aria-hidden />
                <h3 className="mt-4 font-display text-base font-semibold text-ink-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{benefit.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
