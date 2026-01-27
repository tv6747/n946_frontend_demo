import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MessageSquare, Languages, Presentation, Sparkles, Database, Bot, Mail, FileText, AlertTriangle, Hammer, LayoutGrid } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { FEATURES } from '../../data/constants';

const ICON_MAP = {
    INTERACTIVE: <MessageSquare size={16} />,
    DOC_TRANS: <Languages size={16} />,
    PPT_GEN: <Presentation size={16} />,
    PROMPT_OPT: <Sparkles size={16} />,
    KB_MANAGEMENT: <Database size={16} />,
    BOT_MANAGEMENT: <Bot size={16} />,
    BOT_CS: <Bot size={16} />, 
    BOT_DATA: <Bot size={16} />,
    DRAFT_MAIL: <Mail size={16} />,
    DRAFT_HILL: <AlertTriangle size={16} />,
    DRAFT_AREA: <FileText size={16} />,
    DRAFT_DECOR: <Hammer size={16} />
};

export function MainDropdown({ currentFeature, onSelect, features }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Default to all features if not provided (fallback)
  const availableFeatures = features || Object.keys(FEATURES);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (key) => {
    onSelect(key);
    setIsOpen(false);
  };

  // Grouping Logic
  const groups = {
      general: availableFeatures.filter(k => ['INTERACTIVE', 'DOC_TRANS', 'PPT_GEN', 'PROMPT_OPT', 'KB_MANAGEMENT', 'BOT_MANAGEMENT'].includes(k)),
      bots: availableFeatures.filter(k => ['BOT_CS', 'BOT_DATA'].includes(k)),
      drafts: availableFeatures.filter(k => k.startsWith('DRAFT_'))
  };

  const isDocSystem = availableFeatures.some(k => k.startsWith('DRAFT_'));

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg shadow-md transition-all active:scale-95 ${isDocSystem ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        <span className="font-semibold tracking-wide flex items-center gap-2">
            {isDocSystem ? <FileText size={16}/> : <LayoutGrid size={16}/>}
            {isDocSystem ? '智慧公文' : 'GAI 平台'}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
          <div className="py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            
            {groups.general.length > 0 && (
                <>
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider sticky top-0 bg-white">通用功能</div>
                    {groups.general.map(key => (
                        <MenuItem 
                            key={key}
                            label={FEATURES[key].label} 
                            active={currentFeature.id === FEATURES[key].id} 
                            onClick={() => handleItemClick(key)} 
                            icon={ICON_MAP[key]} 
                        />
                    ))}
                </>
            )}

            {groups.bots.length > 0 && (
                <>
                    <div className="my-1 border-t border-slate-100"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider sticky top-0 bg-white">答詢機器人</div>
                    {groups.bots.map(key => (
                        <MenuItem 
                            key={key}
                            label={FEATURES[key].label.replace('答詢機器人 - ', '')} 
                            active={currentFeature.id === FEATURES[key].id} 
                            onClick={() => handleItemClick(key)} 
                            indent
                        />
                    ))}
                </>
            )}

            {groups.drafts.length > 0 && (
                <>
                    {groups.general.length > 0 && <div className="my-1 border-t border-slate-100"></div>}
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider sticky top-0 bg-white">例行函稿</div>
                    {groups.drafts.map(key => (
                        <MenuItem 
                            key={key}
                            label={FEATURES[key].label.replace('例行函稿 - ', '')} 
                            active={currentFeature.id === FEATURES[key].id} 
                            onClick={() => handleItemClick(key)} 
                            indent
                        />
                    ))}
                </>
            )}
            
            {availableFeatures.length === 0 && (
                <div className="p-4 text-center text-slate-400 text-sm">無可用功能</div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
