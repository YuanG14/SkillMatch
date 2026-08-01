import type { BadgeTone } from '@/components/ui/Badge'

/**
 * Single source of truth for application-status -> badge tone. The
 * Student and Company dashboards each show the same candidate journey from
 * a different side (a student sees "Interview Scheduled", a company sees
 * "Interview"), so the two tables don't share exact status strings -- but
 * every status they DO use is defined here once, so the same word always
 * renders the same color no matter which dashboard or table it appears in.
 */
export const APPLICATION_STATUS_TONE = {
  Applied: 'neutral',
  'Under Review': 'primary',
  Interview: 'warning',
  'Interview Scheduled': 'warning',
  Shortlisted: 'success',
  Accepted: 'success',
  Rejected: 'danger',
} as const satisfies Record<string, BadgeTone>

/**
 * Internship-listing status -> badge tone. A separate small vocabulary
 * from application status (a listing's own lifecycle, not a candidate's),
 * kept in the same file as the one place badge colors are decided.
 */
export const LISTING_STATUS_TONE = {
  Active: 'success',
  Paused: 'warning',
  Closed: 'neutral',
} as const satisfies Record<string, BadgeTone>
