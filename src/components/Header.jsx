import { useState } from 'react';
import AboutModal from './AboutModal';

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'FinPulse - Investment Calculator',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) { console.log('Share cancelled'); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className="flex items-center justify-between py-6 mb-10 border-b border-gray-800">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
<div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-heartbeat">
  <span className="text-gray-950 font-black text-2xl">FP</span>
</div>


        <div className="hidden sm:block">
          <h2 className="text-4xl font-black text-white tracking-tight">
                Fin<span className="text-emerald-500">Pulse</span>
              </h2>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Financial Suite</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsAboutOpen(true)}
          className="px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-all border border-gray-800 rounded-xl hover:bg-gray-800"
        >
          About
        </button>
        <button
          onClick={handleShare}
          className="px-5 py-2.5 text-sm font-bold bg-white text-gray-950 rounded-xl hover:bg-emerald-400 transition-all shadow-xl active:scale-95"
        >
          Share App
        </button>
      </div>

      {/* Render Modal Component */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </header>
  );
}