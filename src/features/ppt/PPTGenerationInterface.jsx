import React, { useState } from 'react';
import { 
    Bot, MonitorPlay, Check, ChevronRight as ChevronRightIcon, 
    ChevronLeft as ChevronLeftIcon, Paperclip, Settings, Send, GripVertical, Download, Upload,
    Star, Pencil, Trash2, CheckCircle2, Ban, X
} from 'lucide-react';
import { useResizable } from '../../hooks/useResizable';
import { WelcomeScreen } from '../chat/WelcomeScreen';
import { CanvasPreview } from './CanvasPreview';
import { ChatMessage } from '../../components/common/ChatMessage';
// import { PPT_TEMPLATES } = '../../data/constants'; // Replaced by local definition

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
  const [templates, setTemplates] = useState(LOCAL_PPT_TEMPLATES);
  const [favoriteTemplateIds, setFavoriteTemplateIds] = useState([LOCAL_PPT_TEMPLATES[0].id]);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [tempName, setTempName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  // Sort: Favorites first
  const sortedTemplates = [...templates].sort((a, b) => {
     const aFav = favoriteTemplateIds.includes(a.id);
     const bFav = favoriteTemplateIds.includes(b.id);
     if (aFav && !bFav) return -1;
     if (!aFav && bFav) return 1;
     return 0;
  });

  const handleFileUpload = () => {
         const input = document.createElement('input');
         input.type = 'file';
         input.accept = 'image/*';
         input.onchange = (e) => {
           const file = e.target.files[0];
           if(file) {
             const reader = new FileReader();
             reader.onload = (e) => {
               const newTemplate = {
                 id: Date.now(),
                 name: file.name.replace(/\.[^/.]+$/, ""),
                 image: e.target.result
               };
               setTemplates(prev => [...prev, newTemplate]);
               // Automatically set as default or selected if desired? For now just add.
               setSelectedTemplate(newTemplate);
             };
             reader.readAsDataURL(file);
           }
         };
         input.click();
  };
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
                            <ChatMessage 
                               key={msg.id} 
                               message={msg} 
                               onFeedback={() => setIsFeedbackModalOpen(true)}
                            />
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
                            <span className="text-base font-bold text-slate-700 whitespace-nowrap">選擇範本</span>
                         </div>
                         
                         <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                            <div className="space-y-3">
                               {sortedTemplates.map(tpl => {
                                 const isFavorite = favoriteTemplateIds.includes(tpl.id);
                                 const isEditing = tpl.id === editingTemplateId;
                                 const isSystemTemplate = tpl.id === 1 || tpl.id === 2;

                                 return (
                                  <div 
                                    key={tpl.id} 
                                    className={`group relative cursor-pointer rounded-lg overflow-hidden border transition-all hover:shadow-md ${selectedTemplate.id === tpl.id ? 'border-blue-500 ring-1 ring-inset ring-blue-500' : 'border-slate-200'}`}
                                  >
                                     <div className={`aspect-video bg-slate-100 flex items-center justify-center overflow-hidden relative group-image`}>
                                        <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover" 
                                           onClick={() => setSelectedTemplate(tpl)}
                                        />
                                        
                                        {/* Top Left: Star Button */}
                                         <button 
                                            className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-sm transition-all z-20 ${isFavorite ? 'bg-yellow-400 text-white shadow-sm' : 'bg-black/30 text-white/70 hover:bg-yellow-400 hover:text-white'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFavoriteTemplateIds(prev => {
                                                    if (prev.includes(tpl.id)) {
                                                        return prev.filter(id => id !== tpl.id);
                                                    } else {
                                                        return [...prev, tpl.id];
                                                    }
                                                });
                                            }}
                                            title={isFavorite ? "取消常用" : "設為常用"}
                                         >
                                            <Star size={14} fill={isFavorite ? "currentColor" : "none"} />
                                         </button>

                                        {/* Top Right: Trash Button (Only in Edit Mode) */}
                                        {isEditing && (
                                            <button 
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors z-20"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if(window.confirm(`確定要刪除「${tpl.name}」嗎？`)) {
                                                        setTemplates(prev => prev.filter(t => t.id !== tpl.id));
                                                        if(selectedTemplate.id === tpl.id) setSelectedTemplate(templates[0]);
                                                    }
                                                }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}

                                         {/* Hover Overlay with Buttons */}
                                         <div className={`absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 ${isEditing ? 'hidden' : ''}`}>
                                            {/* Download */}
                                            <button 
                                                className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30 text-white shadow-xl hover:bg-white/40 transition-all transform hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if(!window.confirm("確定要下載此範本嗎？")) return;
                                                    const link = document.createElement('a');
                                                    link.href = tpl.image;
                                                    link.download = `template_${tpl.id}.jpg`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                                title="下載範本"
                                            >
                                               <Download size={20} />
                                            </button>
                                            
                                            {/* Edit (Hidden for System Templates) */}
                                            {/* Edit */}
                                            <button 
                                                className={`p-2 rounded-full backdrop-blur-sm border border-white/30 shadow-xl transition-all transform ${isSystemTemplate 
                                                    ? 'bg-red-500/20 text-white/50 cursor-not-allowed hover:bg-red-500/20' 
                                                    : 'bg-white/20 text-white hover:bg-white/40 hover:scale-110'
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (isSystemTemplate) return;
                                                    setEditingTemplateId(tpl.id);
                                                    setTempName(tpl.name);
                                                }}
                                                title={isSystemTemplate ? "預設範本不可編輯" : "編輯範本"}
                                            >
                                               {isSystemTemplate ? <Ban size={20} /> : <Pencil size={20} />}
                                            </button>
                                         </div>
                                      </div>
                                     
                                     {/* Bottom Area: Name or Edit Input */}
                                     {isEditing ? (
                                         <div className="px-2 bg-blue-50 flex items-center gap-2 h-[44px] border-t border-slate-100 box-border overflow-hidden w-full max-w-full">
                                             <input 
                                                className="flex-1 min-w-0 w-0 text-xs border border-blue-200 rounded px-2 outline-none focus:border-blue-500 bg-white h-[28px] box-border m-0 leading-normal"
                                                value={tempName}
                                                onChange={(e) => setTempName(e.target.value)}
                                                autoFocus
                                                onClick={(e) => e.stopPropagation()}
                                                onKeyDown={(e) => {
                                                    if(e.key === 'Enter') {
                                                        setTemplates(prev => prev.map(t => t.id === tpl.id ? {...t, name: tempName} : t));
                                                        setEditingTemplateId(null);
                                                    }
                                                }}
                                             />
                                             <button 
                                                className="text-green-600 hover:bg-green-100 rounded-full flex-shrink-0 w-[28px] h-[28px] flex items-center justify-center"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setTemplates(prev => prev.map(t => t.id === tpl.id ? {...t, name: tempName} : t));
                                                    setEditingTemplateId(null);
                                                }}
                                             >
                                                 <CheckCircle2 size={16} />
                                             </button>
                                         </div>
                                     ) : (
                                        <div className="px-2 bg-white flex items-center gap-2 h-[44px] border-t border-slate-100 box-border overflow-hidden w-full max-w-full" onClick={() => setSelectedTemplate(tpl)}>
                                           <div className="flex-1 min-w-0 w-0 px-2 border border-transparent h-[28px] flex items-center box-border m-0">
                                              <span className="text-xs font-medium text-slate-900 truncate block w-full leading-none">{tpl.name}</span>
                                           </div>
                                        </div>
                                     )}
                                  </div>
                                 );
                               })}
                               
                               {/* Upload Button at the end */}
                               <div 
                                  onClick={handleFileUpload}
                                  className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-all group min-h-[100px]"
                               >
                                  <div className="bg-slate-100 p-3 rounded-full group-hover:bg-white transition-colors">
                                      <Upload size={20} />
                                  </div>
                                  <span className="text-xs font-medium">上傳新範本</span>
                               </div>
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

       {/* Feedback Modal */}
       {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
              <button 
                  onClick={() => setIsFeedbackModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                  <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-slate-800 mb-4">提供回饋</h3>
              <p className="text-sm text-slate-500 mb-4">請告訴我們您的建議或遇到的問題，這將幫助我們改進。</p>
              <textarea 
                  className="w-full h-32 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
                  placeholder="請輸入您的回饋..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-2">
                  <button 
                      onClick={() => setIsFeedbackModalOpen(false)}
                      className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                      取消
                  </button>
                  <button 
                      onClick={() => {
                          alert('謝謝您的回饋！');
                          setIsFeedbackModalOpen(false);
                          setFeedbackText('');
                      }}
                      className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                  >
                      送出回饋
                  </button>
              </div>
           </div>
        </div>
       )}
     </div>
    </div>
  );
}
