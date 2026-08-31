import {
  type Cv,
  LAYOUT_SECTIONS,
  type LayoutSection,
  type LayoutSectionId,
  SKILL_LAYOUT_SECTIONS,
} from '~/types/cvfy'

export const TWO_COLUMN_SIDEBAR_SECTIONS = new Set<LayoutSectionId>([
  ...SKILL_LAYOUT_SECTIONS,
  'social',
])

function isLayoutSectionId(id: unknown): id is LayoutSectionId {
  return typeof id === 'string' && (LAYOUT_SECTIONS as readonly string[]).includes(id)
}

function isSkillLayoutSectionId(id: unknown): boolean {
  return typeof id === 'string' && (SKILL_LAYOUT_SECTIONS as readonly string[]).includes(id)
}

export function getSectionPage(section: LayoutSection): number {
  const page = section.page
  if (typeof page !== 'number' || Number.isNaN(page))
    return 0
  return Math.max(0, Math.floor(page))
}

export function compactSectionPages(sectionLayout: LayoutSection[]): LayoutSection[] {
  const used = [...new Set(sectionLayout.map(getSectionPage))].sort((a, b) => a - b)
  const remap = new Map(used.map((page, index) => [page, index]))
  return sectionLayout.map(section => ({
    id: section.id,
    page: remap.get(getSectionPage(section)) ?? 0,
  }))
}

function expandLegacySkills(
  items: Array<{ id: string, page?: number, pageBreakBefore?: boolean }>,
): LayoutSection[] {
  const hasSkillGroups = items.some(item => isSkillLayoutSectionId(item.id))
  const result: LayoutSection[] = []
  let expanded = hasSkillGroups

  for (const item of items) {
    if (item.id === 'skills') {
      if (expanded)
        continue
      expanded = true
      for (const id of SKILL_LAYOUT_SECTIONS) {
        result.push({
          id,
          page: item.page,
          ...(item.pageBreakBefore && id === SKILL_LAYOUT_SECTIONS[0]
            ? { pageBreakBefore: true }
            : {}),
        })
      }
      continue
    }
    if (isLayoutSectionId(item.id)) {
      result.push({
        id: item.id,
        page: item.page,
        ...(item.pageBreakBefore ? { pageBreakBefore: true } : {}),
      })
    }
  }

  return result
}

export function normalizeSectionLayout(
  sectionLayout?: LayoutSection[] | null,
): LayoutSection[] {
  const expanded = expandLegacySkills(sectionLayout ?? [])
  const seen = new Set<LayoutSectionId>()
  const incoming: LayoutSection[] = []

  for (const item of expanded) {
    if (!item || !isLayoutSectionId(item.id) || seen.has(item.id))
      continue
    seen.add(item.id)
    incoming.push(item)
  }

  for (const id of LAYOUT_SECTIONS) {
    if (seen.has(id))
      continue
    seen.add(id)
    if (id === 'social') {
      let insertAt = incoming.length
      let page = 0
      for (let index = 0; index < incoming.length; index++) {
        if (isSkillLayoutSectionId(incoming[index].id)) {
          insertAt = index + 1
          page = getSectionPage(incoming[index])
        }
      }
      incoming.splice(insertAt, 0, { id, page })
      continue
    }
    incoming.push({ id, page: 0 })
  }

  const source = expanded
  const hasExplicitPage = source.some(item => typeof item.page === 'number')
  const hasLegacyBreaks = source.some(item => item.pageBreakBefore)

  let withPages: LayoutSection[]
  if (hasExplicitPage) {
    withPages = incoming.map(item => ({
      id: item.id,
      page: getSectionPage(item),
    }))
  }
  else if (hasLegacyBreaks) {
    let page = 0
    withPages = incoming.map((item, index) => {
      if (item.pageBreakBefore && index > 0)
        page += 1
      return { id: item.id, page }
    })
  }
  else {
    withPages = incoming.map(item => ({ id: item.id, page: 0 }))
  }

  return compactSectionPages(withPages)
}

export function isLayoutSectionVisible(id: LayoutSectionId, cv: Cv): boolean {
  if (id === 'education')
    return cv.displayEducation
  if (id === 'projects')
    return cv.displayProjects
  if (id === 'social')
    return cv.displaySocial
  if (id === 'jobSkills')
    return Boolean(cv.displayJobSkills)
  if (id === 'softSkills')
    return Boolean(cv.displaySoftSkills)
  if (id === 'languages')
    return Boolean(cv.displayLanguages)
  if (id === 'interests')
    return Boolean(cv.displayInterests)
  return true
}

