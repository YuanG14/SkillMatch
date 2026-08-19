import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/how-it-works/Reveal'

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-surface-muted py-20">
      <Reveal className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
          Your next opportunity could already be a match.
        </h2>
        <p className="mt-3 text-base text-ink-600">
          Build your profile, discover opportunities, and understand where your skills can
          take you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={APP_ROUTES.register}>
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to={`${APP_ROUTES.register}?as=company`}>
            <Button size="lg" variant="outline">
              I&apos;m a Company
            </Button>
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
