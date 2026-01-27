import React from 'react';
import { Search } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';
import { MOCK_USERS } from '../../data/mockData';

export function ShareModal({ onClose }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-1">與人共享</h3>
        <p className="text-sm text-slate-500 mb-6">選擇部門或人員以分享已勾選的文件。</p>
        <div className="mb-4 relative">
           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm outline-none" placeholder="搜尋部門或人員..." />
        </div>
        <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-lg mb-6 custom-scrollbar">
           {MOCK_USERS.map(user => (
             <div key={user.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.type === 'dept' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-600'}`}>
                  {user.type === 'dept' ? 'D' : user.name[0]}
                </div>
                <span className="text-sm text-slate-700 flex-1">{user.name}</span>
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300" />
             </div>
           ))}
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md">確認共享</button>
        </div>
      </div>
    </ModalOverlay>
  );
}
