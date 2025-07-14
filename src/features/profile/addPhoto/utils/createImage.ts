import { nanoid } from '@reduxjs/toolkit'

import { ImageType } from '@/features/profile/addPhoto/types/Image'

export const createImage = (img: string): ImageType => {
  return {
    id: nanoid(),
    img,
    croppedImg: null,
    filteredImg: null,
    currentFilter: null,
    currentHeightImage: 0,
    currentWidthImage: 0,
    crop: { x: 0, y: 0 },
    ration: 'original',
    zoom: 1,
    minZoom: 1,
    originalWidthImage: 0,
    originalHeightImage: 0,
    croppedAreaPixels: { height: 0, width: 0, x: 0, y: 0 },
  }
};