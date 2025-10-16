'use client'
import { ChangeEvent, useState, useRef } from 'react'

import { useUploadAvatarMutation } from '@/features/profile/profile-avatar/api/profileAvatarApi'
import { CroppingArea } from '@/features/profile/profile-avatar/ui/cropping-area/CroppingArea'
import { Button, CoverPlaceholder } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { notify } from '@/shared/lib/notify'
import { AvatarType } from '@/shared/types'

import s from './AvatarUploadModal.module.scss'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (avatar: AvatarType) => void
  t: (key: string) => string
}

const MAX_SIZE_MB = 10
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

export const AvatarUploadModal = ({ open, onClose, onSave, t }: Props) => {
  const [cropping, setCropping] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]

    if (!selected) {
      return
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      notify.error('Error! Photo size must be less than 10 MB!')

      return
    }

    if (!ALLOWED_TYPES.includes(selected.type)) {
      notify.error('Error! The format of the uploaded photo must be PNG or JPEG!')

      return
    }

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setCropping(true)
  }

  const handleUpload = async (avatarFile: File) => {
    try {
      const response = await uploadAvatar({ file: avatarFile }).unwrap()
      const newAvatar = response.avatars[0]

      onSave(newAvatar)
      resetState()
      onClose()
    } catch (err) {
      console.error('Avatar upload error:', err)
    }
  }

  const resetState = () => {
    setFile(null)
    setPreview(null)
    setCropping(false)
  }

  const renderInitialUpload = () => (
    <label className={s.uploadLabel}>
      <div className={s.imgWrapper}>
        <CoverPlaceholder />
      </div>

      <input type={'file'} accept={'image/*'} hidden onChange={handleFileChange} ref={inputRef} />

      <Button variant={'primary'} onClick={() => inputRef.current?.click()}>
        {t('general.photo.addPhotoModalButton')}
      </Button>
    </label>
  )

  const renderCropping = () => (
    <CroppingArea
      image={preview!}
      onCancel={() => setCropping(false)}
      onCropComplete={async blob => {
        const croppedFile = new File([blob], file!.name, { type: 'image/jpeg' })

        await handleUpload(croppedFile)
      }}
    />
  )

  const content = (() => {
    if (!preview) {
      return renderInitialUpload()
    }
    if (cropping) {
      return renderCropping()
    }

    return null
  })()

  return (
    <Modal
      open={open}
      onClose={onClose}
      modalTitle={t('general.photo.addPhotoModalTitle')}
      className={s.modal}
    >
      <div className={s.wrapper}>
        <div className={s.message}></div>
        {content}
      </div>
    </Modal>
  )
}
