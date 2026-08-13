import { Outlet } from 'react-router-dom'

/**
 * Shared application shell. Add global nav/footer here as
 * student- and company-facing chrome is introduced in later sprints.
 */
export function RootLayout() {
  return <Outlet />
}
