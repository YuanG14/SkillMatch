import { Link } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { Card, CardContent } from '@/components/ui/Card'
import { UserIcon, BuildingIcon, ArrowRightIcon } from '@/components/ui/icons'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function StudentsCompaniesSection() {
  return (
    <section id="for-companies" className="border-t border-border bg-surface-muted py-20">
      <SectionContainer>
        <SectionHeading
          eyebrow="For Students & Companies"
          title="Built for both sides."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-3 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <UserIcon width={18} height={18} />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                Students
              </h3>
              <p className="text-sm text-ink-600">
                Find internships that match your skills and career goals.
              </p>
              <Link
                to={APP_ROUTES.howItWorks}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Explore Student Experience
                <ArrowRightIcon width={15} height={15} />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <BuildingIcon width={18} height={18} />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-950">
                Companies
              </h3>
              <p className="text-sm text-ink-600">
                Find candidates whose skills align with your internship requirements.
              </p>
              <Link
                to={APP_ROUTES.howItWorks}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Explore Company Experience
                <ArrowRightIcon width={15} height={15} />
              </Link>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </section>
  )
}
