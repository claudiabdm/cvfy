export interface CvEvent {
  title: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  summary: string;
  summaryArr?: string[];
}
