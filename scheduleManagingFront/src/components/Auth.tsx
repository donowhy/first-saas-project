import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Chrome, ArrowRight, MessageCircle, ChevronLeft } from 'lucide-react';

interface AuthProps {
  onLogin?: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // [Gemini Update]: 극도로 깔끔하고 현대적인 SaaS 로그인 인터페이스
  // 사용자와 관리자 모두에게 신뢰감을 주는 미니멀한 화이트 레이아웃

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // 데모용 로직
      localStorage.setItem('token', 'mock-token');
      if (onLogin) onLogin('mock-token');
      navigate('/dashboard'); 
    } catch (err: any) {
      setError('로그인 정보가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-100">
      {/* 1. Header Navigation */}
      <nav className="fixed top-0 w-full px-8 py-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-all group"
        >
          <div className="p-2 rounded-xl group-hover:bg-indigo-50 transition-all">
            <ChevronLeft size={20} />
          </div>
          메인페이지로
        </button>
        <div className="text-xl font-black text-indigo-600 tracking-tighter">Schedule+</div>
        <div className="w-24"></div> {/* Balance */}
      </nav>

      <div className="w-full max-w-[440px] animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
            {isLogin ? '다시 오셨군요!' : '함께 시작해봐요'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isLogin ? '계정에 로그인하여 스케줄을 확인하세요.' : '간단한 정보 입력으로 관리를 시작하세요.'}
          </p>
        </div>

        {/* 2. Main Auth Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">성함</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    required 
                    className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" 
                    placeholder="홍길동" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">이메일 주소</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="email" 
                  required 
                  className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" 
                  placeholder="name@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2.5">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">비밀번호</label>
                {isLogin && <button type="button" className="text-[11px] font-bold text-indigo-600 hover:underline">비밀번호 찾기</button>}
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="password" 
                  required 
                  className="w-full h-14 bg-slate-50 border border-slate-50 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-2xl animate-fade-in">{error}</div>}

            <button type="submit" className="w-full h-15 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              {isLogin ? '로그인' : '계정 생성'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-10 text-center">
            <span className="bg-white px-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] relative z-10">간편 로그인</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-14 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all">
              <Chrome size={20} className="text-rose-500" /> Google
            </button>
            <button className="h-14 bg-[#FEE500] rounded-2xl flex items-center justify-center gap-3 text-xs font-black text-[#3C1E1E] hover:opacity-90 transition-all">
              <MessageCircle size={20} className="fill-[#3C1E1E]" /> Kakao
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-sm text-slate-400 font-bold">
          {isLogin ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 ml-2 font-black hover:underline underline-offset-4">
            {isLogin ? '무료 회원가입' : '지금 로그인'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
