import { ImageType, RatioType } from '@/features/profile/addPhoto/types/Image'
import { calculateZoom } from '@/features/profile/addPhoto/utils/calculateZoom'
import { getZoomBoost } from '@/features/profile/addPhoto/utils/getZoomBoost'

type Props = {
  images: ImageType[]
  currentRatio: RatioType
  currentImage: number
}

const maxSize = 490

export const fitImageToContainerOrRatio = ({ images, currentRatio, currentImage }: Props) => {
  const originalWidth = images[currentImage].naturalWidthImage
  const originalHeight = images[currentImage].naturalHeightImage
  let zoom: number = 1;

  const widthRatio = maxSize / originalWidth
  const heightRatio = maxSize / originalHeight
  const scaleFactor = Math.min(widthRatio, heightRatio)

  const currentWidthImage = Math.round(originalWidth * scaleFactor)
  const currentHeightImage = Math.round(originalHeight * scaleFactor)

  if (originalWidth < maxSize && originalHeight < maxSize) {
      zoom = scaleFactor
  }

  if (currentRatio === 'original') {
    return { currentWidthImage, currentHeightImage, zoom }
  } else if (currentRatio === '1:1') {
    const containerW = 490
    const containerH = 490
    const zoomBoost = getZoomBoost(currentWidthImage, currentHeightImage, containerW, containerH)
    const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: currentWidthImage, imageHeight: currentHeightImage, zoomBoost })

    if (originalWidth < maxSize && originalHeight < maxSize) {
      const zoomBoost = getZoomBoost(originalWidth, originalHeight, containerW, containerH)
      const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: originalWidth, imageHeight: originalHeight, zoomBoost })

      return { currentWidthImage: containerW, currentHeightImage: containerH, zoom: zoom }
    }

    return { currentWidthImage: containerW, currentHeightImage: containerH, zoom }

  } else if (currentRatio === '4:5') {
    const containerW = 394
    const containerH = 490
    const zoomBoost = getZoomBoost(currentWidthImage, currentHeightImage, containerW, containerH)
    const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: currentWidthImage, imageHeight: currentHeightImage, zoomBoost })

    if (originalWidth < maxSize && originalHeight < maxSize) {
      const zoomBoost = getZoomBoost(originalWidth, originalHeight, containerW, containerH)
      const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: originalWidth, imageHeight: originalHeight, zoomBoost })

      return { currentWidthImage: containerW, currentHeightImage: containerH, zoom: zoom }
    }

    return { currentWidthImage: containerW, currentHeightImage: containerH, zoom }

  } else if (currentRatio === '16:9') {
    const containerW = 490
    const containerH = 276
    const zoomBoost = getZoomBoost(currentWidthImage, currentHeightImage, containerW, containerH)
    const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: currentWidthImage, imageHeight: currentHeightImage, zoomBoost })

    if (originalWidth < maxSize && originalHeight < maxSize) {
      const zoomBoost = getZoomBoost(originalWidth, originalHeight, containerW, containerH)
      const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: originalWidth, imageHeight: originalHeight, zoomBoost })

      return { currentWidthImage: containerW, currentHeightImage: containerH, zoom: zoom }
    }

    return { currentWidthImage: containerW, currentHeightImage: containerH, zoom }
  }

  return { currentWidthImage, currentHeightImage, zoom }


}