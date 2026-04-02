import React, { useState, useRef, useEffect } from 'react';
import { Settings, HelpCircle, ChevronDown, X, LayoutGrid } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';
import { LLM_MODELS, PROMPT_TEMPLATES } from '../../data/constants';
import { MOCK_TOOLS } from '../../data/mockToolData';
import { MOCK_ADMIN_APPS } from '../../data/mockData';

export function LLMSettingsModal({ isOpen, onClose, showTemplate = true, showAppSelector = false, onAppChange, initialAppId }) {
  // 模擬預設設定狀態
  const [settings, setSettings] = useState({
    model: 'gpt-4o',
    template: 'default',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    tools: ['1', '3'] // 預設啟用 Google Search, OCR
  });

  const [selectedAppId, setSelectedAppId] = useState('');
  const [lastAppliedAppId, setLastAppliedAppId] = useState('');

  // 當外部 initialAppId 變更時，自動套用該應用的預設參數
  useEffect(() => {
    if (initialAppId && initialAppId !== lastAppliedAppId) {
      setLastAppliedAppId(initialAppId);
      setSelectedAppId(initialAppId);
      const app = MOCK_ADMIN_APPS.find(a => a.id === initialAppId);
      if (app) {
        const modelMatch = LLM_MODELS.find(m => m.id === app.model);
        const templateMatch = PROMPT_TEMPLATES.find(t => t.id === app.template);
        setSettings(prev => ({
          ...prev,
          model: modelMatch ? app.model : prev.model,
          template: templateMatch ? app.template : prev.template,
          temperature: app.settings?.temperature ?? prev.temperature,
          topP: app.settings?.topP ?? prev.topP,
          topK: app.settings?.topK ?? prev.topK,
        }));
      }
    }
  }, [initialAppId]);
  const [isToolMenuOpen, setIsToolMenuOpen] = useState(false);
  const toolMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolMenuRef.current && !toolMenuRef.current.contains(event.target)) {
        setIsToolMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleTool = (toolId) => {
      setSettings(prev => {
          const currentTools = prev.tools || [];
          if (currentTools.includes(toolId)) {
              return { ...prev, tools: currentTools.filter(id => id !== toolId) };
          } else {
              return { ...prev, tools: [...currentTools, toolId] };
          }
      });
  };

  // 選擇應用後自動帶入對應的預設設定
  const handleAppSelect = (appId) => {
    setSelectedAppId(appId);
    if (onAppChange) onAppChange(appId);
    if (!appId) return;
    
    const app = MOCK_ADMIN_APPS.find(a => a.id === appId);
    if (app) {
      // Map app model to LLM_MODELS id
      const modelMatch = LLM_MODELS.find(m => m.id === app.model);
      const templateMatch = PROMPT_TEMPLATES.find(t => t.id === app.template);
      
      setSettings(prev => ({
        ...prev,
        model: modelMatch ? app.model : prev.model,
        template: templateMatch ? app.template : prev.template,
        temperature: app.settings?.temperature ?? prev.temperature,
        topP: app.settings?.topP ?? prev.topP,
        topK: app.settings?.topK ?? prev.topK,
      }));
    }
  };

  const activeTools = MOCK_TOOLS.filter(t => t.status === 'active');

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Settings className="text-blue-600" /> LLM 對話參數設定
        </h3>
        
        <div className="space-y-6">

           {/* 選擇應用 (僅在提示詞優化時顯示) */}
           {showAppSelector && (
             <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                   <label className="text-sm font-medium text-slate-700">選擇應用</label>
                   <div className="group relative">
                      <HelpCircle size={14} className="text-slate-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                         選擇應用後將自動帶入該應用的預設模型、工具及參數設定，下方仍可手動調整。
                      </div>
                   </div>
                </div>
                <select 
                  value={selectedAppId} 
                  onChange={(e) => handleAppSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
                >
                   <option value="">-- 請選擇應用 --</option>
                   {MOCK_ADMIN_APPS.map(app => (
                     <option key={app.id} value={app.id}>{app.name} ({app.system})</option>
                   ))}
                </select>
                {selectedAppId && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 animate-in fade-in duration-200">
                    <LayoutGrid size={14} />
                    <span>已載入「{MOCK_ADMIN_APPS.find(a => a.id === selectedAppId)?.name}」的預設設定，下方可手動調整</span>
                  </div>
                )}
             </div>
           )}
           
           {/* 模型選擇 */}
           <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                 <label className="text-sm font-medium text-slate-700">可用 LLM 模型</label>
                 <div className="group relative">
                    <HelpCircle size={14} className="text-slate-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                       選擇用於生成回應的大型語言模型。
                    </div>
                 </div>
              </div>
              <select 
                value={settings.model} 
                onChange={(e) => handleChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
              >
                 {LLM_MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
           </div>

           {/* 提示詞模板 (僅在 showTemplate 為 true 時顯示) */}
           {showTemplate && (
             <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                   <label className="text-sm font-medium text-slate-700">提示詞模板</label>
                   <div className="group relative">
                      <HelpCircle size={14} className="text-slate-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                         預設的系統提示詞，定義 AI 的角色與回應風格。
                      </div>
                   </div>
                </div>
                <select 
                  value={settings.template} 
                  onChange={(e) => handleChange('template', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
                >
                   {PROMPT_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
             </div>
           )}

           {/* 工具選擇 (下拉選單多選) */}
           <div className="space-y-2">
               <div className="flex items-center gap-2 mb-1">
                   <label className="text-sm font-medium text-slate-700">啟用工具 (Tools)</label>
                   <div className="group relative">
                       <HelpCircle size={14} className="text-slate-400 cursor-help" />
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                           選擇本次對話可使用的工具。
                       </div>
                   </div>
               </div>
               
               <div className="relative" ref={toolMenuRef}>
                   <button 
                       type="button"
                       onClick={() => setIsToolMenuOpen(!isToolMenuOpen)}
                       className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                   >
                       <span className={settings.tools && settings.tools.length > 0 ? "text-slate-700" : "text-slate-400"}>
                           {settings.tools && settings.tools.length > 0 
                               ? `已選擇 ${settings.tools.length} 個工具` 
                               : "請選擇工具..."}
                       </span>
                       <ChevronDown size={16} className={`text-slate-400 transition-transform ${isToolMenuOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {isToolMenuOpen && (
                       <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto custom-scrollbar p-1">
                           {activeTools.length === 0 ? (
                               <div className="p-3 text-center text-slate-400 text-xs">無可用工具</div>
                           ) : activeTools.map(tool => {
                               const isSelected = (settings.tools || []).includes(String(tool.id));
                               return (
                                   <label 
                                       key={tool.id} 
                                       className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                                           isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                                       }`}
                                   >
                                       <input 
                                           type="checkbox" 
                                           className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                           checked={isSelected}
                                           onChange={() => toggleTool(String(tool.id))}
                                       />
                                       <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium truncate">{tool.name}</div>
                                            <div className="text-[10px] text-slate-400 truncate">{tool.description}</div>
                                       </div>
                                       {isSelected && <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                   </label>
                               );
                           })}
                       </div>
                   )}
               </div>

               {/* Selected Tags Display */}
               <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                   {(settings.tools || []).map(toolId => {
                       const tool = activeTools.find(t => String(t.id) === String(toolId));
                       if (!tool) return null;
                       return (
                           <span key={toolId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium animate-in fade-in zoom-in duration-200">
                               {tool.name}
                               <button 
                                   onClick={() => toggleTool(toolId)}
                                   className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                               >
                               <X size={12} />
                               </button>
                           </span>
                       );
                   })}
               </div>
           </div>

           {/* 參數滑桿區 */}
           <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
              
              {/* Temperature */}
              <div className="col-span-2">
                 <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                       <label className="text-sm font-medium text-slate-700">Temperature (溫度)</label>
                       <div className="group relative">
                          <HelpCircle size={14} className="text-slate-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                             控制隨機性。值越高 (如 0.8) 回應越有創意但較不可控；值越低 (如 0.2) 越精確保守。
                          </div>
                       </div>
                    </div>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{settings.temperature}</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.1" 
                   value={settings.temperature}
                   onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                   className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
              </div>

              {/* Top-P */}
              <div>
                 <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                       <label className="text-sm font-medium text-slate-700">Top-P</label>
                       <div className="group relative">
                          <HelpCircle size={14} className="text-slate-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                             核取樣 (Nucleus Sampling)。限制模型僅考慮累積機率達 P 的詞彙集合。
                          </div>
                       </div>
                    </div>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{settings.topP}</span>
                 </div>
                 <input 
                   type="range" min="0" max="1" step="0.1" 
                   value={settings.topP}
                   onChange={(e) => handleChange('topP', parseFloat(e.target.value))}
                   className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                 />
              </div>

              {/* Top-K */}
              <div>
                 <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                       <label className="text-sm font-medium text-slate-700">Top-K</label>
                       <div className="group relative">
                          <HelpCircle size={14} className="text-slate-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                             限制模型僅從機率最高的前 K 個詞彙中選擇。
                          </div>
                       </div>
                    </div>
                 </div>
                 <input 
                   type="number" 
                   value={settings.topK}
                   onChange={(e) => handleChange('topK', parseInt(e.target.value))}
                   className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:border-blue-400 text-center"
                 />
              </div>

           </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          <button onClick={() => { alert('設定已套用'); onClose(); }} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md">套用設定</button>
        </div>
      </div>
    </ModalOverlay>
  );
}
