import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Users, Clock } from 'lucide-react';

// [Gemini Update]: 극강의 화이트 테마 및 고대비 캘린더 UI 개편
// 일/주/월 전환 기능 및 커스텀 헤더 적용

const CalendarView: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [viewType, setViewType] = useState('timeGridWeek'); // dayGridMonth, timeGridWeek, timeGridDay
  const [currentTitle, setCurrentTitle] = useState('');

  // 더미 데이터 (실제 연동 시 fetchData로 대체 가능)
  const [events] = useState([
    { id: '1', title: '필라테스 A', start: '2026-03-01T14:00:00', end: '2026-03-01T15:30:00', backgroundColor: '#6366f1' },
    { id: '2', title: '개인 PT', start: '2026-03-02T10:00:00', end: '2026-03-02T11:00:00', backgroundColor: '#ec4899' },
    { id: '3', title: '요가 그룹', start: '2026-03-03T18:00:00', end: '2026-03-03T19:30:00', backgroundColor: '#10b981' },
  ]);

  const handleViewChange = (type: string) => {
    setViewType(type);
    calendarRef.current?.getApi().changeView(type);
  };

  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();
  const handleToday = () => calendarRef.current?.getApi().today();

  useEffect(() => {
    // 캘린더 타이틀 동기화
    const interval = setInterval(() => {
      if (calendarRef.current) {
        setCurrentTitle(calendarRef.current.getApi().view.title);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. 커스텀 캘린더 헤더 (일/주/월 전환 포함) */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <CalendarIcon size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{currentTitle || '스케줄 센터'}</h2>
            <p className="text-sm font-bold text-slate-500 mt-2">오늘의 주요 일정을 한눈에 관리하세요.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* 뷰 전환 버튼 그룹 */}
          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {[
              { id: 'dayGridMonth', label: '월' },
              { id: 'timeGridWeek', label: '주' },
              { id: 'timeGridDay', label: '일' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleViewChange(btn.id)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                  viewType === btn.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="h-10 w-px bg-slate-100 mx-2 hidden lg:block" />

          {/* 내비게이션 버튼 */}
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleToday} className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              오늘
            </button>
            <button onClick={handleNext} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>

          <button className="ml-2 px-6 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 text-sm">
            <Plus size={18} /> 일정 추가
          </button>
        </div>
      </header>

      {/* 2. 메인 캘린더 영역 */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.02)] min-h-[700px]">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={viewType}
          headerToolbar={false} // 커스텀 헤더 사용을 위해 false 설정
          events={events}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          nowIndicator={true}
          dayMaxEvents={true}
          editable={true}
          selectable={true}
          locale="ko"
          eventContent={(arg) => (
            <div className="w-full h-full p-2 flex flex-col justify-center rounded-lg shadow-sm border-l-4 overflow-hidden" 
                 style={{ backgroundColor: `${arg.event.backgroundColor}15`, borderLeftColor: arg.event.backgroundColor }}>
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: arg.event.backgroundColor }} />
                <span className="text-[10px] font-black text-slate-900 truncate">{arg.event.title}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                <Clock size={10} /> {arg.timeText}
              </div>
            </div>
          )}
        />
      </div>

      {/* 3. 캘린더 정보 푸터 */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" /> <span className="text-xs font-bold">그룹 수업</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-ec4899" style={{ backgroundColor: '#ec4899' }} /> <span className="text-xs font-bold">개인 PT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-10b981" style={{ backgroundColor: '#10b981' }} /> <span className="text-xs font-bold">커뮤니티</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
          <Users size={16} className="text-indigo-400" /> 24명의 회원이 이번 주 스케줄에 참여 중입니다.
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
