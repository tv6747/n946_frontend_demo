import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, X, Save } from 'lucide-react';
import { SynonymManager } from './SynonymManager';
import { MOCK_GLOSSARIES } from '../../data/mockData';

export function SynonymPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Modal Form State
  const [formData, setFormData] = useState({
      id: null,
      term: '',
      synonyms: '',
      category: ''
  });
  
  // Extract unique categories from glossaries
  const categoryOptions = React.useMemo(() => {
      const cats = [...new Set(MOCK_GLOSSARIES.map(g => g.category))];
      return cats.map(c => ({ value: c, label: c }));
  }, []);

  const handleEdit = (item) => {
      setIsEditMode(true);
      setFormData({
          id: item.id,
          term: item.term,
          synonyms: item.synonyms.join(', '),
          category: item.category
      });
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setIsEditMode(false);
      setFormData({ id: null, term: '', synonyms: '', category: '' });
      setIsModalOpen(true);
  };

  const handleSave = () => {
      if(!formData.term) {
          alert('請輸入標準詞');
          return;
      }
      // Demo logic: just close modal and alert
      if (isEditMode) {
          alert(`已更新標準詞: ${formData.term}\n近似詞: ${formData.synonyms}`);
      } else {
          alert(`已新增標準詞: ${formData.term}\n近似詞: ${formData.synonyms}`);
      }
      setIsModalOpen(false);
      setFormData({ id: null, term: '', synonyms: '', category: '' });
      setIsEditMode(false);
  };

  const handleAddSynonym = (glossary) => {
      // Open modal to add synonym to this specific glossary
      const newSynonym = prompt(`新增近似詞至「${glossary.main_term}」:`);
      if (newSynonym) {
          alert(`已新增近似詞「${newSynonym}」至標準詞「${glossary.main_term}」`);
      }
  };


  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300 relative">
      
      {/* Header with Search */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 z-10 sticky top-0 shadow-sm">
         <div className="flex-1 flex items-center gap-3">
             <div className="relative flex-1 group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="搜尋標準詞或同義詞..."
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
                     <option value="all">所有分類</option>
                     {categoryOptions.map(opt => (
                         <option key={opt.value} value={opt.value}>{opt.label}</option>
                     ))}
                 </select>
                 <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             </div>
         </div>
         <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
                <Plus size={16} />
                新增標準詞
            </button>
         </div>
      </header>

      {/* Content Area Rendering */}
      <div className="flex-1 overflow-hidden flex flex-col">
          <SynonymManager searchTerm={searchTerm} selectedCategory={selectedCategory} onEdit={handleEdit} onAddSynonym={handleAddSynonym} />
      </div>

      {/* Add Synonym Modal */}
      {isModalOpen && (
        <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-lg border border-slate-200 p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-lg text-slate-800">{isEditMode ? '編輯近似詞' : '新增近似詞'}</h3>
                    <button onClick={() => {setIsModalOpen(false); setIsEditMode(false);}} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">分類</label>
                        <select 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="">選擇分類...</option>
                            {categoryOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">標準詞</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                            placeholder="例如：人工智能"
                            value={formData.term}
                            onChange={(e) => setFormData({...formData, term: e.target.value})}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">近似詞 / 同義詞</label>
                        <textarea 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 h-24 resize-none"
                            placeholder="請輸入近似詞，以逗號分隔。例如：AI, 人工智慧, 機器智能"
                            value={formData.synonyms}
                            onChange={(e) => setFormData({...formData, synonyms: e.target.value})}
                        ></textarea>
                        <p className="text-xs text-slate-500">多個詞彙請使用逗號分隔</p>
                    </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                        onClick={() => setIsModalOpen(false)}
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
        </>
      )}
    </div>
  );
}
