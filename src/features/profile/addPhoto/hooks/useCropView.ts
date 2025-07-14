import { useEffect } from 'react'

import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { calculateZoom } from '@/features/profile/addPhoto/utils/calculateZoom'
import { getZoomBoost } from '@/features/profile/addPhoto/utils/getZoomBoost'

type UseCropViewProps = {
  ratioMode: 'original' | '1:1' | '4:5' | '16:9'
  currentImage: number
  localImages: ImageType[]
  setCurrentWidthImage: (value: number) => void
  setCurrentHeightImage: (value: number) => void
  setZoom: (value: number) => void
  setCrop: (value: { x: number, y: number }) => void
  setMinZoom: (value: number) => void
}

export const useCropView = (
  { ratioMode, currentImage, localImages,
    setCurrentWidthImage, setCurrentHeightImage, setZoom,
    setMinZoom, setCrop
  }: UseCropViewProps) => {
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
}
