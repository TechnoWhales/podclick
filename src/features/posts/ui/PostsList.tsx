'use client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { ModalPost } from '@/features/public-post/ui/ModalPost/ModalPost'
import { PAGE_SIZE } from '@/shared/constants'
import { Post } from '@/shared/types'

import s from './Posts.module.scss'

export const PostsList = ({ posts }: { posts: Post[] }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const handleClick = (id: number) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('postId', id.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('postId')
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <ul className={s.posts} data-count={posts.length}>
      {posts.length &&
        posts.map((post, index) => {
          return (
            <li key={post.id} className={s.post} data-index={index + 1} data-id={post.id}>
              {post.images.length && (
                <button type={'button'} onClick={() => handleClick(post.id)}>
                  <Image
                    src={post.images[0].url}
                    alt={post.userName || 'image'}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                    priority={index < PAGE_SIZE}
                    quality={80}
                  />
                </button>
              )}
              {postId && <ModalPost open modalTitle={'view post'} isShowTitle={false} onClose={handleCloseModal}>View Post {post.id}</ModalPost>}
            </li>
          )
        })}
    </ul>
  )
}
