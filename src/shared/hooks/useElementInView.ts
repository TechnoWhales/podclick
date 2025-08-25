import { RefObject, useEffect, useRef, useState } from 'react'

/**
 * Хук для отслеживания видимости элемента в viewport
 * с использованием IntersectionObserver API
 *
 * @param {Object} [options] - Настройки хука
 * @param {IntersectionObserverInit} [options.observerOptions] - Опции для IntersectionObserver
 * @param {React.RefObject<HTMLElement | null>} [options.targetRef] - Ref целевого элемента для наблюдения
 * 
 * @returns {Object} Объект с состоянием видимости элемента
 * @returns {boolean} isInView - Флаг, указывающий находится ли элемент в зоне видимости
 *
 * @example
 * // Базовое использование
 * const targetRef = useRef(null);
 * const { isInView } = useElementInView({ targetRef });
 */

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
  }, [options?.targetRef?.current, options?.observerOptions])

  return { isInView }
}
