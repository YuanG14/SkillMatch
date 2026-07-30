import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

const problems = [
  'Dozens of listings that all sound the same',
  'Requirements that are vague until after you apply',
  'No way to tell if you\u2019re actually qualified',
  'Applying to roles that were never a fit',
  'No idea which skills are holding you back',
  'Applications scattered across emails and tabs',
]

export function ProblemSection() {
  return (
    <section
      id="the-problem"
      className="scroll-mt-[140px] border-t border-border bg-surface-muted py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="The Problem"
            title="Finding an internship shouldn't feel like guessing."
          />
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <Reveal key={problem} delay={index * 40} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              <p className="text-sm text-ink-700">{problem}</p>
            </Reveal>
          ))}
        </div>

        <NextSectionLink targetId="matching" label="Matching" />
      </div>
    </section>
  )
}
