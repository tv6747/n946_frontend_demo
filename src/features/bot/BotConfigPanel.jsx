import React, { useState, useMemo } from 'react';
import { 
    Bot, Trash2, Save, Settings, Power, Plus, X, Users, Search, 
    CheckSquare, FolderOpen, ArrowRight, ArrowLeft, ChevronsRight, FileCode, Check, File, Wrench,
    Cpu, MessageSquare
} from 'lucide-react';
import { TreeNode } from '../../components/common/TreeNode';
import { KB_TREE_DATA } from '../../data/mockData';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_TOOLS } from '../../data/mockToolData';

export function BotConfigPanel({ bot, isCreating, associatedFiles, folderFiles, allFiles, selectedFolderName, users, onUpdateBot, onCreateBot, onRemoveFile, onDeleteBot, onBack }) {
  if (!bot) return null;
  
  // Use local state for the form data to support creation mode and edits
  const [formData, setFormData] = React.useState(bot);
  const [activeTab, setActiveTab] = useState('welcome'); // 'welcome' or 'questions'
  
  // Local state for folder selection in the KB picker
  const [localSelectedFolderId, setLocalSelectedFolderId] = useState('org');

  // Sync with prop changes (switching bots)
  React.useEffect(() => {
    setFormData(bot);
  }, [bot]);

  const handleChange = (updates) => {
      const newData = { ...formData, ...updates };
      setFormData(newData);
      // For existing bots, live update the parent state (as per original behavior)
      if (!isCreating && onUpdateBot) {
          onUpdateBot(bot.id, updates);
      }
  };
  
  const [userSearch, setUserSearch] = useState('');
  
  // State for selected files in the "Available Files" list (Middle Panel)
  const [selectedAvailableFileIds, setSelectedAvailableFileIds] = useState([]);

  // State for selected users in the "Available" list (Left side for Permissions)
  const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);
  
  // State for selected tools
  const [selectedAvailableToolIds, setSelectedAvailableToolIds] = useState([]);
  const [defaultSettingsTab, setDefaultSettingsTab] = useState('model');
  const [selectedAvailableModelId, setSelectedAvailableModelId] = useState(null);
  const [selectedAvailableParamId, setSelectedAvailableParamId] = useState(null);
  const [selectedAvailablePromptId, setSelectedAvailablePromptId] = useState(null);

  const filteredUsers = users.filter(u => u.name.includes(userSearch));
  const enabledTools = MOCK_TOOLS.filter(t => t.status === 'active');
  const enabledModels = MOCK_LLM_MODELS.filter(m => m.status === 'active');

  // Determine which files to show in "Associated Files" list (Right Panel)
  // Determine which files to show in "Associated Files" list (Right Panel)
  const displayAssociatedFiles = React.useMemo(() => {
     // Always derive from formData.files and allFiles to ensure immediate UI feedback
     // This fixes the issue where adding files in Edit mode didn't update the list
     const currentFileIds = formData.files || [];
     return (allFiles || []).filter(f => currentFileIds.includes(f.id));
  }, [formData.files, allFiles]);

  // Determine which files to show in "Source Files" list (Middle Panel)
  // Logic: Filter allFiles by localSelectedFolderId
  const displaySourceFiles = useMemo(() => {
      if (!allFiles) return [];
      return allFiles.filter(f => f.folderId === localSelectedFolderId);
  }, [allFiles, localSelectedFolderId]);

  // Handler: Select/Deselect available user (Left Panel)
  const toggleAvailableUserSelection = (id) => {
    if (selectedAvailableUserIds.includes(id)) {
        setSelectedAvailableUserIds(prev => prev.filter(uid => uid !== id));
    } else {
        setSelectedAvailableUserIds(prev => [...prev, id]);
    }
  };

  // Handler: Add selected available users to bot (Middle Button)
  const handleAddUsersToBot = () => {
    if (selectedAvailableUserIds.length === 0) return;
    const currentUsers = formData.accessibleUsers || [];
    const newUsersToAdd = selectedAvailableUserIds.filter(id => !currentUsers.includes(id));
    if (newUsersToAdd.length > 0) {
        handleChange({ accessibleUsers: [...currentUsers, ...newUsersToAdd] });
        setSelectedAvailableUserIds([]); // Clear selection
    }
  };

  // Handler: Add ALL filtered users to bot (Middle Button)
  const handleAddAllUsers = () => {
    const currentUsers = formData.accessibleUsers || [];
    const allFilteredIds = filteredUsers.map(u => u.id);
    const newUsersToAdd = allFilteredIds.filter(id => !currentUsers.includes(id));
    if (newUsersToAdd.length > 0) {
        handleChange({ accessibleUsers: [...currentUsers, ...newUsersToAdd] });
    }
  };

  // Handler: Remove user from bot (Right Panel X button)
  const handleRemoveUser = (userId) => {
    const currentUsers = formData.accessibleUsers || [];
    handleChange({ accessibleUsers: currentUsers.filter(id => id !== userId) });
  };
  
  // Tool Handlers - Updated for Object Structure { id, defaultOn }
  const toggleAvailableToolSelection = (id) => {
    const strId = String(id);
    if (selectedAvailableToolIds.includes(strId)) {
        setSelectedAvailableToolIds(prev => prev.filter(tid => tid !== strId));
    } else {
        setSelectedAvailableToolIds(prev => [...prev, strId]);
    }
  };

  const handleAddToolsToBot = () => {
    if (selectedAvailableToolIds.length === 0) return;
    const currentTools = formData.tools || [];
    // Check existing IDs
    const currentToolIds = currentTools.map(t => t.id);
    const newToolsIDS = selectedAvailableToolIds.filter(id => !currentToolIds.includes(id));
    
    if (newToolsIDS.length > 0) {
        // Create new tool objects with defaultOn: true
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
    // toolId is passed as ID string from the UI
    handleChange({ tools: currentTools.filter(t => t.id !== toolId) });
  };

  const handleToggleToolDefault = (toolId) => {
      const currentTools = formData.tools || [];
      const newTools = currentTools.map(t => 
          t.id === toolId ? { ...t, defaultOn: !t.defaultOn } : t
      );
      handleChange({ tools: newTools });
  };

  // Single-select handlers for Model/Param/Prompt
  const handleSetModelToBot = () => {
      if (!selectedAvailableModelId) return;
      handleChange({ defaultSettings: { ...formData.defaultSettings, modelId: selectedAvailableModelId } });
      setSelectedAvailableModelId(null);
  };
  const handleClearModel = () => handleChange({ defaultSettings: { ...formData.defaultSettings, modelId: '' } });

  const handleSetParamToBot = () => {
      if (!selectedAvailableParamId) return;
      handleChange({ defaultSettings: { ...formData.defaultSettings, paramId: selectedAvailableParamId } });
      setSelectedAvailableParamId(null);
  };
  const handleClearParam = () => handleChange({ defaultSettings: { ...formData.defaultSettings, paramId: '' } });

  const handleSetPromptToBot = () => {
      if (!selectedAvailablePromptId) return;
      handleChange({ defaultSettings: { ...formData.defaultSettings, promptId: selectedAvailablePromptId } });
      setSelectedAvailablePromptId(null);
  };
  const handleClearPrompt = () => handleChange({ defaultSettings: { ...formData.defaultSettings, promptId: '' } });
  
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

  // Add checked files from left panel to bot
  const handleAddFilesToBot = () => {
    if (selectedAvailableFileIds.length === 0) return;
    
    const currentFiles = formData.files || [];
    // Filter out duplicates
    const newFilesToAdd = selectedAvailableFileIds.filter(id => !currentFiles.includes(id));
    
    if (newFilesToAdd.length > 0) {
      handleChange({ files: [...currentFiles, ...newFilesToAdd] });
      setSelectedAvailableFileIds([]); // Clear selection after adding
    } else {
      alert("選取的檔案已在關聯清單中。");
    }
  };

    const handleAddAll = () => {
         const currentFiles = formData.files || [];
         const sourceFileIds = displaySourceFiles.map(f => f.id);
         const newFilesToAdd = sourceFileIds.filter(id => !currentFiles.includes(id));
         if(newFilesToAdd.length > 0) {
              handleChange({ files: [...currentFiles, ...newFilesToAdd] });
         }
    };


  const toggleAvailableFileSelection = (id) => {
    if (selectedAvailableFileIds.includes(id)) {
      setSelectedAvailableFileIds(prev => prev.filter(fid => fid !== id));
    } else {
      setSelectedAvailableFileIds(prev => [...prev, id]);
    }
  };

  const handleSave = () => {
      if (isCreating) {
          if (!formData.name) {
              alert('請輸入機器人名稱');
              return;
          }
          onCreateBot(formData);
          alert('機器人已建立！');
      } else {
          alert('設定已保存！');
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      
      {/* 1. 頂部導航 Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0 z-10">
         <div className="flex items-center gap-3">
            <button 
                onClick={onBack}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors mr-2"
                title="返回列表"
            >
                <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bot size={24} />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-800 leading-tight">
                    {isCreating ? '新增答詢機器人' : formData.name}
                </h1>
                <p className="text-xs text-slate-500">
                    {isCreating ? '建立一個新的 AI 助理' : '管理與設定您的 AI 助理'}
                </p>
            </div>
         </div>
         <div className="flex items-center gap-3">
           {!isCreating && (
             <button 
               onClick={() => { if(confirm('確定要刪除此機器人嗎？')) onDeleteBot(bot.id) }} 
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
          
          {/* 2. 第一區塊：基本設定 Basic Settings */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">基本設定</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Name, Status, Toggles */}
                  <div className="space-y-6">
                      
                      {/* 1. Name */}
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">機器人名稱</label>
                          <input 
                                value={formData.name || ''}
                                onChange={(e) => handleChange({ name: e.target.value })}
                                placeholder="例如：人資小幫手"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                            />
                      </div>

                      {/* 2. Status */}
                      <div className="space-y-1">
                          <label className="block text-sm font-medium text-slate-700">運作狀態</label>
                          <div className="h-[42px] flex items-center">
                           <label className="relative inline-flex items-center cursor-pointer">
                             <input 
                                 type="checkbox" 
                                 className="sr-only peer"
                                 checked={formData.status === 'active'}
                                 onChange={() => handleChange({ status: formData.status === 'active' ? 'inactive' : 'active' })}
                             />
                             <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                             <span className="ml-2 text-sm font-medium text-slate-700">
                                 {formData.status === 'active' ? '啟用' : '停用'}
                             </span>
                           </label>
                          </div>
                      </div>

                      {/* 3. Feature Toggles */}
                      <div className="space-y-1">
                         <label className="block text-sm font-medium text-slate-700">功能設定</label>
                         <div className="flex flex-col gap-3 py-2">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.allowUpload ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                    {formData.allowUpload && <Check size={14} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={!!formData.allowUpload}
                                    onChange={(e) => handleChange({ allowUpload: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700">啟用檔案上傳</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.enableFeedback ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                    {formData.enableFeedback && <Check size={14} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={!!formData.enableFeedback}
                                    onChange={(e) => handleChange({ enableFeedback: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700">啟用回饋機制</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.showInstructions ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                    {formData.showInstructions && <Check size={14} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={!!formData.showInstructions}
                                    onChange={(e) => handleChange({ showInstructions: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700">顯示使用文件</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.showCitations ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                    {formData.showCitations && <Check size={14} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={!!formData.showCitations}
                                    onChange={(e) => handleChange({ showCitations: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700">顯示引用來源</span>
                            </label>
                         </div>
                      </div>
                  </div>

                  {/* Right Column: Welcome Message, Questions */}
                  <div className="space-y-6">
                       {/* Welcome Message tabbed */}
                       <div className="flex gap-4 border-b border-slate-200">
                           <button 
                             onClick={() => setActiveTab('welcome')}
                             className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'welcome' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                           >
                               歡迎語 (Welcome Message)
                           </button>
                           <button 
                             onClick={() => setActiveTab('questions')}
                             className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'questions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                           >
                               預設提問 (Default Questions)
                           </button>
                       </div>
                       
                       <div className="h-[200px]">
                           {activeTab === 'welcome' ? (
                               <textarea 
                                   value={formData.welcomeMessage || ''}
                                   onChange={(e) => handleChange({ welcomeMessage: e.target.value })}
                                   placeholder="輸入機器人的歡迎語..."
                                   className="w-full h-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                               />
                           ) : (
                               <div className="space-y-3 h-full flex flex-col">
                                     <div className="flex gap-2">
                                         <button onClick={handleAddQuestion} className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                                             <Plus size={14} /> 新增提問
                                         </button>
                                     </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto pr-2 custom-scrollbar content-start">
                                         {(formData.defaultQuestions || []).map((q, idx) => (
                                             <div key={idx} className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg group">
                                                 <span className="text-sm text-slate-700 truncate">{q}</span>
                                                 <button onClick={() => handleRemoveQuestion(idx)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                     <X size={14} />
                                                 </button>
                                             </div>
                                         ))}
                                         {(formData.defaultQuestions || []).length === 0 && (
                                             <span className="text-sm text-slate-400 italic px-2">尚未設定預設提問</span>
                                         )}
                                     </div>
                               </div>
                           )}
                       </div>
                  </div>
              </div>
          </section>

          {/* 2.5. Unified Default Settings with Tabs */}
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
                  {/* ===== Model Tab (Single Select) ===== */}
                  {defaultSettingsTab === 'model' && (<>
                      <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                          <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">可用模型</span>
                              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{enabledModels.length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {enabledModels.length === 0 ? (
                                      <div className="text-center py-10 text-slate-400 text-sm">無可用模型</div>
                                  ) : enabledModels.map(model => {
                                      const isSelected = selectedAvailableModelId === model.id;
                                      const isCurrent = formData.defaultSettings?.modelId === model.id;
                                      return (
                                          <div key={model.id} onClick={() => !isCurrent && setSelectedAvailableModelId(isSelected ? null : model.id)}
                                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isCurrent ? 'opacity-50 bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                                                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                              </div>
                                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Cpu size={12} /></div>
                                                  <div className="text-sm font-medium text-slate-700 truncate">{model.name}</div>
                                                  {isCurrent && <span className="text-xs text-slate-400">• 已設定</span>}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                          <button onClick={handleSetModelToBot} disabled={!selectedAvailableModelId}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="設定模型">
                              <ChevronsRight size={18} />
                          </button>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                          <div className="p-3 border-b border-slate-100 bg-purple-50/30 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">已設定模型</span>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{formData.defaultSettings?.modelId ? 1 : 0}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              {!formData.defaultSettings?.modelId ? (
                                  <div className="flex flex-col items-center justify-center h-full text-slate-400"><Cpu size={32} className="mb-2 opacity-50" /><p className="text-xs">尚未設定模型</p></div>
                              ) : (() => {
                                  const model = MOCK_LLM_MODELS.find(m => m.id === formData.defaultSettings.modelId);
                                  if (!model) return null;
                                  return (
                                      <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 border border-purple-100 group hover:bg-purple-100 transition-colors">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center"><Cpu size={12} /></div>
                                              <span className="text-sm font-medium text-slate-700 truncate">{model.name}</span>
                                          </div>
                                          <button onClick={handleClearModel} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all" title="清除模型"><X size={14} /></button>
                                      </div>
                                  );
                              })()}
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
                          <button onClick={handleSetParamToBot} disabled={!selectedAvailableParamId}
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

                  {/* ===== Prompt Tab (Single Select) ===== */}
                  {defaultSettingsTab === 'prompt' && (<>
                      <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                          <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">可用提示詞</span>
                              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{MOCK_LLM_PROMPTS.length}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              <div className="space-y-1">
                                  {MOCK_LLM_PROMPTS.map(pr => {
                                      const isSelected = selectedAvailablePromptId === pr.id;
                                      const isCurrent = formData.defaultSettings?.promptId === pr.id;
                                      return (
                                          <div key={pr.id} onClick={() => !isCurrent && setSelectedAvailablePromptId(isSelected ? null : pr.id)}
                                              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isCurrent ? 'opacity-50 bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                                                  {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                              </div>
                                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><MessageSquare size={12} /></div>
                                                  <div className="text-sm font-medium text-slate-700 truncate">{pr.name}</div>
                                                  {isCurrent && <span className="text-xs text-slate-400">• 已設定</span>}
                                              </div>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                          <button onClick={handleSetPromptToBot} disabled={!selectedAvailablePromptId}
                              className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="設定提示詞">
                              <ChevronsRight size={18} />
                          </button>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                          <div className="p-3 border-b border-slate-100 bg-green-50/30 flex justify-between items-center">
                              <span className="text-sm font-semibold text-slate-700">已設定提示詞</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{formData.defaultSettings?.promptId ? 1 : 0}</span>
                          </div>
                          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                              {!formData.defaultSettings?.promptId ? (
                                  <div className="flex flex-col items-center justify-center h-full text-slate-400"><MessageSquare size={32} className="mb-2 opacity-50" /><p className="text-xs">尚未設定提示詞</p></div>
                              ) : (() => {
                                  const pr = MOCK_LLM_PROMPTS.find(p => p.id === formData.defaultSettings.promptId);
                                  if (!pr) return null;
                                  return (
                                      <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100 group hover:bg-green-100 transition-colors">
                                          <div className="flex items-center gap-2 min-w-0 flex-1">
                                              <div className="w-6 h-6 rounded-full bg-green-200 text-green-700 flex items-center justify-center"><MessageSquare size={12} /></div>
                                              <span className="text-sm font-medium text-slate-700 truncate">{pr.name}</span>
                                          </div>
                                          <button onClick={handleClearPrompt} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all" title="清除提示詞"><X size={14} /></button>
                                      </div>
                                  );
                              })()}
                          </div>
                      </div>
                  </>)}

                  {/* ===== Tools Tab (Multi Select) ===== */}
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
                          <button onClick={handleAddToolsToBot} disabled={selectedAvailableToolIds.length === 0}
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

          {/* 3. 關聯文件設定 (Three Columns: Tree | Files | Selected) */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">關聯文件設定</h3>
                  {/* Local Folder Indicator */}
                  <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                      瀏覽目錄中
                  </div>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  
                  {/* Col 1: Folder Tree */}
                  <div className="w-1/4 border-r border-slate-100 flex flex-col bg-slate-50/30 min-w-[200px]">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                          <span className="text-sm font-semibold text-slate-700">資料夾結構</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                          {KB_TREE_DATA
                            .filter(node => !['personal', 'shared_root'].includes(node.id))
                            .map(node => (
                             <TreeNode 
                                 key={node.id} 
                                 node={node} 
                                 selectedFolderId={localSelectedFolderId} 
                                 onSelectFolder={setLocalSelectedFolderId}
                                 files={allFiles} // To show file counts inside folder
                             />
                          ))}
                      </div>
                  </div>

                  {/* Col 2: Source Files List (Filtered by Folder) */}
                  <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100 bg-white">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">可選文件</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{displaySourceFiles.length}</span>
                      </div>
                      <div className="p-3 border-b border-slate-50">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="搜尋..." className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                          </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {displaySourceFiles.length === 0 ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">此資料夾無文件</div>
                               ) : displaySourceFiles.map(file => {
                                   const isSelected = selectedAvailableFileIds.includes(file.id);
                                   const isAdded = (formData.files || []).includes(file.id);
                                   return (
                                       <div 
                                         key={file.id}
                                         onClick={() => !isAdded && toggleAvailableFileSelection(file.id)} 
                                         className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                            ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                         `}
                                       >
                                           <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                               {isSelected && <Check size={10} />}
                                           </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-slate-700 truncate">{file.name}</div>
                                                <div className="text-xs text-slate-400 flex gap-2">
                                                    <span>{file.size}</span>
                                                    {isAdded && <span>• 已加入</span>}
                                                </div>
                                            </div>
                                       </div>
                                   )
                               })}
                           </div>
                      </div>
                  </div>

                  {/* Center: Actions */}
                  <div className="w-14 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                      <button 
                        onClick={handleAddFilesToBot}
                        disabled={selectedAvailableFileIds.length === 0}
                        className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                        title="加入選取"
                      >
                          <ArrowRight size={18} />
                      </button>
                      <button 
                         onClick={handleAddAll}
                         className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all"
                         title="加入全部 (本資料夾)"
                      >
                          <ChevronsRight size={18} />
                      </button>
                  </div>

                  {/* Right: Target List (Selected Files) */}
                  <div className="w-1/3 flex flex-col min-w-0 bg-white">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">已關聯文件</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{displayAssociatedFiles.length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                          <div className="space-y-1">
                               {displayAssociatedFiles.length === 0 ? (
                                   <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                       <FileCode size={32} className="mb-2 opacity-50" />
                                       <p className="text-xs">尚未關聯任何文件</p>
                                   </div>
                               ) : displayAssociatedFiles.map(file => (
                                   <div key={file.id} className="flex items-center p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-200 transition-colors group">
                                       <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center mr-3 font-bold text-xs">
                                          FILE
                                       </div>
                                       <div className="flex-1 min-w-0">
                                           <div className="text-sm font-medium text-slate-700 truncate">{file.name}</div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">已索引</span>
                                                <span className="text-xs text-slate-400">{file.size}</span>
                                            </div>
                                       </div>
                                       <button 
                                         onClick={() => {
                                             const currentFiles = formData.files || [];
                                             handleChange({ files: currentFiles.filter(id => id !== file.id) });
                                         }}
                                         className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                       >
                                           <X size={16} />
                                       </button>
                                   </div>
                               ))}
                          </div>
                      </div>
                  </div>

              </div>
          </section>

          {/* 4. 第三區塊：權限設定 Permissions (Transfer List) */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px] mb-6">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">使用權限設定</h3>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  
                  {/* Left: Source List (Available Users) */}
                  <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">可選用戶</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{filteredUsers.length}</span>
                      </div>
                      <div className="p-3">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                               type="text" 
                               value={userSearch}
                               onChange={(e) => setUserSearch(e.target.value)}
                               placeholder="搜尋用戶..." 
                               className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" 
                            />
                          </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {filteredUsers.map(user => {
                                   const isSelected = selectedAvailableUserIds.includes(user.id);
                                   const isAdded = (formData.accessibleUsers || []).includes(user.id);
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
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 mr-3 text-xs font-bold">
                                                {user.name.slice(0, 1)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-slate-700 truncate">{user.name}</div>
                                                <div className="text-xs text-slate-400">{user.type === 'admin' ? '系統管理員' : '一般使用者'}</div>
                                            </div>
                                            {isAdded && <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">已加入</span>}
                                       </div>
                                   )
                               })}
                           </div>
                      </div>
                  </div>

                  {/* Center: Actions */}
                  <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                      <button 
                        onClick={handleAddUsersToBot}
                        disabled={selectedAvailableUserIds.length === 0}
                        className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                      >
                          <ArrowRight size={18} />
                      </button>
                      <button 
                        onClick={handleAddAllUsers}
                        className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all"
                      >
                          <ChevronsRight size={18} />
                      </button>
                  </div>

                  {/* Right: Target List (Selected Users) */}
                  <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">已授權用戶</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{formData.accessibleUsers ? formData.accessibleUsers.length : 0}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {(formData.accessibleUsers || []).length === 0 ? (
                                   <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                       <Users size={32} className="mb-2 opacity-50" />
                                       <p className="text-xs">尚未加入任何用戶</p>
                                   </div>
                               ) : (formData.accessibleUsers || []).map(userId => {
                                   const user = users.find(u => u.id === userId);
                                   if (!user) return null;
                                   return (
                                       <div key={user.id} className="flex items-center p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-200 transition-colors group">
                                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3 text-xs font-bold">
                                                {user.name.slice(0, 1)}
                                           </div>
                                           <div className="flex-1 min-w-0">
                                               <div className="text-sm font-medium text-slate-700 truncate">{user.name}</div>
                                               <div className="text-xs text-slate-400">{user.type === 'admin' ? '系統管理員' : '一般使用者'}</div>
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
    </div>
  );
}
