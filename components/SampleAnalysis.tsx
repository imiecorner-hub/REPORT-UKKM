import React, { useState } from 'react';
import { SAMPLES } from '../constants';
import { Microscope, MapPin, Calendar, Clock, Filter } from 'lucide-react';

const SampleAnalysis: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Calculate counts for each status
  const counts = {
    total: SAMPLES.length,
    berjaya: SAMPLES.filter(s => s.status === 'BERJAYA').length,
    gagal: SAMPLES.filter(s => s.status === 'GAGAL').length,
    pending: SAMPLES.filter(s => s.status === 'PENDING').length
  };

  const filteredSamples = SAMPLES.filter(sample => {
    if (filterStatus === 'ALL') return true;
    return sample.status === filterStatus;
  });

  return (
    <div className="space-y-6">
       <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analisis Sampel</h2>
          <p className="text-slate-500">Log persampelan dan keputusan makmal 2025.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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

           {/* Filter Dropdown */}
           <div className="relative min-w-[160px] w-full sm:w-auto">
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
        </div>
      </div>

      <div className="grid gap-6">
        {filteredSamples.length > 0 ? (
          filteredSamples.map((sample) => (
            <div key={sample.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
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
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
            <Microscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">Tiada Sampel Dijumpai</h3>
            <p className="text-slate-500">Tiada rekod untuk status "{filterStatus.toLowerCase()}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleAnalysis;