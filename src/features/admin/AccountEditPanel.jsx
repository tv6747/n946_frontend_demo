import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { MOCK_TERM_CATEGORIES } from '../../data/mockData';

export function AccountEditPanel({ account, onSave, onCancel }) {
  const isNew = !account || account === 'NEW';
  
  const [formData, setFormData] = useState({
    username: '',
    status: 'active',
    orgUnit: '',
    name: '',
    email: '',
    note: '',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (account && account !== 'NEW') {
      setFormData({
        ...account,
        // Ensure status is valid string or convert boolean if needed in future
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.username || !formData.name || !formData.email || !formData.orgUnit) {
      alert('請填寫必填欄位');
      return;
    }
    onSave({
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onCancel}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isNew ? '新增帳號' : '編輯帳號'}
            </h2>
            <p className="text-xs text-slate-500">
              {isNew ? '建立新的使用者帳號' : `編輯 ${formData.username} 的帳號資訊`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={onCancel}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
            >
                取消
            </button>
            <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors"
            >
                <Save size={18} />
                儲存
            </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            
            {/* Section 1: Account & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            使用者帳號 <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isNew}
                            placeholder="請輸入帳號 (例如: alex.lin)"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                        />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            帳號狀態
                        </label>
                        <div className="flex items-center gap-3 py-2">
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="status"
                                    checked={formData.status === 'active'}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-slate-700">
                                    {formData.status === 'active' ? '啟用中' : '已停用'}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Organization */}
            <div className="space-y-4">
                <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1">
                        組織單位 <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="orgUnit"
                        value={formData.orgUnit}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">請選擇組織單位...</option>
                        {MOCK_TERM_CATEGORIES.map(org => (
                            <option key={org.id} value={org.id}>{org.name}</option>
                        ))}
                    </select>
                </div>
            </div>

             {/* Section 3: Personal Info */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1">
                        姓名 <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="請輸入中文姓名"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1">
                        電子信箱 <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@nlma.gov.tw"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Section 4: Note */}
            <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">
                    備註
                </label>
                <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="4"
                    placeholder="輸入備註事項..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

             {/* Section 5: Metadata (Readonly) */}
             {!isNew && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                    <div>
                         <label className="block text-xs font-medium text-slate-500 mb-1">
                            註冊時間
                        </label>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                             {formData.createdAt}
                        </div>
                    </div>
                    <div>
                         <label className="block text-xs font-medium text-slate-500 mb-1">
                            上次更新時間
                        </label>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                             {formData.updatedAt}
                        </div>
                    </div>
                </div>
             )}

        </form>
      </div>
    </div>
  );
}
