export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500" />
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">
                Fin<span className="text-emerald-500">Pulse</span>
              </h2>
              <p className="text-emerald-500/80 font-mono text-xs uppercase tracking-[0.2em] mt-1">
                Precision Financial Engine v1.2
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Mission Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Master Your Future</h3>
              <p className="text-gray-400 leading-relaxed">
                FinPulse isn't just a calculator—it's a mission control for your 
                <span className="text-white font-semibold"> Financial Independence</span>. 
                We've distilled complex fiscal modeling into a high-performance interface.
              </p>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <p className="text-sm text-emerald-400 italic">
                  "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it."
                </p>
                <p className="text-sm text-emerald-400 italic text-right">
                    — Albert Einstein
                </p>
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Capabilities</h3>
              <ul className="space-y-3">
                {[
                  { t: 'Multi-Asset Analysis', d: 'Compare Equities, Gold, and Cash dynamic performance.', c: 'emerald' },
                  { t: 'Inflation Shield', d: 'Real-world purchasing power adjustments.', c: 'blue' },
                  { t: 'FIRE Simulation', d: '4% Safe Withdrawal Rate (SWR) modeling.', c: 'amber' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${item.c}-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]`} />
                    <div>
                      <p className="text-sm font-bold text-gray-200 leading-none">{item.t}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-gray-800">
            <div className="flex gap-4">
               <div className="text-center">
                  <p className="text-lg font-bold text-white">100%</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Client-Side</p>
               </div>
               <div className="w-px h-8 bg-gray-800" />
               <div className="text-center">
                  <p className="text-lg font-bold text-white">SECURE</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">No-Tracking</p>
               </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black rounded-2xl transition-all shadow-[0_8px_30px_rgb(16,185,129,0.2)] active:scale-95"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}