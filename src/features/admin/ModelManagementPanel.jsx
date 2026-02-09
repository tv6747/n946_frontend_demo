import React, { useState } from 'react';
import { Search, Plus, Cpu, Edit2, Trash2, X, HelpCircle } from 'lucide-react';
import { MOCK_LLM_MODELS } from '../../data/mockLLMData';

export function ModelManagementPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [modelStatuses, setModelStatuses] = useState(() => {
    const statuses = {};
    MOCK_LLM_MODELS.forEach(model => statuses[model.id] = model.status);
    return statuses;
  });

  const handleEdit = (model) => {
      setFormData(model);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setFormData({ status: 'active', type: 'generative' });
      setIsModalOpen(true);
  };

  const toggleStatus = (modelId) => {
      setModelStatuses(prev => ({
          ...prev,
          [modelId]: prev[modelId] === 'active' ? 'inactive' : 'active'
      }));
  };

  const filteredModels = MOCK_LLM_MODELS.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           model.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || model.type === typeFilter;
      return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
            <div className="relative">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="搜尋模型名稱或 URL..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
               />
            </div>
            <div className="relative">
               <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
               >
                  <option value="all">全部類型</option>
                  <option value="generative">生成式模型</option>
                  <option value="embedding">詞向量模型</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                  </svg>
               </div>
            </div>
         </div>
         <div className="flex-shrink-0">
             <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
             >
                 <Plus size={16} /> 新增模型
             </button>
         </div>
      </header>

      {/* Card Grid */}
      <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map(model => {
              const currentStatus = modelStatuses[model.id];
              return (
                  <div key={model.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all group relative">
                      {/* Status Strip */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${currentStatus === 'active' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 pl-2">
                          <div className="flex items-center gap-3 flex-1">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentStatus === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                  <Cpu size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-slate-800 truncate">{model.name}</h3>
                                  <span className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${model.type === 'generative' ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-700'}`}>
                                      {model.type === 'generative' ? '生成式' : '詞向量'}
                                  </span>
                              </div>
                          </div>
                          
                          {/* Toggle Switch */}
                          <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                              <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={currentStatus === 'active'}
                                  onChange={() => toggleStatus(model.id)}
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                      </div>
                      
                      {/* Details */}
                      <div className="space-y-3 mb-4 pl-2">
                          <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Endpoint URL</label>
                              <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded truncate border border-slate-100">
                                  {model.url}
                              </div>
                          </div>
                          <div>
                               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">API Key</label>
                               <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 truncate">
                                   {model.apiKey || '(未設定)'}
                               </div>
                          </div>
                          </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 pl-2">
                          <button 
                            onClick={() => handleEdit(model)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                              <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={16} />
                          </button>
                      </div>
                  </div>
              );
          })}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Cpu size={18} className="text-blue-600" />
                          {formData.id ? '編輯模型' : '新增模型'}
                      </h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={18} />
                      </button>
                  </header>
                  <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">模型名稱</label>
                              <input 
                                type="text" 
                                value={formData.name || ''} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="e.g. GPT-4o" 
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">模型類型</label>
                              <select
                                value={formData.type || 'generative'} 
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                              >
                                  <option value="generative">生成式模型</option>
                                  <option value="embedding">詞向量模型</option>
                              </select>
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">API Endpoint URL</label>
                          <input 
                            type="text" 
                            value={formData.url || ''} 
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                            placeholder="https://api.example.com/v1" 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">API Key (選填)</label>
                          <input 
                            type="password" 
                            value={formData.apiKey || ''} 
                            onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                            placeholder="sk-..." 
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
                          儲存設定
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}
