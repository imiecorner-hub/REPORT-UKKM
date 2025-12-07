import React, { useState } from 'react';
import { WEEKLY_SCHEDULE } from '../constants';
import { Calendar, Search } from 'lucide-react';

const ScheduleList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const monthNames = ["", "Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];

  // Filter Logic
  const filteredSchedule = WEEKLY_SCHEDULE.filter(item => {
    const term = searchTerm.toLowerCase();
    const monthName = monthNames[item.month].toLowerCase();
    
    return (
      item.week.toString().includes(term) ||
      item.startDate.includes(term) ||
      item.endDate.includes(term) ||
      monthName.includes(term)
    );
  });

  // Group by Month
  const groupedSchedule: Record<number, typeof WEEKLY_SCHEDULE> = {};
  filteredSchedule.forEach(item => {
    if (!groupedSchedule[item.month]) {
      groupedSchedule[item.month] = [];
    }
    groupedSchedule[item.month].push(item);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Takwim Mingguan 2025</h2>
          <p className="text-slate-500">Rujukan minggu epidemiologi dan tarikh aktiviti.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari minggu atau tarikh..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(groupedSchedule).length > 0 ? (
          Object.keys(groupedSchedule).map(monthStr => {
            const monthNum = parseInt(monthStr);
            const weeks = groupedSchedule[monthNum];
            
            return (
              <div key={monthNum} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">{monthNames[monthNum]} 2025</h3>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
                <div className="divide-y divide-slate-100">
                  {weeks.map(week => (
                    <div key={week.week} className="px-6 py-3 flex justify-between items-center hover:bg-blue-50 transition-colors cursor-default group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          M{week.week}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-700">{week.startDate} - {week.endDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">Tiada Rekod Dijumpai</h3>
            <p className="text-slate-500">Tiada minggu atau tarikh yang sepadan dengan carian anda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;