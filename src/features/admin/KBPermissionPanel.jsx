import React, { useState, useMemo } from 'react';
import { Search, Users, Shield, ArrowRight, ChevronsRight, Check, X } from 'lucide-react';
import { TreeNode } from '../../components/common/TreeNode';
import { KB_TREE_DATA, MOCK_USERS } from '../../data/mockData';
import { MOCK_KB_FOLDER_PERMISSIONS } from '../../data/mockServiceData';

export function KBPermissionPanel() {
  const [userSearch, setUserSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [folderSearchTerm, setFolderSearchTerm] = useState('');
  
  const [selectedFolderId, setSelectedFolderId] = useState('org');
  
  // Transfer List states
  const [selectedAvailableIds, setSelectedAvailableIds] = useState([]);

  // Get folder permission data
  const getFolderPermission = (folderId) => {
    return MOCK_KB_FOLDER_PERMISSIONS.find(p => p.folderId === folderId) || {
      folderId,
      assignedUsers: [],
      assignedDepartments: [],
      inheritedFrom: null
    };
  };

  const selectedPermission = getFolderPermission(selectedFolderId);

  // Filter Tree Function (Recursive)
  const filterTreeData = (nodes, term) => {
    if (!term) return nodes;
    return nodes.reduce((acc, node) => {
      const matchesSearch = node.label.toLowerCase().includes(term.toLowerCase());
      const filteredChildren = node.children ? filterTreeData(node.children, term) : [];
      
      if (matchesSearch || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren
        });
      }
      return acc;
    }, []);
  };

  const filteredTreeData = useMemo(() => {
    // Filter out personal and shared folders for admin panel
    const adminTreeData = KB_TREE_DATA.filter(node => 
      node.id !== 'personal' && node.id !== 'shared_root'
    );
    return filterTreeData(adminTreeData, folderSearchTerm);
  }, [folderSearchTerm]);

  // Get unique departments
  const departments = useMemo(() => {
    const depts = MOCK_USERS.filter(u => u.type === 'dept');
    return depts;
  }, []);

  // Get folder by ID (recursive search)
  const getFolderById = (folderId, treeData = KB_TREE_DATA) => {
    for (const node of treeData) {
      if (node.id === folderId) return node;
      if (node.children) {
        const found = getFolderById(folderId, node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedFolder = getFolderById(selectedFolderId);

  // Get folder path (breadcrumb)
  const getFolderPath = (folderId, treeData = KB_TREE_DATA, path = []) => {
    for (const node of treeData) {
      if (node.id === folderId) {
        return [...path, node.label];
      }
      if (node.children) {
        const found = getFolderPath(folderId, node.children, [...path, node.label]);
        if (found.length > path.length) return found;
      }
    }
    return path;
  };

  const folderPath = getFolderPath(selectedFolderId);

  // Get effective permissions (direct + inherited)
  const getEffectivePermissions = (folderId) => {
    const permissions = [];
    const perm = getFolderPermission(folderId);
    
    // Add direct assignments
    perm.assignedUsers.forEach(userId => {
      const user = MOCK_USERS.find(u => u.id === userId);
      if (user) {
        permissions.push({
          id: userId,
          name: user.name,
          type: user.type || 'user',
          isDirect: true,
          source: '直接設定'
        });
      }
    });

    perm.assignedDepartments.forEach(deptId => {
      const dept = MOCK_USERS.find(u => u.id === deptId);
      if (dept) {
        permissions.push({
          id: deptId,
          name: dept.name,
          type: 'dept',
          isDirect: true,
          source: '直接設定'
        });
      }
    });

    // Add inherited permissions
    if (perm.inheritedFrom) {
      const inheritedPerm = getFolderPermission(perm.inheritedFrom);
      const inheritedFolder = getFolderById(perm.inheritedFrom);
      const inheritedFolderName = inheritedFolder ? inheritedFolder.label : perm.inheritedFrom;

      inheritedPerm.assignedUsers.forEach(userId => {
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user && !permissions.find(p => p.id === userId)) {
          permissions.push({
            id: userId,
            name: user.name,
            type: user.type || 'user',
            isDirect: false,
            source: `繼承自「${inheritedFolderName}」`
          });
        }
      });

      inheritedPerm.assignedDepartments.forEach(deptId => {
        const dept = MOCK_USERS.find(u => u.id === deptId);
        if (dept && !permissions.find(p => p.id === deptId)) {
          permissions.push({
            id: deptId,
            name: dept.name,
            type: 'dept',
            isDirect: false,
            source: `繼承自「${inheritedFolderName}」`
          });
        }
      });
    }

    return permissions;
  };

  const effectivePermissions = getEffectivePermissions(selectedFolderId);

  // Filter permissions by search
  const filteredEffectivePermissions = effectivePermissions.filter(perm => {
    return !searchTerm || perm.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Available users/departments (not yet assigned)
  const availableItems = MOCK_USERS.filter(u => {
    const isAssigned = [...selectedPermission.assignedUsers, ...selectedPermission.assignedDepartments].includes(u.id);
    const matchesSearch = u.name.includes(userSearch);
    const matchesDept = departmentFilter === 'all' || u.type === 'dept' && u.id === departmentFilter || u.department === departmentFilter;
    return !isAssigned && matchesSearch && matchesDept;
  });

  // Assigned users/departments
  const assignedItems = MOCK_USERS.filter(u => 
    [...selectedPermission.assignedUsers, ...selectedPermission.assignedDepartments].includes(u.id)
  );

  // Transfer List Handlers
  const toggleSelection = (id) => {
    if (selectedAvailableIds.includes(id)) {
      setSelectedAvailableIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedAvailableIds(prev => [...prev, id]);
    }
  };

  const handleAddSelected = () => {
    if (selectedAvailableIds.length === 0) return;
    selectedAvailableIds.forEach(id => {
      const item = MOCK_USERS.find(u => u.id === id);
      if (item) {
        if (item.type === 'dept') {
          if (!selectedPermission.assignedDepartments.includes(id)) {
            selectedPermission.assignedDepartments.push(id);
          }
        } else {
          if (!selectedPermission.assignedUsers.includes(id)) {
            selectedPermission.assignedUsers.push(id);
          }
        }
      }
    });
    setSelectedAvailableIds([]);
  };

  const handleAddAll = () => {
    availableItems.forEach(item => {
      if (item.type === 'dept') {
        if (!selectedPermission.assignedDepartments.includes(item.id)) {
          selectedPermission.assignedDepartments.push(item.id);
        }
      } else {
        if (!selectedPermission.assignedUsers.includes(item.id)) {
          selectedPermission.assignedUsers.push(item.id);
        }
      }
    });
  };

  const handleRemove = (id) => {
    selectedPermission.assignedUsers = selectedPermission.assignedUsers.filter(i => i !== id);
    selectedPermission.assignedDepartments = selectedPermission.assignedDepartments.filter(i => i !== id);
    // Force re-render by updating state
    setSelectedFolderId(selectedFolderId);
  };


  return (
    <div className="flex flex-col h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center gap-4 flex-shrink-0 sticky top-0 shadow-sm z-10">
         {/* User/Department Search */}
         <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
               type="text" 
               placeholder="搜尋人名及部門..." 
               value={userSearch}
               onChange={(e) => setUserSearch(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
            />
         </div>
         {/* Department Filter */}
         <div className="min-w-[180px]">
            <select 
               value={departmentFilter}
               onChange={(e) => setDepartmentFilter(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            >
                <option value="all">篩選部門</option>
                {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
            </select>
         </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Folder Tree (20%) */}
        <div className="w-[20%] border-r border-slate-200 bg-white flex flex-col min-w-0 overflow-x-auto">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h3 className="text-sm font-bold text-slate-700 mb-2">資料夾結構</h3>
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜尋資料夾..." 
                value={folderSearchTerm}
                onChange={(e) => setFolderSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md pl-7 pr-2 py-1.5 text-xs focus:outline-none focus:border-blue-400 transition-colors" 
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {filteredTreeData.length === 0 ? (
               <div className="text-center py-10 text-slate-400 text-sm">無符合的資料夾</div>
            ) : filteredTreeData.map(node => (
              <TreeNode
                key={node.id}
                node={node}
                selectedFolderId={selectedFolderId}
                onSelectFolder={setSelectedFolderId}
                checkable={false}
              />
            ))}
          </div>
        </div>

        {/* Right Panel - Permission Settings (80%) */}
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Folder Info */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <Shield size={20} className="text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">選取的資料夾</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{folderPath.join(' > ')}</p>
                </div>
              </div>
              {/* Show folder structure */}
              {selectedFolder && selectedFolder.children && selectedFolder.children.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-600 mb-2">子資料夾:</p>
                  <div className="space-y-1 pl-3">
                    {selectedFolder.children.map(child => (
                      <div key={child.id} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                        <span>{child.label}</span>
                        {child.children && child.children.length > 0 && (
                          <span className="text-slate-400">({child.children.length})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Permission Assignment - Transfer List */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">權限設定</h3>
              </div>
              
              <div className="flex-1 flex overflow-hidden">
                  {/* Left: Available */}
                  <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">選擇人員 / 部門</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{availableItems.length}</span>
                      </div>
                      <div className="p-3">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                placeholder="搜尋..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all" 
                            />
                          </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                           <div className="space-y-1">
                               {availableItems.length === 0 ? (
                                   <div className="text-center py-10 text-slate-400 text-sm">無可用項目</div>
                               ) : availableItems.map(item => {
                                   const isSelected = selectedAvailableIds.includes(item.id);
                                   return (
                                       <div 
                                         key={item.id}
                                         onClick={() => toggleSelection(item.id)} 
                                         className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border border-transparent
                                            ${isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                                         `}
                                       >
                                           <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                                               {isSelected && <Check size={10} />}
                                           </div>
                                            <div className="flex-1 min-w-0 flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${item.type === 'dept' ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-600'}`}>
                                                     {item.type === 'dept' ? 'D' : item.name[0]}
                                                </div>
                                                <div className="text-sm font-medium text-slate-700 truncate">{item.name}</div>
                                            </div>
                                       </div>
                                   )
                               })}
                           </div>
                      </div>
                  </div>

                  {/* Center: Actions */}
                  <div className="w-16 bg-slate-50 border-x border-slate-200 flex flex-col items-center justify-center gap-3 p-2 z-10">
                      <button 
                        onClick={handleAddSelected}
                        disabled={selectedAvailableIds.length === 0}
                        className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                        title="加入選取"
                      >
                          <ArrowRight size={18} />
                      </button>
                      <button 
                         onClick={handleAddAll}
                         className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all"
                         title="加入全部"
                      >
                          <ChevronsRight size={18} />
                      </button>
                  </div>

                  {/* Right: Assigned */}
                  <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                          <span className="text-sm font-semibold text-slate-700">已授權項目</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{assignedItems.length}</span>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                          <div className="space-y-1">
                               {assignedItems.length === 0 ? (
                                   <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                       <Users size={32} className="mb-2 opacity-50" />
                                       <p className="text-xs">尚未設定權限</p>
                                   </div>
                               ) : assignedItems.map(item => (
                                   <div key={item.id} className="flex items-center p-2 rounded-lg bg-white border border-slate-100 hover:border-blue-200 transition-colors group">
                                       <div className={`w-8 h-8 rounded flex items-center justify-center mr-3 font-bold text-xs ${item.type === 'dept' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                          {item.type === 'dept' ? 'DEPT' : 'USER'}
                                       </div>
                                       <div className="flex-1 min-w-0">
                                           <div className="text-sm font-medium text-slate-700 truncate">{item.name}</div>
                                       </div>
                                       <button 
                                         onClick={() => handleRemove(item.id)}
                                         className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                                       >
                                           <X size={16} />
                                       </button>
                                   </div>
                               ))}
                          </div>
                      </div>
                  </div>
              </div>
            </section>

            {/* Effective Permissions List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h4 className="text-sm font-bold text-slate-700 mb-3">有效權限列表</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">類型</th>
                      <th className="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">姓名 / 部門</th>
                      <th className="px-4 py-2 text-left text-xs font-bold text-slate-600 uppercase">權限來源</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEffectivePermissions.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center text-sm text-slate-400">
                          無有效權限
                        </td>
                      </tr>
                    ) : filteredEffectivePermissions.map((perm, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${perm.type === 'dept' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                            {perm.type === 'dept' ? '部門' : '使用者'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">{perm.name}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${perm.isDirect ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                            {perm.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
