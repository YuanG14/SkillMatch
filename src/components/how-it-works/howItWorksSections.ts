export interface HowItWorksSection {
  id: string
  label: string
}

/**
 * Single source of truth for the How It Works page sections. Drives the
 * section nav, active-section highlighting, and URL hash support. The ids
 * here must match the `id` set on each section's root element.
 */
export const HOW_IT_WORKS_SECTIONS: HowItWorksSection[] = [
  { id: 'your-journey', label: 'Your Journey' },
  { id: 'matching', label: 'Matching' },
  { id: 'match-score', label: 'Match Score' },
  { id: 'skill-gaps', label: 'Skill Gaps' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'students-companies', label: 'Students & Companies' },
  { id: 'why-skillmatch', label: 'Why SkillMatch' },
]
