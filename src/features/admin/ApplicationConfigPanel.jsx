import React, { useState, useMemo } from 'react';
import { 
    LayoutGrid, Trash2, Save, ArrowLeft, ChevronsRight, Check, Cpu, Users, Plus, X
} from 'lucide-react';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_USERS } from '../../data/mockData';

export function ApplicationConfigPanel({ app, isCreating, users, onUpdateApp, onCreateApp, onDeleteApp, onBack }) {
  if (!app) return null;
  
  // Use local state for the form data
  const [formData, setFormData] = useState(app);
  
  // Sync with prop changes
  React.useEffect(() => {
    setFormData(app);
  }, [app]);

  const handleChange = (updates) => {
      const newData = { ...formData, ...updates };
      setFormData(newData);
      // For existing apps, live update the parent state
      if (!isCreating && onUpdateApp) {
          onUpdateApp(app.id, updates);
      }
  };
  
  const [userSearch, setUserSearch] = useState('');
  const [selectedAvailableModelIds, setSelectedAvailableModelIds] = useState([]);
  const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);

  const filteredUsers = users.filter(u => u.name.includes(userSearch));
  const enabledModels = MOCK_LLM_MODELS.filter(m => m.status === 'active');

  // Transfer List Handlers for Models
  const toggleAvailableModelSelection = (id) => {
    if (selectedAvailableModelIds.includes(id)) {
        setSelectedAvailableModelIds(prev => prev.filter(mid => mid !== id));
    } else {
        setSelectedAvailableModelIds(prev => [...prev, id]);
    }
  };

  const handleAddModelsToApp = () => {
    if (selectedAvailableModelIds.length === 0) return;
    const currentModels = formData.availableModels || [];
    const newModelsToAdd = selectedAvailableModelIds.filter(id => !currentModels.includes(id));
    if (newModelsToAdd.length > 0) {
        handleChange({ availableModels: [...currentModels, ...newModelsToAdd] });
        setSelectedAvailableModelIds([]);
    }
  };

  const handleAddAllModels = () => {
    const currentModels = formData.availableModels || [];
    const allEnabledIds = enabledModels.map(m => m.id);
    const newModelsToAdd = allEnabledIds.filter(id => !currentModels.includes(id));
    if (newModelsToAdd.length > 0) {
        handleChange({ availableModels: [...currentModels, ...newModelsToAdd] });
    }
  };

  const handleRemoveModel = (modelId) => {
    const currentModels = formData.availableModels || [];
    handleChange({ availableModels: currentModels.filter(id => id !== modelId) });
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
    if (selectedAvailableUserIds.length === 0) return;
    const currentUsers = formData.permissions.allowedUsers || [];
    const newUsersToAdd = selectedAvailableUserIds.filter(id => !currentUsers.includes(id));
    if (newUsersToAdd.length > 0) {
        handleChange({ permissions: { ...formData.permissions, allowedUsers: [...currentUsers, ...newUsersToAdd] } });
        setSelectedAvailableUserIds([]);
    }
  };

  const handleAddAllUsers = () => {
    const currentUsers = formData.permissions.allowedUsers || [];
    const allFilteredIds = filteredUsers.map(u => u.id);
    const newUsersToAdd = allFilteredIds.filter(id => !currentUsers.includes(id));
    if (newUsersToAdd.length > 0) {
        handleChange({ permissions: { ...formData.permissions, allowedUsers: [...currentUsers, ...newUsersToAdd] } });
    }
  };

  const handleRemoveUser = (userId) => {
    const currentUsers = formData.permissions.allowedUsers || [];
    handleChange({ permissions: { ...formData.permissions, allowedUsers: currentUsers.filter(id => id !== userId) } });
  };

  // Handler for adding a new default question
  const handleAddQuestion = () => {
      const newQuestion = prompt("請輸入新的預設提問:");
      if (newQuestion) {
          const currentQuestions = formData.defaultQuestions || [];
          handleChange({ defaultQuestions: [...currentQuestions, newQuestion] });
      }
  };

  // Handler for removing a default question
  const handleRemoveQuestion = (index) => {
      const currentQuestions = formData.defaultQuestions || [];
      const newQuestions = currentQuestions.filter((_, i) => i !== index);
      handleChange({ defaultQuestions: newQuestions });
  };

  const handleSave = () => {
      if (isCreating) {
          if (!formData.name) {
              alert('請輸入應用名稱');
              return;
          }
          onCreateApp(formData);
          alert('應用已建立！');
      } else {
          alert('設定已保存！');
      }
  };

  const getModelName = (id) => MOCK_LLM_MODELS.find(m => m.id === id)?.name || '(未設定)';
  const getParamName = (id) => MOCK_LLM_PARAMS.find(p => p.id === id)?.name || '(未設定)';
  const getPromptName = (id) => MOCK_LLM_PROMPTS.find(p => p.id === id)?.name || '(未設定)';
  const getUserName = (id) => MOCK_USERS.find(u => u.id === id)?.name || '(未知)';

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      
      {/* 1. Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0 z-10">
         <div className="flex items-center gap-3">
            <button 
                onClick={onBack}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors mr-2"
                title="返回列表"
            >
                <ArrowLeft size={20} />
            </button>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.level === 'GAI' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                <LayoutGrid size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-800 leading-tight">
                    {isCreating ? '新增應用' : formData.name}
                </h1>
                <p className="text-xs text-slate-500">
                    {isCreating ? '建立一個新的應用設定' : '管理與設定您的應用'}
                </p>
            </div>
         </div>
         <div className="flex items-center gap-3">
           {!isCreating && (
             <button 
               onClick={() => { if(confirm('確定要刪除此應用嗎？')) onDeleteApp(app.id) }} 
               className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-500 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
             >
               <Trash2 size={16} /> 刪除
             </button>
           )}
           <button 
             onClick={handleSave} 
             className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all active:scale-95"
           >
             <Save size={18} /> {isCreating ? '建立' : '保存變更'}
           </button>
         </div>
      </header>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* 2. Basic Settings */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">基本設定</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">應用名稱</label>
                          <input 
                                value={formData.name || ''}
                                onChange={(e) => handleChange({ name: e.target.value })}
                                placeholder="例如：公文查詢助手"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            />
                      </div>

                      {/* Page */}
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">功能頁</label>
                          <input 
                                value={formData.page || ''}
                                onChange={(e) => handleChange({ page: e.target.value })}
                                placeholder="例如：/document-query"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-mono"
                            />
                      </div>

                      {/* Level */}
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">應用層級</label>
                          <select
                                value={formData.level || 'GAI'}
                                onChange={(e) => handleChange({ level: e.target.value })}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            >
                                <option value="GAI">GAI 互動平台</option>
                                <option value="DOC">智慧公文輔助系統</option>
                            </select>
                      </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                       {/* Welcome Message */}
                       <div className="space-y-1">
                           <label className="block text-sm font-medium text-slate-700">歡迎詞</label>
                           <textarea 
                                 value={formData.welcomeMessage || ''}
                                 onChange={(e) => handleChange({ welcomeMessage: e.target.value })}
                                 placeholder="輸入歡迎訊息..."
                                 rows={6}
                                 className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
                             />
                       </div>
                  </div>
              </div>

              {/* Default Questions */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-slate-700">預設問題</label>
                      <button
                            onClick={handleAddQuestion}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                            <Plus size={14} /> 新增問題
                        </button>
                  </div>
                  <div className="space-y-2">
                      {(formData.defaultQuestions || []).map((q, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg group">
                              <span className="text-blue-500 font-bold">•</span>
                              <span className="flex-1 text-sm text-slate-700">{q}</span>
                              <button
                                    onClick={() => handleRemoveQuestion(idx)}
                                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <X size={14} />
                                </button>
                          </div>
                      ))}
                      {(!formData.defaultQuestions || formData.defaultQuestions.length === 0) && (
                          <div className="text-center py-8 text-slate-400 text-sm">尚無預設問題</div>
                      )}
                  </div>
              </div>
          </section>

          {/* 3. Default Settings */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">預設設定</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">模型</label>
                      <select 
                            value={formData.defaultSettings?.modelId || ''}
                            onChange={(e) => handleChange({ defaultSettings: { ...formData.defaultSettings, modelId: e.target.value } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">請選擇模型</option>
                            {MOCK_LLM_MODELS.filter(m => m.status === 'active').map(model => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">參數</label>
                      <select 
                            value={formData.defaultSettings?.paramId || ''}
                            onChange={(e) => handleChange({ defaultSettings: { ...formData.defaultSettings, paramId: e.target.value } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">請選擇參數組合</option>
                            {MOCK_LLM_PARAMS.map(param => (
                                <option key={param.id} value={param.id}>
                                    {param.name}
                                </option>
                            ))}
                        </select>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">提示詞 (選填)</label>
                      <select 
                            value={formData.defaultSettings?.promptId || ''}
                            onChange={(e) => handleChange({ defaultSettings: { ...formData.defaultSettings, promptId: e.target.value } })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">不使用提示詞</option>
                            {MOCK_LLM_PROMPTS.map(prompt => (
                                <option key={prompt.id} value={prompt.id}>
                                    {prompt.name}
                                </option>
                            ))}
                        </select>
                  </div>
              </div>
          </section>

          {/* 4. Available Models - Transfer List */}
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
                                   const isAdded = (formData.availableModels || []).includes(model.id);
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
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="新增選取的項目"
                      >
                          <ChevronsRight size={18} />
                      </button>
                      <button 
                        onClick={handleAddAllModels}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold"
                        title="新增全部"
                      >
                          全部
                      </button>
                  </div>

                  {/* Right: Selected Models */}
                  <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-3 border-b border-slate-100 bg-blue-50/30 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">已選模型</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{(formData.availableModels || []).length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {(!formData.availableModels || formData.availableModels.length === 0) ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">無已選模型</div>
                               ) : formData.availableModels.map(modelId => {
                                   const model = MOCK_LLM_MODELS.find(m => m.id === modelId);
                                   if (!model) return null;
                                   return (
                                       <div key={modelId} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg group hover:bg-blue-100 transition-colors">
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                                     <Cpu size={12} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 truncate">{model.name}</span>
                                            </div>
                                            <button 
                                              onClick={() => handleRemoveModel(modelId)}
                                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <X size={14} />
                                            </button>
                                       </div>
                                   );
                               })}
                           </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* 5. User Permissions - Transfer List */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">使用者權限設定</h3>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  {/* Left: Available Users */}
                  <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">選擇人員</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{filteredUsers.length}</span>
                      </div>
                      <div className="p-3">
                          <input 
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                placeholder="搜尋..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" 
                            />
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {filteredUsers.length === 0 ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">無可用項目</div>
                               ) : filteredUsers.map(user => {
                                   const isSelected = selectedAvailableUserIds.includes(user.id);
                                   const isAdded = (formData.permissions?.allowedUsers || []).includes(user.id);
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
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                     {user.name.charAt(0)}
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
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="新增選取的項目"
                      >
                          <ChevronsRight size={18} />
                      </button>
                      <button 
                        onClick={handleAddAllUsers}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold"
                        title="新增全部"
                      >
                          全部
                      </button>
                  </div>

                  {/* Right: Assigned Users */}
                  <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-3 border-b border-slate-100 bg-blue-50/30 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">已授權</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{(formData.permissions?.allowedUsers || []).length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {(!formData.permissions?.allowedUsers || formData.permissions.allowedUsers.length === 0) ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">無已授權使用者</div>
                               ) : formData.permissions.allowedUsers.map(userId => {
                                   const user = MOCK_USERS.find(u => u.id === userId);
                                   if (!user) return null;
                                   return (
                                       <div key={userId} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg group hover:bg-blue-100 transition-colors">
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                     {user.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 truncate">{user.name}</span>
                                            </div>
                                            <button 
                                              onClick={() => handleRemoveUser(userId)}
                                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <X size={14} />
                                            </button>
                                       </div>
                                   );
                               })}
                           </div>
                      </div>
                  </div>
              </div>
          </section>
          
      </div>
    </div>
  );
}
