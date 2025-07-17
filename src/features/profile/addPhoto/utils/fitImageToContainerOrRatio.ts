import { ImageType, RatioType } from '@/features/profile/addPhoto/types/Image'
import { calculateZoom } from '@/features/profile/addPhoto/utils/calculateZoom'
import { getZoomBoost } from '@/features/profile/addPhoto/utils/getZoomBoost'

type Props = {
  image: ImageType
  currentRatio: RatioType
}

const maxSize = 490

export const fitImageToContainerOrRatio = ({ image, currentRatio }: Props) => {
  const naturalWidth = image.naturalWidthImage
  const naturalHeight = image.naturalHeightImage
  let zoom: number = 1;

  const widthRatio = maxSize / naturalWidth
  const heightRatio = maxSize / naturalHeight
  const scaleFactor = Math.min(widthRatio, heightRatio)

  const currentWidthImage = Math.round(naturalWidth * scaleFactor)
  const currentHeightImage = Math.round(naturalHeight * scaleFactor)

  if (naturalWidth < maxSize && naturalHeight < maxSize) {
      zoom = scaleFactor
  }

  if (currentRatio === 'original') {
    return { currentWidthImage, currentHeightImage, zoom }
  } else if (currentRatio === '1:1') {
    const containerW = 490
    const containerH = 490
    const zoomBoost = getZoomBoost(currentWidthImage, currentHeightImage, containerW, containerH)
    const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: currentWidthImage, imageHeight: currentHeightImage, zoomBoost })

    if (naturalWidth < maxSize && naturalHeight < maxSize) {
      const zoomBoost = getZoomBoost(naturalWidth, naturalHeight, containerW, containerH)
      const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: naturalWidth, imageHeight: naturalHeight, zoomBoost })

      return { currentWidthImage: containerW, currentHeightImage: containerH, zoom: zoom }
    }

    return { currentWidthImage: containerW, currentHeightImage: containerH, zoom }

  } else if (currentRatio === '4:5') {
    const containerW = 394
    const containerH = 490
    const zoomBoost = getZoomBoost(currentWidthImage, currentHeightImage, containerW, containerH)
    const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: currentWidthImage, imageHeight: currentHeightImage, zoomBoost })

    if (naturalWidth < maxSize && naturalHeight < maxSize) {
      const zoomBoost = getZoomBoost(naturalWidth, naturalHeight, containerW, containerH)
      const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: naturalWidth, imageHeight: naturalHeight, zoomBoost })

      return { currentWidthImage: containerW, currentHeightImage: containerH, zoom: zoom }
    }

    return { currentWidthImage: containerW, currentHeightImage: containerH, zoom }

  } else if (currentRatio === '16:9') {
    const containerW = 490
    const containerH = 276
    const zoomBoost = getZoomBoost(currentWidthImage, currentHeightImage, containerW, containerH)
    const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: currentWidthImage, imageHeight: currentHeightImage, zoomBoost })

    if (naturalWidth < maxSize && naturalHeight < maxSize) {
      const zoomBoost = getZoomBoost(naturalWidth, naturalHeight, containerW, containerH)
      const zoom = calculateZoom({ containerWidth: containerW, containerHeight: containerH, imageWidth: naturalWidth, imageHeight: naturalHeight, zoomBoost })

      return { currentWidthImage: containerW, currentHeightImage: containerH, zoom: zoom }
    }

    return { currentWidthImage: containerW, currentHeightImage: containerH, zoom }
  }

  return { currentWidthImage, currentHeightImage, zoom }
}