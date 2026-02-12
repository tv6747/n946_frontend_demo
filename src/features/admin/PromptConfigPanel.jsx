import React, { useState, useEffect } from 'react';
import { 
    LayoutGrid, Trash2, Save, ArrowLeft, ChevronsRight, Check, X, MessageSquare
} from 'lucide-react';

export function PromptConfigPanel({ prompt, isCreating, users, onUpdatePrompt, onCreatePrompt, onDeletePrompt, onBack }) {
    // Default empty state for creating new prompt
    const defaultState = {
        name: '',
        content: '',
        permissions: {
            allowedUsers: [],
            isPublic: false
        }
    };

    const [formData, setFormData] = useState(prompt || defaultState);
    
    // Sync with prop changes if editing
    useEffect(() => {
        if (prompt) {
            setFormData(prompt);
        }
    }, [prompt]);

    const handleChange = (updates) => {
        const newData = { ...formData, ...updates };
        setFormData(newData);
        // For existing prompts, live update the parent state
        if (!isCreating && onUpdatePrompt) {
            onUpdatePrompt(prompt.id, updates);
        }
    };

    const [userSearch, setUserSearch] = useState('');
    const [selectedAvailableUserIds, setSelectedAvailableUserIds] = useState([]);

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()));

    // Transfer List Handlers for Users
    const toggleAvailableUserSelection = (id) => {
        if (selectedAvailableUserIds.includes(id)) {
            setSelectedAvailableUserIds(prev => prev.filter(uid => uid !== id));
        } else {
            setSelectedAvailableUserIds(prev => [...prev, id]);
        }
    };

    const handleAddUsersToPrompt = () => {
        if (selectedAvailableUserIds.length === 0) return;
        const currentUsers = formData.permissions?.allowedUsers || [];
        const newUsersToAdd = selectedAvailableUserIds.filter(id => !currentUsers.includes(id));
        if (newUsersToAdd.length > 0) {
            handleChange({ permissions: { ...formData.permissions, allowedUsers: [...currentUsers, ...newUsersToAdd] } });
            setSelectedAvailableUserIds([]);
        }
    };

    const handleAddAllUsers = () => {
        const currentUsers = formData.permissions?.allowedUsers || [];
        const allFilteredIds = filteredUsers.map(u => u.id);
        const newUsersToAdd = allFilteredIds.filter(id => !currentUsers.includes(id));
        if (newUsersToAdd.length > 0) {
            handleChange({ permissions: { ...formData.permissions, allowedUsers: [...currentUsers, ...newUsersToAdd] } });
        }
    };

    const handleRemoveUser = (userId) => {
        const currentUsers = formData.permissions?.allowedUsers || [];
        handleChange({ permissions: { ...formData.permissions, allowedUsers: currentUsers.filter(id => id !== userId) } });
    };

    const handleSave = () => {
        if (!formData.name) {
            alert('請輸入提示詞名稱');
            return;
        }
        if (!formData.content) {
            alert('請輸入提示詞內容');
            return;
        }

        if (isCreating) {
            onCreatePrompt(formData);
            alert('提示詞已建立！');
        } else {
            alert('設定已保存！'); // Logic is redundant if auto-saving via onUpdatePrompt, but good for feedback
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            {/* Top Navigation */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onBack}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors mr-2"
                        title="返回列表"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 leading-tight">
                            {isCreating ? '新增提示詞' : formData.name}
                        </h1>
                        <p className="text-xs text-slate-500">
                            {isCreating ? '建立一個新的提示詞' : '編輯提示詞內容與權限'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {!isCreating && (
                        <button 
                            onClick={() => { if(confirm('確定要刪除此提示詞嗎？')) onDeletePrompt(prompt.id) }} 
                            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-500 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                        >
                            <Trash2 size={16} /> 刪除
                        </button>
                    )}
                    <button 
                        onClick={handleSave} 
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all active:scale-95"
                    >
                        <Save size={18} /> {isCreating ? '建立' : '保存變更'}
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                {/* Basic Settings */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">基本設定</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">提示詞名稱</label>
                            <input 
                                value={formData.name || ''} 
                                onChange={(e) => handleChange({ name: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="e.g. 公文撰寫助理" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">提示詞內容</label>
                            <textarea 
                                value={formData.content || ''} 
                                onChange={(e) => handleChange({ content: e.target.value })}
                                rows={10}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono leading-relaxed" 
                                placeholder="輸入系統提示詞..." 
                            />
                             <div className="mt-2 text-right text-xs text-slate-400">
                                {(formData.content || '').length} 字元
                            </div>
                        </div>
                    </div>
                </section>

                {/* Permissions */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
                    <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">使用者權限設定</h3>
                    </div>
                    
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left: Available Users */}
                        <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                            <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <span className="text-sm font-semibold text-slate-700">選擇人員</span>
                                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{filteredUsers.length}</span>
                            </div>
                            <div className="p-3">
                                <input 
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                    placeholder="搜尋..." 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" 
                                />
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                <div className="space-y-1">
                                    {filteredUsers.length === 0 ? (
                                        <div className="text-center py-10 text-slate-400 text-sm">無可用項目</div>
                                    ) : filteredUsers.map(user => {
                                        const isSelected = selectedAvailableUserIds.includes(user.id);
                                        const isAdded = (formData.permissions?.allowedUsers || []).includes(user.id);
                                        return (
                                            <div 
                                                key={user.id}
                                                onClick={() => !isAdded && toggleAvailableUserSelection(user.id)} 
                                                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                                ${isAdded ? 'opacity-50 grayscale bg-slate-50' : isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                                `}
                                            >
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                    {isSelected && <Check size={10} />}
                                                </div>
                                                <div className="flex-1 min-w-0 flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div className="text-sm font-medium text-slate-700 truncate">{user.name}</div>
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
                                onClick={handleAddUsersToPrompt}
                                disabled={selectedAvailableUserIds.length === 0}
                                className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                title="新增選取的項目"
                            >
                                <ChevronsRight size={18} />
                            </button>
                            <button 
                                onClick={handleAddAllUsers}
                                className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-bold"
                                title="新增全部"
                            >
                                全部
                            </button>
                        </div>

                        {/* Right: Assigned Users */}
                        <div className="flex-1 flex flex-col min-w-0">
                            <div className="p-3 border-b border-slate-100 bg-blue-50/30 flex justify-between items-center">
                                <span className="text-sm font-semibold text-slate-700">已授權</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{(formData.permissions?.allowedUsers || []).length}</span>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                <div className="space-y-1">
                                    {(!formData.permissions?.allowedUsers || formData.permissions.allowedUsers.length === 0) ? (
                                        <div className="text-center py-10 text-slate-400 text-sm">無已授權使用者</div>
                                    ) : formData.permissions.allowedUsers.map(userId => {
                                        const user = users.find(u => u.id === userId);
                                        if (!user) return null;
                                        return (
                                            <div key={userId} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg group hover:bg-blue-100 transition-colors">
                                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-700 truncate">{user.name}</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveUser(userId)}
                                                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
