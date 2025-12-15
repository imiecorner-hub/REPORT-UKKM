
import { WeeklySchedule, SchoolInspection, SampleRecord, RampasanRecord } from './types';

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
  // Existing Data (1-13)
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
  
  // New Data - SK Series (14-23)
  { id: 14, name: 'SK FELDA TELOI TIMUR', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 15, name: 'SK CHEMARA', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 16, name: 'SK HAJI HUSSAIN', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 17, name: 'SK BANDAR BARU BERIS JAYA', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 18, name: 'SK JENERI', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 19, name: 'SK PADANG CHICAK', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 20, name: 'SK KAMPUNG BETONG', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 21, name: 'SK KALAI', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 22, name: 'SK KOTA BUKIT', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 23, name: 'SK DANGLAU', category: 'SEKOLAH KPM', visitDate1: '' },

  // New Data - SM Series (24-31)
  { id: 24, name: 'SM SIK', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 25, name: 'SM AGAMA SIK', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 26, name: 'SM SERI ENGGANG', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 27, name: 'SM CHEPIR', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 28, name: 'SM AGAMA MAKTAB MAHMUD', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 29, name: 'SM BATU 8', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 30, name: 'SM GULAU', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 31, name: 'SM JENERI', category: 'SEKOLAH KPM', visitDate1: '' },

  // New Data - DAS (Asrama) Series (32-40)
  { id: 32, name: 'DAS SM SIK', category: 'ASRAMA', visitDate1: '' },
  { id: 33, name: 'DAS SM AGAMA SIK', category: 'ASRAMA', visitDate1: '' },
  { id: 34, name: 'DAS SM SERI ENGGANG', category: 'ASRAMA', visitDate1: '' },
  { id: 35, name: 'DAS SM CHEPIR', category: 'ASRAMA', visitDate1: '' },
  { id: 36, name: 'DAS SM AGAMA MAKTAB MAHMUD', category: 'ASRAMA', visitDate1: '' },
  { id: 37, name: 'DAS SK GULAU', category: 'ASRAMA', visitDate1: '' },
  { id: 38, name: 'DAS SM GULAU', category: 'ASRAMA', visitDate1: '' },
  { id: 39, name: 'DAS SM JENERI', category: 'ASRAMA', visitDate1: '' },
  { id: 40, name: 'DAS SK PAYA TERENDAM', category: 'ASRAMA', visitDate1: '' },
  
  // Religious Schools & DAS
  { id: 41, name: 'SM AGAMA IRSYADIAH', category: 'SEKOLAH KPM', visitDate1: '' },
  { id: 42, name: 'DAS SM AGAMA IRSYADIAH', category: 'ASRAMA', visitDate1: '' },
  { id: 43, name: 'MAAHAD DINI SULTAN ABDUL HALIM', category: 'SEKOLAH JHEAIK', visitDate1: '' },

  // Facilities & IPT
  { id: 44, name: 'DAPUR HOSPITAL SIK', category: 'FASILITI KKM', visitDate1: '' },
  { id: 45, name: 'KANTIN HOSPITAL SIK (KAFE)', category: 'SWASTA', visitDate1: '' },
  { id: 46, name: 'KAFE KEDA (IPTA)', category: 'IPT', visitDate1: '' },
  { id: 47, name: 'KAFE IKM (IPTA)', category: 'IPT', visitDate1: '' },
  { id: 48, name: 'KAFE KOLEJ KOMUNITI', category: 'IPT', visitDate1: '' },
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

export const RAMPASAN_DATA: RampasanRecord[] = [
  {
    id: 1,
    date: '24/02/2025',
    premise: 'Pasar Mini Selamat',
    item: 'Roti Gardenia Coklat',
    quantity: 15,
    unit: 'Bungkus',
    value: 22.50,
    reason: 'TAMAT TARIKH',
    act: 'Peraturan 14(9)(b)'
  },
  {
    id: 2,
    date: '10/03/2025',
    premise: 'Kedai Runcit Ah Hock',
    item: 'Kicap Masin Cap Kipas',
    quantity: 8,
    unit: 'Botol',
    value: 48.00,
    reason: 'KEMIK/ROSAK',
    act: 'Seksyen 13B(2)(e)'
  },
  {
    id: 3,
    date: '15/03/2025',
    premise: 'Pasaraya Bintang',
    item: 'Sardin Tin Ayam Brand',
    quantity: 12,
    unit: 'Tin',
    value: 60.00,
    reason: 'KEMIK/ROSAK',
    act: 'Seksyen 13B(2)(e)'
  },
   {
    id: 4,
    date: '20/03/2025',
    premise: 'Kedai Runcit Pak Mat',
    item: 'Air Kotak Drinho',
    quantity: 24,
    unit: 'Kotak',
    value: 36.00,
    reason: 'TAMAT TARIKH',
    act: 'Peraturan 14(9)(b)'
  }
];

export const STAT_CATEGORIES = [
  { label: 'Persampelan Rutin', value: 12, total: 20 },
  { label: 'Keracunan Makanan', value: 0, total: 5 },
  { label: 'Pemeriksaan Kantin KPM', value: 35, total: 40 },
  { label: 'Pemeriksaan Premis Luar', value: 15, total: 30 },
  { label: 'Bazar Ramadhan', value: 50, total: 50 },
];