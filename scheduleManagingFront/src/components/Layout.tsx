import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Users, 
  Wallet, LogOut, Menu, Bell, X, Plus
} from 'lucide-react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // [Gemini Update]: 다크 모드 로직 완전 제거 및 극강의 라이트 테마 고정
  // 모든 배경과 텍스트를 가장 밝고 선명한 톤으로 설정했습니다.

  const menuItems = [
    { id: 'dashboard', label: '홈', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'calendar', label: '스케줄', path: '/calendar', icon: <Calendar size={20} /> },
    { id: 'members', label: '회원관리', path: '/members', icon: <Users size={20} /> },
    { id: 'settlement', label: '정산현황', path: '/settlement', icon: <Wallet size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden transition-colors duration-300">
      
      {/* 1. Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar (극강의 화이트 테마) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 md:relative md:translate-x-0 transition-transform duration-500 ease-in-out shadow-sm ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-24 flex items-center justify-between px-8">
          <div className="text-2xl font-black text-indigo-600 tracking-tighter cursor-pointer" onClick={() => navigate('/dashboard')}>
            Schedule<span className="text-slate-900">+</span>
          </div>
          <button className="md:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="px-4 space-y-1.5 mt-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { navigate(item.path); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200 ${
                isActive(item.path) 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 translate-x-1' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <span className={isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-6 right-6 space-y-3">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">My Profile</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black">JS</div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">김지수 관리자</p>
                <p className="text-xs text-slate-500 truncate">Premium Plan</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl text-rose-500 font-bold text-xs hover:bg-rose-50 transition-all"
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2.5 bg-slate-50 rounded-xl text-slate-500 shadow-sm" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20}/>
            </button>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {menuItems.find(m => m.path === location.pathname)?.label || '개요'}
            </h2>
          </div>
          <div className="flex items-center gap-5">
             <div className="hidden sm:flex flex-col items-end pr-5 border-r border-slate-200/60">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-0.5">
                  {new Date().toLocaleDateString('ko-KR', { weekday: 'long' })}
                </p>
                <p className="text-sm font-black text-slate-900">
                  {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </p>
             </div>
             <button className="p-2.5 text-slate-400 hover:text-indigo-600 transition-all relative group">
               <Bell size={22} />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-20">
            {/* [Gemini Update]: 카드는 순백색으로 배경(slate-50)과 대비 형성 */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100">
              {children || <Outlet />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
