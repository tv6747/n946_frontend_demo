import React from 'react';
import { Paperclip, Settings, Send, BookOpen } from 'lucide-react';

export function ChatInput({ 
  placeholder, 
  showLLMSettings, 
  onOpenLLMSettings, 
  allowUpload, 
  showInstructions 
}) {
  return (
    <div className="p-4 bg-white border-t border-slate-200 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-5xl mx-auto">
        <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
          {(allowUpload) && (
             <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full" title="上傳檔案"><Paperclip size={20}/></button>
          )}
          {showInstructions && (
             <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full" title="使用說明"><BookOpen size={20}/></button>
          )}
          
          <input className="flex-1 outline-none text-sm" placeholder={placeholder || "輸入您的問題..."} />
          
          {/* Conditionally render LLM settings button */}
          {showLLMSettings && (
            <button onClick={onOpenLLMSettings} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors" title="LLM 參數設定">
              <Settings size={20} />
            </button>
          )}
          
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={18}/></button>
        </div>
        <div className="text-center mt-2">
           <span className="text-xs text-slate-400">此回答為大型語言模型產出，僅供參考，請務必核對重要資訊的準確性。</span>
        </div>
      </div>
    </div>
  );
}
