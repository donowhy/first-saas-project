import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api';
import { Plus, X, User, Trash2, CalendarPlus } from 'lucide-react';

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  
  const isMobile = window.innerWidth < 768;

  const fetchData = async () => {
    try {
      const res = await api.get('/reservations').catch(()=>({data:[]}));
      const groups: Record<string, any> = {};
      res.data.forEach((res: any) => {
        const key = `${res.start_time}_${res.instructor_id}`;
        if (!groups[key]) {
          groups[key] = { id: key, db_ids: [], instructor_name: res.instructor_name, instructor_color: res.color || '#6366f1', start: res.start_time, end: res.end_time, members: [] };
        }
        groups[key].members.push(res);
        groups[key].db_ids.push(res.id);
      });
      setEvents(Object.values(groups).map((group: any) => ({
        id: group.id, title: group.instructor_name, start: group.start, end: group.end, backgroundColor: group.instructor_color, borderColor: group.instructor_color, extendedProps: { ...group }
      })) as any);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center shrink-0 bg-[var(--bg-card)] border border-[var(--border-ui)] p-4 rounded-xl shadow-[var(--shadow-card)]">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-main)]">Studio Schedule</h2>
          <p className="text-xs text-[var(--text-muted)]">Manage class bookings and attendance</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <CalendarPlus size={16} /> New Session
        </button>
      </div>

      {/* 캘린더 부모 영역: flex-1과 min-h-0로 화면을 뚫지 않게 설정 */}
      <div className="flex-1 min-h-[600px] bg-[var(--bg-card)] border border-[var(--border-ui)] rounded-xl shadow-[var(--shadow-card)] p-4 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? 'timeGridDay' : 'timeGridWeek'}
          headerToolbar={{ left: 'prev,next today', center: 'title', right: isMobile ? 'timeGridDay' : 'timeGridWeek,timeGridDay' }}
          events={events}
          height="100%"
          slotMinTime="08:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          nowIndicator={true}
          eventClick={(info: any) => setSelectedSlot(info.event.extendedProps)}
          eventContent={(arg: any) => (
            <div className="h-full p-1 flex flex-col justify-between text-white overflow-hidden shadow-sm" style={{ backgroundColor: arg.event.backgroundColor, borderRadius: '4px' }}>
              <span className="text-[10px] font-semibold truncate leading-tight">{arg.event.title}</span>
              <span className="text-[9px] opacity-90 leading-none">{arg.timeText}</span>
            </div>
          )}
        />
      </div>

      {selectedSlot && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedSlot(null)}></div>
          <div className="relative w-full max-w-sm bg-[var(--bg-card)] border-l border-[var(--border-ui)] h-full p-6 flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--border-ui)] pb-4">
              <h3 className="text-xl font-bold text-[var(--text-main)]">Class Details</h3>
              <button onClick={() => setSelectedSlot(null)} className="p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] rounded-md"><X size={20}/></button>
            </div>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-[var(--bg-main)] rounded-xl border border-[var(--border-ui)]">
               <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: selectedSlot.instructor_color }}>{selectedSlot.instructor_name[0]}</div>
               <div>
                  <p className="font-bold text-[var(--text-main)]">{selectedSlot.instructor_name}</p>
                  <p className="text-xs text-[var(--text-muted)]">Lead Instructor</p>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
               <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Attendees ({selectedSlot.members.length}/6)</p>
               {selectedSlot.members.map((m: any, i: number) => (
                 <div key={i} className="p-3 bg-[var(--bg-main)] border border-[var(--border-ui)] rounded-lg flex justify-between items-center group">
                   <div className="flex items-center gap-3 text-[var(--text-main)]">
                      <User size={16} className="text-[var(--text-muted)]" />
                      <span className="font-medium text-sm">{m.member_name}</span>
                   </div>
                   <button onClick={async () => { if(confirm('Remove attendee?')) { await api.delete(`/reservations/${m.id}`); fetchData(); setSelectedSlot(null); } }} className="text-[var(--text-muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                 </div>
               ))}
               {selectedSlot.members.length === 0 && <p className="text-sm text-[var(--text-muted)] text-center py-4">No attendees registered yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
