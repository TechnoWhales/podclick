'use client'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import { nanoid } from '@reduxjs/toolkit'
import clsx from 'clsx'

import { CroppedAreaPixelsType, ImageType, RationModeType } from '@/features/profile/addPhoto/types/Image'
import { PhotoItem } from '@/features/profile/addPhoto/ui/cropping/photo-item/PhotoItem'
import { calculateZoom } from "@/features/profile/addPhoto/utils/calculateZoom";
import { getCroppedImg } from '@/features/profile/addPhoto/utils/getCroppedImg'
import { getZoomBoost } from "@/features/profile/addPhoto/utils/getZoomBoost";
import { Button, Icon, Popover, Typography } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'


type Props = {
  images: ImageType[]
  backBtn: () => void
  nextBtn: (images: ImageType[]) => void
}

export const Cropping = ({ images, nextBtn, backBtn }: Props) => {
  // Определяет, какая часть изображения будет отображаться в Cropper
  const [crop, setCrop] = useState({ x: 0, y: 0 })

  // Текущие размеры изображения для отображения в окне кропинга
  const [currentHeightImage, setCurrentHeightImage] = useState(497)
  const [currentWidthImage, setCurrentWidthImage] = useState(490)
  // Параметры для корректного кропинга
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixelsType>({
    height: 0, width: 0, x: 0, y: 0
})

  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)

  // Текущий режим соотношения сторон изображения ('original', '1:1', '4:5', '16:9'), влияет на область обрезки и зум
  const [ratioMode, setRatioMode] = useState<RationModeType>('original')
  const [localImages, setLocalImage] = useState<ImageType[]>(images)
  const [currentImage, setCurrentImage] = useState(0)
  const { UploadButton } = useUploadFile({
    typeFile: 'image',
    onUpload: ({ base64 }) => {
      if (!base64) {return}

      const photo = {
        id: nanoid(),
        img: base64,
        croppedImg: null,
        filteredImg: null,
        originalWidthImage: 0,
        originalHeightImage: 0,
        currentHeightImage: 497,
        currentWidthImage: 490,
        crop: { x: 0, y: 0 },
        croppedAreaPixels: {height: 0, width: 0, x: 0, y: 0},
        zoom: 1,
        minZoom: 1,
        ration: 'original' as RationModeType,
      }

      setLocalImage(prevState => [...prevState, photo])
    }
  })

  const maxZoom = 10
  const rationOriginal = ratioMode === 'original'
  const ration1to1 = ratioMode === '1:1'
  const ration4to5 = ratioMode === '4:5'
  const ration16to9 = ratioMode === '16:9'

  useEffect(() => {
    // Если у текущего изображения есть оригинальная ширина и высота,
    // устанавливаем эти значения в состояние текущих размеров.
    if(localImages[currentImage].originalWidthImage && localImages[currentImage].originalHeightImage) {
      setCurrentHeightImage(localImages[currentImage].originalHeightImage)
      setCurrentWidthImage(localImages[currentImage].originalWidthImage)
    }

    const { width: imageWidth, height: imageHeight } = {
      width: localImages[currentImage].originalWidthImage,
      height: localImages[currentImage].originalHeightImage
    }

    // Функция обновления размеров контейнера для обрезки и уровней зума.
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
      croppedAreaPixels,
    }

    Object.assign(localImages[currentImage], updated)
  }

  const setCurrentPhotoHandler = (index: number) => {
    if (index === currentImage) {return}
    setRatioMode(localImages[index].ration)
    setCurrentHeightImage(localImages[index].currentHeightImage)
    setCurrentWidthImage(localImages[index].currentWidthImage)
    setCrop({x: localImages[index].crop.x, y: localImages[index].crop.y})
    setZoom(localImages[index].zoom)
    setMinZoom(localImages[index].minZoom)
    setCurrentImage(index)
  }

  const removePhotoHandler = (id: string) => {
    if (localImages.length === 1) {return}

    let removedIndex = -1

    const updatedPhotos = localImages.filter((photo, i) => {
      if (photo.id === id) {
        removedIndex = i

        return false
      }

      return true
    })

    setLocalImage(updatedPhotos)

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
      setCurrentImage(newIndex)
    }
  }

  const onCropComplete = (_: any, croppedAreaPixels: CroppedAreaPixelsType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const nextBtnHandler = async () => {
    if (localImages.length === 0) {return}

    const croppedImages = await Promise.all(
      localImages.map(async item => {
        if(item.croppedAreaPixels.width === 0 || item.croppedAreaPixels.height === 0) {
          return {...item, croppedImg: item.img}
        }

        const croppedImg = await getCroppedImg(item.img, item.croppedAreaPixels)

        return {
          ...item,
          croppedImg
        }
      })
    )

    nextBtn(croppedImages)
  }

  const ratioOptions = [
    { value: 'original', label: 'Оригинал', icon: 'imageOutline', isActive: rationOriginal },
    { value: '1:1', label: '1:1', icon: 'square', isActive: ration1to1 },
    { value: '4:5', label: '4:5', icon: 'rectangleVertical', isActive: ration4to5 },
    { value: '16:9', label: '16:9', icon: 'rectangleHorizontal', isActive: ration16to9 },
  ] as const

  return (
      <div className={s.cropping}>
        <div className={s.title}>
          <div className={s.arrowBack} onClick={backBtn}>
            <Icon iconId={'arrowIosBack'} />
          </div>
          <Typography variant={'h1'}>Cropping</Typography>
          <Button className={s.nextBtn} variant={'link'} onClick={nextBtnHandler}>
            <Typography variant={'h3'} as={'h3'}>
              Next
            </Typography>
          </Button>
        </div>
        <div className={clsx(s.container)}>
          <div className={s.cropWrapper}>
            <Cropper
                image={localImages[currentImage]?.img || localImages[0].img}
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
                  if(localImages[currentImage] && localImages[currentImage].originalWidthImage !== 0 && localImages[currentImage].originalHeightImage !== 0) {
                    setCurrentHeightImage(localImages[currentImage].currentHeightImage)
                    setCurrentWidthImage(localImages[currentImage].currentWidthImage)
                  } else {
                    localImages[currentImage].originalWidthImage = width
                    localImages[currentImage].originalHeightImage = height
                    localImages[currentImage].currentWidthImage = width
                    localImages[currentImage].currentHeightImage = height
                    setCurrentHeightImage(height)
                    setCurrentWidthImage(width)
                  }

                  if(localImages[currentImage].zoom !== 1) {
                    setZoom(localImages[currentImage].zoom)
                  }

                  if(localImages[currentImage].crop.x !== 0 && localImages[currentImage].crop.y !== 0) {
                    setCrop({x: localImages[currentImage].crop.x, y: localImages[currentImage].crop.y})
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
                  <UploadButton className={clsx(s.plusBtn, localImages.length >= 10 && s.disabled)} disabled={localImages.length >= 10} variant={'icon'}>
                    <Icon iconId={'plusCircleOutline'} width={'30px'} height={'30px'} viewBox={'0 0 30 30'} />
                  </UploadButton>
                  {localImages.map((photo, i) => (
                      <PhotoItem key={photo.id} photo={photo} onClick={() => setCurrentPhotoHandler(i)} removePhoto={removePhotoHandler} />
                  ))}
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
  )
}
