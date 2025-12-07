
import { WeeklySchedule, SchoolInspection, SampleRecord } from './types';

export const WEEKLY_SCHEDULE: WeeklySchedule[] = [
  { week: 1, startDate: '30/12/2024', endDate: '5/1/2025', month: 1 },
  { week: 2, startDate: '6/1/2025', endDate: '12/1/2025', month: 1 },
  { week: 3, startDate: '13/1/2025', endDate: '19/1/2025', month: 1 },
  { week: 4, startDate: '20/1/2025', endDate: '26/1/2025', month: 1 },
  { week: 5, startDate: '27/1/2025', endDate: '2/2/2025', month: 2 },
  { week: 6, startDate: '3/2/2025', endDate: '9/2/2025', month: 2 },
  { week: 7, startDate: '10/2/2025', endDate: '16/2/2025', month: 2 },
  { week: 8, startDate: '17/2/2025', endDate: '23/2/2025', month: 2 },
  { week: 48, startDate: '24/11/2025', endDate: '30/11/2025', month: 11 },
  { week: 49, startDate: '1/12/2025', endDate: '7/12/2025', month: 12 },
  { week: 50, startDate: '8/12/2025', endDate: '14/12/2025', month: 12 },
  { week: 51, startDate: '15/12/2025', endDate: '21/12/2025', month: 12 },
  { week: 52, startDate: '22/12/2025', endDate: '28/12/2025', month: 12 },
];

export const SCHOOL_INSPECTIONS: SchoolInspection[] = [
  { id: 1, name: 'SK SIK', category: 'SEKOLAH KPM', visitDate1: '28/4/2025', visitDate2: '2/9/2025' },
  { id: 2, name: 'SK SIK DALAM', category: 'SEKOLAH KPM', visitDate1: '16/4/2025' },
  { id: 3, name: 'SJK(C) CHUNG HWA', category: 'SEKOLAH KPM', visitDate1: '30/6/2025' },
  { id: 4, name: 'SK HUJUNG BANDAR', category: 'SEKOLAH KPM', visitDate1: '19/6/2025', visitDate2: '21/9/2025' },
  { id: 5, name: 'SK PAYA TERENDAM', category: 'SEKOLAH KPM', visitDate1: '16/4/2025' },
  { id: 6, name: 'SK BATU LIMA', category: 'SEKOLAH KPM', visitDate1: '17/6/2025' },
  { id: 7, name: 'SK SERI DUSUN', category: 'SEKOLAH KPM', visitDate1: '25/2/2025', visitDate2: '2/9/2025' },
  { id: 8, name: 'SK CHEPIR', category: 'SEKOLAH KPM', visitDate1: '27/5/2025', visitDate2: '13/8/2025' },
  { id: 9, name: 'SK BATU 8', category: 'SEKOLAH KPM', visitDate1: '29/4/2025', visitDate2: '21/9/2025' },
  { id: 10, name: 'SK KOTA AUR', category: 'SEKOLAH KPM', visitDate1: '28/5/2025', visitDate2: '28/10/25' },
  { id: 11, name: 'SK GULAU', category: 'SEKOLAH KPM', visitDate1: '24/6/2025' },
  { id: 12, name: 'SK AMPANG MUDA', category: 'SEKOLAH KPM', visitDate1: '28/5/2025', visitDate2: '28/10/2025' },
  { id: 13, name: 'SK TELOI TUA', category: 'SEKOLAH KPM', visitDate1: '13/5/2025' },
];

export const SAMPLES: SampleRecord[] = [
  { 
    id: 1, 
    week: 48, 
    date: '25/11/2025', 
    time: '11:20AM', 
    foodType: 'Bebola Ikan', 
    analysisType: 'Alergen Telur', 
    location: 'Pasaraya Kawan Kita', 
    lab: 'MKAK, Sungai Buloh', 
    status: 'GAGAL',
    notes: 'Pos Laju - 26/11/2025'
  },
  { 
    id: 2, 
    week: 49, 
    date: '1/12/2025', 
    time: '10:39AM', 
    foodType: 'Bebola Ikan', 
    analysisType: 'Alergen Telur', 
    location: 'Lizyana Frozen', 
    lab: 'MKAK, Sungai Buloh', 
    status: 'BERJAYA',
    notes: 'Resample - Pos Laju 1/12/2025'
  },
];

export const STAT_CATEGORIES = [
  { label: 'Persampelan Rutin', value: 12, total: 20 },
  { label: 'Keracunan Makanan', value: 0, total: 5 },
  { label: 'Pemeriksaan Kantin KPM', value: 35, total: 40 },
  { label: 'Pemeriksaan Premis Luar', value: 15, total: 30 },
  { label: 'Bazar Ramadhan', value: 50, total: 50 },
];
