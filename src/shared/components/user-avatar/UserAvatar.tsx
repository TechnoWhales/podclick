import Image from 'next/image'

import s from './UserAvatar.module.scss'

type Props = {
  img: string
  name: string
}

export const UserAvatar = ({img, name}: Props) => {
  return (
    <div className={s.wrapper}>
        <Image
          className={s.avatar}
          src={img || '/empty-avatar.svg'}
          alt={'User Avatar'}
          width={36}
          height={36}
        />
        {name}
    </div>
  )
}