'use client'

import type { Card } from '../../lib'

import { useState } from 'react'

import Image from 'next/image'

import { ExpandableText } from '@/features/public-cards/ui/public-card/expandable-text/ExpandableText'
import { Link } from '@/i18n/navigation'
import { TimeAgo } from '@/shared/components/time-ago/TimeAgo'
import { Avatar, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'
import { ROUTES } from '@/shared/constants'

import './Slider.css'

import s from './PublicCard.module.scss'

type Props = {
  item: Card
}

export const PublicCard = ({ item }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className={s.card}>
      <Link href={`${ROUTES.PROFILE.MY_PAGE(item.ownerId)}?postId=${item.id}`}>
        <PhotoSlider className={s.slider} size={'sm'} totalCountSlider={item.images.length}>
          {item.images.map(image => (
            <Image key={image.createdAt} src={image.url} alt={''} width={234} height={240} />
          ))}
        </PhotoSlider>
      </Link>
      <div className={s.info}>
        <div className={s.postAuthor}>
          <Link href={ROUTES.PROFILE.MY_PAGE(item.ownerId)}>
            <Avatar url={item.avatarOwner} title={`Avatar ${item.userName}`} />
          </Link>
          <Typography as={'h3'} variant={'h3'}>
            {item.userName}
          </Typography>
        </div>
        <div>
          <TimeAgo date={item.createdAt} />
          <ExpandableText
            text={item.description}
            setIsExpanded={setIsExpanded}
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </article>
  )
}
