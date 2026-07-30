import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/how-it-works/Reveal'
import { APP_ROUTES } from '@/constants/routes'

export function FinalCtaSection() {
  return (
    <section className="border-t border-border bg-ink-950 py-20">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          Ready to hire smarter?
        </h2>
        <p className="max-w-md text-ink-400">
          Post an internship and start reviewing applicants ranked by real skill
          fit.
        </p>
        <Link to={`${APP_ROUTES.register}?as=company`}>
          <Button size="lg">Post an Internship</Button>
        </Link>
      </Reveal>
    </section>
  )
}
