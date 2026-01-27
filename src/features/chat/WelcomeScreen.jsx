import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { WELCOME_CONFIG } from '../../data/constants';

export function WelcomeScreen({ featureId, onSuggestionClick }) {
  const configKey = Object.keys(WELCOME_CONFIG).find(key => featureId.startsWith(key)) || 'default';
  const config = WELCOME_CONFIG[configKey] || WELCOME_CONFIG.default;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 overflow-y-auto">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 text-white shrink-0">
        <Sparkles size={32} />
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-3">{config.title}</h1>
      <p className="text-slate-500 max-w-md mb-10 text-lg leading-relaxed">{config.sub}</p>
      
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
        {config.suggestions.map((suggestion, index) => (
          <button 
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="flex-1 min-w-[280px] max-w-[320px] p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between h-full">
               <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 line-clamp-3">{suggestion}</span>
               <Lightbulb size={16} className="text-slate-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
