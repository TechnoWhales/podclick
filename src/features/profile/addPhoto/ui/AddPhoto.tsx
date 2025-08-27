'use client'
import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { useImageDB } from '@/features/profile/addPhoto/hooks/useImageDB'
import { ImageType, PageType } from '@/features/profile/addPhoto/types/Image'
import { Cropping } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Filters } from '@/features/profile/addPhoto/ui/filters/Filters'
import { InitialPhotoUpload } from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload'
import { Publication } from '@/features/profile/addPhoto/ui/publication/Publication'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Button, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('initialImg')
  const [images, setImage] = useState<ImageType[]>([])
  const [currentImage, setCurrentImage] = useState(0)
  const [open, setOpen] = useState(false)
  const [openCloseModal, setOpenCloseModal] = useState(false)

  const t = useTranslations('addPost')
  const { clearAll, saveImages } = useImageDB()
  const searchParams = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const action = searchParams.get('action')

    if (action !== 'create') {
      return
    }

    setOpen(true)
  }, [searchParams])

  const saveDraftHandler = async () => {
    await clearAll()
    await saveImages('images', images)

    closeModal()
    router.replace(path)
  }

  const closeHandler = () => {
    if (images.length === 0) {
      closeModal()
    } else {
      setOpenCloseModal(true)
    }
    router.replace(path)
  }

  const closeModal = () => {
    setOpen(false)
    setCurrentPage('initialImg')
    setCurrentImage(0)
    setOpenCloseModal(false)
  }

  const renderContent = () => {
    const nextBtnHandler = (images: ImageType[], pageName: PageType, closeModal = false) => {
      setImage(images)
      setCurrentPage(pageName)

      if (closeModal) {
        setOpen(false)
        router.replace(path)
        setCurrentImage(0)
      }
    }

    switch (currentPage) {
      case 'initialImg':
        return <InitialPhotoUpload nextBtnAction={nextBtnHandler} />
      case 'cropping':
        return (
          <Cropping
            images={images}
            currentImage={currentImage}
            setCurrentImageAction={setCurrentImage}
            backBtnAction={() => {
              setCurrentPage('initialImg')
            }}
            nextBtnAction={nextBtnHandler}
            setImageAction={images => setImage(images)}
          />
        )
      case 'filter':
        return (
          <Filters
            images={images}
            currentImage={currentImage}
            setCurrentImageAction={setCurrentImage}
            nextBtnAction={nextBtnHandler}
            backBtnAction={() => setCurrentPage('cropping')}
            setImageAction={images => setImage(images)}
          />
        )
      case 'publication':
        return (
          <Publication
            currentImage={currentImage}
            setCurrentImageAction={setCurrentImage}
            images={images}
            nextBtnAction={nextBtnHandler}
            backBtn={() => setCurrentPage('filter')}
          />
        )
    }
  }

  return (
    <Modal
      className={clsx(
        s.addPhoto,
        currentPage === 'cropping' && s.cropping,
        currentPage === 'filter' && s.filters,
        currentPage === 'publication' && s.publication
      )}
      modalTitle={currentPage === 'initialImg' ? t('addPhoto.title') : ''}
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
          setCurrentPage('initialImg')
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
          <Button onClick={() => setOpenCloseModal(false)} variant={'outlined'}>
            {t('closeModal.discard')}
          </Button>
          <Button onClick={saveDraftHandler}>{t('closeModal.saveDraft')}</Button>
        </div>
      </Modal>
    </Modal>
  )
}
