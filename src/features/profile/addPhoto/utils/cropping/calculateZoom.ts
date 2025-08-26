type Props = {
  containerWidth: number
  containerHeight: number
  imageWidth: number
  imageHeight: number
  zoomBoost?: number
}

export function calculateZoom({
  containerWidth,
  containerHeight,
  imageWidth,
  imageHeight,
  zoomBoost = 1,
}: Props) {
  const zoomW = containerWidth / imageWidth
  const zoomH = containerHeight / imageHeight

  return Math.max(zoomW, zoomH) * zoomBoost
}
