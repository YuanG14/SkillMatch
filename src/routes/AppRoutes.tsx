import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'

import { AuthProvider } from '@/features/auth/AuthProvider'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'

import { RootLayout } from '@/layouts/RootLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { StudentLayout } from '@/layouts/StudentLayout'
import { CompanyLayout } from '@/layouts/CompanyLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

import {
  AuthCallbackPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@/pages/authPages'

import { LandingPage } from '@/pages/LandingPage'
import { HowItWorksPage } from '@/pages/HowItWorksPage'
import { ForStudentsPage } from '@/pages/ForStudentsPage'
import { ForCompaniesPage } from '@/pages/ForCompaniesPage'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { StudentDashboardPage } from '@/pages/student/StudentDashboardPage'
import { StudentProfilePage } from '@/pages/student/StudentProfilePage'
import { FindInternshipsPage } from '@/pages/student/FindInternshipsPage'
import { SavedInternshipsPage } from '@/pages/student/SavedInternshipsPage'
import { ApplicationsPage } from '@/pages/student/ApplicationsPage'
import { SkillGapAnalysisPage } from '@/pages/student/SkillGapAnalysisPage'
import { RecommendedPage } from '@/pages/student/RecommendedPage'
import { CompanyDashboardPage } from '@/pages/company/CompanyDashboardPage'
import { CompanyProfilePage } from '@/pages/company/CompanyProfilePage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'

const router = createBrowserRouter([
  {
    path: APP_ROUTES.home,
    element: <RootLayout />,
    errorElement: <NotFoundPage />,

    children: [
      // =========================
      // PUBLIC ROUTES
      // =========================
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: APP_ROUTES.howItWorks,
            element: <HowItWorksPage />,
          },
          {
            path: APP_ROUTES.forStudents,
            element: <ForStudentsPage />,
          },
          {
            path: APP_ROUTES.forCompanies,
            element: <ForCompaniesPage />,
          },
          {
            path: APP_ROUTES.login,
            element: <LoginPage />,
          },
          {
            path: APP_ROUTES.register,
            element: <RegisterPage />,
          },
          {
            path: APP_ROUTES.forgotPassword,
            element: <ForgotPasswordPage />,
          },
          {
            path: APP_ROUTES.resetPassword,
            element: <ResetPasswordPage />,
          },
          {
            path: APP_ROUTES.authCallback,
            element: <AuthCallbackPage />,
          },
          {
            path: APP_ROUTES.verifyEmail,
            element: <VerifyEmailPage />,
          },
        ],
      },

      // =========================
      // STUDENT ROUTES
      // =========================
      {
        path: 'student',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <StudentDashboardPage />,
          },
          {
            path: 'profile',
            element: <StudentProfilePage />,
          },
          {
            path: 'internships',
            element: <FindInternshipsPage />,
          },
          {
            path: 'applications',
            element: <ApplicationsPage />,
          },
          {
            path: 'saved',
            element: <SavedInternshipsPage />,
          },
          {
            path: 'skill-gap-analysis',
            element: <SkillGapAnalysisPage />,
          },
          {
            path: 'recommended',
            element: <RecommendedPage />,
          },
          {
            path: 'settings',
            element: <ComingSoonPage title="Settings" />,
          },
        ],
      },

      // =========================
      // COMPANY ROUTES
      // =========================
      {
        path: 'company',
        element: (
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <CompanyDashboardPage />,
          },
          {
            path: 'profile',
            element: <CompanyProfilePage />,
          },
          {
            path: 'listings',
            element: <ComingSoonPage title="Listings" />,
          },
          {
            path: 'candidates',
            element: <ComingSoonPage title="Candidates" />,
          },
          {
            path: 'applications',
            element: <ComingSoonPage title="Applications" />,
          },
          {
            path: 'analytics',
            element: <ComingSoonPage title="Analytics" />,
          },
          {
            path: 'settings',
            element: <ComingSoonPage title="Settings" />,
          },
        ],
      },

      // =========================
      // ADMIN ROUTES
      // =========================
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: 'users',
            element: <ComingSoonPage title="Users" />,
          },
          {
            path: 'analytics',
            element: <ComingSoonPage title="Analytics" />,
          },
          {
            path: 'settings',
            element: <ComingSoonPage title="Settings" />,
          },
        ],
      },

      // =========================
      // 404
      // =========================
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export function AppRoutes() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
