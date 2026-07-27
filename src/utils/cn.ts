/**
 * Joins class names, skipping falsy values. Small local alternative to `clsx`
 * -- avoids adding a dependency for something this simple.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
