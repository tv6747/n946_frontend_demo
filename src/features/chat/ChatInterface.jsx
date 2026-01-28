import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, FileText, Bot, Download, Save, Paperclip, 
  Settings, Send, GripVertical, Maximize2, ArrowUpRight, FolderDown,
  ThumbsUp, ThumbsDown, BookOpen
} from 'lucide-react';
import { useResizable } from '../../hooks/useResizable';
import { WelcomeScreen } from './WelcomeScreen';
import { CanvasPreview } from '../ppt/CanvasPreview';

function ActionButton({ icon, label, onClick }) {
    return (
        <button onClick={onClick} className="flex items-center gap-1 text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors shadow-sm">
            {icon} {label}
        </button>
    );
}

export function ChatInterface({ currentFeature, onExport, onSave, ragContext, onOpenLLMSettings }) {
  const [messages, setMessages] = useState([]);
  const isDraftMode = currentFeature.id.startsWith('draft_');
  // Default to 50% for drafts, 70% otherwise
  const { leftWidth, startResizing } = useResizable(isDraftMode ? 50 : 50);

  // Check if we should show the LLM settings button (Only for Interactive Chat)
  const showLLMSettings = currentFeature.id === 'interactive';

  useEffect(() => {
    if (currentFeature.id === 'draft_mail') {
      setMessages([
        { id: 1, role: 'user', content: '請幫我擬稿回覆關於民眾陳情社區噪音問題。民眾表示每晚都有工程噪音。' },
        { id: 2, role: 'ai', content: '您好，這是針對噪音問題的擬稿建議：\n\n主旨：有關 台端陳情本市XX區XX路周邊夜間工程噪音一案，復如說明，請查照。\n說明：\n一、復 台端113年X月X日陳情書。\n二、關於反應夜間施工噪音擾民一事，本局已派員前往稽查，並依噪音管制法第X條規定量測噪音分貝數。\n三、經查該處施工單位已申請夜間施工許可，惟本局已責成廠商應做好隔音防制措施，避免影響周邊安寧。' }
      ]);
    } else if (currentFeature.id === 'draft_decor') {
      setMessages([
        { id: 1, role: 'user', content: '公文號：113營署建字第1130008888號，請幫我檢查缺件情況並擬定補正通知。' },
        { id: 2, role: 'ai', content: '好的，已檢核公文號 113營署建字第1130008888號。\n\n經查核，本案尚缺以下文件：\n1. 消防安全設備圖說 (未核章)\n2. 施工許可證申請書 (缺屋主簽名)\n\n建議補正通知內容如下：\n主旨：台端申請本市XX區...室內裝修審查一案 (公文號：113營署建字第1130008888號)，請於文到10日內補正說明二所列事項，請查照。\n說明：\n一、依建築物室內裝修管理辦法辦理。\n二、補正事項：(一) 請檢附經消防局核章之消防圖說...(略)' }
      ]);
    } else {
      setMessages([]); 
    }
  }, [currentFeature.id]);

  const handleSuggestionClick = (text) => {
    setMessages([{ id: Date.now(), role: 'user', content: text }]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', content: `這是針對「${text}」的模擬回應。\n\n「${text} 」的回應模擬` }
      ]);
    }, 1000);
  };

  const lastAIResponse = messages.filter(m => m.role === 'ai').pop()?.content;
  const userRequest = messages.filter(m => m.role === 'user').pop()?.content;

  // 如果不是草稿模式 (例如一般問答)，直接回傳單欄介面
  if (!isDraftMode) {
     return (
        <div className="flex flex-col h-full bg-slate-50">
           {ragContext && (
             <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center justify-between text-xs text-indigo-700 z-30">
                <div className="flex items-center gap-2">
                   <BrainCircuit size={14} className="text-indigo-500" />
                   <span className="font-medium flex items-center gap-1">
                      基於勾選的 
                      <span className="relative group cursor-help underline decoration-dotted underline-offset-4 decoration-indigo-400 font-bold">
                         {ragContext.length} 個檔案
                          {/* Light Theme Tooltip (Read Only) */}
                         <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                             <div className="bg-white text-slate-700 border border-slate-200 rounded-xl p-3 shadow-xl">
                                 <div className="font-bold border-b border-slate-100 pb-2 mb-2 text-xs text-slate-400 uppercase tracking-wider">已選文件清單</div>
                                 {ragContext.length === 0 ? (
                                   <div className="text-slate-400 py-2 text-center text-xs italic">未選擇任何文件</div>
                                 ) : (
                                   <ul className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                                      {ragContext.map(f => (
                                         <li key={f.id} className="flex items-center gap-2 text-xs py-1 px-1 hover:bg-slate-50 rounded">
                                            <FileText size={12} className="text-indigo-400 flex-shrink-0" />
                                            <span className="truncate font-medium" title={f.name}>{f.name}</span>
                                         </li>
                                      ))}
                                   </ul>
                                 )}
                             </div>
                         </div>
                      </span>
                      進行回答
                   </span>
                </div>
             </div>
           )}
           {messages.length === 0 ? (
             <WelcomeScreen featureId={currentFeature.id} onSuggestionClick={handleSuggestionClick} />
           ) : (
             <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-slate-50/50">
               {messages.map(msg => (
                 <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   {msg.role === 'ai' && (
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mt-1 flex-shrink-0">
                       <Bot size={16} />
                     </div>
                   )}
                   <div className="flex flex-col max-w-[85%] gap-2">
                     <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                       msg.role === 'user' 
                         ? 'bg-blue-600 text-white rounded-tr-sm' 
                         : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                     }`}>
                       {msg.content}
                     </div>
                     {msg.role === 'ai' && (
                        <div className="flex gap-2 flex-wrap animate-in fade-in duration-300">
                           <ActionButton icon={<ThumbsUp size={14}/>} onClick={() => {}} />
                           <ActionButton icon={<ThumbsDown size={14}/>} onClick={() => {}} />
                        </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           )}
           <div className="p-4 bg-white border-t border-slate-200">         
            <div className="max-w-5xl mx-auto">
              <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
                {(currentFeature.id === 'interactive' || currentFeature.allowUpload) && (
                   <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full" title="上傳檔案"><Paperclip size={20}/></button>
                )}
                {currentFeature.showInstructions && (
                   <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full" title="使用說明"><BookOpen size={20}/></button>
                )}
                <input className="flex-1 outline-none text-sm" placeholder={currentFeature.placeholder || "輸入您的問題..."} />
                
                {/* Conditionally render LLM settings button */}
                {showLLMSettings && (
                  <button onClick={onOpenLLMSettings} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors" title="LLM 參數設定">
                    <Settings size={20} />
                  </button>
                )}
                
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={18}/></button>
              </div>
            </div>
           </div>
        </div>
     );
  }

  // Draft Mode: Resizable Layout
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      
      {/* 1. Main Content Area (Chat + Preview) */}
      <div className="flex-1 flex overflow-hidden">
          {/* Chat Column (Resizable) */}
          <div className="flex flex-col border-r border-slate-200 bg-white" style={{ width: `${leftWidth}%`, minWidth: '350px' }}>
               {messages.length === 0 ? (
                 <WelcomeScreen featureId={currentFeature.id} onSuggestionClick={handleSuggestionClick} />
               ) : (
                 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-slate-50/50">
                   {messages.map(msg => (
                     <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.role === 'ai' && (
                         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mt-1 flex-shrink-0">
                           <Bot size={16} />
                         </div>
                       )}
                       <div className="flex flex-col max-w-[85%] gap-2">
                         <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                           msg.role === 'user' 
                             ? 'bg-blue-600 text-white rounded-tr-sm' 
                             : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                         }`}>
                           {msg.content}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
          </div>

          {/* Resizer */}
          <div 
             className="w-1 bg-slate-200 hover:bg-blue-400 cursor-col-resize transition-colors z-30 flex items-center justify-center group"
             onMouseDown={startResizing}
          >
             <GripVertical size={12} className="text-slate-400 opacity-0 group-hover:opacity-100" />
          </div>

          {/* Canvas Column */}
          <div className="flex-1 bg-slate-100 flex flex-col min-w-0" style={{ width: `${100 - leftWidth}%` }}>
               {/* Top Bar for Canvas */}
               <div className="h-10 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                     <FileText size={14} /> 即時預覽
                  </span>
                  <div className="flex items-center gap-2">
                     {/* Special buttons for Draft Decor */}
                     {currentFeature.id === 'draft_decor' && (
                         <>
                            <button className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100 mr-2" title="傳回公文系統">
                                <ArrowUpRight size={14}/> 傳回公文系統
                            </button>
                            <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded transition-colors" title="下載附件">
                                <FolderDown size={16} />
                            </button>
                         </>
                     )}
                     <button onClick={onExport} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded transition-colors" title="匯出文件"><Download size={16} /></button>
                     <button onClick={onSave} className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded transition-colors" title="儲存草稿"><Save size={16} /></button>
                     <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded transition-colors" title="全螢幕"><Maximize2 size={16} /></button>
                  </div>
               </div>

               {/* Canvas Container */}
               <div className="flex-1 p-8 overflow-auto custom-scrollbar flex justify-center bg-slate-100/50">
                  <div className="w-full max-w-[210mm] my-4 mx-auto transition-all shadow-xl min-w-[210mm]">
                     <CanvasPreview 
                       type="doc" 
                       content={lastAIResponse} 
                       title={userRequest}
                     />
                  </div>
               </div>
            </div>
      </div>

      {/* 2. Full Width Input Bar at Bottom */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <div className="max-w-5xl mx-auto">
            <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><Paperclip size={20}/></button>
              <input className="flex-1 outline-none text-sm" placeholder={currentFeature.placeholder || "輸入您的問題..."} />
              
              {/* Conditionally render LLM settings button */}
              {showLLMSettings && (
                <button onClick={onOpenLLMSettings} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors" title="LLM 參數設定">
                  <Settings size={20} />
                </button>
              )}

              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={18}/></button>
            </div>
         </div>
      </div>

    </div>
  );
}
