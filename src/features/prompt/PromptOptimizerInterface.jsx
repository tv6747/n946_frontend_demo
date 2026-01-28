import React, { useState } from 'react';
import { Send, Settings, ChevronDown, ChevronRight, Save, History } from 'lucide-react';
import { MOCK_VERSIONS } from '../../data/mockData';

export function PromptOptimizerInterface({ onSaveSystemPrompt, onOpenLLMSettings }) {
  const [globalInput, setGlobalInput] = useState('');

  return (
    <div className="flex flex-col h-full bg-slate-100">
      <div className="flex-1 p-4 grid grid-cols-2 gap-4 overflow-hidden">
        <PromptBlock 
          title="提示詞設定 A" 
          defaultModel="GPT-4 Turbo" 
          defaultSystem="你是一個專業的公文撰寫助理，請使用正式且精確的語氣..."
          color="blue"
          onSave={onSaveSystemPrompt}
          onOpenLLMSettings={onOpenLLMSettings}
        />
        <PromptBlock 
          title="提示詞設定 B" 
          defaultModel="Claude 3.5 Sonnet" 
          defaultSystem="你是一個親切的客服人員，請用口語化、有同理心的方式回應..."
          color="indigo"
          onSave={onSaveSystemPrompt}
          onOpenLLMSettings={onOpenLLMSettings}
        />
      </div>
      <div className="p-4 bg-white border-t border-slate-200">
         <div className="max-w-5xl mx-auto">
            <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
            <input 
              value={globalInput}
              onChange={(e) => setGlobalInput(e.target.value)}
              placeholder="輸入測試案例訊息，將同時發送給 A 與 B 進行測試..."
              className="flex-1 outline-none text-sm"
            />
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={18}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptBlock({ title, defaultModel, defaultSystem, color, onSave, onOpenLLMSettings }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [systemPrompt, setSystemPrompt] = useState(defaultSystem);
  const [isSystemPromptOpen, setIsSystemPromptOpen] = useState(true);
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
        {/* 取代原本的 select 為 LLM 設定按鈕 (使用齒輪圖示) */}
        <button 
          onClick={onOpenLLMSettings}
          className="p-1.5 text-slate-500 hover:bg-white/50 hover:text-blue-600 rounded-lg transition-colors"
          title="LLM 參數設定"
        >
           <Settings size={18} />
        </button>
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
           <div onClick={(e) => e.stopPropagation()}>
               <VersionSelector onSelect={(content) => setSystemPrompt(content)} />
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
                  <button onClick={onSave} className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 rounded-md transition-colors" title="儲存設定">
                    <Save size={14} />
                  </button>
                </div>
            </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-white">
        <div className="px-4 py-2 border-b border-slate-50 text-xs font-semibold text-slate-400">預覽結果</div>
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
      </div>
    </div>
  );
}

function VersionSelector({ onSelect }) {
  return (
    <div className="relative group">
       <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 transition-colors">
         <History size={12} /> 版本紀錄 <ChevronDown size={12} />
       </button>
       
       <div className="absolute right-0 top-full pt-1 w-64 z-20 hidden group-hover:block">
           <div className="bg-white border border-slate-200 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-75">
              <div className="p-2 border-b border-slate-100">
                 <input type="text" placeholder="搜尋版本..." className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none" />
              </div>
              <div className="max-h-40 overflow-y-auto p-1 custom-scrollbar">
                 {MOCK_VERSIONS.map(ver => (
                   <button key={ver.id} onClick={() => onSelect(ver.content)} className="w-full text-left p-2 hover:bg-slate-50 rounded text-xs text-slate-700 block">
                     <div className="font-semibold">{ver.label}</div>
                     <div className="text-slate-400 truncate mt-0.5">{ver.content}</div>
                   </button>
                 ))}
              </div>
           </div>
       </div>
    </div>
  );
}
