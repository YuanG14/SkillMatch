import { TargetIcon, LayersIcon, UserIcon } from '@/components/ui/icons'
import { SectionContainer } from '@/components/ui/SectionContainer'

const indicators = [
  { icon: TargetIcon, label: 'Skill-based matching' },
  { icon: LayersIcon, label: 'Personalized recommendations' },
  { icon: UserIcon, label: 'Built for students' },
]

/**
 * A compact trust strip. SkillMatch doesn't have real usage numbers yet, so
 * this uses non-numeric product claims instead of fabricated statistics.
 */
export function SocialProofSection() {
  return (
    <section className="border-y border-border bg-surface-muted py-8">
      <SectionContainer>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {indicators.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-ink-700">
              <Icon className="text-primary-600" width={17} height={17} />
              {label}
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
