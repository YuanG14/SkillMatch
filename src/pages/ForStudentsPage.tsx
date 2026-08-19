import { useEffect } from 'react'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import { ForStudentsHero } from '@/components/for-students/ForStudentsHero'
import { ForStudentsSectionNav } from '@/components/for-students/ForStudentsSectionNav'
import { ProblemSection } from '@/components/for-students/ProblemSection'
import { FitPreviewSection } from '@/components/for-students/FitPreviewSection'
import { JourneySection } from '@/components/for-students/JourneySection'
import { BenefitsSection } from '@/components/for-students/BenefitsSection'
import { CareerReadinessSection } from '@/components/for-students/CareerReadinessSection'
import { FinalCtaSection } from '@/components/for-students/FinalCtaSection'
import { BackToTopButton } from '@/components/how-it-works/BackToTopButton'

export function ForStudentsPage() {
  const { profile } = useAuth()

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'SkillMatch for Students | Find Internships That Match Your Skills'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const primaryCta = profile
    ? { label: 'Go to Dashboard', to: ROLE_DASHBOARD_ROUTES[profile.role] }
    : { label: 'Find Your Match', to: APP_ROUTES.register }

  return (
    <>
      <ForStudentsHero primaryCta={primaryCta} />
      <ForStudentsSectionNav />
      <ProblemSection />
      <FitPreviewSection />
      <JourneySection />
      <BenefitsSection />
      <CareerReadinessSection />
      <FinalCtaSection primaryCta={primaryCta} />
      <BackToTopButton />
    </>
  )
}
