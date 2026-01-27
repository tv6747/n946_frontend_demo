import React, { useState, useMemo, useEffect } from 'react';
import { 
    FolderOpen, X, FileText, Trash2, Users, Download, 
    MessageSquare, Search, FileCode, File, Info, ArrowLeftRight, 
    ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Bot 
} from 'lucide-react';
import { findNodePath } from '../../utils/helpers';
import { MASTER_FILES, KB_TREE_DATA } from '../../data/mockData';

export function KBManagerPanel({ selectedFolderId, files, bots, selectedFileIds, onSelectionChange, onRemove, onShare, onUpload, onViewDetails, onStartChat, isReadOnly = false, userRole, onRoleChange }) {
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const isSharedFolder = selectedFolderId.startsWith('shared_'); 
  
  // 取得目前所有選取的檔案物件（不分資料夾）
  const selectedFilesObjects = useMemo(() => {
     return MASTER_FILES.filter(f => selectedFileIds.includes(f.id));
  }, [selectedFileIds]);

  // 重置頁碼當資料夾變更
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFolderId]);

  // Pagination Logic
  const totalPages = Math.ceil(files.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFiles = files.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectAll = (e) => {
    // Select all files in CURRENT PAGE
    const currentFileIds = currentFiles.map(f => f.id);
    
    if (e.target.checked) {
      const newSelection = [...new Set([...selectedFileIds, ...currentFileIds])];
      onSelectionChange(newSelection);
    } else {
      const newSelection = selectedFileIds.filter(id => !currentFileIds.includes(id));
      onSelectionChange(newSelection);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedFileIds.includes(id)) {
      onSelectionChange(selectedFileIds.filter(fid => fid !== id));
    } else {
      onSelectionChange([...selectedFileIds, id]);
    }
  };

  const handleRemoveFromSelection = (id) => {
    onSelectionChange(selectedFileIds.filter(fid => fid !== id));
  };

  const handleClearSelection = () => {
    onSelectionChange([]);
  };

  const pathString = useMemo(() => {
    if (isReadOnly) return selectedFolderId;
    const path = findNodePath(KB_TREE_DATA, selectedFolderId);
    return path ? path.join(' > ') : 'Root';
  }, [selectedFolderId, isReadOnly]);

  const getUsedByBots = (fileId) => {
    return bots ? bots.filter(bot => bot.files.includes(fileId)) : [];
  };

  // Check if all items on current page are selected
  const isPageAllSelected = currentFiles.length > 0 && currentFiles.every(f => selectedFileIds.includes(f.id));

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 overflow-hidden">
       {/* 標題與路徑 */}
       <div className="flex flex-col gap-4 mb-4">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                <FolderOpen className="text-yellow-500 flex-shrink-0"/> <span className="truncate">{pathString}</span>
            </h2>
         </div>
         
         {!isReadOnly && (
           <div className="h-10 flex items-center justify-between">
             <div className="flex items-center gap-3">
                {selectedFileIds.length > 0 ? (
                    // Light Theme Selection Toolbar (Replaced Dark one)
                    <div className="flex items-center gap-3 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm animate-in fade-in duration-200">
                        {/* Close Selection */}
                        <button onClick={handleClearSelection} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={16} />
                        </button>
                        
                        {/* Selected Count with Tooltip */}
                        <div className="relative group">
                           <span className="text-sm font-medium text-slate-700 cursor-help border-b border-dashed border-slate-300 pb-0.5">
                               已選取 {selectedFileIds.length} 個項目
                           </span>
                           
                           {/* Hover Dropdown */}
                           <div className="absolute top-full left-0 mt-4 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left text-slate-800">
                              <div className="p-3 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase tracking-wider flex justify-between items-center">
                                 <span>已選文件清單</span>
                                 <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{selectedFileIds.length}</span>
                              </div>
                              <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                 {selectedFilesObjects.map(file => (
                                    <div key={file.id} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 group/item">
                                       <div className="flex items-center gap-2 min-w-0">
                                          <FileText size={14} className="text-slate-400 flex-shrink-0" />
                                          <span className="text-sm text-slate-700 truncate">{file.name}</span>
                                       </div>
                                       <button 
                                         onClick={(e) => { e.stopPropagation(); handleRemoveFromSelection(file.id); }}
                                         className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                         title="從選取中移除"
                                       >
                                          <Trash2 size={12} />
                                       </button>
                                    </div>
                                 ))}
                              </div>
                              <div className="p-2 bg-slate-50 border-t border-slate-200 rounded-b-xl">
                                 <button onClick={handleClearSelection} className="w-full text-center text-xs text-red-500 hover:text-red-700 hover:bg-red-50 py-1.5 rounded transition-colors">
                                    全部移除
                                 </button>
                              </div>
                              {/* Arrow & Bridge */}
                              <div className="absolute bottom-full left-4 border-8 border-transparent border-b-white"></div>
                              <div className="absolute bottom-full left-0 w-full h-4 bg-transparent"></div> 
                           </div>
                        </div>

                        <div className="w-px h-4 bg-slate-200 mx-1"></div>

                        {/* Actions */}
                        {!isSharedFolder && (
                          <button onClick={onShare} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="分享">
                             <Users size={16} />
                          </button>
                        )}
                        <button onClick={() => alert(`下載 ${selectedFileIds.length} 個檔案`)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="下載">
                             <Download size={16} />
                        </button>
                        
                        {/* Move Button (Admin/Personal only) */}
                        {(userRole === 'admin' || selectedFolderId.startsWith('personal')) && (
                             <button onClick={() => alert("移動檔案功能 (Demo)")} className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="移動">
                                 <ArrowLeftRight size={16} />
                             </button>
                        )}

                        {!isSharedFolder && (userRole === 'admin' || selectedFolderId.startsWith('personal')) && (
                          <button onClick={() => onRemove(selectedFileIds)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="刪除">
                             <Trash2 size={16} />
                          </button>
                        )}
                        
                        <div className="w-px h-4 bg-slate-200 mx-1"></div>

                        <button 
                            onClick={onStartChat}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 font-medium text-xs"
                            title="使用已選文件對話"
                        >
                            <MessageSquare size={16} /> 對話
                        </button>
                    </div>
                ) : (
                   /* When nothing selected, show spacer to prevent layout shift if necessary, but here we just render nothing to keep clean */
                   null
                )}
             </div>

             {/* Right Side: Search (Always Visible) */}
             <div className="flex items-center gap-3">
               <div className="relative">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="搜尋此資料夾..." 
                   className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 w-64 transition-all"
                 />
               </div>
             </div>
           </div>
         )}
       </div>

       <div className="bg-white border border-slate-200 rounded-xl flex-1 flex flex-col shadow-sm overflow-hidden">
         <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest items-center">
            <div className="col-span-1 flex items-center justify-center">
              {!isReadOnly && (
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={isPageAllSelected}
                  onChange={handleSelectAll}
                />
              )}
            </div>
            <div className="col-span-7">檔案名稱</div>
            <div className="col-span-2">大小</div>
            <div className="col-span-2">修改日期</div>
         </div>
         <div className="flex-1 overflow-y-auto custom-scrollbar">
            {currentFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-40">
                <FileCode size={40} className="mb-2" />
                <p className="text-xs">此資料夾尚無文件</p>
              </div>
            ) : (
              currentFiles.map(file => {
                const usedBy = getUsedByBots(file.id);
                const isRowSelected = selectedFileIds.includes(file.id);
                const isShared = file.sharedWith && file.sharedWith.length > 0;
                
                return (
                  <div key={file.id} className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 transition-colors items-center animate-in fade-in duration-200 ${isRowSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}>
                     <div className="col-span-1 flex items-center justify-center">
                       {!isReadOnly && (
                         <input 
                           type="checkbox" 
                           className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                           checked={isRowSelected}
                           onChange={() => handleSelectOne(file.id)}
                         />
                       )}
                     </div>
                     <div className="col-span-7 flex items-center gap-3 min-w-0 group">
                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                           <File size={16} />
                        </div>
                        <span className={`text-sm font-medium truncate ${isRowSelected ? 'text-blue-700' : 'text-slate-700'}`}>{file.name}</span>
                        
                        {/* Always visible Info Button & Status Icons */}
                        <div className="flex items-center gap-1">
                           <button 
                             onClick={() => onViewDetails(file)}
                             className="p-1 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                             title="詳細資料"
                           >
                             <Info size={14} />
                           </button>
                           
                           {/* Status Icons based on logic */}
                           {usedBy.length > 0 && (
                             <span className="text-purple-500" title="被機器人使用"><Bot size={12} /></span>
                           )}
                           {isShared && (
                             <span className="text-green-500" title="已分享給他人"><Users size={12} /></span>
                           )}
                           {file.isSharedByOthers && (
                             <span className="text-orange-500" title="來自他人分享"><ArrowLeftRight size={12} /></span>
                           )}
                        </div>
                     </div>
                     <div className="col-span-2 text-xs text-slate-500">{file.size}</div>
                     <div className="col-span-2 text-xs text-slate-500">{file.date}</div>
                  </div>
                );
              })
            )}
         </div>

         {/* Pagination Footer */}
         <div className="h-12 border-t border-slate-200 bg-slate-50 flex items-center justify-between px-6 flex-shrink-0">
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span>每頁顯示</span>
                    <select 
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="bg-white border border-slate-300 rounded px-1 py-0.5 text-xs outline-none focus:border-blue-400"
                    >
                       <option value={5}>5</option>
                       <option value={10}>10</option>
                       <option value={20}>20</option>
                       <option value={50}>50</option>
                    </select>
                    <span>筆</span>
                 </div>
                 <span className="text-xs text-slate-500">
                    顯示第 {files.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, files.length)} 筆，共 {files.length} 筆
                 </span>
             </div>
             
             <div className="flex items-center gap-2">
                 <button 
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                   className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                 >
                    <ChevronLeftIcon size={16} />
                 </button>
                 <span className="text-xs font-medium text-slate-600">
                    {currentPage} / {totalPages || 1}
                 </span>
                 <button 
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages || totalPages === 0}
                   className="p-1.5 rounded-md hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                 >
                    <ChevronRightIcon size={16} />
                 </button>
             </div>
         </div>
       </div>
    </div>
  );
}
