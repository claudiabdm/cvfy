import type { CvEvent } from '~/types/cvfy'

export function orderEvents(arr: CvEvent[]): CvEvent[] {
  return [...arr].sort(
    (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime(),
  )
}

export function resizeImageFromReader(readerResult: string) {
  const img = new Image()
  img.src = readerResult
  return new Promise<string>(resolve =>
    img.addEventListener(
      'load',
      () => {
        const resizedImage = resizeImage(img)
        resolve(resizedImage)
      },
      { once: true },
    ),
  )
}

function resizeImage(imgToResize: HTMLImageElement, resizingFactor = 0.25) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const originalWidth = imgToResize.width
  const originalHeight = imgToResize.height

  const canvasWidth = originalWidth * resizingFactor
  const canvasHeight = originalHeight * resizingFactor

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  if (context)
    context.drawImage(imgToResize, 0, 0, canvasWidth, canvasHeight)

  return canvas.toDataURL()
}
