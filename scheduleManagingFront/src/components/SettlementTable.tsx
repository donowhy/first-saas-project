import React, { useState, useEffect } from 'react';
import api from '../api';
import { Download, TrendingUp, Users, Wallet, BarChart2 } from 'lucide-react';

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-500">Automated payroll and expenditure metrics.</p>
        </div>
        
        <div className="flex bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1 rounded-xl shadow-sm">
          <select className="bg-transparent px-3 py-1.5 text-xs font-bold outline-none cursor-pointer" value={selectedMonth.month} onChange={(e) => setSelectedMonth({...selectedMonth, month: parseInt(e.target.value)})}>
             {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m} className="dark:bg-zinc-900">{m} Month</option>)}
          </select>
          <button className="p-1.5 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg text-slate-400"><Download size={16} /></button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-brand-600"><Wallet size={80}/></div>
          <p className="text-slate-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Payout</p>
          <h3 className="text-2xl font-bold tracking-tight flex items-baseline gap-1">
             <span className="text-sm font-medium opacity-50">₩</span> {totalPayout.toLocaleString()}
          </h3>
          <div className="mt-4 flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
             <TrendingUp size={12}/> <span>Healthy cashflow</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <p className="text-slate-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Class Volume</p>
          <h3 className="text-2xl font-bold tracking-tight">
            {totalClasses} <span className="text-sm font-medium text-slate-300">Sessions</span>
          </h3>
          <div className="mt-4 flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
             <Users size={14} className="text-brand-500" /> <span>{settlements.length} Partners</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
           <p className="text-slate-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">System Efficiency</p>
           <h3 className="text-2xl font-bold tracking-tight">99.9<span className="text-sm font-medium opacity-50">%</span></h3>
           <div className="mt-4 flex items-center gap-1.5 text-brand-500 text-[10px] font-bold uppercase">
             <BarChart2 size={12} /> <span>Live tracking</span>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-zinc-900/50 text-slate-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800">
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4 text-center">Classes</th>
                <th className="px-6 py-4 text-right">Fixed</th>
                <th className="px-6 py-4 text-right">Variable</th>
                <th className="px-6 py-4 text-right text-brand-600 dark:text-brand-400">Total Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {settlements.map((s) => (
                <tr key={s.instructor_id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                        {s.name[0]}
                      </div>
                      <span className="font-bold text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2.5 py-1 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs font-bold">{s.session_count} Sessions</span>
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-slate-400 text-sm tabular-nums">₩{s.basic_pay.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-medium text-slate-400 text-sm tabular-nums">₩{(s.session_count * s.per_session_rate).toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white text-base tracking-tight italic">₩{s.total_salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettlementTable;
