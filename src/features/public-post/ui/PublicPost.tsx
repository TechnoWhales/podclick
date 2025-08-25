'use client'

import { useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useRemovePostMutation } from '@/features/public-post/api/publicPostApi'
import { Comments } from '@/features/public-post/ui/comments/Comments'
import { formatPostDate, formatRelativeTime } from '@/features/public-post/ui/dateUtils'
import { EditPost } from '@/features/public-post/ui/edit-post/EditPost'
import { ModalPost } from '@/features/public-post/ui/ModalPost/ModalPost'
import { SmallAvatar } from '@/features/public-post/ui/SmallAvatar/SmallAvatar'
import { Avatar, Button, Icon, Popover, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from './PublicPost.module.scss'

import { CommentsPostResponse, LikesPostResponse, PostItemsResponse } from '../api'


type Props = {
  post: PostItemsResponse
  comments?: CommentsPostResponse | null
  likes?: LikesPostResponse | null
}

export const PublicPost = ({ post, comments, likes }: Props) => {
  const [isOpenChangeDescription, setIsOpenChangeDescription] = useState(false)

  const [removePost] = useRemovePostMutation()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleClose = () => {
    // создаём копию query без postId
    const params = new URLSearchParams(searchParams.toString())

    params.delete('postId')

    // если query пустой → оставляем только pathname
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname

    router.replace(newUrl, { scroll: false })
  }

  const removePostHandler = async () => {
    try {
      await removePost({postId: post.id})
    } finally {
      handleClose()
    }
  }

  return (
    <ModalPost open modalTitle={'view post'} isShowTitle={false} onClose={handleClose}>
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <PhotoSlider className={s.slider} size={'lg'}>
            {post?.images.map((item, i) => {
              return (
                <div key={i} className={s.sliderItem}>
                  <Image
                    src={item.url}
                    alt={'slider photo'}
                    width={562}
                    height={562}
                  />
                </div>
              )
            })}
          </PhotoSlider>
        </div>

        <div className={s.infoWrapper}>
          <div className={s.avatarWithNameWrapper}>
            <div className={s.avatarWrapper}>
              <div className={s.avatarWithName}>
                <div className={s.avatar}>
                  <Avatar url={post?.avatarOwner} size={36} title={post?.userName} />
                </div>
                <Typography className={s.avatarName} variant={'h3'}>{post?.userName}</Typography>
              </div>
              {!isOpenChangeDescription && (
                <Popover side={'bottom'} align={'end'} buttonText={<Icon iconId={'moreHorizontalOutline'}/>}>
                  <div className={s.popoverWrapper}>
                    <Button onClick={() => setIsOpenChangeDescription(true)} variant={'icon'} className={s.popoverItemWrapper}><Icon iconId={'editOutline'}/><Typography variant={'regular_text_14'}>Edit Post</Typography></Button>
                    <Button onClick={removePostHandler} variant={'icon'} className={s.popoverItemWrapper}><Icon iconId={'trashOutline'}/><Typography variant={'regular_text_14'}>Delete Post</Typography></Button>
                  </div>
                </Popover>
              )}

            </div>
          </div>

          {isOpenChangeDescription ? <EditPost closeModal={handleClose} postId={post.id} initDescription={post.description} /> : (
            <>
              <Comments post={post} comments={comments} />
              <div className={s.likesWrapper}>
                <div className={s.likesWithDate}>
                  <div className={s.avatarsWithLikes}>
                    {post.avatarWhoLikes && post.likesCount > 0 && (
                      <div className={s.likeAvatarsWrapper}>
                        {likes &&
                          likes.items.slice(-3).map(item => {
                            return <SmallAvatar key={item.id} data={item} />
                          })}
                      </div>
                    )}
                    <Typography variant={'bold_text_14'}>
                      {post && post.likesCount} &quot;
                      <span className={s.likeText}>{post.likesCount > 1 ? 'Likes' : 'Like'}</span>&quot;
                    </Typography>
                  </div>
                  <Typography variant={'small_text'} className={s.timeAgoText}>
                    {post && formatPostDate(post.createdAt)}
                  </Typography>
                </div>
              </div>
            </>

          )}


        </div>
      </div>
    </ModalPost>
  )
}
