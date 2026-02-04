import React, { useState } from 'react';
import { ModalOverlay } from '../common/ModalOverlay';
import { Plus, X, Trash2 } from 'lucide-react';

export function AddTermModal({ onClose, onConfirm }) {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  // Synonym State
  const [synonyms, setSynonyms] = useState([]);
  const [currentSynonym, setCurrentSynonym] = useState('');

  const handleAddSynonym = (e) => {
      e.preventDefault(); // Prevent form submission if triggered by Enter
      if (currentSynonym.trim() && !synonyms.includes(currentSynonym.trim())) {
          setSynonyms([...synonyms, currentSynonym.trim()]);
          setCurrentSynonym('');
      }
  };

  const handleRemoveSynonym = (indexToRemove) => {
      setSynonyms(synonyms.filter((_, index) => index !== indexToRemove));
  };
    
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleAddSynonym(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { term, category, description, synonyms };
    if (onConfirm) {
        onConfirm(data);
    }
    alert(`新增成功 (Demo):\n詞彙: ${term}\n分類: ${category}\n部分同義詞: ${synonyms.join(', ')}\n描述: ${description}`);
    onClose();
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Plus size={18} />
             </div>
             新增標準名詞
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        標準詞彙 (Main Term) <span className="text-red-500">*</span>
                    </label>
                    <input 
                        required
                        type="text" 
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="例如：行動電話"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-bold text-slate-700"
                    />
                </div>
                
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        同義詞 / 近似詞 (Synonyms)
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input 
                            type="text" 
                            value={currentSynonym}
                            onChange={(e) => setCurrentSynonym(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="輸入並按 Enter 新增..."
                            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                         <button 
                            type="button" 
                            onClick={handleAddSynonym}
                            className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    {/* Tags Display */}
                    <div className="flex flex-wrap gap-2 min-h-[32px]">
                        {synonyms.map((syn, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                                {syn}
                                <button type="button" onClick={() => handleRemoveSynonym(index)} className="hover:text-indigo-900">
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        {synonyms.length === 0 && <span className="text-xs text-slate-400 italic">尚無同義詞</span>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        分類 (Category)
                    </label>
                    <input 
                        type="text" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="例如：電子產品"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        標準名詞說明 (Description)
                    </label>
                    <textarea 
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="請輸入該名詞的標準定義..."
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                    />
                </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                    取消
                </button>
                <button 
                    type="submit"
                    className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                    <Plus size={16} />
                    確認新增
                </button>
            </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
