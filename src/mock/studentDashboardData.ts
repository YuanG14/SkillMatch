/**
 * MOCK DATA -- presentation layer only.
 *
 * Internship matching, recommendations, applications, and interview
 * tracking are NOT implemented in SkillMatch yet. Everything in this file
 * is fake data used purely to render the dashboard UI so the layout can be
 * designed ahead of the real matching/application backend. Nothing here is
 * wired to Supabase and none of it should be read as real functionality.
 *
 * When the real features ship, the components consuming this file should
 * switch to real data sources without needing a UI rewrite.
 *
 * Phase 2 introduced the hero teaser fields (MOCK_TOP_MATCH,
 * MOCK_RECOMMENDED_PREVIEW). Phase 3 extends this file with the full
 * "Recommended for You" list, "Recent Applications" table data, and the
 * dashboard KPI stats.
 */

export type EmploymentType = 'Full-time' | 'Part-time' | 'Internship' | 'Remote'

export type ApplicationStatus =
  'Applied' | 'Under Review' | 'Interview Scheduled' | 'Accepted' | 'Rejected'

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

export interface MockRecommendedInternship {
  id: string
  title: string
  companyName: string
  matchPercent: number
  employmentType: EmploymentType
  location: string
  saved: boolean
}

export interface MockApplication {
  id: string
  jobTitle: string
  companyName: string
  matchPercent: number
  status: ApplicationStatus
  appliedDate: string
}

export interface MockDashboardStats {
  totalApplications: number
  totalApplicationsTrend: string
  interviews: number
  interviewsTrend: string
  averageMatchScore: number
  averageMatchScoreTrend: string
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

export const MOCK_RECOMMENDED_INTERNSHIPS: MockRecommendedInternship[] = [
  {
    id: 'rec-1',
    title: 'Frontend Developer Intern',
    companyName: 'Tech Solutions Inc.',
    matchPercent: 92,
    employmentType: 'Full-time',
    location: 'Makati, PH',
    saved: false,
  },
  {
    id: 'rec-2',
    title: 'UI/UX Design Intern',
    companyName: 'Creative Studio',
    matchPercent: 85,
    employmentType: 'Internship',
    location: 'Remote',
    saved: true,
  },
  {
    id: 'rec-3',
    title: 'Data Analyst Intern',
    companyName: 'DataWorks PH',
    matchPercent: 82,
    employmentType: 'Full-time',
    location: 'Taguig, PH',
    saved: false,
  },
]

export const MOCK_APPLICATIONS: MockApplication[] = [
  {
    id: 'app-1',
    jobTitle: 'Frontend Developer Intern',
    companyName: 'Tech Solutions Inc.',
    matchPercent: 92,
    status: 'Interview Scheduled',
    appliedDate: '2026-07-18',
  },
  {
    id: 'app-2',
    jobTitle: 'Backend Engineer Intern',
    companyName: 'Northbridge Systems',
    matchPercent: 76,
    status: 'Under Review',
    appliedDate: '2026-07-12',
  },
  {
    id: 'app-3',
    jobTitle: 'UI/UX Design Intern',
    companyName: 'Creative Studio',
    matchPercent: 85,
    status: 'Applied',
    appliedDate: '2026-07-09',
  },
  {
    id: 'app-4',
    jobTitle: 'QA Intern',
    companyName: 'Bright Path Labs',
    matchPercent: 64,
    status: 'Rejected',
    appliedDate: '2026-06-28',
  },
]

export const MOCK_DASHBOARD_STATS: MockDashboardStats = {
  totalApplications: MOCK_APPLICATIONS.length,
  totalApplicationsTrend: '+20% this month',
  interviews: MOCK_APPLICATIONS.filter((a) => a.status === 'Interview Scheduled').length,
  interviewsTrend: '+1 this month',
  averageMatchScore: Math.round(
    MOCK_RECOMMENDED_INTERNSHIPS.reduce((sum, r) => sum + r.matchPercent, 0) /
      MOCK_RECOMMENDED_INTERNSHIPS.length,
  ),
  averageMatchScoreTrend: 'Based on your profile',
}
