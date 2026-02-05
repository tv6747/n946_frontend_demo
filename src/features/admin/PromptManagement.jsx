import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, FileText, Settings, ChevronRight, ChevronDown, HelpCircle, Copy, RefreshCw, Cpu, Save } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../../data/constants';

export function PromptManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTemplateId, setExpandedTemplateId] = useState(null);

  const toggleExpand = (id) => {
      setExpandedTemplateId(expandedTemplateId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">提示詞管理</h1>
            <p className="text-xs text-slate-500 mt-1">管理 System Prompts 與通用模板</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold">
             <Plus size={16} /> 新增模板
         </button>
      </header>

      <div className="px-6 py-4 flex-shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder="搜尋模板名稱..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                        <th className="px-6 py-3 font-medium w-64">模板名稱</th>
                        <th className="px-6 py-3 font-medium">摘要</th>
                        <th className="px-6 py-3 font-medium text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {PROMPT_TEMPLATES.map(t => {
                        const isExpanded = expandedTemplateId === t.id;
                        return (
                            <React.Fragment key={t.id}>
                                <tr 
                                    className={`group hover:bg-slate-50 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50' : ''}`}
                                    onClick={() => toggleExpand(t.id)}
                                >
                                    <td className="px-6 py-4 font-bold text-slate-700 flex items-center gap-3">
                                        <div className={`transition-transform duration-200 text-slate-400 ${isExpanded ? 'rotate-90 text-blue-500' : ''}`}>
                                            <ChevronRight size={16} />
                                        </div>
                                        <FileText size={16} className="text-slate-400" />
                                        {t.label}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs truncate max-w-xs">
                                        {t.content.substring(0, 50)}...
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" onClick={(e) => { e.stopPropagation(); }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                                {isExpanded && (
                                    <tr className="bg-slate-50/50">
                                        <td colSpan={3} className="px-6 py-6 border-t border-slate-100 animate-in slide-in-from-top-2">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pl-8">
                                                
                                                {/* Left Column: Prompt & Parameters */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">System Prompt</label>
                                                        <textarea 
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono leading-relaxed h-48 resize-none shadow-sm"
                                                            defaultValue={t.content}
                                                        ></textarea>
                                                    </div>

                                                    {/* Parameters Section (LLMSettingsModal Style) */}
                                                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                                                        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                                                            <Cpu size={14} className="text-blue-500" /> 預設參數
                                                        </h4>
                                                        
                                                        <div className="space-y-4">
                                                            {/* Temperature */}
                                                            <div>
                                                                <div className="flex justify-between items-center mb-1.5">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <label className="text-xs font-bold text-slate-500 uppercase">Temperature</label>
                                                                        <div className="group relative">
                                                                            <HelpCircle size={12} className="text-slate-400 cursor-help" />
                                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                                                控制隨機性。建議值: 0.7
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">0.7</span>
                                                                </div>
                                                                <input type="range" min="0" max="1" step="0.1" defaultValue={0.7} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                                            </div>

                                                            {/* Top P */}
                                                            <div>
                                                                <div className="flex justify-between items-center mb-1.5">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <label className="text-xs font-bold text-slate-500 uppercase">Top P</label>
                                                                        <div className="group relative">
                                                                            <HelpCircle size={12} className="text-slate-400 cursor-help" />
                                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                                                核取樣機率。建議值: 0.9
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">0.9</span>
                                                                </div>
                                                                <input type="range" min="0" max="1" step="0.1" defaultValue={0.9} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column: Generated Example */}
                                                <div className="flex flex-col h-full">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">生成範例 (Example Output)</label>
                                                        <div className="flex gap-2">
                                                            <button className="text-slate-400 hover:text-blue-600 transition-colors" title="重新生成範例">
                                                                <RefreshCw size={12} />
                                                            </button>
                                                            <button className="text-slate-400 hover:text-blue-600 transition-colors" title="複製內容">
                                                                <Copy size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-slate-100 border border-slate-200 rounded-lg p-4 font-mono text-xs text-slate-600 leading-relaxed overflow-y-auto max-h-[400px]">
                                                        <p className="mb-2 text-slate-400 select-none">// User Input: "請幫我寫一封會議邀請函"</p>
                                                        <div className="w-full h-px bg-slate-200 mb-2"></div>
                                                        <p>
                                                            Subject: 【邀請】專案啟動會議 Project Kick-off Meeting<br/><br/>
                                                            Dear Team,<br/><br/>
                                                            誠摯邀請您參加本次專案啟動會議，我們將討論專案目標、時程規劃與任務分配。<br/><br/>
                                                            時間：2024-02-10 (週五) 14:00 - 15:30<br/>
                                                            地點：會議室 A / 線上連結<br/>
                                                            議程：<br/>
                                                            1. 專案背景介紹<br/>
                                                            2. 關鍵里程碑說明<br/>
                                                            3. Q&A<br/><br/>
                                                            請確認您的行事曆，期待您的參與。<br/><br/>
                                                            Best Regards,
                                                        </p>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 mt-2 text-right">
                                                        * 此範例由目前的 System Prompt 與參數設定即時生成參考。
                                                    </p>
                                                </div>

                                            </div>
                                            
                                            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200 pl-8">
                                                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                                    還原預設
                                                </button>
                                                <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                                                    <Save size={14} /> 保存變更
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
