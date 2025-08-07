export async function applyCssFilterToImage(
  image: HTMLImageElement | string,
  filters: string,
  output: 'base64' | 'file' = 'base64',
  fileName = 'filtered-image.png'
): Promise<string | File> {
  const imgElement = await resolveImage(image)

  return new Promise((resolve, reject) => {
    if (!imgElement.complete) {
      imgElement.onload = () => process()
      imgElement.onerror = reject
    } else {
      process()
    }

    function process() {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {return reject(new Error('Canvas context not available'))}

        canvas.width = imgElement.naturalWidth
        canvas.height = imgElement.naturalHeight

        ctx.filter = filters
        ctx.drawImage(imgElement, 0, 0)

        if (output === 'base64') {
          const base64 = canvas.toDataURL('image/png')
          
          resolve(base64)
        } else {
          canvas.toBlob(blob => {
            
            if (!blob) {return reject(new Error('Failed to convert to Blob'))}
            const file = new File([blob], fileName, { type: 'image/png' })

            resolve(file)
          }, 'image/png')
        }
      } catch (err) {
        reject(err)
      }
    }
  })
}

function resolveImage(image: HTMLImageElement | string): Promise<HTMLImageElement> {
  if (typeof image !== 'string') {return Promise.resolve(image)}

  return new Promise((resolve, reject) => {
    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.src = image
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}
