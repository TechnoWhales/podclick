export type CroppedAreaPixelsType = {
  height: number
  width: number
  x: number
  y: number
}

export type RationModeType = '1:1' | '4:5' | '16:9' | 'original'

export type ImageType = {
  id: string
  img: string
  originalWidthImage: number
  originalHeightImage: number
  currentHeightImage: number
  currentWidthImage: number
  naturalHeightImage: number
  naturalWidthImage: number
  crop: { x: number, y: number }
  croppedAreaPixels: CroppedAreaPixelsType
  zoom: number
  minZoom: number
  ration: RationModeType
}