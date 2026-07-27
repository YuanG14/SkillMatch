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
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { StudentDashboardPage } from '@/pages/student/StudentDashboardPage'
import { CompanyDashboardPage } from '@/pages/company/CompanyDashboardPage'
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
            path: 'internships',
            element: <ComingSoonPage title="Internships" />,
          },
          {
            path: 'applications',
            element: <ComingSoonPage title="Applications" />,
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
            path: 'listings',
            element: <ComingSoonPage title="Listings" />,
          },
          {
            path: 'candidates',
            element: <ComingSoonPage title="Candidates" />,
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