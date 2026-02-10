import React, { useState, useMemo } from 'react';
import { 
    LayoutGrid, Trash2, Save, ArrowLeft, ChevronsRight, Check, Cpu, Users, Plus, X, Star, Wrench
} from 'lucide-react';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_TOOLS } from '../../data/mockToolData';
import { MOCK_USERS } from '../../data/mockData';

export function ApplicationConfigPanel({ app, isCreating, users, onUpdateApp, onCreateApp, onDeleteApp, onBack }) {
  if (!app) return null;
  
  // Use local state for the form data
  const [formData, setFormData] = useState(app);
  const [activeTab, setActiveTab] = useState('welcome'); // 'welcome', 'questions'
  
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
  const [selectedAvailableToolIds, setSelectedAvailableToolIds] = useState([]); // New state for tools
  const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);

  const filteredUsers = users.filter(u => u.name.includes(userSearch));
  const enabledModels = MOCK_LLM_MODELS.filter(m => m.status === 'active');
  const enabledTools = MOCK_TOOLS.filter(t => t.status === 'active'); // Filter active tools

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
    const newModels = currentModels.filter(id => id !== modelId);
    
    // If removed model was the default, set the first remaining model as default
    if (formData.defaultModelId === modelId && newModels.length > 0) {
        handleChange({ 
            availableModels: newModels,
            defaultModelId: newModels[0]
        });
    } else {
        handleChange({ availableModels: newModels });
    }
  };

  const handleSetDefaultModel = (modelId) => {
    handleChange({ defaultModelId: modelId });
  };

  // Transfer List Handlers for Tools - Updated for Object Structure
  const toggleAvailableToolSelection = (id) => {
    const strId = String(id);
    if (selectedAvailableToolIds.includes(strId)) {
        setSelectedAvailableToolIds(prev => prev.filter(tid => tid !== strId));
    } else {
        setSelectedAvailableToolIds(prev => [...prev, strId]);
    }
  };

  const handleAddToolsToApp = () => {
    if (selectedAvailableToolIds.length === 0) return;
    const currentTools = formData.tools || [];
    const currentToolIds = currentTools.map(t => t.id);
    const newToolsIDS = selectedAvailableToolIds.filter(id => !currentToolIds.includes(id));
    
    if (newToolsIDS.length > 0) {
        const newToolObjects = newToolsIDS.map(id => ({ id, defaultOn: true }));
        handleChange({ tools: [...currentTools, ...newToolObjects] });
        setSelectedAvailableToolIds([]);
    }
  };

  const handleAddAllTools = () => {
    const currentTools = formData.tools || [];
    const currentToolIds = currentTools.map(t => t.id);
    const allEnabledIds = enabledTools.map(t => String(t.id));
    const newToolIDs = allEnabledIds.filter(id => !currentToolIds.includes(id));
    
    if (newToolIDs.length > 0) {
        const newToolObjects = newToolIDs.map(id => ({ id, defaultOn: true }));
        handleChange({ tools: [...currentTools, ...newToolObjects] });
    }
  };

  const handleRemoveTool = (toolId) => {
    const currentTools = formData.tools || [];
    handleChange({ tools: currentTools.filter(t => t.id !== toolId) });
  };

  const handleToggleToolDefault = (toolId) => {
      const currentTools = formData.tools || [];
      const newTools = currentTools.map(t => 
          t.id === toolId ? { ...t, defaultOn: !t.defaultOn } : t
      );
      handleChange({ tools: newTools });
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
          
          {/* Basic Settings Block (Large Block) */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">基本設定</h3>
              </div>
              
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Side: Name, Page, Level */}
                  <div className="space-y-6">
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
                      {/* <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">功能頁 (原本的應用層級)</label>
                          <input 
                                value={formData.page || ''}
                                onChange={(e) => handleChange({ page: e.target.value })}
                                placeholder="例如：/document-query"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-mono"
                            />
                      </div> */}

                      {/* Level */}
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">功能頁</label>
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
                  
                  {/* Right Side: Tabs (Welcome/Questions) */}
                  <div className="flex flex-col h-full border border-slate-200 rounded-xl overflow-hidden bg-white">
                      {/* Tab Navigation */}
                      <div className="flex border-b border-slate-200 bg-slate-50">
                          <button
                            onClick={() => setActiveTab('welcome')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                              activeTab === 'welcome' 
                                ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            歡迎語
                          </button>
                          <button
                            onClick={() => setActiveTab('questions')}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                              activeTab === 'questions' 
                                ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            預設提問
                          </button>
                      </div>

                      {/* Tab Content */}
                      <div className="flex-1 p-0 relative min-h-[300px]">
                          {/* Welcome Message Tab */}
                          {activeTab === 'welcome' && (
                            <div className="absolute inset-0 p-4 animate-in fade-in duration-200 flex flex-col">
                                <textarea 
                                      value={formData.welcomeMessage || ''}
                                      onChange={(e) => handleChange({ welcomeMessage: e.target.value })}
                                      placeholder="輸入歡迎訊息..."
                                      className="flex-1 w-full p-4 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
                                  />
                                <div className="mt-2 text-right text-xs text-slate-400">
                                    {(formData.welcomeMessage || '').length} 字元
                                </div>
                            </div>
                          )}

                          {/* Default Questions Tab */}
                          {activeTab === 'questions' && (
                            <div className="absolute inset-0 p-4 animate-in fade-in duration-200 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-medium text-slate-700">問題列表</h4>
                                    <button
                                          onClick={handleAddQuestion}
                                          className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                                      >
                                          <Plus size={14} /> 新增提問
                                      </button>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                                    {(formData.defaultQuestions || []).map((q, idx) => (
                                        <div key={idx} className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg group hover:border-blue-200 transition-colors">
                                            <span className="text-sm text-slate-700 truncate mr-2">{q}</span>
                                            <button
                                                  onClick={() => handleRemoveQuestion(idx)}
                                                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                              >
                                                  <X size={14} />
                                              </button>
                                        </div>
                                    ))}
                                    {(!formData.defaultQuestions || formData.defaultQuestions.length === 0) && (
                                        <div className="text-center py-10 text-slate-400 text-sm italic">
                                            尚未設定預設提問
                                        </div>
                                    )}
                                </div>
                            </div>
                          )}
                      </div>
                  </div>
              </div>
          </section>

          {/* Default Settings Block (Separate) */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">預設設定</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                ) : formData.availableModels.map((modelId, index) => {
                                    const model = MOCK_LLM_MODELS.find(m => m.id === modelId);
                                    if (!model) return null;
                                    
                                    // Determine if this is the default model
                                    // If no defaultModelId is set, the first model is default
                                    const isDefault = formData.defaultModelId 
                                        ? formData.defaultModelId === modelId 
                                        : index === 0;
                                    
                                    return (
                                        <div key={modelId} className={`flex items-center justify-between p-2 rounded-lg group hover:bg-blue-100 transition-colors ${isDefault ? 'bg-blue-100 border border-blue-200' : 'bg-blue-50 border border-blue-100'}`}>
                                             <div className="flex items-center gap-2 min-w-0 flex-1">
                                                 <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                                      <Cpu size={12} />
                                                 </div>
                                                 <span className="text-sm font-medium text-slate-700 truncate">{model.name}</span>
                                                 {isDefault && (
                                                     <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                                 )}
                                             </div>
                                             <div className="flex items-center gap-1">
                                                 {/* Set as default button (only show if not already default) */}
                                                 {!isDefault && (
                                                     <button 
                                                       onClick={() => handleSetDefaultModel(modelId)}
                                                       className="p-1 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 rounded transition-all opacity-0 group-hover:opacity-100"
                                                       title="設為預設模型"
                                                     >
                                                         <Star size={14} />
                                                     </button>
                                                 )}
                                                 {/* Remove button */}
                                                 <button 
                                                   onClick={() => handleRemoveModel(modelId)}
                                                   className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                 >
                                                     <X size={14} />
                                                 </button>
                                             </div>
                                        </div>
                                    );
                                })}
                            </div>
                       </div>
                  </div>
              </div>
          </section>

          {/* Tool Settings (Enabled Tools) */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">工具設定</h3>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  {/* Left: Available Tools */}
                  <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">可用工具庫</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{enabledTools.length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {enabledTools.length === 0 ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">無可用工具</div>
                               ) : enabledTools.map(tool => {
                                   const strId = String(tool.id);
                                   const isSelected = selectedAvailableToolIds.includes(strId);
                                   const isAdded = (formData.tools || []).some(t => t.id === strId);
                                   return (
                                       <div 
                                         key={tool.id}
                                         onClick={() => !isAdded && toggleAvailableToolSelection(tool.id)} 
                                         className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                            ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                         `}
                                       >
                                           <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                               {isSelected && <Check size={10} />}
                                           </div>
                                            <div className="flex-1 min-w-0 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">
                                                     <Wrench size={12} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-slate-700 truncate">{tool.name}</div>
                                                    <div className="text-[10px] text-slate-400 truncate">{tool.description}</div>
                                                </div>
                                                {isAdded && <span className="text-xs text-slate-400 flex-shrink-0">• 已啟用</span>}
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
                        onClick={handleAddToolsToApp}
                        disabled={selectedAvailableToolIds.length === 0}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="啟用選取的工具"
                      >
                          <ChevronsRight size={18} />
                      </button>
                      <button 
                        onClick={handleAddAllTools}
                        className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold"
                        title="啟用全部"
                      >
                          全部
                      </button>
                  </div>

                  {/* Right: Enabled Tools */}
                  <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-3 border-b border-slate-100 bg-orange-50/30 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">已啟用工具</span>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">{(formData.tools || []).length}</span>
                      </div>
                       <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                            <div className="space-y-1">
                                {(!formData.tools || formData.tools.length === 0) ? (
                                    <div className="text-center py-10 text-slate-400 text-sm">此應用程式尚未啟用任何工具</div>
                                ) : formData.tools.map(toolObj => {
                                    const toolId = toolObj.id;
                                    const tool = MOCK_TOOLS.find(t => String(t.id) === String(toolId));
                                    if (!tool) return null;
                                    
                                    return (
                                        <div key={toolId} className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-100 group hover:bg-orange-100 transition-colors">
                                             <div className="flex items-center gap-2 min-w-0 flex-1">
                                                 <div className="w-6 h-6 rounded-lg bg-orange-200 text-orange-700 flex items-center justify-center">
                                                      <Wrench size={12} />
                                                 </div>
                                                 <div className="flex-1 min-w-0">
                                                    <span className="block text-sm font-medium text-slate-700 truncate">{tool.name}</span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {toolObj.defaultOn ? '預設啟用' : '手動觸發'}
                                                    </span>
                                                 </div>
                                             </div>
                                             <div className="flex items-center gap-2">
                                                 {/* Default Toggle */}
                                                 <label className="relative inline-flex items-center cursor-pointer" title="設定是否預設啟用">
                                                    <input 
                                                        type="checkbox" 
                                                        className="sr-only peer"
                                                        checked={!!toolObj.defaultOn}
                                                        onChange={() => handleToggleToolDefault(toolId)}
                                                    />
                                                    <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-500"></div>
                                                 </label>

                                                 {/* Remove button */}
                                                 <button 
                                                   onClick={() => handleRemoveTool(toolId)}
                                                   className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                   title="移除工具"
                                                 >
                                                     <X size={14} />
                                                 </button>
                                             </div>
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
