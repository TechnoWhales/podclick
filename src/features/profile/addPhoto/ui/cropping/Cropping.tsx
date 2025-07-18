'use client'
import { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

import clsx from 'clsx'

import {
  CroppedAreaPixelsType,
  ImageType,
  RatioType,
} from '@/features/profile/addPhoto/types/Image'
import { PhotoItem } from '@/features/profile/addPhoto/ui/cropping/photo-item/PhotoItem'
import { TitlePhotoPages } from '@/features/profile/addPhoto/ui/title/Title'
import { createImage } from '@/features/profile/addPhoto/utils/createImage'
import { fitImageToContainerOrRatio } from '@/features/profile/addPhoto/utils/fitImageToContainerOrRatio'
import { getCroppedImg } from '@/features/profile/addPhoto/utils/getCroppedImg'
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
  const [isFirstLoading, setIsFistLoading] = useState(true)

  // Текущие размеры изображения для отображения в окне кропинга
  const [currentHeightImage, setCurrentHeightImage] = useState(490)
  const [currentWidthImage, setCurrentWidthImage] = useState(490)
  // Параметры для корректного кропинга
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixelsType>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)

  // Текущий режим соотношения сторон изображения ('original', '1:1', '4:5', '16:9'), влияет на область обрезки и зум
  const [currentRatio, setCurrentRatio] = useState<RatioType>('original')
  const [localImages, setLocalImage] = useState<ImageType[]>(images)
  const [currentImage, setCurrentImage] = useState(0)

  const { UploadButton } = useUploadFile({
    typeFile: 'pngjpeg',
    onUpload: ({ base64: img, file }) => {
      if (!img) {
        return
      }
      debugger
      const imageEl = new Image()

      imageEl.src = img

      imageEl.onload = () => {
        const naturalWidthImage = imageEl.naturalWidth
        const naturalHeightImage = imageEl.naturalHeight
        const image = createImage({ img, naturalWidthImage, naturalHeightImage })

        setLocalImage(prevState => [...prevState, image])
      }
    },
  })

  const maxZoom = 10
  const rationOriginal = currentRatio === 'original'
  const ration1to1 = currentRatio === '1:1'
  const ration4to5 = currentRatio === '4:5'
  const ration16to9 = currentRatio === '16:9'

  useEffect(() => {
    if (
      isFirstLoading &&
      localImages[currentImage].currentWidthImage !== 0 &&
      localImages[currentImage].currentHeightImage !== 0
    ) {
      setIsFistLoading(false)
      setCurrentHeightImage(localImages[currentImage].currentHeightImage)
      setCurrentWidthImage(localImages[currentImage].currentWidthImage)
      setZoom(localImages[currentImage].zoom)
      setMinZoom(localImages[currentImage].minZoom)
      setCrop({
        x: localImages[currentImage].crop.x,
        y: localImages[currentImage].crop.y,
      })

      return
    }
    const { currentWidthImage, currentHeightImage, zoom } = fitImageToContainerOrRatio({
      currentRatio,
      image: localImages[currentImage],
    })

    setCurrentHeightImage(currentHeightImage)
    setCurrentWidthImage(currentWidthImage)
    setZoom(zoom)
    setMinZoom(zoom)
  }, [currentRatio, currentImage])

  const saveCroppingHandler = () => {
    const updated = {
      crop: { x: crop.x, y: crop.y },
      zoom,
      minZoom,
      ratio: currentRatio,
      currentHeightImage,
      currentWidthImage,
      croppedAreaPixels,
    }

    const updatedImages = localImages.map((item, i) => {
      if (i === currentImage) {
        return {
          ...item,
          ...updated,
        }
      }

      return item
    })

    setLocalImage(updatedImages)
  }

  const setCurrentImageHandler = (id: string) => {
    const index = localImages.findIndex(item => item.id === id)

    if (index === -1) {
      return
    }

    setCurrentImage(index)
    setCurrentRatio(localImages[index].ratio)
    setZoom(localImages[index].zoom)
    setMinZoom(localImages[index].minZoom)
    setIsFistLoading(true)
  }
  const removeImageHandler = (id: string) => {
    const index = localImages.findIndex(item => item.id === id)

    if (index === -1 || index === 0) {
      return
    }

    const filteredImages = localImages.filter((_, i) => i !== index)

    const currentIndex = index - 1

    setLocalImage(filteredImages)
    setCurrentImage(currentIndex)
    setCurrentRatio(localImages[currentIndex].ratio)
    setCrop({
      x: localImages[currentIndex].crop.x,
      y: localImages[currentIndex].crop.y,
    })
  }

  const onCropComplete = (_: any, croppedAreaPixels: CroppedAreaPixelsType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const nextBtnHandler = async () => {
    if (localImages.length === 0) {
      return
    }

    const croppedImages = await Promise.all(
      localImages.map(async item => {
        if (!item.currentHeightImage && !item.currentWidthImage) {
          const { currentWidthImage, currentHeightImage } = fitImageToContainerOrRatio({
            currentRatio: item.ratio,
            image: item,
          })

          item.currentHeightImage = currentHeightImage
          item.currentWidthImage = currentWidthImage
        }
        if (item.croppedAreaPixels.width === 0 || item.croppedAreaPixels.height === 0) {
          return { ...item, croppedImg: item.img }
        }

        const croppedImg = await getCroppedImg(item.img, item.croppedAreaPixels)

        return {
          ...item,
          croppedImg,
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
      {
        <TitlePhotoPages nextBtn={nextBtnHandler} backBtn={backBtn}>
          Cropping
        </TitlePhotoPages>
      }
      <div className={clsx(s.container)}>
        <div className={s.cropWrapper}>
          <Cropper
            image={localImages[currentImage].img}
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
                borderBottomLeftRadius:
                  currentHeightImage < 490 || currentWidthImage < 490 || ration4to5 ? '0' : '10px',
                borderBottomRightRadius:
                  currentHeightImage < 490 || currentWidthImage < 490 || ration4to5 ? '0' : '10px',
              },
            }}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className={s.popoversWrapper}>
          <div className={s.controlsWrapper}>
            <Popover buttonText={<Icon iconId={'expandOutline'} />} opacity={0.8}>
              {ratioOptions.map(({ value, label, icon, isActive }) => (
                <div
                  key={value}
                  className={clsx(
                    s.aspectRatioWrapper,
                    value === 'original' && s.imageOutline,
                    isActive && s.active
                  )}
                  onClick={() => setCurrentRatio(value)}
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
                <UploadButton
                  className={clsx(s.plusBtn, localImages.length >= 10 && s.disabled)}
                  disabled={localImages.length >= 10}
                  variant={'icon'}
                >
                  <Icon
                    iconId={'plusCircleOutline'}
                    width={'30px'}
                    height={'30px'}
                    viewBox={'0 0 30 30'}
                  />
                </UploadButton>
                {localImages.map((photo, i) => (
                  <PhotoItem
                    key={photo.id}
                    photo={photo}
                    onClick={() => setCurrentImageHandler(photo.id)}
                    removePhoto={removeImageHandler}
                  />
                ))}
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
