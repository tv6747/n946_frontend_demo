import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
    FolderOpen, X, FileText, Trash2, Users, Download, 
    MessageSquare, Search, FileCode, File, Info, ArrowLeftRight, 
    ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Bot,
    List, Pencil, Check, ListPlus, MinusCircle
} from 'lucide-react';
import { findNodePath } from '../../utils/helpers';
import { MASTER_FILES, KB_TREE_DATA } from '../../data/mockData';

/**
 * KBManagerPanel - 知識庫管理面板
 * 
 * 【業務邏輯說明 - 常用清單模式】
 * 當 isFavListMode=true 時，此面板顯示的是「常用清單」中的文件。
 * 此清單資料庫僅儲存文件的 ID，在此清單中的任何移除或修改操作，
 * 皆不會影響或刪除到原本的文件實體。
 * 
 * 【狀態獨立性】
 * 「常用清單」的文件勾選狀態 (favSelectedFileIds) 與「文件導覽」的勾選狀態 (selectedFileIds)
 * 完全獨立，互不影響。
 */
export function KBManagerPanel({ 
  selectedFolderId, files, bots, selectedFileIds, onSelectionChange, 
  onRemove, onShare, onUpload, onViewDetails, onStartChat, 
  isReadOnly = false, userRole, onRoleChange, 
  isFavListMode = false, favListName = '', onFavListNameChange,
  isPersonalFolder = false,
  onOpenAddToListModal,
  onRemoveFromFavList,
  favSelectedFileIds = [], onFavSelectionChange,
  folderDisplayName = '', onFolderNameChange
}) {
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Inline edit state for favorite list name
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(favListName);
  const nameInputRef = useRef(null);

  // Inline edit state for folder name (個人知識庫)
  const [isEditingFolderName, setIsEditingFolderName] = useState(false);
  const [editFolderNameValue, setEditFolderNameValue] = useState(folderDisplayName);
  const folderNameInputRef = useRef(null);

  const isSharedFolder = selectedFolderId.startsWith('shared_'); 
  
  // 根據模式使用不同的勾選狀態
  const activeSelectedIds = isFavListMode ? favSelectedFileIds : selectedFileIds;
  const activeOnSelectionChange = isFavListMode ? onFavSelectionChange : onSelectionChange;

  // 取得目前所有選取的檔案物件（不分資料夾）
  const selectedFilesObjects = useMemo(() => {
     return MASTER_FILES.filter(f => activeSelectedIds.includes(f.id));
  }, [activeSelectedIds]);

  // 重置頁碼當資料夾變更 or 切換到常用清單
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFolderId, isFavListMode]);

  // Sync edit name value when favListName changes externally
  useEffect(() => {
    setEditNameValue(favListName);
    setIsEditingName(false);
  }, [favListName]);

  // Sync folder name value when folder changes
  useEffect(() => {
    setEditFolderNameValue(folderDisplayName);
    setIsEditingFolderName(false);
  }, [folderDisplayName]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
    if (isEditingFolderName && folderNameInputRef.current) {
      folderNameInputRef.current.focus();
      folderNameInputRef.current.select();
    }
  }, [isEditingName, isEditingFolderName]);

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
    const currentFileIds = currentFiles.map(f => f.id);
    if (e.target.checked) {
      const newSelection = [...new Set([...activeSelectedIds, ...currentFileIds])];
      activeOnSelectionChange(newSelection);
    } else {
      const newSelection = activeSelectedIds.filter(id => !currentFileIds.includes(id));
      activeOnSelectionChange(newSelection);
    }
  };

  const handleSelectOne = (id) => {
    if (activeSelectedIds.includes(id)) {
      activeOnSelectionChange(activeSelectedIds.filter(fid => fid !== id));
    } else {
      activeOnSelectionChange([...activeSelectedIds, id]);
    }
  };

  const handleRemoveFromSelection = (id) => {
    activeOnSelectionChange(activeSelectedIds.filter(fid => fid !== id));
  };

  const handleClearSelection = () => {
    activeOnSelectionChange([]);
  };

  const pathString = useMemo(() => {
    if (isFavListMode) return favListName;
    if (isReadOnly) return selectedFolderId;
    const path = findNodePath(KB_TREE_DATA, selectedFolderId);
    return path ? path.join(' > ') : 'Root';
  }, [selectedFolderId, isReadOnly, isFavListMode, favListName]);

  const getUsedByBots = (fileId) => {
    return bots ? bots.filter(bot => bot.files.includes(fileId)) : [];
  };

  // Check if all items on current page are selected
  const isPageAllSelected = currentFiles.length > 0 && currentFiles.every(f => activeSelectedIds.includes(f.id));

  // Handle inline edit confirm
  const handleNameEditConfirm = () => {
    const trimmed = editNameValue.trim();
    if (trimmed && trimmed !== favListName && onFavListNameChange) {
      onFavListNameChange(trimmed);
    } else {
      setEditNameValue(favListName);
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNameEditConfirm();
    } else if (e.key === 'Escape') {
      setEditNameValue(favListName);
      setIsEditingName(false);
    }
  };

  // Handle folder name inline edit confirm
  const handleFolderNameEditConfirm = () => {
    const trimmed = editFolderNameValue.trim();
    if (trimmed && trimmed !== folderDisplayName && onFolderNameChange) {
      onFolderNameChange(trimmed);
    } else {
      setEditFolderNameValue(folderDisplayName);
    }
    setIsEditingFolderName(false);
  };

  const handleFolderNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFolderNameEditConfirm();
    } else if (e.key === 'Escape') {
      setEditFolderNameValue(folderDisplayName);
      setIsEditingFolderName(false);
    }
  };

  // ===== Shared Tooltip Dropdown Component =====
  const renderSelectedTooltip = () => {
    if (activeSelectedIds.length === 0) return null;
    return (
      <div className="absolute top-full left-0 mt-4 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left text-slate-800">
        <div className="p-3 border-b border-slate-100 font-bold text-xs text-slate-500 uppercase tracking-wider flex justify-between items-center">
           <span>已選文件清單</span>
           <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{activeSelectedIds.length}</span>
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
        <div className="absolute bottom-full left-4 border-8 border-transparent border-b-white"></div>
        <div className="absolute bottom-full left-0 w-full h-4 bg-transparent"></div> 
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 overflow-hidden">
       {/* 標題與路徑 */}
       <div className="flex flex-col gap-4 mb-4">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                {isFavListMode ? (
                  <>
                    {/* 常用清單模式：清單圖示 + 可編輯清單名稱 + 鉛筆常駐顯示 */}
                    <List className="text-amber-500 flex-shrink-0" />
                    {isEditingName ? (
                      <div className="flex items-center gap-2">
                        <input
                          ref={nameInputRef}
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          onBlur={handleNameEditConfirm}
                          onKeyDown={handleNameKeyDown}
                          className="text-2xl font-bold text-slate-800 bg-white border border-blue-400 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                          style={{ minWidth: '200px' }}
                        />
                        <button 
                          onClick={handleNameEditConfirm}
                          className="p-1 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="確認"
                        >
                          <Check size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsEditingName(true)}>
                        <span className="truncate border-b border-dashed border-slate-300 hover:border-slate-500 transition-colors">{favListName}</span>
                        {/* 鉛筆按鈕常駐顯示 */}
                        <Pencil size={14} className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0" />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* 文件導覽模式：資料夾圖示 + 路徑（個人知識庫支援行內編輯） */}
                    <FolderOpen className="text-yellow-500 flex-shrink-0"/> 
                    {isPersonalFolder && isEditingFolderName ? (
                      <div className="flex items-center gap-2">
                        <input
                          ref={folderNameInputRef}
                          type="text"
                          value={editFolderNameValue}
                          onChange={(e) => setEditFolderNameValue(e.target.value)}
                          onBlur={handleFolderNameEditConfirm}
                          onKeyDown={handleFolderNameKeyDown}
                          className="text-2xl font-bold text-slate-800 bg-white border border-blue-400 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                          style={{ minWidth: '200px' }}
                        />
                        <button 
                          onClick={handleFolderNameEditConfirm}
                          className="p-1 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="確認"
                        >
                          <Check size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="truncate">{pathString}</span>
                        {isPersonalFolder && (
                          <button 
                            onClick={() => setIsEditingFolderName(true)}
                            className="p-1 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors flex-shrink-0"
                            title="編輯資料夾名稱"
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
            </h2>
         </div>
         
         {!isReadOnly && (
           <div className="h-10 flex items-center justify-between">
             <div className="flex items-center gap-3">
                {/* ===== 工具列：兩種模式皆常駐顯示 ===== */}
                <div className="flex items-center gap-3 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                    {/* Close Selection - only show when items selected */}
                    {activeSelectedIds.length > 0 && (
                      <button onClick={handleClearSelection} className="text-slate-400 hover:text-slate-600 transition-colors">
                          <X size={16} />
                      </button>
                    )}
                    
                    {/* Selected Count with Tooltip */}
                    <div className="relative group">
                       <span className="text-sm font-medium text-slate-700 cursor-help border-b border-dashed border-slate-300 pb-0.5">
                           已選取 {activeSelectedIds.length} 個項目
                       </span>
                       {renderSelectedTooltip()}
                    </div>

                    <div className="w-px h-4 bg-slate-200 mx-1"></div>

                    {isFavListMode ? (
                      /* ===== 常用清單模式：下載 + 從清單移除 ===== */
                      <>
                        <button 
                          onClick={() => alert(`下載 ${activeSelectedIds.length} 個檔案`)} 
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="下載"
                        >
                          <Download size={16} />
                        </button>
                        {/* 從清單移除按鈕：僅勾選時可用 */}
                        {activeSelectedIds.length > 0 && (
                          <button 
                            onClick={() => onRemoveFromFavList && onRemoveFromFavList(activeSelectedIds)}
                            className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                            title="從清單移除（不影響原始文件）"
                          >
                            <MinusCircle size={16} />
                          </button>
                        )}
                      </>
                    ) : (
                      /* ===== 文件導覽模式：原始工具按鈕 + 加入清單 ===== */
                      <>
                        {/* 加入清單 */}
                        {activeSelectedIds.length > 0 && (
                          <button 
                            onClick={() => onOpenAddToListModal && onOpenAddToListModal()}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="加入常用清單"
                          >
                            <ListPlus size={16} />
                          </button>
                        )}

                        {/* 分享 */}
                        {activeSelectedIds.length > 0 && !isSharedFolder && (userRole === 'admin' || selectedFolderId.startsWith('personal')) && (
                          <button onClick={onShare} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="分享">
                             <Users size={16} />
                          </button>
                        )}

                        {/* 下載 */}
                        <button 
                          onClick={() => alert(`下載 ${activeSelectedIds.length} 個檔案`)} 
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                          title="下載"
                        >
                          <Download size={16} />
                        </button>

                        {/* 刪除 */}
                        {activeSelectedIds.length > 0 && !isSharedFolder && (userRole === 'admin' || selectedFolderId.startsWith('personal')) && (
                          <button onClick={() => onRemove(activeSelectedIds)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="刪除">
                             <Trash2 size={16} />
                          </button>
                        )}
                        
                        {/* 問答 */}
                        {activeSelectedIds.length > 0 && (
                          <>
                            <div className="w-px h-4 bg-slate-200 mx-1"></div>
                            <button 
                                onClick={onStartChat}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 font-medium text-xs"
                                title="使用已選文件問答"
                            >
                                <MessageSquare size={16} /> 問答
                            </button>
                          </>
                        )}
                      </>
                    )}
                </div>
             </div>

             {/* Right Side: Search (Always Visible) */}
             <div className="flex items-center gap-3">
               <div className="relative">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder={isFavListMode ? "搜尋此清單..." : "搜尋此資料夾..."} 
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
                <p className="text-xs">{isFavListMode ? '此清單尚無文件' : '此資料夾尚無文件'}</p>
              </div>
            ) : (
              currentFiles.map(file => {
                const usedBy = getUsedByBots(file.id);
                const isRowSelected = activeSelectedIds.includes(file.id);
                const isShared = file.sharedWith && file.sharedWith.length > 0;
                
                const handleFileDragStart = (e, fileId) => {
                    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'files', ids: [fileId] }));
                    e.dataTransfer.effectAllowed = 'move';
                };

                return (
                  <div 
                    key={file.id} 
                    draggable={!isReadOnly && !isFavListMode && (userRole === 'admin' || selectedFolderId.startsWith('personal'))}
                    onDragStart={(e) => handleFileDragStart(e, file.id)}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 transition-colors items-center animate-in fade-in duration-200 ${isRowSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}
                  >
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
                        
                        <div className="flex items-center gap-1">
                           <button 
                             onClick={() => onViewDetails(file)}
                             className="p-1 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                             title="詳細資料"
                           >
                             <Info size={14} />
                           </button>
                           
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
