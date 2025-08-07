type PixelCrop = {
  x: number
  y: number
  width: number
  height: number
}

export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.src = imageSrc
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      const canvas = document.createElement('canvas')

      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Не удалось получить контекст canvas'))

        return
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      const base64 = canvas.toDataURL('image/jpeg')

      resolve(base64)
    }

    image.onerror = () => {
      reject(new Error('Не удалось загрузить изображение'))
    }
  })
}