export function groupAllSectionsIntoPages(
  sectionLayout: LayoutSection[],
): LayoutSection[][] {
  const maxPage = Math.max(0, ...sectionLayout.map(getSectionPage))
  const pages: LayoutSection[][] = Array.from({ length: maxPage + 1 }, () => [])

  for (const section of sectionLayout) {
    pages[getSectionPage(section)].push(section)
  }

  return pages.length > 0 ? pages : [[]]
}

export function groupSectionsIntoPages(
  sectionLayout: LayoutSection[],
  cv: Cv,
): LayoutSectionId[][] {
  const pages = groupAllSectionsIntoPages(sectionLayout)
    .map(page =>
      page
        .filter(section => isLayoutSectionVisible(section.id, cv))
        .map(section => section.id),
    )
    .filter(page => page.length > 0)

  return pages.length > 0 ? pages : [[]]
}

export function isPageFullyHidden(page: LayoutSection[], cv: Cv): boolean {
  return page.length > 0 && page.every(section => !isLayoutSectionVisible(section.id, cv))
}

export function isSidebarSection(id: LayoutSectionId): boolean {
  return TWO_COLUMN_SIDEBAR_SECTIONS.has(id)
}

export interface TwoColumnPageChrome {
  showIdentity: boolean
  showSidebar: boolean
  sidebarSections: LayoutSectionId[]
  sections: LayoutSectionId[]
}

export function getTwoColumnPageChrome(
  pageIndex: number,
  pages: LayoutSectionId[][],
): TwoColumnPageChrome {
  const page = pages[pageIndex] ?? []
  const showIdentity = pageIndex === 0
  const sidebarSections = page.filter(id => isSidebarSection(id))
  const sections = page.filter(id => !isSidebarSection(id))

  return {
    showIdentity,
    showSidebar: showIdentity || sidebarSections.length > 0,
    sidebarSections,
    sections,
  }
}

export function compactVisiblePages(
  sectionLayout: LayoutSection[],
  cv: Cv,
): LayoutSection[] {
  const visible = sectionLayout.filter(section => isLayoutSectionVisible(section.id, cv))
  const used = [...new Set(visible.map(getSectionPage))].sort((a, b) => a - b)
  if (used.length === 0) {
    return sectionLayout.map(section => ({ id: section.id, page: 0 }))
  }

  const remap = new Map(used.map((page, index) => [page, index]))
  return sectionLayout.map((section) => {
    const page = getSectionPage(section)
    const mapped = remap.get(page)
    if (mapped !== undefined)
      return { id: section.id, page: mapped }

    const previous = [...used].reverse().find(usedPage => usedPage < page) ?? used[0]
    return { id: section.id, page: remap.get(previous) ?? 0 }
  })
}

function sameColumn(
  a: LayoutSectionId,
  b: LayoutSectionId,
  twoColumn: boolean,
): boolean {
  if (!twoColumn)
    return true
  return isSidebarSection(a) === isSidebarSection(b)
}

function swapById(
  layout: LayoutSection[],
  a: LayoutSectionId,
  b: LayoutSectionId,
): LayoutSection[] {
  const next = layout.map(section => ({ ...section }))
  const indexA = next.findIndex(section => section.id === a)
  const indexB = next.findIndex(section => section.id === b)
  if (indexA < 0 || indexB < 0)
    return next
  const temp = next[indexA]
  next[indexA] = next[indexB]
  next[indexB] = temp
  return next
}

function insertOnPage(
  layout: LayoutSection[],
  id: LayoutSectionId,
  destPage: number,
  position: 'start' | 'end',
  twoColumn: boolean,
  cv: Cv,
): LayoutSection[] {
  const next = layout.map(section => ({ ...section }))
  const index = next.findIndex(section => section.id === id)
  if (index < 0)
    return next

  const [item] = next.splice(index, 1)
  item.page = destPage

  const columnSlots = next
    .map((section, slot) => ({ section, slot }))
    .filter(({ section }) =>
      getSectionPage(section) === destPage
      && sameColumn(section.id, id, twoColumn)
      && isLayoutSectionVisible(section.id, cv),
    )

  if (columnSlots.length > 0) {
    const slot = position === 'start'
      ? columnSlots[0].slot
      : columnSlots[columnSlots.length - 1].slot + 1
    next.splice(slot, 0, item)
    return next
  }

  const pageSlots = next
    .map((section, slot) => ({ section, slot }))
    .filter(({ section }) => getSectionPage(section) === destPage)

  if (pageSlots.length === 0) {
    next.push(item)
    return next
  }

  const slot = position === 'start'
    ? pageSlots[0].slot
    : pageSlots[pageSlots.length - 1].slot + 1
  next.splice(slot, 0, item)
  return next
}

