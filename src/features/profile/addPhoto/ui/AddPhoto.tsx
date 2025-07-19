'use client'
import { useState } from 'react'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { useImageDB } from '@/features/profile/addPhoto/hooks/useImageDB'
import { ImageType, Mode } from '@/features/profile/addPhoto/types/Image'
import { Cropping } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Filters } from '@/features/profile/addPhoto/ui/filters/Filters'
import { InitialPhotoUpload } from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload'
import { Publication } from '@/features/profile/addPhoto/ui/publication/Publication'
import { Button, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const t = useTranslations('addPost')
  const [mode, setMode] = useState<Mode>('initialImg')
  const [images, setImage] = useState<ImageType[]>([])
  const [open, setOpen] = useState(true)
  const [openCloseModal, setOpenCloseModal] = useState(false)

  const { clearAll, saveImages } = useImageDB()

  const saveDraftHandler = async () => {
    await clearAll()
    await saveImages('images', images)

    setOpenCloseModal(false)
    setOpen(false)
  }

  const discardHandler = () => {
    setOpenCloseModal(false)
  }

  const closeHandler = () => {
    if (images.length === 0) {
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
            openDraftAction={images => {
              setImage([...images])
            }}
            setImageAction={image => setImage([image])}
            nextBtnAction={() => setMode('cropping')}
          />
        )
      case 'cropping':
        return (
          <Cropping
            images={images}
            backBtnAction={() => {
              setMode('initialImg')
            }}
            nextBtnAction={images => {
              setMode('filter')
              setImage(images)
            }}
            setImageAction={images => setImage(images)}
          />
        )
      case 'filter':
        return (
          <Filters
            images={images}
            nextBtnAction={images => {
              setMode('publication')
              setImage(images)
            }}
            backBtnAction={() => setMode('cropping')}
            setImageAction={images => setImage(images)}
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
      modalTitle={mode === 'initialImg' ? t('addPhoto.title') : ''}
      open={open}
      onClose={closeHandler}
    >
      {renderContent()}
      <Modal
        offBackgroundAnimation
        modalTitle={'Close'}
        open={openCloseModal}
        onClose={() => {
          setOpenCloseModal(false)
          setOpen(false)
        }}
        size={'sm'}
      >
        <div className={s.textCloseModalWrapper}>
          {t.rich('closeModal.description', {
            part1: chunks => <Typography variant={'regular_text_16'}>{chunks}</Typography>,
            part2: chunks => <Typography variant={'regular_text_16'}>{chunks}</Typography>,
          })}
        </div>
        <div className={s.btnCloseModalWrapper}>
          <Button onClick={discardHandler} variant={'outlined'}>
            {t('closeModal.discard')}
          </Button>
          <Button onClick={saveDraftHandler}>{t('closeModal.saveDraft')}</Button>
        </div>
      </Modal>
    </Modal>
  )
}
