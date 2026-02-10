import React, { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2 } from 'lucide-react';
import { MOCK_ACCOUNTS, MOCK_TERM_CATEGORIES } from '../../data/mockData';
import { AccountEditPanel } from './AccountEditPanel';

export function AccountManagementPanel() {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [selectedAccount, setSelectedAccount] = useState(null); // null: list, 'NEW': create, object: edit
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (account) => {
    setSelectedAccount(account);
  };

  const handleCreate = () => {
    setSelectedAccount('NEW');
  };

  const handleDelete = (id) => {
    if (window.confirm('確定要刪除此帳號嗎？此動作無法復原。')) {
      setAccounts(prev => prev.filter(acc => acc.id !== id));
    }
  };

  const handleSave = (accountData) => {
    if (selectedAccount === 'NEW') {
        const newAccount = {
            ...accountData,
            id: `u${Date.now()}`,
            role: 'user', // default role
        };
        setAccounts(prev => [...prev, newAccount]);
    } else {
        setAccounts(prev => prev.map(acc => acc.id === selectedAccount.id ? { ...acc, ...accountData } : acc));
    }
    setSelectedAccount(null); // Return to list
  };

  const handleCancel = () => {
      setSelectedAccount(null);
  };

  // Filter Logic
  const filteredAccounts = accounts.filter(acc => {
      const matchesStatus = statusFilter === 'all' || acc.status === statusFilter;
      const matchesOrg = orgFilter === 'all' || acc.orgUnit === orgFilter;
      const matchesSearch = searchQuery.trim() === '' || 
          acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          acc.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          acc.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesOrg && matchesSearch;
  });

  const getOrgName = (id) => {
      const org = MOCK_TERM_CATEGORIES.find(c => String(c.id) === String(id));
      return org ? org.name : 'Unknown';
  };

  if (selectedAccount) {
      return (
          <AccountEditPanel 
              account={selectedAccount} 
              onSave={handleSave} 
              onCancel={handleCancel} 
          />
      );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in duration-300">
      
      {/* Header with Search & Filters */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4 sticky top-0 z-10 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 group max-w-md">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
             <input 
                 type="text" 
                 placeholder="搜尋帳號、姓名或信箱..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
             />
        </div>

        <div className="flex items-center gap-3">
             {/* Org Filter */}
             <div className="relative min-w-[160px]">
                 <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none" />
                 <select 
                    value={orgFilter}
                    onChange={(e) => setOrgFilter(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer font-medium text-slate-600"
                 >
                     <option value="all">所有組織</option>
                     {MOCK_TERM_CATEGORIES.map(org => (
                         <option key={org.id} value={org.id}>{org.name}</option>
                     ))}
                 </select>
             </div>

             {/* Status Filter */}
             <div className="relative min-w-[140px]">
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer font-medium text-slate-600"
                >
                    <option value="all">所有狀態</option>
                    <option value="active">啟用中</option>
                    <option value="inactive">已停用</option>
                </select>
             </div>

            <button 
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm text-sm whitespace-nowrap"
            >
              <Plus size={16} />
              新增帳號
            </button>
        </div>
      </header>



      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <th className="px-6 py-3 font-medium w-16">序號</th>
                        <th className="px-6 py-3 font-medium">帳號 / 姓名</th>
                        <th className="px-6 py-3 font-medium">組織單位</th>
                        <th className="px-6 py-3 font-medium">電子信箱</th>
                        <th className="px-6 py-3 font-medium">更新時間</th>
                        <th className="px-6 py-3 font-medium text-center">狀態</th>
                        <th className="px-6 py-3 font-medium text-right">功能</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredAccounts.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-6 py-8 text-center text-slate-400 text-sm italic">
                                查無符合條件的帳號
                            </td>
                        </tr>
                    ) : (
                        filteredAccounts.map((acc, index) => (
                            <tr key={acc.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 text-slate-500 font-mono align-top">
                                    {(index + 1).toString().padStart(2, '0')}
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-800 text-base">{acc.username}</span>
                                        <span className="text-xs text-slate-500 mt-0.5">{acc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                       {getOrgName(acc.orgUnit)}
                                   </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 font-sans">
                                    {acc.email}
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-400 tabular-nums">
                                    {acc.updatedAt}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2 gap-1.5 py-0.5 rounded text-xs font-medium border ${
                                        acc.status === 'active' 
                                        ? 'bg-green-50 text-green-700 border-green-200' 
                                        : 'bg-slate-100 text-slate-500 border-slate-200'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${acc.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                        {acc.status === 'active' ? '啟用' : '停用'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEdit(acc)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            title="編輯"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(acc.id)}
                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="刪除"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        <div className="mt-4 text-xs text-slate-400 text-right">
            顯示 {filteredAccounts.length} / {accounts.length} 筆資料
        </div>
      </div>
    </div>
  );
}
