import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  ChefHat, 
  Store, 
  ArrowUpRight,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';
import { STAT_CATEGORIES } from '../constants';

const COLORS = ['#3b82f6', '#93c5fd', '#e2e8f0']; // Blue theme
const PIE_COLORS = ['#10b981', '#ef4444', '#f59e0b']; // Green, Red, Yellow

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Extract original data object to calculate percentage
    const data = payload[0].payload;
    const percentage = data.Sasaran > 0 ? Math.round((data.Selesai / data.Sasaran) * 100) : 0;
    
    // Determine color based on completion
    const percentColor = percentage >= 100 ? 'text-emerald-400 bg-emerald-500/20' : 'text-blue-400 bg-blue-500/20';

    return (
      <div className="bg-slate-900/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl border border-slate-700 text-white z-50">
        <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-2 gap-4">
          <p className="font-bold text-xs md:text-sm text-slate-200">{label}</p>
          <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full ${percentColor}`}>
            {percentage}%
          </span>
        </div>
        <div className="space-y-1.5 md:space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 md:gap-6 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-slate-300 capitalize">{entry.name}</span>
              </div>
              <span className="font-bold font-mono text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const DashboardOverview: React.FC = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Derived data for charts
  const barData = STAT_CATEGORIES.map(item => ({
    name: item.label.split(' ').slice(0, 2).join(' '), // Shorten name
    Selesai: item.value,
    Sasaran: item.total
  }));

  const complianceData = [
    { name: 'Patuh', value: 85 },
    { name: 'Tidak Patuh', value: 10 },
    { name: 'Tutup', value: 5 },
  ];

  const currentDate = new Date().toLocaleDateString('ms-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6 md:space-y-8 pb-10 animate-fade-in relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            {currentDate}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Selamat Datang, Pegawai</h2>
          <p className="text-sm md:text-base text-slate-500 mt-1">Laporan status keselamatan dan kualiti makanan terkini.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col items-end w-full md:w-auto">
             <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Minggu Epidemiologi</span>
             <span className="text-xl font-bold text-blue-600">Minggu 48</span>
          </div>
        </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <ModernStatCard 
          title="Persampelan Rutin" 
          current={12} 
          total={20} 
          icon={ClipboardCheck} 
          colorClass="text-blue-600 bg-blue-50"
          progressColor="bg-blue-600"
        />
        <ModernStatCard 
          title="Kes Keracunan" 
          current={0} 
          total={0}
          icon={AlertTriangle} 
          colorClass="text-emerald-600 bg-emerald-50"
          progressColor="bg-emerald-500"
          isZeroGood={true}
          customLabel="Tiada Kes Dilaporkan"
        />
        <ModernStatCard 
          title="Pemeriksaan Kantin" 
          current={35} 
          total={40} 
          icon={ChefHat} 
          colorClass="text-orange-600 bg-orange-50"
          progressColor="bg-orange-500"
        />
        <ModernStatCard 
          title="Premis Luar & Bazar" 
          current={65} 
          total={80} 
          icon={Store} 
          colorClass="text-purple-600 bg-purple-50"
          progressColor="bg-purple-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Bar Chart */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Kemajuan Aktiviti
              </h3>
              <p className="text-sm text-slate-400">Perbandingan sasaran vs pencapaian semasa</p>
            </div>
          </div>
          {/* Responsive Height for Chart */}
          <div className="h-[250px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barGap={6}>
                <defs>
                  <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={10} 
                  tick={{fill: '#64748b', fontWeight: 500}} 
                  dy={10}
                  interval={0} // Show all ticks
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={10} 
                  tick={{fill: '#64748b'}} 
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: '#f8fafc', radius: 4 }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}/>
                <Bar 
                  name="Selesai" 
                  dataKey="Selesai" 
                  fill="url(#colorSelesai)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20} 
                  animationDuration={1500}
                />
                <Bar 
                  name="Sasaran" 
                  dataKey="Sasaran" 
                  fill="#e2e8f0" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Donut Chart */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div className="mb-4">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Status Pematuhan
              </h3>
              <p className="text-sm text-slate-400">Kadar pematuhan premis diperiksa</p>
          </div>
          
          <div className="flex-1 relative min-h-[200px] md:min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={6}
                  stroke="none"
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">85%</span>
              <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">Kadar Patuh</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
             <div className="bg-emerald-50 rounded-lg p-3 text-center">
                <span className="block text-lg md:text-xl font-bold text-emerald-700">120</span>
                <span className="text-[10px] md:text-xs font-medium text-emerald-600">Premis Bersih</span>
             </div>
             <div className="bg-red-50 rounded-lg p-3 text-center">
                <span className="block text-lg md:text-xl font-bold text-red-700">15</span>
                <span className="text-[10px] md:text-xs font-medium text-red-600">Notis Dikeluarkan</span>
             </div>
          </div>
        </div>
      </div>

      {/* Alert & Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Urgent Alerts */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-4 md:p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-red-100 rounded-full">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              Perhatian Diperlukan
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 bg-red-50/50 rounded-xl border border-red-100">
                <div className="min-w-[4px] h-full bg-red-400 rounded-full mt-1"></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Pelanggaran Label Makanan</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    2 sampel <span className="font-semibold">Bebola Ikan</span> dikesan mengandungi alergen telur di <span className="underline decoration-red-200">Pasaraya Kawan Kita</span>.
                  </p>
                  <button className="mt-3 text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white/50 px-3 py-1.5 rounded-lg w-fit transition-colors hover:bg-white">
                    Lihat Laporan <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info / Tips */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden flex flex-col">
          <div className="relative z-10 flex-1">
             <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-blue-200" />
                Jadual Minggu Ini
             </h3>
             <p className="text-blue-100 text-sm mb-6 leading-relaxed">
               Minggu 48: Fokus kepada pemeriksaan kantin sekolah rendah zon utara dan persampelan produk beku.
             </p>
          </div>
             
          <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="text-xs text-blue-200">Sasaran: 5 Sekolah</div>
            <button 
              onClick={() => setShowCalendarModal(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              Lihat Takwim <Calendar className="w-3 h-3 ml-1" />
            </button>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col animate-slide-up">
             {/* Header */}
             <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
               <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-blue-600"/> 
                 Google Calendar (Takwim)
               </h3>
               <button 
                onClick={() => setShowCalendarModal(false)} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             {/* Iframe */}
             <div className="flex-1 bg-slate-100 relative w-full h-full">
                <iframe 
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKuala_Lumpur&showPrint=0&src=ZW4ubWFsYXlzaWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043" 
                  style={{border: 0}} 
                  width="100%" 
                  height="100%" 
                  title="Google Calendar"
                ></iframe>
             </div>
             
             {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-2 shrink-0">
                 <button
                   onClick={() => setShowCalendarModal(false)}
                   className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors text-sm"
                 >
                   Tutup
                 </button>
                 <a 
                   href="https://calendar.google.com" 
                   target="_blank" 
                   rel="noreferrer"
                   className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                 >
                   Buka Google Calendar Penuh <ExternalLink className="w-4 h-4" />
                 </a>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

// New "Modern" Stat Card Component
const ModernStatCard = ({ title, current, total, icon: Icon, colorClass, progressColor, isZeroGood, customLabel }: any) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        {total > 0 && (
          <span className="text-[10px] md:text-xs font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full border border-slate-100">
            {percentage}%
          </span>
        )}
      </div>
      
      <h4 className="text-slate-500 font-medium text-xs md:text-sm mb-1">{title}</h4>
      
      {isZeroGood && current === 0 ? (
         <div className="h-8 flex items-center">
            <span className="text-sm md:text-lg font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md whitespace-nowrap">{customLabel}</span>
         </div>
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{current}</span>
          {total > 0 && <span className="text-xs md:text-sm font-semibold text-slate-400">/ {total}</span>}
        </div>
      )}

      {/* Progress Bar */}
      {!isZeroGood && (
        <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 md:h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      
      {/* Subtext */}
      {!isZeroGood && (
         <p className="text-[10px] md:text-xs text-slate-400 mt-2 font-medium">
            {total - current} lagi diperlukan
         </p>
      )}
    </div>
  );
};

export default DashboardOverview;