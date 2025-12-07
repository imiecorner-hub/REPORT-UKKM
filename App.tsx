import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  School, 
  TestTube2, 
  CalendarDays, 
  Menu,
  X,
  Search,
  LogOut,
  UserCircle
} from 'lucide-react';
import { PageView, UserProfile } from './types';
import DashboardOverview from './components/DashboardOverview';
import SchoolInspections from './components/SchoolInspections';
import SampleAnalysis from './components/SampleAnalysis';
import ScheduleList from './components/ScheduleList';
import { jwtDecode } from 'jwt-decode';

// NOTE: Replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

declare global {
  interface Window {
    google: any;
  }
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>(PageView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGoogleLogin = (response: any) => {
    try {
      const decoded: any = jwtDecode(response.credential);
      const userProfile: UserProfile = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      };
      setUser(userProfile);
      localStorage.setItem('user_session', JSON.stringify(userProfile));
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const handleGuestLogin = () => {
    const guestUser: UserProfile = {
      name: "Pegawai Tetamu",
      email: "tetamu@keselamatan.gov.my",
      picture: "" // Empty string will trigger fallback icon
    };
    setUser(guestUser);
    localStorage.setItem('user_session', JSON.stringify(guestUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    // If using Google Auth, we might want to disable auto-select here if needed
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

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

  // Login Page Component
  if (!user) {
    return (
      <LoginPage 
        onGoogleSuccess={handleGoogleLogin} 
        onGuestLogin={handleGuestLogin} 
      />
    );
  }

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
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3">
            <div className="flex items-center gap-3 mb-3">
              {user.picture ? (
                <img src={user.picture} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200" />
              ) : (
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                  <UserCircle className="w-5 h-5" />
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-600">Online</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" /> Log Keluar
          </button>
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
          
          <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
               {user.picture ? (
                  <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-slate-200" />
                ) : (
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                    <UserCircle className="w-6 h-6" />
                  </div>
                )}
               <div>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
               </div>
             </div>
             <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 p-3 rounded-xl transition-colors font-semibold"
              >
                <LogOut className="w-4 h-4" /> Log Keluar
              </button>
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

// Login Page Component
const LoginPage = ({ onGoogleSuccess, onGuestLogin }: { onGoogleSuccess: (response: any) => void, onGuestLogin: () => void }) => {
  useEffect(() => {
    /* Initialize Google Identity Services */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: onGoogleSuccess,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: "280" }
      );
    }
  }, [onGoogleSuccess]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-blue-200 shadow-lg mx-auto mb-6">
           <span className="text-white font-bold text-3xl">K</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Unit Keselamatan</h1>
        <p className="text-slate-500 mb-8">Sistem Info Keselamatan & Kualiti Makanan</p>

        <div className="space-y-4 flex flex-col items-center">
           {/* Google Button Container */}
           <div id="googleSignInDiv" className="w-full flex justify-center h-[40px] mb-2"></div>
           
           <div className="relative w-full my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">Atau</span>
              </div>
           </div>

           <button 
             onClick={onGuestLogin}
             className="w-full max-w-[280px] bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
           >
             Teruskan sebagai Tetamu
           </button>
           
           <p className="text-xs text-slate-400 mt-4 max-w-xs mx-auto">
             * Untuk log masuk Google berfungsi sepenuhnya, sila kemas kini GOOGLE_CLIENT_ID dalam kod.
           </p>
        </div>
      </div>
      <p className="mt-8 text-sm text-slate-400 font-medium">© 2025 Bahagian Keselamatan Kualiti Makanan</p>
    </div>
  );
};

export default App;