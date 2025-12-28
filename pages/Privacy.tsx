
import React, { useState } from 'react';
import { Fingerprint, Smartphone, AlertCircle, CheckCircle } from 'lucide-react';
import { generatePrivacyScore } from '../services/geminiService';
import RiskMeter from '../components/RiskMeter';

const Privacy: React.FC = () => {
  const [appName, setAppName] = useState('');
  const [perms, setPerms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!appName || !perms) return;
    setLoading(true);
    try {
      const permList = perms.split(',').map(p => p.trim());
      const data = await generatePrivacyScore(appName, permList);
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
        <h2 className="text-4xl font-bold text-white">Privacy Auditor</h2>
        <p className="text-slate-400">Identify data-hungry apps before you install them.</p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-slate-500 uppercase font-bold px-1">Application Name</label>
            <div className="relative">
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. Photo Editor Pro"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-500 uppercase font-bold px-1">Permissions (Comma Separated)</label>
            <div className="relative">
              <input
                type="text"
                value={perms}
                onChange={(e) => setPerms(e.target.value)}
                placeholder="GPS, Contacts, Camera, Files..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
              <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>
          </div>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !appName}
          className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-900/20"
        >
          {loading ? 'Evaluating Data Ecosystem with Gemini...' : 'Generate Privacy Report'}
        </button>
      </div>

      {result && (
        <div className="glass-card p-8 rounded-3xl animate-in fade-in zoom-in duration-300">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <RiskMeter score={result.privacyScore} label="Privacy Trust Score" />
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Verdict</p>
                <p className="text-slate-200 text-lg leading-tight font-semibold italic">"{result.verdict}"</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-rose-400 font-bold mb-3 flex items-center gap-2">
                  <AlertCircle size={18} /> Suspicious Permissions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.suspiciousPermissions.map((p: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-full text-xs font-bold uppercase tracking-wider">
                      {p}
                    </span>
                  ))}
                  {result.suspiciousPermissions.length === 0 && <span className="text-slate-500 text-sm">No suspicious permissions found.</span>}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sky-400 font-bold flex items-center gap-2">
                  <CheckCircle size={18} /> Data Sharing Insights
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {result.dataSharingPrediction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Privacy;
