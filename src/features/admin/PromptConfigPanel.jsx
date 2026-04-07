import React, { useState, useEffect } from 'react';
import { 
    Trash2, Save, ArrowLeft, MessageSquare, History
} from 'lucide-react';
import { ModalOverlay } from '../../components/common/ModalOverlay';

export function PromptConfigPanel({ prompt, isCreating, users, onUpdatePrompt, onCreatePrompt, onDeletePrompt, onBack }) {
    // If editing, default to the latest version (index 0)
    const latestVersion = prompt && prompt.versions ? prompt.versions[0] : null;
    
    const [name, setName] = useState(prompt ? prompt.name : '');
    const [content, setContent] = useState(latestVersion ? latestVersion.content : '');
    const [selectedVersionId, setSelectedVersionId] = useState(latestVersion ? latestVersion.id : 'v1');
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    // Handle version switch
    const handleVersionChange = (e) => {
        const vid = e.target.value;
        setSelectedVersionId(vid);
        const ver = prompt.versions.find(v => v.id === vid);
        if (ver) {
            setContent(ver.content);
        }
    };

    const handleOpenSaveModal = () => {
        if (!name.trim()) {
            alert('請輸入提示詞名稱');
            return;
        }
        if (!content.trim()) {
            alert('請輸入提示詞內容');
            return;
        }
        // If creating new prompt initially, we don't necessarily need the modal, but to be consistent we can use it.
        // The user request: "調整「提示詞」編輯的「存檔」與「提示詞優化」的存檔modal相同"
        // Let's use the modal for both.
        setIsSaveModalOpen(true);
    };

    const handleConfirmSave = (mode, saveName, saveNote) => {
        setIsSaveModalOpen(false);
        
        if (isCreating || mode === 'new') {
            // mode === 'new' or completely new prompt
            onCreatePrompt({ name: saveName, content });
            alert(`已另存新提示詞：「${saveName}」`);
            if (isCreating) {
                 // onBack or redirect to list is usually handled by parent. Wait, `onCreatePrompt` in parent unsets `selectedPrompt`.
            }
        } else {
            // mode === 'overwrite' (Save as new version / overwrite)
            const currentVersions = prompt.versions || [];
            const isContentDifferent = currentVersions.length === 0 || currentVersions[0].content !== content;
            
            if (isContentDifferent) {
                // Auto-increment version logic (v1.0 -> v2.0 etc)
                let newVersionNum = currentVersions.length + 1;
                const newVersion = {
                    id: `v${newVersionNum}`,
                    label: `v${newVersionNum}.0`,
                    content: content,
                    createdAt: new Date().toISOString().split('T')[0]
                };
                onUpdatePrompt(prompt.id, { 
                    name: saveName, 
                    versions: [newVersion, ...currentVersions] 
                });
                alert(`已建立新版本/覆蓋提示詞：「${saveName}」`);
                setSelectedVersionId(newVersion.id);
            } else {
                // Content didn't change, just update name if changed
                if (saveName !== prompt.name) {
                    onUpdatePrompt(prompt.id, { name: saveName });
                    alert(`名稱已更新為：「${saveName}」`);
                } else {
                    alert(`已保留設定：「${saveName}」 (內容未變更)`);
                }
            }
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
                            {isCreating ? '新增提示詞' : name}
                        </h1>
                        <p className="text-xs text-slate-500">
                            {isCreating ? '建立一個新的提示詞' : '編輯提示詞內容並儲存'}
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
                        onClick={handleOpenSaveModal} 
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all active:scale-95"
                    >
                        <Save size={18} /> 存檔
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                {/* Basic Settings */}
                <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">提示詞設定</h3>
                        
                        {!isCreating && prompt && prompt.versions && (
                            <div className="flex items-center gap-2">
                                <History size={16} className="text-slate-400" />
                                <label className="text-xs font-bold text-slate-500 uppercase">檢視版本</label>
                                <select 
                                    value={selectedVersionId}
                                    onChange={handleVersionChange}
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
                                >
                                    {prompt.versions.map(ver => (
                                        <option key={ver.id} value={ver.id}>
                                            {ver.label} ({ver.createdAt})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">提示詞名稱</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="e.g. 公文撰寫助理" 
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-slate-700">提示詞內容</label>
                                {!isCreating && selectedVersionId !== prompt.versions[0].id && (
                                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-medium border border-amber-200">
                                        正在檢視舊版本，修改並儲存將產生新版本
                                    </span>
                                )}
                            </div>
                            <textarea 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono leading-relaxed" 
                                placeholder="輸入系統提示詞..." 
                            />
                             <div className="mt-2 text-right text-xs text-slate-400">
                                {(content || '').length} 字元
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Save Modal */}
            {isSaveModalOpen && (
                <SavePromptModal
                    currentName={name}
                    isCreating={isCreating}
                    onClose={() => setIsSaveModalOpen(false)}
                    onConfirm={handleConfirmSave}
                />
            )}
        </div>
    );
}

/** Modal: Save prompt — two modes: save-as-new or create-new-version/overwrite */
function SavePromptModal({ currentName, isCreating, onClose, onConfirm }) {
  // If creating new, default mode could be 'new'. otherwise null to let user choose.
  const [saveMode, setSaveMode] = useState(isCreating ? 'new' : null); 
  const [saveName, setSaveName] = useState(isCreating ? currentName : '');
  const [saveNote, setSaveNote] = useState('');

  const handleSelectMode = (mode) => {
    setSaveMode(mode);
    if (mode === 'new') {
      setSaveName((!isCreating && currentName) ? `${currentName} - 複製` : currentName);
      setSaveNote('');
    } else {
      setSaveName(currentName);
      setSaveNote('');
    }
  };

  const handleConfirmSave = () => {
    if (saveMode === 'new' && !saveName.trim()) {
      alert('請輸入設定名稱');
      return;
    }
    onConfirm(saveMode, saveName, saveNote);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Save className="text-blue-600" /> 存檔
        </h3>

        {/* Mode Selection */}
        {!saveMode && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-4">請選擇存檔方式：</p>
            <button 
              onClick={() => handleSelectMode('new')}
              className="w-full text-left p-4 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
            >
              <div className="font-bold text-slate-700 group-hover:text-blue-700">另存 (新增)</div>
              <div className="text-xs text-slate-400 mt-1">建立全新的提示詞設定</div>
            </button>
            <button 
              onClick={() => handleSelectMode('overwrite')}
              className="w-full text-left p-4 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
            >
              <div className="font-bold text-slate-700 group-hover:text-blue-700">建立新版本 / 覆蓋</div>
              <div className="text-xs text-slate-400 mt-1">在目前提示詞下建立新版本或覆蓋現有版本</div>
            </button>
          </div>
        )}

        {/* Form Fields based on mode */}
        {saveMode && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {saveMode === 'new' ? '另存 (新增)' : '建立新版本 / 覆蓋'}
              </span>
              {!isCreating && (
                <button 
                  onClick={() => setSaveMode(null)} 
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ← 重新選擇
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">設定名稱</label>
              <input 
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                readOnly={saveMode === 'overwrite'}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 ${
                  saveMode === 'overwrite' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder="輸入提示詞名稱..."
              />
              {saveMode === 'overwrite' && (
                <p className="text-xs text-slate-400 mt-1">覆蓋模式下名稱不可修改</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">備註</label>
              <textarea
                value={saveNote}
                onChange={(e) => setSaveNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 resize-none"
                placeholder="輸入備註..."
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          {saveMode && (
            <button 
              onClick={handleConfirmSave} 
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md"
            >
              確認儲存
            </button>
          )}
        </div>
      </div>
    </ModalOverlay>
  );
}
