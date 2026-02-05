import React, { useState } from 'react';
import { Search, Plus, Cpu, Power, Trash2, Edit2, Eye, EyeOff, X, Save } from 'lucide-react';
import { MOCK_ADMIN_MODELS } from '../../data/mockData';

export function ModelManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEdit = (model) => {
      setFormData(model);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setFormData({ status: 'active' }); // Default new model to active
      setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300 relative">
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">模型管理</h1>
            <p className="text-xs text-slate-500 mt-1">設定 LLM 連線資訊與 API Key</p>
         </div>
         <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold"
         >
             <Plus size={16} /> 新增模型
         </button>
      </header>

      <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_ADMIN_MODELS.map(model => (
              <div key={model.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${model.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                              <Cpu size={20} />
                          </div>
                          <div>
                              <h3 className="font-bold text-slate-800">{model.name}</h3>
                              <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{model.provider}</span>
                          </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${model.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Endpoint URL</label>
                          <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded truncate border border-slate-100">
                              {model.url}
                          </div>
                      </div>
                      <div>
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">API Key</label>
                           <div className="flex items-center gap-2">
                                <div className="text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 flex-1 truncate">
                                    {model.key}
                                </div>
                           </div>
                      </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
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
          ))}
      </div>

      {/* Model Edit Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
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
                  <div className="p-5 space-y-4">
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
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">供應商 (Provider)</label>
                          <input 
                            type="text" 
                            value={formData.provider || ''} 
                            onChange={(e) => setFormData({...formData, provider: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                            placeholder="e.g. OpenAI" 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">API Endpoint URL</label>
                          <input 
                            type="text" 
                            value={formData.url || ''} 
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                            placeholder="https://api.openai.com/v1" 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">API Key</label>
                          <div className="relative">
                              <input 
                                type="password" 
                                value={formData.key || ''} 
                                onChange={(e) => setFormData({...formData, key: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                                placeholder="sk-..." 
                              />
                              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                  <Eye size={14} />
                              </button>
                          </div>
                      </div>
                      
                      {/* Styled Toggle Switch */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">運作狀態</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={formData.status === 'active'}
                                onChange={(e) => setFormData({...formData, status: e.target.checked ? 'active' : 'inactive'})}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            <span className="ml-2 text-sm font-medium text-slate-700">
                                {formData.status === 'active' ? '啟用中' : '已停用'}
                            </span>
                        </label>
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
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                      >
                          <Save size={16} /> 儲存設定
                      </button>
                  </footer>
              </div>
          </div>
      )}
    </div>
  );
}
