import React from 'react';
import { UploadCloud } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';

export function UploadModal({ onClose }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <UploadCloud className="text-blue-600"/> 上傳文件
        </h3>
        
        <div className="border-2 border-dashed border-slate-300 rounded-xl h-48 flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50/30 hover:border-blue-400 transition-all cursor-pointer group mb-6">
           <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
             <UploadCloud size={32} className="text-blue-500" />
           </div>
           <p className="text-sm font-medium text-slate-700 mb-1">拖曳檔案至此，或點擊上傳</p>
           <p className="text-xs text-slate-400">支援 PDF, DOCX, TXT, XLSX (最大 10MB)</p>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md">確認上傳</button>
        </div>
      </div>
    </ModalOverlay>
  );
}
