import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { CheckIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

const matchedSkills = ['React', 'TypeScript', 'Git']
const growthSkills = ['Next.js', 'REST APIs']
const profileAreas = ['Skills', 'Projects', 'Education', 'Experience']

export function FitPreviewSection() {
  return (
    <section id="see-your-fit" className="mx-auto max-w-7xl scroll-mt-[140px] px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="See Your Fit"
          title="Know which opportunities deserve your attention."
          subtitle="Every listing comes with a clear picture of how you fit -- so you can stop guessing and start applying where it counts."
        />
      </Reveal>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full p-6">
            <CardContent className="flex h-full flex-col gap-5 p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">
                    Frontend Developer Intern
                  </p>
                  <p className="text-sm text-ink-600">Northline Analytics</p>
                </div>
                <MatchRing value={92} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.map((skill) => (
                  <Badge key={skill} tone="success">
                    <CheckIcon width={13} height={13} className="mr-1" />
                    {skill}
                  </Badge>
                ))}
                {growthSkills.map((skill) => (
                  <Badge key={skill} tone="warning">
                    <AlertTriangleIcon width={13} height={13} className="mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="mt-auto text-sm text-ink-600">
                Know why you&apos;re a match, and what to work on next.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card className="h-full p-6">
            <CardContent className="flex h-full flex-col gap-5 p-0">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Your profile
              </p>
              <div className="grid grid-cols-2 gap-3">
                {profileAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm font-medium text-ink-800"
                  >
                    {area}
                  </div>
                ))}
              </div>
              <p className="mt-auto text-sm text-ink-600">
                Build a profile that shows more than a resume.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <NextSectionLink targetId="your-journey" label="Your Journey" />
    </section>
  )
}
