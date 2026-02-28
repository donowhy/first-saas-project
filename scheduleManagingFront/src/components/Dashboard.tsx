import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Clock, User, 
  ChevronRight, Plus, Filter, Info, CreditCard
} from 'lucide-react';

// [Gemini Update]: 다크 모드 로직 완전 제거 및 극강의 화이트 테마 대시보드
const Dashboard: React.FC = () => {
  const [isAdmin] = useState(true);

  return (
    <div className="space-y-10 animate-fade-in transition-colors duration-300">
      
      {/* 1. Welcome & Primary Action Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 leading-tight">
            안녕하세요, <span className="text-indigo-600">김지수</span>님! 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {isAdmin 
              ? "오늘 운영되는 수업 8개 중 2개가 곧 시작됩니다." 
              : "이번 주에 예약된 수업이 총 3개 있습니다."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <>
              <button className="flex-1 md:flex-none px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2 shadow-sm">
                <Filter size={18} /> 수업 필터
              </button>
              <button className="flex-1 md:flex-none px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all text-sm flex items-center justify-center gap-2">
                <Plus size={18} /> 새로운 수업 등록
              </button>
            </>
          ) : (
            <button className="w-full md:w-auto px-10 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2">
              <Calendar size={18} /> 수업 예약하기
            </button>
          )}
        </div>
      </section>

      {/* 2. Key Insights / Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-indigo-100 transition-all">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400">다음 수업까지</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">45분 남음</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-emerald-100 transition-all">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400">출석 완료한 수업</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">12개 / 24개</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-amber-100 transition-all">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400">수강권 잔여 횟수</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">8회 남음</p>
          </div>
        </div>
      </section>

      {/* 3. Schedule Overview */}
      <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden transition-all">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">오늘의 스케줄</h3>
            <p className="text-slate-400 text-[10px] font-black mt-1 uppercase tracking-[0.2em]">March 01, Sunday</p>
          </div>
          <button className="text-indigo-600 text-sm font-black hover:underline underline-offset-4">전체보기</button>
        </div>
        
        <div className="divide-y divide-slate-50">
          {[
            { time: "14:00", title: "필라테스 (중급반)", instructor: "이혜진 강사", status: "진행예정", participants: "4/6" },
            { time: "15:30", title: "체형 교정 스트레칭", instructor: "박준영 강사", status: "진행예정", participants: "2/8" },
            { time: "18:00", title: "파워 빈야사 요가", instructor: "최서윤 강사", status: "대기중", participants: "6/6" },
          ].map((item, idx) => (
            <div key={idx} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-all group">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 text-slate-900 border border-slate-100 font-black group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                  <span className="text-lg leading-none">{item.time.split(':')[0]}</span>
                  <span className="text-[10px] opacity-50 uppercase tracking-tighter">PM</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-black text-slate-900 leading-none">{item.title}</h4>
                    <span className={`px-2 py-0.5 text-[10px] font-black rounded-md ${
                      item.status === '대기중' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1 font-bold"><User size={14} /> {item.instructor}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="flex items-center gap-1 font-bold text-slate-500">{item.participants} 예약됨</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:border-slate-400 transition-all shadow-sm">
                  상세보기
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm">
                  예약 관리 <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-8 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <Info size={16} className="text-indigo-400" /> 스케줄은 센터 운영 상황에 따라 변경될 수 있습니다.
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
