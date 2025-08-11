import { RefObject, useEffect, useRef, useState } from 'react'

export const useElementInView = (options?: {
  observerOptions?: IntersectionObserverInit
  targetRef?: RefObject<HTMLElement | null>
}) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!options?.targetRef?.current) {
      return
    } // Ранний return если нет targetRef

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options?.observerOptions
    )

    const currentTarget = options.targetRef.current

    observer.observe(currentTarget)

    return () => {
      observer.unobserve(currentTarget)
    }
  }, [options?.targetRef, options?.observerOptions])

  return { isInView }
}
