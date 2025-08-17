import type { Card } from '../../lib'

import Image from 'next/image'

import { ExpandableText } from '@/features/public-cards/ui/public-card/expandable-text/ExpandableText'
import { TimeAgo } from '@/shared/components/time-ago/TimeAgo'
import { Avatar, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from './PublicCard.module.scss'

type Props = {
  item: Card
}

export const PublicCard = ({ item }: Props) => {
  return (
    <article className={s.card}>
      {/*<PhotoSlider>*/}
      {/*  {item.images.map(image => (*/}
      {/*    <Image key={image.createdAt} src={image.url} alt={''} width={234} height={240} />*/}
      {/*  ))}*/}
      {/*</PhotoSlider>*/}
      <div className={s.image}>
        <Image src={item.images[0].url} alt={'placeholder'} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={s.info}>
        <div className={s.postAuthor}>
          <Avatar url={item.avatarOwner} title={`Avatar ${item.userName}`} />
          <Typography as={'h3'} variant={'h3'}>
            {item.userName}
          </Typography>
        </div>
        <div>
          <TimeAgo date={item.createdAt} />
          {/*<ExpandableText text={item.description} />*/}
          <ExpandableText
            text={
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus culpa cumque deleniti enim fugiat in odit officia repellat repellendus vitae.' +
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus culpa cumque deleniti enim fugiat in odit officia repellat repellendus vitae.'
            }
          />
        </div>
      </div>
    </article>
  )
}
