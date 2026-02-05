import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, HelpCircle } from 'lucide-react';
import { MOCK_LLM_PARAMS } from '../../data/mockLLMData';

export function ModelParametersPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEdit = (param) => {
      setFormData(param);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setFormData({ temperature: 0.7, topP: 0.9, topK: 40 });
      setIsModalOpen(true);
  };

  const filteredParams = MOCK_LLM_PARAMS.filter(param => 
      param.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
               type="text" 
               placeholder="搜尋參數名稱..." 
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
                 <Plus size={16} /> 新增參數
             </button>
         </div>
      </header>

      {/* Table */}
      <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">參數名稱</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase">Temperature</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase">Top-P</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase">Top-K</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">建立日期</th>
                          <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase">操作</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredParams.map(param => (
                          <tr key={param.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 text-sm font-medium text-slate-800">{param.name}</td>
                              <td className="px-4 py-3 text-center">
                                  <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{param.temperature}</span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                  <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{param.topP}</span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                  <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{param.topK}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-600">{param.createdAt}</td>
                              <td className="px-4 py-3">
                                  <div className="flex items-center justify-center gap-2">
                                      <button 
                                        onClick={() => handleEdit(param)}
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
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800">{formData.id ? '編輯參數' : '新增參數'}</h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={18} />
                      </button>
                  </header>
                  <div className="p-5 space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">參數名稱</label>
                          <input 
                            type="text" 
                            value={formData.name || ''} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                            placeholder="e.g. 創意寫作" 
                          />
                      </div>
                      
                      {/* Temperature */}
                      <div>
                          <div className="flex justify-between items-center mb-1.5">
                              <div className="flex items-center gap-1.5">
                                  <label className="text-xs font-bold text-slate-500 uppercase">Temperature</label>
                                  <div className="group relative">
                                      <HelpCircle size={12} className="text-slate-400 cursor-help" />
                                      <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10">
                                          控制輸出隨機性
                                      </div>
                                  </div>
                              </div>
                              <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">{formData.temperature || 0.7}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1" 
                            value={formData.temperature || 0.7}
                            onChange={(e) => setFormData({...formData, temperature: parseFloat(e.target.value)})}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                          />
                      </div>
                      
                      {/* Top P */}
                      <div>
                          <div className="flex justify-between items-center mb-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase">Top P</label>
                              <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">{formData.topP || 0.9}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            value={formData.topP || 0.9}
                            onChange={(e) => setFormData({...formData, topP: parseFloat(e.target.value)})}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                          />
                      </div>
                      
                      {/* Top K */}
                      <div>
                          <div className="flex justify-between items-center mb-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase">Top K</label>
                              <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 rounded">{formData.topK || 40}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="5" 
                            value={formData.topK || 40}
                            onChange={(e) => setFormData({...formData, topK: parseInt(e.target.value)})}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
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
