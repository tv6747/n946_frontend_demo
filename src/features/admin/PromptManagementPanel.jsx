import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, MessageSquare, Users } from 'lucide-react';
import { MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { MOCK_USERS } from '../../data/mockData';
import { PromptConfigPanel } from './PromptConfigPanel';

export function PromptManagementPanel() {
  const [prompts, setPrompts] = useState(MOCK_LLM_PROMPTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(null); // null for list, 'NEW' for create, object for edit

  const filteredPrompts = prompts.filter(prompt => 
      prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdatePrompt = (id, updates) => {
      setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleCreatePrompt = (newPromptData) => {
      const newPrompt = {
          ...newPromptData,
          id: `prompt_${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
          creator: 'Me', // Default creator
          permissions: newPromptData.permissions || { allowedUsers: [], isPublic: false }
      };
      setPrompts(prev => [...prev, newPrompt]);
      setSelectedPrompt(null); // Return to list
  };

  const handleDeletePrompt = (id) => {
      setPrompts(prev => prev.filter(p => p.id !== id));
      setSelectedPrompt(null);
  };

  // Render Config Panel if selected
  if (selectedPrompt) {
      return (
          <PromptConfigPanel 
              prompt={selectedPrompt === 'NEW' ? null : selectedPrompt}
              isCreating={selectedPrompt === 'NEW'}
              users={MOCK_USERS}
              onUpdatePrompt={handleUpdatePrompt}
              onCreatePrompt={handleCreatePrompt}
              onDeletePrompt={handleDeletePrompt}
              onBack={() => setSelectedPrompt(null)}
          />
      );
  }

  // Render List View
  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="flex items-center gap-4 flex-1">
             <div className="relative flex-1 max-w-md group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                   type="text" 
                   placeholder="搜尋提示詞名稱、內容、建立者..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                />
             </div>
         </div>
         <div className="flex-shrink-0">
             <button 
                onClick={() => setSelectedPrompt('NEW')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
             >
                 <Plus size={16} /> 新增提示詞
             </button>
         </div>
      </header>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full">
                  <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-3 font-bold text-left w-1/5">提示詞名稱</th>
                          <th className="px-6 py-3 font-bold text-left w-2/5">提示詞內容</th>
                          <th className="px-6 py-3 font-bold text-left">權限</th>
                          <th className="px-6 py-3 font-bold text-left">建立者</th>
                          <th className="px-6 py-3 font-bold text-left">建立日期</th>
                          <th className="px-6 py-3 font-bold text-right">操作</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {filteredPrompts.map(prompt => (
                          <tr key={prompt.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 align-top">
                                  <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                                          <MessageSquare size={16} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-sm">{prompt.name}</span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 align-top">
                                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-mono bg-slate-50 p-2 rounded border border-slate-100">
                                      {prompt.content}
                                  </p>
                              </td>
                              <td className="px-6 py-4 align-top">
                                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                      <Users size={14} />
                                      <span>
                                          {prompt.permissions?.isPublic ? '公開' : `${(prompt.permissions?.allowedUsers || []).length} 人`}
                                      </span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 align-top">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                      {prompt.creator}
                                  </span>
                              </td>
                              <td className="px-6 py-4 align-top text-sm text-slate-500 mt-1">
                                  {prompt.createdAt}
                              </td>
                              <td className="px-6 py-4 align-top text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={() => setSelectedPrompt(prompt)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="編輯"
                                      >
                                          <Edit2 size={16} />
                                      </button>
                                      <button 
                                        onClick={() => { if(confirm('確定要刪除嗎？')) handleDeletePrompt(prompt.id) }}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="刪除"
                                      >
                                          <Trash2 size={16} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                      {filteredPrompts.length === 0 && (
                          <tr>
                              <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm">
                                  查無符合條件的提示詞
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
