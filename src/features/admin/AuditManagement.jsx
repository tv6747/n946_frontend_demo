import React, { useState } from 'react';
import { Activity, Database, MessageSquare, BarChart2, Search, Calendar, ChevronDown, ChevronRight, FileText, User, Settings, UserPlus, Pencil, Trash2, Upload, Power, FolderPlus } from 'lucide-react';
import { MOCK_AUDIT_KB_LOGS, MOCK_AUDIT_CHAT_LOGS, MOCK_ADMIN_STATS, MOCK_TERM_CATEGORIES, MOCK_ADMIN_APPS, MOCK_BOTS } from '../../data/mockData';
import { MOCK_LLM_MODELS } from '../../data/mockLLMData';

export function AuditManagement({ activeView = 'kb_logs' }) { // Accept prop
  return (
    <div className="flex h-full bg-slate-50 w-full animate-in fade-in duration-300">
      {/* Main Content Rendered Directly based on Prop */}
      <div className="flex-1 overflow-hidden h-full flex flex-col">
          {activeView === 'kb_logs' && <KBLogView />}
          {activeView === 'chat_records' && <ChatLogView />}
          {activeView === 'stats' && <StatsView />}
          {activeView === 'kb_stats' && <KBStatsView />}
      </div>
    </div>
  );
}

