import React from 'react';
import { RefreshCcw, LayoutGrid, Star, Trophy, PartyPopper, Music } from 'lucide-react';

interface ResultProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

const Result: React.FC<ResultProps> = ({ score, onRestart, onHome }) => {
  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Confetti / Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full opacity-10" 
              style={{ 
                  backgroundImage: 'radial-gradient(#f4c025 2px, transparent 2px)', 
                  backgroundSize: '40px 40px' 
              }}>
         </div>
         {/* Animated Blobs */}
         <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow"></div>
         <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] animate-pulse-slow"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[480px] p-4 animate-fade-in">
        <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 flex flex-col overflow-hidden relative">
          
          {/* Top Decorative Bar */}
          <div className="h-3 w-full bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>

          <div className="p-8 pb-10 flex flex-col items-center gap-8">
            
            {/* Header / Trophy */}
            <div className="flex flex-col items-center text-center gap-4">
               <div className="relative group">
                  <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative size-24 bg-background-light dark:bg-[#233529] rounded-full flex items-center justify-center border-4 border-white dark:border-surface-dark shadow-sm">
                     <Trophy className="text-primary w-12 h-12 animate-bounce-slow" />
                  </div>
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight uppercase">
                    Mission<br/>Accomplished!
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Great job finding all the hidden animals!
                  </p>
               </div>
            </div>

            {/* Stars */}
            <div className="flex items-end justify-center gap-3 h-20">
               <Star className="w-12 h-12 text-yellow-400 fill-current transform -rotate-12 drop-shadow-md" />
               <Star className="w-16 h-16 text-yellow-400 fill-current transform -translate-y-4 drop-shadow-lg" />
               <Star className="w-12 h-12 text-yellow-400 fill-current transform rotate-12 drop-shadow-md" />
            </div>

            {/* Score */}
            <div className="w-full">
                <div className="flex flex-col items-center justify-center rounded-2xl p-6 bg-background-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <p className="text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Total Score</p>
                    <p className="text-5xl font-black tracking-tighter leading-none">{score.toLocaleString()}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-3 mt-2">
                <button 
                  onClick={onRestart}
                  className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-primary hover:bg-primary-dark text-slate-900 transition-all duration-200 shadow-[0_4px_0_0_#0aa83f] active:shadow-none active:translate-y-[4px]"
                >
                   <div className="flex items-center gap-3 font-bold text-lg tracking-wide z-10">
                      <RefreshCcw className="group-hover:rotate-180 transition-transform duration-500" />
                      <span>PLAY AGAIN</span>
                   </div>
                </button>

                <button 
                   onClick={onHome}
                   className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 px-5 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 font-bold text-sm transition-colors gap-2"
                >
                   <LayoutGrid size={20} />
                   <span>Back to Menu</span>
                </button>
            </div>

          </div>
        </div>

        {/* Floating Decos */}
        <div className="absolute -right-4 top-24 size-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg -rotate-12 animate-bounce z-20 hidden sm:flex text-yellow-800">
             <PartyPopper size={24} />
        </div>
         <div className="absolute -left-2 bottom-32 size-10 bg-blue-400 rounded-full flex items-center justify-center shadow-lg rotate-12 animate-bounce z-20 hidden sm:flex text-blue-900">
             <Music size={20} />
        </div>

      </div>
    </div>
  );
};

export default Result;