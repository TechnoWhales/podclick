import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Button, Badge } from '@/shared/components/ui'

import s from './ProfileAvatar.module.scss'

export const ProfileAvatar = () => {
  const t = useTranslations('settings')

  return (
    <div className={s.avatarWrapper}>
      <div className={s.avatar}>
        <Badge
          variant={'action'}
          icon={'close'}
          onClick={() => console.log('close')}
          aria-label={t('general.photo.deletePhotoButton')}
          className={s.closeButton}
        />
        <Image src={'/icons/picture.svg'} alt={'Image placeholder'} width={48} height={48} />
      </div>
      <Button variant={'outlined'}>{t('general.photo.selectPhotoButton')}</Button>
    </div>
  )
}
