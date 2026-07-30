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
    title: 'Discover candidates by skill, not keywords',
    description: 'See applicants ranked by how closely they match what the role needs.',
  },
  {
    icon: ChartIcon,
    title: 'Compare candidates fairly',
    description: 'A consistent match score makes it easy to see who stands out, and why.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Post requirements once',
    description: 'Define what the internship needs and let SkillMatch do the sorting.',
  },
  {
    icon: UsersIcon,
    title: 'Manage applicants in one place',
    description: 'Review, shortlist, and track every candidate without spreadsheets.',
  },
  {
    icon: FileTextIcon,
    title: 'See more than a resume',
    description: 'Skills, projects, education, and experience, all in one profile.',
  },
  {
    icon: SettingsIcon,
    title: 'Spend less time screening',
    description: "Focus your team's time on candidates worth interviewing.",
  },
]

export function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Why SkillMatch" title="Hire with confidence, not guesswork." />
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
