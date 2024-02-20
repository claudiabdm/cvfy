export const LEVELS = [
  'elementary',
  'limited-working',
  'professional-working',
  'full-professional',
  'native-bilingual',
] as const;

export type Level = (typeof LEVELS)[number];
export interface Cv {
  jobTitle: string;
  name: string;
  lastName: string;
  email: string;
  location: string;
  phoneNumber: string;
  aboutme: string;
  jobSkills: string[];
  softSkills: string[];
  languages: { lang: string; level: Level }[];
  linkedin: string;
  twitter: string;
  github: string;
  website: string;
  education: CvEvent[];
  work: CvEvent[];
  projects: CvEvent[];
  displaySocial: boolean;
  displayEducation: boolean;
  displayProjects: boolean;
  activeColor: string;
}
export interface CvEvent {
  title: string;
  location: string;
  from: Date | any;
  to: Date | any;
  current: boolean;
  summary: string;
  summaryArr?: string[];
}

export type SkillType = 'jobSkills' | 'softSkills' | 'languages';

export interface LanguagesSkill {
  skill: { lang: string; level: Level };
  skillType: 'languages';
}
export interface DefaultSkill {
  skill: string;
  skillType: 'jobSkills' | 'softSkills';
}

export type SectionName = 'education' | 'work' | 'projects';
