
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

export interface RampasanRecord {
  id: number;
  date: string;
  premise: string;
  item: string;
  quantity: number;
  unit: string;
  value: number; // In Ringgit
  reason: 'TAMAT TARIKH' | 'KEMIK/ROSAK' | 'LABEL' | 'LAIN-LAIN';
  act: string; // e.g., "Seksyen 4(1)(f)"
}

export interface StatMetric {
  title: string;
  value: number;
  target: number;
  color: string;
  icon: any;
}

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  SCHOOLS = 'SCHOOLS',
  SAMPLES = 'SAMPLES',
  SCHEDULE = 'SCHEDULE',
  RAMPASAN = 'RAMPASAN'
}