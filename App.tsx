import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  School, 
  TestTube2, 
  CalendarDays, 
  Menu,
  X,
  Search
} from 'lucide-react';
import { PageView } from './types';
import DashboardOverview from './components/DashboardOverview';
import SchoolInspections from './components/SchoolInspections';
import SampleAnalysis from './components/SampleAnalysis';
import ScheduleList from './components/ScheduleList';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>(PageView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case PageView.DASHBOARD:
        return <DashboardOverview />;
      case PageView.SCHOOLS:
        return <SchoolInspections />;
      case PageView.SAMPLES:
        return <SampleAnalysis />;
      case PageView.SCHEDULE:
        return <ScheduleList />;
      default:
        return <DashboardOverview />;
    }
  };

  const NavItem = ({ page, icon: Icon, label }: { page: PageView; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActivePage(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
        activePage === page 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
      }`}
    >
      <Icon className={`w-5 h-5 mr-3 ${activePage === page ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-30 shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-blue-200 shadow-lg">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">Unit Keselamatan</h1>
            <p className="text-xs text-slate-500 font-medium">Kualiti Makanan</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <NavItem page={PageView.DASHBOARD} icon={LayoutDashboard} label="Dashboard Utama" />
            <NavItem page={PageView.SCHOOLS} icon={School} label="Pemeriksaan Sekolah" />
            <NavItem page={PageView.SAMPLES} icon={TestTube2} label="Analisis Sampel" />
            <NavItem page={PageView.SCHEDULE} icon={CalendarDays} label="Takwim 2025" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Status Sistem</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-slate-700">Online (FOSIM)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">K</span>
          </div>
          <span className="font-bold text-slate-800 tracking-tight">Keselamatan Makanan</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-white pt-20 px-4 pb-6 overflow-y-auto animate-fade-in">
          <div className="space-y-2">
            <NavItem page={PageView.DASHBOARD} icon={LayoutDashboard} label="Dashboard Utama" />
            <NavItem page={PageView.SCHOOLS} icon={School} label="Pemeriksaan Sekolah" />
            <NavItem page={PageView.SAMPLES} icon={TestTube2} label="Analisis Sampel" />
            <NavItem page={PageView.SCHEDULE} icon={CalendarDays} label="Takwim 2025" />
          </div>
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
             <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Info Pengguna</p>
             <p className="text-sm font-medium text-slate-800">Pegawai Keselamatan</p>
             <p className="text-xs text-slate-500">Unit Kualiti Makanan</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 w-full transition-all duration-300">
        <div className="min-h-screen p-4 pt-20 md:p-8 md:pt-8 max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;