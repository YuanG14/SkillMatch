import { useEffect, useRef, useState } from 'react'

/**
 * Tracks which of the given section ids is currently "active" while the
 * user scrolls, using IntersectionObserver against a band just below the
 * sticky header/nav rather than continuous scroll-position math.
 *
 * `offsetPx` should match the combined height of anything sticky above the
 * content (header + section nav) so a section only counts as active once
 * it has actually cleared that chrome.
 */
export function useActiveSection(sectionIds: string[], offsetPx: number) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')
  const visibleIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || sectionIds.length === 0) {
      return
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            visibleIds.current.add(id)
          } else {
            visibleIds.current.delete(id)
          }
        }

        const nextActive = sectionIds.find((id) => visibleIds.current.has(id))
        if (nextActive) setActiveId(nextActive)
      },
      {
        rootMargin: `-${offsetPx}px 0px -65% 0px`,
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // sectionIds comes from a stable, memoized config array in practice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetPx])

  return activeId
}
