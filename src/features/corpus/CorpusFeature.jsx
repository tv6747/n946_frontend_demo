import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { TermDefinitionManager } from './TermDefinitionManager';
import { SynonymManager } from './SynonymManager';
import { CORPUS_PAGES, MOCK_TERM_CATEGORIES, MOCK_GLOSSARIES } from '../../data/mockData';

export function CorpusFeature({ selectedCorpusId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Reset filter/search when switching pages
  useEffect(() => {
    setSearchTerm('');
    setSelectedCategory('all');
  }, [selectedCorpusId]);

  // Determine category options based on active page
  const categoryOptions = React.useMemo(() => {
      if (selectedCorpusId === 'proper_noun') {
          return MOCK_TERM_CATEGORIES.map(c => ({ value: c.id, label: c.name }));
      } else if (selectedCorpusId === 'synonym_mgr') {
          // Extract unique categories from glossaries
          const cats = [...new Set(MOCK_GLOSSARIES.map(g => g.category))];
          return cats.map(c => ({ value: c, label: c }));
      }
      return [];
  }, [selectedCorpusId]);

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      
      {/* Unified Header with Search */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex flex-col gap-4 flex-shrink-0 z-10 sticky top-0 shadow-sm">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <div>
                    <h1 className="text-xl font-bold text-slate-800 leading-tight tracking-tight">
                        {CORPUS_PAGES.find(p => p.id === selectedCorpusId)?.label || '語料庫管理'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                        {selectedCorpusId === 'proper_noun' ? '維護專有名詞與定義語料庫' : '維護標準名詞及其對應的同義詞與變體'}
                    </p>
                </div>
            </div>
         </div>
         {/* Unified Toolbar: Search & Filter */}
         <div className="flex items-center gap-3">
             <div className="relative flex-1 group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder={selectedCorpusId === 'proper_noun' ? "搜尋名詞、定義內容..." : "搜尋標準詞或同義詞..."}
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
                     <option value="all">{selectedCorpusId === 'proper_noun' ? '所有業務範疇' : '所有分類'}</option>
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
          {selectedCorpusId === 'proper_noun' ? (
              <TermDefinitionManager searchTerm={searchTerm} selectedCategory={selectedCategory} />
          ) : selectedCorpusId === 'synonym_mgr' ? (
              <SynonymManager searchTerm={searchTerm} selectedCategory={selectedCategory} />
          ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 h-full bg-slate-50">
                 <div className="w-16 h-16 rounded-2xl bg-slate-200 mb-4 animate-pulse"></div>
                 <p>功能開發中 ({CORPUS_PAGES.find(p=>p.id===selectedCorpusId)?.label})</p>
              </div>
          )}
      </div>
    </div>
  );
}
