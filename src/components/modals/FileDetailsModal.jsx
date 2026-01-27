import React, { useState } from 'react';
import { FileText, ArrowLeftRight, Users, Bot, UserPlus, Circle } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';

export function FileDetailsModal({ file, users, bots = [], onClose, onUpdateSharedWith }) {
  if (!file) return null;
  
  const [activeTab, setActiveTab] = useState('sharedBy');

  const sharedUsers = (file.sharedWith || []).map(userId => users.find(u => u.id === userId)).filter(Boolean);
  
  // Mock shared by user logic
  const sharedBy = file.isSharedByOthers ? users[2] : null; // Mock李大華 as sharer if applicable
  
  // Find bots using this file
  const usedByBots = bots.filter(bot => bot.files.includes(file.id));

  const handleRemoveShare = (userId) => {
    const newSharedWith = file.sharedWith.filter(id => id !== userId);
    onUpdateSharedWith(file.id, newSharedWith);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex-1 pb-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
        activeTab === id 
          ? 'text-blue-600 border-blue-600' 
          : 'text-slate-500 border-transparent hover:text-slate-700'
      }`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-0">
         <div className="p-6 bg-slate-50 border-b border-slate-100">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                   <FileText size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight">{file.name}</h3>
                   <div className="text-xs text-slate-500 space-x-3">
                      <span>大小：{file.size}</span>
                      <span>修改日期：{file.date}</span>
                   </div>
                </div>
            </div>
         </div>

         <div className="flex border-b border-slate-200 px-6 pt-2">
            <TabButton id="sharedBy" label="分享來源" icon={ArrowLeftRight} />
            <TabButton id="sharedWith" label="分享對象" icon={Users} />
            <TabButton id="usedByBots" label="答詢機器人" icon={Bot} />
         </div>

         <div className="p-6 min-h-[200px]">
            {activeTab === 'sharedBy' && (
                <div className="space-y-4">
                   {sharedBy ? (
                     <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">
                           {sharedBy.name[0]}
                        </div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">{sharedBy.name}</div>
                           <div className="text-xs text-slate-500">此檔案由他人分享</div>
                        </div>
                     </div>
                   ) : (
                     <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">
                           我
                        </div>
                        <div>
                           <div className="text-sm font-bold text-slate-800">我自己</div>
                           <div className="text-xs text-slate-500">此檔案由我建立</div>
                        </div>
                     </div>
                   )}
                </div>
            )}

            {activeTab === 'sharedWith' && (
               <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-slate-400 uppercase">已分享給 {sharedUsers.length} 人</span>
                     <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><UserPlus size={12}/> 新增</button>
                  </div>
                  {sharedUsers.length === 0 ? (
                     <div className="text-center py-8 text-slate-400 text-sm italic">尚未分享給任何人</div>
                  ) : (
                     <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                        {sharedUsers.map(user => (
                           <div key={user.id} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.type === 'dept' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-600'}`}>
                                    {user.type === 'dept' ? 'D' : user.name[0]}
                                 </div>
                                 <span className="text-sm text-slate-700">{user.name}</span>
                              </div>
                              <button 
                                onClick={() => handleRemoveShare(user.id)}
                                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                              >
                                取消分享
                              </button>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}

            {activeTab === 'usedByBots' && (
                <div className="space-y-2">
                   <div className="text-xs font-bold text-slate-400 uppercase mb-2">已被 {usedByBots.length} 個機器人使用</div>
                   {usedByBots.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-sm italic">未被任何機器人使用</div>
                   ) : (
                      <div className="grid gap-2">
                         {usedByBots.map(bot => (
                            <div key={bot.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                               <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                  <Bot size={16} />
                               </div>
                               <div>
                                  <div className="text-sm font-medium text-slate-800">{bot.name}</div>
                                  <div className={`text-[10px] inline-flex items-center gap-1 ${bot.status === 'active' ? 'text-green-600' : 'text-slate-400'}`}>
                                     <Circle size={6} className={bot.status === 'active' ? 'fill-green-600' : 'fill-slate-400'} />
                                     {bot.status === 'active' ? '啟用中' : '停用中'}
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                </div>
            )}
         </div>
         
         <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 shadow-md">關閉</button>
         </div>
      </div>
    </ModalOverlay>
  );
}
