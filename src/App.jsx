import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LayoutGrid, 
  Search, 
  PanelLeftClose, 
  PanelLeftOpen, 
  MessageSquare, 
  Folder,
  Settings
} from 'lucide-react';

import { MODES, FEATURES } from './data/constants';
import { KB_TREE_DATA, MASTER_FILES, MOCK_USERS, MOCK_BOTS, CORPUS_PAGES } from './data/mockData';
import { findNodeById } from './utils/helpers';
import { MainLayout } from './components/layout/MainLayout';
import { CorpusSidebar } from './features/corpus/CorpusSidebar';

import { MainDropdown } from './components/common/MainDropdown';
import { ShareModal } from './components/modals/ShareModal';
import { UploadModal } from './components/modals/UploadModal';
import { ExportModal } from './components/modals/ExportModal';
import { SaveArchiveModal } from './components/modals/SaveArchiveModal';
import { LLMSettingsModal } from './components/modals/LLMSettingsModal';
import { FileDetailsModal } from './components/modals/FileDetailsModal';

import { KBSidebar } from './features/kb/KBSidebar';
import { KBManagerPanel } from './features/kb/KBManagerPanel';
import { BotConfigPanel } from './features/bot/BotConfigPanel';
import { CommonHistorySidebar } from './features/chat/CommonHistorySidebar';
import { ChatInterface } from './features/chat/ChatInterface';
import { PPTGenerationInterface } from './features/ppt/PPTGenerationInterface';
import { PromptOptimizerInterface } from './features/prompt/PromptOptimizerInterface';
import { PromptSaveConfirmModal } from './features/prompt/PromptSaveConfirmModal';
import { DocumentTranslationInterface } from './features/translation/DocumentTranslationInterface';
import { ImportConflictManager } from './features/corpus/ImportConflictManager';
import { SynonymManager } from './features/corpus/SynonymManager';
import { TermDefinitionManager } from './features/corpus/TermDefinitionManager';
import { CorpusFeature } from './features/corpus/CorpusFeature';
import { AddTermModal } from './components/modals/AddTermModal';


import { ServiceManagement } from './features/admin/ServiceManagement';
import { AuditManagement } from './features/admin/AuditManagement';
import { UnifiedBackendSidebar } from './features/admin/UnifiedBackendSidebar';

import { ProperNounPanel } from './features/corpus/ProperNounPanel';
import { SynonymPanel } from './features/corpus/SynonymPanel';
import { ModelManagementPanel } from './features/admin/ModelManagementPanel';
import { ModelParametersPanel } from './features/admin/ModelParametersPanel';
import { PromptManagementPanel } from './features/admin/PromptManagementPanel';
import { APIManagementPanel } from './features/admin/APIManagementPanel';
import { BotManagementPanel } from './features/admin/BotManagementPanel';

import { UploadCloud, Plus } from 'lucide-react';

import nlmaLogo from './assets/nlma_logo.jpg';

