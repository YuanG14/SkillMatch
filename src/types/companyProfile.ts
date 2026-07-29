export const COMPANY_SIZE_RANGES = ['1-10', '11-50', '51-200', '201-500', '500+'] as const
export type CompanySizeRange = (typeof COMPANY_SIZE_RANGES)[number]

export const VERIFICATION_STATUSES = ['pending', 'verified', 'rejected'] as const
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number]

export interface CompanyProfile {
  profileId: string
  companyName: string | null
  industry: string | null
  companySize: CompanySizeRange | null
  headquartersCity: string | null
  headquartersCountry: string | null
  about: string | null
  logoUrl: string | null
  websiteUrl: string | null
  linkedinUrl: string | null
  twitterUrl: string | null
  verificationStatus: VerificationStatus
  verifiedAt: string | null
  updatedAt: string
}

/** Input shape for the profile form -- same fields, always strings for controlled inputs. */
export interface CompanyProfileFormValues {
  companyName: string
  industry: string
  companySize: CompanySizeRange | ''
  headquartersCity: string
  headquartersCountry: string
  about: string
  logoUrl: string
  websiteUrl: string
  linkedinUrl: string
  twitterUrl: string
}

export const EMPTY_COMPANY_PROFILE_FORM: CompanyProfileFormValues = {
  companyName: '',
  industry: '',
  companySize: '',
  headquartersCity: '',
  headquartersCountry: '',
  about: '',
  logoUrl: '',
  websiteUrl: '',
  linkedinUrl: '',
  twitterUrl: '',
}

export function companyProfileToFormValues(
  profile: CompanyProfile | null,
): CompanyProfileFormValues {
  if (!profile) return EMPTY_COMPANY_PROFILE_FORM
  return {
    companyName: profile.companyName ?? '',
    industry: profile.industry ?? '',
    companySize: profile.companySize ?? '',
    headquartersCity: profile.headquartersCity ?? '',
    headquartersCountry: profile.headquartersCountry ?? '',
    about: profile.about ?? '',
    logoUrl: profile.logoUrl ?? '',
    websiteUrl: profile.websiteUrl ?? '',
    linkedinUrl: profile.linkedinUrl ?? '',
    twitterUrl: profile.twitterUrl ?? '',
  }
}
