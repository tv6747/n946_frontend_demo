import React, { useState } from 'react';
import { Activity, Database, MessageSquare, BarChart2, Search, Calendar, ChevronDown, ChevronRight, FileText, User } from 'lucide-react';
import { MOCK_AUDIT_KB_LOGS, MOCK_AUDIT_CHAT_LOGS, MOCK_ADMIN_STATS } from '../../data/mockData';

export function AuditManagement({ activeView = 'kb_logs' }) { // Accept prop
  return (
    <div className="flex h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Main Content Rendered Directly based on Prop */}
      <div className="flex-1 overflow-hidden h-full flex flex-col">
          {activeView === 'kb_logs' && <KBLogView />}
          {activeView === 'chat_records' && <ChatLogView />}
          {activeView === 'stats' && <StatsView />}
      </div>
    </div>
  );
}

function KBLogView() {
    const [expandedRow, setExpandedRow] = useState(null);
    return (
        <div className="flex flex-col h-full">
            <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between gap-4">
                <div className="flex gap-3 flex-1">
                     <div className="relative w-48">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="搜尋..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="date" className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-500" />
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium w-10"></th>
                                <th className="px-6 py-3 font-medium">時間</th>
                                <th className="px-6 py-3 font-medium">動作類型</th>
                                <th className="px-6 py-3 font-medium">目標物件</th>
                                <th className="px-6 py-3 font-medium">修改帳號</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_AUDIT_KB_LOGS.map(log => (
                                <React.Fragment key={log.id}>
                                    <tr 
                                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${expandedRow === log.id ? 'bg-slate-50' : ''}`}
                                        onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                                    >
                                        <td className="px-6 py-3 text-slate-400">
                                            <ChevronRight size={16} className={`transition-transform duration-200 ${expandedRow === log.id ? 'rotate-90' : ''}`} />
                                        </td>
                                        <td className="px-6 py-3 font-mono text-slate-500 text-xs">{log.time}</td>
                                        <td className="px-6 py-3 flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                                log.action === 'upload' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                log.action === 'delete' ? 'bg-red-50 text-red-600 border-red-100' :
                                                'bg-blue-50 text-blue-600 border-blue-100'
                                            }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-slate-700 font-medium">
                                            <div className="flex items-center gap-2">
                                                {log.targetType === 'folder' ? <div className="text-yellow-500"><Database size={14} /></div> : <div className="text-slate-400"><FileText size={14} /></div>}
                                                {log.target}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                    {log.user.charAt(0)}
                                                </div>
                                                {log.user}
                                                <span className="text-slate-400 text-xs">({log.dept})</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRow === log.id && (
                                        <tr className="bg-slate-50/50">
                                            <td colSpan={5} className="px-6 py-4 pl-16 border-t border-slate-100">
                                                <div className="text-xs text-slate-500 font-mono bg-white border border-slate-200 rounded p-3 shadow-sm">
                                                    <p className="font-bold text-slate-700 mb-1">詳細紀錄:</p>
                                                    {log.details}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function ChatLogView() {
    const [expandedRow, setExpandedRow] = useState(null);
    return (
        <div className="flex flex-col h-full">
            <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between gap-4">
                <div className="flex gap-3 flex-1">
                     <div className="relative w-48">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="搜尋..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="date" className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-500" />
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6">
                 <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-medium w-10"></th>
                                <th className="px-6 py-3 font-medium">時間</th>
                                <th className="px-6 py-3 font-medium">應用類型</th>
                                <th className="px-6 py-3 font-medium">對話標題</th>
                                <th className="px-6 py-3 font-medium">使用者</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_AUDIT_CHAT_LOGS.map(log => (
                                <React.Fragment key={log.id}>
                                    <tr 
                                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${expandedRow === log.id ? 'bg-slate-50' : ''}`}
                                        onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                                    >
                                        <td className="px-6 py-3 text-slate-400">
                                            <ChevronRight size={16} className={`transition-transform duration-200 ${expandedRow === log.id ? 'rotate-90' : ''}`} />
                                        </td>
                                        <td className="px-6 py-3 font-mono text-slate-500 text-xs">{log.time}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border ${
                                                log.appType.includes('GAI') ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                                            }`}>
                                                {log.appType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-slate-700 font-medium">{log.title}</td>
                                        <td className="px-6 py-3 text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <User size={14} className="text-slate-400" />
                                                {log.user}
                                                <span className="text-slate-400 text-xs">({log.dept})</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRow === log.id && (
                                        <tr className="bg-slate-50/50">
                                            <td colSpan={5} className="px-6 py-4 pl-16 border-t border-slate-100">
                                                <div className="text-xs text-slate-600 font-mono bg-white border border-slate-200 rounded p-4 shadow-sm whitespace-pre-wrap leading-relaxed">
                                                    {log.content}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
}

function StatsView() {
    return (
        <div className="flex flex-col h-full overflow-y-auto">
             <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between gap-4">
                 <div className="flex gap-2">
                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none">
                        <option>過去 7 天</option>
                        <option>過去 30 天</option>
                    </select>
                </div>
             </header>
             <div className="p-6 grid grid-cols-2 gap-6">
                 
                 {/* CSS Only Bar Chart: Model Usage */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                     <h4 className="font-bold text-slate-700 mb-4 text-sm">模型使用次數</h4>
                     <div className="space-y-4">
                         {MOCK_ADMIN_STATS.modelUsage.map((item, idx) => (
                             <div key={idx}>
                                 <div className="flex justify-between text-xs mb-1">
                                     <span className="font-medium text-slate-600">{item.name}</span>
                                     <span className="text-slate-400">{item.value} calls</span>
                                 </div>
                                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-blue-500 rounded-full" 
                                        style={{ width: `${(item.value / 5000) * 100}%` }}
                                     ></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* CSS Only Bar Chart: App Usage */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                     <h4 className="font-bold text-slate-700 mb-4 text-sm">應用使用次數</h4>
                     <div className="space-y-4">
                         {MOCK_ADMIN_STATS.appUsage.map((item, idx) => (
                             <div key={idx}>
                                 <div className="flex justify-between text-xs mb-1">
                                     <span className="font-medium text-slate-600">{item.name}</span>
                                     <span className="text-slate-400">{item.value} uses</span>
                                 </div>
                                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-emerald-500 rounded-full" 
                                        style={{ width: `${(item.value / 6000) * 100}%` }}
                                     ></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* CSS Only Activity Heatmap Style */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-2">
                     <h4 className="font-bold text-slate-700 mb-4 text-sm">每日使用活絡度 (24h)</h4>
                     <div className="flex items-end justify-between h-32 gap-2">
                         {Array.from({ length: 24 }).map((_, i) => {
                             const mockVal = Math.random() * 100;
                             return (
                                 <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                     <div 
                                        className="w-full bg-indigo-500 rounded-t-sm transition-all group-hover:bg-indigo-600 relative"
                                        style={{ height: `${mockVal}%`, opacity: 0.3 + (mockVal/140) }}
                                     >
                                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                             {Math.floor(mockVal * 5)} requests
                                         </div>
                                     </div>
                                     <span className="text-[10px] text-slate-400 font-mono">{i}</span>
                                 </div>
                             );
                         })}
                     </div>
                 </div>
                 
                 {/* Log Table for KB Trend */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-2">
                     <h4 className="font-bold text-slate-700 mb-4 text-sm">知識庫成長趨勢</h4>
                      <div className="flex items-end justify-between h-32 pl-4 border-l border-slate-200 border-b relative">
                          {MOCK_ADMIN_STATS.kbTrend.map((item, idx) => (
                             <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative group px-2">
                                 <div 
                                     className="w-full bg-orange-400 rounded-t-md relative hover:bg-orange-500 transition-colors" 
                                     style={{ height: `${(item.count / 200) * 100}%` }}
                                 >
                                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600">
                                         {item.count}
                                      </div>
                                 </div>
                                 <div className="absolute -bottom-6 text-xs text-slate-500 font-mono">{item.date}</div>
                             </div>
                          ))}
                      </div>
                      <div className="h-6"></div> {/* Spacer for labels */}
                 </div>

             </div>
        </div>
    );
}
