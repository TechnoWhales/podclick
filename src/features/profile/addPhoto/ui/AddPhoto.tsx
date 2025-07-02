"use client"
import { useState, useRef } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import { Button, Icon, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const [open, setOpen] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleFileChange = () => {
    const file = fileInput.current?.files?.[0]

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setPhotoPreview(e.target?.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return <Modal className={clsx(s.addPhoto, photoPreview && s.cropping )} modalTitle={photoPreview ? '' : 'Add Photo'} open onClose={() => setOpen(!open)}>
    {photoPreview && <div className={s.croppingTitleWrapper}>
      <div className={s.arrowBack}><Icon  iconId={'arrowIosBack'} /></div>
      <Typography variant={'h1'}>Cropping</Typography>
      <Button className={s.nextBtn} variant={'link'} >
        {<Typography variant={'h3'} as={'h3'}>Next</Typography>}
      </Button>
    </div>}
    <div className={clsx(s.addPhotoWrapper, photoPreview && s.photoPreview)}>
      <Image className={clsx(s.photoImg, photoPreview && s.photoPreview)}  src={photoPreview || '/empty-photo.svg'} alt={"Empty photo"} width={222} height={228}/>
      {!photoPreview && <Button className={s.selectBtn} onClick={() => fileInput.current?.click()}>Select from Computer</Button>}
      {!photoPreview && <input type={"file"} accept={"image/*"} style={{display:"none"}} ref={fileInput} onChange={handleFileChange}/>}
      {!photoPreview && <Button className={s.draftBtn} variant={'outlined'}>Open Draft</Button>}
    </div>
  </Modal>
}