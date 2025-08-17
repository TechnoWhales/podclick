'use client'

import type { Card } from '../../lib'

import { useState } from 'react'

import Image from 'next/image'

import { ExpandableText } from '@/features/public-cards/ui/public-card/expandable-text/ExpandableText'
import { TimeAgo } from '@/shared/components/time-ago/TimeAgo'
import { Avatar, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import './Slider.css'

import s from './PublicCard.module.scss'

type Props = {
  item: Card
}

export const PublicCard = ({ item }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className={s.card}>
      {/*TODO исправить костыль со слайдером*/}
      <div className={s.image}>
        {isExpanded ? (
          <Image src={item.images[0].url} alt={'placeholder'} fill style={{ objectFit: 'cover' }} />
        ) : (
          <PhotoSlider className={s.slider} size={'sm'} totalCountSlider={item.images.length}>
            {item.images.map(image => (
              <Image key={image.createdAt} src={image.url} alt={''} width={234} height={240} />
            ))}
          </PhotoSlider>
        )}
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
