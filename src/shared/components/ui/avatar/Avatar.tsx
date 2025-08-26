import clsx from 'clsx'
import Image from 'next/image'

import s from './Avatar.module.scss'

import { AvatarPlaceholder } from './avatar-placeholder/AvatarPlaceholder'

type Props = {
  url?: string
  title?: string
  size?: 204 | 48 | 36 | 24
  className?: string
}

export const Avatar = ({ url, title = 'avatar', size = 24, className }: Props) => {
  return url ? (
    <Image
      src={url}
      alt={title}
      width={size}
      height={size}
      className={clsx(s.avatar, className)}
      quality={80}
    />
  ) : (
    <AvatarPlaceholder size={size} />
  )
}
