import React from 'react';
import { Calendar, Users, UserCheck, BarChart3, LogOut, Command, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'calendar', label: 'Scheduler', icon: <Calendar size={18} /> },
    { id: 'instructors', label: 'Partners', icon: <UserCheck size={18} /> },
    { id: 'members', label: 'Members', icon: <Users size={18} /> },
    { id: 'settlement', label: 'Finance', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-brand-500/30">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col z-30 shrink-0 border-r border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent pointer-events-none"></div>
        
        <div className="h-24 flex items-center px-8 gap-3 relative">
          <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Zap size={20} className="text-white fill-white/20" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight leading-none block">Nexus</span>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Workspace</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 relative">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14px] font-medium transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'text-white bg-zinc-800/50 border border-zinc-700/50 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                )}
                <span className={`${isActive ? 'text-brand-400' : 'text-zinc-500'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto relative">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-all border border-zinc-800/50">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.99]">
        
        {/* Header */}
        <header className="h-20 glass-panel border-b-0 flex items-center justify-between px-6 md:px-12 shrink-0 z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex md:hidden items-center justify-center text-brand-400 border border-zinc-800">
               <Command size={18} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="hidden md:flex flex-col text-right">
              <p className="text-sm font-semibold text-zinc-200">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden shrink-0 cursor-pointer hover:border-brand-500 transition-colors">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 relative">
          <div className="max-w-[1400px] mx-auto pb-24 md:pb-10">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-6 left-4 right-4 h-16 glass-panel rounded-2xl flex items-center justify-around px-2 z-[100] border border-zinc-800/80 shadow-2xl">
          {menuItems.map((item) => {
             const isActive = activeTab === item.id;
             return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-14 h-full transition-all duration-300 ${
                  isActive ? 'text-brand-400' : 'text-zinc-500'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-brand-500/10' : ''}`}>
                  {item.icon}
                </div>
                {isActive && <span className="text-[9px] font-medium mt-1">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
