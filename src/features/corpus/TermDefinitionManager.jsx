import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, ChevronDown, ChevronRight, FileText, Calendar, Tag, Info, AlertCircle } from 'lucide-react';
import { MOCK_TERM_DEFINITIONS, MOCK_TERM_CATEGORIES, MOCK_TERM_ANNOTATIONS } from '../../data/mockData';

export function TermDefinitionManager({ searchTerm, selectedCategory }) {
  // const [selectedCategory, setSelectedCategory] = useState('all'); // Moved to Parent
  const [expandedTermId, setExpandedTermId] = useState(null);

  // Filter Data
  const filteredData = useMemo(() => {
    return MOCK_TERM_DEFINITIONS.filter(term => {
      const matchSearch = term.term_name.includes(searchTerm) || term.definition.includes(searchTerm);
      const matchCategory = selectedCategory === 'all' || term.categories.includes(parseInt(selectedCategory));
      return matchSearch && matchCategory;
    }).map(term => ({
        ...term,
        categoryDetails: term.categories.map(catId => MOCK_TERM_CATEGORIES.find(c => c.id === catId)),
        annotations: MOCK_TERM_ANNOTATIONS.filter(a => a.term_id === term.id)
    }));
  }, [searchTerm, selectedCategory]);

  const toggleExpand = (id) => {
      setExpandedTermId(expandedTermId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full">
      {/* Category Filter - Moved to Parent (CorpusFeature) */}
      <div className="pt-2"></div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
            {filteredData.map((term) => (
                <div 
                    key={term.id} 
                    className={`bg-white border rounded-xl transition-all duration-200 overflow-hidden ${
                        expandedTermId === term.id 
                        ? 'border-blue-200 shadow-md ring-1 ring-blue-500/20' 
                        : 'border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'
                    }`}
                >
                    {/* Card Header (Clickable) */}
                    <div 
                        className="px-6 py-5 cursor-pointer flex items-start gap-4"
                        onClick={() => toggleExpand(term.id)}
                    >
                        <div className={`mt-1 transition-transform duration-300 ${expandedTermId === term.id ? 'rotate-90 text-blue-600' : 'text-slate-400'}`}>
                            <ChevronRight size={20} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-slate-900 leading-none">{term.term_name}</h3>
                                {term.is_legal_binding && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 uppercase tracking-wide">
                                        <AlertCircle size={10} className="fill-current" /> 法定定義
                                    </span>
                                )}
                                {!term.is_current && (
                                     <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200">
                                        非現行
                                    </span>
                                )}
                            </div>
                            
                            {/* Truncated Definition */}
                            <p className={`text-slate-600 text-sm leading-relaxed mb-3 ${expandedTermId === term.id ? 'hidden' : 'line-clamp-2'}`}>
                                {term.definition}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                    <BookOpen size={12} className="text-blue-500"/>
                                    <span className="font-medium text-slate-700">{term.source_title}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Tag size={12} />
                                    <div className="flex gap-1">
                                        {term.categoryDetails.map((c, idx) => (
                                            <span key={idx} className="hover:text-blue-600 transition-colors">{c.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="ml-auto font-mono text-slate-400 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                                    {term.version_tag}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedTermId === term.id && (
                        <div className="px-6 pb-6 pl-[3.25rem] border-t border-slate-100 bg-slate-50/50 animate-in slide-in-from-top-2 duration-200">
                            {/* Full Definition */}
                            <div className="pt-4 mb-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FileText size={12} /> 完整定義
                                </h4>
                                <div className="p-4 bg-white rounded-lg border border-slate-200 text-slate-800 leading-7 text-sm shadow-sm">
                                    {term.definition}
                                </div>
                            </div>

                            {/* Annotations Section */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Info size={12} /> 行政函釋與補充說明 ({term.annotations.length})
                                </h4>
                                {term.annotations.length > 0 ? (
                                    <div className="space-y-3">
                                        {term.annotations.map(anno => (
                                            <div key={anno.id} className="bg-blue-50/30 border border-blue-100 rounded-lg p-3 hover:bg-blue-50/60 transition-colors">
                                                <div className="flex items-start justify-between mb-2">
                                                     <span className="font-bold text-blue-800 text-xs bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">
                                                        {anno.doc_number}
                                                     </span>
                                                     <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                        <Calendar size={10} />
                                                        {anno.effective_date}
                                                     </div>
                                                </div>
                                                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                                    {anno.annotation_content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                                        尚無相關函釋
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {filteredData.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p>找不到符合條件的名詞</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
