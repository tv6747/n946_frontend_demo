import React, { useState } from 'react';
import { Search, Edit2, LayoutGrid, Users, MessageSquare, HelpCircle, X, ArrowRight, ChevronsRight, Check, Cpu } from 'lucide-react';
import { MOCK_APPLICATIONS } from '../../data/mockServiceData';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_USERS } from '../../data/mockData';

export function ApplicationManagementPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  
  // Transfer List states for models
  const [selectedAvailableModelIds, setSelectedAvailableModelIds] = useState([]);
  
  // Transfer List states for users
  const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  const handleEdit = (app) => {
      setSelectedApp(app);
      setSelectedAvailableModelIds([]);
      setSelectedAvailableUserIds([]);
      setUserSearch('');
      setIsModalOpen(true);
  };

  const filteredApps = MOCK_APPLICATIONS.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.page.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || app.level === levelFilter;
      return matchesSearch && matchesLevel;
  });

  // Helper functions to get names from IDs
  const getModelName = (id) => MOCK_LLM_MODELS.find(m => m.id === id)?.name || '(未設定)';
  const getParamName = (id) => MOCK_LLM_PARAMS.find(p => p.id === id)?.name || '(未設定)';
  const getPromptName = (id) => MOCK_LLM_PROMPTS.find(p => p.id === id)?.name || '(未設定)';
  const getUserName = (id) => MOCK_USERS.find(u => u.id === id)?.name || '(未知)';
  
  // Get only enabled models
  const enabledModels = MOCK_LLM_MODELS.filter(m => m.status === 'active');

  // Filtered users for search
  const filteredUsers = MOCK_USERS.filter(u => u.name.includes(userSearch));

  // Transfer List Handlers for Models
  const toggleAvailableModelSelection = (id) => {
    if (selectedAvailableModelIds.includes(id)) {
        setSelectedAvailableModelIds(prev => prev.filter(mid => mid !== id));
    } else {
        setSelectedAvailableModelIds(prev => [...prev, id]);
    }
  };

  const handleAddModelsToApp = () => {
    if (selectedAvailableModelIds.length === 0 || !selectedApp) return;
    const currentModels = selectedApp.availableModels || [];
    const newModelsToAdd = selectedAvailableModelIds.filter(id => !currentModels.includes(id));
    if (newModelsToAdd.length > 0) {
        selectedApp.availableModels = [...currentModels, ...newModelsToAdd];
        setSelectedAvailableModelIds([]);
    }
  };

  const handleAddAllModels = () => {
    if (!selectedApp) return;
    const currentModels = selectedApp.availableModels || [];
    const allEnabledIds = enabledModels.map(m => m.id);
    const newModelsToAdd = allEnabledIds.filter(id => !currentModels.includes(id));
    if (newModelsToAdd.length > 0) {
        selectedApp.availableModels = [...currentModels, ...newModelsToAdd];
    }
  };

  const handleRemoveModel = (modelId) => {
    if (!selectedApp) return;
    const currentModels = selectedApp.availableModels || [];
    selectedApp.availableModels = currentModels.filter(id => id !== modelId);
  };

  // Transfer List Handlers for Users
  const toggleAvailableUserSelection = (id) => {
    if (selectedAvailableUserIds.includes(id)) {
        setSelectedAvailableUserIds(prev => prev.filter(uid => uid !== id));
    } else {
        setSelectedAvailableUserIds(prev => [...prev, id]);
    }
  };

  const handleAddUsersToApp = () => {
    if (selectedAvailableUserIds.length === 0 || !selectedApp) return;
    const currentUsers = selectedApp.permissions.allowedUsers || [];
    const newUsersToAdd = selectedAvailableUserIds.filter(id => !currentUsers.includes(id));
    if (newUsersToAdd.length > 0) {
        selectedApp.permissions.allowedUsers = [...currentUsers, ...newUsersToAdd];
        setSelectedAvailableUserIds([]);
    }
  };

  const handleAddAllUsers = () => {
    if (!selectedApp) return;
    const currentUsers = selectedApp.permissions.allowedUsers || [];
    const allFilteredIds = filteredUsers.map(u => u.id);
    const newUsersToAdd = allFilteredIds.filter(id => !currentUsers.includes(id));
    if (newUsersToAdd.length > 0) {
        selectedApp.permissions.allowedUsers = [...currentUsers, ...newUsersToAdd];
    }
  };

  const handleRemoveUser = (userId) => {
    if (!selectedApp) return;
    const currentUsers = selectedApp.permissions.allowedUsers || [];
    selectedApp.permissions.allowedUsers = currentUsers.filter(id => id !== userId);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         {/* Search Filters */}
         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="搜尋應用名稱或功能頁..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
               />
            </div>
            <div className="relative">
               <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
               >
                  <option value="all">全部層級</option>
                  <option value="GAI">GAI 互動平台</option>
                  <option value="DOC">智慧公文輔助系統</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                  </svg>
               </div>
            </div>
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
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">功能頁</label>
                          <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                              {app.page}
                          </div>
                      </div>
                      
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
                              {app.defaultSettings.promptId && (
                                  <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] text-slate-500 w-12">提示:</span>
                                      <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                          {getPromptName(app.defaultSettings.promptId)}
                                      </span>
                                  </div>
                              )}
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

      {/* Edit Modal */}
      {isModalOpen && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <LayoutGrid size={18} className="text-blue-600" />
                          編輯應用設定 - {selectedApp.name}
                      </h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={18} />
                      </button>
                  </header>
                  <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
                      {/* Basic Info */}
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">應用名稱</label>
                              <input 
                                type="text" 
                                value={selectedApp.name} 
                                readOnly
                                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed" 
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">應用層級</label>
                              <input 
                                type="text" 
                                value={selectedApp.level === 'GAI' ? 'GAI 互動平台' : '智慧公文輔助系統'} 
                                readOnly
                                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed" 
                              />
                          </div>
                      </div>

                      {/* Default Settings */}
                      <div className="border-t border-slate-200 pt-4">
                          <h4 className="text-sm font-bold text-slate-700 mb-3">預設設定</h4>
                          <div className="grid grid-cols-1 gap-3">
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">模型</label>
                                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                                      <option value="">請選擇模型</option>
                                      {enabledModels.map(model => (
                                          <option key={model.id} value={model.id} selected={model.id === selectedApp.defaultSettings.modelId}>
                                              {model.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">參數</label>
                                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                                      <option value="">請選擇參數組合</option>
                                      {MOCK_LLM_PARAMS.map(param => (
                                          <option key={param.id} value={param.id} selected={param.id === selectedApp.defaultSettings.paramId}>
                                              {param.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">提示詞 (選填)</label>
                                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                                      <option value="">不使用提示詞</option>
                                      {MOCK_LLM_PROMPTS.map(prompt => (
                                          <option key={prompt.id} value={prompt.id} selected={prompt.id === selectedApp.defaultSettings.promptId}>
                                              {prompt.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                      </div>

                      {/* Available Models - Transfer List */}
                      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
                          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">可選語言模型設定</h3>
                          </div>
                          
                          <div className="flex-1 flex overflow-hidden">
                              {/* Left: Available Models */}
                              <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                      <span className="text-sm font-semibold text-slate-700">已啟用模型</span>
                                      <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{enabledModels.length}</span>
                                  </div>
                                  <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                       <div className="space-y-1">
                                           {enabledModels.length === 0 ? (
                                               <div className="text-center py-10 text-slate-400 text-sm">無已啟用模型</div>
                                           ) : enabledModels.map(model => {
                                               const isSelected = selectedAvailableModelIds.includes(model.id);
                                               const isAdded = (selectedApp.availableModels || []).includes(model.id);
                                               return (
                                                   <div 
                                                     key={model.id}
                                                     onClick={() => !isAdded && toggleAvailableModelSelection(model.id)} 
                                                     className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                                        ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                                     `}
                                                   >
                                                       <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                           {isSelected && <Check size={10} />}
                                                       </div>
                                                        <div className="flex-1 min-w-0 flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">
                                                                 <Cpu size={12} />
                                                            </div>
                                                            <div className="text-sm font-medium text-slate-700 truncate">{model.name}</div>
                                                            {isAdded && <span className="text-xs text-slate-400">• 已加入</span>}
                                                        </div>
                                                   </div>
                                               )
                                           })}
                                       </div>
                                  </div>
                              </div>

                              {/* Center: Actions */}
                              <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                                  <button 
                                    onClick={handleAddModelsToApp}
                                    disabled={selectedAvailableModelIds.length === 0}
                                    className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                                    title="加入選取"
                                  >
                                      <ArrowRight size={18} />
                                  </button>
                                  <button 
                                     onClick={handleAddAllModels}
                                     className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all"
                                     title="加入全部"
                                  >
                                      <ChevronsRight size={18} />
                                  </button>
                              </div>

                              {/* Right: Selected Models */}
                              <div className="flex-1 flex flex-col min-w-0">
                                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                      <span className="text-sm font-semibold text-slate-700">可選模型</span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{(selectedApp.availableModels || []).length}</span>
                                  </div>
                                  <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                      <div className="space-y-1">
                                           {(selectedApp.availableModels || []).length === 0 ? (
                                               <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                                   <Cpu size={32} className="mb-2 opacity-50" />
                                                   <p className="text-xs">尚未設定可選模型</p>
                                               </div>
                                           ) : (selectedApp.availableModels || []).map(modelId => {
                                               const model = MOCK_LLM_MODELS.find(m => m.id === modelId) || { id: modelId, name: '未知模型' };
                                               return (
                                                   <div key={model.id} className="flex items-center p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-200 transition-colors group">
                                                       <div className="w-8 h-8 rounded flex items-center justify-center mr-3 bg-purple-50 text-purple-600 font-bold text-xs">
                                                          <Cpu size={16} />
                                                       </div>
                                                       <div className="flex-1 min-w-0">
                                                           <div className="text-sm font-medium text-slate-700 truncate">{model.name}</div>
                                                       </div>
                                                       <button 
                                                         onClick={() => handleRemoveModel(model.id)}
                                                         className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                                       >
                                                           <X size={16} />
                                                       </button>
                                                   </div>
                                               )
                                           })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </section>

                      {/* Welcome Message */}
                      <div className="border-t border-slate-200 pt-4">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">歡迎詞</label>
                          <textarea 
                            value={selectedApp.welcomeMessage}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" 
                          />
                      </div>

                      {/* Default Questions */}
                      <div className="border-t border-slate-200 pt-4">
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">預設問題</label>
                          <div className="space-y-2">
                              {selectedApp.defaultQuestions.map((q, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                      <input 
                                        type="text" 
                                        value={q}
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                      />
                                      <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                          <X size={16} />
                                      </button>
                                  </div>
                              ))}
                              <button className="w-full px-3 py-2 text-sm text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                  + 新增問題
                              </button>
                          </div>
                      </div>

                      {/* Permissions - Transfer List */}
                      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
                          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">使用權限設定</h3>
                          </div>
                          
                          <div className="flex-1 flex overflow-hidden">
                              {/* Left: Available Users */}
                              <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                      <span className="text-sm font-semibold text-slate-700">選擇人員 / 部門</span>
                                      <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{filteredUsers.length}</span>
                                  </div>
                                  <div className="p-3">
                                      <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input 
                                            value={userSearch}
                                            onChange={(e) => setUserSearch(e.target.value)}
                                            placeholder="搜尋人員..." 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" 
                                        />
                                      </div>
                                  </div>
                                  <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                       <div className="space-y-1">
                                           {filteredUsers.length === 0 ? (
                                               <div className="text-center py-10 text-slate-400 text-sm">無符合結果</div>
                                           ) : filteredUsers.map(user => {
                                               const isSelected = selectedAvailableUserIds.includes(user.id);
                                               const isAdded = (selectedApp.permissions.allowedUsers || []).includes(user.id);
                                               return (
                                                   <div 
                                                     key={user.id}
                                                     onClick={() => !isAdded && toggleAvailableUserSelection(user.id)} 
                                                     className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                                        ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                                     `}
                                                   >
                                                       <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                           {isSelected && <Check size={10} />}
                                                       </div>
                                                        <div className="flex-1 min-w-0 flex items-center gap-2">
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${user.type === 'dept' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-600'}`}>
                                                                 {user.type === 'dept' ? 'D' : user.name[0]}
                                                            </div>
                                                            <div className="text-sm font-medium text-slate-700 truncate">{user.name}</div>
                                                            {isAdded && <span className="text-xs text-slate-400">• 已加入</span>}
                                                        </div>
                                                   </div>
                                               )
                                           })}
                                       </div>
                                  </div>
                              </div>

                              {/* Center: Actions */}
                              <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                                  <button 
                                    onClick={handleAddUsersToApp}
                                    disabled={selectedAvailableUserIds.length === 0}
                                    className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                                    title="加入選取"
                                  >
                                      <ArrowRight size={18} />
                                  </button>
                                  <button 
                                     onClick={handleAddAllUsers}
                                     className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all"
                                     title="加入全部 (本頁)"
                                  >
                                      <ChevronsRight size={18} />
                                  </button>
                              </div>

                              {/* Right: Selected Users */}
                              <div className="flex-1 flex flex-col min-w-0">
                                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                      <span className="text-sm font-semibold text-slate-700">可用人員 / 部門</span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{(selectedApp.permissions.allowedUsers || []).length}</span>
                                  </div>
                                  <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                      <div className="space-y-1">
                                           {(selectedApp.permissions.allowedUsers || []).length === 0 ? (
                                               <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                                   <Users size={32} className="mb-2 opacity-50" />
                                                   <p className="text-xs">尚未設定任何權限</p>
                                               </div>
                                           ) : (selectedApp.permissions.allowedUsers || []).map(userId => {
                                               const user = MOCK_USERS.find(u => u.id === userId) || { id: userId, name: '未知用戶', type: 'user' };
                                               return (
                                                   <div key={user.id} className="flex items-center p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-200 transition-colors group">
                                                       <div className={`w-8 h-8 rounded flex items-center justify-center mr-3 font-bold text-xs ${user.type === 'dept' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                                          {user.type === 'dept' ? 'DEPT' : 'USER'}
                                                       </div>
                                                       <div className="flex-1 min-w-0">
                                                           <div className="text-sm font-medium text-slate-700 truncate">{user.name}</div>
                                                       </div>
                                                       <button 
                                                         onClick={() => handleRemoveUser(user.id)}
                                                         className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                                       >
                                                           <X size={16} />
                                                       </button>
                                                   </div>
                                               )
                                           })}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </section>

                  </div>
                  <footer className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                          取消
                      </button>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                      >
                          儲存設定
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}
