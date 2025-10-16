import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { Button } from '@/shared/components/ui'

import s from './CroppingArea.module.scss'

type Props = {
  image: string
  onCancel: () => void
  onCropComplete: (blob: Blob) => void
}

export const CroppingArea = ({ image, onCancel, onCropComplete }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropCompleteInternal = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels)
  }

  const createCroppedImage = async () => {
    const getCroppedImg = (await import('@/shared/utils/getCroppedImg')).default
    const blob = await getCroppedImg(image, croppedAreaPixels)

    onCropComplete(blob)
  }

  return (
    <div className={s.container}>
      <div className={s.cropperWrapper}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape={'round'}
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
        />
      </div>

      <div className={s.controls}>
        <input
          type={'range'}
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={e => setZoom(Number(e.target.value))}
          className={s.zoomSlider}
        />
        <div className={s.buttons}>
          <Button variant={'outlined'} onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={createCroppedImage}>Save</Button>
        </div>
      </div>
    </div>
  )
}
