'use client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { ModalPost } from '@/features/public-post/ui/ModalPost/ModalPost'
import { PAGE_SIZE, ROUTES } from '@/shared/constants'
import { Post } from '@/shared/types'

import s from './Posts.module.scss'
import { Link, usePathname } from '@/i18n/navigation'

export const PostsList = ({ posts, postId }: { posts: Post[]; postId: number }) => {
  // const handleClick = (id: number) => {
  //   const params = new URLSearchParams(searchParams.toString())
  //
  //   params.set('postId', id.toString())
  //   router.push(`?${params.toString()}`, { scroll: false })
  // }
  //
  // const handleCloseModal = () => {
  //   const params = new URLSearchParams(searchParams.toString())
  //
  //   params.delete('postId')
  //   router.push(`?${params.toString()}`, { scroll: false })
  // }

  const pathname = usePathname()

  return (
    <ul className={s.posts} data-count={posts.length}>
      {posts.length &&
        posts.map((post, index) => {
          return (
            <li key={post.id} className={s.post} data-index={index + 1} data-id={post.id}>
              {post.images.length && (
                <Link href={`${pathname}?postId=${postId}`}>
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
                </Link>
              )}
              {/*{postId && <ModalPost open modalTitle={'view post'} isShowTitle={false} onClose={handleCloseModal}>View Post {post.id}</ModalPost>}*/}
            </li>
          )
        })}
    </ul>
  )
}
