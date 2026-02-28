import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Phone, Mail, Search, Filter, ShieldCheck, MoreVertical } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  phone: string;
  instructor_id: number;
  instructor_name?: string;
}

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/members').catch(()=>({data:[]}));
        setMembers(res.data);
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members Database</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-500">Centralized client management system.</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm">
          <Plus size={18} className="inline mr-2" /> New Member
        </button>
      </header>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 dark:bg-zinc-900/50">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="w-full h-10 pl-10 pr-4 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-brand-500 transition-all" placeholder="Search members..." />
          </div>
          <button className="h-10 px-4 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-slate-500 flex items-center gap-2">
            <Filter size={14} /> Advanced Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/30 dark:bg-zinc-900/30 text-slate-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-800">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-600 dark:text-zinc-300">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{member.name}</p>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Active</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium"><Phone size={12} className="inline mr-1 text-slate-300" /> {member.phone}</p>
                      <p className="text-xs text-slate-400"><Mail size={12} className="inline mr-1" /> {member.name.toLowerCase().replace(' ','')}@nexus.com</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {member.instructor_name ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                        <ShieldCheck size={14} className="text-brand-500" /> {member.instructor_name}
                      </span>
                    ) : (
                      <span className="text-slate-300 dark:text-zinc-700 text-xs font-bold italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
