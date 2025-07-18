import { useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { clsx } from 'clsx'
import Image from 'next/image'

import {
  useCreatePostMutation,
  useUploadImagesForPostMutation,
} from '@/features/profile/addPhoto/api/addPhotoApi'
import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { TitlePhotoPages } from '@/features/profile/addPhoto/ui/title/Title'
import { base64ToFile } from '@/features/profile/addPhoto/utils/base64ToFile'
import { TextField } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from '@/features/profile/addPhoto/ui/publication/Publication.module.scss'
import { handleError } from '@/shared/utils/handleError'

type Props = {
  imagesArr: ImageType[]
  backBtn: () => void
}

export const Publication = ({ imagesArr, backBtn }: Props) => {
  const [uploadImagesForPost] = useUploadImagesForPostMutation()
  const [createPost] = useCreatePostMutation()
  const [publicationText, setPublicationText] = useState('')
  const profileName = 'URLProfile'

  const setPublicationTextHandler = (text: string) => {
    if (text.length > 500) {
      return
    }
    setPublicationText(text)
  }

  const nextBtnHandler = async () => {
    const imagesToFile = imagesArr.map(item => base64ToFile(item.filteredImg as string, nanoid()))
    const data = { files: imagesToFile }

    try {
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

      const post = await createPost(body).unwrap()
      debugger
    } catch (e: unknown) {
      handleError(e)
    }
  }

  return (
    <div>
      {
        <TitlePhotoPages nextBtn={nextBtnHandler} textNextBtn={'Publish'} backBtn={backBtn}>
          Publication
        </TitlePhotoPages>
      }
      <div className={s.publicationWrapper}>
        <PhotoSlider>
          {imagesArr.map(item => {
            if (!item.filteredImg) {
              return
            }

            return (
              <div key={item.id} className={s.sliderItem}>
                <Image
                  src={item.filteredImg}
                  alt={'Empty photo'}
                  width={item.currentWidthImage}
                  height={item.currentHeightImage}
                />
              </div>
            )
          })}
        </PhotoSlider>
        <div className={s.contentWrapper}>
          <div className={s.decrWrapper}>
            <div className={s.avatarWrapper}>
              <Image
                className={s.avatarImg}
                src={'./empty-photo.svg'}
                alt={'Avatar image'}
                width={36}
                height={36}
              />
              {profileName}
            </div>
            <div>
              <TextField
                value={publicationText}
                onChange={e => setPublicationTextHandler(e.target.value)}
                label={'Add publication descriptions'}
                placeholder={'Text-area'}
                rows={5}
                multiline
                fullWidth
                margin={'12px 0 0'}
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
