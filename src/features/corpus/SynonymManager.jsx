import React, { useMemo } from 'react';
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
import { MOCK_GLOSSARIES, MOCK_CORPUS_MODELS } from '../../data/mockData';

export function SynonymManager({ searchTerm, selectedModel, onEdit }) {
  const data = useMemo(() => {
    return MOCK_GLOSSARIES.filter(item => {
        const matchSearch = item.word_before.includes(searchTerm) || item.word_after.includes(searchTerm);
        const matchModel = selectedModel === 'all' || item.model === 'all' || item.model === selectedModel;
        return matchSearch && matchModel;
    }).map(item => ({
        ...item,
        modelDetails: MOCK_CORPUS_MODELS.find(m => m.id === item.model)
    }));
  }, [searchTerm, selectedModel]);

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full">
      <div className="pt-4"></div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <th className="px-6 py-3 font-medium w-[20%]">修正前</th>
                        <th className="px-6 py-3 font-medium w-[35%]">修正後</th>
                        <th className="px-6 py-3 font-medium w-[20%]">適用模型</th>
                        <th className="px-6 py-3 font-medium w-[15%]">同步狀態</th>
                        <th className="px-6 py-3 font-medium text-right w-[10%]">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 align-top">
                                <div className="font-bold text-slate-800 text-base">{item.word_before}</div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="font-mono text-slate-800 text-base">{item.word_after}</div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <Tag size={12} className="text-slate-400" />
                                    {item.modelDetails ? item.modelDetails.name : '適用所有模型'}
                                </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                                {item.sync_status === 0 ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">待同步</span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">已同步</span>
                                )}
                            </td>
                            <td className="px-6 py-4 align-top text-right">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => onEdit && onEdit(item)}
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
