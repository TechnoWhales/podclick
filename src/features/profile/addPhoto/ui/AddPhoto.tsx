"use client"
import { useState, useRef } from 'react'
import Cropper from "react-easy-crop";

import clsx from 'clsx'
import Image from 'next/image'

import { Cropping } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Button, Icon, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
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
    <div className={clsx(s.addPhotoWrapper, photoPreview && s.photoPreview)}>
      {photoPreview ? <Cropping photoPreview={photoPreview}/> :
          <Image className={clsx(s.photoImg, photoPreview && s.photoPreview)}  src={photoPreview || '/empty-photo.svg'} alt={"Empty photo"} width={222} height={228}/>
      }
      {!photoPreview && <Button className={s.selectBtn} onClick={() => fileInput.current?.click()}>Select from Computer</Button>}
      {!photoPreview && <input type={"file"} accept={"image/*"} style={{display:"none"}} ref={fileInput} onChange={handleFileChange}/>}
      {!photoPreview && <Button className={s.draftBtn} variant={'outlined'}>Open Draft</Button>}
    </div>
  </Modal>
}


// <div className={s.cropContainer}> <Cropper
//   image={photoPreview}
//   crop={crop}
//   zoom={zoom}
//   minZoom={minZoom}
//   maxZoom={5}
//   zoomSpeed={0.5}
//   showGrid={false}
//   cropSize={{ width: 490, height: 500 }}
//   restrictPosition
//   onCropChange={setCrop}
//   onZoomChange={setZoom}
//   style={{cropAreaStyle: {border: 0, boxShadow: "none"}}}
//   onMediaLoaded={({ width, height }) => {
//     const cropWidth = 490
//     const cropHeight = 500
//     const zoomW = cropWidth / width
//     const zoomH = cropHeight / height
//     const requiredZoom = Math.max(zoomW, zoomH)
//
//     setMinZoom(requiredZoom)
//     setZoom(requiredZoom)
//   }}
// /></div>