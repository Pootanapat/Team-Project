import React from 'react';
import { LevelConfig } from '../types';

interface ResultScreenProps {
  score: number;
  highScore: number;
  win: boolean;
  levelConfig: LevelConfig;
  onPlayAgain: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, highScore, win, levelConfig, onPlayAgain, onHome }) => {
  // Calculate stars based on level thresholds
  let stars = 0;
  if (win) {
    stars = 1;
    if (score >= levelConfig.starThresholds.threeStars) {
      stars = 3;
    } else if (score >= levelConfig.starThresholds.twoStars) {
      stars = 2;
    }
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto flex-1 items-center justify-center py-8 relative">
        {/* Confetti Background Layer */}
        {win && (
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full z-0">
                <div className="confetti left-[10%] top-[-10%]" style={{animationDelay: '0s'}}></div>
                <div className="confetti left-[20%] top-[-20%]" style={{animationDelay: '1.2s'}}></div>
                <div className="confetti left-[35%] top-[-15%]" style={{animationDelay: '0.5s'}}></div>
                <div className="confetti left-[50%] top-[-10%]" style={{animationDelay: '2s'}}></div>
                <div className="confetti left-[65%] top-[-25%]" style={{animationDelay: '1.5s'}}></div>
                <div className="confetti left-[80%] top-[-5%]" style={{animationDelay: '0.8s'}}></div>
                <div className="confetti left-[90%] top-[-18%]" style={{animationDelay: '2.5s'}}></div>
                <div className="confetti left-[15%] top-[-30%]" style={{animationDelay: '1.8s'}}></div>
                 <style>{`
                    @keyframes fall {
                        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                    }
                    .confetti {
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        background-color: #0df259;
                        opacity: 0.8;
                        border-radius: 50%;
                        animation: fall 3s linear infinite;
                    }
                    .confetti:nth-child(2n) { background-color: #ffffff; width: 8px; height: 8px; animation-duration: 4s; }
                    .confetti:nth-child(3n) { background-color: #ffd700; width: 12px; height: 12px; animation-duration: 2.5s; }
                    .confetti:nth-child(4n) { background-color: #ff6b6b; width: 9px; height: 9px; animation-duration: 3.5s; }
                `}</style>
            </div>
        )}

        <div className="relative z-10 flex flex-col items-center w-full">
            {/* Stars */}
            <div className="flex flex-col items-center justify-center w-full mb-8">
                <div className="relative mb-6">
                    <div className="flex gap-4 items-end">
                         {/* Left Star */}
                        <div className={`text-[#e5e7eb] dark:text-[#28392e] transition-all delay-100 duration-500 transform ${stars >= 2 ? 'text-primary drop-shadow-[0_0_15px_rgba(13,242,89,0.5)] scale-110' : ''}`}>
                             <span className={`material-symbols-outlined text-[64px] md:text-[80px] fill-1`}>star</span>
                        </div>
                         {/* Center Star (Main) */}
                        <div className={`relative -top-6 text-[#e5e7eb] dark:text-[#28392e] transition-all delay-300 duration-500 transform ${stars >= 3 ? 'text-primary drop-shadow-[0_0_25px_rgba(13,242,89,0.6)] scale-125' : ''}`}>
                             <span className={`material-symbols-outlined text-[96px] md:text-[120px] fill-1`}>star</span>
                        </div>
                         {/* Right Star */}
                        <div className={`text-[#e5e7eb] dark:text-[#28392e] transition-all duration-500 transform ${stars >= 1 ? 'text-primary drop-shadow-[0_0_15px_rgba(13,242,89,0.5)] scale-110' : ''}`}>
                             <span className={`material-symbols-outlined text-[64px] md:text-[80px] fill-1`}>star</span>
                        </div>
                    </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#111813] to-[#4b5563] dark:from-white dark:to-gray-400">
                    {win ? 'ยอดเยี่ยม!' : 'ลองใหม่อีกครั้ง!'}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium text-center">
                    {win ? 'คุณทำได้ดีมากในการค้นหาสัตว์ต่างๆ' : 'เวลาหรือชีวิตหมดแล้ว อย่าเพิ่งยอมแพ้นะ'}
                </p>
            </div>

            {/* Star Conditions */}
            {win && (
              <div className="flex flex-col md:flex-row gap-4 mb-8 bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5">
                <div className={`flex items-center gap-2 ${stars >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="text-sm font-bold">ภารกิจสำเร็จ</span>
                </div>
                <div className={`flex items-center gap-2 ${stars >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="text-sm font-bold">คะแนน {'>'} {levelConfig.starThresholds.twoStars}</span>
                </div>
                <div className={`flex items-center gap-2 ${stars >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="text-sm font-bold">คะแนน {'>'} {levelConfig.starThresholds.threeStars}</span>
                </div>
              </div>
            )}

            {/* New Record Badge */}
            {win && score >= highScore && score > 0 && (
                 <div className="animate-float mb-8 relative z-20">
                     <div className="inline-flex items-center gap-2 bg-primary text-background-dark px-6 py-2 rounded-full shadow-[0_0_20px_rgba(13,242,89,0.4)] border-2 border-white/20">
                        <span className="material-symbols-outlined animate-bounce">celebration</span>
                        <span className="text-lg font-bold tracking-wide">สถิติใหม่! 🎉</span>
                     </div>
                </div>
            )}

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[600px] mb-12">
                <div className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-xl shadow-lg border-2 border-primary/50 flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-2 text-primary">
                        <span className="material-symbols-outlined">sports_score</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-medium">คะแนนปัจจุบัน</p>
                    <p className="text-5xl font-bold text-[#111813] dark:text-white tracking-tight">{score}</p>
                </div>
                
                <div className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-xl shadow-lg border border-[#e5e7eb] dark:border-[#28392e] flex flex-col items-center justify-center gap-2">
                    <div className="size-12 rounded-full bg-[#e5e7eb] dark:bg-[#28392e] flex items-center justify-center mb-2 text-gray-500 dark:text-gray-300">
                        <span className="material-symbols-outlined">emoji_events</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-medium">สถิติสูงสุด</p>
                    <p className="text-5xl font-bold text-[#111813] dark:text-white tracking-tight">{highScore}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
                <button 
                    onClick={onPlayAgain}
                    className="w-full h-16 bg-primary hover:bg-primary/90 text-background-dark text-xl font-bold rounded-full shadow-[0_0_20px_rgba(13,242,89,0.3)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                >
                    <span className="material-symbols-outlined text-3xl">replay</span>
                    เล่นอีกครั้ง
                </button>
                 <button 
                    onClick={onHome}
                    className="w-full h-14 bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-card-hover text-slate-800 dark:text-white text-lg font-bold rounded-full transition-all flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-2xl">home</span>
                    กลับเมนูหลัก
                </button>
            </div>
        </div>
    </div>
  );
};

export default ResultScreen;