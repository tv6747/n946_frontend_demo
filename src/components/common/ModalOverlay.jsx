import React from 'react';
import { X } from 'lucide-react';

export function ModalOverlay({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-visible relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        {children}
      </div>
    </div>
  );
}
