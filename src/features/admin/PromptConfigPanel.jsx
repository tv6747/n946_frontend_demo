import React, { useState, useEffect } from 'react';
import { 
    Trash2, Save, ArrowLeft, MessageSquare
} from 'lucide-react';

export function PromptConfigPanel({ prompt, isCreating, users, onUpdatePrompt, onCreatePrompt, onDeletePrompt, onBack }) {
    // Default empty state for creating new prompt
    const defaultState = {
        name: '',
        content: ''
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
                            {isCreating ? '建立一個新的提示詞' : '編輯提示詞內容'}
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


            </div>
        </div>
    );
}
