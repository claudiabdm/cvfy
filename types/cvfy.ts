export const LEVELS = [
  'elementary',
  'limited-working',
  'professional-working',
  'full-professional',
  'native-bilingual',
] as const

export type Level = (typeof LEVELS)[number]
export interface Cv {
  profileImageDataUri?: string | null
  jobTitle: string
  name: string
  lastName: string
  email: string
  location: string
  phoneNumber: string
  aboutme: string
  jobSkills: string[]
  softSkills: string[]
  languages: { lang: string, level: Level }[]
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
  current: boolean
  summary: string
}

export type OptionalSection = 'displaySocial' | 'displayEducation' | 'displayProjects'

export type SkillType = 'jobSkills' | 'softSkills' | 'languages'

export interface LanguagesSkill {
  skill: { lang: string, level: Level }
  skillType: 'languages'
}
export interface DefaultSkill {
  skill: string
  skillType: 'jobSkills' | 'softSkills'
}

export const SectionNameList = {
  work: 'experience',
  education: 'education',
  projects: 'projects',
} as const
export type SectionName = keyof typeof SectionNameList
