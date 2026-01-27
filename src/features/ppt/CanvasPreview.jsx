import React, { useMemo } from 'react';

export function CanvasPreview({ type, content, templateColor, title }) {
  const docContent = useMemo(() => {
    return {
      org: "行政院環境保護署 函",
      date: `中華民國 ${new Date().getFullYear() - 1911} 年 ${new Date().getMonth() + 1} 月 ${new Date().getDate()} 日`,
      number: "環署空字第1130000000號",
      subject: "主旨：" + (title || "有關台端陳情事項"),
      body: content || "說明：\n一、復 台端XXX年X月X日陳情書。\n二、感謝台端對環保事務之關心，本署將依規定辦理..."
    };
  }, [content, title]);

  if (type === 'ppt') {
    return (
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        {/* Slide 1: Title Slide */}
        <div className={`w-full aspect-video rounded-xl shadow-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500 bg-white`}>
           <div className={`flex-1 ${templateColor || 'bg-blue-600'} flex flex-col items-center justify-center p-12 text-center`}>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{title || '簡報標題'}</h1>
              <div className="w-24 h-1 bg-white/50 rounded-full mb-6"></div>
              <p className="text-white/80 text-lg">年度策略規劃報告</p>
              <p className="text-white/60 text-sm mt-8">2024年5月</p>
           </div>
        </div>
        
        {/* Slide 2: Content Slide */}
        <div className={`w-full aspect-video rounded-xl shadow-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500 bg-white delay-100`}>
           <div className={`h-20 ${templateColor || 'bg-blue-600'} flex items-center px-10 flex-shrink-0`}>
              <h2 className="text-2xl font-bold text-white truncate">詳細分析與建議</h2>
           </div>
           <div className="flex-1 p-10 bg-slate-50 overflow-y-auto custom-scrollbar">
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                 {content || '此處將顯示 AI 生成的簡報大綱與內容...'}
              </div>
           </div>
           <div className="h-8 bg-slate-200 flex items-center justify-between px-6 text-[10px] text-slate-500">
              <span>AI Pilot Generated</span>
              <span>Slide 2</span>
           </div>
        </div>
      </div>
    );
  }

  // Document (Draft) Mode
  return (
    <div className="w-full max-w-[210mm] h-full bg-white shadow-md mx-auto my-0 p-10 overflow-y-auto custom-scrollbar border border-slate-200">
       <div className="flex flex-col h-full font-serif text-slate-900 space-y-6">
          <div className="text-center">
             <h2 className="text-2xl font-bold mb-2 text-red-600">{docContent.org}</h2>
             <div className="flex justify-between text-xs text-slate-500 border-b border-red-200 pb-2 mb-4">
               <span>地址：100006 臺北市中正區中華路一段83號</span>
               <span>傳真：(02)2311-6071</span>
             </div>
          </div>
          
          <div className="space-y-1 text-sm">
             <div className="flex"><span className="w-20 text-right mr-2">發文日期：</span><span>{docContent.date}</span></div>
             <div className="flex"><span className="w-20 text-right mr-2">發文字號：</span><span>{docContent.number}</span></div>
             <div className="flex"><span className="w-20 text-right mr-2">速別：</span><span>普通件</span></div>
             <div className="flex"><span className="w-20 text-right mr-2">密等及解密條件：</span><span>普通</span></div>
          </div>

          <div className="space-y-4 text-base leading-loose">
             <div className="flex items-start">
                <span className="font-bold min-w-[3em]">主旨：</span>
                <div>{docContent.subject}</div>
             </div>
             <div className="flex items-start">
                <span className="font-bold min-w-[3em]">說明：</span>
                <div className="whitespace-pre-wrap">{docContent.body}</div>
             </div>
          </div>

          <div className="mt-auto pt-10 flex flex-col items-end">
             <div className="w-40 border-b border-slate-800 mb-2"></div>
             <span className="text-sm font-bold">署長  張 某 某</span>
          </div>
       </div>
    </div>
  );
}
