import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, ArrowRight, Layers } from 'lucide-react';

interface Workspace {
  id: number;
  name: string;
}

interface Props {
  onSelect: (ws: Workspace) => void;
}

const WorkspaceSelector: React.FC<Props> = ({ onSelect }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    api.get('/workspaces').then(res => setWorkspaces(res.data)).catch(e => console.error(e));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg text-center mb-12">
        <div className="inline-flex p-4 rounded-3xl bg-brand-600 text-white mb-6 shadow-2xl shadow-brand-500/40">
          <Layers size={32} />
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter mb-3">SELECT MO-IM</h1>
        <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-[10px]">Your professional workspaces</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {workspaces.map((ws) => (
          <button 
            key={ws.id}
            onClick={() => onSelect(ws)}
            className="hover-extreme group p-6 border-2 border-[var(--border-ui)] rounded-[2rem] flex items-center justify-between bg-[var(--bg-app)] text-[var(--text-main)] transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center font-black group-hover:bg-white group-hover:text-black transition-colors">
                {ws.name[0].toUpperCase()}
              </div>
              <span className="font-black text-xl tracking-tight uppercase">{ws.name}</span>
            </div>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        ))}

        <button className="p-6 border-2 border-dashed border-[var(--border-ui)] rounded-[2rem] flex flex-col items-center justify-center gap-2 text-[var(--text-muted)] hover:border-brand-500 hover:text-brand-600 transition-all group">
          <Plus size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Workspace</span>
        </button>
      </div>
    </div>
  );
};

export default WorkspaceSelector;
