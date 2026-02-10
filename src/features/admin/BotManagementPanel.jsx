import React, { useState } from 'react';
import { Search, Plus, Bot, Edit2, Trash2, Users, LayoutGrid, FileText } from 'lucide-react';
import { MASTER_FILES } from '../../data/mockData';
import { MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_TOOLS } from '../../data/mockToolData';

export function BotManagementPanel({ bots, onSelectBot, onCreate, onDeleteBot, onUpdateBot }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBots = bots.filter(bot => 
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (bot.description && bot.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Helper functions
  const getModelName = (id) => MOCK_LLM_MODELS.find(m => m.id === id)?.name || '(未設定)';
  const getParamName = (id) => MOCK_LLM_PARAMS.find(p => p.id === id)?.name || '(未設定)';
  const getPromptName = (id) => MOCK_LLM_PROMPTS.find(p => p.id === id)?.name || '(未設定)';
  const getFileName = (id) => MASTER_FILES.find(f => f.id === id)?.name || id;

  const formatDate = (dateString) => {
      if (!dateString) return '剛剛';
      return new Date(dateString).toLocaleDateString('zh-TW');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="relative flex-1 max-w-lg">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
               type="text" 
               placeholder="搜尋機器人名稱..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
            />
         </div>
         <div className="flex-shrink-0">
             <button 
                onClick={onCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
             >
                 <Plus size={16} /> 新增機器人
             </button>
         </div>
      </header>

      {/* Grid Content */}
      <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {filteredBots.map(bot => (
              <div 
                key={bot.id} 
                className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all group relative"
              >
                  {/* Status Strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${bot.status === 'active' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bot.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                              <Bot size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-slate-800 truncate">{bot.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${bot.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {bot.status === 'active' ? '啟用中' : '已停用'}
                              </span>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {/* Status Toggle Switch */}
                        <div className="flex items-center mr-2" onClick={(e) => e.stopPropagation()}>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={bot.status === 'active'}
                                  onChange={(e) => onUpdateBot && onUpdateBot(bot.id, { status: e.target.checked ? 'active' : 'inactive' })}
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>

                        <button 
                            onClick={() => onSelectBot(bot.id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                            title="編輯"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button 
                             onClick={() => {
                                 if(confirm('確定要刪除此機器人嗎？')) onDeleteBot && onDeleteBot(bot.id);
                             }}
                             className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                             title="刪除"
                         >
                             <Trash2 size={16} />
                         </button>
                      </div>
                  </div>
                  
                  {/* Details Container */}
                  <div className="space-y-3 pl-2">
                      
                      {/* Default Settings (Model/Param/Prompt) */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">預設設定</label>
                          <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-500 w-12">模型:</span>
                                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                      {getModelName(bot.defaultSettings?.modelId)}
                                  </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-500 w-12">參數:</span>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                      {getParamName(bot.defaultSettings?.paramId)}
                                  </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-500 w-12">提示詞:</span>
                                  <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-medium truncate flex-1">
                                      {getPromptName(bot.defaultSettings?.promptId)}
                                  </span>
                              </div>
                          </div>
                      </div>

                      {/* Activated Tools */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">已加入工具</label>
                          <div className="flex flex-wrap gap-1">
                              {!bot.tools || bot.tools.length === 0 ? (
                                  <span className="text-xs text-slate-400 italic">無已加入工具</span>
                              ) : (bot.tools || []).map((t, idx) => {
                                  // t can be string id or { id, defaultOn }
                                  const id = typeof t === 'object' ? t.id : t;
                                  const isDefault = typeof t === 'object' ? t.defaultOn : false;
                                  const tool = MOCK_TOOLS.find(mt => String(mt.id) === String(id));
                                  if (!tool) return null;
                                  return (
                                      <span key={idx} className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${isDefault ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                                          {tool.name}
                                          {isDefault && <span className="text-[8px] opacity-70 border border-orange-300 rounded px-0.5 leading-none">預設</span>}
                                      </span>
                                  );
                              })}
                          </div>
                      </div>

                      {/* Associated Files */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">關聯文件 ({bot.files ? bot.files.length : 0})</label>
                          <div className="flex flex-wrap gap-1">
                              {(bot.files || []).slice(0, 5).map(fileId => (
                                  <span key={fileId} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium truncate max-w-[150px]">
                                      {getFileName(fileId)}
                                  </span>
                              ))}
                              {(bot.files || []).length > 5 && (
                                  <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs font-medium">+{bot.files.length - 5}</span>
                              )}
                              {(!bot.files || bot.files.length === 0) && (
                                  <span className="text-xs text-slate-400 italic">無關聯文件</span>
                              )}
                          </div>
                      </div>

                      {/* Welcome Message */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">歡迎詞</label>
                          <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2 min-h-[34px]">
                              {bot.welcomeMessage || '未設定歡迎詞'}
                          </div>
                      </div>

                      {/* Default Questions */}
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">預設問題</label>
                          <div className="text-xs text-slate-600 space-y-0.5">
                              {(bot.defaultQuestions || []).slice(0, 2).map((q, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                      <span className="text-blue-500 mt-0.5">•</span>
                                      <span className="line-clamp-1">{q}</span>
                                  </div>
                              ))}
                              {(bot.defaultQuestions || []).length > 2 && (
                                  <div className="text-[10px] text-slate-400 pl-3">+{bot.defaultQuestions.length - 2} 更多...</div>
                              )}
                              {(!bot.defaultQuestions || bot.defaultQuestions.length === 0) && (
                                  <span className="text-slate-400 italic">無預設問題</span>
                              )}
                          </div>
                      </div>

                      {/* Permissions */}
                      <div className="pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5 text-slate-600">
                                  <Users size={12} />
                                  <span className="font-medium">
                                      {bot.accessibleUsers ? `${bot.accessibleUsers.length} 位使用者` : '公開'}
                                  </span>
                              </div>
                              <span className="text-[10px] text-slate-400">{formatDate(bot.updatedAt)}</span>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
