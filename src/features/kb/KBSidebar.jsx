import React, { useState } from 'react';
import { Plus, UploadCloud, ChevronDown, Bot, Circle } from 'lucide-react';
import { TreeNode } from '../../components/common/TreeNode';

export function KBSidebar({ treeData, selectedFolderId, onSelectFolder, showBotsSection, bots, selectedBotId, onSelectBot, onUpload, files, selectedFileIds, onSelectionChange, onCreateBot }) {
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);
  const [isBotSectionExpanded, setIsBotSectionExpanded] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-3">
      {/* Create Bot Button (Only for Bot Manager Mode) */}
      {onCreateBot && (
        <button 
          onClick={onCreateBot}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-500 rounded-lg transition-all text-sm font-medium mb-4 group shadow-sm flex-shrink-0"
        >
          <Plus size={16} className="group-hover:scale-110 transition-transform"/>
          新增答詢機器人
        </button>
      )}

      {/* Upload Button for KB Manage Mode */}
      {onUpload && (
        <button 
          onClick={onUpload}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-500 rounded-lg transition-all text-sm font-medium mb-4 group shadow-sm flex-shrink-0"
        >
          <UploadCloud size={16} className="group-hover:scale-110 transition-transform"/>
          上傳檔案
        </button>
      )}

      {/* Bot Section */}
      {showBotsSection && (
        <div className="flex-shrink-0 border-b border-slate-100 pb-2 mb-2">
           <div onClick={() => setIsBotSectionExpanded(!isBotSectionExpanded)} className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors border-b border-transparent select-none rounded-md">
            <span>答詢機器人</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isBotSectionExpanded ? '' : '-rotate-90'}`} />
          </div>
           {isBotSectionExpanded && (
            <div className="p-2 animate-in slide-in-from-top-2 duration-200">
               {bots.map(bot => (
                 <div 
                   key={bot.id}
                   onClick={() => onSelectBot(bot.id)}
                   className={`flex items-center gap-3 py-2 px-3 rounded-md cursor-pointer group transition-colors mb-1
                     ${selectedBotId === bot.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}
                   `}
                 >
                    <div className="relative flex-shrink-0">
                       <Bot size={18} className={selectedBotId === bot.id ? 'text-blue-600' : 'text-slate-400'} />
                    </div>
                    <span className={`flex-1 text-sm truncate font-medium ${selectedBotId === bot.id ? 'text-blue-700' : 'text-slate-600'}`}>
                      {bot.name}
                    </span>
                    <Circle 
                      size={10} 
                      className={`${bot.status === 'active' ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500'}`} 
                    />
                 </div>
               ))}
               {bots.length === 0 && <div className="text-xs text-slate-400 text-center py-4">無機器人</div>}
            </div>
           )}
        </div>
      )}

      {/* File Section */}
      <div className="flex-shrink-0 pb-4">
          <div onClick={() => setIsSectionExpanded(!isSectionExpanded)} className="px-2 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors border-b border-transparent select-none rounded-md">
            <span>文件導覽</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isSectionExpanded ? '' : '-rotate-90'}`} />
          </div>
          
           {isSectionExpanded && (
            <div className="p-2 animate-in slide-in-from-top-2 duration-200">
              {treeData.map(node => (
                <TreeNode 
                  key={node.id} 
                  node={node} 
                  selectedFolderId={selectedFolderId} 
                  onSelectFolder={onSelectFolder}
                  files={files}
                  selectedFileIds={selectedFileIds}
                  onSelectionChange={onSelectionChange}
                />
              ))}
            </div>
           )}
      </div>
    </div>
  );
}
