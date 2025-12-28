
import React, { useState } from 'react';
import { FileLock, Share2, Upload, History, CheckCircle2, Shield } from 'lucide-react';

const Docs: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    // Simulate hashing and blockchain logging
    setTimeout(() => {
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        hash: Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        timestamp: new Date().toLocaleString(),
        status: 'Immutable'
      };
      setLogs([newLog, ...logs]);
      setFile(null);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">Secure Document Ledger</h2>
        <p className="text-slate-400">End-to-end encrypted file sharing with blockchain-backed integrity.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl space-y-8">
          <div className="flex items-center gap-3">
            <Upload className="text-sky-400" />
            <h3 className="text-xl font-bold text-white">Upload Document</h3>
          </div>
          
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center space-y-4 hover:border-sky-500/50 transition-colors cursor-pointer group">
            <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 group-hover:text-sky-400 transition-colors">
              <FileLock size={32} />
            </div>
            <div>
              <p className="text-slate-300 font-bold">Drop files here or click to browse</p>
              <p className="text-slate-500 text-sm mt-1">PDF, DOCX, ZIP (Max 50MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              id="fileInput"
            />
            <label htmlFor="fileInput" className="block text-sky-400 text-sm hover:underline cursor-pointer">
              {file ? `Selected: ${file.name}` : 'Select a file'}
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">Zero-Knowledge Proof</p>
                <p className="text-xs text-slate-500">Only you hold the encryption keys.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3"
          >
            {loading ? 'Generating Integrity Hash...' : <><Share2 size={20} /> Encrypt & Share</>}
          </button>
        </div>

        <div className="glass-card p-8 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <History className="text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Audit Trail</h3>
            </div>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Live Ledger</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2">
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
                <FileLock size={48} className="mb-4 opacity-20" />
                No documents shared yet.
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-200">{log.name}</p>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      {log.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Hash ID</p>
                    <p className="text-[10px] font-mono text-sky-400 break-all bg-black/40 p-2 rounded border border-slate-800">
                      {log.hash}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>{log.timestamp}</span>
                    <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 size={10} /> Block Verified</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
