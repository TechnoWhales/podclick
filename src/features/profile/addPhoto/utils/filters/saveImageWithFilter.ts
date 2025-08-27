export async function saveImageWithFilter(
  image: HTMLImageElement | string,
  filter: string
): Promise<string> {
  const img =
    typeof image === 'string'
      ? await new Promise<HTMLImageElement>((resolve, reject) => {
          const i = new Image()

          i.crossOrigin = 'anonymous'
          i.src = image
          i.onload = () => resolve(i)
          i.onerror = reject
        })
      : image

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas context unavailable')
  }

  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  ctx.filter = filter
  ctx.drawImage(img, 0, 0)

  return canvas.toDataURL()
}
