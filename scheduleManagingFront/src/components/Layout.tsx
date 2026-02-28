import React from 'react';
import { Calendar, Users, UserCheck, BarChart3, LogOut, Bell, Home, Command } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'calendar', label: 'Scheduler', icon: <Calendar size={20} /> },
    { id: 'instructors', label: 'Partners', icon: <UserCheck size={20} /> },
    { id: 'members', label: 'Members', icon: <Users size={20} /> },
    { id: 'settlement', label: 'Settlement', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-950 flex-col z-30 shadow-2xl shrink-0">
        <div className="h-20 flex items-center px-8 gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Command size={18} className="text-white" />
          </div>
          <span className="text-[15px] font-bold text-white tracking-tight italic uppercase">Flow Core</span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-xl font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl text-[11px] font-bold text-slate-500 transition-all border border-white/5">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Header */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 md:px-10 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex md:hidden items-center justify-center text-white shadow-lg shadow-indigo-200">
               <Home size={16} />
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter italic">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right mr-2">
              <p className="text-[12px] font-black text-slate-900 leading-none italic uppercase">
                {new Date().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* Content View - overflow-y-auto ensures visibility of long lists */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto pb-24 md:pb-0">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-around px-2 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-16 ${
                activeTab === item.id ? 'text-indigo-600 -translate-y-1' : 'text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-indigo-50 shadow-inner' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
