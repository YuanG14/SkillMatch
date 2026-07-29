import {
  TargetIcon,
  ChartIcon,
  LayersIcon,
  SearchIcon,
  UserIcon,
  ClipboardCheckIcon,
} from '@/components/ui/icons'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { FeatureCard } from '@/components/ui/FeatureCard'

const features = [
  {
    icon: TargetIcon,
    title: 'Skill Matching',
    description: 'Compare your skills against internship requirements.',
  },
  {
    icon: ChartIcon,
    title: 'Match Percentage',
    description: 'Understand how closely you fit an opportunity.',
  },
  {
    icon: LayersIcon,
    title: 'Skill Gap Analysis',
    description: 'See what skills you are missing before you apply.',
  },
  {
    icon: SearchIcon,
    title: 'Personalized Recommendations',
    description: 'Discover internships based on your profile.',
  },
  {
    icon: UserIcon,
    title: 'Student Profile',
    description: 'Showcase your skills, education, projects, and experience.',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Application Tracking',
    description: 'Keep track of your internship applications in one place.',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="for-students"
      className="border-t border-border bg-primary-50/60 py-20"
    >
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
              Features
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink-950 sm:text-3xl">
              Everything you need to find the right internship.
            </h2>
            <p className="mt-3 text-base text-ink-600">
              SkillMatch is built around one idea: internship search should start with
              your skills, not a keyword search.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
