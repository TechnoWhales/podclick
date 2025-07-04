'use client'
import { useState } from 'react'
import Cropper from 'react-easy-crop'

import clsx from 'clsx'

import { Button, Icon, Popover, Typography } from '@/shared/components/ui'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'

type RationMode = '1:1' | '4:5' | '16:9' | 'original'

type Props = {
  photoPreview: string
}

export const Cropping = ({ photoPreview }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [ratioMode, setRatioMode] = useState<RationMode>('original')
  const rationOriginal = ratioMode === 'original'
  const ration1to1 = ratioMode === '1:1'
  const ration4to5 = ratioMode === '4:5'
  const ration16to9 = ratioMode === '16:9'

  return (
    <>
      <div className={s.title}>
        <div className={s.arrowBack}>
          <Icon iconId={'arrowIosBack'} />
        </div>
        <Typography variant={'h1'}>Cropping</Typography>
        <Button className={s.nextBtn} variant={'link'}>
          {
            <Typography variant={'h3'} as={'h3'}>
              Next
            </Typography>
          }
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
            style={{
              cropAreaStyle: { border: 0, boxShadow: 'none' },
              containerStyle: {
                height: '498px',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
              },
            }}
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
        <div className={s.popoversWrapper}>
          <div className={s.controlsWrapper}>
            <Popover buttonText={<Icon iconId={'expandOutline'} />}>
              <div
                className={clsx(s.aspectRatioWrapper, s.imageOutline, rationOriginal && s.active)}
                onClick={() => setRatioMode('original')}
              >
                <Typography variant={rationOriginal ? 'h3' : 'regular_text_16'}>
                  Оригинал
                </Typography>{' '}
                <Icon iconId={'imageOutline'} />
              </div>
              <div
                className={clsx(s.aspectRatioWrapper, ration1to1 && s.active)}
                onClick={() => setRatioMode('1:1')}
              >
                <Typography variant={ration1to1 ? 'h3' : 'regular_text_16'}>1:1</Typography>{' '}
                <Icon iconId={'square'} />
              </div>
              <div
                className={clsx(s.aspectRatioWrapper, ration4to5 && s.active)}
                onClick={() => setRatioMode('4:5')}
              >
                <Typography variant={ration4to5 ? 'h3' : 'regular_text_16'}>4:5</Typography>{' '}
                <Icon iconId={'rectangleVertical'} />
              </div>
              <div
                className={clsx(s.aspectRatioWrapper, ration16to9 && s.active)}
                onClick={() => setRatioMode('16:9')}
              >
                <Typography variant={ration16to9 ? 'h3' : 'regular_text_16'}>16:9</Typography>{' '}
                <Icon iconId={'rectangleHorizontal'} />
              </div>
            </Popover>
            <Popover buttonText={<Icon iconId={'maximizeOutline'} />}>
              <input
                className={s.rangeInput}
                type={'range'}
                onChange={e => setZoom(Number(e.currentTarget.value))}
                min={minZoom}
                max={5}
                step={0.1}
                value={zoom}
              />
            </Popover>
          </div>

          <Popover></Popover>
        </div>
      </div>
    </>
  )
}
