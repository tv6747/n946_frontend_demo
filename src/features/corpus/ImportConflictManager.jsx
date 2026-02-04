import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Save,
  Trash2,
  RefreshCw,
  Info
} from 'lucide-react';

export function ImportConflictManager() {
  // Mock Data
  const [conflicts, setConflicts] = useState([
    { id: 1, term: 'AI', new_mapping: 'Artificial Intelligence', current_mapping: 'Auto Import', status: 'conflict' },
    { id: 2, term: 'ML', new_mapping: 'Machine Learning', current_mapping: null, status: 'new' },
    { id: 3, term: 'NLP', new_mapping: 'Natural Language Processing', current_mapping: 'Natural Lang Proc', status: 'conflict' },
    { id: 4, term: 'LLM', new_mapping: 'Large Language Model', current_mapping: null, status: 'new' },
    { id: 5, term: 'RAG', new_mapping: 'Retrieval Augmented Generation', current_mapping: null, status: 'new' },
    { id: 6, term: 'OCR', new_mapping: 'Optical Character Recognition', current_mapping: null, status: 'new' },
    { id: 7, term: 'API', new_mapping: 'Application Programming Interface', current_mapping: null, status: 'new' },
  ]);

  const [dragActive, setDragActive] = useState(false);

  // Summary Stats
  const newCount = conflicts.filter(c => c.status === 'new').length;
  const conflictCount = conflicts.filter(c => c.status === 'conflict').length;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Mock upload logic
    alert("檔案已上傳 (模擬)");
  };

  const resolveConflict = (id, action) => {
    setConflicts(prev => prev.map(c => {
      if (c.id === id) {
        // Just mocking the resolution by changing status to 'match' or keeping it distinct but resolved
        // For UI purposes, let's mark it as resolved or update the value
        return { ...c, status: 'resolved', resolution: action };
      }
      return c;
    }));
  };

  const handleImportAllNew = () => {
    alert(`已匯入 ${newCount} 筆新詞彙`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0 z-10">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileSpreadsheet className="text-blue-600" size={20} />
            </div>              
            <div>
                <h1 className="text-xl font-bold text-slate-800 leading-tight">
                    專有名詞語料庫
                </h1>
                <p className="text-xs text-slate-500 mt-1">管理與維護專有名詞同義詞對照表</p>
            </div>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Conflict Resolution Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-sm text-slate-700">解析結果預覽</h3>
                <div className="flex gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                        <CheckCircle2 size={14} /> 新增: {newCount}
                    </span>
                    <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                        <AlertTriangle size={14} /> 衝突: {conflictCount}
                    </span>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                            <th className="px-6 py-3 font-medium w-32">詞彙 (Term)</th>
                            <th className="px-6 py-3 font-medium text-slate-400">現有對應 (DB)</th>
                            <th className="px-6 py-3 font-medium text-blue-600">新對應 (File)</th>
                            <th className="px-6 py-3 font-medium text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {conflicts.map((item) => (
                            <tr key={item.id} className={`group hover:bg-slate-50 transition-colors ${
                                item.status === 'new' ? 'bg-emerald-50/10' : 
                                item.status === 'conflict' ? 'bg-orange-50/10' : ''
                            }`}>
                                <td className="px-6 py-4 font-bold text-slate-700">
                                    {item.term}
                                </td>
                                <td className="px-6 py-4">
                                    {item.current_mapping ? (
                                        <div className="text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block text-xs font-mono">
                                            {item.current_mapping}
                                        </div>
                                    ) : (
                                        <span className="text-slate-300 italic text-xs">- 無 -</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-blue-700 bg-blue-50 px-2 py-1 rounded inline-block text-xs font-mono border border-blue-100">
                                        {item.new_mapping}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {item.status === 'new' && (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                            <CheckCircle2 size={12} /> 準備匯入
                                        </span>
                                    )}
                                    {item.status === 'conflict' && (
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => resolveConflict(item.id, 'keep')}
                                                className="px-3 py-1.5 text-xs border border-slate-300 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
                                            >
                                                保留現有
                                            </button>
                                            <button 
                                                onClick={() => resolveConflict(item.id, 'overwrite')}
                                                className="px-3 py-1.5 text-xs bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 hover:border-red-300 transition-colors font-medium flex items-center gap-1 shadow-sm"
                                            >
                                                <ShieldAlert size={12} /> 覆蓋更新
                                            </button>
                                        </div>
                                    )}
                                     {item.status === 'resolved' && (
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                                            {item.resolution === 'keep' ? '已保留現有' : '已選擇覆蓋'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
             <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-center bg-slate-50 text-xs text-slate-400 gap-4">
                <span>第 1 頁，共 1 頁</span>
             </div>
        </div>

      </div>

      {/* Sticky Footer Actions */}
      <div className="bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-between items-center z-10">
         <div className="text-sm text-slate-600">
            <span className="font-bold">{newCount}</span> 筆新資料待匯入，
            <span className="font-bold text-orange-600 mx-1">{conflictCount}</span> 筆衝突待解決
         </div>
         <div className="flex gap-3">
            <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2">
                <Trash2 size={16} /> 清除全部
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <button 
                onClick={handleImportAllNew}
                className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors text-xs font-bold flex items-center gap-2"
            >
                <CheckCircle2 size={16} /> 匯入所有新增 ({newCount})
            </button>
            <button 
                className={`px-6 py-2 rounded-lg text-white text-sm font-bold shadow-md flex items-center gap-2 transition-all ${
                    conflictCount > 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                }`}
                disabled={conflictCount > 0}
            >
                <Save size={18} /> 確認提交變更
            </button>
         </div>
      </div>
    </div>
  );
}
