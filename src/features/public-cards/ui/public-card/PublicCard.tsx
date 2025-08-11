import type { Card } from '../../lib'

import Image, { type StaticImageData } from 'next/image'

import { ExpandableText } from '@/features/public-cards/ui/public-card/expandable-text/ExpandableText'
import { TimeAgo } from '@/shared/components/time-ago/TimeAgo'
import { Typography } from '@/shared/components/ui'

import s from './PublicCard.module.scss'

type Props = {
  item: Card
}

export const PublicCard = ({ item }: Props) => {
  return (
    <article className={s.card}>
      <Image src={item.images[0].url} alt={'placeholder'} width={234} height={240} />
      <div className={s.postAuthor}>
        <Image
          className={s.avatar}
          src={item.avatarOwner}
          alt={`Avatar ${item.userName}`}
          width={36}
          height={36}
        />
        <Typography as={'h3'} variant={'h3'}>
          {item.userName}
        </Typography>
      </div>
      <div>
        <TimeAgo date={item.createdAt} />
        <ExpandableText text={item.description} />
      </div>
    </article>
  )
}
