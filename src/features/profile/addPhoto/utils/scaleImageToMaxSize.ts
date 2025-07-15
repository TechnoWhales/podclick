export const scaleImageToMaxSize = (origWidth: number, origHeight: number, minSideSize = 497) => {
  const isWidthLarger = origWidth >= origHeight

  const scale = minSideSize / (isWidthLarger ? origWidth : origHeight)
  const scaledWidth = Math.round(origWidth * scale)
  const scaledHeight = Math.round(origHeight * scale)

  const zoomX = scaledWidth / origWidth
  const zoomY = scaledHeight / origHeight

  const zoom = zoomX

  return {
    width: scaledWidth,
    height: scaledHeight,
    zoom,
  }
};