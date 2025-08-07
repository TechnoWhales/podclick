export function getZoomBoost(
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number
): number {
  const imageRatio = imageWidth / imageHeight
  const containerRatio = containerWidth / containerHeight
  const ratioDifference = containerRatio / imageRatio

  if (ratioDifference > 2.5) {return 3.5}
  if (ratioDifference > 2) {return 3}
  if (ratioDifference > 1.8) {return 2.5}
  if (ratioDifference > 1.5) {return 2}
  if (ratioDifference > 1.2) {return 1.6}
  if (ratioDifference > 1.05) {return 1.35}

  return 1.25
}
