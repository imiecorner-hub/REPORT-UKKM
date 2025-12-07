import React, { useState, useEffect } from 'react';
import { SAMPLES } from '../constants';
import { SampleRecord } from '../types';
import { Microscope, MapPin, Calendar, Clock, Filter, Plus, X, Save, FileText, AlertCircle } from 'lucide-react';

const SampleAnalysis: React.FC = () => {
  // Initialize with constant data but allow updates
  const [samples, setSamples] = useState<SampleRecord[]>(SAMPLES);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    week: '',
    date: '',
    time: '',
    foodType: '',
    analysisType: '',
    location: '',
    lab: 'MKAK, Sungai Buloh',
    status: 'PENDING' as 'PENDING' | 'GAGAL' | 'BERJAYA',
    notes: ''
  });

  // Simulate loading effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate counts for each status based on current state
  const counts = {
    total: samples.length,
    berjaya: samples.filter(s => s.status === 'BERJAYA').length,
    gagal: samples.filter(s => s.status === 'GAGAL').length,
    pending: samples.filter(s => s.status === 'PENDING').length
  };

  const filteredSamples = samples.filter(sample => {
    if (filterStatus === 'ALL') return true;
    return sample.status === filterStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple ID generation
    const newId = samples.length > 0 ? Math.max(...samples.map(s => s.id)) + 1 : 1;
    
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const dateObj = new Date(formData.date);
    const formattedDate = !isNaN(dateObj.getTime()) 
      ? `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
      : formData.date;

    const newSample: SampleRecord = {
      id: newId,
      week: parseInt(formData.week) || 0,
      date: formattedDate,
      time: formData.time, // 12hr format logic omitted for brevity, keeping raw input
      foodType: formData.foodType,
      analysisType: formData.analysisType,
      location: formData.location,
      lab: formData.lab,
      status: formData.status,
      notes: formData.notes
    };

    setSamples([newSample, ...samples]);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      week: '',
      date: '',
      time: '',
      foodType: '',
      analysisType: '',
      location: '',
      lab: 'MKAK, Sungai Buloh',
      status: 'PENDING',
      notes: ''
    });
  };

  // Skeleton Loader Component
  const SampleSkeleton = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row animate-pulse">
      <div className="w-full md:w-2 h-2 md:h-auto bg-slate-200"></div>
      <div className="p-4 md:p-6 flex-1 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-3 w-full max-w-lg">
             <div className="flex gap-2">
               <div className="h-5 w-24 bg-slate-200 rounded"></div>
               <div className="h-5 w-20 bg-slate-200 rounded"></div>
             </div>
             <div className="h-8 w-3/4 bg-slate-200 rounded"></div>
             <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
          </div>
          <div className="h-8 w-16 bg-slate-200 rounded md:ml-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-3 w-16 bg-slate-200 rounded"></div>
                <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-px bg-slate-100 w-full"></div>
        <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
       <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analisis Sampel</h2>
          <p className="text-slate-500">Log persampelan dan keputusan makmal 2025.</p>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center gap-3">
           {/* Status Counts Badges */}
           <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <div className="px-2.5 py-1.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 shadow-sm flex-1 sm:flex-none text-center">
                Semua: {counts.total}
              </div>
              <div className="px-2.5 py-1.5 rounded-md bg-green-50 text-green-700 border border-green-100 shadow-sm flex-1 sm:flex-none text-center">
                Berjaya: {counts.berjaya}
              </div>
              <div className="px-2.5 py-1.5 rounded-md bg-red-50 text-red-700 border border-red-100 shadow-sm flex-1 sm:flex-none text-center">
                Gagal: {counts.gagal}
              </div>
              <div className="px-2.5 py-1.5 rounded-md bg-yellow-50 text-yellow-700 border border-yellow-100 shadow-sm flex-1 sm:flex-none text-center">
                Pending: {counts.pending}
              </div>
           </div>

           <div className="flex gap-2 w-full sm:w-auto">
             {/* Filter Dropdown */}
             <div className="relative flex-1 sm:flex-none min-w-[140px]">
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
               <select
                 value={filterStatus}
                 onChange={(e) => setFilterStatus(e.target.value)}
                 className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer"
                 style={{ 
                   backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                   backgroundPosition: `right 0.5rem center`,
                   backgroundRepeat: `no-repeat`,
                   backgroundSize: `1.5em 1.5em`
                 }}
               >
                 <option value="ALL">Semua Status</option>
                 <option value="BERJAYA">Berjaya</option>
                 <option value="GAGAL">Gagal</option>
                 <option value="PENDING">Pending</option>
               </select>
             </div>

             {/* Add Button */}
             <button 
               onClick={() => setIsModalOpen(true)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
             >
               <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Tambah Sampel</span><span className="sm:hidden">Tambah</span>
             </button>
           </div>
        </div>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          // Render Skeletons when loading
          <>
            <SampleSkeleton />
            <SampleSkeleton />
            <SampleSkeleton />
          </>
        ) : filteredSamples.length > 0 ? (
          filteredSamples.map((sample) => (
            <div key={sample.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow animate-fade-in">
              {/* Status Strip */}
              <div className={`w-full md:w-2 h-2 md:h-auto ${
                sample.status === 'GAGAL' ? 'bg-red-500' : 
                sample.status === 'BERJAYA' ? 'bg-green-500' : 
                'bg-yellow-400'
              }`}></div>
              
              <div className="p-4 md:p-6 flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div className="w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Minggu {sample.week}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        sample.status === 'GAGAL' ? 'bg-red-100 text-red-700' : 
                        sample.status === 'BERJAYA' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {sample.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{sample.foodType}</h3>
                    <p className="text-slate-600 text-sm">Analisis: {sample.analysisType}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right w-full md:w-auto flex justify-between md:block">
                    <span className="md:hidden text-xs text-slate-400 uppercase font-bold tracking-wider pt-1">ID Sampel</span>
                    <p className="text-lg md:text-2xl font-bold text-slate-800">#{sample.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Lokasi</p>
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">{sample.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Tarikh</p>
                      <p className="text-sm font-medium text-slate-900">{sample.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Masa</p>
                      <p className="text-sm font-medium text-slate-900">{sample.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 shrink-0">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Makmal</p>
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">{sample.lab}</p>
                    </div>
                  </div>
                </div>

                {sample.notes && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600"><span className="font-semibold">Catatan:</span> {sample.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed animate-fade-in">
            <Microscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">Tiada Sampel Dijumpai</h3>
            <p className="text-slate-500">Tiada rekod untuk status "{filterStatus.toLowerCase()}"</p>
          </div>
        )}
      </div>

      {/* Add Sample Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="font-bold text-lg text-slate-800">
                Tambah Rekod Sampel
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="space-y-6">
                
                {/* Section 1: Food Info */}
                <div>
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <FileText className="w-4 h-4 text-blue-500" /> Maklumat Makanan
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Jenis Makanan</label>
                        <input 
                          type="text" 
                          name="foodType"
                          required
                          placeholder="Contoh: Bebola Ikan"
                          value={formData.foodType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Jenis Analisis</label>
                        <input 
                          type="text" 
                          name="analysisType"
                          required
                          placeholder="Contoh: Alergen Telur"
                          value={formData.analysisType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                   </div>
                </div>

                {/* Section 2: Collection Details */}
                <div className="pt-4 border-t border-slate-100">
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-blue-500" /> Butiran Pengambilan
                   </h4>
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Lokasi / Premis</label>
                        <input 
                          type="text" 
                          name="location"
                          required
                          placeholder="Contoh: Pasaraya Kawan Kita"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-1 col-span-3 sm:col-span-1">
                            <label className="text-sm font-medium text-slate-700">Tarikh</label>
                            <input 
                              type="date" 
                              name="date"
                              required
                              value={formData.date}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            />
                         </div>
                         <div className="space-y-1 col-span-3 sm:col-span-1">
                            <label className="text-sm font-medium text-slate-700">Masa</label>
                            <input 
                              type="time" 
                              name="time"
                              required
                              value={formData.time}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
                            />
                         </div>
                         <div className="space-y-1 col-span-3 sm:col-span-1">
                            <label className="text-sm font-medium text-slate-700">Minggu (ME)</label>
                            <input 
                              type="number" 
                              name="week"
                              placeholder="Contoh: 48"
                              value={formData.week}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Section 3: Lab & Status */}
                <div className="pt-4 border-t border-slate-100">
                   <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-blue-500" /> Keputusan Makmal
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Nama Makmal</label>
                        <input 
                          type="text" 
                          name="lab"
                          value={formData.lab}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Status Keputusan</label>
                        <select 
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="BERJAYA">BERJAYA</option>
                          <option value="GAGAL">GAGAL</option>
                        </select>
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-1">
                         <label className="text-sm font-medium text-slate-700">Catatan Tambahan</label>
                         <textarea 
                           name="notes"
                           rows={2}
                           value={formData.notes}
                           onChange={handleInputChange}
                           placeholder="Contoh: Pos Laju - No Rujukan..."
                           className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                         />
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
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
                  Simpan Rekod
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleAnalysis;