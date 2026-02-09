import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { ModalOverlay } from '../common/ModalOverlay';

export function UploadModal({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['.pdf', '.doc', '.docx'];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setError('僅支援 PDF 和 Word 檔案格式（.pdf, .doc, .docx）');
      setSelectedFile(null);
      e.target.value = '';
      return;
    }
    
    setError('');
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setError('僅支援 PDF 和 Word 檔案格式（.pdf, .doc, .docx）');
      setSelectedFile(null);
      return;
    }
    
    setError('');
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <UploadCloud className="text-blue-600"/> 上傳文件
        </h3>
        
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div 
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-slate-300 rounded-xl h-48 flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50/30 hover:border-blue-400 transition-all cursor-pointer group mb-4"
        >
           <div className="p-4 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
             <UploadCloud size={32} className="text-blue-500" />
           </div>
           <p className="text-sm font-medium text-slate-700 mb-1">拖曳檔案至此，或點擊上傳</p>
           <p className="text-xs text-slate-500 font-medium">支援格式：PDF、Word（.pdf, .doc, .docx）</p>
           <p className="text-xs text-slate-400 mt-1">最大 10MB</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {selectedFile && (
          <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-700">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={handleRemoveFile}
              className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">取消</button>
          <button 
            onClick={onClose} 
            disabled={!selectedFile}
            className={`px-4 py-2 font-medium rounded-lg shadow-md transition-colors ${
              selectedFile 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            確認上傳
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
