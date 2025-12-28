
import React from 'react';

interface RiskMeterProps {
  score: number;
  label: string;
  max?: number;
}

const RiskMeter: React.FC<RiskMeterProps> = ({ score, label, max = 100 }) => {
  const percentage = (score / max) * 100;
  
  const getColor = () => {
    if (percentage < 30) return 'text-emerald-400';
    if (percentage < 70) return 'text-yellow-400';
    return 'text-rose-500';
  };

  const getBarColor = () => {
    if (percentage < 30) return 'bg-emerald-400';
    if (percentage < 70) return 'bg-yellow-400';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-slate-400 text-sm uppercase tracking-widest">{label}</p>
          <p className={`text-4xl font-bold ${getColor()}`}>{score}<span className="text-slate-600 text-lg ml-1">/ {max}</span></p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
          percentage < 30 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
          percentage < 70 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
          'bg-rose-500/10 border-rose-500/30 text-rose-500'
        }`}>
          {percentage < 30 ? 'Low Risk' : percentage < 70 ? 'Moderate' : 'High Threat'}
        </div>
      </div>
      
      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div 
          className={`h-full transition-all duration-1000 ease-out rounded-full ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default RiskMeter;
