import { Plus, UploadCloud, ChevronDown, Bot, Circle, FolderPlus, FolderMinus, FolderInput, Trash2 } from 'lucide-react';
import { TreeNode } from '../../components/common/TreeNode';
import { useMemo, useState } from 'react';

export function KBSidebar({ treeData, selectedFolderId, onSelectFolder, showBotsSection, bots, selectedBotId, onSelectBot, onUpload, files, selectedFileIds, onSelectionChange, onCreateBot, userRole = 'user', onMoveFolder, checkable, checkedFolderIds, onCheck }) {
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);
  const [isBotSectionExpanded, setIsBotSectionExpanded] = useState(true);

  // Filter Tree Data based on Role
  const filteredTreeData = useMemo(() => {
     if (userRole === 'admin') {
         // Admin: Hide Personal and Shared
         return treeData.filter(node => node.id !== 'personal' && node.id !== 'shared_root');
     } else {
         // User: Show all (Personal is visible)
         return treeData;
     }
  }, [treeData, userRole]);

  // Check permissions
  const canModify = useMemo(() => {
     if (userRole === 'admin') return true;
     // User can only modify Personal folder and its children
     return selectedFolderId === 'personal' || selectedFolderId.startsWith('personal_'); 
  }, [userRole, selectedFolderId]);

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

      {/* Admin Folder Actions */}
      {userRole === 'admin' && !onCreateBot && (
          <div className="grid grid-cols-3 gap-2 mb-3">
              <button onClick={() => alert("新增資料夾 (Demo)")} className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors" title="新增資料夾">
                  <FolderPlus size={16} className="mb-1 text-blue-500"/>
                  <span className="text-[10px]">新增</span>
              </button>
              <button onClick={() => alert("刪除資料夾 (Demo)")} className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors" title="刪除資料夾">
                  <FolderMinus size={16} className="mb-1 text-red-500"/>
                  <span className="text-[10px]">刪除</span>
              </button>
              <button 
                  onClick={() => alert("查看已刪除檔案 (Demo)")} 
                  className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors" 
                  title="垃圾桶"
              >
                  <Trash2 size={16} className="mb-1 text-slate-500"/>
                  <span className="text-[10px]">垃圾桶</span>
              </button>
          </div>
      )}

      {/* Upload Button for KB Manage Mode */}
      {onUpload && (
        <button 
          onClick={onUpload}
          disabled={!canModify}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-500 rounded-lg transition-all text-sm font-medium mb-4 group shadow-sm flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-500"
          title={!canModify ? "僅限於個人知識庫中操作" : "上傳檔案"}
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
              {filteredTreeData.map(node => (
                <TreeNode 
                  key={node.id} 
                  node={node} 
                  selectedFolderId={selectedFolderId} 
                  onSelectFolder={onSelectFolder}
                  files={files}
                  selectedFileIds={selectedFileIds}
                  onSelectionChange={onSelectionChange}
                  canModify={canModify}
                  onMoveFolder={onMoveFolder}
                  checkable={checkable}
                  checkedFolderIds={checkedFolderIds}
                  onCheck={onCheck}
                />
              ))}
            </div>
           )}
      </div>
    </div>
  );
}
