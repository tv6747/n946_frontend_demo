import React, { useState } from 'react';
import { Search, Plus, Wrench, Edit2, Trash2, X, Settings, Terminal, Activity, Link } from 'lucide-react';
import { MOCK_TOOLS } from '../../data/mockToolData';

export function ToolManagementPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [tools, setTools] = useState(MOCK_TOOLS);

  // Filter tools based on search
  const filteredTools = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (tool) => {
      setFormData(tool);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setFormData({ status: 'active' });
      setIsModalOpen(true);
  };

  const handleDelete = (id) => {
      if(confirm('確定要刪除此工具嗎？')) {
          setTools(prev => prev.filter(t => t.id !== id));
      }
  };

  const handleSave = () => {
      if (formData.id) {
          setTools(prev => prev.map(t => t.id === formData.id ? formData : t));
      } else {
          setTools(prev => [...prev, { ...formData, id: Date.now() }]);
      }
      setIsModalOpen(false);
  };

  const toggleStatus = (id) => {
      setTools(prev => prev.map(t => 
          t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
      ));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         <div className="flex-1 max-w-lg relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
               type="text" 
               placeholder="搜尋工具名稱或描述..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400" 
            />
         </div>
         <div className="flex-shrink-0">
             <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold whitespace-nowrap"
             >
                 <Plus size={16} /> 新增工具
             </button>
         </div>
      </header>

      {/* Card Grid */}
      <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {filteredTools.map(tool => (
              <div key={tool.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all group relative">
                  {/* Status Strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${tool.status === 'active' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                              <Wrench size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-slate-800 truncate">{tool.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${tool.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {tool.status === 'active' ? '啟用中' : '已停用'}
                              </span>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                          {/* Toggle Switch */}
                          <label className="relative inline-flex items-center cursor-pointer mr-2" onClick={(e) => e.stopPropagation()}>
                              <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={tool.status === 'active'}
                                  onChange={() => toggleStatus(tool.id)}
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                          </label>

                          <button 
                            onClick={() => handleEdit(tool)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                            title="編輯"
                          >
                              <Edit2 size={16} />
                          </button>
                          <button 
                             onClick={() => handleDelete(tool.id)}
                             className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                             title="刪除"
                          >
                              <Trash2 size={16} />
                          </button>
                      </div>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-3 pl-2">
                       <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">功能描述</label>
                          <p className="text-xs text-slate-600 line-clamp-2 min-h-[32px]">
                              {tool.description || '無描述'}
                          </p>
                      </div>

                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">SSE Endpoint</label>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded truncate border border-slate-100">
                              <Activity size={12} className="text-slate-400 flex-shrink-0" />
                              <span className="truncate">{tool.sseEndpoint || '(未設定)'}</span>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                          <div>
                               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Port</label>
                               <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                                   <Settings size={12} className="text-slate-400" />
                                   {tool.port || '-'}
                               </div>
                          </div>

                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                  <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Wrench size={18} className="text-blue-600" />
                          {formData.id ? '編輯工具' : '新增工具'}
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
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">工具名稱</label>
                          <input 
                            type="text" 
                            value={formData.name || ''} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                            placeholder="e.g. WebSearch - Google" 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">功能描述</label>
                          <textarea 
                            value={formData.description || ''} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none" 
                            placeholder="描述此工具的主要功能..." 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">SSE Endpoint URL</label>
                          <div className="relative">
                              <Link size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input 
                                type="text" 
                                value={formData.sseEndpoint || ''} 
                                onChange={(e) => setFormData({...formData, sseEndpoint: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                                placeholder="http://172.x.x.x/sse/endpoint" 
                              />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">Port</label>
                              <input 
                                type="number" 
                                value={formData.port || ''} 
                                onChange={(e) => setFormData({...formData, port: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono" 
                                placeholder="3000" 
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1.5">狀態</label>
                              <select
                                value={formData.status || 'active'} 
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                              >
                                  <option value="active">啟用中</option>
                                  <option value="inactive">已停用</option>
                              </select>
                          </div>
                      </div>
                  </div>
                  <footer className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                      >
                          取消
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-bold shadow-sm transition-colors"
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
