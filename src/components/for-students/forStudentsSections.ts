export interface ForStudentsSection {
  id: string
  label: string
}

/**
 * Single source of truth for the For Students page sections. Drives the
 * section nav, active-section highlighting, and URL hash support. The ids
 * here must match the `id` set on each section's root element.
 */
export const FOR_STUDENTS_SECTIONS: ForStudentsSection[] = [
  { id: 'the-problem', label: 'The Problem' },
  { id: 'matching', label: 'Matching' },
  { id: 'match-score', label: 'Match Score' },
  { id: 'skill-gaps', label: 'Skill Gaps' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'your-journey', label: 'Your Journey' },
  { id: 'benefits', label: 'Benefits' },
]
