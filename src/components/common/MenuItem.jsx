import React from 'react';

export function MenuItem({ label, active, onClick, icon, indent, highlight }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3
        ${active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
        ${indent ? 'pl-8' : ''}
      `}
    >
      {icon && <span className={active ? 'text-blue-600' : 'text-slate-400'}>{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {highlight && <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded font-bold">NEW</span>}
    </button>
  );
}
