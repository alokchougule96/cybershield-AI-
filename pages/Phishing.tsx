
import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { analyzePhishing } from '../services/geminiService';

const Phishing: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await analyzePhishing(input);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">Phishing Detection</h2>
        <p className="text-slate-400">Deep link analysis and content inspection using Explainable AI.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste URL or Email content here..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-mono"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !input}
          className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-900/20"
        >
          {loading ? 'Analyzing with Gemini AI...' : 'Scan for Threats'}
        </button>
      </div>

      {result && (
        <div className="glass-card p-8 rounded-3xl animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-6 mb-8 border-b border-slate-800 pb-8">
            <div className={`p-6 rounded-3xl ${result.score > 70 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
              {result.score > 70 ? <ShieldAlert size={48} /> : <ShieldCheck size={48} />}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Threat Assessment</h3>
              <p className={`text-lg font-semibold ${result.score > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>
                Risk Level: {result.status} ({result.score}/100)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-slate-400 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <AlertCircle size={16} /> Red Flags Detected
              </h4>
              <ul className="space-y-3">
                {result.flags.map((flag: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-slate-400 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <Info size={16} /> Gemini AI Logic
              </h4>
              <p className="text-slate-300 leading-relaxed bg-sky-500/5 p-4 rounded-xl border border-sky-500/10 italic">
                "{result.explanation}"
              </p>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Verdict</p>
                <p className="text-sm text-slate-200">{result.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phishing;
