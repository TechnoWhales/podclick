import Image from 'next/image'

import { CommentsPostResponse, PostItemsResponse } from '@/features/public-post/api'
import { formatRelativeTime } from '@/features/public-post/ui/dateUtils'
import { Avatar, Typography } from '@/shared/components/ui'

import s from '@/features/public-post/ui/comments/Comments.module.scss'

type Props = {
  post: PostItemsResponse
  comments?: CommentsPostResponse | null
}

export const Comments = ({comments, post}: Props) => {
  const answerLine = '/answer-line.svg'

  return (
    <div className={s.commentsWrapper}>
      {post && post.description ? (
        <div className={s.avatarWithComment}>
          <div className={s.commentAvatarWrapper}>
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

          {/*{comments && comments.items[0].answerCount > 0 && (
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
                )}*/}
        </div>
      ) : null}
      {comments && comments?.items?.length
        ? comments.items.map(comment => (
          <div key={comment.id} className={s.avatarWithComment}>
            <div className={s.commentAvatarWrapper}>
              <Avatar
                url={comment.from.avatars[0]?.url}
                size={36}
                title={'User Comment Avatar'}
              />
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
  )
}