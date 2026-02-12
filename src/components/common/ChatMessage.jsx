import React from 'react';
import { Bot, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';


function ActionButton({ icon, onClick }) {
    return (
        <button onClick={onClick} className="flex items-center gap-1 text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors shadow-sm">
            {icon}
        </button>
    );
}

export function ChatMessage({ message, onFeedback }) {
  const { role, content } = message;
  const isUser = role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mt-1 flex-shrink-0">
          <Bot size={16} />
        </div>
      )}
      <div className="flex flex-col max-w-[85%] gap-2">
        <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-sm' 
            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
        }`}>
          {content}
        </div>
        {!isUser && (
           <div className="flex gap-2 flex-wrap animate-in fade-in duration-300">
              <ActionButton icon={<ThumbsUp size={14}/>} onClick={() => {}} />
              <ActionButton icon={<ThumbsDown size={14}/>} onClick={() => {}} />
              <button 
                  onClick={onFeedback}
                  className="flex items-center gap-1 text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors shadow-sm"
              >
                  <MessageCircle size={14}/> 回饋
              </button>
           </div>
        )}
      </div>
    </div>
  );
}
