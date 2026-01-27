import React from 'react';
import { Download, FileText, FileType, FileJson } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';

function ExportBtn({ icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all gap-2 group">
      {icon} <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{label}</span>
    </button>
  );
}

export function ExportModal({ onClose }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Download className="text-blue-600"/> 匯出回應</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
           <ExportBtn icon={<FileText size={32} className="text-red-500"/>} label="PDF" />
           <ExportBtn icon={<FileType size={32} className="text-blue-500"/>} label="DOCX" />
           <ExportBtn icon={<FileJson size={32} className="text-yellow-500"/>} label="JSON" />
        </div>
        <div className="flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button></div>
      </div>
    </ModalOverlay>
  );
}
