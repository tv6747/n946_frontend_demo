import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { MOCK_LLM_APIS, MOCK_LLM_MODELS, MOCK_LLM_PARAMS, MOCK_LLM_PROMPTS } from '../../data/mockLLMData';

export function APIManagementPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEdit = (api) => {
      setFormData(api);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setFormData({});
      setIsModalOpen(true);
  };

  const filteredAPIs = MOCK_LLM_APIS.filter(api => 
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper functions to get names from IDs
  const getModelName = (id) => MOCK_LLM_MODELS.find(m => m.id === id)?.name || '(未設定)';
  const getParamName = (id) => MOCK_LLM_PARAMS.find(p => p.id === id)?.name || '(未設定)';
  const getPromptName = (id) => MOCK_LLM_PROMPTS.find(p => p.id === id)?.name || '(未設定)';

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
               type="text" 
               placeholder="搜尋 API 名稱、路徑..." 
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
                 <Plus size={16} /> 新增 API
             </button>
         </div>
      </header>

      {/* Table */}
      <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase whitespace-nowrap">API 名稱</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase whitespace-nowrap">路徑</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase whitespace-nowrap">參數</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase whitespace-nowrap">模型</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase whitespace-nowrap">預設參數</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase whitespace-nowrap">提示詞</th>
                              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase">操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filteredAPIs.map(api => (
                              <tr key={api.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{api.name}</td>
                                  <td className="px-4 py-3 text-sm font-mono text-slate-600 max-w-xs truncate">{api.path}</td>
                                  <td className="px-4 py-3 text-xs font-mono text-slate-500 max-w-xs truncate">{api.params}</td>
                                  <td className="px-4 py-3 text-sm">
                                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">{getModelName(api.modelId)}</span>
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{getParamName(api.paramId)}</span>
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                      <span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-medium">{getPromptName(api.promptId)}</span>
                                  </td>
                                  <td className="px-4 py-3">
                                      <div className="flex items-center justify-center gap-2">
                                          <button 
                                            onClick={() => handleEdit(api)}
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
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800">{formData.id ? '編輯 API' : '新增 API'}</h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                      >
                          <X size={18} />
                      </button>
                  </header>
                  <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">API 名稱</label>
                              <input 
                                type="text" 
                                value={formData.name || ''} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="e.g. 公文生成 API" 
                              />
                          </div>
                          <div className="col-span-2">
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">網址路徑</label>
                              <input 
                                type="text" 
                                value={formData.path || ''} 
                                onChange={(e) => setFormData({...formData, path: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                                placeholder="/api/v1/..." 
                              />
                          </div>
                          <div className="col-span-2">
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">網址參數</label>
                              <input 
                                type="text" 
                                value={formData.params || ''} 
                                onChange={(e) => setFormData({...formData, params: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                                placeholder="key1=value1&key2=value2" 
                              />
                          </div>
                          <div className="col-span-2">
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">API Key (選填)</label>
                              <input 
                                type="password" 
                                value={formData.apiKey || ''} 
                                onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                                placeholder="api-key-..." 
                              />
                          </div>
                      </div>

                      {/* Cross-module linking */}
                      <div className="border-t border-slate-200 pt-4 mt-4">
                          <h4 className="text-sm font-bold text-slate-700 mb-3">關聯設定</h4>
                          <div className="space-y-3">
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">模型 <span className="text-red-500">*</span></label>
                                  <select
                                    value={formData.modelId || ''} 
                                    onChange={(e) => setFormData({...formData, modelId: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                  >
                                      <option value="">請選擇模型</option>
                                      {MOCK_LLM_MODELS.map(model => (
                                          <option key={model.id} value={model.id}>{model.name} ({model.type === 'generative' ? '生成式' : '詞向量'})</option>
                                      ))}
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">參數 <span className="text-red-500">*</span></label>
                                  <select
                                    value={formData.paramId || ''} 
                                    onChange={(e) => setFormData({...formData, paramId: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                  >
                                      <option value="">請選擇參數組合</option>
                                      {MOCK_LLM_PARAMS.map(param => (
                                          <option key={param.id} value={param.id}>{param.name}</option>
                                      ))}
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-700 mb-1.5">提示詞 (選填)</label>
                                  <select
                                    value={formData.promptId || ''} 
                                    onChange={(e) => setFormData({...formData, promptId: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                  >
                                      <option value="">不使用提示詞</option>
                                      {MOCK_LLM_PROMPTS.map(prompt => (
                                          <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                                      ))}
                                  </select>
                              </div>
                          </div>
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
