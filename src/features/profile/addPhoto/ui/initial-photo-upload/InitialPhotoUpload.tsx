'use client'

import clsx from 'clsx'
import { openDB } from 'idb'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useImageDB } from '@/features/profile/addPhoto/hooks/useImageDB'
import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { createImage } from '@/features/profile/addPhoto/utils/createImage'
import { Button } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload.module.scss'

type Props = {
  setImage: (img: ImageType) => void
  openDraft: (img: ImageType[]) => void
  nextBtn: () => void
}

export const InitialPhotoUpload = ({ setImage, nextBtn, openDraft }: Props) => {
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

        setImage(image)
        nextBtn()
      }
    },
  })

  const openDraftHandler = async () => {
    const images = await getImages('images')

    if (images) {
      openDraft(images)
      nextBtn()
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
