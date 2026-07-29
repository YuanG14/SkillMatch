import type { VerificationStatus } from '@/types/companyProfile'
import type { BadgeTone } from '@/components/ui/Badge'

interface VerificationStatusDisplay {
  label: string
  tone: BadgeTone
  description: string
}

export const VERIFICATION_STATUS_DISPLAY: Record<
  VerificationStatus,
  VerificationStatusDisplay
> = {
  pending: {
    label: 'Pending review',
    tone: 'warning',
    description:
      "Your company profile is awaiting SkillMatch's review before listings go live.",
  },
  verified: {
    label: 'Verified',
    tone: 'success',
    description: 'Your company is verified and can post internship listings.',
  },
  rejected: {
    label: 'Not approved',
    tone: 'danger',
    description:
      'Your company profile was not approved. Update your details and it will be re-reviewed.',
  },
}
