import React from 'react';
import { ACHIEVEMENTS } from '../constants';

interface HallOfFameScreenProps {
  onBack: () => void;
  unlockedIds: string[];
}

const HallOfFameScreen: React.FC<HallOfFameScreenProps> = ({ onBack, unlockedIds = [] }) => {
  const unlockedCount = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id)).length;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="flex-1 w-full max-w-[1024px] mx-auto px-4 sm:px-8 py-6 pb-20">
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-start mb-6">
        <button 
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-full h-10 pr-6 pl-4 bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-[#2a3830] text-slate-900 dark:text-white transition-all shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="font-bold text-sm">ย้อนกลับ</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            หอเกียรติยศ<br/><span className="text-primary">สุดยอดสมองน้อย</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            สะสมครบทุกเหรียญเพื่อเป็นสุดยอดสมองน้อย!
          </p>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-border-dark">
            <div className="relative size-16">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-200 dark:text-zinc-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                <path 
                    className="text-primary transition-all duration-1000 ease-out" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeDasharray={`${progressPercent}, 100`} 
                    strokeWidth="4"
                ></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900 dark:text-white">
                    {progressPercent}%
                </div>
            </div>
            <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">ความก้าวหน้า</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{unlockedCount} / {totalCount} เหรียญรางวัล</p>
            </div>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-surface-dark/60 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm border border-white/50 dark:border-border-dark/50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {ACHIEVEMENTS.map((achievement) => {
                const isUnlocked = unlockedIds.includes(achievement.id);
                return (
                    <div key={achievement.id} className={`group flex flex-col items-center gap-3 text-center ${!isUnlocked ? 'opacity-70 hover:opacity-100' : ''}`}>
                        <div className="relative">
                            <div className={`size-28 md:size-32 rounded-full shadow-lg flex items-center justify-center border-4 transform transition-transform group-hover:scale-105 duration-300
                                ${isUnlocked 
                                    ? `bg-gradient-to-b ${achievement.colorClass} border-white dark:border-zinc-700 medal-shine` 
                                    : 'bg-gray-200 dark:bg-zinc-700 border-dashed border-gray-300 dark:border-zinc-600 group-hover:shake'}`
                            }>
                                <style>{`
                                    .medal-shine::after {
                                        content: '';
                                        position: absolute;
                                        top: -50%; left: -50%; width: 200%; height: 200%;
                                        background: linear-gradient(to bottom right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
                                        transform: rotate(45deg) translate(-100%, -100%);
                                        animation: shine 3s infinite;
                                    }
                                    @keyframes shine {
                                        0% { transform: rotate(45deg) translate(-100%, -100%); }
                                        20% { transform: rotate(45deg) translate(100%, 100%); }
                                        100% { transform: rotate(45deg) translate(100%, 100%); }
                                    }
                                    @keyframes shake {
                                        0%, 100% { transform: translateX(0); }
                                        25% { transform: translateX(-2px); }
                                        75% { transform: translateX(2px); }
                                    }
                                    .group-hover\\:shake:hover {
                                        animation: shake 0.3s ease-in-out;
                                    }
                                `}</style>
                                <span className={`material-symbols-outlined text-5xl md:text-6xl ${isUnlocked ? (achievement.colorClass.includes('yellow') ? 'text-yellow-900' : 'text-white') : 'text-gray-400 dark:text-zinc-500'} drop-shadow-md`}>
                                    {achievement.icon}
                                </span>
                            </div>
                            {isUnlocked ? (
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-md border-2 border-white">
                                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                                </div>
                            ) : (
                                <div className="absolute -bottom-2 -right-2 bg-gray-500 text-white p-1 rounded-full shadow-md border-2 border-white">
                                    <span className="material-symbols-outlined text-sm font-bold">lock</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className={`font-bold text-base md:text-lg leading-tight ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-gray-500'}`}>
                                {isUnlocked || !achievement.secret ? achievement.title : '???'}
                            </h3>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${
                                isUnlocked 
                                ? 'bg-primary/10 text-primary-dark' 
                                : 'bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400'
                            }`}>
                                {achievement.levelRequired}
                            </span>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                                {isUnlocked ? achievement.description : (achievement.secret ? 'ความลับ...' : achievement.description)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
      
      <div className="mt-12 flex justify-center">
        <button onClick={onBack} className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-bold hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            ย้อนกลับไปหน้าหลัก
        </button>
      </div>
    </div>
  );
};

export default HallOfFameScreen;