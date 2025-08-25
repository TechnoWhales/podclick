'use client'
import { useState, useRef, useEffect } from 'react'

import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { PAGE_SIZE } from '@/shared/constants'
import { useElementInView } from '@/shared/hooks/useElementInView'
import { Post } from '@/shared/types'

import { useLazyGetUserPostsQuery } from '../api/postsApi'
import { PostsList } from './PostsList'

export const Posts = ({ userId }: { userId: number }) => {
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)

  const endCursorRef = useRef<number | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const inFlightRef = useRef(false)

  const [trigger, { data }] = useLazyGetUserPostsQuery()

  const { isInView } = useElementInView({
    targetRef: loaderRef,
    observerOptions: { threshold: 0.5, rootMargin: '0px' },
  })

  /**
   * функция для запроса данных с защитой от дубликатов
   *
   */
  const loadPosts = () => {
    if (inFlightRef.current || !hasMore || !userId) {
      return
    }

    inFlightRef.current = true
    trigger({
      userId,
      endCursorPostId: endCursorRef.current,
      params: { pageSize: PAGE_SIZE },
    }).finally(() => {
      inFlightRef.current = false
    })
  }

  // первый запрос при маунте
  useEffect(() => {
    loadPosts()
  }, [userId])

  // обработка новых данных
  useEffect(() => {
    if (!data) {
      return
    }

    const newItems = data.items ?? []

    if (newItems.length > 0) {
      setLoadedPosts(prev => {
        const seen = new Set(prev.map(p => p.id))

        return [...prev, ...newItems.filter(p => !seen.has(p.id))]
      })

      endCursorRef.current = newItems[newItems.length - 1].id

      setHasMore(true) // так отображаются все посты, но виден лоадер после последней партии постов
      //alert(newItems.length) // 8 7 - всего 15
      //newItems.length >= PAGE_SIZE ? setHasMore(true) : setHasMore(false) // TODO: не работает из-за того, что со второго запроса приходят 7 постов, а не 8
      //setHasMore(newItems.length >= PAGE_SIZE) // должно быть так
    } else {
      setHasMore(false)
    }
  }, [data])

  // догрузка, если контент не заполняет экран
  useEffect(() => {
    const loaderEl = loaderRef.current

    if (!loaderEl || !hasMore) {
      return
    }

    const rect = loaderEl.getBoundingClientRect()

    if (rect.top < window.innerHeight) {
      loadPosts()
    }
  }, [loadedPosts, hasMore])

  // догрузка по скроллу через IntersectionObserver
  useEffect(() => {
    if (isInView) {
      loadPosts()
    }
  }, [isInView])

  return (
    <section>
      <PostsList posts={loadedPosts} />

      <div ref={loaderRef} style={{ height: '50px', position: 'relative' }}>
        {hasMore && inFlightRef.current && <CircleLoading size={40} />}
      </div>
    </section>
  )
}

//TODO: все запросы после 1-го возвращают максимум 7 постов
//TODO: лоадер после последней загрузки убрать
