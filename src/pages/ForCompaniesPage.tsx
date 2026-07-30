import { useEffect } from 'react'
import { ForCompaniesHero } from '@/components/for-companies/ForCompaniesHero'
import { ChallengeSection } from '@/components/for-companies/ChallengeSection'
import { BenefitsSection } from '@/components/for-companies/BenefitsSection'
import { FinalCtaSection } from '@/components/for-companies/FinalCtaSection'

export function ForCompaniesPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'SkillMatch for Companies | Hire Interns Who Fit'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <>
      <ForCompaniesHero />
      <ChallengeSection />
      <BenefitsSection />
      <FinalCtaSection />
    </>
  )
}
