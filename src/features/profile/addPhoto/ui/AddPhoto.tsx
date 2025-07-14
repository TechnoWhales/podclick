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
  const [mode, setMode] = useState<Mode>('initialImg')
  const [images, setImage] = useState<ImageType[]>([])
  const [open, setOpen] = useState(false)

  const renderContent = () => {
    switch (mode) {
      case 'initialImg':
        return <InitialPhotoUpload setImage={(image => setImage([image]))} nextBtn={() => setMode('cropping')}/>
      case 'cropping':
        return (
          <Cropping
            images={images}
            backBtn={() => setMode('initialImg')}
            nextBtn={images => {
              setMode('filter')
              setImage(images)
            }}
          />
        )
      case 'filter':
        return <Filters images={images} nextBtn={images => {
          setMode('publication')
          setImage(images)
        }} backBtn={() => setMode('cropping')}/>
      case 'publication':
        return <Publication imagesArr={images} backBtn={() => setMode('filter')}/>
    }
  }
  
  return (
    <Modal
      className={clsx(s.addPhoto, mode === 'cropping' && s.cropping, mode === 'filter' && s.filters, mode === 'publication' && s.publication)}
      modalTitle={mode === 'initialImg' ? 'Add Photo' : ''}
      open
      onClose={() => setOpen(!open)}
    >
      {renderContent()}
    </Modal>
  )
}