export function getColumnSections(
  page: LayoutSectionId[],
  id: LayoutSectionId,
  twoColumn: boolean,
): LayoutSectionId[] {
  return page.filter(sectionId => sameColumn(sectionId, id, twoColumn))
}

export function canMoveSectionInColumn(
  layout: LayoutSection[],
  id: LayoutSectionId,
  direction: -1 | 1,
  cv: Cv,
  twoColumn: boolean,
): boolean {
  const pages = groupSectionsIntoPages(
    compactVisiblePages(normalizeSectionLayout(layout), cv),
    cv,
  )
  const pageIndex = pages.findIndex(page => page.includes(id))
  if (pageIndex < 0)
    return false

  const column = getColumnSections(pages[pageIndex], id, twoColumn)
  const indexInColumn = column.indexOf(id)
  const targetIndex = indexInColumn + direction
  if (targetIndex >= 0 && targetIndex < column.length)
    return true

  if (direction === -1)
    return pageIndex > 0

  const isLastPage = pageIndex === pages.length - 1
  const isOnlySectionOnPage = pages[pageIndex].length === 1
  return !(isLastPage && isOnlySectionOnPage)
}

export function moveSectionInColumn(
  layout: LayoutSection[],
  id: LayoutSectionId,
  direction: -1 | 1,
  cv: Cv,
  twoColumn: boolean,
): LayoutSection[] {
  const normalized = compactVisiblePages(normalizeSectionLayout(layout), cv)
  if (!canMoveSectionInColumn(normalized, id, direction, cv, twoColumn))
    return normalized

  const pages = groupSectionsIntoPages(normalized, cv)
  const pageIndex = pages.findIndex(page => page.includes(id))
  if (pageIndex < 0)
    return normalized

  const column = getColumnSections(pages[pageIndex], id, twoColumn)
  const indexInColumn = column.indexOf(id)
  const targetIndex = indexInColumn + direction

  if (targetIndex >= 0 && targetIndex < column.length) {
    return compactVisiblePages(
      swapById(normalized, id, column[targetIndex]),
      cv,
    )
  }

  const destPage = pageIndex + direction
  const position = direction === 1 ? 'start' : 'end'
  return compactVisiblePages(
    insertOnPage(normalized, id, destPage, position, twoColumn, cv),
    cv,
  )
}

export function getLastMovableSectionId(
  page: LayoutSectionId[],
  twoColumn: boolean,
): LayoutSectionId | undefined {
  if (twoColumn) {
    const main = page.filter(id => !isSidebarSection(id))
    if (main.length)
      return main[main.length - 1]
  }
  return page[page.length - 1]
}

export function canMoveLastSectionToNextPage(
  pages: LayoutSectionId[][],
  pageIndex: number,
  twoColumn: boolean,
): boolean {
  const page = pages[pageIndex]
  const lastId = page ? getLastMovableSectionId(page, twoColumn) : undefined
  if (!lastId)
    return false

  const isLastPage = pageIndex === pages.length - 1
  const isOnlySectionOnPage = page.length === 1
  return !(isLastPage && isOnlySectionOnPage)
}

export function moveLastSectionToNextPage(
  layout: LayoutSection[],
  pageIndex: number,
  cv: Cv,
  twoColumn: boolean,
): LayoutSection[] {
  const normalized = compactVisiblePages(normalizeSectionLayout(layout), cv)
  const pages = groupSectionsIntoPages(normalized, cv)
  if (!canMoveLastSectionToNextPage(pages, pageIndex, twoColumn))
    return normalized

  const lastId = getLastMovableSectionId(pages[pageIndex], twoColumn)
  if (!lastId)
    return normalized

  return moveSectionInColumn(normalized, lastId, 1, cv, twoColumn)
}

export function getHiddenLayoutSections(
  sectionLayout: LayoutSection[],
  cv: Cv,
): LayoutSectionId[] {
  return sectionLayout
    .filter(section => !isLayoutSectionVisible(section.id, cv))
    .map(section => section.id)
}
