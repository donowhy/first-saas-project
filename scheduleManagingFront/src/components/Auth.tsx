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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-600 rounded-2xl shadow-xl shadow-brand-500/20 mb-6">
            <Zap size={24} className="text-white fill-white/20" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isLogin ? 'Welcome back to Nexus' : 'Join the workspace'}
          </h1>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1 mb-1.5 block">Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required className="w-full h-12 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 text-sm font-medium outline-none focus:border-brand-500 transition-all" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required className="w-full h-12 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 text-sm font-medium outline-none focus:border-brand-500 transition-all" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required className="w-full h-12 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 text-sm font-medium outline-none focus:border-brand-500 transition-all" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            {error && <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 text-xs font-medium rounded-lg">{error}</div>}

            <button type="submit" className="w-full h-12 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative my-6 text-center">
            <span className="bg-white dark:bg-zinc-900 px-3 text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest relative z-10">Or Social Login</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 dark:bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => socialLogin('google')} className="h-12 border border-slate-200 dark:border-zinc-800 rounded-xl flex items-center justify-center gap-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all">
              <Chrome size={18} className="text-slate-400" /> Google
            </button>
            <button onClick={() => socialLogin('kakao')} className="h-12 bg-[#FEE500] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-zinc-900 hover:opacity-90 transition-all">
              <MessageCircle size={18} className="fill-zinc-900" /> Kakao
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm font-medium text-slate-500 dark:text-zinc-500">
          {isLogin ? "New to Nexus?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-brand-600 dark:text-brand-400 ml-2 font-bold hover:underline">
            {isLogin ? 'Create account' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
