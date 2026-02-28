import React, { useState, useEffect, Fragment } from 'react';
import api from '../api';
import { Plus, Phone, MoreHorizontal, UserCircle2, Award, DollarSign, X, Check } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

// [Gemini Update]: 강사 관리 - 실제 API 연동 완료
// GET /api/instructors, POST /api/instructors 연결

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
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '', phone: '', color: '#6366f1', basic_pay: '', rate: ''
  });

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const res = await api.get('/instructors');
      // ApiResponse 구조 대응 (res.data.data)
      setInstructors(res.data.data || res.data);
    } catch (e) {
      console.error("데이터 로드 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInstructors(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        basic_pay: Number(formData.basic_pay),
        rate: Number(formData.rate)
      };
      const res = await api.post('/instructors', payload);
      const newInstructor = res.data.data || res.data;
      setInstructors(prev => [...prev, newInstructor]);
      setIsOpen(false);
      setFormData({ name: '', phone: '', color: '#6366f1', basic_pay: '', rate: '' });
    } catch (err) {
      alert("강사 등록에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">파트너 강사 관리</h1>
          <p className="text-slate-500 font-medium mt-2">센터의 소중한 자산인 강사님들의 정보와 정산 체계를 관리합니다.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 text-sm"
        >
          <Plus size={18} /> 강사 신규 등록
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((ins) => (
            <div key={ins.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:border-indigo-100 transition-all group overflow-hidden relative">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100/50 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: ins.color }}
                  >
                    {ins.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{ins.name} 강사</h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs mt-1">
                      <Phone size={14} className="text-slate-300" /> {ins.phone}
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={20}/></button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Base Salary</p>
                  <p className="text-lg font-black text-slate-900 tracking-tight">₩{ins.basic_pay.toLocaleString()}</p>
                </div>
                <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-50 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 italic group-hover:text-indigo-100">Session Rate</p>
                  <p className="text-lg font-black text-indigo-600 tracking-tight group-hover:text-white">₩{ins.rate.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Active Partner</span>
                 <button className="text-indigo-600 font-black text-xs hover:underline underline-offset-4">상세 프로필 보기</button>
              </div>
            </div>
          ))}
          {instructors.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
              <UserCircle2 size={40} className="text-slate-300 mb-4" />
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest">등록된 파트너가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* Registration Modal */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-[3rem] bg-white p-12 text-left align-middle shadow-2xl transition-all border border-white">
                  <div className="flex justify-between items-center mb-10">
                    <Dialog.Title as="h3" className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">NEW PARTNER</Dialog.Title>
                    <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"><X size={20}/></button>
                  </div>

                  <form onSubmit={handleAdd} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">강사 성함</label>
                        <input type="text" required className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" placeholder="김지수" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">연락처</label>
                        <input type="text" required className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" placeholder="010-0000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">월 기본급 (₩)</label>
                        <input type="number" required className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" placeholder="2,000,000" value={formData.basic_pay} onChange={e => setFormData({...formData, basic_pay: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">회당 수업료 (₩)</label>
                        <input type="number" required className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" placeholder="30,000" value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">캘린더 표시 색상</label>
                      <div className="flex gap-4">
                        {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'].map(c => (
                          <button key={c} type="button" onClick={() => setFormData({...formData, color: c})} className={`w-12 h-12 rounded-xl border-4 transition-all ${formData.color === c ? 'border-slate-900 scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`} style={{ backgroundColor: c }}>
                            {formData.color === c && <Check className="mx-auto text-white" size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button type="submit" className="w-full h-16 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all mt-4 uppercase tracking-widest">강사 등록 완료</button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default InstructorList;
