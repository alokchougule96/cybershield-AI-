
import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';
import RiskMeter from '../components/RiskMeter';

const Dashboard: React.FC = () => {
  const alerts = [
    { id: '1', type: 'Phishing', severity: 'high', title: 'Suspicious login URL detected', time: '2 mins ago' },
    { id: '2', type: 'Breach', severity: 'critical', title: 'Password found in 3 recent leaks', time: '1 hour ago' },
    { id: '3', type: 'Privacy', severity: 'medium', title: 'New app tracking detected', time: '4 hours ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Security Overview</h2>
          <p className="text-slate-400">Real-time threat monitoring and proactive privacy protection.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-400">System Live</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-sky-400" />
            <h3 className="text-lg font-bold text-slate-200">Aggregated Risk Score</h3>
          </div>
          <RiskMeter score={82} label="Privacy Index" />
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <p className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Scans Today</p>
              <p className="text-xl font-bold text-sky-400">1,248</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <p className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Threats Blocked</p>
              <p className="text-xl font-bold text-emerald-400">12</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <p className="text-slate-500 text-xs mb-1 uppercase tracking-wider">Breach Alerts</p>
              <p className="text-xl font-bold text-rose-400">03</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="text-rose-400" />
            <h3 className="text-lg font-bold text-slate-200">Active Threats</h3>
          </div>
          <div className="flex-1 space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
                <div className={`p-2 rounded-lg ${
                  alert.severity === 'critical' ? 'bg-rose-500/20 text-rose-400' : 
                  alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : 'bg-sky-500/20 text-sky-400'
                }`}>
                  <AlertTriangle size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{alert.type}</span>
                    <span className="text-[10px] text-slate-600 flex items-center gap-1"><Clock size={10} /> {alert.time}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 leading-tight">{alert.title}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-all">
            View All Alerts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Phishing Protected', value: '99.9%', icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Data Encrypted', value: '256-bit', icon: ShieldAlert, color: 'text-sky-400' },
          { label: 'Uptime', value: '100%', icon: TrendingUp, color: 'text-sky-400' },
          { label: 'API Latency', value: '120ms', icon: Info, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
