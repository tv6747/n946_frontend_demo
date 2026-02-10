import React, { useState } from 'react';
import { LayoutGrid, Shield, Bot, FileSpreadsheet, FileText, Cpu, Link, Activity, ChevronDown, ChevronRight, Settings, Sliders, Wrench, Waves } from 'lucide-react';
import { MODES, FEATURES } from '../../data/constants';

export function UnifiedBackendSidebar({
  currentFeature,
  onFeatureChange,
  serviceSubModule,
  onServiceSubModuleChange,
  auditView,
  onAuditViewChange,
  llmSubModule,
  onLLMSubModuleChange
}) {
  const [expandedSections, setExpandedSections] = useState({
    service: true,
    llm: true,
    corpus: true,
    audit: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (featureKey) => {
    return currentFeature.id === FEATURES[featureKey]?.id;
  };

  const isServiceSubModuleActive = (module) => {
    return currentFeature.mode === MODES.ADMIN_SERVICE && serviceSubModule === module;
  };

  const isLLMSubModuleActive = (module) => {
    return currentFeature.mode === MODES.ADMIN_LLM && llmSubModule === module;
  };

  const isAuditViewActive = (view) => {
    return currentFeature.mode === MODES.ADMIN_AUDIT && auditView === view;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 w-64">
      <div className="px-5 py-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">後台管理</h2>
        <p className="text-xs text-slate-500 mt-0.5">系統管理與設定</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        
        {/* Service Management - Collapsible (無知識庫權限) */}
        <div>
          <button
            onClick={() => toggleSection('service')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              currentFeature.mode === MODES.ADMIN_SERVICE 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid size={18} />
              <span>服務管理</span>
            </div>
            {expandedSections.service ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {expandedSections.service && (
            <div className="ml-4 mt-1 space-y-1">
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_SERVICE');
                  onServiceSubModuleChange('apps');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  isServiceSubModuleActive('apps')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutGrid size={16} />
                應用管理
              </button>
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_SERVICE');
                  onServiceSubModuleChange('bot_management');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  isServiceSubModuleActive('bot_management')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bot size={16} />
                答詢機器人管理
              </button>
            </div>
          )}
        </div>

        {/* Language Model Management - Collapsible with sub-modules */}
        <div>
          <button
            onClick={() => toggleSection('llm')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              currentFeature.mode === MODES.ADMIN_LLM
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Cpu size={18} />
              <span>語言模型管理</span>
            </div>
            {expandedSections.llm ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expandedSections.llm && (
            <div className="ml-4 mt-1 space-y-1">
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_LLM');
                  if (onLLMSubModuleChange) onLLMSubModuleChange('models');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  isLLMSubModuleActive('models')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Cpu size={16} />
                模型管理
              </button>
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_LLM');
                  if (onLLMSubModuleChange) onLLMSubModuleChange('params');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  isLLMSubModuleActive('params')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sliders size={16} />
                模型參數管理
              </button>
            </div>
          )}
        </div>

        {/* Tool Management - Flat */}
        <button
          onClick={() => onFeatureChange('ADMIN_TOOLS')}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
            isActive('ADMIN_TOOLS')
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench size={18} />
          工具管理
        </button>

        {/* LangFlow Application */}
        <button
          onClick={() => onFeatureChange('ADMIN_LANGFLOW')}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
            isActive('ADMIN_LANGFLOW')
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Waves size={18} />
          LangFlow
        </button>

        {/* Corpus Management - Collapsible with sub-modules */}
        <div>
          <button
            onClick={() => toggleSection('corpus')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              (isActive('ADMIN_PROPER_NOUN') || isActive('ADMIN_SYNONYM'))
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet size={18} />
              <span>語料庫管理</span>
            </div>
            {expandedSections.corpus ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expandedSections.corpus && (
            <div className="ml-4 mt-1 space-y-1">
              <button
                onClick={() => onFeatureChange('ADMIN_PROPER_NOUN')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  isActive('ADMIN_PROPER_NOUN')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileSpreadsheet size={16} />
                專有名詞
              </button>
              <button
                onClick={() => onFeatureChange('ADMIN_SYNONYM')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  isActive('ADMIN_SYNONYM')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText size={16} />
                近似詞
              </button>
            </div>
          )}
        </div>

        {/* Prompt Management - Flat */}
        <button
          onClick={() => onFeatureChange('ADMIN_PROMPTS')}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
            isActive('ADMIN_PROMPTS')
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText size={18} />
          提示詞管理
        </button>

        {/* API Management - Flat */}
        <button
          onClick={() => onFeatureChange('ADMIN_APIS')}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
            isActive('ADMIN_APIS')
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Link size={18} />
          API 管理
        </button>

        {/* Audit Management - Collapsible */}
        <div>
          <button
            onClick={() => toggleSection('audit')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
              currentFeature.mode === MODES.ADMIN_AUDIT
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Activity size={18} />
              <span>稽核管理</span>
            </div>
            {expandedSections.audit ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expandedSections.audit && (
            <div className="ml-4 mt-1 space-y-1">
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_AUDIT');
                  onAuditViewChange('kb_logs');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  isAuditViewActive('kb_logs')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                知識庫紀錄
              </button>
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_AUDIT');
                  onAuditViewChange('chat_records');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  isAuditViewActive('chat_records')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                對話紀錄
              </button>
              <button
                onClick={() => {
                  onFeatureChange('ADMIN_AUDIT');
                  onAuditViewChange('stats');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  isAuditViewActive('stats')
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                統計圖表
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
