type FitResult = {
  width: number
  height: number
  scale: number
}

export function fitImageToContainer(
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number
): FitResult {
  const widthScale = containerWidth / imageWidth
  const heightScale = containerHeight / imageHeight
  const scale = Math.min(widthScale, heightScale)

  return {
    width: imageWidth * scale,
    height: imageHeight * scale,
    scale
  }
}
