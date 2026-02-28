import React, { useState, useEffect } from 'react';
import api from '../api';
import { User, Calendar, Shield, ExternalLink, ChevronRight, Phone, Mail } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  phone: string;
  instructor_id: number;
  instructor_name?: string;
}

interface MemberListProps {
  onSelectMember: (id: number) => void;
  onJumpToInstructor: (id: number) => void;
}

const MemberList: React.FC<MemberListProps> = ({ onSelectMember, onJumpToInstructor }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/members')
      .then(res => setMembers(res.data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="card-base group overflow-hidden hover:border-brand-500 transition-all cursor-pointer"
            onClick={() => onSelectMember(member.id)}
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-hover)] border border-[var(--border-ui)] flex items-center justify-center font-bold text-lg text-[var(--text-main)] group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-main)]">{member.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-0.5">
                    <Phone size={12} /> {member.phone}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="px-5 py-3 bg-[var(--bg-hover)] border-t border-[var(--border-ui)] flex items-center justify-between">
              <div 
                className="flex items-center gap-2 text-xs font-bold text-brand-600 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  if (member.instructor_id) onJumpToInstructor(member.instructor_id);
                }}
              >
                <Shield size={14} /> {member.instructor_name || 'Unassigned'}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Active Plan</div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && !loading && (
        <div className="py-20 text-center card-base">
          <User size={40} className="mx-auto text-[var(--border-ui)] mb-4" />
          <p className="text-[var(--text-muted)] font-medium">No members enrolled.</p>
        </div>
      )}
    </div>
  );
};

export default MemberList;