function KBLogView() {
    const [expandedRow, setExpandedRow] = useState(null);
    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex gap-3 flex-1">
                     <div className="relative w-64 group">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input type="text" placeholder="搜尋..." className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400" />
                    </div>
                    <div className="relative group">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input type="date" className="bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-600 appearance-none" />
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                                <th className="px-6 py-3 font-medium w-10"></th>
                                <th className="px-6 py-3 font-medium">時間</th>
                                <th className="px-6 py-3 font-medium">操作模組</th>
                                <th className="px-6 py-3 font-medium">動作類型</th>
                                <th className="px-6 py-3 font-medium">目標物件</th>
                                <th className="px-6 py-3 font-medium">操作帳號</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_AUDIT_KB_LOGS.map(log => (
                                <React.Fragment key={log.id}>
                                    <tr 
                                        className={`group hover:bg-slate-50 cursor-pointer transition-colors ${expandedRow === log.id ? 'bg-slate-50' : ''}`}
                                        onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                                    >
                                        <td className="px-6 py-4 align-top text-slate-400">
                                            <ChevronRight size={16} className={`transition-transform duration-200 ${expandedRow === log.id ? 'rotate-90' : ''}`} />
                                        </td>
                                        <td className="px-6 py-4 align-top font-mono text-slate-600 text-sm">{log.time}</td>
                                        <td className="px-6 py-4 align-top">
                                            <span className="px-2.5 py-1 rounded text-xs font-bold tracking-wide border bg-slate-50 text-slate-600 border-slate-200">
                                                {log.module}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wide border ${
                                                log.action === '新增' || log.action === '建立' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                log.action === '刪除' || log.action === '停用' ? 'bg-red-50 text-red-600 border-red-100' :
                                                log.action === '上傳' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                log.action === '修改' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-slate-50 text-slate-600 border-slate-200'
                                            }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-top text-slate-700 font-medium">
                                            <div className="flex items-center gap-2">
                                                {log.targetType === 'folder' ? <div className="text-yellow-500"><Database size={14} /></div> : 
                                                 log.targetType === 'file' ? <div className="text-slate-400"><FileText size={14} /></div> :
                                                 log.targetType === 'account' ? <div className="text-blue-500"><User size={14} /></div> :
                                                 log.targetType === 'app' ? <div className="text-emerald-500"><Settings size={14} /></div> :
                                                 log.targetType === 'prompt' ? <div className="text-purple-500"><MessageSquare size={14} /></div> :
                                                 log.targetType === 'model' ? <div className="text-orange-500"><Activity size={14} /></div> :
                                                 <div className="text-slate-400"><FileText size={14} /></div>}
                                                {log.target}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                                    {log.user.charAt(0)}
                                                </div>
                                                <span className="text-sm">{log.user}</span>
                                                <span className="text-slate-400 text-sm">({log.dept})</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRow === log.id && (
                                        <tr className="bg-slate-50/50">
                                            <td colSpan={6} className="px-6 py-4 pl-16 border-t border-slate-100">
                                                <div className="text-sm text-slate-600 bg-white border border-slate-200 rounded p-4 shadow-sm leading-relaxed">
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
        <div className="flex flex-col h-full bg-slate-50">
            <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex gap-3 flex-1">
                    <div className="relative w-64 group">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input type="text" placeholder="搜尋..." className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400" />
                    </div>
                    <div className="relative group">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input type="date" className="bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-600 appearance-none" />
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
                 <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
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
                                        className={`group hover:bg-slate-50 cursor-pointer transition-colors ${expandedRow === log.id ? 'bg-slate-50' : ''}`}
                                        onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                                    >
                                        <td className="px-6 py-4 align-top text-slate-400">
                                            <ChevronRight size={16} className={`transition-transform duration-200 ${expandedRow === log.id ? 'rotate-90' : ''}`} />
                                        </td>
                                        <td className="px-6 py-4 align-top font-mono text-slate-600 text-sm">{log.time}</td>
                                        <td className="px-6 py-4 align-top">
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wide border ${
                                                log.appType.includes('GAI') ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'
                                            }`}>
                                                {log.appType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-top text-slate-700 font-medium">{log.title}</td>
                                        <td className="px-6 py-4 align-top text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-slate-400" />
                                                <span className="text-sm">{log.user}</span>
                                                <span className="text-slate-400 text-sm">({log.dept})</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRow === log.id && (
                                        <tr className="bg-slate-50/50">
                                            <td colSpan={5} className="px-6 py-4 pl-16 border-t border-slate-100">
                                                <div className="text-sm text-slate-600 bg-white border border-slate-200 rounded p-4 shadow-sm whitespace-pre-wrap leading-relaxed">
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
    // Default date range: 1 month
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(formatDate(oneMonthAgo));
    const [endDate, setEndDate] = useState(formatDate(today));
    const [orgFilter, setOrgFilter] = useState('all');
    const [appFilter, setAppFilter] = useState('all');
    const [queryKey, setQueryKey] = useState(0); // Increment to trigger re-calculation

    // Build app options: apps + bots
    const appOptions = [
        ...MOCK_ADMIN_APPS.map(a => ({ id: a.id, name: a.name })),
        ...MOCK_BOTS.map(b => ({ id: b.id, name: b.name })),
    ];

    // Generate time-series labels (dates in range)
    const generateDateLabels = () => {
        const labels = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 14) {
            // Show every day
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                labels.push(`${d.getMonth()+1}/${d.getDate()}`);
            }
        } else {
            // Show ~10 evenly spaced points
            const step = Math.max(1, Math.floor(diffDays / 10));
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + step)) {
                labels.push(`${d.getMonth()+1}/${d.getDate()}`);
            }
        }
        return labels.slice(0, 12); // Cap at 12 labels
    };
    const dateLabels = generateDateLabels();

    // Seeded random to avoid re-render flicker
    const seededRandom = (seed) => {
        let x = Math.sin(seed * 9301 + 49297) * 49297;
        return x - Math.floor(x);
    };

    // Category definitions for each chart
    const deptCategories = MOCK_TERM_CATEGORIES.slice(0, 5).map(c => c.name); // Top 5 depts
    const appCategories = [...MOCK_ADMIN_APPS.slice(0, 4).map(a => a.name), ...MOCK_BOTS.map(b => b.name)]; // 4 apps + 2 bots
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const modelCategories = React.useMemo(() => MOCK_LLM_MODELS.filter(m => m.status === 'active' && m.type !== 'embedding').map(m => m.name), [queryKey]); // Active models
    const tokenModelCategories = modelCategories;

    const CHART_COLORS = [
        'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500', 
        'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const LEGEND_DOTS = [
        'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500', 
        'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500', 'bg-teal-500'
    ];

    // Generate stacked data: each date has an array of { name, value, color }
    const generateStackedData = (labels, categories, baseSeed, maxPerCat) => {
        return labels.map((label, i) => ({
            label,
            segments: categories.map((cat, ci) => ({
                name: cat,
                value: Math.floor(seededRandom(baseSeed + i * 100 + ci * 17) * maxPerCat) + Math.floor(maxPerCat * 0.05),
                color: CHART_COLORS[ci % CHART_COLORS.length],
                legendDot: LEGEND_DOTS[ci % LEGEND_DOTS.length],
            }))
        }));
    };

    const deptUsageData = generateStackedData(dateLabels, deptCategories, 100, 80);
    const appUsageData = generateStackedData(dateLabels, appCategories, 200, 60);
    const modelUsageData = generateStackedData(dateLabels, modelCategories, 300, 120);
    const tokenUsageData = generateStackedData(dateLabels, tokenModelCategories, 400, 30000);

    const formatNumber = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : n.toString();

    const StackedBarChart = ({ title, data, categories, unit }) => {
        // Find max total for scaling
        const maxTotal = Math.max(...data.map(d => d.segments.reduce((sum, s) => sum + s.value, 0)), 1);
        return (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <h4 className="font-bold text-slate-700 mb-2 text-sm">{title}</h4>
                {/* Legend */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                    {categories.map((cat, ci) => (
                        <div key={ci} className="flex items-center gap-1">
                            <div className={`w-2.5 h-2.5 rounded-sm ${LEGEND_DOTS[ci % LEGEND_DOTS.length]}`}></div>
                            <span className="text-[10px] text-slate-500">{cat}</span>
                        </div>
                    ))}
                </div>
                {/* Bars */}
                <div className="flex-1 flex items-end gap-1.5 min-h-[180px]">
                    {data.map((item, idx) => {
                        const total = item.segments.reduce((sum, s) => sum + s.value, 0);
                        return (
                            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                                {/* Hover tooltip: show breakdown */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-lg">
                                    <div className="font-bold mb-0.5">{item.label} — {formatNumber(total)} {unit}</div>
                                    {item.segments.map((seg, si) => (
                                        <div key={si} className="flex items-center gap-1">
                                            <div className={`w-1.5 h-1.5 rounded-sm ${seg.legendDot}`}></div>
                                            <span>{seg.name}: {formatNumber(seg.value)}</span>
                                        </div>
                                    ))}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                </div>
                                {/* Stacked bar */}
                                <div 
                                    className="w-full flex flex-col-reverse rounded-t-sm overflow-hidden transition-all group-hover:opacity-90"
                                    style={{ height: `${(total / maxTotal) * 100}%`, minHeight: '4px' }}
                                >
                                    {item.segments.map((seg, si) => (
                                        <div 
                                            key={si}
                                            className={`w-full ${seg.color}`}
                                            style={{ height: `${(seg.value / total) * 100}%` }}
                                        ></div>
                                    ))}
                                </div>
                                {/* Date label */}
                                <span className="text-[9px] text-slate-400 font-mono mt-1.5 whitespace-nowrap">{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
             {/* Filter Bar */}
             <header className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                 <div className="flex items-center gap-3 flex-wrap">
                    {/* Date Range */}
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-500 whitespace-nowrap">日期區間</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
                        />
                        <span className="text-slate-400 text-sm">—</span>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
                        />
                    </div>

                    {/* Org Filter */}
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-500 whitespace-nowrap">組織</label>
                        <select
                            value={orgFilter}
                            onChange={(e) => setOrgFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600 min-w-[140px]"
                        >
                            <option value="all">全部組織</option>
                            {MOCK_TERM_CATEGORIES.map(org => (
                                <option key={org.id} value={org.id}>{org.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* App Filter */}
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-500 whitespace-nowrap">應用</label>
                        <select
                            value={appFilter}
                            onChange={(e) => setAppFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600 min-w-[140px]"
                        >
                            <option value="all">全選</option>
                            {appOptions.map(app => (
                                <option key={app.id} value={app.id}>{app.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Query Button */}
                    <button 
                        className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                        onClick={() => setQueryKey(k => k + 1)}
                    >
                        <Search size={14} />
                        查詢
                    </button>
                 </div>
             </header>

             {/* Charts Grid: 2 rows × 2 columns */}
             <div className="p-6 grid grid-cols-2 gap-6 flex-1">
                 <StackedBarChart 
                     title="部門使用數時序統計" 
                     data={deptUsageData} 
                     categories={deptCategories}
                     unit="次"
                 />
                 <StackedBarChart 
                     title="應用使用數時序統計" 
                     data={appUsageData} 
                     categories={appCategories}
                     unit="次"
                 />
                 <StackedBarChart 
                     title="模型使用數時序統計" 
                     data={modelUsageData} 
                     categories={modelCategories}
                     unit="calls"
                 />
                 <StackedBarChart 
                     title="Token 使用數時序統計" 
                     data={tokenUsageData} 
                     categories={tokenModelCategories}
                     unit="tokens"
                 />
             </div>
        </div>
    );
}

function KBStatsView() {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(formatDate(oneMonthAgo));
    const [endDate, setEndDate] = useState(formatDate(today));
    const [orgFilter, setOrgFilter] = useState('all');

    // Seeded random
    const seededRandom = (seed) => {
        let x = Math.sin(seed * 9301 + 49297) * 49297;
        return x - Math.floor(x);
    };

    const orgs = MOCK_TERM_CATEGORIES;

    // Parent-child org mapping: selecting a parent includes its sub-departments
    const ORG_CHILDREN = {
        1: [1, 2, 3, 4, 5],  // 國土計畫組 includes 國土組XX科
        6: [6, 7, 8, 9],     // 人事室 includes 人事室XX科
    };

    const getFilteredOrgIds = () => {
        if (orgFilter === 'all') return orgs.map(o => o.id);
        const selectedId = parseInt(orgFilter);
        // If selected org is a parent, include children
        if (ORG_CHILDREN[selectedId]) return ORG_CHILDREN[selectedId];
        return [selectedId];
    };
    const filteredOrgIds = getFilteredOrgIds();
    const filteredOrgs = orgs.filter(o => filteredOrgIds.includes(o.id));

    // === Static Stats: Doc counts per org ===
    const docCountData = orgs.map((org, i) => ({
        name: org.name,
        count: Math.floor(seededRandom(i * 31 + 7) * 180) + 20,
    }));
    const filteredDocData = orgFilter === 'all' ? docCountData : docCountData.filter((_, i) => filteredOrgIds.includes(orgs[i].id));
    const maxDocCount = Math.max(...filteredDocData.map(d => d.count), 1);
    const totalDocs = filteredDocData.reduce((sum, d) => sum + d.count, 0);

    // Pie chart colors
    const PIE_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#f43f5e', '#06b6d4', '#f59e0b', '#6366f1', '#14b8a6'];

    // Build pie chart conic-gradient
    const buildPieGradient = () => {
        let cumPct = 0;
        const stops = filteredDocData.map((d, i) => {
            const pct = (d.count / totalDocs) * 100;
            const start = cumPct;
            cumPct += pct;
            return `${PIE_COLORS[i % PIE_COLORS.length]} ${start}% ${cumPct}%`;
        });
        return `conic-gradient(${stops.join(', ')})`;
    };

    // === Dynamic Stats: QA counts ===
    const qaCountData = filteredOrgs.map((org, i) => ({
        name: org.name,
        count: Math.floor(seededRandom(i * 47 + 13) * 500) + 50,
    }));
    const maxQACount = Math.max(...qaCountData.map(d => d.count), 1);

    // Time-series labels
    const generateDateLabels = () => {
        const labels = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (diffDays <= 14) {
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                labels.push(`${d.getMonth()+1}/${d.getDate()}`);
            }
        } else {
            const step = Math.max(1, Math.floor(diffDays / 10));
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + step)) {
                labels.push(`${d.getMonth()+1}/${d.getDate()}`);
            }
        }
        return labels.slice(0, 12);
    };
    const dateLabels = generateDateLabels();

    // Stacked time-series data: per org per date
    const CHART_COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500', 'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500', 'bg-teal-500'];
    const stackedTimeData = dateLabels.map((label, di) => ({
        label,
        segments: filteredOrgs.map((org, oi) => ({
            name: org.name,
            value: Math.floor(seededRandom(di * 100 + oi * 23 + 500) * 60) + 5,
            color: CHART_COLORS[oi % CHART_COLORS.length],
        }))
    }));
    const maxStackTotal = Math.max(...stackedTimeData.map(d => d.segments.reduce((s, seg) => s + seg.value, 0)), 1);

    const formatNumber = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : n.toString();

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-slate-50">
            {/* Sticky Header with Org Filter */}
            <header className="px-6 py-5 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-slate-500 whitespace-nowrap">組織</label>
                    <select
                        value={orgFilter}
                        onChange={(e) => setOrgFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600 min-w-[160px]"
                    >
                        <option value="all">全部組織</option>
                        {orgs.map(org => (
                            <option key={org.id} value={org.id}>{org.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            {/* ===== Static Stats Section ===== */}
            <div className="px-6 pt-6 pb-2">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800">靜態統計</h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* Horizontal Bar Chart: Doc counts */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-700 mb-4 text-sm">各組織知識文件數統計</h4>
                        <div className="space-y-3">
                            {filteredDocData.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="text-xs text-slate-600 font-medium w-[140px] truncate text-right flex-shrink-0" title={item.name}>{item.name}</span>
                                    <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden relative">
                                        <div 
                                            className="h-full rounded-full transition-all"
                                            style={{ 
                                                width: `${(item.count / maxDocCount) * 100}%`,
                                                backgroundColor: PIE_COLORS[idx % PIE_COLORS.length],
                                                minWidth: '16px'
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 w-8 text-right">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pie Chart: Doc proportions */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 className="font-bold text-slate-700 mb-4 text-sm">各組織知識文件比例</h4>
                        <div className="flex-1 flex items-center justify-center gap-6">
                            {/* CSS Pie */}
                            <div className="relative">
                                <div 
                                    className="w-40 h-40 rounded-full shadow-inner"
                                    style={{ background: buildPieGradient() }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-slate-800">{totalDocs}</div>
                                            <div className="text-[10px] text-slate-400">總文件數</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="space-y-1.5">
                                {filteredDocData.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></div>
                                        <span className="text-xs text-slate-600 truncate max-w-[120px]" title={item.name}>{item.name}</span>
                                        <span className="text-xs text-slate-400 ml-auto">{((item.count / totalDocs) * 100).toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="px-6 py-4">
                <hr className="border-slate-200" />
            </div>

            {/* ===== Dynamic Stats Section ===== */}
            <div className="px-6 pb-6">
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-800">動態統計</h2>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-500">日期區間</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
                        />
                        <span className="text-slate-400 text-sm">—</span>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
                        />
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                            onClick={() => {}}
                        >
                            <Search size={14} />
                            查詢
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* Horizontal bar: QA counts per org */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-700 mb-4 text-sm">知識庫文件問答次數</h4>
                        <div className="space-y-3">
                            {qaCountData.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="text-xs text-slate-600 font-medium w-[140px] truncate text-right flex-shrink-0" title={item.name}>{item.name}</span>
                                    <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full rounded-full transition-all"
                                            style={{ 
                                                width: `${(item.count / maxQACount) * 100}%`,
                                                backgroundColor: PIE_COLORS[idx % PIE_COLORS.length],
                                                minWidth: '16px'
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 w-10 text-right">{formatNumber(item.count)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stacked Vertical bar chart: QA time series */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 className="font-bold text-slate-700 mb-2 text-sm">知識庫文件問答次數時序統計</h4>
                        {/* Legend */}
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                            {filteredOrgs.map((org, oi) => (
                                <div key={oi} className="flex items-center gap-1">
                                    <div className={`w-2.5 h-2.5 rounded-sm ${CHART_COLORS[oi % CHART_COLORS.length]}`}></div>
                                    <span className="text-[10px] text-slate-500">{org.name}</span>
                                </div>
                            ))}
                        </div>
                        {/* Bars */}
                        <div className="flex-1 flex items-end gap-1.5 min-h-[180px]">
                            {stackedTimeData.map((item, idx) => {
                                const total = item.segments.reduce((s, seg) => s + seg.value, 0);
                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                                        {/* Tooltip */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-lg">
                                            <div className="font-bold mb-0.5">{item.label} — {total} 次</div>
                                            {item.segments.map((seg, si) => (
                                                <div key={si} className="flex items-center gap-1">
                                                    <div className={`w-1.5 h-1.5 rounded-sm ${seg.color}`}></div>
                                                    <span>{seg.name}: {seg.value}</span>
                                                </div>
                                            ))}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                        </div>
                                        {/* Stacked bar */}
                                        <div 
                                            className="w-full flex flex-col-reverse rounded-t-sm overflow-hidden transition-all group-hover:opacity-90"
                                            style={{ height: `${(total / maxStackTotal) * 100}%`, minHeight: '4px' }}
                                        >
                                            {item.segments.map((seg, si) => (
                                                <div 
                                                    key={si}
                                                    className={`w-full ${seg.color}`}
                                                    style={{ height: `${(seg.value / total) * 100}%` }}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className="text-[9px] text-slate-400 font-mono mt-1.5 whitespace-nowrap">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
