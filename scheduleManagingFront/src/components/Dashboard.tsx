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
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card-base p-5 group hover:border-brand-500 cursor-pointer">
            <div className="flex justify-between items-start mb-4 text-[var(--text-muted)]">
              <div className="p-2 bg-[var(--bg-hover)] rounded-lg group-hover:text-brand-500 transition-colors">
                {stat.icon}
              </div>
              <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)] mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 card-base p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--text-main)]">Today's Schedule</h3>
            <button className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-ui)] hover:bg-[var(--bg-hover)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-hover)] flex flex-col items-center justify-center border border-[var(--border-ui)] text-[var(--text-main)]">
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">AM</span>
                    <span className="text-sm font-bold leading-none mt-0.5">09</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">Advanced Pilates Core</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Sarah Kim • Studio A</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-8 h-8 rounded-full border-2 border-[var(--bg-card)] bg-[var(--bg-hover)] overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${j+i*10}`} alt="avatar" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--bg-card)] bg-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-[var(--text-muted)]">+2</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Revenue Overview */}
        <div className="space-y-6">
          <div className="card-base p-6">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-4 uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-4 rounded-xl border border-[var(--border-ui)] hover:bg-[var(--bg-hover)] hover:border-brand-300 transition-all text-[var(--text-main)]">
                <Users size={24} className="mb-2 text-brand-500" />
                <span className="text-xs font-semibold">New Client</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-xl border border-[var(--border-ui)] hover:bg-[var(--bg-hover)] hover:border-emerald-300 transition-all text-[var(--text-main)]">
                <Calendar size={24} className="mb-2 text-emerald-500" />
                <span className="text-xs font-semibold">Book Slot</span>
              </button>
            </div>
          </div>

          <div className="card-base p-6 bg-gradient-to-br from-brand-600 to-brand-900 border-none text-white relative overflow-hidden">
             <div className="absolute right-[-10%] bottom-[-10%] opacity-10"><TrendingUp size={120} /></div>
             <p className="text-xs font-medium opacity-80 mb-1">Pending Settlement</p>
             <h4 className="text-3xl font-bold tracking-tight mb-6">₩4,280,000</h4>
             <button className="w-full py-2.5 bg-white text-brand-900 rounded-lg text-sm font-bold hover:bg-brand-50 transition-colors">Process Payroll</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
