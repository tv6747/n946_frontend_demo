import React, { useState } from 'react';
import { Waves, Eye, EyeOff } from 'lucide-react';

export function LangFlowPanel() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-10 w-full max-w-sm flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-6">
            <Waves size={48} className="text-black" strokeWidth={2.5} />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight">登入 Langflow</h2>
        
        {/* Form */}
        <div className="w-full space-y-5">
            {/* Username */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    使用者名稱 <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="使用者名稱"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all font-sans"
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    密碼 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="密碼"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all font-sans pr-10"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Login Button */}
            <button className="w-full bg-black text-white font-bold py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-sm mt-4">
                登入
            </button>

            {/* Separator or Spacer */}
            <div className="h-1"></div>

            {/* Sign Up Button */}
            <button className="w-full bg-slate-100 text-slate-700 font-bold py-2.5 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200">
                還沒有帳號？ 註冊
            </button>
        </div>
      </div>
      
      {/* Footer / Demo Note */}
      <div className="mt-8 text-slate-400 text-xs">
          LangFlow Demo Interface
      </div>
    </div>
  );
}
