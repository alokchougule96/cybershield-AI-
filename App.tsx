
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Phishing from './pages/Phishing';
import Passwords from './pages/Passwords';
import Privacy from './pages/Privacy';
import Docs from './pages/Docs';
import SpamCall from './pages/SpamCall';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2"></div>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/phishing" element={<Phishing />} />
          <Route path="/passwords" element={<Passwords />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/spam" element={<SpamCall />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
