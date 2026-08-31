export const LEVELS = [
  'elementary',
  'limited-working',
  'professional-working',
  'full-professional',
  'native-bilingual',
] as const

export type Level = (typeof LEVELS)[number]
export const LAYOUT_SECTIONS = [
  'about',
  'jobSkills',
  'softSkills',
  'languages',
  'interests',
  'social',
  'work',
  'education',
  'projects',
] as const
export type LayoutSectionId = (typeof LAYOUT_SECTIONS)[number]

export const SKILL_LAYOUT_SECTIONS = [
  'jobSkills',
  'softSkills',
  'languages',
  'interests',
] as const
export type SkillLayoutSectionId = (typeof SKILL_LAYOUT_SECTIONS)[number]

export interface LayoutSection {
  id: LayoutSectionId
  page?: number
  pageBreakBefore?: boolean
}

export const DEFAULT_SECTION_LAYOUT: LayoutSection[] = LAYOUT_SECTIONS.map(id => ({
  id,
}))

export const LAYOUT_SECTION_I18N_KEYS: Record<LayoutSectionId, string> = {
  about: 'about-me',
  jobSkills: 'technical-skills',
  softSkills: 'soft-skills',
  languages: 'languages',
  interests: 'interests',
  social: 'social',
  work: 'experience',
  education: 'education',
  projects: 'projects',
}

export interface Cv {
  layout?: 'one-column' | 'two-column'
  profileImageDataUri?: string | null
  sectionLayout?: LayoutSection[]
  jobTitle: string
  name: string
  lastName: string
  email: string
  location: string
  phoneNumber: string
  aboutme: string
  jobSkills: string[]
  displayJobSkills?: boolean
  softSkills: string[]
  displaySoftSkills?: boolean
  languages: { lang: string, level: Level }[]
  displayLanguages?: boolean
  interests: string[]
  displayInterests?: boolean
  linkedin: string
  twitter: string
  github: string
  website: string
  education: CvEvent[]
  work: CvEvent[]
  projects: CvEvent[]
  displaySocial: boolean
  displayEducation: boolean
  displayProjects: boolean
  activeColor: string
}
export interface CvEvent {
  id: string
  title: string
  location: string
  from: Date | any
  to: Date | any
  displayDate: boolean
  current: boolean
  summary: string
}

export type OptionalSection = 'displaySocial' | 'displayEducation' | 'displayProjects'

export type SkillType =
  'jobSkills' |
  'softSkills' |
  'languages' |
  'interests'

export interface LanguagesSkill {
  skill: { lang: string, level: Level }
  skillType: 'languages'
}
export interface DefaultSkill {
  skill: string
  skillType: Exclude<SkillType, 'languages'>
}

export type Skill = DefaultSkill['skill'] | LanguagesSkill['skill']

export const SectionNameList = {
  work: 'experience',
  education: 'education',
  projects: 'projects',
} as const
export type SectionName = keyof typeof SectionNameList
