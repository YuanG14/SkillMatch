/**
 * Single focus-visible treatment reused by every interactive element
 * (buttons, nav links, icon-only controls) so keyboard focus looks the
 * same everywhere in the app instead of each component defining its own.
 */
export const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