export default function App() {
  const [currentFeature, setCurrentFeature] = useState(FEATURES.INTERACTIVE);
  const [selectedFolderId, setSelectedFolderId] = useState('personal'); 
  const [checkedNodes, setCheckedNodes] = useState(['personal']); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Bot Management State
  const [bots, setBots] = useState(MOCK_BOTS);
  const [selectedBotId, setSelectedBotId] = useState(null); 
  
  // -- Admin State --
  const [adminAppSystem, setAdminAppSystem] = useState('ALL');
  const [adminAuditView, setAdminAuditView] = useState('kb_logs');
  const [serviceSubModule, setServiceSubModule] = useState('apps');
  const [llmSubModule, setLLMSubModule] = useState('models');

  // Corpus Management State
  const [selectedCorpusId, setSelectedCorpusId] = useState('proper_noun');

  // Files State
  const [files, setFiles] = useState(MASTER_FILES);

  // KB Mode & Context State
  const [kbMode, setKbMode] = useState('qa'); 
  const [kbSelectedFileIds, setKbSelectedFileIds] = useState([]); // Selected files for RAG
  const [kbTreeData, setKbTreeData] = useState(KB_TREE_DATA); // Lifted state for Tree (folders)

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isPromptSaveModalOpen, setIsPromptSaveModalOpen] = useState(false);
  const [fileDetailsModal, setFileDetailsModal] = useState(null); 
  const [isLLMModalOpen, setIsLLMModalOpen] = useState(false); // 新增 LLM 設定 Modal 狀態
  const [isAddTermModalOpen, setIsAddTermModalOpen] = useState(false);

  // KB Role State for Demo
  const [userRole, setUserRole] = useState('admin'); // 'admin' | 'user'

  const [currentSystem, setCurrentSystem] = useState('GAI'); // 'GAI' | 'DOC'
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);

  const handleFolderSelect = (folderId) => {
    setSelectedFolderId(folderId);
  };

  // Effect to reset folder when switching roles (Admin doesn't see Personal/Shared)
  useEffect(() => {
    if (userRole === 'admin') {
      if (selectedFolderId === 'personal' || selectedFolderId.startsWith('shared_')) {
        setSelectedFolderId('org');
      }
      
      // Force switch to GAI system if not already and not in allowed systems
      if (currentSystem !== 'GAI' && currentSystem !== 'BACKEND') {
          setCurrentSystem('GAI');
      }

      // Force switch to allowed feature if current is restricted
      // KB_MANAGEMENT, BOT_MANAGEMENT, CORPUS_MANAGEMENT, or ADMIN features
      const allowedFeatures = [
          FEATURES.KB_MANAGEMENT.id, 
          FEATURES.BOT_MANAGEMENT.id, 
          FEATURES.ADMIN_SERVICE.id,
          FEATURES.ADMIN_LLM.id,
          FEATURES.ADMIN_MODELS.id,
          FEATURES.ADMIN_PARAMS.id,
          FEATURES.ADMIN_PROMPTS.id,
          FEATURES.ADMIN_APIS.id,
          FEATURES.ADMIN_PROPER_NOUN.id,
          FEATURES.ADMIN_SYNONYM.id,
          FEATURES.ADMIN_AUDIT.id
      ];
      if (!allowedFeatures.includes(currentFeature.id)) {
          // If in Backend mode, default to LLM Management
          if (currentSystem === 'BACKEND') {
             setCurrentFeature(FEATURES.ADMIN_SERVICE);
          } else {
             setCurrentFeature(FEATURES.KB_MANAGEMENT);
             setKbMode('qa'); // Default to QA mode for KB
          }
      }
    }
  }, [userRole, currentSystem, currentFeature.id, selectedFolderId]);

  useEffect(() => {
    if (currentFeature.mode === MODES.BOT_MGR && selectedBotId) {
      const bot = bots.find(b => b.id === selectedBotId);
      if (bot) {
        setCheckedNodes(bot.files);
      }
    }
  }, [selectedBotId, currentFeature.mode, bots]);
  
  // New State for Bot Manager Folder Checkboxes
  const [botMgrCheckedFolderIds, setBotMgrCheckedFolderIds] = useState([]);

  // 當切換功能時，重置 KB mode
  const handleFeatureSelect = (key) => {
    setCurrentFeature(FEATURES[key]);
    if(FEATURES[key].mode === MODES.BOT_MGR) setSelectedBotId(null); // Default to list view
    if(FEATURES[key].mode === MODES.KB) setKbMode('qa'); // Default to QA when switching to KB
  };

  const displayFiles = useMemo(() => {
    if (currentFeature.mode === MODES.KB) {
      return files.filter(f => f.folderId === selectedFolderId);
    } else if (currentFeature.mode === MODES.BOT_MGR && selectedBotId && selectedBotId !== 'NEW_BOT') {
      return files.filter(f => checkedNodes.includes(f.id));
    }
    return [];
  }, [checkedNodes, currentFeature.mode, selectedBotId, selectedFolderId, files]);

  // For Bot Manager: Calculate files in current folder separately for the left panel
  // Now modified to aggregate files from ALL checked folders
  const filesInCheckedFolders = useMemo(() => {
      // If no folders checked, maybe default to current selected folder? 
      // User request implies "checkboxes" drive the list.
      // Let's include both: files in currently selected folder AND checked folders
      const allSourceFolderIds = new Set([...botMgrCheckedFolderIds, selectedFolderId]);
      return files.filter(f => allSourceFolderIds.has(f.folderId));
  }, [files, selectedFolderId, botMgrCheckedFolderIds]);

  const updateBot = (id, newConfig) => {
    setBots(prev => prev.map(b => b.id === id ? { ...b, ...newConfig } : b));
  };
  
  const createBot = (newBotData) => {
      const newBot = {
          status: 'active',
          files: [],
          accessibleUsers: [],
          ...newBotData,
          id: `bot_${Date.now()}`
      };
      setBots(prev => [...prev, newBot]);
      setSelectedBotId(newBot.id); // Switch to the new bot
  };

   const handleMoveFile = (fileIds, targetFolderId) => {
     if (userRole !== 'admin' && !targetFolderId.startsWith('personal')) {
         alert("權限不足：您只能移動文件到個人資料夾");
         return;
     }
     
     if (confirm(`確定要移動 ${fileIds.length} 個文件到目標資料夾嗎？`)) {
       setFiles(prev => prev.map(f => {
           if (fileIds.includes(f.id)) {
               return { ...f, folderId: targetFolderId };
           }
           return f;
       }));
     }
   };

  const handleRemoveFile = (fileIds) => {
    if (currentFeature.mode === MODES.BOT_MGR && selectedBotId) {
        const newFiles = checkedNodes.filter(nodeId => !fileIds.includes(nodeId));
        updateBot(selectedBotId, { files: newFiles });
        setCheckedNodes(newFiles);
    } else {
       if (confirm(`確定要刪除選取的 ${fileIds.length} 個檔案嗎？`)) {
          setFiles(prev => prev.filter(f => !fileIds.includes(f.id)));
          setKbSelectedFileIds(prev => prev.filter(id => !fileIds.includes(id))); 
       }
    }
  };
  
  const handleUpdateFileSharedWith = (fileId, newSharedWith) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, sharedWith: newSharedWith } : f));
  };

  const handleDeleteBot = (id) => {
      setBots(prev => prev.filter(b => b.id !== id));
      setSelectedBotId(null);
  };

  const kbSelectedFilesObjects = useMemo(() => {
    return files.filter(f => kbSelectedFileIds.includes(f.id));
  }, [kbSelectedFileIds, files]);

  // 共用的打開 LLM 設定函數
  const openLLMSettings = () => setIsLLMModalOpen(true);

  // Folder Check Handler for Bot Manager
  const handleBotFolderCheck = (folderId, isChecked) => {
      setBotMgrCheckedFolderIds(prev => {
          if (isChecked) {
              return [...prev, folderId];
          } else {
              return prev.filter(id => id !== folderId);
          }
      });
  };
  
  const shouldHideTemplateInSettings = currentFeature.mode === MODES.PROMPT;

  // Filter Features based on System
  const systemFeatures = useMemo(() => {
     if (userRole === 'admin') {
        if (currentSystem === 'GAI') {
            return ['KB_MANAGEMENT'];
        } else if (currentSystem === 'BACKEND') {
            return ['ADMIN_SERVICE', 'BOT_MANAGEMENT', 'ADMIN_PROPER_NOUN', 'ADMIN_SYNONYM', 'ADMIN_MODELS', 'ADMIN_PROMPTS', 'ADMIN_APIS', 'ADMIN_AUDIT'];
        }
     }

     if (currentSystem === 'DOC') {
         // Return Draft features and the new Doc Gen feature
         return Object.keys(FEATURES).filter(key => key.startsWith('DRAFT_'));
     } else {
         // Return everything else, but exclude BOT_MANAGEMENT for regular users
         return Object.keys(FEATURES).filter(key => !key.startsWith('DRAFT_') && key !== 'BOT_MANAGEMENT' && key !== 'CORPUS_MANAGEMENT' && !key.startsWith('ADMIN_'));
     }
  }, [currentSystem, userRole]);

  const handleSystemSelect = (system) => {
    if (userRole === 'admin' && system === 'DOC') {
        alert("權限不足：管理員僅能存取 GAI 互動平台與後台管理");
        return;
    }

    setCurrentSystem(system);
    setIsSystemMenuOpen(false);
    
    // Reset to first feature of new system
    let firstFeatureKey;
    if (userRole === 'admin') {
        if (system === 'GAI') firstFeatureKey = 'KB_MANAGEMENT';
        if (system === 'BACKEND') firstFeatureKey = 'ADMIN_SERVICE';
    } else {
        firstFeatureKey = Object.keys(FEATURES).find(key => 
            system === 'DOC' ? key.startsWith('DRAFT_') : !key.startsWith('DRAFT_')
        );
    }
    
    if (firstFeatureKey) {
        handleFeatureSelect(firstFeatureKey);
    }
  };

  // --- Render Components ---

  const renderSidebar = () => (
    <aside 
      className={`bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10 shadow-sm relative transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden border-none'
      }`}
    >
      <div className="h-16 flex items-center px-5 border-b border-slate-100 flex-shrink-0 bg-white relative">
         
         {/* System Switcher Trigger */}
         <div 
           className="flex items-center gap-3 cursor-pointer group w-full"
           onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
         >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 border border-slate-100`}>
                  <img src={nlmaLogo} alt="logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                  <h1 className="font-bold text-base text-slate-800 tracking-tight truncate leading-tight">
                      {currentSystem === 'GAI' ? 'GAI 互動平台' : currentSystem === 'BACKEND' ? '後台管理' : '智慧公文輔助系統'}
                  </h1>
              </div>
              <div className="text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isSystemMenuOpen ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6"/>
                  </svg>
              </div>
         </div>

         {/* System Dropdown Menu */}
         {isSystemMenuOpen && (
           <>
             <div className="fixed inset-0 z-10" onClick={() => setIsSystemMenuOpen(false)}></div>
             <div className="absolute top-14 left-4 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                 <div 
                   className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${currentSystem === 'GAI' ? 'bg-blue-50/50' : ''}`}
                   onClick={() => handleSystemSelect('GAI')}
                 >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${currentSystem === 'GAI' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          <LayoutGrid size={18} />
                      </div>
                      <div>
                          <div className={`font-bold text-sm ${currentSystem === 'GAI' ? 'text-blue-700' : 'text-slate-700'}`}>GAI 互動平台</div>
                      </div>
                 </div>
                 {userRole === 'admin' && (
                  <div 
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${currentSystem === 'BACKEND' ? 'bg-blue-50/50' : ''}`}
                    onClick={() => handleSystemSelect('BACKEND')}
                  >
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${currentSystem === 'BACKEND' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                           <Settings size={18} />
                       </div>
                       <div>
                           <div className={`font-bold text-sm ${currentSystem === 'BACKEND' ? 'text-blue-700' : 'text-slate-700'}`}>後台管理</div>
                       </div>
                  </div>
                 )}
                 {userRole !== 'admin' && (
                  <div 
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${currentSystem === 'DOC' ? 'bg-blue-50/50' : ''}`}
                    onClick={() => handleSystemSelect('DOC')}
                  >
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${currentSystem === 'DOC' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                           <Folder size={18} />
                       </div>
                       <div>
                           <div className={`font-bold text-sm ${currentSystem === 'DOC' ? 'text-blue-700' : 'text-slate-700'}`}>智慧公文輔助系統</div>
                       </div>
                  </div>
                 )}
             </div>
           </>
         )}

      </div>

      {currentSystem !== 'BACKEND' && (
      <div className="p-4 border-b border-slate-100 flex-shrink-0 bg-white">
         <div className="relative w-full">
           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           <input type="text" placeholder="搜尋..." className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-white placeholder:text-slate-400 transition-all" />
         </div>
      </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
         {currentSystem === 'BACKEND' ? (
             <UnifiedBackendSidebar 
                currentFeature={currentFeature}
                onFeatureChange={handleFeatureSelect}
                serviceSubModule={serviceSubModule}
                onServiceSubModuleChange={setServiceSubModule}
                llmSubModule={llmSubModule}
                onLLMSubModuleChange={setLLMSubModule}
                auditView={adminAuditView}
                onAuditViewChange={setAdminAuditView}
             />
        ) : currentFeature.mode === MODES.KB ? (
           kbMode === 'qa' ? (
              <CommonHistorySidebar currentFeatureId="kb_qa" />
           ) : (
              <KBSidebar 
                treeData={kbTreeData}
                selectedFolderId={selectedFolderId}
                onSelectFolder={handleFolderSelect}
                onUpload={() => setIsUploadModalOpen(true)}
                files={files}
                selectedFileIds={kbSelectedFileIds}
                onSelectionChange={setKbSelectedFileIds}
                userRole={userRole}
                onMoveFolder={(sourceId, targetId) => {
                    alert(`移動資料夾 ${sourceId} 到 ${targetId} (State Update TODO)`);
                    // TODO: Implement actual move logic
                }}
                onMoveFile={handleMoveFile}
              />
           )


        ) : (
          <CommonHistorySidebar currentFeatureId={currentFeature.id} />
        )}
      </div>
    </aside>
  );

  const getAdminHeaderInfo = () => {
      if (currentSystem !== 'BACKEND') return null;

      const { mode } = currentFeature;
      switch(mode) {
          case MODES.ADMIN_SERVICE:
              if (serviceSubModule === 'apps') return { title: '應用管理', desc: '管理系統應用設定與權限' };
              if (serviceSubModule === 'kb_permission') return { title: '知識庫權限', desc: '設定知識庫存取權限' };
              if (serviceSubModule === 'bot_management') return { title: '答詢機器人管理', desc: '建立與管理專屬的 AI 答詢機器人' };
              return { title: '服務管理', desc: '' };
          case MODES.ADMIN_LLM:
              if (llmSubModule === 'models') return { title: '模型管理', desc: '管理系統可用的語言模型' };
              if (llmSubModule === 'params') return { title: '模型參數管理', desc: '設定模型的運作參數與限制' };
              return { title: '語言模型管理', desc: '' };
          case MODES.ADMIN_PROPER_NOUN: return { title: '專有名詞語料庫', desc: '維護專有名詞與定義語料庫' };
          case MODES.ADMIN_SYNONYM: return { title: '近似詞語料庫', desc: '維護標準名詞及其對應的同義詞與變體' };
          case MODES.ADMIN_PROMPTS: return { title: '提示詞管理', desc: '管理與優化系統提示詞' };
          case MODES.ADMIN_APIS: return { title: 'API 管理', desc: '管理外部服務 API 連接' };
          case MODES.ADMIN_AUDIT:
              if (adminAuditView === 'kb_logs') return { title: '知識庫紀錄', desc: '查看知識庫變更與存取紀錄' };
              if (adminAuditView === 'chat_records') return { title: '對話紀錄', desc: '查看系統對話歷程' };
              if (adminAuditView === 'stats') return { title: '統計圖表', desc: '系統使用數據統計' };
              return { title: '稽核管理', desc: '系統活動紀錄與報表' };
          default: return null;
      }
  };

  const headerInfo = getAdminHeaderInfo();

  const renderHeader = () => (
    <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between shadow-sm z-20 flex-shrink-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none flex-shrink-0"
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>

        {currentSystem !== 'BACKEND' && (
           <MainDropdown currentFeature={currentFeature} onSelect={handleFeatureSelect} features={systemFeatures} />
        )}
        
        {headerInfo && (
            <div className="flex flex-col ml-2 animate-in fade-in slide-in-from-left-2 duration-300">
                <h2 className="text-base font-bold text-slate-800">{headerInfo.title}</h2>
                <p className="text-xs text-slate-500">{headerInfo.desc}</p>
            </div>
        )}

        {/* KB Toggle Switch: Only show in KB Mode */}
        {currentFeature.mode === MODES.KB && (
          <div className="ml-2 flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
             {/* Swapped order: QA first (left), Manage second (right) */}
             <button 
               onClick={() => setKbMode('qa')}
               className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${kbMode === 'qa' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               <MessageSquare size={14} /> 問答
             </button>
             <button 
               onClick={() => setKbMode('manage')}
               className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${kbMode === 'manage' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               <Folder size={14} /> 管理
             </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 relative">
         <div className="text-right hidden sm:block">
           <p className="text-sm font-semibold text-slate-700">John Doe</p>
           <p className="text-xs text-slate-400">{userRole === 'admin' ? '系統管理員' : '一般使用者'}</p>
         </div>
         
         {/* User Avatar & Dropdown */}
         <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold cursor-pointer hover:bg-blue-200 transition-colors">
                JD
            </div>

            {/* User Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="p-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">切換角色 (Demo)</p>
                    <button 
                        onClick={() => setUserRole('admin')}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md mb-1 ${userRole === 'admin' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                        <span>管理者</span>
                        {userRole === 'admin' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                    </button>
                    <button 
                        onClick={() => setUserRole('user')}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md ${userRole === 'user' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                        <span>一般使用者</span>
                        {userRole === 'user' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                    </button>
                </div>
                <div className="p-2">
                     <button className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        登出
                     </button>
                </div>
            </div>
         </div>
      </div>
    </header>
  );

  return (
    <MainLayout sidebar={renderSidebar()} header={renderHeader()} modals={
       <>
          {isShareModalOpen && <ShareModal onClose={() => setIsShareModalOpen(false)} />}
          {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} />}
          {isExportModalOpen && <ExportModal onClose={() => setIsExportModalOpen(false)} />}
          {isSaveModalOpen && <SaveArchiveModal onClose={() => setIsSaveModalOpen(false)} />}
          {isPromptSaveModalOpen && <PromptSaveConfirmModal onClose={() => setIsPromptSaveModalOpen(false)} />}
          {isLLMModalOpen && (
            <LLMSettingsModal 
               isOpen={isLLMModalOpen} 
               onClose={() => setIsLLMModalOpen(false)} 
               showTemplate={!shouldHideTemplateInSettings} 
            />
          )}
          {fileDetailsModal && (
            <FileDetailsModal 
              file={fileDetailsModal} 
              users={MOCK_USERS}
              bots={bots}
              onClose={() => setFileDetailsModal(null)} 
              onUpdateSharedWith={handleUpdateFileSharedWith}
            />
          )}
           {isAddTermModalOpen && (
              <AddTermModal onClose={() => setIsAddTermModalOpen(false)} />
           )}
       </>
    }>
        {currentFeature.mode === MODES.KB && (
            kbMode === 'manage' ? (
              <KBManagerPanel 
                selectedFolderId={selectedFolderId}
                files={displayFiles} 
                bots={bots}
                selectedFileIds={kbSelectedFileIds}
                onSelectionChange={setKbSelectedFileIds}
                onRemove={handleRemoveFile}
                onShare={() => setIsShareModalOpen(true)}
                onUpload={() => setIsUploadModalOpen(true)}
                onAddBot={() => setIsBotModalOpen(true)}
                onViewDetails={(file) => setFileDetailsModal(file)}
                onStartChat={() => setKbMode('qa')}
                userRole={userRole}
                onRoleChange={setUserRole}
              />
            ) : (
              // RAG QA Mode
              <ChatInterface 
                currentFeature={{...currentFeature, id: 'kb_qa'}} 
                ragContext={kbSelectedFilesObjects}
                onExport={() => setIsExportModalOpen(true)}
                onSave={() => setIsSaveModalOpen(true)}
                onOpenLLMSettings={openLLMSettings}
              />
            )
          )}
          

          {currentFeature.mode === MODES.CHAT && (
            <ChatInterface 
              currentFeature={currentFeature} 
              onExport={() => setIsExportModalOpen(true)}
              onSave={() => setIsSaveModalOpen(true)}
              onOpenLLMSettings={openLLMSettings}
            />
          )}
          {currentFeature.mode === MODES.PPT && (
            <PPTGenerationInterface 
              currentFeature={currentFeature} 
              onOpenLLMSettings={openLLMSettings}
            />
          )}
          {currentFeature.mode === MODES.PROMPT && (
            <PromptOptimizerInterface 
              onSaveSystemPrompt={() => setIsPromptSaveModalOpen(true)} 
              onOpenLLMSettings={openLLMSettings}
            />
          )}
           {currentFeature.mode === MODES.TRANS && (
            <DocumentTranslationInterface />
          )}
           {currentFeature.mode === MODES.CORPUS_MGR && (
              <CorpusFeature selectedCorpusId={selectedCorpusId} />
           )}
           {currentFeature.mode === MODES.ADMIN_SERVICE && (
              serviceSubModule === 'bot_management' ? (
                selectedBotId ? (
                    <BotConfigPanel 
                      bot={selectedBotId === 'NEW_BOT' ? { name: '', welcomeMessage: '', files: [], accessibleUsers: [] } : bots.find(b => b.id === selectedBotId)}
                      isCreating={selectedBotId === 'NEW_BOT'}
                      associatedFiles={displayFiles}
                      folderFiles={filesInCheckedFolders}
                      allFiles={files}
                      selectedFolderName={findNodeById(KB_TREE_DATA, selectedFolderId)?.label || '選定資料夾'}
                      users={MOCK_USERS}
                      onUpdateBot={updateBot}
                      onCreateBot={createBot}
                      onRemoveFile={(id) => handleRemoveFile([id])}
                      onDeleteBot={handleDeleteBot}
                      onOpenLLMSettings={openLLMSettings}
                      onBack={() => setSelectedBotId(null)}
                    />
                ) : (
                    <BotManagementPanel 
                      bots={bots}
                      onSelectBot={setSelectedBotId}
                      onCreate={() => setSelectedBotId('NEW_BOT')}
                      onDeleteBot={handleDeleteBot}
                      onUpdateBot={updateBot}
                    />
                )
              ) : (
                <ServiceManagement selectedSubModule={serviceSubModule} />
              )
           )}
           {currentFeature.mode === MODES.ADMIN_PROPER_NOUN && <ProperNounPanel />}
           {currentFeature.mode === MODES.ADMIN_SYNONYM && <SynonymPanel />}
           {currentFeature.mode === MODES.ADMIN_LLM && (
              llmSubModule === 'models' ? <ModelManagementPanel /> :
              llmSubModule === 'params' ? <ModelParametersPanel /> : <ModelManagementPanel />
           )}
           {currentFeature.mode === MODES.ADMIN_PROMPTS && <PromptManagementPanel />}
           {currentFeature.mode === MODES.ADMIN_APIS && <APIManagementPanel />}
           {currentFeature.mode === MODES.ADMIN_AUDIT && <AuditManagement activeView={adminAuditView} />}
    </MainLayout>
  );
}