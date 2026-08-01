/**
 * MOCK DATA -- presentation layer only.
 *
 * Applicant review, shortlisting, interview scheduling, and recruitment
 * analytics are NOT implemented in SkillMatch yet. Everything in this file
 * is fake data used purely to render the Company Dashboard UI so the
 * layout can be designed ahead of the real applicant/internship backend.
 * Nothing here is wired to Supabase and none of it should be read as real
 * functionality.
 *
 * When the real features ship, the components consuming this file should
 * switch to real data sources without needing a UI rewrite.
 *
 * Mirrors the shape/spirit of src/mock/studentDashboardData.ts so the two
 * dashboards stay easy to compare while covering company-side content
 * (applicants, listings, recruitment pipeline) instead of student-side
 * content (recommendations, applications).
 */

export type ApplicationStatus = 'Under Review' | 'Shortlisted' | 'Interview' | 'Rejected'

export type InternshipStatus = 'Active' | 'Paused' | 'Closed'

export interface MockTopCandidate {
  candidateName: string
  internshipTitle: string
  matchPercent: number
  skills: string[]
}

export interface MockHeroStat {
  id: string
  value: string
  label: string
  supportingText: string
}

export interface MockApplicant {
  id: string
  candidateName: string
  internshipTitle: string
  matchPercent: number
  skills: string[]
}

export interface MockActiveInternship {
  id: string
  title: string
  applicantCount: number
  avgMatchPercent: number
  status: InternshipStatus
}

export interface MockCompanyApplication {
  id: string
  candidateName: string
  internshipTitle: string
  matchPercent: number
  status: ApplicationStatus
  appliedDate: string
}

export interface MockCompanyDashboardStats {
  activeInternships: number
  activeInternshipsTrend: string
  totalApplicants: number
  totalApplicantsTrend: string
  shortlisted: number
  shortlistedTrend: string
  interviews: number
  interviewsTrend: string
}

export interface MockRecruitmentOverview {
  applications: number
  shortlisted: number
  interviews: number
  offers: number
}

export const MOCK_TOP_CANDIDATE: MockTopCandidate = {
  candidateName: 'Candidate Match',
  internshipTitle: 'Frontend Developer Intern',
  matchPercent: 92,
  skills: ['React', 'TypeScript', 'UI/UX'],
}

export const MOCK_HERO_STATS: MockHeroStat[] = [
  { id: 'applicants', value: '24', label: 'Applicants', supportingText: '+12 this week' },
  { id: 'shortlisted', value: '8', label: 'Shortlisted', supportingText: 'Candidates' },
]

export const MOCK_APPLICANTS: MockApplicant[] = [
  {
    id: 'applicant-1',
    candidateName: 'John Doe',
    internshipTitle: 'Frontend Developer Intern',
    matchPercent: 92,
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'applicant-2',
    candidateName: 'Jane Smith',
    internshipTitle: 'UI/UX Design Intern',
    matchPercent: 87,
    skills: ['Figma', 'UI Design', 'Research'],
  },
  {
    id: 'applicant-3',
    candidateName: 'Alex Cruz',
    internshipTitle: 'Data Analyst Intern',
    matchPercent: 81,
    skills: ['Python', 'SQL', 'Excel'],
  },
]

export const MOCK_ACTIVE_INTERNSHIPS: MockActiveInternship[] = [
  {
    id: 'internship-1',
    title: 'Frontend Developer Intern',
    applicantCount: 24,
    avgMatchPercent: 92,
    status: 'Active',
  },
  {
    id: 'internship-2',
    title: 'UI/UX Design Intern',
    applicantCount: 18,
    avgMatchPercent: 87,
    status: 'Active',
  },
  {
    id: 'internship-3',
    title: 'Data Analyst Intern',
    applicantCount: 13,
    avgMatchPercent: 81,
    status: 'Active',
  },
]

export const MOCK_COMPANY_APPLICATIONS: MockCompanyApplication[] = [
  {
    id: 'company-app-1',
    candidateName: 'John Doe',
    internshipTitle: 'Frontend Developer Intern',
    matchPercent: 92,
    status: 'Shortlisted',
    appliedDate: '2026-07-29',
  },
  {
    id: 'company-app-2',
    candidateName: 'Jane Smith',
    internshipTitle: 'UI/UX Design Intern',
    matchPercent: 87,
    status: 'Under Review',
    appliedDate: '2026-07-28',
  },
  {
    id: 'company-app-3',
    candidateName: 'Alex Cruz',
    internshipTitle: 'Data Analyst Intern',
    matchPercent: 81,
    status: 'Interview',
    appliedDate: '2026-07-27',
  },
  {
    id: 'company-app-4',
    candidateName: 'Mika Santos',
    internshipTitle: 'Frontend Developer Intern',
    matchPercent: 68,
    status: 'Rejected',
    appliedDate: '2026-07-22',
  },
]

export const MOCK_COMPANY_DASHBOARD_STATS: MockCompanyDashboardStats = {
  activeInternships: MOCK_ACTIVE_INTERNSHIPS.filter((i) => i.status === 'Active').length,
  activeInternshipsTrend: '+2 this month',
  totalApplicants: 124,
  totalApplicantsTrend: '+18 this week',
  shortlisted: 18,
  shortlistedTrend: '+5 this week',
  interviews: 7,
  interviewsTrend: '+1 this week',
}

export const MOCK_RECRUITMENT_OVERVIEW: MockRecruitmentOverview = {
  applications: 124,
  shortlisted: 18,
  interviews: 7,
  offers: 4,
}
