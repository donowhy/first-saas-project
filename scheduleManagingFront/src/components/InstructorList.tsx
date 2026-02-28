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
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-ui)] p-6 rounded-2xl shadow-[var(--shadow-card)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-main)]">Partners Directory</h1>
          <p className="text-sm text-[var(--text-muted)]">Manage teaching staff, payroll structures, and performance.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Add Partner
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {instructors.map((ins) => (
          <div key={ins.id} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-ui)] shadow-[var(--shadow-card)] hover:border-brand-500 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  style={{ backgroundColor: ins.color }}
                >
                  {ins.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-main)]">{ins.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1 font-medium">
                    <Phone size={12} /> {ins.phone}
                  </div>
                </div>
              </div>
              <button className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><MoreHorizontal size={20}/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[var(--bg-main)] rounded-xl border border-[var(--border-ui)]">
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Base Salary</p>
                <p className="text-sm font-bold text-[var(--text-main)]">₩{ins.basic_pay.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-[var(--bg-main)] rounded-xl border border-[var(--border-ui)]">
                <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mb-1">Session Rate</p>
                <p className="text-sm font-bold text-brand-600 dark:text-brand-400">₩{ins.rate.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
        {instructors.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-ui)] rounded-2xl bg-[var(--bg-card)]">
            <UserCircle2 size={48} className="text-[var(--text-muted)] mb-4" />
            <p className="text-[var(--text-muted)] font-medium">No partners found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorList;
