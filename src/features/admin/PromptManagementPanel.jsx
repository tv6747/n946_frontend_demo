import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { MOCK_LLM_PROMPTS } from '../../data/mockLLMData';

export function PromptManagementPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEdit = (prompt) => {
      setFormData(prompt);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setFormData({});
      setIsModalOpen(true);
  };

  const filteredPrompts = MOCK_LLM_PROMPTS.filter(prompt => 
      prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
               type="text" 
               placeholder="搜尋提示詞名稱、內容、建立者..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
            />
         </div>
         <div className="flex-shrink-0">
             <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
             >
                 <Plus size={16} /> 新增提示詞
             </button>
         </div>
      </header>

      {/* Table */}
      <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase w-1/5">提示詞名稱</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase w-2/5">提示詞內容</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">建立者</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">建立日期</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase">操作</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredPrompts.map(prompt => (
                          <tr key={prompt.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 text-sm font-medium text-slate-800">{prompt.name}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">
                                  <div className="line-clamp-2">{prompt.content}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-600">{prompt.creator}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{prompt.createdAt}</td>
                              <td className="px-4 py-3">
                                  <div className="flex items-center justify-center gap-2">
                                      <button 
                                        onClick={() => handleEdit(prompt)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                      >
                                          <Edit2 size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                          <Trash2 size={16} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800">{formData.id ? '編輯提示詞' : '新增提示詞'}</h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={18} />
                      </button>
                  </header>
                  <div className="p-5 space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">提示詞名稱</label>
                          <input 
                            type="text" 
                            value={formData.name || ''} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                            placeholder="e.g. 公文撰寫助理" 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">提示詞內容</label>
                          <textarea 
                            value={formData.content || ''} 
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            rows={10}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono" 
                            placeholder="輸入系統提示詞..." 
                          />
                      </div>
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
                          儲存
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}
