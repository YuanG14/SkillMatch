import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { MatchRing } from '@/components/ui/MatchRing'
import { CheckIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { useInView } from '@/hooks/useInView'

const comparisonRows = [
  { profile: 'React', requirement: 'React', met: true },
  { profile: 'TypeScript', requirement: 'TypeScript', met: true },
  { profile: 'Git', requirement: 'Git', met: true },
  { profile: 'SQL', requirement: 'SQL', met: true },
  { profile: 'Figma', requirement: 'Next.js', met: false },
]

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
      <MatchRing value={value} size={104} />
    </div>
  )
}

export function MatchScoreSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Match Score"
          title="See Why You're a Match"
          subtitle="SkillMatch compares your profile with internship requirements to help you quickly understand how closely your experience aligns with an opportunity."
        />
      </Reveal>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal delay={60}>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Your Profile
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {comparisonRows.map((row) => (
                  <li key={row.profile} className="text-sm text-ink-800">
                    {row.profile}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={120} className="flex justify-center">
          <AnimatedMatchRing target={92} />
        </Reveal>

        <Reveal delay={180}>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Internship
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {comparisonRows.map((row) => (
                  <li
                    key={row.requirement}
                    className="flex items-center justify-between text-sm text-ink-800"
                  >
                    {row.requirement}
                    {row.met ? (
                      <CheckIcon className="text-success-600" width={16} height={16} />
                    ) : (
                      <AlertTriangleIcon
                        className="text-warning-600"
                        width={16}
                        height={16}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
