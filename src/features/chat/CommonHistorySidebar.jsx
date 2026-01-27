import React, { useState } from 'react';
import { Plus, ChevronDown, MessageSquare, Archive } from 'lucide-react';
import { MOCK_CHAT_HISTORY, MOCK_ARCHIVES } from '../../data/mockData';

export function CommonHistorySidebar({ currentFeatureId }) {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const [isArchivesExpanded, setIsArchivesExpanded] = useState(true);
  
  const filteredHistory = MOCK_CHAT_HISTORY.filter(h => h.featureId === currentFeatureId);
  const filteredArchives = MOCK_ARCHIVES.filter(a => a.featureId === currentFeatureId);

  const isDraftMode = ['draft_mail', 'draft_hill', 'draft_area', 'draft_decor'].includes(currentFeatureId);
  const isDocTransMode = currentFeatureId === 'doc_trans';

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-3">
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-500 rounded-lg transition-all text-sm font-medium mb-4 group shadow-sm">
        <Plus size={16} className="group-hover:scale-110 transition-transform"/>
        {isDocTransMode ? '新增文件' : '新增對話'}
      </button>

      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar gap-2">
        <div>
          <div onClick={() => setIsHistoryExpanded(!isHistoryExpanded)} className="px-2 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between hover:bg-slate-50 rounded-md cursor-pointer transition-colors select-none">
            <span>歷史紀錄</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isHistoryExpanded ? '' : '-rotate-90'}`} />
          </div>
          {isHistoryExpanded && (
            <div className="mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-4 text-slate-300 text-[10px]">無紀錄</div>
              ) : (
                filteredHistory.map(chat => (
                  <div key={chat.id} className="group flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 cursor-pointer text-slate-600 text-sm transition-colors">
                    <MessageSquare size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <span className="truncate flex-1">{chat.title}</span>
                    <span className="text-[10px] text-slate-300 group-hover:text-slate-400">{chat.time}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {isDraftMode && (
          <div>
            <div onClick={() => setIsArchivesExpanded(!isArchivesExpanded)} className="px-2 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between hover:bg-slate-50 rounded-md cursor-pointer transition-colors select-none">
              <span>存檔</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isArchivesExpanded ? '' : '-rotate-90'}`} />
            </div>
            {isArchivesExpanded && (
              <div className="mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                {filteredArchives.length === 0 ? (
                  <div className="text-center py-4 text-slate-300 text-[10px]">無存檔</div>
                ) : (
                  filteredArchives.map(archive => (
                    <div key={archive.id} className="group flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 cursor-pointer text-slate-600 text-sm transition-colors">
                      <Archive size={16} className="text-slate-400 group-hover:text-blue-500" />
                      <span className="truncate flex-1">{archive.title}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
