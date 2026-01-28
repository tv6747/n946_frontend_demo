import React, { useMemo } from 'react';

export function CanvasPreview({ type, content, template, title }) {
  const docContent = useMemo(() => {
    return {
      // Simplified for requirement: "只顯示公文內文的標題與段落"
      messageTitle: title || "範例標題 (請輸入)",
      messageBody: content || "範例內容..."
    };
  }, [content, title]);

  if (type === 'ppt') {
    return (
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto bg-white p-10 min-h-[500px] shadow-sm">
         {/* Title Section */}
         <div className="border-b-2 border-slate-100 pb-6 mb-6">
            <h1 
              className="text-3xl font-bold text-slate-800 outline-none hover:bg-slate-50 transition-colors p-2 rounded"
              contentEditable
              suppressContentEditableWarning
            >
              {docContent.messageTitle}
            </h1>
         </div>
         
         {/* Body Section */}
         <div 
            className="prose prose-lg max-w-none text-slate-600 outline-none hover:bg-slate-50 transition-colors p-2 rounded whitespace-pre-wrap"
            contentEditable
            suppressContentEditableWarning
         >
            {docContent.messageBody}
         </div>
      </div>
    );
  }

  // Document (Draft) Mode
  // Requirement: "只顯示公文內文的標題與段落，不需要套用模板及其他資訊"
  return (
    <div className="w-full max-w-[210mm] min-h-[500px] bg-white shadow-md mx-auto my-0 p-10 overflow-y-auto custom-scrollbar border border-slate-200">
       <div className="flex flex-col space-y-6">
          
          <div className="flex items-start">
              <span className="font-bold min-w-[3em] text-slate-500 select-none">主旨：</span>
              <div 
                 className="flex-1 font-bold text-slate-900 outline-none hover:bg-slate-50 p-1 rounded"
                 contentEditable
                 suppressContentEditableWarning
              >
                  {docContent.messageTitle}
              </div>
          </div>

          <div className="flex items-start">
              <span className="font-bold min-w-[3em] text-slate-500 select-none">說明：</span>
              <div 
                 className="flex-1 whitespace-pre-wrap text-slate-800 outline-none hover:bg-slate-50 p-1 rounded leading-relaxed"
                 contentEditable
                 suppressContentEditableWarning
              >
                  {docContent.messageBody}
              </div>
          </div>

       </div>
    </div>
  );
}
