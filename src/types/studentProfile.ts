export const REMOTE_PREFERENCES = ['remote', 'hybrid', 'onsite', 'flexible'] as const
export type RemotePreference = (typeof REMOTE_PREFERENCES)[number]

export interface StudentProfile {
  profileId: string
  phone: string | null
  headline: string | null
  locationCity: string | null
  locationCountry: string | null
  schoolName: string | null
  degree: string | null
  fieldOfStudy: string | null
  graduationYear: number | null
  careerGoals: string | null
  preferredRoles: string[]
  preferredLocations: string[]
  remotePreference: RemotePreference | null
  availabilityStartDate: string | null
  updatedAt: string
}

/** Input shape for the profile form -- same fields, always strings for controlled inputs. */
export interface StudentProfileFormValues {
  phone: string
  headline: string
  locationCity: string
  locationCountry: string
  schoolName: string
  degree: string
  fieldOfStudy: string
  graduationYear: string
  careerGoals: string
  preferredRoles: string[]
  preferredLocations: string[]
  remotePreference: RemotePreference | ''
  availabilityStartDate: string
}

export const EMPTY_STUDENT_PROFILE_FORM: StudentProfileFormValues = {
  phone: '',
  headline: '',
  locationCity: '',
  locationCountry: '',
  schoolName: '',
  degree: '',
  fieldOfStudy: '',
  graduationYear: '',
  careerGoals: '',
  preferredRoles: [],
  preferredLocations: [],
  remotePreference: '',
  availabilityStartDate: '',
}

export function studentProfileToFormValues(
  profile: StudentProfile | null,
): StudentProfileFormValues {
  if (!profile) return EMPTY_STUDENT_PROFILE_FORM
  return {
    phone: profile.phone ?? '',
    headline: profile.headline ?? '',
    locationCity: profile.locationCity ?? '',
    locationCountry: profile.locationCountry ?? '',
    schoolName: profile.schoolName ?? '',
    degree: profile.degree ?? '',
    fieldOfStudy: profile.fieldOfStudy ?? '',
    graduationYear: profile.graduationYear ? String(profile.graduationYear) : '',
    careerGoals: profile.careerGoals ?? '',
    preferredRoles: profile.preferredRoles,
    preferredLocations: profile.preferredLocations,
    remotePreference: profile.remotePreference ?? '',
    availabilityStartDate: profile.availabilityStartDate ?? '',
  }
}
