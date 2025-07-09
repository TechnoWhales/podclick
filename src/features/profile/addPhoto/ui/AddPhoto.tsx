'use client'
import { useState,  } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import { Cropping, ImageType } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Filters } from '@/features/profile/addPhoto/ui/filters/Filters'
import { Button } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from './AddPhoto.module.scss'

type Mode = 'cropping' | 'filter' | "addPhoto"

export const AddPhoto = () => {
  const [mode, setMode] = useState<Mode>('addPhoto')
  const [images, setImage] = useState<ImageType[]>([])
  const [open, setOpen] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [naturalWidthImage, setNaturalWidthImage] = useState(0)
  const [naturalHeightImage, setNaturalHeightImage] = useState(0)

  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64}) => {
      if (!base64) {return}

      const img = document.createElement('img')

      img.src = base64

      img.onload = () => {
        setNaturalWidthImage(img.naturalWidth)
        setNaturalHeightImage(img.naturalHeight)
        setPhotoPreview(base64)
        setMode('cropping')
      }

    }})
  
  return (
    <Modal
      className={clsx(s.addPhoto, mode === 'cropping' && s.cropping, mode === 'filter' && s.filters)}
      modalTitle={photoPreview ? '' : 'Add Photo'}
      open
      onClose={() => setOpen(!open)}
    >
      {!photoPreview && <div className={clsx(s.addPhotoWrapper, photoPreview && s.photoPreview)}>
          <Image
            className={clsx(s.photoImg, photoPreview && s.photoPreview)}
            src={photoPreview || '/empty-photo.svg'}
            alt={'Empty photo'}
            width={222}
            height={228}
          />
        {!photoPreview && <UploadButton className={s.selectBtn}>Select from Computer</UploadButton>}
        {!photoPreview && (
          <Button className={s.draftBtn} variant={'outlined'}>
            Open Draft
          </Button>
        )}
      </div>}
      {mode === 'cropping' && <Cropping photoPreview={photoPreview} naturalHeight={naturalHeightImage} naturalWidth={naturalWidthImage} backBtn={() => setMode('addPhoto')} nextBtn={(images) => {
        setMode('filter')
        setImage(images)
      }}/>}
      {mode === 'filter' && <Filters imagesArr={images}/>}
    </Modal>
  )
}
