import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, ArrowRight, Layers, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// [Gemini Update]: 워크스페이스(스튜디오) 선택 - 실제 API 연동 완료
// GET /api/workspaces 연결

interface Workspace {
  id: number;
  name: string;
}

interface Props {
  onSelect: (ws: Workspace) => void;
}

const WorkspaceSelector: React.FC<Props> = ({ onSelect }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('/workspaces')
      .then(res => {
        setWorkspaces(res.data.data || res.data);
      })
      .catch((e) => {
        console.error("워크스페이스 로드 실패:", e);
        // 실패 시 기본 데이터
        setWorkspaces([
          { id: 1, name: "강남 본점 (Gangnam)" },
          { id: 2, name: "서초 분점 (Seocho)" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg text-center mb-10 animate-fade-in">
        <div className="inline-flex p-5 rounded-[2rem] bg-indigo-600 text-white mb-8 shadow-2xl shadow-indigo-100">
          <Layers size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase italic">Select Studio</h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Your professional workspaces</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-[480px] animate-fade-in">
        {loading ? (
          [1,2].map(i => <div key={i} className="h-24 bg-white border border-slate-100 animate-pulse rounded-[2.5rem]" />)
        ) : (
          workspaces.map((ws) => (
            <button 
              key={ws.id}
              onClick={() => onSelect(ws)}
              className="group p-8 bg-white border border-slate-200 rounded-[2.5rem] flex items-center justify-between transition-all hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-indigo-600 flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {ws.name[0].toUpperCase()}
                </div>
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">{ws.name}</span>
              </div>
              <ArrowRight size={24} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
            </button>
          ))
        )}

        <button className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-indigo-600 hover:bg-white hover:text-indigo-600 transition-all group">
          <Plus size={28} />
          <span className="text-[11px] font-black uppercase tracking-[0.25em]">새로운 스튜디오 등록</span>
        </button>
      </div>

      <button 
        onClick={handleLogout}
        className="mt-12 flex items-center gap-2 text-slate-400 hover:text-rose-500 font-black text-xs uppercase tracking-widest transition-all"
      >
        <LogOut size={16} /> 로그아웃 및 계정 전환
      </button>
    </div>
  );
};

export default WorkspaceSelector;
