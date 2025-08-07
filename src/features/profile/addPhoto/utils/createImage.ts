import { nanoid } from '@reduxjs/toolkit'

import { ImageType } from '@/features/profile/addPhoto/types/Image'

type Props = {
  img: string
  naturalWidthImage?: number
  naturalHeightImage?: number
}

export const createImage = ({
  img,
  naturalHeightImage = 0,
  naturalWidthImage = 0,
}: Props): ImageType => {
  return {
    id: nanoid(),
    img,
    croppedImg: img,
    filteredImg: img,
    currentFilter: { filter: 'normal', name: 'Normal', value: '' },
    currentHeightImage: 0,
    currentWidthImage: 0,
    naturalWidthImage,
    naturalHeightImage,
    crop: { x: 0, y: 0 },
    ratio: '1:1',
    zoom: 1,
    minZoom: 1,
    croppedAreaPixels: { height: 0, width: 0, x: 0, y: 0 },
  }
}
