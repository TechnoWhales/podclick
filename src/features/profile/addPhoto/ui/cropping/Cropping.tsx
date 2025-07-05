'use client'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { nanoid } from '@reduxjs/toolkit'
import clsx from 'clsx'
import Image from 'next/image'

import { Button, Icon, Popover, Typography } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'

type PhotoItemProps = {
  img: string
  onClick: () =>  void
  removePhoto: () => void
}

type RationMode = '1:1' | '4:5' | '16:9' | 'original'

type Props = {
  photoPreview: string
}

const PhotoItem = ({img, onClick, removePhoto}: PhotoItemProps) => {
  return (
    <div className={s.photoItemWrapper}>
      <Button className={s.removePhoto} variant={"icon"} onClick={removePhoto}>
        <Icon iconId={'close'} />
      </Button>
      <Image src={img} alt={'Empty photo'} width={82} height={82} onClick={onClick}/>
    </div>
  )
}

export const Cropping = ({ photoPreview }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [cropWidth, setCropWidth] = useState(0)
  const [cropHeight, setCropHeight] = useState(0)
  const [currentPhotoHeight, setCurrentPhotoHeight] = useState(504)
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [ratioMode, setRatioMode] = useState<RationMode>('1:1')
  const [photos, setPhotos] = useState<string[]>([photoPreview])
  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64}) => {
      if (base64) {
        setPhotos(prevState => [
          ...prevState,
          base64,
        ])
      }
    }})
  const [currentPhotos, setCurrentPhotos] = useState(0)
  const maxZoom = 5
  const rationOriginal = ratioMode === 'original'
  const ration1to1 = ratioMode === '1:1'
  const ration4to5 = ratioMode === '4:5'
  const ration16to9 = ratioMode === '16:9'

debugger
  useEffect(() => {
    // const photoHeight = document.querySelector('.reactEasyCrop_Image')?.clientHeight
    //
    // if (photoHeight) {
    //   debugger
    // }

    const baseWidth = 490
    const baseHeight = 500
    const zoomW = baseWidth / cropWidth
    const zoomH = baseHeight / cropHeight
    const requiredZoom = Math.max(zoomW, zoomH)

    switch (ratioMode) {
      case 'original': {
        const photoHeight = document.querySelector('.reactEasyCrop_Image')?.clientHeight

        if (photoHeight) {
          setCurrentPhotoHeight(photoHeight)
        }
        setMinZoom(1)
        setZoom(1)
        break
      }
      case '1:1':
        setCurrentPhotoHeight(500)
        setMinZoom(requiredZoom)
        setZoom(requiredZoom)
        break
    }
  }, [ratioMode, setCrop, setZoom])


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
                image={photos[currentPhotos] || photos[0]}
                crop={crop}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                zoomSpeed={0.5}
                showGrid={true}
                // cropSize={{ width: 492, height: 504 }}
                // cropSize={{ width: 492, height: 369 }}
                cropSize={{ width: 492, height: currentPhotoHeight }}
                restrictPosition
                onCropChange={setCrop}
                onZoomChange={setZoom}
                style={{
                  cropAreaStyle: { border: 0, boxShadow: 'none' },
                  containerStyle: {
                    // height: '498px',
                    // height: '369px',
                    height: `${currentPhotoHeight}px`,
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                  },
                }}
                onMediaLoaded={({ width, height }) => {
                  setCropWidth(width)
                  setCropHeight(height)
                  // setCurrentPhotoHeight(height)

                  const cropWidth = 490
                  const cropHeight = 500
                  const zoomW = cropWidth / width
                  const zoomH = cropHeight / height
                  const requiredZoom = Math.max(zoomW, zoomH)

                  switch (ratioMode) {
                    case 'original':
                      setMinZoom(1)
                      setZoom(1)
                      break
                    case '1:1':
                      setMinZoom(requiredZoom)
                      setZoom(requiredZoom)
                      break
                  }

                }}
            />
          </div>
        <div className={s.popoversWrapper}>
          <div className={s.controlsWrapper}>
            <Popover buttonText={<Icon iconId={'expandOutline'} />} opacity={0.8}>
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
            <Popover buttonText={<Icon iconId={'maximizeOutline'} />} opacity={0.8}>
              <input
                className={s.rangeInput}
                type={'range'}
                onChange={e => setZoom(Number(e.currentTarget.value))}
                min={minZoom}
                max={maxZoom}
                step={0.1}
                value={zoom}
              />
            </Popover>
          </div>

          <Popover buttonText={<Icon iconId={'image'}/>} opacity={0.8} align={'end'}>
            <div className={s.photoItemsWrapper}>
              {photos.map((photo, index)  => {
                const id = nanoid()

                return <PhotoItem key={id} img={photo} onClick={() => setCurrentPhotos(index)} removePhoto={() => setPhotos(photos.filter((_, i) => i !== index))}/>
              })}
              <UploadButton className={s.plusBtn} variant={'icon'}><Icon iconId={'plusCircleOutline'} width={"30px"} height={'30px'} viewBox={'0 0 30 30'}/></UploadButton>
            </div>
          </Popover>
        </div>
      </div>
    </>
  )
}
