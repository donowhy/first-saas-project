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
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-ui)] p-6 rounded-2xl shadow-[var(--shadow-card)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-main)]">Members Database</h1>
          <p className="text-sm text-[var(--text-muted)]">Manage your clients and their assigned partners.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Member
        </button>
      </header>

      <div className="bg-[var(--bg-card)] border border-[var(--border-ui)] rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border-ui)] flex flex-col sm:flex-row justify-between gap-4 bg-[var(--bg-hover)]">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input className="w-full h-10 pl-10 pr-4 bg-[var(--bg-card)] border border-[var(--border-ui)] rounded-xl text-sm text-[var(--text-main)] outline-none focus:border-brand-500 transition-all" placeholder="Search members..." />
          </div>
          <button className="h-10 px-4 bg-[var(--bg-card)] border border-[var(--border-ui)] rounded-xl text-xs font-bold text-[var(--text-main)] flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors">
            <Filter size={14} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-[var(--bg-hover)] text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-wider border-b border-[var(--border-ui)]">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-ui)] text-[var(--text-main)]">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-hover)] border border-[var(--border-ui)] flex items-center justify-center font-bold text-[var(--text-main)]">
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
                      <p className="text-sm font-medium"><Phone size={12} className="inline mr-1 text-[var(--text-muted)]" /> {member.phone}</p>
                      <p className="text-xs text-[var(--text-muted)]"><Mail size={12} className="inline mr-1" /> {member.name.toLowerCase().replace(' ','')}@nexus.com</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {member.instructor_name ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-hover)] border border-[var(--border-ui)] rounded-lg text-xs font-bold">
                        <ShieldCheck size={14} className="text-brand-500" /> {member.instructor_name}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)] text-xs italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-[var(--bg-hover)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><MoreVertical size={18}/></button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[var(--text-muted)] text-sm font-medium">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
