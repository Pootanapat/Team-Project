import React, { useState } from 'react';
import { Play, Settings, Volume2, User, Search, Eye, MousePointer2, Star, X, Info } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  totalHighScore: number;
}

const Home: React.FC<HomeProps> = ({ onStart, totalHighScore }) => {
  const [activeModal, setActiveModal] = useState<'SETTINGS' | 'USER' | null>(null);

  const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-[2rem] shadow-2xl p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 transition-colors">
                <X size={20} />
            </button>
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                {title}
            </h3>
            <div className="text-gray-600 dark:text-gray-300">
                {children}
            </div>
            <button onClick={onClose} className="w-full mt-8 bg-primary text-slate-900 font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors">
                Close
            </button>
        </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 dark:opacity-20"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgJfjIhCa-B_LNq3-ww9Au1TYEJ1cwk0a0qhWyqJIwiuQpdpMIIL-mYowab5odJ3kxm-jf1182KRYAOuxWgmty0rsCkrdlmmESuijBEzRIIxI1we37IZ1DrVeDCLiob_bNd079zgKP4HWNC5LP-27C3QyZNXIC30Lu1CJGcKB9cjYOZFMz5pWGRqktGZGUlSDTGMb1Y3BxxyRX5MSAEqVGurDFqaf-HMuGmOnMgsh4LHsgeTtEh8KyJBUsYOcRRgDv6IUTM0pyVPnz')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background-light/80 via-background-light/50 to-background-light dark:from-background-dark/80 dark:via-background-dark/50 dark:to-background-dark pointer-events-none"></div>

      {/* Header */}
      <header className="w-full flex items-center justify-between p-6 z-20">
        <div className="flex items-center gap-3 bg-white/80 dark:bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-sm">
          <div className="bg-primary text-white p-1 rounded-full">
             <div className="w-6 h-6 flex items-center justify-center font-bold">BB</div>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight">Brain Booster</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex size-12 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md hover:bg-white transition-all shadow-sm cursor-default">
            <Volume2 size={20} className="text-green-600 dark:text-green-400" />
          </button>
          <button 
            onClick={() => setActiveModal('SETTINGS')}
            className="flex size-12 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md hover:bg-white transition-all shadow-sm"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={() => setActiveModal('USER')}
            className="flex size-12 items-center justify-center rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md hover:bg-white transition-all shadow-sm"
          >
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-10">
        <div className="w-full max-w-5xl flex flex-col items-center gap-10 animate-fade-in">
          
          {/* Hero Section */}
          <div className="text-center flex flex-col gap-4 items-center">
            <div className="inline-flex items-center justify-center bg-primary/20 text-green-800 dark:text-green-300 px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase border border-primary/20">
              New Adventure Unlocked
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-sm leading-[0.9] text-slate-900 dark:text-white">
              Zoo <span className="text-primary relative inline-block">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-70 max-w-2xl">
              Train your brain and find the hidden animals! Are you ready for the challenge?
            </p>
          </div>

          {/* Game Dashboard Card */}
          <div className="w-full bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col md:flex-row">
            
            {/* Visual Preview (Left) */}
            <div 
              className="w-full md:w-5/12 h-64 md:h-auto bg-cover bg-center relative group"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyMR43KDEhk4z0EdIIvhxX8syoiDW-Dr_p4n7PetDED8uNH3R3H8wKmg3Xau1hORV8a2WkW9K8W5-CdtDRxgJtkXcZobDuQBxuwrpJYYmTz4KF52RWLVRuQiYYUkX3Q5YM3KF62sGBWVCTpiiXogwLrXa1Gwb8AP-52ZulFpZcGMuvgN5VNL5IWdWv-GI-czVhJoHFJFk8kfm1PIldBMMJXHfAlWP5jC7Rze3R0oRJNL0SSxiMHbfzqvvU6RRcm22MKlWw3YHTwAMW')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-3 rounded-2xl flex items-center gap-3 shadow-lg transform transition-transform group-hover:scale-105 duration-300">
                  <div className="bg-primary/20 p-2 rounded-full text-primary-dark">
                    <Star className="text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-bold opacity-60 uppercase">High Score</p>
                    <p className="text-lg font-black">{totalHighScore.toLocaleString()} pts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content (Right) */}
            <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <span className="text-primary">📖</span> How to Play
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Search, color: "text-cyan-500", bg: "bg-cyan-50", title: "Find Animals", desc: "Search the jungle scene." },
                    { icon: Eye, color: "text-amber-500", bg: "bg-amber-50", title: "Stay Focused", desc: "Keep your eyes sharp!" },
                    { icon: MousePointer2, color: "text-pink-500", bg: "bg-pink-50", title: "Click Carefully", desc: "Avoid wrong spots." }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-primary/30 transition-colors">
                      <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                        <item.icon size={24} strokeWidth={2.5} />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs opacity-60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={onStart}
                  className="group relative w-full overflow-hidden rounded-full bg-primary p-4 md:p-5 transition-transform hover:scale-[1.02] hover:shadow-xl active:scale-95"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 text-slate-900 font-black text-lg md:text-xl tracking-wide uppercase">
                    <span>Start Adventure</span>
                    <Play className="fill-current group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                <p className="text-center text-sm font-medium opacity-50">
                  Tip: Find hidden animals quickly for bonus points!
                </p>
              </div>
            </div>

          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60">
            {['Privacy Policy', 'Parent Dashboard', 'Help & Support'].map((link) => (
              <a key={link} href="#" className="flex items-center gap-2 hover:text-primary transition-colors text-sm font-bold">
                {link}
              </a>
            ))}
          </div>

        </div>
      </main>
      
      {/* Modals */}
      {activeModal === 'SETTINGS' && (
          <Modal title="Settings" onClose={() => setActiveModal(null)}>
              <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                          <Volume2 size={20} />
                          <span className="font-bold">Sound Effects</span>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 bg-white size-4 rounded-full shadow-sm"></div>
                      </div>
                  </div>
                   <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                          <Info size={20} />
                          <span className="font-bold">Version</span>
                      </div>
                      <span className="opacity-60 font-mono text-sm">v1.0.2</span>
                  </div>
              </div>
          </Modal>
      )}

       {activeModal === 'USER' && (
          <Modal title="Player Profile" onClose={() => setActiveModal(null)}>
              <div className="flex flex-col items-center gap-4 text-center">
                  <div className="size-24 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center">
                      <User size={48} className="opacity-50" />
                  </div>
                  <div>
                      <h4 className="text-xl font-bold">Guest Explorer</h4>
                      <p className="opacity-60">Playing on this device</p>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-3 mt-4">
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                          <p className="text-xs uppercase font-bold opacity-50 mb-1">High Score</p>
                          <p className="text-xl font-black text-primary">{totalHighScore.toLocaleString()}</p>
                      </div>
                       <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                          <p className="text-xs uppercase font-bold opacity-50 mb-1">Rank</p>
                          <p className="text-xl font-black">Rookie</p>
                      </div>
                  </div>
              </div>
          </Modal>
      )}

    </div>
  );
};

export default Home;