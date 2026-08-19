/**
 * Scrolls to the section with the given id. Sections are responsible for
 * their own scroll-margin-top so the sticky header + section nav never
 * cover the heading.
 *
 * Defaults to a smooth scroll (respecting prefers-reduced-motion), but
 * callers can pass `behavior: 'auto'` to jump instantly instead.
 */
export function scrollToSection(id: string, behavior?: ScrollBehavior) {
  const element = document.getElementById(id)
  if (!element) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  element.scrollIntoView({
    behavior: behavior ?? (prefersReducedMotion ? 'auto' : 'smooth'),
    block: 'start',
  })
}
