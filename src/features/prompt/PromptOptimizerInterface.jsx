import React, { useState, useRef, useMemo } from 'react';
import { Send, Settings, ChevronDown, ChevronRight, Save, Upload, Database, X, FileText, History, PanelRight } from 'lucide-react';
import { MOCK_VERSIONS, MOCK_ADMIN_APPS } from '../../data/mockData';
import { MOCK_LLM_PROMPTS } from '../../data/mockLLMData';
import { KBFileSelectorModal } from '../../components/common/KBFileSelectorModal';
import { ModalOverlay } from '../../components/common/ModalOverlay';
import { CanvasPreview } from '../ppt/CanvasPreview';

export function PromptOptimizerInterface({ onSaveSystemPrompt, onOpenLLMSettings, selectedAppId, onAppChange }) {
  const selectedApp = useMemo(() => {
    if (!selectedAppId) return null;
    return MOCK_ADMIN_APPS.find(a => a.id === selectedAppId) || null;
  }, [selectedAppId]);
  const canvasEnabled = selectedApp?.supportCanvas === true;
  const [isCanvasMode, setIsCanvasMode] = useState(false);
  const [globalInput, setGlobalInput] = useState('');
  const [selectedKBFiles, setSelectedKBFiles] = useState([]);
  const [isKBModalOpen, setIsKBModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Reset canvas mode when app changes and doesn't support canvas
  useMemo(() => {
    if (!canvasEnabled) setIsCanvasMode(false);
  }, [canvasEnabled]);

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Selected files:', files);
    }
    e.target.value = '';
  };

  const handleInsertKBFiles = (files) => {
    setSelectedKBFiles(prev => {
      const newFiles = files.filter(f => !prev.find(p => p.id === f.id));
      return [...prev, ...newFiles];
    });
    setIsKBModalOpen(false);
  };

  const removeKBFile = (fileId) => {
    setSelectedKBFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSend = () => {
    if (!globalInput.trim() && selectedKBFiles.length === 0) return;
    setGlobalInput('');
    setSelectedKBFiles([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Top bar: app selector dropdown + Canvas toggle */}
      <div className="px-4 pt-3 pb-1 flex items-center gap-3">
        <span className="text-xs text-slate-400 flex-shrink-0">目前應用：</span>
        <select
          value={selectedAppId || ''}
          onChange={(e) => onAppChange && onAppChange(e.target.value)}
          className="text-xs font-semibold text-slate-700 bg-white pl-2.5 pr-7 py-1.5 rounded-md border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"
        >
          <option value="">-- 請選擇應用 --</option>
          {MOCK_ADMIN_APPS.map(app => (
            <option key={app.id} value={app.id}>
              {app.name} ({app.system}){app.supportCanvas ? ' ✦ Canvas' : ''}
            </option>
          ))}
        </select>
        <button
          onClick={() => canvasEnabled && setIsCanvasMode(!isCanvasMode)}
          disabled={!canvasEnabled}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
            !canvasEnabled
              ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
              : isCanvasMode 
                ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm cursor-pointer' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 cursor-pointer'
          }`}
          title={!canvasEnabled ? '目前應用不支援 Canvas' : isCanvasMode ? '切換回訊息預覽' : '切換到 Canvas 預覽'}
        >
          <PanelRight size={14} />
          Canvas 預覽
        </button>
      </div>

      <div className="flex-1 p-4 pt-2 grid grid-cols-2 gap-4 overflow-hidden">
        <PromptBlock 
          title="提示詞設定 A" 
          defaultModel="GPT-4 Turbo" 
          defaultSystem="你是一個專業的公文撰寫助理，請使用正式且精確的語氣..."
          color="blue"
          onSave={onSaveSystemPrompt}
          isCanvasMode={isCanvasMode}
        />
        <PromptBlock 
          title="提示詞設定 B" 
          defaultModel="Claude 3.5 Sonnet" 
          defaultSystem="你是一個親切的客服人員，請用口語化、有同理心的方式回應..."
          color="indigo"
          onSave={onSaveSystemPrompt}
          isCanvasMode={isCanvasMode}
        />
      </div>

      {/* Unified Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {/* KB File Chips */}
        {selectedKBFiles.length > 0 && (
          <div className="max-w-5xl mx-auto mb-2 flex flex-wrap gap-2">
            {selectedKBFiles.map(file => (
              <div key={file.id} className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1.5 rounded-lg text-xs animate-in fade-in zoom-in-95 duration-200">
                <FileText size={14} className="text-indigo-500" />
                <span className="font-medium truncate max-w-[150px]">{file.name}</span>
                <button 
                  onClick={() => removeKBFile(file.id)}
                  className="ml-1 p-0.5 hover:bg-indigo-200/50 rounded-full transition-colors text-indigo-400 hover:text-indigo-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
            {/* Upload button */}
            <button 
              onClick={handleUploadClick}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-full transition-colors"
              title="上傳檔案"
            >
              <Upload size={20}/>
            </button>
            {/* KB button */}
            <button 
              onClick={() => setIsKBModalOpen(true)}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-full transition-colors"
              title="加入知識庫檔案"
            >
              <Database size={20}/>
            </button>

            <input 
              value={globalInput}
              onChange={(e) => setGlobalInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入測試案例訊息，將同時發送給 A 與 B 進行測試..."
              className="flex-1 outline-none text-sm"
            />

            {/* LLM Settings button */}
            <button 
              onClick={onOpenLLMSettings}
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors"
              title="LLM 對話參數設定"
            >
              <Settings size={20} />
            </button>

            <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send size={18}/>
            </button>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
              multiple 
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-slate-400">此回答為大型語言模型產出，僅供參考，請務必核對重要資訊的準確性。</span>
          </div>
        </div>
      </div>

      <KBFileSelectorModal 
        isOpen={isKBModalOpen}
        onClose={() => setIsKBModalOpen(false)}
        onInsertSelected={handleInsertKBFiles}
      />
    </div>
  );
}

function PromptBlock({ title, defaultModel, defaultSystem, color, onSave, isCanvasMode }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [systemPrompt, setSystemPrompt] = useState(defaultSystem);
  const [isSystemPromptOpen, setIsSystemPromptOpen] = useState(true);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const borderColor = color === 'blue' ? 'border-blue-200' : 'border-indigo-200';
  const headerBg = color === 'blue' ? 'bg-blue-50' : 'bg-indigo-50';
  const labelColor = color === 'blue' ? 'text-blue-700' : 'text-indigo-700';

  return (
    <div className={`flex flex-col bg-white rounded-xl border ${borderColor} shadow-sm overflow-hidden h-full`}>
      <div className={`px-4 py-3 border-b ${borderColor} ${headerBg} flex items-center justify-between`}>
        <input 
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className={`bg-transparent font-bold ${labelColor} focus:outline-none focus:underline border-b border-transparent focus:border-${color}-400 w-1/2`}
        />
      </div>

      <div className="border-b border-slate-100 bg-slate-50/50 flex flex-col">
        <div 
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => setIsSystemPromptOpen(!isSystemPromptOpen)}
        >
           <div className="flex items-center gap-2">
               {isSystemPromptOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
               <label className="text-xs font-medium text-slate-500 uppercase cursor-pointer">System Prompt</label>
           </div>
           <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
               <button 
                 onClick={() => setIsLoadModalOpen(true)}
                 className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 transition-colors"
               >
                 <History size={12} /> 載入提示詞
               </button>
           </div>
        </div>
        
        {isSystemPromptOpen && (
            <div className="p-4 pt-0 relative animate-in slide-in-from-top-2 duration-200">
                <textarea 
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-slate-900 bg-white rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 custom-scrollbar resize-none mb-2"
                ></textarea>
                <div className="flex justify-end">
                  <button onClick={() => setIsSaveModalOpen(true)} className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 rounded-md transition-colors" title="存檔">
                    <Save size={14} />
                  </button>
                </div>
            </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-white">
        <div className="px-4 py-2 border-b border-slate-50 text-xs font-semibold text-slate-400">
          {isCanvasMode ? 'Canvas 預覽' : '預覽結果'}
        </div>
        {isCanvasMode ? (
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-100/50 flex justify-center">
            <div className="w-full my-2 mx-auto shadow-lg">
              <CanvasPreview 
                type="doc"
                content={color === 'blue' ? '這是 A 設定的 Canvas 預覽回應模擬。\n\n一、本局已派員前往稽查，並依噪音管制法第X條規定量測噪音分貝數。\n二、經查該處施工單位已申請夜間施工許可。' : '這是 B 設定的 Canvas 預覽回應模擬。\n\n一、針對於用戶提出的問題，建議按照內部流程執行。\n二、結果將於下一個工作日提供。'}
                title="測試訊息內容"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
             <div className="flex justify-end">
                <div className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg rounded-tr-none text-sm max-w-[85%]">測試訊息內容...</div>
             </div>
             <div className="flex justify-start">
                <div className={`px-3 py-2 rounded-lg rounded-tl-none text-sm max-w-[85%] border ${color === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-900' : 'bg-indigo-50 border-indigo-100 text-indigo-900'}`}>
                  {color === 'blue' ? '這是 A 設定的回應模擬。' : '這是 B 設定的回應模擬。'}
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Load Prompt Modal */}
      {isLoadModalOpen && (
        <LoadPromptModal 
          onSelect={(content) => { setSystemPrompt(content); setIsLoadModalOpen(false); }}
          onClose={() => setIsLoadModalOpen(false)}
        />
      )}

      {/* Save Prompt Modal */}
      {isSaveModalOpen && (
        <SavePromptModal
          currentName={currentTitle}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
}


/** Modal: Load prompt — two-step: choose prompt then version */
function LoadPromptModal({ onSelect, onClose }) {
  const [selectedPromptId, setSelectedPromptId] = useState('');
  const prompts = MOCK_LLM_PROMPTS;

  const filteredVersions = useMemo(() => {
    if (!selectedPromptId) return [];
    return MOCK_VERSIONS.filter(v => v.promptId === selectedPromptId);
  }, [selectedPromptId]);

  const selectedPrompt = prompts.find(p => p.id === selectedPromptId);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <History className="text-blue-600" /> 載入提示詞
        </h3>

        <div className="space-y-5">
          {/* Step 1: Choose Prompt */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">選擇提示詞</label>
            <select
              value={selectedPromptId}
              onChange={(e) => setSelectedPromptId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
            >
              <option value="">-- 請選擇 --</option>
              {prompts.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Step 2: Choose Version */}
          {selectedPromptId && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">選擇版本</label>
              {filteredVersions.length > 0 ? (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="max-h-48 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
                    {filteredVersions.map(ver => (
                      <button 
                        key={ver.id} 
                        onClick={() => onSelect(ver.content)}
                        className="w-full text-left p-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">{ver.label}</span>
                          <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">載入</span>
                        </div>
                        <div className="text-xs text-slate-400 truncate mt-1">{ver.content}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-400 p-4 text-center border border-dashed border-slate-200 rounded-lg">此提示詞尚無版本紀錄</div>
              )}

              {/* Quick load latest */}
              {selectedPrompt && (
                <button 
                  onClick={() => onSelect(selectedPrompt.content)}
                  className="w-full mt-3 text-center text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-200 rounded-lg py-2 transition-colors font-medium"
                >
                  直接載入「{selectedPrompt.name}」最新內容
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
        </div>
      </div>
    </ModalOverlay>
  );
}


/** Modal: Save prompt — two modes: save-as-new or create-new-version/overwrite */
function SavePromptModal({ currentName, onClose }) {
  const [saveMode, setSaveMode] = useState(null); // null | 'new' | 'overwrite'
  const [saveName, setSaveName] = useState('');
  const [saveNote, setSaveNote] = useState('');

  const handleSelectMode = (mode) => {
    setSaveMode(mode);
    if (mode === 'new') {
      setSaveName('');
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
    if (saveMode === 'new') {
      alert(`已另存新提示詞：「${saveName}」`);
    } else {
      alert(`已建立新版本/覆蓋提示詞：「${saveName}」`);
    }
    onClose();
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
              <button 
                onClick={() => setSaveMode(null)} 
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← 重新選擇
              </button>
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
