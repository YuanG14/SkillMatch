import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/how-it-works/Reveal'

interface FinalCtaSectionProps {
  primaryCta: { label: string; to: string }
}

export function FinalCtaSection({ primaryCta }: FinalCtaSectionProps) {
  return (
    <section className="border-t border-border bg-ink-950 py-20">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          Ready to find a better-fit internship?
        </h2>
        <p className="max-w-md text-ink-400">
          Build your SkillMatch profile and start discovering opportunities aligned
          with your skills and goals.
        </p>
        <Link to={primaryCta.to}>
          <Button size="lg">{primaryCta.label}</Button>
        </Link>
      </Reveal>
    </section>
  )
}
