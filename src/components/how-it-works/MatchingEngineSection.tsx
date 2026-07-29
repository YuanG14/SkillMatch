import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ArrowDownIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'

function Connector() {
  return (
    <div className="flex justify-center py-2">
      <ArrowDownIcon className="text-ink-400" width={16} height={16} />
    </div>
  )
}

export function MatchingEngineSection() {
  return (
    <section className="border-t border-border bg-surface-muted py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Under the Hood"
            title="How SkillMatch Matches You"
            subtitle="A single engine compares what you bring with what an internship needs, then turns that into a score you can act on."
            align="center"
          />
        </Reveal>

        <div className="mt-14 flex flex-col items-center">
          <Reveal className="w-full max-w-xs">
            <Card className="px-5 py-3 text-center">
              <p className="font-display text-sm font-semibold text-ink-900">
                Your Profile
              </p>
            </Card>
          </Reveal>

          <Connector />

          <Reveal delay={80} className="w-full max-w-sm">
            <Card className="border-primary-100 bg-primary-50 px-5 py-4 text-center">
              <p className="font-display text-sm font-semibold text-primary-700">
                SkillMatch Engine
              </p>
            </Card>
          </Reveal>

          <Connector />

          <Reveal
            delay={140}
            className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {['Skills', 'Education', 'Experience'].map((label) => (
              <Card key={label} className="px-4 py-3 text-center">
                <Badge tone="neutral">{label}</Badge>
              </Card>
            ))}
          </Reveal>

          <Connector />

          <Reveal delay={200} className="w-full max-w-sm">
            <Card className="px-5 py-3 text-center">
              <p className="font-display text-sm font-semibold text-ink-900">
                Internship Requirements
              </p>
            </Card>
          </Reveal>

          <Connector />

          <Reveal delay={260} className="w-full max-w-xs">
            <Card className="border-primary-100 bg-primary-50 px-5 py-4 text-center">
              <p className="font-display text-lg font-semibold text-primary-700">
                Match Score
              </p>
            </Card>
          </Reveal>

          <Connector />

          <Reveal
            delay={320}
            className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div className="flex flex-col items-center gap-2">
              <Card className="w-full border-success-50 bg-success-50/60 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-success-600">Strong Match</p>
              </Card>
              <ArrowDownIcon className="text-ink-400" width={14} height={14} />
              <Card className="w-full px-4 py-3 text-center">
                <p className="text-sm text-ink-700">Recommendations</p>
              </Card>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card className="w-full border-warning-50 bg-warning-50/60 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-warning-600">Skill Gap</p>
              </Card>
              <ArrowDownIcon className="text-ink-400" width={14} height={14} />
              <Card className="w-full px-4 py-3 text-center">
                <p className="text-sm text-ink-700">Skills to Improve</p>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
