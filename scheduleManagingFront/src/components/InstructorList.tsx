import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Phone, X, MoreHorizontal, UserCircle2 } from 'lucide-react';

interface Instructor {
  id: number;
  name: string;
  phone: string;
  color: string;
  basic_pay: number;
  rate: number;
}

const InstructorList: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: '', phone: '', color: '#6366f1', basic_pay: 0, rate: 0
  });

  const fetchInstructors = async () => {
    try {
      const res = await api.get('/instructors');
      setInstructors(res.data);
    } catch(e) { console.error(e); }
  };

  useEffect(() => { fetchInstructors(); }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partner Directory</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-500">Manage your teaching staff and payroll.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Partner
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {instructors.map((ins) => (
          <div key={ins.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                  style={{ backgroundColor: ins.color }}
                >
                  {ins.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{ins.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500 font-medium">
                    <Phone size={12} /> {ins.phone}
                  </div>
                </div>
              </div>
              <button className="text-slate-300 dark:text-zinc-600 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"><MoreHorizontal size={20}/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-800/50">
                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Base Salary</p>
                <p className="text-sm font-bold tracking-tight text-slate-700 dark:text-zinc-200">₩{ins.basic_pay.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-800/50">
                <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-1">Commission</p>
                <p className="text-sm font-bold tracking-tight text-brand-600 dark:text-brand-400">₩{ins.rate.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
        {instructors.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50">
            <UserCircle2 size={48} className="text-slate-200 dark:text-zinc-800 mb-4" />
            <p className="text-slate-400 dark:text-zinc-600 font-medium">No partners found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorList;
