
import React, { useState } from 'react';
import { PhoneOff, PhoneCall, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { analyzeSpamCall } from '../services/geminiService';

const SpamCall: React.FC = () => {
  const [callerId, setCallerId] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!callerId) return;
    setLoading(true);
    try {
      const data = await analyzeSpamCall(callerId, transcript);
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
        <h2 className="text-4xl font-bold text-white">AI Spam Shield</h2>
        <p className="text-slate-400">Real-time caller risk assessment using voice-to-text pattern recognition.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-slate-500 uppercase font-bold px-1">Caller ID / Number</label>
            <div className="relative">
              <input
                type="text"
                value={callerId}
                onChange={(e) => setCallerId(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono"
              />
              <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-slate-500 uppercase font-bold px-1">Call Transcript (Optional)</label>
            <div className="relative">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={4}
                placeholder="Paste the conversation snippet or key phrases heard..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-sm"
              />
              <FileText className="absolute left-4 top-6 text-slate-500" size={20} />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !callerId}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-900/20"
          >
            {loading ? 'AI Voice Analysis in Progress...' : 'Check Call Risk'}
          </button>
        </div>

        <div className="relative">
          {!result ? (
            <div className="glass-card p-8 rounded-3xl h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                <PhoneOff size={40} />
              </div>
              <p className="text-slate-400 italic">Enter call details to begin real-time analysis.</p>
            </div>
          ) : (
            <div className={`glass-card p-8 rounded-3xl h-full space-y-8 animate-in fade-in zoom-in duration-300 border-2 ${result.isSpam ? 'border-rose-500/40' : 'border-emerald-500/40'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${result.isSpam ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                  {result.isSpam ? <AlertTriangle size={32} /> : <ShieldCheck size={32} />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{result.isSpam ? 'High Risk Call' : 'Safe Caller'}</h3>
                  <p className="text-slate-400 font-medium">Confidence: {result.confidence}%</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Scam Type</p>
                  <p className="text-lg font-bold text-slate-200">{result.scamType}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-slate-500 uppercase font-bold">Threat Indicators</p>
                  <div className="flex flex-wrap gap-2">
                    {result.redFlags.map((flag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-700">
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <p className="text-xs text-sky-400 uppercase font-bold mb-1">Recommended Action</p>
                  <p className="text-sm text-slate-200">{result.actionRecommended}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpamCall;
