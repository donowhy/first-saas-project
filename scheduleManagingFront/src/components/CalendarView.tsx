import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api';
import { Plus, X, AlertCircle, Users, Trash2 } from 'lucide-react';

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [error, setError] = useState('');
  
  const today = new Date().toISOString().split('T')[0];
  const isMobile = window.innerWidth < 768;

  const fetchData = async () => {
    try {
      const [resRes, memRes, insRes] = await Promise.all([
        api.get('/reservations'),
        api.get('/members'),
        api.get('/instructors')
      ]);

      const groups: Record<string, any> = {};
      resRes.data.forEach((res: any) => {
        const key = `${res.start_time}_${res.instructor_id}`;
        if (!groups[key]) {
          groups[key] = {
            id: key,
            db_ids: [],
            instructor_name: res.instructor_name,
            instructor_color: res.color,
            start: res.start_time,
            end: res.end_time,
            members: []
          };
        }
        groups[key].members.push(res);
        groups[key].db_ids.push(res.id);
      });

      setEvents(Object.values(groups).map((group: any) => ({
        id: group.id,
        title: group.instructor_name,
        start: group.start,
        end: group.end,
        backgroundColor: group.instructor_color,
        borderColor: group.instructor_color,
        extendedProps: { ...group }
      })) as any);
      
      setMembers(memRes.data);
      setInstructors(insRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleEventChange = async (changeInfo: any) => {
    const { event } = changeInfo;
    try {
      await Promise.all(event.extendedProps.db_ids.map((id: number) => 
        api.patch(`/reservations/${id}`, { start_time: event.startStr, end_time: event.endStr })
      ));
      fetchData();
    } catch (err) { changeInfo.revert(); }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 캘린더 상단 컨트롤 */}
      <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h2 className="text-lg font-black text-slate-900 italic uppercase">Scheduler</h2>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest hidden md:block">Real-time Class Management</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={16} strokeWidth={3} /> <span className="hidden md:inline">BOOKING</span>
        </button>
      </div>

      {/* 메인 캘린더 영역 */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-4 md:p-8 shadow-sm overflow-hidden min-h-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: isMobile ? 'timeGridDay,timeGridWeek' : 'timeGridWeek,timeGridDay,today'
          }}
          events={events}
          height="auto" /* 고정 높이 대신 내용물에 맞춰 확장되도록 설정 */
          slotMinTime="09:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          locale="ko"
          editable={true}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          nowIndicator={true}
          slotDuration="00:30:00"
          eventClick={(info) => setSelectedSlot(info.event.extendedProps)}
          eventContent={(arg) => {
            const count = arg.event.extendedProps.members.length;
            return (
              <div className="h-full p-2 flex flex-col justify-between overflow-hidden text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black truncate uppercase tracking-tighter">{arg.event.title}</span>
                  <div className="bg-black/20 px-1 rounded text-[9px] font-black">{count}/6</div>
                </div>
                <div className="text-[8px] font-bold opacity-60 italic leading-none">{arg.timeText}</div>
              </div>
            );
          }}
        />
      </div>

      {/* 우측 상세 명단 패널 */}
      {selectedSlot && (
        <div className="fixed inset-0 z-[10000] flex justify-end">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm" onClick={() => setSelectedSlot(null)}></div>
          <div className="relative w-full max-w-[320px] md:max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">{selectedSlot.instructor_name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Class Attendance</p>
              </div>
              <button onClick={() => setSelectedSlot(null)} className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {selectedSlot.members.map((m: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center font-black text-sm">{m.member_name[0]}</div>
                    <div>
                      <p className="text-[14px] font-black text-slate-800">{m.member_name}</p>
                      <p className="text-[11px] text-slate-400 font-bold italic">{m.phone}</p>
                    </div>
                  </div>
                  <button onClick={async () => { if(confirm('Delete?')) { await api.delete(`/reservations/${m.id}`); fetchData(); setSelectedSlot(null); } }} className="p-2 text-slate-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            
            <div className="p-8 border-t border-slate-50">
              <button onClick={() => setSelectedSlot(null)} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Close Panel</button>
            </div>
          </div>
        </div>
      )}

      {/* 예약 등록 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 border border-white animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">New Booking</h3>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-300 transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const f = e.target as any;
              try {
                await api.post('/reservations', {
                  member_id: f.member.value,
                  instructor_id: f.instructor.value,
                  start_time: `${f.date.value}T${f.start.value}:00`,
                  end_time: `${f.date.value}T${f.end.value}:00`
                });
                setShowAddModal(false);
                fetchData();
              } catch (err: any) { setError(err.response?.data?.error || 'Error'); }
            }} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Student</label>
                <select name="member" required className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white transition-all appearance-none">
                  {members.map((m: any) => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Instructor</label>
                <select name="instructor" required className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white transition-all appearance-none">
                  {instructors.map((ins: any) => <option key={ins.id} value={ins.id}>{ins.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="date" type="date" defaultValue={today} className="h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold outline-none"/>
                <div className="flex gap-1">
                  <input name="start" type="time" defaultValue="09:00" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black text-center"/>
                  <input name="end" type="time" defaultValue="10:00" className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black text-center"/>
                </div>
              </div>
              {error && <p className="text-rose-500 text-[10px] font-bold">{error}</p>}
              <button type="submit" className="w-full h-16 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase shadow-2xl hover:bg-indigo-700 transition-all active:scale-[0.98]">Confirm Slot</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
