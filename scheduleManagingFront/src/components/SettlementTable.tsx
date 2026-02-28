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
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-ui)] p-6 rounded-2xl shadow-[var(--shadow-card)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-main)]">Financial Overview</h1>
          <p className="text-sm text-[var(--text-muted)]">Payroll processing and automated expenditure tracking.</p>
        </div>
        
        <div className="flex bg-[var(--bg-hover)] border border-[var(--border-ui)] p-1 rounded-xl shadow-sm">
          <select className="bg-transparent px-3 py-1.5 text-xs font-bold text-[var(--text-main)] outline-none cursor-pointer" value={selectedMonth.month} onChange={(e) => setSelectedMonth({...selectedMonth, month: parseInt(e.target.value)})}>
             {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m} className="bg-[var(--bg-card)]">{m} Month</option>)}
          </select>
          <button className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-muted)] transition-colors"><Download size={16} /></button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-ui)] shadow-[var(--shadow-card)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-brand-600"><Wallet size={80}/></div>
          <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1">Total Expenditure</p>
          <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight flex items-baseline gap-1">
             <span className="text-sm font-medium opacity-50">₩</span> {totalPayout.toLocaleString()}
          </h3>
          <div className="mt-4 flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
             <TrendingUp size={12}/> <span>Positive performance</span>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-ui)] shadow-[var(--shadow-card)]">
          <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1">Total Sessions</p>
          <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">
            {totalClasses} <span className="text-sm font-medium text-[var(--text-muted)]">Units</span>
          </h3>
          <div className="mt-4 flex items-center gap-2 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest">
             <Users size={14} className="text-brand-500" /> <span>{settlements.length} active partners</span>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-ui)] shadow-[var(--shadow-card)]">
           <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1">Process Reliability</p>
           <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">99.9<span className="text-sm font-medium opacity-50">%</span></h3>
           <div className="mt-4 flex items-center gap-1.5 text-brand-500 text-[10px] font-bold uppercase">
             <BarChart2 size={12} /> <span>Live tracking</span>
           </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-ui)] rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-[var(--bg-hover)] text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider border-b border-[var(--border-ui)]">
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4 text-center">Sessions</th>
                <th className="px-6 py-4 text-right">Fixed Pay</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4 text-right text-brand-600">Net Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-ui)] text-[var(--text-main)]">
              {settlements.map((s) => (
                <tr key={s.instructor_id} className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-hover)] border border-[var(--border-ui)] flex items-center justify-center font-bold text-xs">
                        {s.name[0]}
                      </div>
                      <span className="font-bold text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2.5 py-1 bg-[var(--bg-hover)] border border-[var(--border-ui)] rounded-lg text-xs font-bold">{s.session_count} Classes</span>
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-[var(--text-muted)] text-sm tabular-nums">₩{s.basic_pay.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-medium text-[var(--text-muted)] text-sm tabular-nums">₩{(s.session_count * s.per_session_rate).toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-bold text-[var(--text-main)] text-base tracking-tight italic">₩{s.total_salary.toLocaleString()}</td>
                </tr>
              ))}
              {settlements.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-muted)] text-sm font-medium">No payroll data available.</td>
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
