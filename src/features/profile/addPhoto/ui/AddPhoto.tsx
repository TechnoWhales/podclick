'use client'
import { useState } from 'react'

import clsx from 'clsx'
import { openDB } from 'idb'

import { ImageType, Mode } from '@/features/profile/addPhoto/types/Image'
import { Cropping } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Filters } from '@/features/profile/addPhoto/ui/filters/Filters'
import { InitialPhotoUpload } from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload'
import { Publication } from '@/features/profile/addPhoto/ui/publication/Publication'
import { Button, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const [mode, setMode] = useState<Mode>('initialImg')
  const [images, setImage] = useState<ImageType[]>([])
  const [open, setOpen] = useState(true)
  const [openCloseModal, setOpenCloseModal] = useState(false)

  const saveDraftHandler = async () => {
    const imagesDB = await openDB('addPhotoImages', 1, {
      upgrade(db) {
        db.createObjectStore('store1')
      },
    })

    await imagesDB.clear('store1')

    await imagesDB.add('store1', { data: images }, 'images')

    setOpenCloseModal(false)
    setOpen(false)
    setImage([])
  }

  const discardHandler = () => {
    setOpenCloseModal(false)
  }

  const closeHandler = () => {
    if (mode === 'initialImg') {
      setOpen(false)
    } else {
      setOpenCloseModal(true)
    }
  }

  const renderContent = () => {
    switch (mode) {
      case 'initialImg':
        return (
          <InitialPhotoUpload
            openDraft={images => {
              setImage([...images])
            }}
            setImage={image => setImage([image])}
            setMode={() => setMode('cropping')}
            nextBtn={() => setMode('cropping')}
          />
        )
      case 'cropping':
        return (
          <Cropping
            images={images}
            backBtn={() => {
              setMode('initialImg')
              setImage([])
            }}
            nextBtn={images => {
              setMode('filter')
              setImage(images)
            }}
            setImage={images => setImage(images)}
          />
        )
      case 'filter':
        return (
          <Filters
            images={images}
            nextBtn={images => {
              setMode('publication')
              setImage(images)
            }}
            backBtn={() => setMode('cropping')}
            setImage={images => setImage(images)}
          />
        )
      case 'publication':
        return <Publication imagesArr={images} backBtn={() => setMode('filter')} />
    }
  }

  return (
    <Modal
      className={clsx(
        s.addPhoto,
        mode === 'cropping' && s.cropping,
        mode === 'filter' && s.filters,
        mode === 'publication' && s.publication
      )}
      modalTitle={mode === 'initialImg' ? 'Add Photo' : ''}
      open={open}
      onClose={closeHandler}
    >
      {renderContent()}
      <Modal
        offBackgroundAnimation
        modalTitle={'Close'}
        open={openCloseModal}
        onClose={() => setOpenCloseModal(false)}
        size={'sm'}
      >
        <div className={s.textCloseModalWrapper}>
          <Typography variant={'regular_text_16'}>
            Do you really want to close the creation of a publication?
          </Typography>
          <Typography variant={'regular_text_16'}>
            If you close everything will be deleted
          </Typography>
        </div>
        <div className={s.btnCloseModalWrapper}>
          <Button onClick={discardHandler} variant={'outlined'}>
            Discard
          </Button>
          <Button onClick={saveDraftHandler}>Save draft</Button>
        </div>
      </Modal>
    </Modal>
  )
}
