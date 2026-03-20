import React, { useMemo } from 'react';
import { Search, BookOpen, Tag, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { MOCK_TERM_DEFINITIONS, MOCK_CORPUS_MODEL_TYPES, MOCK_CORPUS_MODELS } from '../../data/mockData';

export function TermDefinitionManager({ searchTerm, selectedType, selectedModelType, selectedModel, onEdit }) {
  // Filter Data
  const filteredData = useMemo(() => {
    return MOCK_TERM_DEFINITIONS.filter(term => {
      const matchSearch = term.term_name.includes(searchTerm);
      const matchType = selectedType === 'all' || term.type === selectedType;
      const matchModelType = selectedModelType === 'all' || term.modelType === 'all' || term.modelType === selectedModelType;
      const matchModel = selectedModel === 'all' || term.model === 'all' || term.model === selectedModel;
      return matchSearch && matchType && matchModelType && matchModel;
    }).map(term => ({
        ...term,
        modelTypeDetails: MOCK_CORPUS_MODEL_TYPES.find(m => m.id === term.modelType),
        modelDetails: MOCK_CORPUS_MODELS.find(m => m.id === term.model)
    }));
  }, [searchTerm, selectedType, selectedModelType, selectedModel]);

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full">
      {/* Category Filter - Moved to Parent (CorpusFeature) */}
      <div className="pt-4"></div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <th className="px-6 py-3 font-medium w-1/5">詞彙</th>
                        <th className="px-6 py-3 font-medium w-1/5">詞庫類型</th>
                        <th className="px-6 py-3 font-medium w-1/6">機率</th>
                        <th className="px-6 py-3 font-medium w-1/6">同步狀態</th>
                        <th className="px-6 py-3 font-medium w-1/6">更新時間</th>
                        <th className="px-6 py-3 font-medium text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredData.map((term) => (
                        <tr key={term.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{term.term_name}</div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-slate-700">
                                        {term.type === 'user' ? '用戶詞庫' : '拼音詞庫'}
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                        <Tag size={12} className="text-slate-400" />
                                        {term.modelTypeDetails ? term.modelTypeDetails.name.split('（')[0] : '無適用類型'}
                                        <span className="text-slate-300 mx-1">|</span>
                                        {term.modelDetails ? term.modelDetails.name : '適用所有模型'}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="text-sm text-slate-700 font-mono">
                                    {term.type === 'pinyin' ? '-' : term.probability.toFixed(2)}
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                {term.sync_status === 0 && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                                        等待整合
                                    </span>
                                )}
                                {term.sync_status === 1 && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                                        已整合
                                    </span>
                                )}
                                {term.sync_status === 2 && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                                        等待刪除
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="font-mono text-slate-600 text-sm">
                                    {term.updated_at}
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
