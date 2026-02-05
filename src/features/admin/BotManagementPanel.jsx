import React, { useState } from 'react';
import { Search, Plus, Bot, MoreHorizontal, Edit2, Trash2, Power, Users, MessageSquare, FileText } from 'lucide-react';

export function BotManagementPanel({ bots, onSelectBot, onCreate, onDeleteBot, onUpdateBot }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBots = bots.filter(bot => 
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (bot.description && bot.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all group relative flex flex-col h-full"
              >
                  {/* Card Top: Icon, Name, Toggle */}
                  <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bot.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                              <Bot size={24} />
                          </div>
                          <div>
                              <h3 className="font-bold text-slate-800 line-clamp-1">{bot.name}</h3>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 ${bot.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {bot.status === 'active' ? '啟用中' : '已停用'}
                              </span>
                          </div>
                      </div>
                      
                      {/* Status Toggle Switch */}
                      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
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
                  </div>

                  <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">
                      {bot.description || '這是一個自定義的答詢機器人，專門處理特定領域的問答任務。'}
                  </p>
                  
                  {/* Card Footer: Metadata and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                       <div className="flex items-center gap-4 text-xs text-slate-400">
                            <div className="flex items-center gap-1.5" title="關聯文件">
                                <FileText size={14} />
                                <span>{bot.files ? bot.files.length : 0}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="授權用戶">
                                <Users size={14} />
                                <span>{bot.accessibleUsers ? bot.accessibleUsers.length : 0}</span>
                            </div>
                       </div>
                       
                       <div className="flex items-center gap-1">
                            <button 
                                onClick={() => onSelectBot(bot.id)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                title="編輯機器人"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => {
                                    if(confirm('確定要刪除此機器人嗎？')) onDeleteBot && onDeleteBot(bot.id);
                                }}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                title="刪除機器人"
                            >
                                <Trash2 size={16} />
                            </button>
                       </div>
                   </div>
              </div>
          ))}

          {/* New Bot Card - REMOVED per requirements */}
      </div>
    </div>
  );
}
