import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, CreditCard, Check, ArrowRight, 
  BarChart3, ChevronRight 
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // [Gemini Update]: 스크롤 시 헤더 디자인 변경 효과 적용
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      icon: Calendar, 
      title: "지능형 스케줄링", 
      desc: "강사별 노출 제어 및 중복 예약 방지 알고리즘이 탑재된 스마트 캘린더입니다.",
      color: "text-blue-600", bg: "bg-blue-50"
    },
    { 
      icon: Users, 
      title: "회원 CRM 통합", 
      desc: "회원의 수강권 잔여량, 최근 방문일, 특이사항을 한 화면에서 즉시 확인하세요.",
      color: "text-indigo-600", bg: "bg-indigo-50"
    },
    { 
      icon: CreditCard, 
      title: "정산 자동화", 
      desc: "수업 완료 즉시 강사료가 계산되며, 월말 정산 리포트를 1초 만에 생성합니다.",
      color: "text-purple-600", bg: "bg-purple-50"
    },
    { 
      icon: BarChart3, 
      title: "매출 분석 통계", 
      desc: "어떤 요일, 어떤 강사의 수업이 가장 인기 있는지 데이터로 증명합니다.",
      color: "text-emerald-600", bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 font-sans">
      {/* 1. Header Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-black text-indigo-600 tracking-tighter cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            Schedule+
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">기능</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">요금제</a>
          </div>
          <button 
            onClick={() => navigate('/auth')}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            로그인
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            관리 업무의 혁신, 지금 시작하세요
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8">
            복잡한 센터 운영,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              기술로 해결하세요.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
            수동 정산과 엑셀 관리는 이제 그만. 강사, 회원, 일정을<br className="hidden md:block"/> 
            데이터 중심으로 연결하는 차세대 관리 솔루션입니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/auth')} 
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 group hover:bg-indigo-600 transition-all duration-300"
            >
              무료로 시작하기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:border-indigo-600 transition-all">
              기능 데모 보기
            </button>
          </div>
        </div>
      </section>

      {/* 3. Feature Section */}
      <section id="features" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">비즈니스 성장에만 집중하세요.</h2>
            <p className="text-slate-500 font-medium">관리 업무는 Schedule+ 가 대신합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
            지금 바로<br/>스마트한 관리를 경험하세요.
          </h2>
          <button 
            onClick={() => navigate('/auth')}
            className="relative z-10 px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            시작하기 <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-6 text-center">
        <div className="text-xl font-black text-indigo-600 mb-4">Schedule+</div>
        <p className="text-slate-400 text-sm">© 2026 Schedule Plus Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
