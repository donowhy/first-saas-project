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
    name: '', phone: '', color: '#818cf8', basic_pay: 0, rate: 0
  });

  const fetchInstructors = async () => {
    try {
      const res = await api.get('/instructors');
      setInstructors(res.data);
    } catch(e) { console.error(e); }
  };

  useEffect(() => { fetchInstructors(); }, []);

  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/instructors', newInstructor);
    setShowAddModal(false);
    setNewInstructor({ name: '', phone: '', color: '#818cf8', basic_pay: 0, rate: 0 });
    fetchInstructors();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Partners Directory</h1>
          <p className="text-sm font-medium text-zinc-400 mt-1">Manage teaching staff, salaries, and performance.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="glow-effect h-11 px-6 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} /> Invite Partner
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {instructors.map((ins) => (
          <div key={ins.id} className="glass-panel p-6 rounded-3xl group relative overflow-hidden transition-all duration-300 hover:bg-zinc-900/80 hover:border-zinc-700">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl rounded-full pointer-events-none transition-opacity group-hover:opacity-40" style={{ backgroundColor: ins.color }}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/10"
                  style={{ backgroundColor: ins.color }}
                >
                  {ins.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">{ins.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5 font-medium">
                    <Phone size={12} /> {ins.phone}
                  </div>
                </div>
              </div>
              <button className="text-zinc-600 hover:text-zinc-300 transition-colors p-1"><MoreHorizontal size={20}/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1">Monthly Base</p>
                <p className="text-lg font-bold text-zinc-200">₩{ins.basic_pay.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                <p className="text-[10px] font-medium text-brand-400 uppercase tracking-wider mb-1">Rate / Class</p>
                <p className="text-lg font-bold text-white">₩{ins.rate.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
        {instructors.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <UserCircle2 size={48} className="text-zinc-700 mb-4" />
            <p className="text-zinc-400 font-medium">No partners found. Add your first instructor.</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[2000] p-4 animate-in zoom-in-95 duration-200">
          <div className="bg-zinc-950 w-full max-w-md rounded-3xl shadow-2xl border border-zinc-800 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-fuchsia-500"></div>
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Onboard Partner</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400"><X size={20} /></button>
            </div>

            <form onSubmit={handleAddInstructor} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Full Name</label>
                <input required className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-zinc-600" value={newInstructor.name} onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})} placeholder="e.g. Jane Doe"/>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Contact Number</label>
                <input required className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-zinc-600" value={newInstructor.phone} onChange={(e) => setNewInstructor({...newInstructor, phone: e.target.value})} placeholder="010-0000-0000"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Base Salary (₩)</label>
                  <input type="number" className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 transition-all" value={newInstructor.basic_pay || ''} onChange={(e) => setNewInstructor({...newInstructor, basic_pay: parseInt(e.target.value) || 0})}/>
                </div>
                <div>
                  <label className="text-xs font-medium text-brand-400 mb-1.5 block">Rate per Class (₩)</label>
                  <input type="number" className="w-full h-12 bg-zinc-900 border border-brand-500/30 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 transition-all bg-brand-500/5" value={newInstructor.rate || ''} onChange={(e) => setNewInstructor({...newInstructor, rate: parseInt(e.target.value) || 0})}/>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Brand Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-zinc-900 border border-zinc-800" value={newInstructor.color} onChange={(e) => setNewInstructor({...newInstructor, color: e.target.value})}/>
                  <span className="text-sm font-mono text-zinc-500 uppercase">{newInstructor.color}</span>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full h-12 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all active:scale-[0.98]">
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorList;
