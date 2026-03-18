import React, { useState } from 'react';
import { Search, Plus, X, UploadCloud, Save } from 'lucide-react';
import { SynonymManager } from './SynonymManager';
import { MOCK_GLOSSARIES } from '../../data/mockData';

export function SynonymPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      word_before: '',
      word_after: '',
      sync_status: 0
  });
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (item) => {
      setEditingId(item.id);
      setFormData({
          word_before: item.word_before,
          word_after: item.word_after,
          sync_status: item.sync_status
      });
      setIsEditModalOpen(true);
  };

  const handleAddNew = () => {
      setEditingId(null);
      setFormData({
          word_before: '',
          word_after: '',
          sync_status: 0
      });
      setIsEditModalOpen(true);
  };

  const handleSave = () => {
      alert(`${editingId ? '更新' : '新增'}勘誤: ${formData.word_before} -> ${formData.word_after}`);
      setIsEditModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      {/* Header Panel */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-4 flex-1">
             <div className="relative w-72 group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="搜尋詞彙..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                />
             </div>
         </div>
         <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
         >
            <Plus size={16} /> 新增勘誤
         </button>
      </header>

      {/* Content Area Rendering */}
      <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-y-auto">
             <SynonymManager 
                 searchTerm={searchTerm}
                 onEdit={handleEdit}
             />
          </div>
      </div>

      {/* Add/Edit Correction Modal */}
      {isEditModalOpen && (
        <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsEditModalOpen(false)}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                  <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                      <h3 className="font-bold text-slate-800 text-lg">{editingId ? '編輯勘誤' : '新增勘誤'}</h3>
                      <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                          <X size={20} />
                      </button>
                  </header>
                
                  <div className="p-6 space-y-4 overflow-y-auto flex-1">
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">勘誤前詞彙</label>
                          <input 
                              type="text" 
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                              placeholder="例如：人工智能"
                              value={formData.word_before}
                              onChange={(e) => setFormData({...formData, word_before: e.target.value})}
                          />
                      </div>

                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">勘誤後詞彙</label>
                          <textarea 
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 h-24 resize-none"
                              placeholder="請輸入勘誤後的詞彙，例如：人工智慧"
                              value={formData.word_after}
                              onChange={(e) => setFormData({...formData, word_after: e.target.value})}
                          ></textarea>
                      </div>

                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">同步狀態</label>
                          <div className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm text-slate-600">
                              <UploadCloud size={16} className="text-slate-500" />
                              {formData.sync_status === 0 ? '未同步' : '已同步'}
                          </div>
                          <p className="text-xs text-slate-500">此狀態為唯讀，表示勘誤是否已同步至系統。</p>
                      </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                      <button 
                          onClick={() => setIsEditModalOpen(false)}
                          className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-200 rounded-lg transition-colors"
                      >
                          取消
                      </button>
                      <button 
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors"
                      >
                          <Save size={16} />
                          儲存
                      </button>
                  </div>
              </div>
            </div>
        </>
      )}
    </div>
  );
}
