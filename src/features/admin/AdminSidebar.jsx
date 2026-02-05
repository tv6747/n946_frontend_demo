import React from 'react';
import { LayoutGrid, Database, MessageSquare, BarChart2, Activity, Cpu, Sliders, FileText, Link, Shield } from 'lucide-react';
import { MODES } from '../../data/constants';

export function AdminSidebar({ 
  currentMode, 
  appSystemFilter, 
  onAppSystemFilterChange,
  auditView,
  onAuditViewChange,
  llmSubModule,
  onLLMSubModuleChange,
  serviceSubModule,
  onServiceSubModuleChange
}) {
  
  if (currentMode === MODES.ADMIN_SERVICE) {
      return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 w-64">
             <div className="px-5 py-4 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">選擇功能</p>
             </div>
             <div className="p-3 space-y-1 overflow-y-auto flex-1">
                <button 
                    onClick={() => onServiceSubModuleChange('apps')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${serviceSubModule === 'apps' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <LayoutGrid size={18} /> 應用管理
                </button>
                <button 
                    onClick={() => onServiceSubModuleChange('kb_permission')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${serviceSubModule === 'kb_permission' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <Shield size={18} /> 知識庫權限
                </button>
            </div>
        </div>
      );
  }
  
  if (currentMode === MODES.ADMIN_LLM) {
      return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 w-64">
             <div className="px-5 py-4 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">選擇功能</p>
             </div>
             <div className="p-3 space-y-1 overflow-y-auto flex-1">
                <button 
                    onClick={() => onLLMSubModuleChange('models')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${llmSubModule === 'models' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <Cpu size={18} /> 模型管理
                </button>
                <button 
                    onClick={() => onLLMSubModuleChange('params')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${llmSubModule === 'params' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <Sliders size={18} /> 模型參數
                </button>
                <button 
                    onClick={() => onLLMSubModuleChange('prompts')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${llmSubModule === 'prompts' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <FileText size={18} /> 提示詞管理
                </button>
                <button 
                    onClick={() => onLLMSubModuleChange('apis')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${llmSubModule === 'apis' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <Link size={18} /> API 管理
                </button>
            </div>
        </div>
      );
  }



  if (currentMode === MODES.ADMIN_AUDIT) {
      return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 w-64">
             <div className="px-5 py-4 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">選擇報表</p>
             </div>
             <div className="p-3 space-y-1 overflow-y-auto flex-1">
                <button 
                    onClick={() => onAuditViewChange('kb_logs')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${auditView === 'kb_logs' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <Database size={18} /> 知識庫紀錄
                </button>
                <button 
                    onClick={() => onAuditViewChange('chat_logs')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${auditView === 'chat_logs' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <MessageSquare size={18} /> 對話紀錄
                </button>
                <button 
                    onClick={() => onAuditViewChange('stats')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${auditView === 'stats' ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    <BarChart2 size={18} /> 統計圖表
                </button>
            </div>
        </div>
      );
  }

  // Default fallback
  return (
        <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 w-64">
             <div className="p-5 border-b border-slate-200 bg-white">
             <LayoutGrid size={20} className="text-slate-400" />
        </div>
        <p className="text-sm text-slate-500">選擇上方功能選單切換管理模組</p>
    </div>
  );
}
