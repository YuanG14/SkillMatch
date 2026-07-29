import { supabase } from '@/lib/supabaseClient'
import type { StudentProfile, StudentProfileFormValues } from '@/types/studentProfile'

interface StudentProfileRow {
  profile_id: string
  phone: string | null
  headline: string | null
  location_city: string | null
  location_country: string | null
  school_name: string | null
  degree: string | null
  field_of_study: string | null
  graduation_year: number | null
  career_goals: string | null
  preferred_roles: string[]
  preferred_locations: string[]
  remote_preference: StudentProfile['remotePreference']
  availability_start_date: string | null
  updated_at: string
}

function rowToStudentProfile(row: StudentProfileRow): StudentProfile {
  return {
    profileId: row.profile_id,
    phone: row.phone,
    headline: row.headline,
    locationCity: row.location_city,
    locationCountry: row.location_country,
    schoolName: row.school_name,
    degree: row.degree,
    fieldOfStudy: row.field_of_study,
    graduationYear: row.graduation_year,
    careerGoals: row.career_goals,
    preferredRoles: row.preferred_roles,
    preferredLocations: row.preferred_locations,
    remotePreference: row.remote_preference,
    availabilityStartDate: row.availability_start_date,
    updatedAt: row.updated_at,
  }
}

export async function fetchStudentProfile(
  profileId: string,
): Promise<StudentProfile | null> {
  const { data, error } = await supabase
    .from('student_profiles')
    .select(
      'profile_id, phone, headline, location_city, location_country, school_name, degree, field_of_study, graduation_year, career_goals, preferred_roles, preferred_locations, remote_preference, availability_start_date, updated_at',
    )
    .eq('profile_id', profileId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return rowToStudentProfile(data)
}

export async function saveStudentProfile(
  profileId: string,
  values: StudentProfileFormValues,
): Promise<StudentProfile> {
  const { data, error } = await supabase
    .from('student_profiles')
    .upsert(
      {
        profile_id: profileId,
        phone: values.phone.trim() || null,
        headline: values.headline.trim() || null,
        location_city: values.locationCity.trim() || null,
        location_country: values.locationCountry.trim() || null,
        school_name: values.schoolName.trim() || null,
        degree: values.degree.trim() || null,
        field_of_study: values.fieldOfStudy.trim() || null,
        graduation_year: values.graduationYear ? Number(values.graduationYear) : null,
        career_goals: values.careerGoals.trim() || null,
        preferred_roles: values.preferredRoles,
        preferred_locations: values.preferredLocations,
        remote_preference: values.remotePreference || null,
        availability_start_date: values.availabilityStartDate || null,
      },
      { onConflict: 'profile_id' },
    )
    .select(
      'profile_id, phone, headline, location_city, location_country, school_name, degree, field_of_study, graduation_year, career_goals, preferred_roles, preferred_locations, remote_preference, availability_start_date, updated_at',
    )
    .single()

  if (error) throw error
  return rowToStudentProfile(data)
}
