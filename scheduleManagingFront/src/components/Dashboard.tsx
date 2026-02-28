import React from 'react';
import { Users, Calendar, Wallet, TrendingUp, Activity, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '₩12.4M', change: '+18.4%', icon: <Wallet size={20} /> },
    { label: 'Active Members', value: '1,284', change: '+12.5%', icon: <Users size={20} /> },
    { label: 'Classes Today', value: '42', change: '+3.2%', icon: <Calendar size={20} /> },
    { label: 'Retention Rate', value: '94.2%', change: '+2.1%', icon: <Activity size={20} /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[var(--bg-card)] border border-[var(--border-ui)] p-5 rounded-2xl shadow-[var(--shadow-card)] group hover:border-brand-500 cursor-pointer transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[var(--bg-hover)] rounded-lg text-brand-500">
                {stat.icon}
              </div>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)] mb-1 uppercase tracking-wider text-[10px]">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-ui)] p-6 rounded-2xl shadow-[var(--shadow-card)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--text-main)]">Today's Schedule</h3>
            <button className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-ui)] bg-[var(--bg-hover)] hover:scale-[1.01] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-card)] border border-[var(--border-ui)] flex flex-col items-center justify-center text-[var(--text-main)]">
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase">AM</span>
                    <span className="text-sm font-bold leading-none">09</span>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-main)]">Pilates Core Advanced</p>
                    <p className="text-xs text-[var(--text-muted)]">Sarah Kim • Main Studio</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-8 h-8 rounded-full border-2 border-[var(--bg-card)] bg-[var(--bg-hover)] overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${j+i*10}`} alt="avatar" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-ui)] p-6 rounded-2xl shadow-[var(--shadow-card)] text-[var(--text-main)]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-4 rounded-xl border border-[var(--border-ui)] hover:bg-[var(--bg-hover)] transition-all">
                <Users size={24} className="mb-2 text-brand-500" />
                <span className="text-xs font-bold">Add Client</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-xl border border-[var(--border-ui)] hover:bg-[var(--bg-hover)] transition-all">
                <Calendar size={24} className="mb-2 text-emerald-500" />
                <span className="text-xs font-bold">New Booking</span>
              </button>
            </div>
          </div>

          <div className="bg-brand-600 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg">
             <div className="absolute right-[-10%] bottom-[-10%] opacity-10"><TrendingUp size={120} /></div>
             <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Financial Goal</p>
             <h4 className="text-3xl font-black italic tracking-tighter mb-6">₩12,400,000</h4>
             <button className="w-full py-3 bg-white text-brand-600 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
