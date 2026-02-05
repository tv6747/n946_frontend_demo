import React, { useState, useMemo } from 'react';
import { Search, Globe, Lock, Settings, Edit2, X, Save, Cpu, HelpCircle, Check } from 'lucide-react';
import { MOCK_ADMIN_APPS } from '../../data/mockData';

export function AppManagement({ selectedSystem = 'ALL' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  
  // Local state to track active/inactive status since it's not in the mock data initially
  // Initialize all as active
  const [appStatuses, setAppStatuses] = useState(() => {
    const statuses = {};
    MOCK_ADMIN_APPS.forEach(app => statuses[app.id] = 'active');
    return statuses;
  });

  const toggleAppStatus = (e, appId) => {
      e.stopPropagation(); // Prevent card click if needed
      setAppStatuses(prev => ({
          ...prev,
          [appId]: prev[appId] === 'active' ? 'inactive' : 'active'
      }));
  };

  const filteredApps = useMemo(() => {
    return MOCK_ADMIN_APPS.filter(app => {
        const matchSearch = app.name.includes(searchTerm) || app.description.includes(searchTerm);
        const matchSystem = selectedSystem === 'ALL' || app.system === selectedSystem;
        return matchSearch && matchSystem;
    });
  }, [searchTerm, selectedSystem]);

  const handleEdit = (app) => {
      setEditingApp(app);
      setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300 relative">
      {/* Search Header */}
      <div className="flex-none px-6 py-5 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center justify-between">
         <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">應用管理</h1>
            <p className="text-xs text-slate-500 mt-1">設定各系統應用權限與參數</p>
         </div>
         <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder="搜尋應用..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
         </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <h3 className="col-span-full text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
                {selectedSystem === 'ALL' ? '全部系統' : selectedSystem === 'GAI' ? 'GAI 互動平台' : '智慧公文輔助系統'} ({filteredApps.length})
            </h3>
            {filteredApps.map(app => {
                const isActive = appStatuses[app.id] === 'active';
                return (
                    <div key={app.id} className={`bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition-all group flex flex-col text-left relative overflow-hidden ${isActive ? 'border-slate-200' : 'border-slate-200 opacity-80 bg-slate-50'}`}>
                        {/* Status Strip */}
                        <div className={`absolute top-0 left-0 w-1 h-full ${isActive ? 'bg-blue-500' : 'bg-slate-300'}`}></div>

                        <div className="flex items-start justify-between mb-4 pl-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm border border-slate-100 ${app.system === 'GAI' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'} ${!isActive && 'grayscale'}`}>
                                    {app.system}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-slate-800 truncate pr-2">{app.name}</h3>
                                    <div className="flex gap-1 mt-0.5">
                                        {app.system === 'DOC' && <span className="text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 px-1 rounded">Restricted</span>}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Toggle Switch */}
                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={isActive}
                                    onChange={(e) => toggleAppStatus(e, app.id)}
                                />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1 pl-2">{app.description}</p>
                        
                        <div className="pl-2 space-y-3 mb-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Current Model</label>
                                <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded truncate border border-slate-100">
                                    {app.model}
                                </div>
                            </div>
                        </div>

                        <div className="pl-2 flex items-center justify-end gap-2 pt-3 border-t border-slate-100 mt-auto">
                            <button 
                                onClick={() => handleEdit(app)}
                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <Settings size={16} /> 設定
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                  <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                          <Settings size={20} className="text-blue-600" />
                          {editingApp?.name} 設定
                      </h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={20} />
                      </button>
                  </header>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                      <div className="grid grid-cols-12 gap-8">
                            {/* Left Column: Permissions & General */}
                            <div className="col-span-12 md:col-span-5 space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block flex items-center gap-2">
                                        <Globe size={12} /> 可存取部門
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {editingApp?.departments?.length > 0 ? editingApp.departments.map(d => (
                                            <span key={d} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-600 font-medium shadow-sm">
                                                {d}
                                            </span>
                                        )) : <span className="text-xs text-slate-400 italic">無特定限制</span>}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block flex items-center gap-2">
                                        <Lock size={12} /> 指定使用者
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {editingApp?.users?.length > 0 ? editingApp.users.map(u => (
                                            <span key={u} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-600 font-medium shadow-sm">
                                                {u}
                                            </span>
                                        )) : <span className="text-xs text-slate-400 italic">無特定限制</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Model Parameters (Styled like LLMSettingsModal) */}
                            <div className="col-span-12 md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
                                    <Cpu size={16} className="text-blue-500" /> 模型參數設定
                                </h4>
                                
                                <div className="space-y-4">
                                    <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1.5">使用模型</label>
                                            <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                                                <option value="gpt-4o">GPT-4o (OpenAI)</option>
                                                <option value="claude-3.5">Claude 3.5 Sonnet (Anthropic)</option>
                                                <option value="llama-3">Llama 3 70B (Local)</option>
                                            </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1.5">System Prompt</label>
                                        <textarea 
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none h-32 font-mono leading-relaxed"
                                            defaultValue={editingApp?.settings?.systemPrompt || ''}
                                        ></textarea>
                                    </div>

                                    {/* Sliders Area - Matching LLMSettingsModal Style */}
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        {/* Temperature */}
                                        <div className="col-span-2">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Temperature</label>
                                                    <div className="group relative">
                                                        <HelpCircle size={12} className="text-slate-400 cursor-help" />
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                            控制隨機性。值越高回應越有創意；值越低越精確。
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">{editingApp?.settings?.temperature || 0.7}</span>
                                            </div>
                                            <input 
                                                type="range" min="0" max="1" step="0.1" 
                                                defaultValue={editingApp?.settings?.temperature || 0.7} 
                                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                                            />
                                        </div>

                                        {/* Top P */}
                                        <div className="col-span-1">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Top P</label>
                                                    <div className="group relative">
                                                        <HelpCircle size={12} className="text-slate-400 cursor-help" />
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                            核取樣機率閾值。
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">{editingApp?.settings?.topP || 0.9}</span>
                                            </div>
                                            <input 
                                                type="range" min="0" max="1" step="0.05" 
                                                defaultValue={editingApp?.settings?.topP || 0.9} 
                                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                                            />
                                        </div>

                                        {/* Top K */}
                                        <div className="col-span-1">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-1.5">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Top K</label>
                                                    <div className="group relative">
                                                        <HelpCircle size={12} className="text-slate-400 cursor-help" />
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                            保留機率最高的 K 個詞彙。
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <input 
                                                type="number" 
                                                defaultValue={editingApp?.settings?.topK || 40} 
                                                className="w-full px-2 py-0.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-400 text-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>

                  <footer className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3 flex-shrink-0">
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                          取消
                      </button>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                      >
                          <Save size={16} /> 儲存設定
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}
