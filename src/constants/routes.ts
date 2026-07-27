import type { UserRole } from '@/types/auth'

export const APP_ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  authCallback: '/auth/callback',
  verifyEmail: '/verify-email',
  studentDashboard: '/student/dashboard',
  companyDashboard: '/company/dashboard',
  adminDashboard: '/admin/dashboard',
} as const

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  student: APP_ROUTES.studentDashboard,
  company: APP_ROUTES.companyDashboard,
  admin: APP_ROUTES.adminDashboard,
}
