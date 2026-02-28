import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Phone, Mail, X, Search, Filter, ShieldCheck, MoreVertical } from 'lucide-react';

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
    try {
      const [memRes, insRes] = await Promise.all([
        api.get('/members').catch(()=>({data:[]})), 
        api.get('/instructors').catch(()=>({data:[]}))
      ]);
      setMembers(memRes.data);
      setInstructors(insRes.data);
    } catch (e) { console.error(e); }
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
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Members Database</h1>
          <p className="text-sm font-medium text-zinc-400 mt-1">Manage your clients and their designated partners.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="glow-effect h-11 px-6 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        >
          <Plus size={18} /> New Member
        </button>
      </header>

      <div className="glass-panel border border-zinc-800/60 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/20">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input className="w-full h-10 pl-11 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-zinc-600" placeholder="Search members..." />
          </div>
          <button className="h-10 px-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 flex items-center gap-2 hover:bg-zinc-800 transition-all">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-zinc-900/40 text-zinc-500 text-[10px] font-bold uppercase tracking-wider border-b border-zinc-800/50">
                <th className="px-6 py-4">Client Profile</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Assigned Partner</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-900/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center font-bold text-sm">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100 text-sm">{member.name}</p>
                        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full mt-1 inline-block">Active</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-zinc-300 font-medium text-xs">
                         <Phone size={12} className="text-zinc-500" /> {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 font-medium text-xs">
                         <Mail size={12} /> {member.name.toLowerCase().replace(' ', '')}@example.com
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {member.instructor_name ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-xs font-semibold text-zinc-200">
                         <ShieldCheck size={14} className="text-brand-400" /> {member.instructor_name}
                      </div>
                    ) : (
                      <span className="text-zinc-600 text-xs font-medium">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                     <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors">
                       <MoreVertical size={18} />
                     </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                 <tr>
                   <td colSpan={4} className="px-6 py-16 text-center text-zinc-500 text-sm font-medium">
                     No members enrolled yet.
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[2000] p-4 animate-in zoom-in-95 duration-200">
          <div className="bg-zinc-950 w-full max-w-md rounded-3xl shadow-2xl border border-zinc-800 p-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Add Client</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Full Name</label>
                <input required className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-zinc-600" value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} placeholder="e.g. John Smith"/>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Phone Number</label>
                <input required className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-zinc-600" value={newMember.phone} onChange={(e) => setNewMember({...newMember, phone: e.target.value})} placeholder="010-0000-0000"/>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Assign Partner (Optional)</label>
                <select className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all appearance-none" value={newMember.instructor_id} onChange={(e) => setNewMember({...newMember, instructor_id: parseInt(e.target.value)})}>
                  <option value={0}>No partner assigned</option>
                  {instructors.map(ins => <option key={ins.id} value={ins.id}>{ins.name}</option>)}
                </select>
              </div>
              <div className="pt-6">
                <button type="submit" className="w-full h-12 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]">Save Client Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberList;
