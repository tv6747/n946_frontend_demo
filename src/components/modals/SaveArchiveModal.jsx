import React from 'react';
import { Save } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';

export function SaveArchiveModal({ onClose }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Save className="text-blue-600"/> 存檔至例行函稿</h3>
        <div className="mb-6"><label className="block text-sm font-medium text-slate-700 mb-2">檔案名稱</label><input className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none" defaultValue="2024-05-20 陳情回覆草稿" /></div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md">確認存檔</button>
        </div>
      </div>
    </ModalOverlay>
  );
}
