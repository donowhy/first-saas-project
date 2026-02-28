import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api';
import { Plus, X, User, Trash2, CalendarPlus } from 'lucide-react';

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
        api.get('/reservations').catch(()=>({data:[]})),
        api.get('/members').catch(()=>({data:[]})),
        api.get('/instructors').catch(()=>({data:[]}))
      ]);

      const groups: Record<string, any> = {};
      resRes.data.forEach((res: any) => {
        const key = `${res.start_time}_${res.instructor_id}`;
        if (!groups[key]) {
          groups[key] = {
            id: key,
            db_ids: [],
            instructor_name: res.instructor_name,
            instructor_color: res.color || '#6366f1',
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
    <div className="space-y-6 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Schedule Overview</h2>
          <p className="text-sm font-medium text-zinc-400 mt-1">Drag and drop to reschedule classes instantly.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="glow-effect w-full md:w-auto px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <CalendarPlus size={18} /> New Session
        </button>
      </div>

      <div className="glass-panel rounded-3xl p-4 md:p-6 shadow-2xl">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: isMobile ? 'timeGridDay,timeGridWeek' : 'timeGridWeek,timeGridDay'
            }}
            events={events}
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            locale="en"
            editable={true}
            eventDrop={handleEventChange}
            eventResize={handleEventChange}
            nowIndicator={true}
            slotDuration="00:30:00"
            eventClick={(info) => setSelectedSlot(info.event.extendedProps)}
            eventContent={(arg) => {
              const count = arg.event.extendedProps.members.length;
              return (
                <div className="h-full p-2 flex flex-col justify-between overflow-hidden text-white rounded-md relative z-10" style={{ backgroundColor: arg.event.backgroundColor + 'dd', backdropFilter: 'blur(4px)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold truncate">{arg.event.title}</span>
                    <div className="bg-black/30 px-1.5 py-0.5 rounded-md text-[10px] font-bold">{count}/6</div>
                  </div>
                  <div className="text-[10px] font-medium opacity-80">{arg.timeText}</div>
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* Right Panel: Class Details */}
      {selectedSlot && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedSlot(null)}></div>
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg" style={{ backgroundColor: selectedSlot.instructor_color }}>
                  {selectedSlot.instructor_name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSlot.instructor_name}</h3>
                  <p className="text-xs font-medium text-zinc-400 mt-1">Class Roster • {selectedSlot.members.length} Enrolled</p>
                </div>
              </div>
              <button onClick={() => setSelectedSlot(null)} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {selectedSlot.members.map((m: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl group hover:bg-zinc-800/80 hover:border-zinc-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700/50">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{m.member_name}</p>
                      <p className="text-xs text-zinc-500 font-medium">{m.phone}</p>
                    </div>
                  </div>
                  <button onClick={async () => { if(confirm('Remove student from class?')) { await api.delete(`/reservations/${m.id}`); fetchData(); setSelectedSlot(null); } }} className="p-2 text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all bg-zinc-950 rounded-lg"><Trash2 size={16}/></button>
                </div>
              ))}
              {selectedSlot.members.length === 0 && (
                <div className="text-center py-10 text-zinc-500 font-medium text-sm">No students enrolled yet.</div>
              )}
            </div>
            
            <div className="p-6 border-t border-zinc-800/50 bg-zinc-900/50">
              <button onClick={() => setSelectedSlot(null)} className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold text-sm transition-all">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white tracking-tight">Create Session</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 transition-colors"><X size={20} /></button>
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
              } catch (err: any) { setError(err.response?.data?.error || 'Failed to create session'); }
            }} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Student</label>
                  <select name="member" required className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all appearance-none">
                    <option value="">Select a student</option>
                    {members.map((m: any) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Instructor</label>
                  <select name="instructor" required className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all appearance-none">
                    <option value="">Select an instructor</option>
                    {instructors.map((ins: any) => <option key={ins.id} value={ins.id}>{ins.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Date</label>
                    <input name="date" type="date" defaultValue={today} className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm font-medium text-white outline-none focus:border-brand-500 transition-all [color-scheme:dark]"/>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Time</label>
                    <div className="flex items-center gap-2">
                      <input name="start" type="time" defaultValue="09:00" className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-2 text-sm font-medium text-white text-center outline-none focus:border-brand-500 [color-scheme:dark]"/>
                      <span className="text-zinc-600">-</span>
                      <input name="end" type="time" defaultValue="10:00" className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-2 text-sm font-medium text-white text-center outline-none focus:border-brand-500 [color-scheme:dark]"/>
                    </div>
                  </div>
                </div>
              </div>
              {error && <p className="text-rose-400 text-xs font-medium p-3 bg-rose-500/10 rounded-lg border border-rose-500/20">{error}</p>}
              <div className="pt-2">
                <button type="submit" className="w-full h-12 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98]">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
