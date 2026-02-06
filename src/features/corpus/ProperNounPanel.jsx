import React, { useState } from 'react';
import { Search, Filter, ChevronDown, UploadCloud, X, Save } from 'lucide-react';
import { TermDefinitionManager } from './TermDefinitionManager';
import { MOCK_TERM_CATEGORIES } from '../../data/mockData';

export function ProperNounPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);

  const categoryOptions = MOCK_TERM_CATEGORIES.map(c => ({ value: c.id, label: c.name }));

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
      setEditingTerm(null);
  };

  const handleFieldChange = (field, value) => {
      setEditingTerm(prev => ({ ...prev, [field]: value }));
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
                    placeholder="搜尋名詞、定義內容..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                />
             </div>
             
             <div className="relative min-w-[180px]">
                 <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none" />
                 <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer font-medium text-slate-600"
                 >
                     <option value="all">所有業務範疇</option>
                     {categoryOptions.map(opt => (
                         <option key={opt.value} value={opt.value}>{opt.label}</option>
                     ))}
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>
         </div>
      </header>

      {/* Content Area Rendering */}
      <div className="flex-1 overflow-hidden flex flex-col">
          <TermDefinitionManager 
              searchTerm={searchTerm} 
              selectedCategory={selectedCategory}
              onEdit={handleEdit}
          />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingTerm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 text-lg">編輯專有名詞</h3>
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
                          <label className="block text-sm font-bold text-slate-700 mb-2">專有名詞</label>
                          <input 
                            type="text" 
                            value={editingTerm.term_name || ''}
                            onChange={(e) => handleFieldChange('term_name', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            placeholder="輸入專有名詞"
                          />
                      </div>

                      {/* Definition */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">定義內容</label>
                          <textarea 
                            value={editingTerm.definition || ''}
                            onChange={(e) => handleFieldChange('definition', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
                            placeholder="輸入定義內容"
                          />
                      </div>

                      {/* Source Title */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">來源</label>
                          <input 
                            type="text" 
                            value={editingTerm.source_title || ''}
                            onChange={(e) => handleFieldChange('source_title', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            placeholder="輸入來源"
                          />
                      </div>

                      {/* Categories */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">分類</label>
                          <div className="flex flex-wrap gap-2">
                              {MOCK_TERM_CATEGORIES.map(cat => {
                                  const isSelected = (editingTerm.categories || []).includes(cat.id);
                                  return (
                                      <button
                                          key={cat.id}
                                          onClick={() => {
                                              const currentCats = editingTerm.categories || [];
                                              const newCats = isSelected 
                                                  ? currentCats.filter(c => c !== cat.id)
                                                  : [...currentCats, cat.id];
                                              handleFieldChange('categories', newCats);
                                          }}
                                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                              isSelected 
                                                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                                                  : 'bg-slate-100 text-slate-600 border-2 border-transparent hover:border-slate-300'
                                          }`}
                                      >
                                          {cat.name}
                                      </button>
                                  );
                              })}
                          </div>
                      </div>

                      {/* Version Tag */}
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">版本標籤</label>
                          <input 
                            type="text" 
                            value={editingTerm.version_tag || ''}
                            onChange={(e) => handleFieldChange('version_tag', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-mono"
                            placeholder="例如: v1.0.0"
                          />
                      </div>

                      {/* Toggles */}
                      <div className="space-y-3 pt-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={!!editingTerm.is_legal_binding}
                                onChange={(e) => handleFieldChange('is_legal_binding', e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                              />
                              <span className="text-sm font-medium text-slate-700">法定用語</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={!!editingTerm.is_current}
                                onChange={(e) => handleFieldChange('is_current', e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                              />
                              <span className="text-sm font-medium text-slate-700">現行版本</span>
                          </label>
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
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                          <Save size={16} /> 儲存變更
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}

