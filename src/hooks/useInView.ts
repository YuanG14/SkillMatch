import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Fraction of the element that must be visible before it counts as "in view". */
  threshold?: number
  /** Only ever flip to true once, then keep observing stopped. */
  once?: boolean
}

/**
 * Tracks whether an element has entered the viewport, for scroll-triggered
 * reveal animations. Falls back to `true` immediately if IntersectionObserver
 * isn't available, so content is never hidden in unsupported environments.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.2,
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}
