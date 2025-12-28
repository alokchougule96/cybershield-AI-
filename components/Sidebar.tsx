
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldAlert, 
  Key, 
  Fingerprint, 
  FileLock, 
  PhoneOff, 
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/phishing', icon: ShieldAlert, label: 'Phishing Detection' },
    { to: '/passwords', icon: Key, label: 'Password Hub' },
    { to: '/privacy', icon: Fingerprint, label: 'Privacy Auditor' },
    { to: '/docs', icon: FileLock, label: 'Secure Docs' },
    { to: '/spam', icon: PhoneOff, label: 'Spam Blocker' },
  ];

  return (
    <aside className="w-64 glass-card border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col p-6 z-50">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-sky-500 rounded-lg neon-glow-blue">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          CyberShield AI
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
            <span className="text-emerald-400 font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Phantoms</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Web Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
