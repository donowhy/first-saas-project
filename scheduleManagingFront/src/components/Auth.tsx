import React, { useState } from 'react';
import api from '../api';
import { Mail, Lock, User, Chrome, Zap, ArrowRight, MessageCircle } from 'lucide-react';

interface AuthProps {
  onLogin: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.success && res.data.data.accessToken) {
          onLogin(res.data.data.accessToken);
        }
      } else {
        await api.post('/auth/signup', { email, password, name });
        setIsLogin(true);
        alert('Account created! Please sign in.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Authentication failed');
    }
  };

  const socialLogin = (provider: string) => {
    const backendBase = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:9447';
    window.location.href = `${backendBase}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center p-6 transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-600 rounded-2xl shadow-xl shadow-brand-500/20 mb-6">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">NexusFlow</h1>
          <p className="text-sm text-[var(--text-muted)] mt-2">Professional Studio Management System</p>
        </div>

        <div className="bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-ui)] shadow-[var(--shadow-float)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input type="text" required className="w-full h-12 bg-[var(--bg-main)] border border-[var(--border-ui)] rounded-xl pl-12 pr-4 text-sm text-[var(--text-main)] outline-none focus:border-brand-500 transition-all" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="email" required className="w-full h-12 bg-[var(--bg-main)] border border-[var(--border-ui)] rounded-xl pl-12 pr-4 text-sm text-[var(--text-main)] outline-none focus:border-brand-500 transition-all" placeholder="name@nexus.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input type="password" required className="w-full h-12 bg-[var(--bg-main)] border border-[var(--border-ui)] rounded-xl pl-12 pr-4 text-sm text-[var(--text-main)] outline-none focus:border-brand-500 transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium rounded-lg">{error}</div>}

            <button type="submit" className="w-full h-12 bg-brand-600 text-white rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative my-6 text-center">
            <span className="bg-[var(--bg-card)] px-3 text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] relative z-10">Integration</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-[var(--border-ui)]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => socialLogin('google')} className="h-12 border border-[var(--border-ui)] rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-[var(--bg-hover)] transition-all">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button onClick={() => socialLogin('kakao')} className="h-12 bg-[#FEE500] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-black hover:opacity-90 transition-all">
              <MessageCircle size={18} className="fill-black" /> Kakao
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-[var(--text-muted)]">
          {isLogin ? "New to the platform?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-brand-600 ml-2 font-bold hover:underline decoration-brand-500/30">
            {isLogin ? 'Sign up free' : 'Sign in here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
