import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/Button'
import { SectionContainer } from '@/components/ui/SectionContainer'

export function FinalCtaSection() {
  return (
    <section className="border-t border-border py-20">
      <SectionContainer width="narrow" className="text-center">
        <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
          Ready to find your match?
        </h2>
        <p className="mt-3 text-ink-600">
          Build your profile and discover internships that fit your skills.
        </p>
        <div className="mt-8">
          <Link to={APP_ROUTES.register}>
            <Button size="lg">Get Started &rarr;</Button>
          </Link>
        </div>
        <Link
          to={`${APP_ROUTES.register}?as=company`}
          className="mt-4 inline-block text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          I&apos;m a company &rarr;
        </Link>
      </SectionContainer>
    </section>
  )
}
