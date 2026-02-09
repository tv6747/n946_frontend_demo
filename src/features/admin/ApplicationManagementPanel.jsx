import React, { useState } from 'react';
import { Search, Edit2, LayoutGrid, Users, Plus } from 'lucide-react';
import { MOCK_APPLICATIONS } from '../../data/mockServiceData';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_USERS } from '../../data/mockData';
import { ApplicationConfigPanel } from './ApplicationConfigPanel';

export function ApplicationManagementPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const handleEdit = (app) => {
      setSelectedApp(app);
  };

  const handleBack = () => {
      setSelectedApp(null);
  };

  const handleUpdateApp = (appId, updates) => {
      // Update the app in MOCK_APPLICATIONS (in a real app, this would be an API call)
      const app = MOCK_APPLICATIONS.find(a => a.id === appId);
      if (app) {
          Object.assign(app, updates);
      }
  };

  const handleDeleteApp = (appId) => {
      // Delete logic (in a real app, this would be an API call)
      alert(`App ${appId} would be deleted`);
      setSelectedApp(null);
  };

  // If an app is selected, show the config panel
  if (selectedApp) {
      return (
          <ApplicationConfigPanel 
              app={selectedApp}
              isCreating={false}
              users={MOCK_USERS}
              onUpdateApp={handleUpdateApp}
              onDeleteApp={handleDeleteApp}
              onBack={handleBack}
          />
      );
  }

  const filteredApps = MOCK_APPLICATIONS.filter(app => {
      // Exclude chatbots (they are managed in Bot Management)
      if (app.page && app.page.startsWith('bot_')) return false;

      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.page.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || app.level === levelFilter;
      return matchesSearch && matchesLevel;
  });

  // Helper functions to get names from IDs
  const getModelName = (id) => MOCK_LLM_MODELS.find(m => m.id === id)?.name || '(未設定)';
  const getParamName = (id) => MOCK_LLM_PARAMS.find(p => p.id === id)?.name || '(未設定)';
  const getPromptName = (id) => MOCK_LLM_PROMPTS.find(p => p.id === id)?.name || '(未設定)';

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
               type="text" 
               placeholder="搜尋應用名稱、頁面..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
            />
         </div>
         
         <div className="flex items-center gap-3">
            <select 
               value={levelFilter}
               onChange={(e) => setLevelFilter(e.target.value)}
               className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
                <option value="all">所有功能頁</option>
                <option value="GAI">GAI 互動平台</option>
                <option value="DOC">智慧公文系統</option>
            </select>
         </div>
      </header>

      {/* Card Grid */}
      <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map(app => (
              <div key={app.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all group relative">
                  {/* Level Strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${app.level === 'GAI' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${app.level === 'GAI' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                              <LayoutGrid size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-slate-800 truncate">{app.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${app.level === 'GAI' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                  {app.level === 'GAI' ? 'GAI 互動平台' : '智慧公文系統'}
                              </span>
                          </div>
                      </div>
                      
                      <button 
                        onClick={() => handleEdit(app)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                      >
                          <Edit2 size={16} />
                      </button>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-3 pl-2">
                      {/* <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">功能頁</label>
                          <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                              {app.page}
                          </div>
                      </div> */}
                      
                      {/* Default Settings */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">預設設定</label>
                          <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-500 w-12">模型:</span>
                                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                      {getModelName(app.defaultSettings.modelId)}
                                  </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-500 w-12">參數:</span>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                      {getParamName(app.defaultSettings.paramId)}
                                  </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-500 w-12">提示詞:</span>
                                  <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                      {getPromptName(app.defaultSettings.promptId)}
                                  </span>
                              </div>
                          </div>
                      </div>

                      {/* Available Models */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">可選語言模型</label>
                          <div className="flex flex-wrap gap-1">
                              {app.availableModels.map(modelId => {
                                  const model = MOCK_LLM_MODELS.find(m => m.id === modelId);
                                  if (!model || model.status !== 'active') return null;
                                  return (
                                      <span key={modelId} className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                                          {model.name}
                                      </span>
                                  );
                              })}
                          </div>
                      </div>

                      {/* Welcome Message */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">歡迎詞</label>
                          <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
                              {app.welcomeMessage}
                          </div>
                      </div>

                      {/* Default Questions */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">預設問題</label>
                          <div className="text-xs text-slate-600 space-y-0.5">
                              {app.defaultQuestions.slice(0, 2).map((q, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                      <span className="text-blue-500 mt-0.5">•</span>
                                      <span className="line-clamp-1">{q}</span>
                                  </div>
                              ))}
                              {app.defaultQuestions.length > 2 && (
                                  <div className="text-[10px] text-slate-400 pl-3">+{app.defaultQuestions.length - 2} 更多...</div>
                              )}
                          </div>
                      </div>

                      {/* Permissions */}
                      <div className="pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5 text-slate-600">
                                  <Users size={12} />
                                  <span className="font-medium">
                                      {app.permissions.isPublic ? '公開' : `${app.permissions.allowedUsers.length} 位使用者`}
                                  </span>
                              </div>
                              <span className="text-[10px] text-slate-400">{app.createdAt}</span>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
