'use client'

import Image from 'next/image'

import { formatPostDate, formatRelativeTime } from '@/features/public-post/ui/dateUtils'
import { ModalPost } from '@/features/public-post/ui/ModalPost/ModalPost'
import PhotoSlider from '@/features/public-post/ui/PhotoSlider/PhotoSlider'
import { SmallAvatar } from '@/features/public-post/ui/SmallAvatar/SmallAvatar'
import { Avatar, Typography } from '@/shared/components/ui'

import s from './PublicPost.module.scss'

import { CommentsPostResponse, LikesPostResponse, PostItemsResponse } from '../api'

type Props = {
  post: PostItemsResponse
  comments?: CommentsPostResponse | null
  likes?: LikesPostResponse | null
}

export const PublicPost = ({ post, comments, likes }: Props) => {
  const answerLine = '/answer-line.svg'
  //const defaultAva = '/defaultPhoto.png'

  return (
    <ModalPost open modalTitle={'view profile'} isShowTitle={false} onClose={() => {}}>
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <PhotoSlider images={post?.images} />
        </div>

        <div className={s.infoWrapper}>
          <div className={s.avatarWithNameWrapper}>
            <div className={s.avatarWithName}>
              <div className={s.avatarWrapper}>
                {/* <Image
                  src={post?.avatarOwner || defaultAva}
                  alt={'Post Creator Avatar'}
                  fill
                  sizes={'36px'}
                  className={post?.avatarOwner ? s.avatar : s.defaultAvatar}
                /> */}
                <Avatar url={post?.avatarOwner} size={36} title={post?.userName} />
              </div>

              <Typography variant={'h3'}>{post?.userName}</Typography>
            </div>
          </div>

          <div className={s.commentsWrapper}>
            {post && post.description ? (
              <div className={s.avatarWithComment}>
                <div className={s.commentAvatarWrapper}>
                  {/* <Image
                    src={post?.avatarOwner || defaultAva}
                    alt={'Post Description Avatar'}
                    fill
                    sizes={'36px'}
                    className={post?.avatarOwner ? s.avatar : s.defaultAvatar}
                  /> */}
                  <Avatar url={post?.avatarOwner} size={36} title={post?.userName} />
                </div>

                <div className={s.commentWrapper}>
                  <div className={s.avatarWithComment}>
                    <Typography variant={'regular_text_14'}>
                      <strong>{post.userName}</strong> {post.description}
                    </Typography>
                  </div>

                  <Typography variant={'small_text'} className={s.timeAgoText}>
                    {formatRelativeTime(post.createdAt)}
                  </Typography>
                </div>

                {/* {comments && comments.items[0].answerCount > 0 && (
                  <div className={s.answersWrapper}>
                    <Image
                      src={answerLine}
                      alt={'Line Of Answers'}
                      width={24}
                      height={1}
                      className={s.answerLine}
                    />
                    <Typography variant={'semibold_small_text'}>
                      View Answers ({comments?.items.map(el => el.answerCount)})
                    </Typography>
                  </div>
                )} */}
              </div>
            ) : null}
            {comments && comments?.items?.length
              ? comments.items.map(comment => (
                  <div key={comment.id} className={s.avatarWithComment}>
                    <div className={s.commentAvatarWrapper}>
                      {/* <Image
                        src={comment.from.avatars[0]?.url || defaultAva}
                        alt={'User Comment Avatar'}
                        fill
                        sizes={'36px'}
                        className={comment.from.avatars[0] ? s.avatar : s.defaultAvatar}
                      /> */}
                      <Avatar url={comment.from.avatars[0]?.url} size={36} title={'User Comment Avatar'} />
                    </div>
                    <div className={s.commentWrapper}>
                      <div className={s.avatarWithComment}>
                        <Typography variant={'regular_text_14'}>
                          <strong>{comment.from.username}</strong> {comment.content}
                        </Typography>
                      </div>

                      <Typography variant={'small_text'} className={s.timeAgoText}>
                        {formatRelativeTime(comment.createdAt)}
                      </Typography>
                      {comment.answerCount > 0 && (
                        <div className={s.answersWrapper}>
                          <Image
                            src={answerLine}
                            alt={'Line Of Answers'}
                            width={24}
                            height={1}
                            className={s.answerLine}
                          />
                          <Typography variant={'bold_text_14'} className={s.ViewAnswer}>
                            View Answers ({comment.answerCount})
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>

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
        </div>
      </div>
    </ModalPost>
  )
}
