import React, { useState } from 'react';
import { 
    Bot, MonitorPlay, Check, ChevronRight as ChevronRightIcon, 
    ChevronLeft as ChevronLeftIcon, Paperclip, Settings, Send, GripVertical, Download 
} from 'lucide-react';
import { useResizable } from '../../hooks/useResizable';
import { WelcomeScreen } from '../chat/WelcomeScreen';
import { CanvasPreview } from './CanvasPreview';
// import { PPT_TEMPLATES } from '../../data/constants'; // Replaced by local definition

import tpl1 from '../../assets/template1.jpg';
import tpl2 from '../../assets/template2.jpg';
import tpl3 from '../../assets/template3.jpg';

const LOCAL_PPT_TEMPLATES = [
  { id: 1, name: '範本一', image: tpl1 },
  { id: 2, name: '範本二', image: tpl2 },
  { id: 3, name: '範本三', image: tpl3 },
];

export function PPTGenerationInterface({ currentFeature, onOpenLLMSettings }) {
  const [messages, setMessages] = useState([]); 
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(LOCAL_PPT_TEMPLATES[0]);
  const { leftWidth, startResizing } = useResizable(50);

  const handleSuggestionClick = (text) => {
    setMessages([{ id: Date.now(), role: 'user', content: text }]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', content: `針對「${text}」的市場分析與策略規劃：\n\n1. 市場現況\n   - 競爭激烈，需差異化\n   - 用戶增長趨緩，重留存\n\n2. 策略建議\n   - 強化品牌識別\n   - 提升會員權益\n   - 數位轉型加速` }
      ]);
    }, 800);
  };

  const lastAIResponse = messages.filter(m => m.role === 'ai').pop()?.content;
  const userRequest = messages.filter(m => m.role === 'user').pop()?.content;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
       
       <div className="flex-1 flex overflow-hidden relative z-0 min-h-0">
          
          {/* Left Column (Chat + Template) */}
          <div className="flex flex-col h-full border-r border-slate-200 bg-white z-20 min-w-0" style={{ width: `${leftWidth}%`, minWidth: '300px' }}>
              
              <div className="flex-1 flex min-h-0 relative">
                  {/* Chat Messages */}
                  <div className="flex-1 flex flex-col min-w-0">
                     {messages.length === 0 ? (
                       <WelcomeScreen featureId={currentFeature.id} onSuggestionClick={handleSuggestionClick} />
                     ) : (
                       <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-slate-50">
                          {messages.map(msg => (
                            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              {msg.role === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mt-1 flex-shrink-0">
                                  <Bot size={16} />
                                </div>
                              )}
                              <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                                  msg.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                                }`}>
                                {msg.content}
                              </div>
                            </div>
                          ))}
                       </div>
                     )}
                  </div>
              </div>
          </div>

          {/* Resizer */}
          <div 
             className="w-1 bg-slate-200 hover:bg-blue-400 cursor-col-resize transition-colors z-30 flex items-center justify-center group"
             onMouseDown={startResizing}
          >
             <GripVertical size={12} className="text-slate-400 opacity-0 group-hover:opacity-100" />
          </div>

          {/* Right Column: Canvas Area */}
          <div className="flex flex-col bg-slate-100 relative min-w-0" style={{ width: `${100 - leftWidth}%` }}>
             <div className="flex-1 p-8 flex items-start justify-center overflow-auto custom-scrollbar">
                <div className="w-full max-w-5xl my-4 mx-auto transition-all min-w-[300px]">
                   <CanvasPreview 
                     type="ppt" 
                     content={lastAIResponse} 
                     title={userRequest}
                     template={selectedTemplate} 
                   />
                </div>
             </div>
          </div>
                  {/* Template Panel (Attached to Chat) */}
                  <div 
                    className={`transition-all duration-300 ease-in-out relative flex flex-col bg-slate-50 border-l border-slate-200 z-10
                      ${isRightPanelOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}
                    `}
                  >
                     <div 
                        className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm mx-2 my-4 overflow-hidden h-[calc(100%-2rem)]"
                     >
                         <div className="h-12 flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0">
                            <span className="text-sm font-bold text-slate-700 whitespace-nowrap">選擇範本</span>
                         </div>
                         
                         <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                            <div className="space-y-3">
                               {LOCAL_PPT_TEMPLATES.map(tpl => (
                                 <div 
                                   key={tpl.id} 
                                   onClick={() => {
                                        if(!window.confirm("確定要下載此範本嗎？")) return;
                                        // Trigger Download
                                        const link = document.createElement('a');
                                        link.href = tpl.image;
                                        link.download = `template_${tpl.id}.jpg`;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        
                                        setSelectedTemplate(tpl);
                                   }}
                                   className={`group relative cursor-pointer rounded-lg overflow-hidden border transition-all border-slate-200 hover:shadow-md`}
                                 >
                                    <div className={`aspect-video bg-slate-100 flex items-center justify-center overflow-hidden relative`}>
                                       <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover" />
                                        {/* Hover Overlay with Download Icon */}
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                           <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/30 text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                              <Download size={32} strokeWidth={1.5} />
                                           </div>
                                        </div>
                                     </div>
                                    <div className="p-2 bg-white flex justify-between items-center">
                                       <span className="text-xs font-medium text-slate-600 truncate">{tpl.name}</span>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                     </div>
                     
                     {/* Close Button (Only visible when open) */}
                     <button 
                        onClick={() => setIsRightPanelOpen(false)}
                        className={`absolute top-1/2 -translate-y-1/2 -left-3 z-50 bg-white border border-slate-200 rounded-full p-1 shadow-md text-slate-500 hover:text-blue-600 hover:scale-110 transition-all focus:outline-none flex items-center justify-center w-6 h-6`}
                        title="收合面板"
                      >
                         <ChevronRightIcon size={14} />
                     </button>
                  </div>
                  
                  {/* Open Button (Only visible when closed, separate from collapsible div) */}
                  {!isRightPanelOpen && (
                     <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20">
                        <button 
                          onClick={() => setIsRightPanelOpen(true)}
                          className="bg-white border border-slate-200 border-r-0 p-2 rounded-l-xl shadow-lg hover:text-blue-600 text-slate-400 transition-all hover:pl-3"
                          title="開啟範本面板"
                        >
                           <ChevronLeftIcon size={20} />
                        </button>
                     </div>
                  )}
       </div>
       
       {/* Bottom Section: Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
         <div className="max-w-5xl mx-auto">
            <div className="relative border border-slate-300 rounded-lg flex items-center p-2 gap-2 bg-white">
          <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full"><Paperclip size={18}/></button>
          <input 
            className="flex-1 outline-none text-sm min-w-0" 
            placeholder={currentFeature.placeholder} 
            onKeyDown={(e) => {
              if(e.key === 'Enter') handleSuggestionClick(e.target.value);
            }}
          />
          <button 
            onClick={onOpenLLMSettings}
            className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors"
            title="LLM 參數設定"
          >
            <Settings size={20} />
          </button>
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={16}/></button>
        </div>
        <div className="text-center mt-2">
           <span className="text-xs text-slate-400">此回答為大型語言模型產出，僅供參考，請務必核對重要資訊的準確性。</span>
        </div>
        </div>
      </div>
    </div>
  );
}
