import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { X, Search } from 'lucide-react';
import { KBSidebar } from '../../features/kb/KBSidebar';
import { KBManagerPanel } from '../../features/kb/KBManagerPanel';
import { KB_TREE_DATA, MASTER_FILES, MOCK_FAVORITE_LISTS } from '../../data/mockData';

export function KBFileSelectorModal({ isOpen, onClose, onInsertSelected }) {
  const [selectedFolderId, setSelectedFolderId] = useState('personal'); 
  const [kbSelectedFileIds, setKbSelectedFileIds] = useState([]);
  
  // 常用清單 (Favorite Lists) State
  const [selectedFavListId, setSelectedFavListId] = useState(null);
  const [favSelectedFileIds, setFavSelectedFileIds] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const displayFiles = useMemo(() => {
    let baseFiles = [];
    // 常用清單模式：依據選取的清單的 fileIds 過濾
    if (selectedFavListId) {
      const favList = MOCK_FAVORITE_LISTS.find(l => l.id === selectedFavListId);
      if (favList) {
        baseFiles = MASTER_FILES.filter(f => favList.fileIds.includes(f.id));
      }
    } else {
      baseFiles = MASTER_FILES.filter(f => f.folderId === selectedFolderId);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return baseFiles.filter(f => f.name.toLowerCase().includes(query));
    }

    return baseFiles;
  }, [selectedFolderId, selectedFavListId, searchQuery]);

  const handleSelectFavList = (listId) => {
    setSelectedFavListId(listId);
  };

  const handleFolderSelect = (folderId) => {
    if (selectedFavListId) {
      setSelectedFavListId(null);
    }
    setSelectedFolderId(folderId);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
          <div className="flex-shrink-0 mr-4">
            <h2 className="text-lg font-bold text-slate-800">加入知識庫檔案</h2>
            <p className="text-xs text-slate-500">瀏覽知識庫並選擇要加入對話的文件</p>
          </div>

          <div className="flex-1 max-w-lg mx-auto relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="搜尋目前的資料夾或清單..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
             />
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body - Side by Side KB Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左側 Sidebar */}
          <div className="w-64 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
             <KBSidebar 
                 isSelectorMode={true}
                 treeData={KB_TREE_DATA}
                 selectedFolderId={selectedFolderId}
                 onSelectFolder={handleFolderSelect}
                 files={MASTER_FILES}
                 selectedFileIds={kbSelectedFileIds}
                 onSelectionChange={setKbSelectedFileIds}
                 userRole="user"
                 favoriteLists={MOCK_FAVORITE_LISTS}
                 selectedFavListId={selectedFavListId}
                 onSelectFavList={handleSelectFavList}
                 isFavListMode={!!selectedFavListId}
               />
          </div>

          {/* 右側 Panel */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
             <KBManagerPanel 
                  isSelectorMode={true}
                  selectedFolderId={selectedFolderId}
                  files={displayFiles} 
                  selectedFileIds={kbSelectedFileIds}
                  onSelectionChange={setKbSelectedFileIds}
                  userRole="user"
                  isFavListMode={!!selectedFavListId}
                  favListName={selectedFavListId ? (MOCK_FAVORITE_LISTS.find(l => l.id === selectedFavListId)?.name || '') : ''}
                  isPersonalFolder={selectedFolderId === 'personal' || selectedFolderId.startsWith('personal_')}
                  favSelectedFileIds={favSelectedFileIds}
                  onFavSelectionChange={setFavSelectedFileIds}
                  folderDisplayName={selectedFolderId.split('_').pop() || selectedFolderId}
                  onInsertSelected={onInsertSelected}
                />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
