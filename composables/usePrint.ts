import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import blobStream from 'blob-stream/.js'
import { useCvState } from '~/data/useCvState'
import type { Cv } from '~/types/cvfy'

export default function usePrint() {
  const { formSettings } = useCvState()
  const i18n = useI18n()
  const docTitle = ref<string>()
  const helveticaLight = ref<ArrayBuffer>()

  onMounted(async () => {
    // const printMargin = cssPagedMedia('margin')
    docTitle.value = document.title

    const font = await fetch('fonts/Helvetica-Light.ttf')
    helveticaLight.value = await font.arrayBuffer()

    // addEventListener('beforeprint', () => {
    //   formSettings.value.layout === 'one-column' ? printMargin('0.45in') : printMargin('0in')
    // })

    // addEventListener('afterprint', () => {
    //   if (typeof docTitle.value === 'string')
    //     document.title = docTitle.value
    // })

    addEventListener('keydown', (e) => {
      if (e.metaKey && e.key === 'p') {
        e.preventDefault()
        downloadPdf()
      }
    })
  })

  // function cssPagedMedia(property: string) {
  //   const style = document.createElement('style')
  //   document.head.appendChild(style)
  //   return function (value: string) {
  //     style.innerHTML = `@page {${property}: ${value}}`
  //   }
  // }

  function downloadPdf(): void {
    // changeDocTitle()
    const doc = generatePDF()

    // pipe the document to a blob
    const stream = doc.pipe(blobStream())

    // add your content to the document here, as usual

    // get a blob when you're done
    doc.end()
    stream.on('finish', () => {
      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/pdf')

      // or get a blob URL for display in the browser
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = document.title
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }

  // function changeDocTitle() {
  //   document.title = `CV_${formSettings.value.name}_${formSettings.value.lastName}_${i18n.locale.value}`
  // }

  function generatePDF() {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 32,
        right: 32,
        bottom: 32,
        left: 28,
      },
    })

    const elemRectInPDF = initRectInPDF(doc)

    doc
      .rect(0, 0, doc.page.width * 0.33, doc.page.height)
      .fill('#f8fafc')

    // Image
    if (formSettings.value.profileImageDataUri) {
      const strokeWidth = 6
      const [profileImgX, profileImgY, profileImgWidth] = elemRectInPDF('profileImg')
      doc
        .save()
        .rect(profileImgX, profileImgY, profileImgWidth, profileImgWidth)
        .clip()
        .image(formSettings.value.profileImageDataUri, profileImgX, profileImgY, {
          cover: [profileImgWidth, profileImgWidth],
          align: 'center',
        })
        .restore()
        .rect(profileImgX + (strokeWidth / 2), profileImgY, profileImgWidth, profileImgWidth)
        .lineWidth(strokeWidth)
        .stroke('#fff')
    }

    // Name
    const [nameX, nameY] = elemRectInPDF('name')
    doc
      .fillColor(formSettings.value.activeColor)
      .font('Helvetica-Bold')
      .fontSize((3 / 4) * 20)
      .lineGap(1.5)
      .text(`${formSettings.value.name.toLocaleUpperCase()} ${formSettings.value.lastName.toLocaleUpperCase()}`, nameX, nameY)

    // Title
    addTitle(doc, { text: formSettings.value.jobTitle, rect: elemRectInPDF('jobTitle') })

    // Contact
    if (formSettings.value.layout === 'two-column')
      addTitle(doc, { text: i18n.t('contact'), rect: elemRectInPDF('contact') })
    const contactInfo = [{ info: 'email', prelink: 'mailto:' }, { info: 'phoneNumber', prelink: 'tel:' }, { info: 'location', prelink: undefined }] as const
    for (const { info, prelink } of contactInfo) {
      const [infoX, infoY, infoWidth] = elemRectInPDF(info)
      if (helveticaLight.value) {
        doc
          .fillColor('#1e293b')
          .font(helveticaLight.value)
          .fontSize((3 / 4) * 13)
          .lineGap(1.5)
          .text(formSettings.value[info], infoX, infoY, { width: infoWidth, link: `${prelink ?? ''}${formSettings.value[info]}` })
      }
    }

    // Technical Skills
    // Soft Skills
    // Languages
    // Interests
    // Social

    return doc
  }

  return {
    downloadPdf,
  }
}

function initRectInPDF(doc: PDFKit.PDFDocument) {
  const docWidthPt = doc.page.width
  const docHeightPt = doc.page.height

  const cvPreview = document.getElementById('cvPreview')
  const { left, top, width, height } = cvPreview!.getBoundingClientRect()
  const docWidthPx = width
  const docHeightPx = height

  const wRatioPtPx = docWidthPt / docWidthPx
  const hRatioPtPx = docHeightPt / docHeightPx

  return function elemRectInPDF(id: string): [x: number, y: number, width: number, height: number] {
    const elem = cvPreview?.querySelector(`[data-cv-elem="${id}"]`)
    const elemRect = elem?.getBoundingClientRect()
    const [elemX, elemWidth] = [(elemRect?.left ?? 0) - left, elemRect?.width].map(n => (n ?? 0) * wRatioPtPx)
    const [elemY, elemHeight] = [(elemRect?.top ?? 0) - top, elemRect?.height].map(n => (n ?? 0) * hRatioPtPx)

    return [elemX, elemY, elemWidth, elemHeight]
  }
}

function addTitle(doc: PDFKit.PDFDocument, { text, rect, color = '#1e293b' }: { text: string, rect: [x: number, y: number, width: number, height: number], color?: string }) {
  return doc
    .fillColor(color)
    .font('Helvetica-Bold')
    .fontSize((3 / 4) * 15)
    .lineGap(1.5)
    .text(text.toLocaleUpperCase(), rect[0], rect[1], { width: rect[2] })
}
