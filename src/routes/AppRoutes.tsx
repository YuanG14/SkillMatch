import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { StudentLayout } from '@/layouts/StudentLayout'
import { CompanyLayout } from '@/layouts/CompanyLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { LandingPage } from '@/pages/LandingPage'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { StudentDashboardPage } from '@/pages/student/StudentDashboardPage'
import { CompanyDashboardPage } from '@/pages/company/CompanyDashboardPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: 'login', element: <ComingSoonPage title="Log in" /> },
          { path: 'signup', element: <ComingSoonPage title="Create your account" /> },
        ],
      },
      {
        path: 'student',
        element: <StudentLayout />,
        children: [
          { index: true, element: <StudentDashboardPage /> },
          { path: 'internships', element: <ComingSoonPage title="Internships" /> },
          { path: 'applications', element: <ComingSoonPage title="Applications" /> },
          { path: 'settings', element: <ComingSoonPage title="Settings" /> },
        ],
      },
      {
        path: 'company',
        element: <CompanyLayout />,
        children: [
          { index: true, element: <CompanyDashboardPage /> },
          { path: 'listings', element: <ComingSoonPage title="Listings" /> },
          { path: 'candidates', element: <ComingSoonPage title="Candidates" /> },
          { path: 'settings', element: <ComingSoonPage title="Settings" /> },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'users', element: <ComingSoonPage title="Users" /> },
          { path: 'analytics', element: <ComingSoonPage title="Analytics" /> },
          { path: 'settings', element: <ComingSoonPage title="Settings" /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
