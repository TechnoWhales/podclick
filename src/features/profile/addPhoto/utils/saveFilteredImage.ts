export async function applyCssFilterToImage(
  image: HTMLImageElement,
  filters: string,
  output: 'base64' | 'file' = 'file',
  fileName = 'filtered-image.png'
): Promise<string | File> {
  return new Promise((resolve, reject) => {

    if (!image.complete) {
      image.onload = () => process()
      image.onerror = reject
    } else {
      process()
    }

    function process() {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {return reject(new Error('Canvas context not available'))}

        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        ctx.filter = filters
        ctx.drawImage(image, 0, 0)

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
