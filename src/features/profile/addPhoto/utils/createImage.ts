import { nanoid } from '@reduxjs/toolkit'

import { ImageType } from '@/features/profile/addPhoto/types/Image'

type Props = {
  img: string
  naturalWidthImage?: number
  naturalHeightImage?: number
}

export const createImage = ({ img, naturalHeightImage = 0, naturalWidthImage = 0 }: Props): ImageType => {
  return {
    id: nanoid(),
    img,
    croppedImg: null,
    filteredImg: null,
    currentFilter: null,
    currentHeightImage: 497,
    currentWidthImage: 490,
    naturalWidthImage,
    naturalHeightImage,
    crop: { x: 0, y: 0 },
    ration: 'original',
    zoom: 1,
    minZoom: 1,
    originalWidthImage: 0,
    originalHeightImage: 0,
    croppedAreaPixels: { height: 0, width: 0, x: 0, y: 0 },
  }
}