
import React, { useState } from 'react';
import { Key, Eye, EyeOff, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import { analyzePasswordStrength } from '../services/geminiService';

const Passwords: React.FC = () => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const checkStrength = async () => {
    if (!password) return;
    setLoading(true);
    try {
      const data = await analyzePasswordStrength(password);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">Password Guardian</h2>
        <p className="text-slate-400">Military-grade complexity analysis and breach alert simulation.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to test..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-12 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
          />
          <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <button 
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          onClick={checkStrength}
          disabled={loading || !password}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-900/20"
        >
          {loading ? 'Consulting Gemini AI Security Experts...' : 'Check Strength & Leaks'}
        </button>
      </div>

      {result && (
        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold">Complexity</h3>
              <ShieldCheck className="text-emerald-400" size={20} />
            </div>
            <p className="text-4xl font-bold text-white">{result.complexityScore}/10</p>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${result.complexityScore > 7 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                style={{ width: `${result.complexityScore * 10}%` }}
              ></div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold">Crack Time</h3>
              <Activity className="text-sky-400" size={20} />
            </div>
            <p className="text-2xl font-bold text-white">{result.timeToCrack}</p>
            <p className="text-xs text-slate-500 italic">Estimated using high-end brute-force simulation</p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-slate-400 uppercase tracking-widest text-xs font-bold">Status</h3>
              <AlertTriangle className="text-yellow-400" size={20} />
            </div>
            <p className="text-xl font-bold text-white">{result.complexityScore > 6 ? 'Secure' : 'Needs Improvement'}</p>
            <p className="text-xs text-slate-500">AI analysis completed.</p>
          </div>

          <div className="md:col-span-3 glass-card p-6 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-rose-400 font-bold flex items-center gap-2">
                  <AlertTriangle size={16} /> Key Vulnerabilities
                </h4>
                <div className="space-y-2">
                  {result.vulnerabilities.map((v: string, i: number) => (
                    <div key={i} className="text-sm text-slate-300 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                      {v}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                  <ShieldCheck size={16} /> Recommended Variations
                </h4>
                <div className="space-y-2">
                  {result.suggestions.map((s: string, i: number) => (
                    <div key={i} className="text-sm font-mono text-emerald-400 bg-slate-900 border border-emerald-900/30 p-3 rounded-lg flex justify-between items-center group cursor-pointer hover:bg-emerald-900/10 transition-colors">
                      {s}
                      <span className="text-[10px] text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">COPY</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passwords;
