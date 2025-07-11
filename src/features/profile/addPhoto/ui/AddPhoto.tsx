'use client'
import { useState} from 'react'

import clsx from 'clsx'

import { ImageType, Mode } from '@/features/profile/addPhoto/types/Image'
import { Cropping } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Filters } from '@/features/profile/addPhoto/ui/filters/Filters'
import { InitialPhotoUpload } from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload'
import { Publication } from '@/features/profile/addPhoto/ui/publication/Publication'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'


export const AddPhoto = () => {
  const [initialImg, setInitialImg] = useState<string>('')
  const [mode, setMode] = useState<Mode>('initialImg')
  const [images, setImage] = useState<ImageType[]>([])
  const [open, setOpen] = useState(false)

  const renderContent = () => {
    switch (mode) {
      case 'initialImg':
        return <InitialPhotoUpload setImgPreview={setInitialImg} setMode={(mode) => setMode(mode)}/>
      case 'cropping':
        return (
          <Cropping
            photoPreview={initialImg}
            backBtn={() => setMode('initialImg')}
            nextBtn={images => {
              setMode('filter')
              setImage(images)
            }}
          />
        )
      case 'filter':
        return <Filters imagesArr={images} />
      case 'publication':
        return <Publication imagesArr={images} />
    }
  }
  
  return (
    <Modal
      className={clsx(s.addPhoto, mode === 'cropping' && s.cropping, mode === 'filter' && s.filters)}
      modalTitle={mode === 'initialImg' ? 'Add Photo' : ''}
      open
      onClose={() => setOpen(!open)}
    >
      {renderContent()}
    </Modal>
  )
}



