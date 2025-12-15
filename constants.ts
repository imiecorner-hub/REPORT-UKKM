
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

export const SCHOOL_INSPECTIONS: SchoolInspection[] = [];

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
