import React, { useMemo } from 'react';
import { Search, BookOpen, Tag, Info, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { MOCK_TERM_DEFINITIONS, MOCK_TERM_CATEGORIES, MOCK_TERM_ANNOTATIONS } from '../../data/mockData';

export function TermDefinitionManager({ searchTerm, selectedCategory, onEdit }) {
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

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full">
      {/* Category Filter - Moved to Parent (CorpusFeature) */}
      <div className="pt-4"></div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <th className="px-6 py-3 font-medium w-1/5">專有名詞</th>
                        <th className="px-6 py-3 font-medium w-2/5">定義內容</th>
                        <th className="px-6 py-3 font-medium w-1/6">來源 / 分類</th>
                        <th className="px-6 py-3 font-medium w-1/6">狀態 / 版本</th>
                        <th className="px-6 py-3 font-medium text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredData.map((term) => (
                        <tr key={term.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base flex items-center gap-2 flex-wrap">
                                    {term.term_name}
                                    {term.is_legal_binding && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 uppercase tracking-wide">
                                            <AlertCircle size={10} className="fill-current" /> 法定
                                        </span>
                                    )}
                                    {!term.is_current && (
                                        <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200">
                                            非現行
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="text-sm text-slate-700 leading-relaxed line-clamp-3" title={term.definition}>
                                    {term.definition}
                                </div>
                                {term.annotations.length > 0 && (
                                    <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                                        <Info size={12} />
                                        <span>{term.annotations.length} 筆函釋說明</span>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <BookOpen size={12} className="text-blue-500"/>
                                        <span className="font-medium text-slate-700">{term.source_title}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {term.categoryDetails.map((c, idx) => (
                                            <span key={idx} className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                                {c.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="font-mono text-slate-600 text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block">
                                    {term.version_tag}
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top text-right">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => onEdit && onEdit(term)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                                        title="編輯"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="刪除">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {filteredData.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                    <p>找不到符合的資料</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
