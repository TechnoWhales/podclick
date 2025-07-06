'use client'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { nanoid } from '@reduxjs/toolkit'
import clsx from 'clsx'
import Image from 'next/image'

import {calculateZoom} from "@/features/profile/addPhoto/utils/calculateZoom";
import {getZoomBoost} from "@/features/profile/addPhoto/utils/getZoomBoost";
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
  const [currentPhotoHeight, setCurrentPhotoHeight] = useState(497)
  const [currentPhotoWidth, setCurrentPhotoWidth] = useState(492)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [ratioMode, setRatioMode] = useState<RationMode>('original')
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

  const maxZoom = 10
  const rationOriginal = ratioMode === 'original'
  const ration1to1 = ratioMode === '1:1'
  const ration4to5 = ratioMode === '4:5'
  const ration16to9 = ratioMode === '16:9'


  useEffect(() => {
    const { width: imageWidth, height: imageHeight } = { width: cropWidth, height: cropHeight }

    switch (ratioMode) {
      case 'original': {
        if (originalHeight && originalWidth) {
          setCurrentPhotoWidth(originalWidth)
          setCurrentPhotoHeight(originalHeight)
        }
        setMinZoom(1)
        setZoom(1)
        break
      }
      case '1:1': {
        const containerW = 490
        const containerH = 497
        const zoomBoost = getZoomBoost(imageWidth, imageHeight, containerW, containerH)
        const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth, imageHeight, zoomBoost })

        setCurrentPhotoWidth(containerW)
        setCurrentPhotoHeight(containerH)
        setMinZoom(zoom)
        setZoom(zoom)
        break
      }

      case '4:5': {
        const containerW = 394
        const containerH = 497
        const zoomBoost = getZoomBoost(imageWidth, imageHeight, containerW, containerH)
        const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth, imageHeight, zoomBoost })

        setCurrentPhotoWidth(containerW)
        setCurrentPhotoHeight(containerH)
        setMinZoom(zoom)
        setZoom(zoom)
        break
      }

      case '16:9': {
        const containerW = 492
        const containerH = 276
        const zoomBoost = getZoomBoost(imageWidth, imageHeight, containerW, containerH)
        const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth, imageHeight, zoomBoost })

        setCurrentPhotoWidth(containerW)
        setCurrentPhotoHeight(containerH)
        setMinZoom(zoom)
        setZoom(zoom)
        break
      }
    }
  }, [ratioMode, setCrop, setZoom, currentPhotos, photos[currentPhotos]])


  return (
    <div className={s.cropping}>
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
      <div className={clsx(s.container)}>
          <div className={s.cropWrapper}>
            <Cropper
                image={photos[currentPhotos] || photos[0]}
                crop={crop}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                zoomSpeed={0.5}
                showGrid={true}
                cropSize={{ width: currentPhotoWidth, height: currentPhotoHeight }}
                restrictPosition
                onCropChange={setCrop}
                onZoomChange={setZoom}
                style={{
                  cropAreaStyle: { border: 0, boxShadow: 'none' },
                  containerStyle: {
                    margin: 'auto',
                    height: `${currentPhotoHeight}px`,
                    width: `${currentPhotoWidth}px`,
                    borderBottomLeftRadius: currentPhotoHeight < 490 || currentPhotoWidth < 490 || ration4to5 ? "0" : '10px',
                    borderBottomRightRadius: currentPhotoHeight < 490 || currentPhotoWidth < 490 || ration4to5? "0" : '10px',
                  },
                }}
                onMediaLoaded={({ width, height }) => {
                  setCropHeight(height)
                  setCropWidth(width)
                  setCurrentPhotoHeight(height)
                  setCurrentPhotoWidth(width)
                  setOriginalHeight(height)
                  setOriginalWidth(width)
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
    </div>
  )
}
