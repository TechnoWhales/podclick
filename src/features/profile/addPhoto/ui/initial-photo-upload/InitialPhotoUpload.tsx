'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useImageDB } from '@/features/profile/addPhoto/hooks/useImageDB'
import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { createImage } from '@/features/profile/addPhoto/utils/createImage'
import { Button } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload.module.scss'

type Props = {
  setImageAction: (img: ImageType) => void
  openDraftAction: (img: ImageType[]) => void
  nextBtnAction: () => void
}

export const InitialPhotoUpload = ({ setImageAction, nextBtnAction, openDraftAction }: Props) => {
  const t = useTranslations('addPost.addPhoto')
  const { getImages } = useImageDB()
  const { UploadButton } = useUploadFile({
    typeFile: 'pngjpeg',
    onUpload: ({ base64: img }) => {
      if (!img) {
        return
      }

      const imageEl = new window.Image()

      imageEl.src = img

      imageEl.onload = () => {
        const naturalWidthImage = imageEl.naturalWidth
        const naturalHeightImage = imageEl.naturalHeight
        const image = createImage({ img, naturalWidthImage, naturalHeightImage })

        setImageAction(image)
        nextBtnAction()
      }
    },
  })

  const openDraftHandler = async () => {
    const images = await getImages('images')

    if (images) {
      openDraftAction(images)
      nextBtnAction()
    }
  }

  return (
    <div>
      <div className={clsx(s.addPhotoWrapper)}>
        <Image
          className={clsx(s.photoImg)}
          src={'/empty-photo.svg'}
          alt={'Empty photo'}
          width={222}
          height={228}
        />
        <UploadButton className={s.selectBtn}>{t('uploadButton')}</UploadButton>
        <Button onClick={openDraftHandler} className={s.draftBtn} variant={'outlined'}>
          {t('openDraft')}
        </Button>
      </div>
    </div>
  )
}
