import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Users, UserCheck, 
  Wallet, BarChart3, LogOut, Sun, Moon, 
  Menu, X, Bell, Search 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const menuGroups = [
    {
      group: "Overview",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'calendar', label: 'Scheduler', icon: <Calendar size={18} /> },
      ]
    },
    {
      group: "Management",
      items: [
        { id: 'instructors', label: 'Partners', icon: <UserCheck size={18} /> },
        { id: 'members', label: 'Members', icon: <Users size={18} /> },
      ]
    },
    {
      group: "Finance",
      items: [
        { id: 'settlement', label: 'Payroll', icon: <Wallet size={18} /> },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans overflow-hidden">
      
      {/* Sidebar: Strict separation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[var(--bg-card)] border-r border-[var(--border-ui)] transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-[var(--border-ui)]">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-3">
             <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="font-bold tracking-tight">NexusFlow</span>
          <button className="md:hidden ml-auto text-[var(--text-muted)]" onClick={() => setIsSidebarOpen(false)}><X size={20}/></button>
        </div>

        <nav className="p-4 space-y-6 mt-2 overflow-y-auto h-[calc(100vh-140px)]">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-xs font-semibold text-[var(--text-muted)] mb-2">{group.group}</p>
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--bg-hover)] text-brand-600 dark:text-white'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-ui)] bg-[var(--bg-card)] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 overflow-hidden border border-[var(--border-ui)]">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="avatar" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">Admin User</span>
              <button onClick={onLogout} className="text-[10px] text-[var(--text-muted)] hover:text-brand-600 text-left">Sign out</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content: Constrained to screen */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[var(--bg-main)]">
        <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border-ui)] flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-[var(--text-muted)]" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type="text" placeholder="Search..." className="w-64 h-9 pl-9 pr-4 rounded-md bg-[var(--bg-hover)] border-none text-sm outline-none focus:ring-2 focus:ring-brand-500/20 text-[var(--text-main)] placeholder-[var(--text-muted)]" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-md hover:bg-[var(--bg-hover)] transition-colors">
              {theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}
            </button>
            <div className="w-px h-5 bg-[var(--border-ui)]"></div>
            <button className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-md hover:bg-[var(--bg-hover)] transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable area clearly contained */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto pb-10">
            <div className="mb-6">
               <h1 className="text-2xl font-bold text-[var(--text-main)] capitalize">{activeTab}</h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
