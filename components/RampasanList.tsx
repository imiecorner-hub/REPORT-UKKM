
import React, { useState } from 'react';
import { RAMPASAN_DATA } from '../constants';
import { RampasanRecord } from '../types';
import { Search, Plus, Filter, Ban, X, Save, ShoppingBag, Trash2, FileWarning, DollarSign } from 'lucide-react';

const RampasanList: React.FC = () => {
  const [records, setRecords] = useState<RampasanRecord[]>(RAMPASAN_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: '',
    premise: '',
    item: '',
    quantity: '',
    unit: 'Unit',
    value: '',
    reason: 'TAMAT TARIKH',
    act: 'Peraturan 14(9)(b)'
  });

  // Calculate stats
  const totalValue = records.reduce((acc, curr) => acc + curr.value, 0);
  const totalItems = records.reduce((acc, curr) => acc + curr.quantity, 0);
  const expiredCount = records.filter(r => r.reason === 'TAMAT TARIKH').length;
  const damagedCount = records.filter(r => r.reason === 'KEMIK/ROSAK').length;

  const filteredRecords = records.filter(record => 
    record.premise.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1;
    
    // Format date if needed, assuming simple input for now
    const dateObj = new Date(formData.date);
    const formattedDate = !isNaN(dateObj.getTime()) 
      ? `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`
      : formData.date;

    const newRecord: RampasanRecord = {
      id: newId,
      date: formattedDate,
      premise: formData.premise,
      item: formData.item,
      quantity: parseInt(formData.quantity) || 0,
      unit: formData.unit,
      value: parseFloat(formData.value) || 0,
      reason: formData.reason as any,
      act: formData.act
    };

    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      date: '',
      premise: '',
      item: '',
      quantity: '',
      unit: 'Unit',
      value: '',
      reason: 'TAMAT TARIKH',
      act: 'Peraturan 14(9)(b)'
    });
  };

  const deleteRecord = (id: number) => {
    if (window.confirm('Adakah anda pasti mahu memadam rekod ini?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Rekod Rampasan</h2>
          <p className="text-slate-500">Pengurusan sitaan produk makanan yang melanggar peraturan.</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
                <Plus className="w-4 h-4" /> Tambah Rekod
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nilai Rampasan</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">RM {totalValue.toFixed(2)}</h3>
           </div>
           <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
           </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Item Disita</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{totalItems} <span className="text-sm font-medium text-slate-400">Unit</span></h3>
           </div>
           <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <ShoppingBag className="w-6 h-6" />
           </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tamat Tempoh</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{expiredCount} <span className="text-sm font-medium text-slate-400">Kes</span></h3>
           </div>
           <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
              <FileWarning className="w-6 h-6" />
           </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kemik / Rosak</p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{damagedCount} <span className="text-sm font-medium text-slate-400">Kes</span></h3>
           </div>
           <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
              <Ban className="w-6 h-6" />
           </div>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-600" /> Senarai Sitaan
            </h3>
            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Cari premis atau item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Tarikh</th>
                        <th className="px-6 py-3">Premis</th>
                        <th className="px-6 py-3">Item & Kuantiti</th>
                        <th className="px-6 py-3">Sebab & Akta</th>
                        <th className="px-6 py-3 text-right">Nilai (RM)</th>
                        <th className="px-6 py-3 text-center">Tindakan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{record.date}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{record.premise}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-slate-800">{record.item}</div>
                                    <div className="text-xs text-slate-500">{record.quantity} {record.unit}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                        record.reason === 'TAMAT TARIKH' ? 'bg-red-100 text-red-800' :
                                        record.reason === 'KEMIK/ROSAK' ? 'bg-orange-100 text-orange-800' :
                                        'bg-slate-100 text-slate-800'
                                    }`}>
                                        {record.reason}
                                    </span>
                                    <div className="text-xs text-slate-400 mt-1">{record.act}</div>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-800 text-right">
                                    {record.value.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => deleteRecord(record.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Padam Rekod"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                Tiada rekod dijumpai.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

       {/* Add Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">
                Tambah Rekod Rampasan
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nama Premis</label>
                <input 
                  type="text" 
                  name="premise"
                  required
                  value={formData.premise}
                  onChange={handleInputChange}
                  placeholder="Contoh: Kedai Runcit Ali"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tarikh</label>
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nilai (RM)</label>
                    <input 
                      type="number" 
                      name="value"
                      step="0.01"
                      required
                      value={formData.value}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Item Dirampas</label>
                <input 
                  type="text" 
                  name="item"
                  required
                  value={formData.item}
                  onChange={handleInputChange}
                  placeholder="Contoh: Roti Coklat"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Kuantiti</label>
                    <input 
                      type="number" 
                      name="quantity"
                      required
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Unit</label>
                    <input 
                      type="text" 
                      name="unit"
                      required
                      value={formData.unit}
                      onChange={handleInputChange}
                      placeholder="Unit / Bungkus / Kg"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sebab Rampasan</label>
                    <select 
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    >
                      <option value="TAMAT TARIKH">TAMAT TARIKH</option>
                      <option value="KEMIK/ROSAK">KEMIK/ROSAK</option>
                      <option value="LABEL">LABEL</option>
                      <option value="LAIN-LAIN">LAIN-LAIN</option>
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Akta / Peraturan</label>
                    <input 
                      type="text" 
                      name="act"
                      value={formData.act}
                      onChange={handleInputChange}
                      placeholder="Contoh: Peraturan 14"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> 
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RampasanList;
