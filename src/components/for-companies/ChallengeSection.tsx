import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'

const challenges = [
  'Stacks of applications that all look the same on paper',
  'No easy way to tell who can actually do the work',
  'Screening candidates who were never a real fit',
  'Requirements that get lost between the posting and the review',
  'Hours spent comparing resumes instead of comparing skills',
  'Strong candidates buried under generic ones',
]

export function ChallengeSection() {
  return (
    <section className="border-t border-border bg-surface-muted py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="The Challenge"
            title="Sorting resumes shouldn't be your hiring strategy."
          />
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <Reveal key={challenge} delay={index * 40} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              <p className="text-sm text-ink-700">{challenge}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
