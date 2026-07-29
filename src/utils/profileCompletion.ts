import type { StudentProfile } from '@/types/studentProfile'

interface CompletionField {
  label: string
  isComplete: (profile: StudentProfile) => boolean
}

const COMPLETION_FIELDS: CompletionField[] = [
  { label: 'Headline', isComplete: (p) => Boolean(p.headline?.trim()) },
  {
    label: 'Location',
    isComplete: (p) => Boolean(p.locationCity?.trim() && p.locationCountry?.trim()),
  },
  { label: 'School', isComplete: (p) => Boolean(p.schoolName?.trim()) },
  { label: 'Field of study', isComplete: (p) => Boolean(p.fieldOfStudy?.trim()) },
  { label: 'Graduation year', isComplete: (p) => Boolean(p.graduationYear) },
  { label: 'Career goals', isComplete: (p) => Boolean(p.careerGoals?.trim()) },
  { label: 'Preferred roles', isComplete: (p) => p.preferredRoles.length > 0 },
  { label: 'Work preference', isComplete: (p) => Boolean(p.remotePreference) },
]

export interface ProfileCompletion {
  percent: number
  missingFields: string[]
}

export function calculateProfileCompletion(
  profile: StudentProfile | null,
): ProfileCompletion {
  if (!profile) {
    return { percent: 0, missingFields: COMPLETION_FIELDS.map((field) => field.label) }
  }

  const missingFields = COMPLETION_FIELDS.filter(
    (field) => !field.isComplete(profile),
  ).map((field) => field.label)
  const completedCount = COMPLETION_FIELDS.length - missingFields.length
  const percent = Math.round((completedCount / COMPLETION_FIELDS.length) * 100)

  return { percent, missingFields }
}
