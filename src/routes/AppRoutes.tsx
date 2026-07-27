import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { APP_ROUTES } from '@/constants/routes'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { RootLayout } from '@/layouts/RootLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/HomePage'
import {
  AuthCallbackPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@/pages/authPages'

const router = createBrowserRouter([
  {
    path: APP_ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: APP_ROUTES.login, element: <LoginPage /> },
      { path: APP_ROUTES.register, element: <RegisterPage /> },
      { path: APP_ROUTES.forgotPassword, element: <ForgotPasswordPage /> },
      { path: APP_ROUTES.resetPassword, element: <ResetPasswordPage /> },
      { path: APP_ROUTES.authCallback, element: <AuthCallbackPage /> },
      { path: APP_ROUTES.verifyEmail, element: <VerifyEmailPage /> },
      {
        path: APP_ROUTES.studentDashboard,
        element: <ProtectedRoute allowedRoles={['student']}><DashboardPage role="student" /></ProtectedRoute>,
      },
      {
        path: APP_ROUTES.companyDashboard,
        element: <ProtectedRoute allowedRoles={['company']}><DashboardPage role="company" /></ProtectedRoute>,
      },
      {
        path: APP_ROUTES.adminDashboard,
        element: <ProtectedRoute allowedRoles={['admin']}><DashboardPage role="admin" /></ProtectedRoute>,
      },
    ],
  },
])

export function AppRoutes() {
  return <AuthProvider><RouterProvider router={router} /></AuthProvider>
}
