import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ModalOverlay } from '../../components/common/ModalOverlay';

export function PromptSaveConfirmModal({ onClose }) {
  const [saveName, setSaveName] = useState("我的提示詞設定 v1.2");
  const [versionType, setVersionType] = useState("new");

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Save className="text-blue-600"/> 儲存提示詞設定</h3>
        
        <div className="space-y-4 mb-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">設定名稱</label>
                <input 
                    value={saveName} 
                    onChange={(e) => setSaveName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">版本控制</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input 
                            type="radio" 
                            name="versionType" 
                            value="new" 
                            checked={versionType === "new"} 
                            onChange={() => setVersionType("new")}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        建立新版本
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input 
                            type="radio" 
                            name="versionType" 
                            value="overwrite" 
                            checked={versionType === "overwrite"} 
                            onChange={() => setVersionType("overwrite")}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        覆蓋目前版本
                    </label>
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          <button onClick={() => { alert('儲存成功！'); onClose(); }} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md">確認儲存</button>
        </div>
      </div>
    </ModalOverlay>
  );
}
