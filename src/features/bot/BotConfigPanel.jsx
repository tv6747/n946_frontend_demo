import React, { useState } from 'react';
import { 
    Bot, Trash2, Save, Settings, Power, Plus, X, Users, Search, 
    CheckSquare, FolderOpen, ArrowRight, ArrowLeft, ChevronsRight, FileCode, Check, File 
} from 'lucide-react';

export function BotConfigPanel({ bot, isCreating, associatedFiles, folderFiles, allFiles, selectedFolderName, users, onUpdateBot, onCreateBot, onRemoveFile, onDeleteBot, onOpenLLMSettings }) {
  if (!bot) return null;
  
  // Use local state for the form data to support creation mode and edits
  const [formData, setFormData] = React.useState(bot);
  const [activeTab, setActiveTab] = useState('welcome'); // 'welcome' or 'questions'

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
  
  // State for selected files in the "Available Files" list (Left side)
  const [selectedAvailableFileIds, setSelectedAvailableFileIds] = useState([]);

  // State for selected users in the "Available" list (Left side for Permissions)
  const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);

  const filteredUsers = users.filter(u => u.name.includes(userSearch));

  // Determine which files to show in "Associated Files" list
  // If creating, we must derive from formData.files because prop 'associatedFiles' relies on parent state which might be empty/stale for NEW_BOT
  const displayAssociatedFiles = React.useMemo(() => {
     if (isCreating) {
        return (allFiles || []).filter(f => (formData.files || []).includes(f.id));
     }
     return associatedFiles;
  }, [isCreating, formData.files, associatedFiles, allFiles]);

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
    // Placeholder for "Add All" - currently just adds selected, logically could add all in folder
    const handleAddAll = () => {
         const currentFiles = formData.files || [];
         const allFolderFileIds = folderFiles.map(f => f.id);
          const newFilesToAdd = allFolderFileIds.filter(id => !currentFiles.includes(id));
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
                          <div className="flex gap-2">
                              <input 
                                    value={formData.name || ''}
                                    onChange={(e) => handleChange({ name: e.target.value })}
                                    placeholder="例如：人資小幫手"
                                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                                />
                                <button 
                                    onClick={onOpenLLMSettings}
                                    className="px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"
                                    title="模型參數設定"
                                >
                                    <Settings size={18} />
                                </button>
                          </div>
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
                         <label className="block text-sm font-medium text-slate-700">功能開關</label>
                         <div className="flex flex-col gap-3 py-2">
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
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.allowUpload ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                    {formData.allowUpload && <Check size={14} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={!!formData.allowUpload}
                                    onChange={(e) => handleChange({ allowUpload: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-slate-700">允許上傳文件</span>
                            </label>
                         </div>
                      </div>
                  </div>

                  {/* Right Column: Tabs (Welcome / Questions) */}
                  <div className="flex flex-col h-full border-l border-slate-100 pl-8">
                       <div className="flex items-center gap-1 border-b border-slate-200 mb-4">
                           <button 
                             onClick={() => setActiveTab('welcome')}
                             className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'welcome' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                           >
                               歡迎詞
                           </button>
                           <button 
                             onClick={() => setActiveTab('questions')}
                             className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'questions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                           >
                               預設提問
                           </button>
                       </div>
                       
                       <div className="flex-1 min-h-[120px]">
                           {activeTab === 'welcome' ? (
                               <textarea 
                                 value={formData.welcomeMessage || ''}
                                 onChange={(e) => handleChange({ welcomeMessage: e.target.value })}
                                 placeholder="請輸入當使用者初次進入時的歡迎訊息..."
                                 rows={8}
                                 className="w-full h-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none transition-all"
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

          {/* 3. 第二區塊：知識庫管理 KB Management (Transfer List) */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">知識庫管理</h3>
                  {/* Extra filters could go here */}
                  <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                      當前資料夾: <span className="font-semibold text-slate-700">{selectedFolderName}</span>
                  </div>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  
                  {/* Left: Source List */}
                  <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">來源文件</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{folderFiles.length}</span>
                      </div>
                      <div className="p-3">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="搜尋列表..." className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                          </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {folderFiles.length === 0 ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">無文件</div>
                               ) : folderFiles.map(file => {
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
                  <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
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
                         title="加入全部 (本頁)"
                      >
                          <ChevronsRight size={18} />
                      </button>
                  </div>

                  {/* Right: Target List */}
                  <div className="flex-1 flex flex-col min-w-0">
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
                                         onClick={() => onRemoveFile(file.id)}
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
                        onClick={handleAddUsersToBot}
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

                  {/* Right: Target List (Selected Users) */}
                  <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">可用人員 / 部門</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{(formData.accessibleUsers || []).length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                          <div className="space-y-1">
                               {(formData.accessibleUsers || []).length === 0 ? (
                                   <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                       <Users size={32} className="mb-2 opacity-50" />
                                       <p className="text-xs">尚未設定任何權限</p>
                                   </div>
                               ) : (formData.accessibleUsers || []).map(userId => {
                                   const user = users.find(u => u.id === userId) || { id: userId, name: '未知用戶', type: 'user' };
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
    </div>
  );
}
