import { useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import {
  useCreatePostMutation,
  useUploadImagesForPostMutation,
} from '@/features/profile/addPhoto/api/addPhotoApi'
import { ImageType, PageType } from '@/features/profile/addPhoto/types/Image'
import { TitlePhotoPages } from '@/features/profile/addPhoto/ui/title/Title'
import { base64ToFile } from '@/features/profile/addPhoto/utils/publication/base64ToFile'
import { TextField } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'
import { handleError } from '@/shared/utils/handleError'

import s from '@/features/profile/addPhoto/ui/publication/Publication.module.scss'

type Props = {
  images: ImageType[]
  currentImage: number
  backBtn: () => void
  setCurrentImageAction: (index: number) => void
  nextBtnAction: (images: ImageType[], pageName: PageType, closeModal: boolean) => void
}

export const Publication = ({
  images,
  backBtn,
  currentImage,
  setCurrentImageAction,
  nextBtnAction,
}: Props) => {
  const [isDisable, setIsDisable] = useState(false)
  const [publicationText, setPublicationText] = useState('')

  const [uploadImagesForPost] = useUploadImagesForPostMutation()
  const [createPost] = useCreatePostMutation()
  const t = useTranslations('addPost.publication')

  const setPublicationTextHandler = (text: string) => {
    if (text.length > 500) {
      return
    }
    setPublicationText(text)
  }

  const nextBtnHandler = async () => {
    const imagesToFile = images.map(item => base64ToFile(item.filteredImg, nanoid()))
    const data = { files: imagesToFile }

    try {
      setIsDisable(true)
      const { images } = await uploadImagesForPost(data).unwrap()

      const childrenMetadata = images.map(item => {
        return {
          uploadId: item.uploadId,
        }
      })
      const body = {
        description: publicationText,
        childrenMetadata,
      }

      await createPost(body).unwrap()

      setIsDisable(false)
    } catch (e: unknown) {
      handleError(e)
      setIsDisable(false)
    }

    nextBtnAction([], 'initialImg', true)
  }
  // TODO: img для UserAvatar брати з localstorage

  return (
    <div>
      {
        <TitlePhotoPages
          nextBtnAction={nextBtnHandler}
          textNextBtn={t('publish')}
          backBtnAction={backBtn}
          disableNextBtn={isDisable}
        >
          {t('title')}
        </TitlePhotoPages>
      }
      <div className={s.publicationWrapper}>
        <PhotoSlider setCurrentSlide={i => setCurrentImageAction(i)} currentSlide={currentImage}>
          {images.map(item => {
            return (
              <div key={item.id} className={s.sliderItem}>
                <Image
                  src={item.filteredImg}
                  alt={'Empty photo'} // TODO: Змінити alt
                  width={item.currentWidthImage}
                  height={item.currentHeightImage}
                />
              </div>
            )
          })}
        </PhotoSlider>
        <div className={s.contentWrapper}>
          <div className={s.decrWrapper}>
            {/*<UserAvatar img={''} name={'Test user'}/>*/}
            <div>
              <TextField
                value={publicationText}
                onChange={e => setPublicationTextHandler(e.target.value)}
                label={t('descTitle')}
                placeholder={t('placeholder')}
                rows={5}
                multiline
                fullWidth
                margin={'12px 0 0'}
                disabled={isDisable}
              />
              <div className={s.textLengthWrapper}>
                <span className={clsx(publicationText.length >= 500 && s.textLengthError)}>
                  {publicationText.length}
                </span>
                /500
              </div>
            </div>
          </div>
          <hr className={s.line} />
        </div>
      </div>
    </div>
  )
}
