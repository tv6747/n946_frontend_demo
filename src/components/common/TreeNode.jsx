import React, { useState, useMemo } from 'react';
import { ChevronRight, FolderOpen, Folder } from 'lucide-react';
import { getAllFileIds } from '../../utils/helpers';

export function TreeNode({ node, level = 0, selectedFolderId, onSelectFolder, files, selectedFileIds, onSelectionChange, canModify, onMoveFolder }) {
  const [expanded, setExpanded] = useState(true);
  const isSelected = selectedFolderId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  
  // 計算該資料夾下的檔案數量
  const fileCount = useMemo(() => {
    if (!files) return 0;
    return files.filter(f => f.folderId === node.id).length;
  }, [node.id, files]);

  // Checkbox logic for folder selection
  const folderFileIds = useMemo(() => {
    if (!files) return [];
    return getAllFileIds(node, files);
  }, [node, files]);

  const isChecked = folderFileIds.length > 0 && folderFileIds.every(id => selectedFileIds && selectedFileIds.includes(id));
  const isIndeterminate = folderFileIds.length > 0 && !isChecked && folderFileIds.some(id => selectedFileIds && selectedFileIds.includes(id));

  const handleCheck = (e) => {
    e.stopPropagation();
    if (!onSelectionChange) return;

    if (e.target.checked) {
      // Add all unique IDs
      const newSelection = [...new Set([...(selectedFileIds || []), ...folderFileIds])];
      onSelectionChange(newSelection);
    } else {
      // Remove folder IDs
      const newSelection = (selectedFileIds || []).filter(id => !folderFileIds.includes(id));
      onSelectionChange(newSelection);
    }
  };

  // Drag and Drop Logic
  const handleDragStart = (e) => {
    if (!canModify) return;
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
      if (!canModify) return;
      e.preventDefault(); 
      e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
      if (!canModify || !onMoveFolder) return;
      e.preventDefault();
      const sourceId = e.dataTransfer.getData('text/plain');
      if (sourceId && sourceId !== node.id) {
          onMoveFolder(sourceId, node.id);
      }
  };

  if (node.type !== 'folder') return null;

  return (
    <div className="mb-0.5 select-none">
      <div 
        className={`flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50/50 text-blue-700' : 'text-slate-600'}`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          onSelectFolder(node.id);
          if(hasChildren) setExpanded(!expanded);
        }}
        draggable={canModify}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Folder Selection Checkbox */}
        {files && onSelectionChange && (
          <input 
            type="checkbox"
            className="w-3.5 h-3.5 mr-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={isChecked}
            ref={el => el && (el.indeterminate = isIndeterminate)}
            onClick={(e) => e.stopPropagation()} // Stop expansion toggle
            onChange={handleCheck}
          />
        )}

        <div className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-slate-600" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
           {hasChildren && (
             <ChevronRight size={14} className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
           )}
        </div>
        
        <div className="flex items-center gap-2 text-sm min-w-0 overflow-hidden flex-1 justify-between">
           <div className="flex items-center gap-2 min-w-0">
             {hasChildren && expanded ? <FolderOpen size={16} className="text-yellow-500 flex-shrink-0"/> : <Folder size={16} className="text-yellow-500 flex-shrink-0"/>}
             <span className={`truncate ${isSelected ? 'font-semibold' : 'font-medium'}`}>{node.label}</span>
           </div>
           {fileCount > 0 && (
             <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-blue-200 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
               {fileCount}
             </span>
           )}
        </div>
      </div>
      {hasChildren && expanded && (
        <div className="border-l border-slate-100 ml-[18px]">
          {node.children.map(child => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1} 
              selectedFolderId={selectedFolderId} 
              onSelectFolder={onSelectFolder}
              files={files}
              selectedFileIds={selectedFileIds}
              onSelectionChange={onSelectionChange}
              canModify={canModify}
              onMoveFolder={onMoveFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
