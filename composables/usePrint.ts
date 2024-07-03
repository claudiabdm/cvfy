import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import blobStream from 'blob-stream/.js'
import SVGtoPDF from 'svg-to-pdfkit'
import { useCvState } from '~/data/useCvState'
import { IconsPDF, type SectionName } from '~/types/cvfy'

const ICONS: Partial<Record<typeof IconsPDF[number]['name'], string>> = {}

for (const i of IconsPDF) {
  const icon = (await import(`~/assets/icons/PDF/${i.icon}.svg?raw`)).default
  if (typeof icon === 'string')
    ICONS[i.name] = icon
}

const PX_TO_PT_RATIO = 3 / 4
const LINE_GAP = 5

type ListWithIcons = Array<{ name: typeof IconsPDF[number]['name'], text: string, link?: string }>

export default function usePrint() {
  const { formSettings } = useCvState()
  const i18n = useI18n()
  const docTitle = ref<string>()
  const formatDate = useFormatDate()
  const helveticaLight = ref<ArrayBuffer>()

  onMounted(async () => {
    // const printMargin = cssPagedMedia('margin')
    docTitle.value = document.title

    const font = await fetch('/fonts/Helvetica-Light.ttf')
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

    if (doc) {
      const stream = doc.pipe(blobStream())

      doc.end()
      stream.on('finish', () => {
        const blob = stream.toBlob('application/pdf')
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = document.title
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    }
  }

  // function changeDocTitle() {
  //   document.title = `CV_${formSettings.value.name}_${formSettings.value.lastName}_${i18n.locale.value}`
  // }

  function generatePDF() {
    if (!helveticaLight.value)
      return

    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 32,
        right: 32,
        bottom: 32,
        left: 28,
      },
      lang: i18n.locale.value,
    })

    doc.registerFont('Helvetica-Light', helveticaLight.value)

    const elemRectInPDF = initRectInPDF(doc)

    if (formSettings.value.layout === 'two-column') {
      const cvSideBgWidth = elemRectInPDF('cvSideBg')[2]
      doc
        .rect(0, 0, cvSideBgWidth, doc.page.height)
        .fill('#f8fafc')
    }

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
      .fontSize(PX_TO_PT_RATIO * 20)
      .text(`${formSettings.value.name.toLocaleUpperCase()} ${formSettings.value.lastName.toLocaleUpperCase()}`, nameX, nameY)

    // Title
    addTitle(doc, { text: formSettings.value.jobTitle, rect: elemRectInPDF('jobTitle') })

    // About me
    if (formSettings.value.layout === 'two-column')
      addTitle(doc, { text: i18n.t('about-me'), rect: elemRectInPDF('aboutmeTitle'), color: formSettings.value.activeColor })
    const [elemX, elemY, elemWidth] = elemRectInPDF('aboutmeText')
    doc
      .fillColor('#1e293b')
      .fontSize(PX_TO_PT_RATIO * 14)
      .font('Helvetica-Light')
      .lineGap(LINE_GAP)
      .text(formSettings.value.aboutme, elemX, elemY, { width: elemWidth })

    // Contact
    if (formSettings.value.layout === 'two-column')
      addTitle(doc, { text: i18n.t('contact'), rect: elemRectInPDF('contact') })
    const contactInfo: ListWithIcons = [
      { name: 'email', text: formSettings.value.email, link: `mailto:${formSettings.value.email}` },
      { name: 'phoneNumber', text: formSettings.value.phoneNumber, link: `tel:${formSettings.value.phoneNumber}` },
      { name: 'location', text: formSettings.value.location, link: undefined },
    ]
    addListWithIcons(doc, contactInfo, { elemRectInPDF })

    // Social
    const socialInfo: ListWithIcons = [
      { name: 'linkedin', text: formSettings.value.linkedin, link: `https://linkedin.com/in/${formSettings.value.linkedin}` },
      { name: 'twitter', text: formSettings.value.twitter, link: `https://twitter.com/${formSettings.value.twitter}` },
      { name: 'github', text: formSettings.value.github, link: `https://github.com/${formSettings.value.github}` },
      { name: 'website', text: formSettings.value.website, link: formSettings.value.website.includes('https') ? formSettings.value.website : `https://${formSettings.value.website}` },
    ]
    addListWithIcons(doc, socialInfo, { elemRectInPDF })

    if (formSettings.value.layout === 'two-column') {
      addTitle(doc, { text: i18n.t('technical-skills'), rect: elemRectInPDF('jobSkillsTitle') })
      addTags(doc, formSettings.value.jobSkills, { elemRectInPDF, color: formSettings.value.activeColor })

      addTitle(doc, { text: i18n.t('soft-skills'), rect: elemRectInPDF('softSkillsTitle') })
      addList(doc, formSettings.value.softSkills, { elemRectInPDF, bulletColor: formSettings.value.activeColor })

      addTitle(doc, { text: i18n.t('soft-skills'), rect: elemRectInPDF('languagesTitle') })
      for (const lang of formSettings.value.languages) {
        const [langX, langY] = elemRectInPDF(`${lang.lang}Lang`)
        const [levelX] = elemRectInPDF(`${lang.lang}Level`)
        doc
          .fillColor('#1e293b')
          .fontSize(PX_TO_PT_RATIO * 14)
          .font('Helvetica')
          .text(lang.lang, langX, langY)
          .font('Helvetica-Light')
          .text(i18n.t(lang.level), levelX, langY)
      }

      addTitle(doc, { text: i18n.t('interests'), rect: elemRectInPDF('interestsTitle') })
      addList(doc, formSettings.value.interests, { elemRectInPDF, bulletColor: formSettings.value.activeColor })

      addTitle(doc, { text: i18n.t('social'), rect: elemRectInPDF('social') })
    }

    if (formSettings.value.layout === 'one-column') {
      addTitle(doc, {
        text: `${i18n.t('skills')}${formSettings.value.displayInterests && ` / ${i18n.t('interests')}`}`,
        rect: elemRectInPDF('skills'),
        color: formSettings.value.activeColor,
        withLine: true,
      })
      const skillsText = [
        { skillName: i18n.t('technical-skills'), skillRect: elemRectInPDF('jobSkillsTitle'), skillList: formSettings.value.jobSkills.join(', ') },
        { skillName: i18n.t('soft-skills'), skillRect: elemRectInPDF('softSkillsTitle'), skillList: formSettings.value.softSkills.join(', ') },
        { skillName: i18n.t('languages'), skillRect: elemRectInPDF('languagesTitle'), skillList: formSettings.value.languages.map(l => `${l.lang} (${i18n.t(l.level)})`).join(', ') },
        { skillName: i18n.t('interests'), skillRect: elemRectInPDF('interestsTitle'), skillList: formSettings.value.interests.join(', ') },
      ]
      doc
        .fillColor('#1e293b')
        .fontSize(PX_TO_PT_RATIO * 14)
      for (const skill of skillsText) {
        doc
          .font('Helvetica')
          .text(`${skill.skillName}: `, skill.skillRect[0], skill.skillRect[1])
          .font('Helvetica-Light')
          .text(skill.skillList, skill.skillRect[0] + skill.skillRect[2] + 2, skill.skillRect[1], { lineGap: LINE_GAP })
      }
    }

    const historySections = [{ name: 'work', text: 'experience' }, 'education', 'projects'] as const

    for (const section of historySections) {
      const text = typeof section === 'string' ? section : section.text
      const rect = elemRectInPDF(text)
      addTitle(doc, {
        text: i18n.t(text),
        rect,
        color: formSettings.value.activeColor,
        withLine: formSettings.value.layout === 'one-column',
      })
      doc
        .fillColor('#1e293b')
        .fontSize(PX_TO_PT_RATIO * 14)
      const prop: SectionName = typeof section === 'string' ? section : section.name
      for (const event of formSettings.value[prop]) {
        const [titleX, titleY, titleWidth] = elemRectInPDF(`${prop}${event.id}Title`)
        const [locationX, locationY] = elemRectInPDF(`${prop}${event.id}Location`)
        const [dateX, dateY, dateWidth] = elemRectInPDF(`${prop}${event.id}Date`)

        const date = `${formatDate(event.from)} - ${event.current ? i18n.t('current') : formatDate(event.to)}`

        doc
          .font('Helvetica-Bold')
          .text(event.title, titleX, titleY, { width: titleWidth })
          .font('Helvetica')
          .text(event.location, locationX, locationY, { width: dateX - locationX })
          .text(date, dateX, dateY, { width: dateWidth })
      }
    }

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

  return function elemRectInPDF(id: string): [x: number, y: number, width: number, height: number, elem?: Element] {
    const elem = cvPreview?.querySelector(`[data-cv-elem="${id}"]`)
    const elemRect = elem?.getBoundingClientRect()
    const [elemX, elemWidth] = [(elemRect?.left ?? 0) - left, elemRect?.width].map(n => (n ?? 0) * wRatioPtPx)
    const [elemY, elemHeight] = [(elemRect?.top ?? 0) - top, elemRect?.height].map(n => (n ?? 0) * hRatioPtPx)

    return [elemX, elemY, elemWidth, elemHeight, elem ?? undefined]
  }
}

function addTitle(doc: PDFKit.PDFDocument, { text, rect, color = '#1e293b', withLine = false }: { text: string, rect: [x: number, y: number, width: number, height: number, elem?: Element], color?: string, withLine?: boolean }) {
  const titleDoc = doc
    .fillColor(color)
    .font('Helvetica-Bold')
    .fontSize(PX_TO_PT_RATIO * 16)
    .text(text.toLocaleUpperCase(), rect[0], rect[1], { width: rect[2], height: rect[3] })
  if (withLine) {
    titleDoc
      .lineWidth(2)
      .lineCap('round')
      .moveTo(rect[0] + rect[2] + (15 * PX_TO_PT_RATIO), rect[1] + (rect[3] / 4))
      .lineTo(doc.page.width - doc.page.margins.right, rect[1] + (rect[3] / 4))
      .stroke(color)
  }
  return titleDoc
}

function addListWithIcons(doc: PDFKit.PDFDocument, list: ListWithIcons, { elemRectInPDF }: { elemRectInPDF: ReturnType<typeof initRectInPDF> }) {
  for (const { name, text, link } of list) {
    const [elemX, elemY, elemWidth] = elemRectInPDF(name)
    doc
      .fillColor('#1e293b')
      .fontSize(PX_TO_PT_RATIO * 14)
      .font('Helvetica-Light')
      .text(text, elemX + 14, elemY, { width: elemWidth, link })
    const icon = ICONS[name]
    if (icon)
      SVGtoPDF(doc, icon, elemX, elemY - 2, { width: 12, height: 12, useCSS: true })
  }
}

function addList(doc: PDFKit.PDFDocument, list: string[], { elemRectInPDF, bulletColor }: { elemRectInPDF: ReturnType<typeof initRectInPDF>, bulletColor?: string }) {
  const bulletRadius = 2
  for (const elem of list) {
    const [elemX, elemY, , elemHeight] = elemRectInPDF(`${elem}Li`)
    doc
      .circle(elemX + bulletRadius, elemY + (elemHeight / 2) - (bulletRadius * 2), bulletRadius)
      .fill(bulletColor)
      .fillColor('#1e293b')
      .font('Helvetica-Light')
      .text(elem, elemX + bulletRadius + 8, elemY)
  }
}

function addTags(doc: PDFKit.PDFDocument, list: string[], { elemRectInPDF, color }: { elemRectInPDF: ReturnType<typeof initRectInPDF>, color?: string }) {
  const lineWidth = 4
  for (const skill of list) {
    const [skillX, skillY, skillWidth, skillHeight] = elemRectInPDF(`${skill}Li`)
    const [skillTextX, skillTextY] = elemRectInPDF(`${skill}Text`)
    doc
      .rect(skillX + (lineWidth / 2), skillY + (lineWidth / 2), skillWidth - lineWidth, skillHeight - lineWidth)
      .lineWidth(lineWidth)
      .lineJoin('round')
      .fillAndStroke(color)
      .fillColor('#fff')
      .font('Helvetica-Light')
      .fontSize(PX_TO_PT_RATIO * 12)
      .text(skill, skillTextX, skillTextY)
  }
}
