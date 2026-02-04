import React from 'react';

export function MainLayout({ sidebar, header, children, modals }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar */}
      {sidebar}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative h-full">
        {header}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>

      {/* Modals */}
      {modals}
    </div>
  );
}
