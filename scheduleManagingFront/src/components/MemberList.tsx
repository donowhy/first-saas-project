import React, { useState, useEffect, Fragment } from 'react';
import api from '../api';
import { 
  User, Shield, ChevronRight, Phone, Search, 
  Plus, X, Clock, Calendar, Hash, UserCircle2
} from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

// [Gemini Update]: 회원 관리 - 실제 API 연동 완료
// GET /api/members, POST /api/members 연결

interface Member {
  id: number;
  name: string;
  phone: string;
}

interface MemberListProps {
  onSelectMember: (id: number) => void;
  onJumpToInstructor: (id: number) => void;
}

const MemberList: React.FC<MemberListProps> = ({ onSelectMember }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [formData, setFormData] = useState({ name: '', phone: '' });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/members');
      setMembers(res.data.data || res.data);
    } catch (e) {
      console.error("회원 데이터 로드 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/members', formData);
      const newMember = res.data.data || res.data;
      setMembers(prev => [...prev, newMember]);
      setIsOpen(false);
      setFormData({ name: '', phone: '' });
    } catch (err) {
      alert("회원 등록에 실패했습니다.");
    }
  };

  const openMemberDetail = (m: Member) => {
    setSelectedMember(m);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">회원 리스트</h1>
          <p className="text-slate-500 font-medium mt-2">등록된 모든 회원의 수강 정보와 연락처를 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input type="text" placeholder="이름 검색" className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:border-indigo-600 outline-none transition-all shadow-sm" />
          </div>
          <button onClick={() => setIsOpen(true)} className="px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all text-sm flex items-center gap-2">
            <Plus size={18} /> 신규 회원 등록
          </button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-100/30 transition-all cursor-pointer"
              onClick={() => openMemberDetail(member)}
            >
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-xl text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all">{member.name[0]}</div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{member.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mt-1"><Phone size={14} className="text-slate-200" /> {member.phone}</div>
                  </div>
                </div>
                <ChevronRight size={22} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between group-hover:bg-indigo-50/50 transition-all">
                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest"><Shield size={14} className="text-indigo-400" /> 수강 중</div>
                <div className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-tighter text-slate-400">Regular</div>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white border border-slate-100 rounded-[3rem]">
              <UserCircle2 size={48} className="mx-auto text-slate-100 mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">등록된 회원이 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* Member Detail Panel */}
      <Transition show={isDetailOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsDetailOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-2xl border-l border-slate-100">
                      <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                        <div className="flex items-center justify-between mb-8">
                          <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Member Profile</div>
                          <button onClick={() => setIsDetailOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={24}/></button>
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100">{selectedMember?.name?.[0] || 'M'}</div>
                          <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedMember?.name}</h2>
                            <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-2"><Phone size={14}/> {selectedMember?.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">수강 히스토리 (Timeline)</h3>
                        <div className="space-y-10 relative">
                          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                          {[
                            { title: "필라테스 중급반", date: "2026.03.01", time: "14:00", instructor: "이혜진", status: "출석" },
                            { title: "필라테스 중급반", date: "2026.02.26", time: "14:00", instructor: "이혜진", status: "출석" },
                          ].map((item, i) => (
                            <div key={i} className="relative pl-10 group">
                              <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm ${item.status === '출석' ? 'bg-indigo-600' : 'bg-rose-400'}`}></div>
                              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-50 group-hover:border-indigo-100 transition-all">
                                <p className="text-sm font-black text-slate-900">{item.title}</p>
                                <p className="text-[11px] font-bold text-slate-400 mt-1">{item.date} • {item.instructor} 강사</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Registration Modal */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" /></Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform rounded-[3rem] bg-white p-12 shadow-2xl transition-all border border-white">
                <Dialog.Title as="h3" className="text-2xl font-black text-slate-900 mb-10 uppercase italic">New Member</Dialog.Title>
                <form onSubmit={handleAddMember} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">회원 성함</label>
                    <input type="text" required className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" placeholder="홍길동" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">연락처</label>
                    <input type="text" required className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" placeholder="010-0000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all mt-6 uppercase tracking-widest">회원 등록 완료</button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MemberList;
