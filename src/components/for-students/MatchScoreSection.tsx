import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'
import { useInView } from '@/hooks/useInView'

function AnimatedMatchRing({ target }: { target: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setValue(target)
      return
    }

    const durationMs = 1200
    const start = performance.now()

    let frame: number
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs)
      setValue(Math.round(progress * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <div ref={ref}>
      <MatchRing value={value} size={96} />
    </div>
  )
}

export function MatchScoreSection() {
  return (
    <section id="match-score" className="mx-auto max-w-7xl scroll-mt-[140px] px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Match Score"
          title="See why you're a match."
          subtitle="SkillMatch doesn't stop at a percentage -- it shows the reasoning behind every match, so you understand exactly where you stand."
          align="center"
          className="mx-auto"
        />
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <Card className="mx-auto max-w-2xl p-8">
          <CardContent className="flex flex-col items-center gap-8 p-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <AnimatedMatchRing target={92} />
              <div>
                <p className="font-display text-lg font-semibold text-ink-900">
                  Excellent Match
                </p>
                <dl className="mt-3 grid grid-cols-1 gap-1 text-sm text-ink-600">
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-ink-900">Skills matched:</dt>
                    <dd>8</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-ink-900">Skills to improve:</dt>
                    <dd>2</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-ink-900">Profile alignment:</dt>
                    <dd>High</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Git', 'SQL'].map((skill) => (
                  <Badge key={skill} tone="success">
                    &#10003; {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'REST APIs'].map((skill) => (
                  <Badge key={skill} tone="warning">
                    &#9888; {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <NextSectionLink targetId="skill-gaps" label="Skill Gaps" />
    </section>
  )
}
