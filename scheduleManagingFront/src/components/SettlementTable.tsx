import React, { useState, useEffect } from 'react';
import api from '../api';
import { Download, TrendingUp, Users, Wallet, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';

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
    const res = await api.get(`/settlements/${selectedMonth.year}/${selectedMonth.month}`);
    setSettlements(res.data);
  };

  useEffect(() => { fetchData(); }, [selectedMonth]);

  const totalPayout = settlements.reduce((acc, curr) => acc + curr.total_salary, 0);
  const totalClasses = settlements.reduce((acc, curr) => acc + curr.session_count, 0);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Settlement</h1>
          <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-[0.2em]">Automated payroll management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
            <select className="bg-transparent px-4 py-2 text-[11px] font-black text-slate-600 outline-none uppercase" value={selectedMonth.year} onChange={(e) => setSelectedMonth({...selectedMonth, year: parseInt(e.target.value)})}>
              {[2025, 2026].map(y => <option key={y} value={y}>{y} FY</option>)}
            </select>
            <div className="w-px h-4 bg-slate-100 self-center"></div>
            <select className="bg-transparent px-4 py-2 text-[11px] font-black text-slate-600 outline-none uppercase" value={selectedMonth.month} onChange={(e) => setSelectedMonth({...selectedMonth, month: parseInt(e.target.value)})}>
              {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m}>{m} Month</option>)}
            </select>
          </div>
          <button className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center justify-center shadow-sm"><Download size={18} /></button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-950 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-700 text-white"><PieChart size={120} /></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1">Gross Expenditure</p>
          <h3 className="text-4xl font-black text-white italic tracking-tighter flex items-end gap-2">
             <span className="text-xl font-medium opacity-30 italic">₩</span> {totalPayout.toLocaleString()}
          </h3>
          <div className="mt-10 flex items-center gap-2 text-indigo-400 text-[11px] font-bold uppercase tracking-widest bg-indigo-500/10 w-fit px-3 py-1 rounded-lg border border-indigo-500/20">
             <TrendingUp size={12}/> <span>Forecast Stable</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-[0_2px_40px_rgba(0,0,0,0.02)] group hover:border-indigo-500/30 transition-colors">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1">Studio Engagement</p>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">
            {totalClasses} <span className="text-xl font-bold text-slate-200 tracking-normal">Sessions</span>
          </h3>
          <div className="mt-10 flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
             <Users size={14} className="text-indigo-500" /> <span>{settlements.length} active partners</span>
          </div>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100/50 p-10 rounded-[2.5rem] relative overflow-hidden group">
           <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1">Operational Efficiency</p>
           <h3 className="text-4xl font-black text-indigo-900 italic tracking-tighter uppercase">
             98.2<span className="text-xl opacity-40">%</span>
           </h3>
           <p className="text-indigo-300 text-[11px] font-bold mt-10 tracking-tight flex items-center gap-1.5 uppercase">
             <ArrowUpRight size={14} /> Optimized performance
           </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_24px_80px_rgba(0,0,0,0.02)] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="px-10 py-6">Partner Name</th>
              <th className="px-10 py-6 text-center">Class Volume</th>
              <th className="px-10 py-6 text-right">Fixed Remuneration</th>
              <th className="px-10 py-6 text-right">Variable Incentive</th>
              <th className="px-10 py-6 text-right">Net Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {settlements.map((s) => (
              <tr key={s.instructor_id} className="hover:bg-indigo-50/30 transition-all duration-300">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm italic">{s.name[0]}</div>
                    <span className="font-black text-slate-800 text-[15px] uppercase tracking-tight">{s.name}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-center">
                  <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-full text-[11px] font-black italic shadow-sm tracking-tighter">{s.session_count} Classes</span>
                </td>
                <td className="px-10 py-8 text-right font-bold text-slate-400 text-[13px] tabular-nums">₩{s.basic_pay.toLocaleString()}</td>
                <td className="px-10 py-8 text-right font-black text-indigo-500 text-[13px] tabular-nums italic">₩{(s.session_count * s.per_session_rate).toLocaleString()}</td>
                <td className="px-10 py-8 text-right">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter italic">₩{s.total_salary.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettlementTable;
