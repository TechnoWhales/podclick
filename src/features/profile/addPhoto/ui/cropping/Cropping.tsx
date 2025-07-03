"use client"
import { useState } from 'react'
import Cropper from 'react-easy-crop'

import clsx from 'clsx'

import { Button, Icon, Popover, Typography } from '@/shared/components/ui'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'

type Props = {
  photoPreview: string
}

export const Cropping = ({photoPreview}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)

  return <>
    <div className={s.title}>
      <div className={s.arrowBack}><Icon iconId={'arrowIosBack'} /></div>
      <Typography variant={'h1'}>Cropping</Typography>
      <Button className={s.nextBtn} variant={'link'} >
        {<Typography variant={'h3'} as={'h3'}>Next</Typography>}
      </Button>
    </div>
    <div className={clsx(s.cropWrapper, photoPreview && s.photoPreview)}>
       <div className={s.cropContainer}>
         <Cropper
          image={photoPreview}
          crop={crop}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={5}
          zoomSpeed={0.5}
          showGrid={false}
          cropSize={{ width: 492, height: 504 }}
          restrictPosition
          onCropChange={setCrop}
          onZoomChange={setZoom}
          style={{cropAreaStyle: {border: 0, boxShadow: "none"}, containerStyle: {height: "500px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}}
          onMediaLoaded={({ width, height }) => {
            const cropWidth = 490
            const cropHeight = 500
            const zoomW = cropWidth / width
            const zoomH = cropHeight / height
            const requiredZoom = Math.max(zoomW, zoomH)

            setMinZoom(requiredZoom)
            setZoom(requiredZoom)
          }}
        />
       </div>
      <div>
        <Popover ></Popover>
        <Popover></Popover>
        <Popover></Popover>
      </div>
    </div>
  </>
}