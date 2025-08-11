'use client'
import Image from 'next/image'

import { PAGE_SIZE } from '@/shared/constants'
import { Post } from '@/shared/types'

import s from './Posts.module.scss'

export const PostsList = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className={s.posts} data-count={posts.length}> 
      {posts.length && 
        posts.map((post, index) => {
          return (
            <li key={post.id} className={s.post} data-index={index+1} data-id={post.id}>
              {post.images.length && <Image
                src={post.images[0].url}
                alt={post.userName || 'image'}
                fill
                style={{
                  objectFit: 'cover',
                }}
                sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                priority={index < PAGE_SIZE}
                quality={80}
              />}
            </li>
          )
        })}
    </ul>
  )
}
