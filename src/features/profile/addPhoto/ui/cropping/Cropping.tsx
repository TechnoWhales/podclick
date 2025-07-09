'use client'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { nanoid } from '@reduxjs/toolkit'
import clsx from 'clsx'

import { PhotoItem } from '@/features/profile/addPhoto/ui/cropping/photo-item/PhotoItem'
import { calculateZoom } from "@/features/profile/addPhoto/utils/calculateZoom";
import { getZoomBoost } from "@/features/profile/addPhoto/utils/getZoomBoost";
import { Button, Icon, Popover, Typography } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'

type CroppedAreaPixels = {
  height: number
  width: number
  x: number
  y: number
}

type RationMode = '1:1' | '4:5' | '16:9' | 'original'

export type PhotoType = {
  id: string
  img: string
  originalWidthImage: number
  originalHeightImage: number
  currentHeightImage: number
  currentWidthImage: number
  naturalHeightImage: number
  naturalWidthImage: number
  crop: { x: number, y: number }
  zoom: number
  minZoom: number
  ration: RationMode
}

type Props = {
  photoPreview: string
  naturalWidth: number
  naturalHeight: number
}

export const Cropping = ({ photoPreview, naturalHeight, naturalWidth }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [currentHeightImage, setCurrentHeightImage] = useState(497)
  const [currentWidthImage, setCurrentWidthImage] = useState(490)
  const [naturalHeightImage, setNaturalHeightImage] = useState(0)
  const [naturalWidthImage, setNaturalWidthImage] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [ratioMode, setRatioMode] = useState<RationMode>('original')

  const defaultPhoto = {
    id: nanoid(),
    img: photoPreview,
    currentHeightImage,
    currentWidthImage,
    crop: { x: 0, y: 0 },
    ration: 'original' as RationMode,
    zoom: 1,
    minZoom: 1,
    originalWidthImage: 0,
    originalHeightImage: 0,
    naturalHeightImage: naturalHeight,
    naturalWidthImage: naturalWidth
  }
  const [photos, setPhotos] = useState<PhotoType[]>([defaultPhoto])

  const { UploadButton } = useUploadFile({
    typeFile: 'image',
    onUpload: ({ base64 }) => {
      if (!base64) {return}

      const img = new Image()

      img.src = base64

      img.onload = () => {
        const naturalWidth = img.naturalWidth
        const naturalHeight = img.naturalHeight

        const photo = {
          id: nanoid(),
          img: base64,
          originalWidthImage: 0,
          originalHeightImage: 0,
          currentHeightImage: 497,
          currentWidthImage: 490,
          naturalWidthImage: naturalWidth,
          naturalHeightImage: naturalHeight,
          crop: { x: 0, y: 0 },
          zoom: 1,
          minZoom: 1,
          ration: 'original' as RationMode,
        }

        setPhotos(prevState => [...prevState, photo])
      }
    }
  })

  const [currentPhotos, setCurrentPhotos] = useState(0)

  const maxZoom = 10
  const rationOriginal = ratioMode === 'original'
  const ration1to1 = ratioMode === '1:1'
  const ration4to5 = ratioMode === '4:5'
  const ration16to9 = ratioMode === '16:9'

  const ratioOptions = [
    { value: 'original', label: 'Оригинал', icon: 'imageOutline', isActive: rationOriginal },
    { value: '1:1', label: '1:1', icon: 'square', isActive: ration1to1 },
    { value: '4:5', label: '4:5', icon: 'rectangleVertical', isActive: ration4to5 },
    { value: '16:9', label: '16:9', icon: 'rectangleHorizontal', isActive: ration16to9 },
  ] as const

  useEffect(() => {
    if(photos[currentPhotos].originalWidthImage && photos[currentPhotos].originalHeightImage) {
      setCurrentHeightImage(photos[currentPhotos].originalHeightImage)
      setCurrentWidthImage(photos[currentPhotos].originalWidthImage)
    }
    const { width: imageWidth, height: imageHeight } = {
      width: photos[currentPhotos].originalWidthImage,
      height: photos[currentPhotos].originalHeightImage
    }

    const updateCropView = (containerW: number, containerH: number, zoom: number) => {
      setCurrentWidthImage(containerW)
      setCurrentHeightImage(containerH)
      setMinZoom(zoom)
      setZoom(zoom)
    }

    switch (ratioMode) {
      case 'original': {
        setMinZoom(1)
        setZoom(1)
        break
      }
      case '1:1': {
        const containerW = 490
        const containerH = 497
        const zoomBoost = getZoomBoost(imageWidth, imageHeight, containerW, containerH)
        const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth, imageHeight, zoomBoost })

        updateCropView(containerW, containerH, zoom)
        break
      }
      case '4:5': {
        const containerW = 394
        const containerH = 497
        const zoomBoost = getZoomBoost(imageWidth, imageHeight, containerW, containerH)
        const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth, imageHeight, zoomBoost })

        updateCropView(containerW, containerH, zoom)
        break
      }
      case '16:9': {
        const containerW = 490
        const containerH = 276
        const zoomBoost = getZoomBoost(imageWidth, imageHeight, containerW, containerH)
        const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth, imageHeight, zoomBoost })

        updateCropView(containerW, containerH, zoom)
        break
      }
    }
  }, [ratioMode, setCrop, setZoom])

  const saveCroppingHandler = () => {
    const updated = {
      crop: { x: crop.x, y: crop.y },
      zoom,
      minZoom,
      ration: ratioMode,
      currentHeightImage,
      currentWidthImage,
      naturalHeightImage,
      naturalWidthImage,
    }

    Object.assign(photos[currentPhotos], updated)
  }

  const setCurrentPhoto = (index: number) => {
    if (index === currentPhotos) {return}
    setRatioMode(photos[index].ration)
    setCurrentHeightImage(photos[index].currentHeightImage)
    setCurrentWidthImage(photos[index].currentWidthImage)
    setCrop({x: photos[index].crop.x, y: photos[index].crop.y})
    setZoom(photos[index].zoom)
    setMinZoom(photos[index].minZoom)
    setCurrentPhotos(index)
  }

  const removePhoto = (id: string) => {
    if (photos.length === 1) {return}

    let removedIndex = -1

    const updatedPhotos = photos.filter((photo, i) => {
      if (photo.id === id) {
        removedIndex = i

        return false
      }

      return true
    })

    setPhotos(updatedPhotos)

    let newIndex = 0
    
    if (removedIndex > 0) {
      newIndex = removedIndex - 1
    }

    const photo = updatedPhotos[newIndex]

    if (photo) {
      setRatioMode(photo.ration)
      setCurrentHeightImage(photo.currentHeightImage)
      setCurrentWidthImage(photo.currentWidthImage)
      setCrop({ x: photo.crop.x, y: photo.crop.y })
      setZoom(photo.zoom)
      setMinZoom(photo.minZoom)
      setCurrentPhotos(newIndex)

    }
  }

  const onCropComplete = (_: any, croppedAreaPixels: CroppedAreaPixels) => {
    setNaturalWidthImage(croppedAreaPixels.width)
    setNaturalHeightImage(croppedAreaPixels.height)
  }

  return (
      <div className={s.cropping}>
        <div className={s.title}>
          <div className={s.arrowBack}>
            <Icon iconId={'arrowIosBack'} />
          </div>
          <Typography variant={'h1'}>Cropping</Typography>
          <Button className={s.nextBtn} variant={'link'}>
            <Typography variant={'h3'} as={'h3'}>
              Next
            </Typography>
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
                showGrid
                cropSize={{ width: currentWidthImage, height: currentHeightImage }}
                restrictPosition
                onCropChange={setCrop}
                onZoomChange={setZoom}
                style={{
                  cropAreaStyle: { border: 0, boxShadow: 'none' },
                  containerStyle: {
                    margin: 'auto',
                    height: `${currentHeightImage}px`,
                    width: `${currentWidthImage}px`,
                    borderBottomLeftRadius: currentHeightImage < 490 || currentWidthImage < 490 || ration4to5 ? '0' : '10px',
                    borderBottomRightRadius: currentHeightImage < 490 || currentWidthImage < 490 || ration4to5 ? '0' : '10px',
                  },
                }}
                onCropComplete={onCropComplete}
                onMediaLoaded={({ width, height }) => {
                  if(photos[currentPhotos] && photos[currentPhotos].originalWidthImage !== 0 && photos[currentPhotos].originalHeightImage !== 0) {
                    setCurrentHeightImage(photos[currentPhotos].currentHeightImage)
                    setCurrentWidthImage(photos[currentPhotos].currentWidthImage)
                  } else {
                    photos[currentPhotos].originalWidthImage = width
                    photos[currentPhotos].originalHeightImage = height
                    photos[currentPhotos].currentWidthImage = width
                    photos[currentPhotos].currentHeightImage = height
                    setCurrentHeightImage(height)
                    setCurrentWidthImage(width)
                  }

                  if(photos[currentPhotos].zoom !== 1) {
                    setZoom(photos[currentPhotos].zoom)
                  }
                  if(photos[currentPhotos].crop.x !== 0 && photos[currentPhotos].crop.y !== 0) {
                    setCrop({x: photos[currentPhotos].crop.x, y: photos[currentPhotos].crop.y})
                  }
                }}
            />
          </div>
          <div className={s.popoversWrapper}>
            <div className={s.controlsWrapper}>
              <Popover buttonText={<Icon iconId={"expandOutline"} />} opacity={0.8}>
                {ratioOptions.map(({ value, label, icon, isActive }) => (
                    <div
                        key={value}
                        className={clsx(s.aspectRatioWrapper, value === 'original' && s.imageOutline, isActive && s.active)}
                        onClick={() => setRatioMode(value)}
                    >
                      <Typography variant={isActive ? 'h3' : 'regular_text_16'}>{label}</Typography>
                      <Icon iconId={icon} />
                    </div>
                ))}
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
              <Button className={s.saveBtn} variant={'icon'} onClick={saveCroppingHandler}>
                <Icon iconId={'save'} />
              </Button>
              <Popover buttonText={<Icon iconId={'image'} />} opacity={0.8} align={'end'}>
                <div className={s.photoItemsWrapper}>
                  {photos.map((photo, i) => (
                      <PhotoItem key={photo.id} photo={photo} onClick={() => setCurrentPhoto(i)} removePhoto={removePhoto} />
                  ))}
                  <UploadButton className={s.plusBtn} disabled={photos.length >= 10} variant={'icon'}>
                    <Icon iconId={'plusCircleOutline'} width={'30px'} height={'30px'} viewBox={'0 0 30 30'} />
                  </UploadButton>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
  )
}
