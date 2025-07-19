export type CroppedAreaPixelsType = {
  height: number
  width: number
  x: number
  y: number
}

export type RatioType = '1:1' | '4:5' | '16:9' | 'original'

export type Mode = 'initialImg' | 'cropping' | 'filter' | 'publication'

export type ImageType = {
  id: string
  img: string
  croppedImg: string | null
  filteredImg: string | null
  currentFilter: FiltersType | null
  currentHeightImage: number
  currentWidthImage: number
  naturalWidthImage: number
  naturalHeightImage: number
  crop: { x: number; y: number }
  croppedAreaPixels: CroppedAreaPixelsType
  zoom: number
  minZoom: number
  ratio: RatioType
}

export type FiltersType =
  | { filter: 'normal'; name: 'Normal'; value: null }
  | {
      filter: 'clarendon'
      name: 'Clarendon'
      value: 'contrast(1.2) saturate(1.35) brightness(1.1) hue-rotate(-10deg)'
    }
  | { filter: 'lark'; name: 'Lark'; value: 'saturate(1.5) brightness(1.15) contrast(1.1)' }
  | {
      filter: 'gingham'
      name: 'Gingham'
      value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)'
    }
  | { filter: 'moon'; name: 'Moon'; value: 'grayscale(1) brightness(1.2) contrast(1.1)' }

export type ImageDB = {
  images: {
    key: string
    value: ImageType[]
  }
}
