import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Plus, 
  Tag, 
  Edit2, 
  Trash2, 
  MoreHorizontal,
  Hash,
  Info
} from 'lucide-react';
import { MOCK_GLOSSARIES, MOCK_SYNONYMS } from '../../data/mockData';

export function SynonymManager({ searchTerm, selectedCategory, onEdit, onAddSynonym }) {
  // const [searchTerm, setSearchTerm] = useState(''); // Removed internal state
  
  // Combine Glossaries with their Synonyms
  const data = useMemo(() => {
    return MOCK_GLOSSARIES.map(g => ({
        ...g,
        synonyms: MOCK_SYNONYMS.filter(s => s.glossary_id === g.id)
    })).filter(item => {
        const matchSearch = item.main_term.includes(searchTerm) || 
                            item.synonyms.some(s => s.synonym_term.includes(searchTerm));
        const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full">
      {/* Header Removed */}
      
      {/* Toolbar Removed - Content directly */}
      <div className="pt-4"></div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <th className="px-6 py-3 font-medium w-1/4">標準名詞</th>
                        <th className="px-6 py-3 font-medium w-1/2">近似用語 / 同義詞</th>
                        <th className="px-6 py-3 font-medium w-1/6">分類</th>
                        <th className="px-6 py-3 font-medium text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{item.main_term}</div>
                                <div className="text-xs text-slate-400 mt-1 line-clamp-2" title={item.description}>
                                    {item.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="flex flex-wrap gap-2">
                                    {item.synonyms.map(syn => (
                                        <div key={syn.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 group/tag">
                                            <span className="font-medium" title={syn.remark}>{syn.synonym_term}</span>
                                            {syn.remark && <Info size={10} className="text-indigo-400 opacity-50" />}
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => onAddSynonym && onAddSynonym(item)}
                                        className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-dashed border-slate-300 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 align-top text-right">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => onEdit && onEdit({id: item.id, term: item.main_term, synonyms: item.synonyms.map(s => s.synonym_term), category: item.category})}
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
            
            {data.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                    <p>找不到符合的資料</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
