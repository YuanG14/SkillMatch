import { Navigate } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import { PageStatus } from '@/features/auth/ProtectedRoute'
import { HomeHero } from '@/components/home/HomeHero'
import { SocialProofSection } from '@/components/home/SocialProofSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { MatchingShowcaseSection } from '@/components/home/MatchingShowcaseSection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { HowItWorksPreviewSection } from '@/components/home/HowItWorksPreviewSection'
import { StudentsCompaniesSection } from '@/components/home/StudentsCompaniesSection'
import { FinalCtaSection } from '@/components/home/FinalCtaSection'

export function LandingPage() {
  const { isLoading, user, profile } = useAuth()

  if (isLoading) return <PageStatus message="Loading…" />
  if (user && !user.email_confirmed_at)
    return <Navigate to={APP_ROUTES.verifyEmail} replace />
  if (profile) return <Navigate to={ROLE_DASHBOARD_ROUTES[profile.role]} replace />

  return (
    <>
      <HomeHero />
      <SocialProofSection />
      <FeaturesSection />
      <MatchingShowcaseSection />
      <BenefitsSection />
      <HowItWorksPreviewSection />
      <StudentsCompaniesSection />
      <FinalCtaSection />
    </>
  )
}
