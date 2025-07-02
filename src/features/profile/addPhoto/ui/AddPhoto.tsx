"use client"
import { useState } from 'react'

import Image from 'next/image'

import { Button } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const [open, setOpen] = useState(false)

  return <Modal className={s.addPhoto} modalTitle={'Add Photo'} open onClose={() => setOpen(!open)}>
    <div className={s.addPhotoWrapper}>
      <Image className={s.photoImg} src={"/empty-photo.svg"} alt={"Empty photo"} width={222} height={228}/>
      <Button className={s.selectBtn}>Select from Computer</Button>
      <Button className={s.draftBtn} variant={'outlined'}>Open Draft</Button>
    </div>
  </Modal>
}