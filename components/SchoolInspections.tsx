import React, { useState } from 'react';
import { Search, Filter, Plus, X, Save, Building2, Calendar as CalendarIcon, Pencil, FileDown, LayoutList, ChevronLeft, ChevronRight, Utensils, Home, Briefcase } from 'lucide-react';
import { SCHOOL_INSPECTIONS } from '../constants';
import { SchoolInspection } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SchoolInspections: React.FC = () => {
  // Initialize state with constant data
  const [inspections, setInspections] = useState<SchoolInspection[]>(SCHOOL_INSPECTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  
  // View Mode State
  const [viewMode, setViewMode] = useState<'TABLE' | 'CALENDAR'>('TABLE');
  const [calendarDate, setCalendarDate] = useState(new Date(2025, 3, 1)); // Default to April 2025 as per data

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form Data State
  const [formData, setFormData] = useState({
    name: '',
    category: 'SEKOLAH KPM',
    visitDate1: '',
    markah1: '',
    visitDate2: '',
    markah2: '',
    visitDate3: '',
    markah3: ''
  });

  // Filter Logic
  const filteredSchools = inspections.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'ALL' || school.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  // Grouping Logic
  const groupedInspections = {
    kantin: filteredSchools.filter(s => ['SEKOLAH KPM', 'SEKOLAH JHEAIK'].includes(s.category)),
    das: filteredSchools.filter(s => s.category === 'ASRAMA'),
    lain: filteredSchools.filter(s => !['SEKOLAH KPM', 'SEKOLAH JHEAIK', 'ASRAMA'].includes(s.category))
  };

  const categories = Array.from(new Set(inspections.map(s => s.category)));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Helper to convert DD/MM/YYYY to YYYY-MM-DD for input fields
  const toInputDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // Assuming existing data is roughly D/M/YYYY or DD/MM/YYYY
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2]; // Handle 2-digit year if present
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  // Helper to convert YYYY-MM-DD to D/M/YYYY for display
  const toDisplayDate = (dateVal: string) => {
    if (!dateVal) return '';
    const dateObj = new Date(dateVal);
    if (isNaN(dateObj.getTime())) return dateVal;
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  };

  // Helper to parse DD/MM/YYYY to Date object
  const parseDateStr = (dateStr?: string) => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      return new Date(year, month, day);
    }
    return null;
  };

  const handleEdit = (school: SchoolInspection) => {
    setFormData({
      name: school.name,
      category: school.category,
      visitDate1: toInputDate(school.visitDate1),
      markah1: school.markah1 || '',
      visitDate2: toInputDate(school.visitDate2),
      markah2: school.markah2 || '',
      visitDate3: toInputDate(school.visitDate3),
      markah3: school.markah3 || ''
    });
    setEditingId(school.id);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({ 
      name: '', 
      category: 'SEKOLAH KPM', 
      visitDate1: '', 
      markah1: '',
      visitDate2: '', 
      markah2: '',
      visitDate3: '',
      markah3: ''
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleToggleFosim = (id: number, visitNum: 1 | 2 | 3) => {
    setInspections(prev => prev.map(item => {
      if (item.id === id) {
        if (visitNum === 1) return { ...item, fosim1: !item.fosim1 };
        if (visitNum === 2) return { ...item, fosim2: !item.fosim2 };
        if (visitNum === 3) return { ...item, fosim3: !item.fosim3 };
      }
      return item;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) return;

    const formattedDate1 = toDisplayDate(formData.visitDate1);
    const formattedDate2 = toDisplayDate(formData.visitDate2);
    const formattedDate3 = toDisplayDate(formData.visitDate3);

    if (editingId !== null) {
      // Update existing record
      setInspections(prev => prev.map(item => 
        item.id === editingId 
          ? { 
              ...item, 
              name: formData.name, 
              category: formData.category, 
              visitDate1: formattedDate1,
              markah1: formData.markah1 || undefined,
              visitDate2: formattedDate2 || undefined,
              markah2: formData.markah2 || undefined,
              visitDate3: formattedDate3 || undefined,
              markah3: formData.markah3 || undefined,
            }
          : item
      ));
    } else {
      // Create new record
      const newId = inspections.length > 0 ? Math.max(...inspections.map(i => i.id)) + 1 : 1;
      const newRecord: SchoolInspection = {
        id: newId,
        name: formData.name,
        category: formData.category,
        visitDate1: formattedDate1,
        markah1: formData.markah1 || undefined,
        visitDate2: formattedDate2 || undefined,
        markah2: formData.markah2 || undefined,
        visitDate3: formattedDate3 || undefined,
        markah3: formData.markah3 || undefined,
      };
      setInspections([newRecord, ...inspections]);
    }
    
    // Reset and close
    openAddModal(); // Effectively resets state
    setIsModalOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    
    doc.setFontSize(18);
    doc.text('Laporan Pemeriksaan Sekolah 2025', 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Tarikh Laporan: ${new Date().toLocaleDateString('ms-MY')}`, 14, 28);
    
    // Define table columns and rows
    const tableColumn = [
      "Bil", 
      "Nama Sekolah", 
      "Kategori", 
      "Lwtn 1: Tarikh", "Lwtn 1: Mrkh", "Lwtn 1: FOSIM",
      "Lwtn 2: Tarikh", "Lwtn 2: Mrkh", "Lwtn 2: FOSIM",
      "Lwtn 3: Tarikh", "Lwtn 3: Mrkh", "Lwtn 3: FOSIM"
    ];

    const tableRows: any[] = [];

    // Use filtered list for PDF so it matches search results
    filteredSchools.forEach((school, index) => {
      const rowData = [
        index + 1,
        school.name,
        school.category,
        
        school.visitDate1 || '-',
        school.markah1 || '-',
        school.fosim1 ? 'YA' : '-',
        
        school.visitDate2 || '-',
        school.markah2 || '-',
        school.fosim2 ? 'YA' : '-',
        
        school.visitDate3 || '-',
        school.markah3 || '-',
        school.fosim3 ? 'YA' : '-',
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }, // Blue-600
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 10 }, // Bil
        1: { cellWidth: 50 }, // Nama
        2: { cellWidth: 30 }, // Kategori
        // Dates
        3: { cellWidth: 20 }, 
        6: { cellWidth: 20 },
        9: { cellWidth: 20 },
        // Markah
        4: { cellWidth: 12, halign: 'center' },
        7: { cellWidth: 12, halign: 'center' },
        10: { cellWidth: 12, halign: 'center' },
        // Fosim
        5: { cellWidth: 12, halign: 'center' },
        8: { cellWidth: 12, halign: 'center' },
        11: { cellWidth: 12, halign: 'center' },
      }
    });

    doc.save('Laporan_Pemeriksaan_Sekolah_2025.pdf');
  };

  // Checkbox component for visual consistency
  const CheckboxSquare = ({ checked, onClick }: { checked?: boolean; onClick?: () => void }) => (
    <div 
      onClick={onClick}
      className={`w-3.5 h-3.5 border mx-auto rounded-sm cursor-pointer transition-colors flex items-center justify-center ${
        checked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 hover:border-blue-400'
      }`}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </div>
  );

  // Calendar Rendering Logic
  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Empty cells for previous month padding
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`pad-${i}`} className="bg-slate-50 border border-slate-100 min-h-[100px]"></div>);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      
      // Find events for this day
      const events = filteredSchools.flatMap(school => {
        const matches = [];
        const date1 = parseDateStr(school.visitDate1);
        const date2 = parseDateStr(school.visitDate2);
        const date3 = parseDateStr(school.visitDate3);

        if (date1 && date1.getTime() === currentDate.getTime()) matches.push({ ...school, type: 1 });
        if (date2 && date2.getTime() === currentDate.getTime()) matches.push({ ...school, type: 2 });
        if (date3 && date3.getTime() === currentDate.getTime()) matches.push({ ...school, type: 3 });
        return matches;
      });

      days.push(
        <div key={day} className="bg-white border border-slate-200 min-h-[100px] p-1 md:p-2 hover:bg-slate-50 transition-colors">
          <div className="text-right">
            <span className={`text-xs font-semibold ${
               // Highlight today
               new Date().toDateString() === currentDate.toDateString() 
                 ? 'bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full ml-auto'
                 : 'text-slate-500'
            }`}>
              {day}
            </span>
          </div>
          <div className="mt-1 space-y-1">
            {events.map((evt, idx) => (
              <button 
                key={`${evt.id}-${evt.type}-${idx}`}
                onClick={() => handleEdit(evt)}
                className={`w-full text-left text-[9px] md:text-[10px] px-1.5 py-1 rounded border truncate transition-transform hover:scale-105 ${
                  evt.type === 1 ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  evt.type === 2 ? 'bg-purple-50 text-purple-700 border-purple-100' :
                  'bg-orange-50 text-orange-700 border-orange-100'
                }`}
              >
                <span className="font-bold mr-1">L{evt.type}:</span>
                {evt.name}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-b-xl overflow-hidden">
        {['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'].map(day => (
          <div key={day} className="bg-slate-100 p-2 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderTableSection = (title: string, data: SchoolInspection[], icon: any, headerBg: string, headerText: string) => {
    if (data.length === 0) return null;
    const Icon = icon;

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in mb-8 last:mb-0">
        <div className={`px-4 md:px-6 py-4 border-b border-slate-200 ${headerBg} flex justify-between items-center`}>
          <div className="flex items-center gap-2">
             <Icon className={`w-5 h-5 ${headerText} opacity-80`} />
             <h3 className={`font-bold text-lg ${headerText}`}>{title}</h3>
          </div>
          <span className="text-xs font-bold bg-white/60 px-2 py-1 rounded-md text-slate-700 shadow-sm">
             {data.length} Rekod
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed md:table-auto">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider w-8 border-r border-slate-200 text-center">BIL</th>
                <th className="px-2 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider border-r border-slate-200 sticky left-0 bg-slate-50 z-10 w-[150px] md:w-auto">NAMA PREMIS</th>
                
                {/* Visit 1 */}
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-20">TARIKH<br/>LAWATAN 1</th>
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-12">MARKAH</th>
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-10">FOSIM</th>
                
                {/* Visit 2 */}
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-20">TARIKH<br/>LAWATAN 2</th>
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-12">MARKAH</th>
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-10">FOSIM</th>

                {/* Visit 3 */}
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-20">TARIKH<br/>LAWATAN 3</th>
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-12">MARKAH</th>
                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center border-r border-slate-200 w-10">FOSIM</th>

                <th className="px-1 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center w-12">EDIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((school, index) => (
                <tr key={school.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100">{index + 1}</td>
                  <td className="px-2 py-1.5 text-[10px] md:text-xs font-semibold text-slate-800 border-r border-slate-100 uppercase sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] truncate max-w-[150px] md:max-w-none md:whitespace-normal" title={school.name}>{school.name}</td>
                  
                  {/* Visit 1 Data */}
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100 font-medium whitespace-nowrap">{school.visitDate1}</td>
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100">{school.markah1 || ''}</td>
                  <td className="px-1 py-1.5 text-center border-r border-slate-100">
                    <CheckboxSquare checked={school.fosim1} onClick={() => handleToggleFosim(school.id, 1)} />
                  </td>

                  {/* Visit 2 Data */}
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100 font-medium whitespace-nowrap">{school.visitDate2 || ''}</td>
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100">{school.markah2 || ''}</td>
                  <td className="px-1 py-1.5 text-center border-r border-slate-100">
                    <CheckboxSquare checked={school.fosim2} onClick={() => handleToggleFosim(school.id, 2)} />
                  </td>

                  {/* Visit 3 Data */}
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100 font-medium whitespace-nowrap">{school.visitDate3 || ''}</td>
                  <td className="px-1 py-1.5 text-[10px] md:text-xs text-slate-600 text-center border-r border-slate-100">{school.markah3 || ''}</td>
                  <td className="px-1 py-1.5 text-center border-r border-slate-100">
                    <CheckboxSquare checked={school.fosim3} onClick={() => handleToggleFosim(school.id, 3)} />
                  </td>

                  <td className="px-1 py-1.5 text-center">
                    <button 
                      onClick={() => handleEdit(school)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Kemas kini"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Senarai Pemeriksaan Sekolah</h2>
          <p className="text-slate-500">Jadual dan status pemeriksaan premis sekolah mengikut kategori.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
           
           {/* View Toggle */}
           <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
             <button
               onClick={() => setViewMode('TABLE')}
               className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                 viewMode === 'TABLE' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
               }`}
             >
               <LayoutList className="w-4 h-4" /> <span className="hidden md:inline">Senarai</span>
             </button>
             <button
               onClick={() => setViewMode('CALENDAR')}
               className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
                 viewMode === 'CALENDAR' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
               }`}
             >
               <CalendarIcon className="w-4 h-4" /> <span className="hidden md:inline">Kalendar</span>
             </button>
           </div>

           <div className="flex flex-wrap gap-2 flex-1 sm:flex-none">
             <button 
               onClick={openAddModal}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm flex-1 sm:flex-none justify-center"
             >
               <Plus className="w-4 h-4" /> Tambah
             </button>
             <button 
               onClick={generatePDF}
               className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
             >
               <FileDown className="w-4 h-4" /> Report
             </button>
             <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center">
               <Filter className="w-4 h-4" /> Export
             </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama sekolah..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="ALL">Semua Kategori</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* VIEW CONTENT */}
      {viewMode === 'TABLE' ? (
        /* TABLE VIEW - Grouped */
        <div>
           {filteredSchools.length > 0 ? (
             <>
               {renderTableSection('Kantin Sekolah', groupedInspections.kantin, Utensils, 'bg-blue-50', 'text-blue-800')}
               {renderTableSection('Dapur Asrama (DAS)', groupedInspections.das, Home, 'bg-purple-50', 'text-purple-800')}
               {renderTableSection('Institusi & Lain-lain', groupedInspections.lain, Briefcase, 'bg-orange-50', 'text-orange-800')}
             </>
           ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
               <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
               <h3 className="text-lg font-medium text-slate-900">Tiada Rekod Dijumpai</h3>
               <p className="text-slate-500">Cuba ubah carian atau penapis kategori anda.</p>
            </div>
           )}
        </div>
      ) : (
        /* CALENDAR VIEW */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in">
          {/* Calendar Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-xl">
             <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
               <ChevronLeft className="w-5 h-5 text-slate-600" />
             </button>
             <h3 className="text-lg font-bold text-slate-800 capitalize">
               {calendarDate.toLocaleDateString('ms-MY', { month: 'long', year: 'numeric' })}
             </h3>
             <button onClick={handleNextMonth} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
               <ChevronRight className="w-5 h-5 text-slate-600" />
             </button>
          </div>
          {/* Calendar Grid */}
          {renderCalendar()}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="font-bold text-lg text-slate-800">
                {editingId ? 'Kemas Kini Pemeriksaan' : 'Tambah Pemeriksaan Baru'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {/* Name & Category */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Nama Premis / Sekolah
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: SK Seri Aman"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" /> Kategori
                  </label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="SEKOLAH KPM">SEKOLAH KPM</option>
                    <option value="SEKOLAH JHEAIK">SEKOLAH JHEAIK</option>
                    <option value="ASRAMA">ASRAMA (DAS)</option>
                    <option value="FASILITI KKM">FASILITI KKM</option>
                    <option value="IPT">IPT</option>
                    <option value="SWASTA">SWASTA</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 my-4 pt-4">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-500" /> Jadual Lawatan
                </h4>
                
                <div className="space-y-4">
                  {/* Visit 1 Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Tarikh Lawatan 1</label>
                      <input 
                        type="date" 
                        name="visitDate1"
                        value={formData.visitDate1}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Markah 1</label>
                      <input 
                        type="text" 
                        name="markah1"
                        value={formData.markah1}
                        onChange={handleInputChange}
                        placeholder="Contoh: 85"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 text-sm"
                      />
                    </div>
                  </div>

                  {/* Visit 2 Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Tarikh Lawatan 2</label>
                      <input 
                        type="date" 
                        name="visitDate2"
                        value={formData.visitDate2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 text-sm"
                      />
                    </div>
                     <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Markah 2</label>
                      <input 
                        type="text" 
                        name="markah2"
                        value={formData.markah2}
                        onChange={handleInputChange}
                         placeholder="Contoh: 90"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 text-sm"
                      />
                    </div>
                  </div>

                  {/* Visit 3 Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Tarikh Lawatan 3</label>
                      <input 
                        type="date" 
                        name="visitDate3"
                        value={formData.visitDate3}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 text-sm"
                      />
                    </div>
                     <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Markah 3</label>
                      <input 
                        type="text" 
                        name="markah3"
                        value={formData.markah3}
                        onChange={handleInputChange}
                        placeholder="Contoh: 92"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> 
                  {editingId ? 'Kemas Kini' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolInspections;