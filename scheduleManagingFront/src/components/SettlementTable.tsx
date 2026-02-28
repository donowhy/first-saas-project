import React, { useState, useEffect } from 'react';
import api from '../api';
import { Download, TrendingUp, Users, Activity, BarChart2 } from 'lucide-react';

interface Settlement {
  instructor_id: number;
  name: string;
  basic_pay: number;
  per_session_rate: number;
  session_count: number;
  total_salary: number;
}

const SettlementTable: React.FC = () => {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [selectedMonth, setSelectedMonth] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });

  const fetchData = async () => {
    try {
      const res = await api.get(`/settlements/${selectedMonth.year}/${selectedMonth.month}`).catch(()=>({data:[]}));
      setSettlements(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(); }, [selectedMonth]);

  const totalPayout = settlements.reduce((acc, curr) => acc + curr.total_salary, 0);
  const totalClasses = settlements.reduce((acc, curr) => acc + curr.session_count, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Financial Dashboard</h1>
          <p className="text-sm font-medium text-zinc-400 mt-1">Real-time payroll and operational metrics.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-sm">
            <select className="bg-transparent px-3 py-1.5 text-xs font-semibold text-zinc-300 outline-none cursor-pointer" value={selectedMonth.year} onChange={(e) => setSelectedMonth({...selectedMonth, year: parseInt(e.target.value)})}>
              {[2025, 2026].map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
            </select>
            <div className="w-px h-4 bg-zinc-800 self-center"></div>
            <select className="bg-transparent px-3 py-1.5 text-xs font-semibold text-zinc-300 outline-none cursor-pointer" value={selectedMonth.month} onChange={(e) => setSelectedMonth({...selectedMonth, month: parseInt(e.target.value)})}>
              {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m} className="bg-zinc-900">{m.toString().padStart(2,'0')} / Month</option>)}
            </select>
          </div>
          <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all flex items-center justify-center"><Download size={16} /></button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Metric */}
        <div className="relative p-6 rounded-3xl overflow-hidden border border-brand-500/30 bg-zinc-900/50 backdrop-blur-xl group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-transparent z-0 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-brand-400 tracking-wider uppercase">Gross Expenditure</p>
              <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400"><TrendingUp size={16}/></div>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1">
               <span className="text-lg text-zinc-500 font-normal">₩</span> {totalPayout.toLocaleString()}
            </h3>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
               +12% vs last month
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-zinc-800/60">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Volume Delivered</p>
            <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><Activity size={16}/></div>
          </div>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            {totalClasses} <span className="text-sm font-medium text-zinc-500 tracking-normal ml-1">Sessions</span>
          </h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-400">
             <Users size={14} className="text-zinc-500" /> {settlements.length} active partners contributing
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-zinc-800/60">
           <div className="flex justify-between items-start mb-4">
             <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Net Margin Avg</p>
             <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><BarChart2 size={16}/></div>
           </div>
           <h3 className="text-3xl font-bold text-white tracking-tight">
             68.4<span className="text-lg text-zinc-500 font-normal ml-1">%</span>
           </h3>
           <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
             <div className="bg-brand-500 h-full rounded-full" style={{ width: '68.4%' }}></div>
           </div>
        </div>
      </div>

      <div className="glass-panel border border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-zinc-800/50 bg-zinc-900/30">
          <h3 className="text-sm font-semibold text-white">Partner Remuneration Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-zinc-900/40 text-zinc-500 text-[10px] font-bold uppercase tracking-wider border-b border-zinc-800/50">
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4 text-center">Volume</th>
                <th className="px-6 py-4 text-right">Base</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4 text-right text-brand-400">Net Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {settlements.map((s) => (
                <tr key={s.instructor_id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-xs border border-zinc-700">
                        {s.name[0]}
                      </div>
                      <span className="font-semibold text-zinc-200 text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-md text-xs font-semibold border border-zinc-700/50">{s.session_count} cls</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-zinc-400 text-sm tabular-nums">₩{s.basic_pay.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-medium text-zinc-300 text-sm tabular-nums">₩{(s.session_count * s.per_session_rate).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-base font-bold text-white tabular-nums tracking-tight">₩{s.total_salary.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
              {settlements.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 text-sm font-medium">No settlement data available for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettlementTable;
