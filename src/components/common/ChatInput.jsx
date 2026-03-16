import React, { useState, useRef, useEffect } from 'react';
import { Settings, Send, BookOpen, Plus, Database, Upload, X, FileText } from 'lucide-react';
import { KBFileSelectorModal } from './KBFileSelectorModal';

export function ChatInput({ 
  placeholder, 
  showLLMSettings, 
  onOpenLLMSettings, 
  allowUpload, 
  showInstructions,
  onSendMessage
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKBModalOpen, setIsKBModalOpen] = useState(false);
  const [selectedKBFiles, setSelectedKBFiles] = useState([]);
  const [inputText, setInputText] = useState('');
  
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUploadClick = () => {
    setIsMenuOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Selected files:', files);
      // In a real app we'd trigger an onFileUpload prop or similar here.
    }
    // reset input so picking the same file again works
    e.target.value = '';
  };

  const handleInsertKBFiles = (files) => {
    setSelectedKBFiles(prev => {
      // Avoid duplicates
      const newFiles = files.filter(f => !prev.find(p => p.id === f.id));
      return [...prev, ...newFiles];
    });
    setIsKBModalOpen(false);
  };

  const removeKBFile = (fileId) => {
    setSelectedKBFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSend = () => {
    if (!inputText.trim() && selectedKBFiles.length === 0) return;
    
    if (onSendMessage) {
      onSendMessage(inputText, selectedKBFiles);
    }
    
    setInputText('');
    setSelectedKBFiles([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {/* 顯示選擇的知識庫檔案 Chips */}
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

      <div className="max-w-5xl mx-auto relative">
        <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
          {allowUpload && (
             <div className="relative" ref={menuRef}>
               <button 
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className={`p-2 rounded-full transition-colors ${isMenuOpen ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`} 
                 title="新增附件"
               >
                 <Plus size={20}/>
               </button>
               
               {/* 展開的 Menu Menu Card */}
               {isMenuOpen && (
                 <div className="absolute bottom-[calc(100%+12px)] left-0 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-2 w-48 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
                    <button 
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                      onClick={handleUploadClick}
                    >
                      <Upload size={16} className="text-slate-400" />
                      <span>上傳檔案</span>
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                      onClick={() => {
                        setIsKBModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <Database size={16} className="text-slate-400" />
                      <span>加入知識庫檔案</span>
                    </button>
                 </div>
               )}
             </div>
          )}
          {showInstructions && (
             <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full" title="使用說明"><BookOpen size={20}/></button>
          )}
          
          <input 
            className="flex-1 outline-none text-sm" 
            placeholder={placeholder || "輸入您的問題..."} 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          {/* Conditionally render LLM settings button */}
          {showLLMSettings && (
            <button onClick={onOpenLLMSettings} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors" title="LLM 參數設定">
              <Settings size={20} />
            </button>
          )}
          
          <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={18}/></button>

          {/* Hidden File Input element triggered by the menu */}
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

      <KBFileSelectorModal 
        isOpen={isKBModalOpen}
        onClose={() => setIsKBModalOpen(false)}
        onInsertSelected={handleInsertKBFiles}
      />
    </div>
  );
}
