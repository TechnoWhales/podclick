'use client'
import { useState, useRef, useEffect } from 'react'

import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { PAGE_SIZE } from '@/shared/constants'
import { useElementInView } from '@/shared/hooks/useElementInView'
import { Post } from '@/shared/types'

import { useGetUserPostsQuery } from '../api/postsApi'
import { PostsList } from './PostsList'


export const Posts = ({ userId }: { userId: number }) => {
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
  const endCursorRef = useRef<number | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: response,
    isFetching,
    refetch,
  } = useGetUserPostsQuery(
    {
      userId,
      endCursorPostId: endCursorRef.current || undefined,
      params: { pageSize: 10 },
    },
    { skip: !userId }
  );

  const { isInView } = useElementInView({
    targetRef: hasMore ? loaderRef : undefined,
    observerOptions: { threshold: 0.5 },
  });

  // Обработка новых данных с защитой от undefined
  useEffect(() => {
    const newItems = response?.items ?? [];
    const receivedCount = newItems.length;
    
    if (receivedCount > 0) {
      setLoadedPosts(prev => {
        // Фильтруем дубликаты
        const uniqueNewPosts = newItems.filter(
          newPost => !prev.some(p => p.id === newPost.id)
        );

        return [...prev, ...uniqueNewPosts];
      });
      
      // Обновляем курсор последним ID
      endCursorRef.current = newItems[newItems.length - 1].id;
      
      // Определяем, есть ли еще данные
      setHasMore(receivedCount >= PAGE_SIZE); // Если пришло 8+, вероятно есть еще
    } else {
      setHasMore(false);
    }
  }, [response]);

  // Подгрузка при скролле
  useEffect(() => {
    if (isInView && !isFetching && hasMore) {
      refetch();
    }
  }, [isInView, isFetching, hasMore, refetch]);

  return (
    <section>
      <PostsList posts={loadedPosts} />

      {hasMore && (
        <div ref={loaderRef} style={{ height: '50px', position: 'relative' }}>
          {isFetching && <CircleLoading size={40} />}
        </div>
      )}

      {!hasMore && loadedPosts.length > 0 && (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Загружено {loadedPosts.length} постов
        </p>
      )}
    </section>
  )
}
