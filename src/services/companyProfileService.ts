import { supabase } from '@/lib/supabaseClient'
import type { CompanyProfile, CompanyProfileFormValues } from '@/types/companyProfile'

interface CompanyProfileRow {
  profile_id: string
  company_name: string | null
  industry: string | null
  company_size: CompanyProfile['companySize']
  headquarters_city: string | null
  headquarters_country: string | null
  about: string | null
  logo_url: string | null
  website_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  verification_status: CompanyProfile['verificationStatus']
  verified_at: string | null
  updated_at: string
}

const SELECT_COLUMNS =
  'profile_id, company_name, industry, company_size, headquarters_city, headquarters_country, about, logo_url, website_url, linkedin_url, twitter_url, verification_status, verified_at, updated_at'

function rowToCompanyProfile(row: CompanyProfileRow): CompanyProfile {
  return {
    profileId: row.profile_id,
    companyName: row.company_name,
    industry: row.industry,
    companySize: row.company_size,
    headquartersCity: row.headquarters_city,
    headquartersCountry: row.headquarters_country,
    about: row.about,
    logoUrl: row.logo_url,
    websiteUrl: row.website_url,
    linkedinUrl: row.linkedin_url,
    twitterUrl: row.twitter_url,
    verificationStatus: row.verification_status,
    verifiedAt: row.verified_at,
    updatedAt: row.updated_at,
  }
}

export async function fetchCompanyProfile(
  profileId: string,
): Promise<CompanyProfile | null> {
  const { data, error } = await supabase
    .from('company_profiles')
    .select(SELECT_COLUMNS)
    .eq('profile_id', profileId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return rowToCompanyProfile(data)
}

export async function saveCompanyProfile(
  profileId: string,
  values: CompanyProfileFormValues,
): Promise<CompanyProfile> {
  const { data, error } = await supabase
    .from('company_profiles')
    .upsert(
      {
        profile_id: profileId,
        company_name: values.companyName.trim() || null,
        industry: values.industry.trim() || null,
        company_size: values.companySize || null,
        headquarters_city: values.headquartersCity.trim() || null,
        headquarters_country: values.headquartersCountry.trim() || null,
        about: values.about.trim() || null,
        logo_url: values.logoUrl.trim() || null,
        website_url: values.websiteUrl.trim() || null,
        linkedin_url: values.linkedinUrl.trim() || null,
        twitter_url: values.twitterUrl.trim() || null,
      },
      { onConflict: 'profile_id' },
    )
    .select(SELECT_COLUMNS)
    .single()

  if (error) throw error
  return rowToCompanyProfile(data)
}
