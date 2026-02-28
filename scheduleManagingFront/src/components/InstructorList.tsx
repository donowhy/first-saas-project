import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Phone, Palette, DollarSign, UserCheck, X, Award, MapPin, Briefcase } from 'lucide-react';

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
    const res = await api.get('/instructors');
    setInstructors(res.data);
  };

  useEffect(() => { fetchInstructors(); }, []);

  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/instructors', newInstructor);
    setShowAddModal(false);
    setNewInstructor({ name: '', phone: '', color: '#6366f1', basic_pay: 0, rate: 0 });
    fetchInstructors();
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Partners</h1>
          <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-[0.2em]">Manage your teaching staff</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="h-12 px-8 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} /> Onboard Instructor
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {instructors.map((ins) => (
          <div key={ins.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-indigo-500/30 transition-all duration-500 group relative overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className="flex items-start justify-between mb-10 relative z-10">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                style={{ backgroundColor: ins.color, boxShadow: `0 10px 30px ${ins.color}44` }}
              >
                {ins.name[0]}
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">Verified</span>
                <div className="flex items-center gap-1.5 mt-3 justify-end">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ins.color }}></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{ins.color}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{ins.name}</h3>
              <p className="text-xs font-bold text-slate-400 flex items-center gap-2 italic">
                <Phone size={12} className="text-indigo-500" /> {ins.phone}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4 relative z-10">
              <div className="p-4 bg-slate-50/50 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Base Salary</p>
                <p className="text-base font-black text-slate-800 tracking-tighter italic">₩{ins.basic_pay.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-indigo-50/30 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-indigo-100">
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">Commission</p>
                <p className="text-base font-black text-indigo-600 tracking-tighter italic">₩{ins.rate.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[2000] p-6 animate-in zoom-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 p-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 italic uppercase">Onboarding</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Register new partner</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-300">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddInstructor} className="space-y-5">
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                  <input required className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all" value={newInstructor.name} onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})} placeholder="Full name"/>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Contact</label>
                  <input required className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all" value={newInstructor.phone} onChange={(e) => setNewInstructor({...newInstructor, phone: e.target.value})} placeholder="010-0000-0000"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Monthly Base</label>
                  <input type="number" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold outline-none focus:bg-white transition-all" value={newInstructor.basic_pay} onChange={(e) => setNewInstructor({...newInstructor, basic_pay: parseInt(e.target.value) || 0})}/>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Rate per Class</label>
                  <input type="number" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold outline-none focus:bg-white transition-all" value={newInstructor.rate} onChange={(e) => setNewInstructor({...newInstructor, rate: parseInt(e.target.value) || 0})}/>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Assigned Theme</label>
                <input type="color" className="w-full h-16 p-1 rounded-2xl cursor-pointer bg-slate-50 border border-slate-200" value={newInstructor.color} onChange={(e) => setNewInstructor({...newInstructor, color: e.target.value})}/>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full h-16 bg-slate-900 text-white rounded-[1.25rem] font-black text-[15px] shadow-2xl hover:bg-black transition-all active:scale-[0.98] uppercase tracking-widest">
                  Save Instructor
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
