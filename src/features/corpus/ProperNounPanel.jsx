import React, { useState } from 'react';
import { Search, Filter, ChevronDown, UploadCloud, X, Save, Plus } from 'lucide-react';
import { TermDefinitionManager } from './TermDefinitionManager';
import { MOCK_CORPUS_MODELS } from '../../data/mockData';

export function ProperNounPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);

  const handleEdit = (term) => {
      setEditingTerm(term);
      setIsEditModalOpen(true);
  };

  const handleSave = () => {
      // In a real app, this would call an API to save the changes
      alert('Term saved: ' + editingTerm.term_name);
      setIsEditModalOpen(false);
      setEditingTerm(null);
  };

  const handleClose = () => {
      setIsEditModalOpen(false);
      setIsAddModalOpen(false);
      setEditingTerm(null);
  };

  const handleFieldChange = (field, value) => {
      setEditingTerm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddNew = () => {
      setEditingTerm({
        term_name: '',
        type: 'user',
        probability: 0.5,
        sync_status: 0,
        model: 'all',
        updated_at: new Date().toISOString().substring(0, 16).replace('T', ' ')
      });
      setIsAddModalOpen(true);
  };

  const handleSaveNew = () => {
      // In a real app, this would call an API to save the new term
      alert('新增詞彙: ' + editingTerm.term_name);
      setIsAddModalOpen(false);
      setEditingTerm(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      
      {/* Header with Search */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 z-10 sticky top-0 shadow-sm">
         <div className="flex-1 flex items-center gap-3">
             <div className="relative flex-1 group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="搜尋詞彙..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                />
             </div>
             
             <div className="relative min-w-[140px]">
                 <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none" />
                 <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer font-medium text-slate-600"
                 >
                     <option value="all">所有詞庫</option>
                     <option value="user">用戶詞庫</option>
                     <option value="pinyin">拼音詞庫</option>
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>

             <div className="relative min-w-[140px]">
                 <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none" />
                 <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer font-medium text-slate-600"
                 >
                     <option value="all">所有模型</option>
                     {MOCK_CORPUS_MODELS.map(opt => (
                         <option key={opt.id} value={opt.id}>{opt.name}</option>
                     ))}
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>
         </div>
         <div className="flex items-center gap-2">
             <button
                onClick={() => alert('已送出同步請求')}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
             >
                <UploadCloud size={16} /> 同步至會議系統
             </button>
             <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
             >
                <Plus size={16} /> 新增詞彙
             </button>
         </div>
      </header>

      {/* Content Area Rendering */}
      <div className="flex-1 overflow-hidden flex flex-col">
          <TermDefinitionManager 
              searchTerm={searchTerm} 
              selectedType={selectedType}
              selectedModel={selectedModel}
              onEdit={handleEdit}
          />
      </div>

      {/* Edit/Add Modal */}
      {(isEditModalOpen || isAddModalOpen) && editingTerm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 text-lg">{isAddModalOpen ? '新增詞彙' : '編輯詞彙'}</h3>
                      <button 
                        onClick={handleClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={18} />
                      </button>
                  </header>
                  
                  <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                      {/* Term Name */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">詞彙</label>
                          <input 
                            type="text" 
                            value={editingTerm.term_name || ''}
                            onChange={(e) => handleFieldChange('term_name', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            placeholder="輸入詞彙"
                          />
                      </div>

                      {/* Dictionary Type */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">詞庫類型</label>
                          <select 
                            value={editingTerm.type || 'user'}
                            onChange={(e) => {
                                handleFieldChange('type', e.target.value);
                                if (e.target.value === 'pinyin') {
                                    handleFieldChange('probability', 0);
                                }
                            }}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                          >
                              <option value="user">用戶詞庫</option>
                              <option value="pinyin">拼音詞庫</option>
                          </select>
                      </div>

                      {/* Probability */}
                      <div>
                          <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-bold text-slate-700">機率</label>
                              <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                  {editingTerm.probability.toFixed(2)}
                              </span>
                          </div>
                          <div className="flex items-center gap-4">
                              <input 
                                type="range" 
                                min="0"
                                max="1"
                                step="0.01"
                                value={editingTerm.probability}
                                onChange={(e) => handleFieldChange('probability', parseFloat(e.target.value))}
                                disabled={editingTerm.type === 'pinyin'}
                                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                              <input 
                                type="number" 
                                min="0"
                                max="1"
                                step="0.01"
                                value={editingTerm.probability}
                                onChange={(e) => handleFieldChange('probability', parseFloat(e.target.value))}
                                disabled={editingTerm.type === 'pinyin'}
                                className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                              />
                          </div>
                      </div>
                      
                      {/* Model */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">模型 (可選)</label>
                          <select 
                            value={editingTerm.model || 'all'}
                            onChange={(e) => handleFieldChange('model', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                          >
                              <option value="all">所有模型</option>
                              {MOCK_CORPUS_MODELS.map(opt => (
                                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                              ))}
                          </select>
                      </div>
                  </div>

                  <footer className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
                      <button 
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                          取消
                      </button>
                      <button 
                        onClick={isAddModalOpen ? handleSaveNew : handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                          <Save size={16} /> {isAddModalOpen ? '新增' : '儲存變更'}
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}

