
export interface WeeklySchedule {
  week: number;
  startDate: string;
  endDate: string;
  month: number;
}

export interface SchoolInspection {
  id: number;
  name: string;
  category: string;
  visitDate1: string;
  markah1?: string; // Changed to string to allow empty or numeric input easily
  fosim1?: boolean;
  visitDate2?: string;
  markah2?: string;
  fosim2?: boolean;
  visitDate3?: string;
  markah3?: string;
  fosim3?: boolean;
}

export interface SampleRecord {
  id: number;
  week: number;
  date: string;
  time: string;
  foodType: string;
  analysisType: string;
  location: string;
  lab: string;
  status: 'PENDING' | 'GAGAL' | 'BERJAYA';
  notes?: string;
}

export interface StatMetric {
  title: string;
  value: number;
  target: number;
  color: string;
  icon: any;
}

export interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  SCHOOLS = 'SCHOOLS',
  SAMPLES = 'SAMPLES',
  SCHEDULE = 'SCHEDULE'
}