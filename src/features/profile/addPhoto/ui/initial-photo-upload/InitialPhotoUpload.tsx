'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useImageDB } from '@/features/profile/addPhoto/hooks/useImageDB'
import { ImageType, PageType } from '@/features/profile/addPhoto/types/Image'
import { createImage } from '@/features/profile/addPhoto/utils/createImage'
import { Button } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload.module.scss'

type Props = {
  nextBtnAction: (image: ImageType[], pageName: PageType) => void
}

export const InitialPhotoUpload = ({ nextBtnAction }: Props) => {
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

        nextBtnAction([image], 'cropping')
      }
    },
  })

  const openDraftHandler = async () => {
    const images = await getImages('images')

    if (images) {
      nextBtnAction(images, 'cropping')
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
