'use client'
import { useState} from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { Cropping } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Filters } from '@/features/profile/addPhoto/ui/filters/Filters'
import { Button, Icon } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from './AddPhoto.module.scss'

type Mode = 'cropping' | 'filter' | "addPhoto"


export const AddPhoto = () => {
  const [mode, setMode] = useState<Mode>('addPhoto')
  const [images, setImage] = useState<ImageType[]>([])
  const [open, setOpen] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string>('')

  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64}) => {
      if (!base64) {return}

      setPhotoPreview(base64)
      setMode('cropping')

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
      {mode === 'cropping' && <Cropping photoPreview={photoPreview} backBtn={() => setMode('addPhoto')} nextBtn={(images) => {
        setMode('filter')
        setImage(images)
      }}/>}
      {mode === 'filter' && <Filters imagesArr={images}/>}
    </Modal>
  )
}



