import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { LANGUAGES } from '../../data/constants';

export function DocumentTranslationInterface() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh-TW');

  const sourceOptions = LANGUAGES;
  const targetOptions = LANGUAGES.filter(lang => lang.id !== 'auto');

  return (
    <div className="flex h-full bg-slate-100 p-6 gap-6">
       <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <div className="flex items-center gap-2 font-semibold text-slate-700">
               <FileText size={18} className="text-slate-400"/> 來源文件 (PDF)
             </div>
             <select 
               value={sourceLang}
               onChange={(e) => setSourceLang(e.target.value)}
               className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-700 border-none outline-none cursor-pointer hover:bg-slate-300 transition-colors"
             >
               {sourceOptions.map(lang => (
                 <option key={lang.id} value={lang.id}>{lang.label}</option>
               ))}
             </select>
          </div>
          <div className="flex-1 bg-slate-100 m-4 rounded border border-dashed border-slate-300 flex items-center justify-center flex-col text-slate-400 gap-2">
             <FileText size={48} /> <p>PDF Viewer (Source)</p>
          </div>
       </div>
       <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <div className="flex items-center gap-2 font-semibold text-slate-700">
               <Sparkles size={18} className="text-blue-500"/> 翻譯結果
             </div>
             <select 
               value={targetLang}
               onChange={(e) => setTargetLang(e.target.value)}
               className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded border-none outline-none cursor-pointer hover:bg-blue-200 transition-colors"
             >
               {targetOptions.map(lang => (
                 <option key={lang.id} value={lang.id}>{lang.label}</option>
               ))}
             </select>
          </div>
          <div className="flex-1 bg-slate-100 m-4 rounded border border-dashed border-slate-300 flex items-center justify-center flex-col text-slate-400 gap-2">
             <FileText size={48} /> <p>PDF Viewer (Translated)</p>
          </div>
       </div>
    </div>
  );
}
