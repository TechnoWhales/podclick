'use client'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { nanoid } from '@reduxjs/toolkit'
import clsx from 'clsx'

import { PhotoItem } from '@/features/profile/addPhoto/ui/cropping/photo-item/PhotoItem'
import {calculateZoom} from "@/features/profile/addPhoto/utils/calculateZoom";
import {getZoomBoost} from "@/features/profile/addPhoto/utils/getZoomBoost";
import { Button, Icon, Popover, Typography } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'

type RationMode = '1:1' | '4:5' | '16:9' | 'original'

export type PhotoType = {
  id: string
  img: string
  currentPhotoHeight: number
  currentPhotoWidth: number
  crop: { x: number, y: number }
  ration: RationMode
}

type Props = {
  photoPreview: string
}

export const Cropping = ({ photoPreview }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [cropWidth, setCropWidth] = useState(0)
  const [cropHeight, setCropHeight] = useState(0)
  const [currentPhotoHeight, setCurrentPhotoHeight] = useState(497)
  const [currentPhotoWidth, setCurrentPhotoWidth] = useState(490)
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [ratioMode, setRatioMode] = useState<RationMode>('original')

  const defaultPhoto = {id: nanoid(), img: photoPreview, currentPhotoHeight, currentPhotoWidth, crop: { x: 0, y: 0 } , ration: 'original' as RationMode}
  const [photos, setPhotos] = useState<PhotoType[]>([defaultPhoto])

  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64}) => {
      if (base64) {
        const photo = {id: nanoid(), img: base64, currentPhotoHeight: 497, currentPhotoWidth: 490, crop: { x: 0, y: 0 }, ration: 'original' as RationMode}

        setPhotos(prevState => [
          ...prevState,
          photo,
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
        if (cropWidth && cropHeight) {
          setCurrentPhotoHeight(cropHeight)
          setCurrentPhotoWidth(cropWidth)
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
        const containerW = 490
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
  }, [ratioMode, setCrop, setZoom])

  const setCurrentPhoto = (index: number, photo: PhotoType) => {
    if (index === currentPhotos) {return}
    setCurrentPhotoHeight(photo.currentPhotoHeight)
    setCurrentPhotoWidth(photo.currentPhotoWidth)
    setRatioMode(photo.ration)
    setCurrentPhotos(index)
  }
  const removePhoto = (id: string, photo: PhotoType) => {
    if (photos.length !== 1) {
      setPhotos(photos.filter((photo) => photo.id !== id))
      setCurrentPhotos(currentPhotos - 1)
      setCurrentPhotoHeight(497)
      setCurrentPhotoWidth(490)
      setRatioMode(photo.ration)
    }
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    // croppedArea в % (відносно розміру зображення)
    // croppedAreaPixels в пікселях — ці значення потрібні для справжнього обрізання
  }

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
                image={photos[currentPhotos]?.img || photos[0].img}
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
                onCropComplete={onCropComplete}
                onMediaLoaded={({ width, height }) => {
                  setCropHeight(height)
                  setCropWidth(width)
                  setCurrentPhotoHeight(height)
                  setCurrentPhotoWidth(width)
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

          <div className={s.photoPanel}>
            <Button className={s.saveBtn} variant={'icon'}><Icon iconId={'save'}/></Button>
            <Popover buttonText={<Icon iconId={'image'}/>} opacity={0.8} align={'end'}>
              <div className={s.photoItemsWrapper}>
                {photos.map((photo, i)  => {
                  return <PhotoItem key={photo.id}  photo={photo} onClick={() => setCurrentPhoto(i, photo)} removePhoto={removePhoto}/>
                })}
                <UploadButton className={s.plusBtn} variant={'icon'}><Icon iconId={'plusCircleOutline'} width={"30px"} height={'30px'} viewBox={'0 0 30 30'}/></UploadButton>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
