/**
 * MOCK DATA -- presentation layer only.
 *
 * Internship matching, recommendations, and applications are NOT implemented
 * in SkillMatch yet. Everything in this file is fake data used purely to
 * render the dashboard UI so the layout can be designed ahead of the real
 * matching/application backend. Nothing here is wired to Supabase and none
 * of it should be read as real functionality.
 *
 * When the real features ship, the components consuming this file should
 * switch to real data sources without needing a UI rewrite.
 *
 * Phase 2 only needs the hero teaser fields below. Phase 3 will extend this
 * file with the full "Recommended for You" list and "Recent Applications"
 * table data.
 */

export interface MockTopMatch {
  internshipTitle: string
  companyName: string
  matchPercent: number
}

export interface MockRecommendedPreview {
  id: string
  internshipTitle: string
  companyName: string
  matchPercent: number
}

export const MOCK_TOP_MATCH: MockTopMatch = {
  internshipTitle: 'Frontend Developer Intern',
  companyName: 'Tech Solutions Inc.',
  matchPercent: 92,
}

export const MOCK_RECOMMENDED_PREVIEW: MockRecommendedPreview[] = [
  {
    id: 'preview-1',
    internshipTitle: 'Frontend Developer Intern',
    companyName: 'Tech Solutions Inc.',
    matchPercent: 92,
  },
  {
    id: 'preview-2',
    internshipTitle: 'UI/UX Design Intern',
    companyName: 'Creative Studio',
    matchPercent: 85,
  },
  {
    id: 'preview-3',
    internshipTitle: 'Data Analyst Intern',
    companyName: 'DataWorks PH',
    matchPercent: 82,
  },
]
