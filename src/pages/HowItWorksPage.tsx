import { HowItWorksHero } from '@/components/how-it-works/HowItWorksHero'
import { JourneySection } from '@/components/how-it-works/JourneySection'
import { MatchingEngineSection } from '@/components/how-it-works/MatchingEngineSection'
import { MatchScoreSection } from '@/components/how-it-works/MatchScoreSection'
import { SkillGapSection } from '@/components/how-it-works/SkillGapSection'
import { RecommendationsSection } from '@/components/how-it-works/RecommendationsSection'
import { AudienceSection } from '@/components/how-it-works/AudienceSection'
import { WhySkillMatchSection } from '@/components/how-it-works/WhySkillMatchSection'

export function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <JourneySection />
      <MatchingEngineSection />
      <MatchScoreSection />
      <SkillGapSection />
      <RecommendationsSection />
      <AudienceSection />
      <WhySkillMatchSection />
    </>
  )
}
