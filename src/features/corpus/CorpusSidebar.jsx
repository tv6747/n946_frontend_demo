import { UploadCloud, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
export function CorpusSidebar({ pages, selectedPageId, onSelectPage, actionLabel, onAction, actionIcon: Icon }) {
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);
  
  // Default Icon to Upload if not provided, for safety
  const DisplayIcon = Icon || UploadCloud;

  return (
    <div className="flex flex-col h-full bg-white">
        {/* Action Button (Sticky Bottom) */}
        <div className="p-4 border-t border-slate-100">
             <button 
                onClick={onAction}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-500 rounded-lg transition-all text-sm font-medium group shadow-sm"
                title={actionLabel}
              >
                <DisplayIcon size={16} className="group-hover:scale-110 transition-transform"/>
                {actionLabel}
              </button>
        </div>

       {/* Navigation List */}
       <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <div onClick={() => setIsSectionExpanded(!isSectionExpanded)} className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors border-b border-transparent select-none rounded-md">
            <span>語料庫</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isSectionExpanded ? '' : '-rotate-90'}`} />
          </div>
           {isSectionExpanded && (
            <div className="p-2 animate-in slide-in-from-top-2 duration-200">
             {pages.map(page => (
                <div 
                   key={page.id}
                   onClick={() => onSelectPage(page.id)}
                   className={`group px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer flex items-center justify-between transition-all ${
                       selectedPageId === page.id 
                       ? 'bg-blue-50 text-blue-700 shadow-sm' 
                       : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                   }`}
                >
                   <span className="truncate">{page.label}</span>
                   {selectedPageId === page.id && <ChevronRight size={14} className="text-blue-500" />}
                </div>
             ))}
          </div>
           )}
       </div>
    </div>
  );
}
