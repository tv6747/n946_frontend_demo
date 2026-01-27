import React, { useState } from 'react';
import { Settings, HelpCircle } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';
import { LLM_MODELS, PROMPT_TEMPLATES } from '../../data/constants';

export function LLMSettingsModal({ isOpen, onClose, showTemplate = true }) {
  // 模擬預設設定狀態
  const [settings, setSettings] = useState({
    model: 'gpt-4o',
    template: 'default',
    temperature: 0.7,
    topP: 0.9,
    topK: 40
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Settings className="text-blue-600" /> LLM 對話參數設定
        </h3>
        
        <div className="space-y-6">
           
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
