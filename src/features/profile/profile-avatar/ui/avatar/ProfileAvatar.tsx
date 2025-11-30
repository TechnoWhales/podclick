import { useState } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useDeleteAvatarMutation } from '@/features/profile/profile-avatar/api/profileAvatarApi'
import { AvatarUploadModal } from '@/features/profile/profile-avatar/ui/avatar-upload-modal/AvatarUploadModal'
import { Button, Badge, CoverPlaceholder } from '@/shared/components/ui'
import { AvatarType } from '@/shared/types'

import s from './ProfileAvatar.module.scss'

type Props = {
  avatars?: AvatarType[]
}

export const ProfileAvatar = ({ avatars = [] }: Props) => {
  const t = useTranslations('settings')

  const [open, setOpen] = useState(false)
  const [avatarsArr, setAvatarsArr] = useState<AvatarType[]>(avatars)

  const [deleteAvatar] = useDeleteAvatarMutation()

  const handleAvatarUpload = (newAvatar: AvatarType) => {
    setAvatarsArr(prev => [newAvatar, ...prev])
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      await deleteAvatar().unwrap()
      setAvatarsArr([])
    } catch (e) {
      console.error('Delete avatar error', e)
    }
  }

  return (
    <div className={s.avatarWrapper}>
      <div className={s.avatar}>
        {avatarsArr[0]?.url ? (
          <>
            <Badge
              variant={'action'}
              icon={'close'}
              onClick={handleDelete}
              aria-label={t('general.photo.deletePhotoButton')}
              className={s.closeButton}
            />
            <Image
              src={avatarsArr[0].url}
              alt={'User avatar'}
              width={192}
              height={192}
              className={s.image}
            />
          </>
        ) : (
          <CoverPlaceholder width={192} height={192} circle />
        )}
      </div>

      <Button variant={'outlined'} onClick={() => setOpen(true)}>
        {t('general.photo.selectPhotoButton')}
      </Button>

      <AvatarUploadModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleAvatarUpload}
        t={t}
      />
    </div>
  )
}
