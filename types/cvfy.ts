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
  languages: { lang: string; level: string }[];
  linkedin: string;
  twitter: string;
  github: string;
  website: string;
  education: CvEvent[];
  work: CvEvent[];
  projects: CvEvent[];
  displayEducation: boolean;
  displayProjects: boolean;
}
export interface CvEvent {
  title: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  summary: string;
  summaryArr?: string[];
}
