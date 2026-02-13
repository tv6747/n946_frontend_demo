import React, { useState } from 'react';
import { X, List, Plus, Star, Check } from 'lucide-react';

/**
 * AddToListModal - 將已選文件加入常用清單
 * 
 * 提供兩種操作方式：
 * 1. 選擇現有清單
 * 2. 輸入名稱新增清單並加入
 */
export function AddToListModal({ favoriteLists = [], selectedFileIds = [], onAddToList, onCreateAndAdd, onClose }) {
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState(null);

  const handleAddToExisting = () => {
    if (selectedListId && onAddToList) {
      onAddToList(selectedListId, selectedFileIds);
      onClose();
    }
  };

  const handleCreateAndAdd = () => {
    const trimmed = newListName.trim();
    if (trimmed && onCreateAndAdd) {
      onCreateAndAdd(trimmed, selectedFileIds);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateAndAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <List size={16} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">加入常用清單</h3>
              <p className="text-xs text-slate-400">已選取 {selectedFileIds.length} 個文件</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Existing Lists */}
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">選擇現有清單</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
              {favoriteLists.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">尚無清單，請在下方新增</p>
              ) : (
                favoriteLists.map(list => (
                  <div 
                    key={list.id}
                    onClick={() => setSelectedListId(list.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all border ${
                      selectedListId === list.id 
                        ? 'bg-amber-50 border-amber-200 shadow-sm' 
                        : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <Star 
                      size={14} 
                      className={`flex-shrink-0 ${list.isDefault ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                    />
                    <span className={`text-sm font-medium flex-1 truncate ${
                      selectedListId === list.id ? 'text-amber-700' : 'text-slate-600'
                    }`}>
                      {list.name}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {list.fileIds.length} 個文件
                    </span>
                    {selectedListId === list.id && (
                      <Check size={14} className="text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">或</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Create New List */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">新增清單</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newListName}
                onChange={(e) => { setNewListName(e.target.value); setSelectedListId(null); }}
                onKeyDown={handleKeyDown}
                placeholder="輸入清單名稱..."
                className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all placeholder:text-slate-300"
              />
              <button
                onClick={handleCreateAndAdd}
                disabled={!newListName.trim()}
                className="px-3 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 flex-shrink-0"
              >
                <Plus size={14} />
                新增
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleAddToExisting}
            disabled={!selectedListId}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            加入選取的清單
          </button>
        </div>
      </div>
    </div>
  );
}
