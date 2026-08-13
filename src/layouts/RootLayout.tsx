import { Outlet, ScrollRestoration } from 'react-router-dom'

/**
 * Shared application shell. Add global nav/footer here as
 * student- and company-facing chrome is introduced in later sprints.
 */
export function RootLayout() {
  return (
    <>
      <Outlet />
      {/* Resets scroll to the top on every new navigation (and restores it
          on browser back/forward) so pages never inherit the previous
          page's scroll position -- while still respecting #hash deep
          links like /how-it-works#skill-gaps. */}
      <ScrollRestoration />
    </>
  )
}
