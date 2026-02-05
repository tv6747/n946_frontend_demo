import React, { useState } from 'react';
import { Search, Filter, ChevronDown, UploadCloud } from 'lucide-react';
import { TermDefinitionManager } from './TermDefinitionManager';
import { MOCK_TERM_CATEGORIES } from '../../data/mockData';

export function ProperNounPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // Local state or context

  const categoryOptions = MOCK_TERM_CATEGORIES.map(c => ({ value: c.id, label: c.name }));

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
          <TermDefinitionManager searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
