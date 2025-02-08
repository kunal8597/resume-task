export interface ExperienceEntry {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string | null;
  currentlyWorkHere: boolean;
  description: string;
}

export type ExperienceEntries = ExperienceEntry[];