import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, User, Phone, UserCheck, X, Search, Filter, Mail, MoreHorizontal } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  phone: string;
  instructor_id: number;
  instructor_name?: string;
}

interface Instructor {
  id: number;
  name: string;
}

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', phone: '', instructor_id: 0 });

  const fetchData = async () => {
    const [memRes, insRes] = await Promise.all([api.get('/members'), api.get('/instructors')]);
    setMembers(memRes.data);
    setInstructors(insRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/members', newMember);
    setShowAddModal(false);
    setNewMember({ name: '', phone: '', instructor_id: 0 });
    fetchData();
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Members</h1>
          <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-[0.2em]">Customer relations database</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} /> Add Participant
        </button>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_2px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="w-full h-12 pl-13 pr-6 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300" placeholder="Search members by name..." />
          </div>
          <div className="flex gap-3">
             <button className="h-12 px-6 bg-white border border-slate-200 rounded-2xl text-[12px] font-bold text-slate-500 flex items-center gap-2 hover:bg-slate-50 transition-all">
               <Filter size={14} /> Advanced Filter
             </button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="px-10 py-6">Identity</th>
              <th className="px-10 py-6">Communications</th>
              <th className="px-10 py-6 text-center">Designated Partner</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-indigo-50/30 transition-all duration-300 group">
                <td className="px-10 py-7">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-base tracking-tight">{member.name}</p>
                      <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded">Active</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-7">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[13px] italic tracking-tight">
                       <Phone size={12} className="text-slate-300" /> {member.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 font-medium text-[11px]">
                       <Mail size={12} /> {member.name.toLowerCase()}@flow.com
                    </div>
                  </div>
                </td>
                <td className="px-10 py-7 text-center">
                  {member.instructor_name ? (
                    <div className="inline-flex px-4 py-2 bg-slate-900 text-white rounded-xl text-[11px] font-black italic tracking-tighter shadow-xl shadow-slate-200 border border-slate-800">
                       <UserCheck size={12} className="mr-2 text-indigo-400" /> {member.instructor_name}
                    </div>
                  ) : (
                    <span className="text-slate-200 text-[11px] font-bold uppercase tracking-widest">No Partner</span>
                  )}
                </td>
                <td className="px-10 py-7 text-right">
                   <button className="w-10 h-10 rounded-full hover:bg-white border border-transparent hover:border-slate-200 flex items-center justify-center ml-auto text-slate-300 hover:text-slate-900 transition-all">
                     <MoreHorizontal size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[2000] p-6 animate-in zoom-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-slate-100 p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900 italic uppercase">New Member</h3>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-300"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Student Name</label>
                <input required className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all" value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} placeholder="Full Name"/>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Phone Number</label>
                <input required className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all" value={newMember.phone} onChange={(e) => setNewMember({...newMember, phone: e.target.value})} placeholder="010-0000-0000"/>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Assign Partner</label>
                <select className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all appearance-none" value={newMember.instructor_id} onChange={(e) => setNewMember({...newMember, instructor_id: parseInt(e.target.value)})}>
                  <option value={0}>Select Instructor</option>
                  {instructors.map(ins => <option key={ins.id} value={ins.id}>{ins.name}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full h-16 bg-slate-900 text-white rounded-[1.25rem] font-black text-[15px] shadow-2xl hover:bg-black transition-all active:scale-[0.98] uppercase tracking-widest">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberList;
