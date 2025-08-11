'use client'
import Image from 'next/image'

import s from './SmallAvatar.module.scss'

import { ItemPost } from '../../api'

type Props = {
  data?: ItemPost
}
export const SmallAvatar = ({ data }: Props) => {
  const defaultAva = '/defaultPhoto.png'
  const avatarURL = data?.avatars[0]?.url

  return (
    <div className={s.imageWrapper}>
      <Image
        alt={'avatar'}
        height={24}
        width={24}
        src={avatarURL || defaultAva}
        className={s.defaultFirstLikeAvatar}
      />
    </div>
  )
}
