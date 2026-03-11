import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, ChevronsRight, Check, X, HelpCircle } from 'lucide-react';
import { MOCK_TERM_CATEGORIES, MOCK_USERS } from '../../data/mockData';

export function AccountEditPanel({ account, onSave, onCancel }) {
  const isNew = !account || account === 'NEW';
  
  const [formData, setFormData] = useState({
    username: '',
    status: 'active',
    orgUnit: '',
    name: '',
    email: '',
    note: '',
    permissionUnits: [], // [{deptId, isAdmin}]
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  });

  const [selectedAvailableDeptIds, setSelectedAvailableDeptIds] = useState([]);

  useEffect(() => {
    if (account && account !== 'NEW') {
      setFormData({
        ...account,
        permissionUnits: account.permissionUnits || [],
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
    if (!formData.username || !formData.name || !formData.email || !formData.orgUnit) {
      alert('請填寫必填欄位');
      return;
    }
    onSave({
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0]
    });
  };

  // --- Permission Unit Transfer List Logic ---
  const depts = MOCK_USERS.filter(u => u.type === 'dept');
  const assignedDeptIds = formData.permissionUnits.map(pu => pu.deptId);

  const toggleAvailableDeptSelection = (id) => {
    if (selectedAvailableDeptIds.includes(id)) {
      setSelectedAvailableDeptIds(prev => prev.filter(did => did !== id));
    } else {
      setSelectedAvailableDeptIds(prev => [...prev, id]);
    }
  };

  const handleAddDeptsToAccount = () => {
    if (selectedAvailableDeptIds.length === 0) return;
    const newUnits = selectedAvailableDeptIds
      .filter(id => !assignedDeptIds.includes(id))
      .map(id => ({ deptId: id, isAdmin: false }));
    if (newUnits.length > 0) {
      setFormData(prev => ({
        ...prev,
        permissionUnits: [...prev.permissionUnits, ...newUnits]
      }));
      setSelectedAvailableDeptIds([]);
    }
  };

  const handleAddAllDepts = () => {
    const newUnits = depts
      .filter(d => !assignedDeptIds.includes(d.id))
      .map(d => ({ deptId: d.id, isAdmin: false }));
    if (newUnits.length > 0) {
      setFormData(prev => ({
        ...prev,
        permissionUnits: [...prev.permissionUnits, ...newUnits]
      }));
    }
  };

  const handleRemoveDept = (deptId) => {
    setFormData(prev => ({
      ...prev,
      permissionUnits: prev.permissionUnits.filter(pu => pu.deptId !== deptId)
    }));
  };

  const handleToggleAdmin = (deptId) => {
    setFormData(prev => ({
      ...prev,
      permissionUnits: prev.permissionUnits.map(pu =>
        pu.deptId === deptId ? { ...pu, isAdmin: !pu.isAdmin } : pu
      )
    }));
  };

  const getDeptName = (id) => {
    const dept = MOCK_USERS.find(u => u.id === id);
    return dept ? dept.name : '(未知)';
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

            {/* Section 2: Organization (Disabled) */}
            <div className="space-y-4">
                <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1">
                        組織單位 <span className="text-red-500">*</span>
                    </label>
                    <select 
                        name="orgUnit"
                        value={formData.orgUnit}
                        onChange={handleChange}
                        disabled={!isNew}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                    >
                        <option value="">請選擇組織單位...</option>
                        {MOCK_TERM_CATEGORIES.map(org => (
                            <option key={org.id} value={org.id}>{org.name}</option>
                        ))}
                    </select>
                </div>
            </div>

             {/* Section 3: Personal Info (Disabled for edit) */}
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
                        disabled={!isNew}
                        placeholder="請輸入中文姓名"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
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
                        disabled={!isNew}
                        placeholder="example@nlma.gov.tw"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                </div>
            </div>

            {/* Section 4: Permission Units - Transfer List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[380px]">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">權限單位</h3>
                </div>
                
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Available Departments */}
                    <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                        <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <span className="text-sm font-semibold text-slate-700">選擇部門</span>
                            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{depts.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                            <div className="space-y-1">
                                {depts.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 text-sm">無可用部門</div>
                                ) : depts.map(dept => {
                                    const isSelected = selectedAvailableDeptIds.includes(dept.id);
                                    const isAdded = assignedDeptIds.includes(dept.id);
                                    return (
                                        <div 
                                          key={dept.id}
                                          onClick={() => !isAdded && toggleAvailableDeptSelection(dept.id)} 
                                          className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                             ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                          `}
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                {isSelected && <Check size={10} />}
                                            </div>
                                             <div className="flex-1 min-w-0 flex items-center gap-2">
                                                 <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">
                                                      {dept.name.charAt(0)}
                                                 </div>
                                                 <div className="text-sm font-medium text-slate-700 truncate">{dept.name}</div>
                                                 {isAdded && <span className="text-xs text-slate-400">• 已加入</span>}
                                             </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Center: Actions */}
                    <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                        <button 
                          type="button"
                          onClick={handleAddDeptsToAccount}
                          disabled={selectedAvailableDeptIds.length === 0}
                          className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          title="新增選取的項目"
                        >
                            <ChevronsRight size={18} />
                        </button>
                        <button 
                          type="button"
                          onClick={handleAddAllDepts}
                          className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold"
                          title="新增全部"
                        >
                            全部
                        </button>
                    </div>

                    {/* Right: Assigned Departments */}
                    <div className="flex-1 flex flex-col min-w-0">
                        <div className="p-3 border-b border-slate-100 bg-emerald-50/30 flex justify-between items-center">
                            <span className="text-sm font-semibold text-slate-700">已授權單位</span>
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">{formData.permissionUnits.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                             <div className="space-y-1">
                                {formData.permissionUnits.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 text-sm">尚未授權任何單位</div>
                                ) : formData.permissionUnits.map(pu => (
                                    <div key={pu.deptId} className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-100 rounded-lg group hover:bg-emerald-100 transition-colors">
                                         <div className="flex items-center gap-2 min-w-0 flex-1">
                                             <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-[10px] font-bold text-emerald-700">
                                                  {getDeptName(pu.deptId).charAt(0)}
                                             </div>
                                             <span className="text-sm font-medium text-slate-700 truncate">{getDeptName(pu.deptId)}</span>
                                         </div>
                                         <div className="flex items-center gap-1.5">
                                             <select
                                               value="admin"
                                               className="text-xs px-2 py-1 rounded-md border transition-colors cursor-pointer bg-amber-50 border-amber-200 text-amber-700 font-semibold"
                                               readOnly
                                             >
                                               <option value="admin">管理員</option>
                                             </select>
                                             <button 
                                               type="button"
                                               onClick={() => handleRemoveDept(pu.deptId)}
                                               className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                             >
                                                 <X size={14} />
                                             </button>
                                         </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Section 5: Note */}
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
             {/* Section 6: Metadata (Readonly) */}
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
