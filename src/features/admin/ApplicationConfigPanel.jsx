import React, { useState, useMemo } from 'react';
import { 
    LayoutGrid, Trash2, Save, ArrowLeft, ChevronsRight, Check, Cpu, Users, Plus, X, Star, Wrench, MessageSquare, Settings
} from 'lucide-react';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_TOOLS } from '../../data/mockToolData';
import { MOCK_USERS } from '../../data/mockData';

export function ApplicationConfigPanel({ app, isCreating, users, onUpdateApp, onCreateApp, onDeleteApp, onBack }) {
  if (!app) return null;
  
  // Use local state for the form data
  const [formData, setFormData] = useState(app);
  const [activeTab, setActiveTab] = useState('welcome'); // 'welcome', 'questions'
  const [defaultSettingsTab, setDefaultSettingsTab] = useState('model');
  
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
  const [selectedAvailablePromptIds, setSelectedAvailablePromptIds] = useState([]); // New state for prompts
  const [selectedAvailableToolIds, setSelectedAvailableToolIds] = useState([]); // New state for tools
  const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);
  const [selectedAvailableParamId, setSelectedAvailableParamId] = useState(null); // Single-select for params

  const filteredUsers = users.filter(u => u.name.includes(userSearch));
  const enabledModels = MOCK_LLM_MODELS.filter(m => m.status === 'active');
  const enabledPrompts = MOCK_LLM_PROMPTS; // Prompts don't have active status currently
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
    handleChange({ 
        defaultModelId: modelId,
        defaultSettings: { ...formData.defaultSettings, modelId: modelId }
    });
  };

  // Transfer List Handlers for Prompts
  const toggleAvailablePromptSelection = (id) => {
    if (selectedAvailablePromptIds.includes(id)) {
        setSelectedAvailablePromptIds(prev => prev.filter(pid => pid !== id));
    } else {
        setSelectedAvailablePromptIds(prev => [...prev, id]);
    }
  };

  const handleAddPromptsToApp = () => {
    if (selectedAvailablePromptIds.length === 0) return;
    const currentPrompts = formData.availablePrompts || [];
    const newPromptsToAdd = selectedAvailablePromptIds.filter(id => !currentPrompts.includes(id));
    if (newPromptsToAdd.length > 0) {
        handleChange({ availablePrompts: [...currentPrompts, ...newPromptsToAdd] });
        setSelectedAvailablePromptIds([]);
    }
  };

  const handleAddAllPrompts = () => {
    const currentPrompts = formData.availablePrompts || [];
    const allIds = enabledPrompts.map(p => p.id);
    const newPromptsToAdd = allIds.filter(id => !currentPrompts.includes(id));
    if (newPromptsToAdd.length > 0) {
        handleChange({ availablePrompts: [...currentPrompts, ...newPromptsToAdd] });
    }
  };

  const handleRemovePrompt = (promptId) => {
    const currentPrompts = formData.availablePrompts || [];
    const newPrompts = currentPrompts.filter(id => id !== promptId);
    
    // If removed prompt was the default, set the first remaining prompt as default
    if (formData.defaultPromptId === promptId && newPrompts.length > 0) {
        handleChange({ 
            availablePrompts: newPrompts,
            defaultPromptId: newPrompts[0]
        });
    } else {
        handleChange({ availablePrompts: newPrompts });
    }
  };

  const handleSetDefaultPrompt = (promptId) => {
    handleChange({ 
        defaultPromptId: promptId,
        defaultSettings: { ...formData.defaultSettings, promptId: promptId }
    });
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

  // Single-select handler for Params
  const handleSetParamToApp = () => {
      if (!selectedAvailableParamId) return;
      handleChange({ defaultSettings: { ...formData.defaultSettings, paramId: selectedAvailableParamId } });
      setSelectedAvailableParamId(null);
  };
  const handleClearParam = () => handleChange({ defaultSettings: { ...formData.defaultSettings, paramId: '' } });

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
                      
                      {/* Feature Settings (New) */}
                      <div className="space-y-3 pt-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">功能設定</label>
                          <div className="flex flex-col gap-3">
                              <label className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                      type="checkbox"
                                      checked={formData.featureSettings?.enableFileUpload ?? true}
                                      onChange={(e) => handleChange({ 
                                          featureSettings: { 
                                              ...formData.featureSettings, 
                                              enableFileUpload: e.target.checked 
                                          } 
                                      })}
                                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 transition-colors"
                                  />
                                  <span className="text-sm text-slate-700 group-hover:text-blue-700 transition-colors">啟用檔案上傳</span>
                              </label>
                              
                              <label className="flex items-center gap-2 cursor-pointer group">
                                  <input 
                                      type="checkbox"
                                      checked={formData.featureSettings?.enableFeedback ?? true}
                                      onChange={(e) => handleChange({ 
                                          featureSettings: { 
                                              ...formData.featureSettings, 
                                              enableFeedback: e.target.checked 
                                          } 
                                      })}
                                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 transition-colors"
                                  />
                                  <span className="text-sm text-slate-700 group-hover:text-blue-700 transition-colors">啟用回饋機制</span>
                              </label>
                          </div>
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

          {/* Unified Default Settings with Tabs */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">預設設定</h3>
              </div>
              <div className="flex border-b border-slate-200 px-6">
                  {[{ key: 'model', label: '語言模型' }, { key: 'params', label: '參數' }, { key: 'prompt', label: '提示詞' }, { key: 'tools', label: '工具' }].map(tab => (
                      <button key={tab.key} onClick={() => setDefaultSettingsTab(tab.key)}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${defaultSettingsTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                          {tab.label}
                      </button>
                  ))}
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  {/* ===== Model Tab (Multi Select + Star Default) ===== */}
                  {defaultSettingsTab === 'model' && (<>
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
                                          <div key={model.id} onClick={() => !isAdded && toggleAvailableModelSelection(model.id)}
                                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                  {isSelected && <Check size={10} />}
                                              </div>
                                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Cpu size={12} /></div>
                                                  <div className="text-sm font-medium text-slate-700 truncate">{model.name}</div>
                                                  {isAdded && <span className="text-xs text-slate-400">• 已加入</span>}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                          <button onClick={handleAddModelsToApp} disabled={selectedAvailableModelIds.length === 0}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="新增選取的項目">
                              <ChevronsRight size={18} />
                          </button>
                          <button onClick={handleAddAllModels}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold" title="新增全部">
                              全部
                          </button>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                          <div className="p-3 border-b border-slate-100 bg-purple-50/30 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">已選模型</span>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{(formData.availableModels || []).length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {(!formData.availableModels || formData.availableModels.length === 0) ? (
                                      <div className="flex flex-col items-center justify-center h-full text-slate-400"><Cpu size={32} className="mb-2 opacity-50" /><p className="text-xs">無已選模型</p></div>
                                  ) : formData.availableModels.map((modelId, index) => {
                                      const model = MOCK_LLM_MODELS.find(m => m.id === modelId);
                                      if (!model) return null;
                                      const isDefault = formData.defaultModelId ? formData.defaultModelId === modelId : index === 0;
                                      return (
                                          <div key={modelId} className={`flex items-center justify-between p-2 rounded-lg group hover:bg-purple-100 transition-colors ${isDefault ? 'bg-purple-100 border border-purple-200' : 'bg-purple-50 border border-purple-100'}`}>
                                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                                  <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center"><Cpu size={12} /></div>
                                                  <span className="text-sm font-medium text-slate-700 truncate">{model.name}</span>
                                                  {isDefault && <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                                              </div>
                                              <div className="flex items-center gap-1">
                                                  {!isDefault && (
                                                      <button onClick={() => handleSetDefaultModel(modelId)} className="p-1 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 rounded transition-all opacity-0 group-hover:opacity-100" title="設為預設模型"><Star size={14} /></button>
                                                  )}
                                                  <button onClick={() => handleRemoveModel(modelId)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                  </>)}

                  {/* ===== Params Tab (Single Select) ===== */}
                  {defaultSettingsTab === 'params' && (<>
                      <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                          <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">可用參數組合</span>
                              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{MOCK_LLM_PARAMS.length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {MOCK_LLM_PARAMS.map(param => {
                                      const isSelected = selectedAvailableParamId === param.id;
                                      const isCurrent = formData.defaultSettings?.paramId === param.id;
                                      return (
                                          <div key={param.id} onClick={() => !isCurrent && setSelectedAvailableParamId(isSelected ? null : param.id)}
                                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isCurrent ? 'opacity-50 bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                                                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                              </div>
                                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Settings size={12} /></div>
                                                  <div className="flex-1 min-w-0">
                                                      <div className="text-sm font-medium text-slate-700 truncate">{param.name}</div>
                                                      <div className="text-[10px] text-slate-400">T:{param.temperature} P:{param.topP} K:{param.topK}</div>
                                                  </div>
                                                  {isCurrent && <span className="text-xs text-slate-400 flex-shrink-0">• 已設定</span>}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                          <button onClick={handleSetParamToApp} disabled={!selectedAvailableParamId}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="設定參數">
                              <ChevronsRight size={18} />
                          </button>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                          <div className="p-3 border-b border-slate-100 bg-blue-50/30 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">已設定參數</span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{formData.defaultSettings?.paramId ? 1 : 0}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              {!formData.defaultSettings?.paramId ? (
                                  <div className="flex flex-col items-center justify-center h-full text-slate-400"><Settings size={32} className="mb-2 opacity-50" /><p className="text-xs">尚未設定參數</p></div>
                              ) : (() => {
                                  const param = MOCK_LLM_PARAMS.find(p => p.id === formData.defaultSettings.paramId);
                                  if (!param) return null;
                                  return (
                                      <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-100 group hover:bg-blue-100 transition-colors">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                              <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center"><Settings size={12} /></div>
                                              <div className="flex-1 min-w-0">
                                                  <span className="block text-sm font-medium text-slate-700 truncate">{param.name}</span>
                                                  <span className="text-[10px] text-slate-400">T:{param.temperature} P:{param.topP} K:{param.topK}</span>
                                              </div>
                                          </div>
                                          <button onClick={handleClearParam} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all" title="清除參數"><X size={14} /></button>
                                      </div>
                                  );
                              })()}
                          </div>
                      </div>
                  </>)}

                  {/* ===== Prompt Tab (Multi Select + Star Default) ===== */}
                  {defaultSettingsTab === 'prompt' && (<>
                      <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                          <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">可用提示詞</span>
                              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{enabledPrompts.length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {enabledPrompts.length === 0 ? (
                                      <div className="text-center py-10 text-slate-400 text-sm">無可用提示詞</div>
                                  ) : enabledPrompts.map(prompt => {
                                      const isSelected = selectedAvailablePromptIds.includes(prompt.id);
                                      const isAdded = (formData.availablePrompts || []).includes(prompt.id);
                                      return (
                                          <div key={prompt.id} onClick={() => !isAdded && toggleAvailablePromptSelection(prompt.id)}
                                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                  {isSelected && <Check size={10} />}
                                              </div>
                                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><MessageSquare size={12} /></div>
                                                  <div className="text-sm font-medium text-slate-700 truncate">{prompt.name}</div>
                                                  {isAdded && <span className="text-xs text-slate-400">• 已加入</span>}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                          <button onClick={handleAddPromptsToApp} disabled={selectedAvailablePromptIds.length === 0}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="新增選取的項目">
                              <ChevronsRight size={18} />
                          </button>
                          <button onClick={handleAddAllPrompts}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold" title="新增全部">
                              全部
                          </button>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                          <div className="p-3 border-b border-slate-100 bg-green-50/30 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">已選提示詞</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{(formData.availablePrompts || []).length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {(!formData.availablePrompts || formData.availablePrompts.length === 0) ? (
                                      <div className="flex flex-col items-center justify-center h-full text-slate-400"><MessageSquare size={32} className="mb-2 opacity-50" /><p className="text-xs">無已選提示詞</p></div>
                                  ) : formData.availablePrompts.map((promptId, index) => {
                                      const prompt = MOCK_LLM_PROMPTS.find(p => p.id === promptId);
                                      if (!prompt) return null;
                                      const isDefault = formData.defaultPromptId ? formData.defaultPromptId === promptId : index === 0;
                                      return (
                                          <div key={promptId} className={`flex items-center justify-between p-2 rounded-lg group hover:bg-green-100 transition-colors ${isDefault ? 'bg-green-100 border border-green-200' : 'bg-green-50 border border-green-100'}`}>
                                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                                  <div className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center"><MessageSquare size={12} /></div>
                                                  <span className="text-sm font-medium text-slate-700 truncate">{prompt.name}</span>
                                                  {isDefault && <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                                              </div>
                                              <div className="flex items-center gap-1">
                                                  {!isDefault && (
                                                      <button onClick={() => handleSetDefaultPrompt(promptId)} className="p-1 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 rounded transition-all opacity-0 group-hover:opacity-100" title="設為預設提示詞"><Star size={14} /></button>
                                                  )}
                                                  <button onClick={() => handleRemovePrompt(promptId)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                  </>)}

                  {/* ===== Tools Tab (Multi Select + Enable Toggle) ===== */}
                  {defaultSettingsTab === 'tools' && (<>
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
                                          <div key={tool.id} onClick={() => !isAdded && toggleAvailableToolSelection(tool.id)}
                                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                  {isSelected && <Check size={10} />}
                                              </div>
                                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><Wrench size={12} /></div>
                                                  <div className="flex-1 min-w-0">
                                                      <div className="text-sm font-medium text-slate-700 truncate">{tool.name}</div>
                                                      <div className="text-[10px] text-slate-400 truncate">{tool.description}</div>
                                                  </div>
                                                  {isAdded && <span className="text-xs text-slate-400 flex-shrink-0">• 已啟用</span>}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                          <button onClick={handleAddToolsToApp} disabled={selectedAvailableToolIds.length === 0}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="啟用選取的工具">
                              <ChevronsRight size={18} />
                          </button>
                          <button onClick={handleAddAllTools}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold" title="啟用全部">
                              全部
                          </button>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                          <div className="p-3 border-b border-slate-100 bg-orange-50/30 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">已啟用工具</span>
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">{(formData.tools || []).length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {(!formData.tools || formData.tools.length === 0) ? (
                                      <div className="flex flex-col items-center justify-center h-full text-slate-400"><Wrench size={32} className="mb-2 opacity-50" /><p className="text-xs">尚未啟用任何工具</p></div>
                                  ) : formData.tools.map(toolObj => {
                                      const toolId = toolObj.id;
                                      const tool = MOCK_TOOLS.find(t => String(t.id) === String(toolId));
                                      if (!tool) return null;
                                      return (
                                          <div key={toolId} className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-100 group hover:bg-orange-100 transition-colors">
                                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                                  <div className="w-6 h-6 rounded-lg bg-orange-200 text-orange-700 flex items-center justify-center"><Wrench size={12} /></div>
                                                  <div className="flex-1 min-w-0">
                                                      <span className="block text-sm font-medium text-slate-700 truncate">{tool.name}</span>
                                                      <span className="text-[10px] text-slate-400">{toolObj.defaultOn ? '預設啟用' : '手動觸發'}</span>
                                                  </div>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                  <label className="relative inline-flex items-center cursor-pointer" title="設定是否預設啟用">
                                                      <input type="checkbox" className="sr-only peer" checked={!!toolObj.defaultOn} onChange={() => handleToggleToolDefault(toolId)} />
                                                      <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-500"></div>
                                                  </label>
                                                  <button onClick={() => handleRemoveTool(toolId)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all" title="移除工具"><X size={14} /></button>
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                  </>)}
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
