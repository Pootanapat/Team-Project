import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Animal, Difficulty, LevelConfig } from '../types';
import { ALL_ANIMALS } from '../constants';

interface GameScreenProps {
  config: LevelConfig;
  onGameOver: (score: number, win: boolean, stats?: { lives: number, maxLives: number, timeLeft: number }) => void;
  onExit: () => void;
}

type GameStatus = 'COUNTDOWN' | 'PLAYING' | 'PAUSED' | 'ENDED';

const GameScreen: React.FC<GameScreenProps> = ({ config, onGameOver, onExit }) => {
  // Game Logic State
  const [status, setStatus] = useState<GameStatus>('COUNTDOWN');
  const [countdown, setCountdown] = useState(3);
  
  // Game Data State
  const [items, setItems] = useState<Animal[]>(() => {
    // Clone and randomize items on mount
    return ALL_ANIMALS.slice(0, config.itemCount).map(animal => ({
      ...animal,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 70 + 15, // 15% to 85%
      scale: Math.random() * 0.4 + 0.8 
    }));
  });

  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [score, setScore] = useState(0);
  const maxLives = config.difficulty === Difficulty.HARD ? 3 : 5;
  const [lives, setLives] = useState(maxLives);
  
  // Refs for values needed inside interval to prevent restart
  const scoreRef = useRef(score);
  const itemsRef = useRef(items);
  const livesRef = useRef(lives);

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { livesRef.current = lives; }, [lives]);

  // Visual Effects State
  const [penaltyActive, setPenaltyActive] = useState(false);
  const [penaltyText, setPenaltyText] = useState<{show: boolean, text: string}>({show: false, text: ''});
  const [showSettings, setShowSettings] = useState(false);
  const [hintCount, setHintCount] = useState(3);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);

  // --- Countdown Logic ---
  useEffect(() => {
    if (status === 'COUNTDOWN') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStatus('PLAYING');
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // 1 second interval
      return () => clearInterval(timer);
    }
  }, [status]);

  // --- Main Game Timer ---
  useEffect(() => {
    if (status !== 'PLAYING') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus('ENDED');
          // Time ran out = Lose
          onGameOver(scoreRef.current, false, { lives: livesRef.current, maxLives, timeLeft: 0 }); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, onGameOver, maxLives]);

  // --- Win/Lose Conditions ---
  // We check this separately from timer so interactions trigger it immediately
  useEffect(() => {
    if (status !== 'PLAYING') return;

    // Win: All items found
    if (items.length === 0) {
      setStatus('ENDED');
      // Score calculation: Base Score + (Time Left * 50) + (Lives Remaining * 300)
      // INCREASED SCORING: Time x50 (was x20), Lives x300 (was x100)
      const finalScore = score + (timeLeft * 50) + (lives * 300);
      onGameOver(finalScore, true, { lives, maxLives, timeLeft });
    }
    
    // Lose: No lives left
    if (lives <= 0) {
      setStatus('ENDED');
      onGameOver(score, false, { lives, maxLives, timeLeft });
    }
  }, [items.length, lives, status, timeLeft, score, onGameOver, maxLives]);


  // --- Interaction Handlers ---

  const handleItemClick = (id: string) => {
    if (status !== 'PLAYING') return;
    
    setItems(prev => prev.filter(item => item.id !== id));
    setScore(prev => prev + 500); // INCREASED SCORING: 500 per item (was 150)
    
    if (highlightedItem === id) {
        setHighlightedItem(null);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (status !== 'PLAYING') return;

    // Trigger penalty for any click on the background/main area
    // that hasn't been caught by buttons or items (stopPropagation)
    triggerPenalty();
  };

  const triggerPenalty = useCallback(() => {
    // Penalty logic
    setLives(prev => prev - 1);
    setScore(prev => Math.max(0, prev - 100)); // Increased penalty slightly
    setTimeLeft(prev => Math.max(0, prev - 3)); // Lose time on wrong click
    
    // Visuals
    setPenaltyActive(true);
    setPenaltyText({show: true, text: 'พลาด!'});
    
    setTimeout(() => setPenaltyActive(false), 500);
    setTimeout(() => setPenaltyText({show: false, text: ''}), 800);
  }, []);

  const useHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hintCount > 0 && items.length > 0 && !highlightedItem && status === 'PLAYING') {
        setHintCount(prev => prev - 1);
        const randomItem = items[Math.floor(Math.random() * items.length)];
        setHighlightedItem(randomItem.id);
        
        // Remove highlight after 4 seconds
        setTimeout(() => setHighlightedItem(null), 4000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'PLAYING') setStatus('PAUSED');
    else if (status === 'PAUSED') setStatus('PLAYING');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-black text-white font-display">
      
      {/* Main Game Area */}
      <main 
        className="relative flex-1 h-full overflow-hidden group/game-area cursor-crosshair select-none"
        onClick={handleBackgroundClick}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className={`w-full h-full bg-cover bg-center transition-all duration-300 
              ${(status === 'PAUSED' || status === 'COUNTDOWN' || showSettings) ? 'blur-sm grayscale brightness-50' : 'opacity-50 grayscale-[20%]'}`}
            style={{ backgroundImage: `url('${config.bgImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-background-dark/40 mix-blend-multiply"></div>
        </div>

        {/* --- Overlays --- */}

        {/* Improved Countdown / Mission Start Overlay */}
        {status === 'COUNTDOWN' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-4 animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center w-full max-w-5xl">
                {/* Level Title */}
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight text-center drop-shadow-lg">
                    ภารกิจ: {config.name}
                </h2>
                <div className="w-24 h-1.5 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(13,242,89,0.8)]"></div>

                {/* Objectives Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full mb-10 md:mb-16">
                    {/* Objective 1 */}
                    <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-row md:flex-col items-center gap-4 md:gap-4 shadow-xl backdrop-blur-sm">
                        <div className="size-16 md:size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-0 md:mb-1 border-2 border-primary/20 shrink-0">
                            <span className="material-symbols-outlined text-4xl md:text-5xl">search</span>
                        </div>
                        <div className="text-left md:text-center">
                            <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-wider mb-1">เป้าหมาย</p>
                            <p className="text-2xl md:text-4xl font-black text-white leading-none">หาให้ครบ <span className="text-primary">{config.itemCount}</span></p>
                        </div>
                    </div>

                    {/* Objective 2 */}
                    <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-row md:flex-col items-center gap-4 md:gap-4 shadow-xl backdrop-blur-sm">
                        <div className="size-16 md:size-20 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-0 md:mb-1 border-2 border-blue-500/20 shrink-0">
                            <span className="material-symbols-outlined text-4xl md:text-5xl">timer</span>
                        </div>
                        <div className="text-left md:text-center">
                            <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-wider mb-1">เวลาจำกัด</p>
                            <p className="text-2xl md:text-4xl font-black text-white leading-none">{config.timeLimit} <span className="text-lg md:text-xl font-bold text-white/80">วินาที</span></p>
                        </div>
                    </div>

                    {/* Objective 3 */}
                    <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl flex flex-row md:flex-col items-center gap-4 md:gap-4 shadow-xl backdrop-blur-sm">
                        <div className="size-16 md:size-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mb-0 md:mb-1 border-2 border-red-500/20 shrink-0">
                            <span className="material-symbols-outlined text-4xl md:text-5xl">favorite</span>
                        </div>
                        <div className="text-left md:text-center">
                            <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-wider mb-1">โอกาสพลาด</p>
                            <p className="text-2xl md:text-4xl font-black text-white leading-none">{maxLives} <span className="text-lg md:text-xl font-bold text-white/80">ครั้ง</span></p>
                        </div>
                    </div>
                </div>

                {/* Countdown Number */}
                <div className="relative flex flex-col items-center">
                    <p className="text-white/40 text-sm md:text-lg font-bold uppercase tracking-[0.3em] mb-2 animate-pulse">Game Starting in</p>
                    <h1 className="text-[100px] md:text-[140px] font-black text-white leading-none drop-shadow-[0_0_50px_rgba(13,242,89,0.6)] animate-bounce transform transition-all">
                    {countdown > 0 ? countdown : <span className="text-primary">GO!</span>}
                    </h1>
                </div>
            </div>
          </div>
        )}

        {/* Penalty Flash */}
        {penaltyActive && (
          <div className="absolute inset-0 z-20 pointer-events-none bg-red-500/20 mix-blend-overlay animate-pulse"></div>
        )}

        {/* Floating Text (Penalty/Score) */}
        {penaltyText.show && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-bounce">
                <h1 className="text-red-500 text-6xl font-black drop-shadow-lg stroke-white" style={{WebkitTextStroke: '2px white'}}>
                    {penaltyText.text}
                </h1>
            </div>
        )}

        {/* HUD - Top Bar */}
        <div className="absolute top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-4 md:gap-8 shadow-2xl border-t border-white/10 bg-black/60 backdrop-blur-md">
             {/* Difficulty Badge */}
             <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${config.difficulty === Difficulty.HARD ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'}`}>
                <span className="material-symbols-outlined text-sm">
                    {config.difficulty === Difficulty.HARD ? 'local_fire_department' : 'eco'}
                </span>
                {config.difficulty}
             </div>

            <div className="h-6 w-[1px] bg-white/10"></div>
           
            {/* Stats */}
            <div className="flex items-center gap-6">
               {/* Lives */}
               <div className="flex items-center gap-1">
                  {Array.from({length: maxLives}).map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-[24px] transition-all ${i < lives ? 'text-red-500 fill-1' : 'text-gray-600'}`} style={{fontVariationSettings: "'FILL' 1"}}>
                          favorite
                      </span>
                  ))}
               </div>

               <div className="h-6 w-[1px] bg-white/10"></div>

               {/* Timer */}
               <div className={`flex items-center gap-2 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                  <span className="material-symbols-outlined text-[24px]">timer</span>
                  <span className="text-2xl font-bold tabular-nums font-mono">{formatTime(timeLeft)}</span>
               </div>
               
               <div className="h-6 w-[1px] bg-white/10"></div>

               {/* Score */}
               <div className="flex flex-col items-center">
                 <span className="text-xs text-white/50 font-bold uppercase">Score</span>
                 <span className="text-xl font-bold tabular-nums leading-none text-primary">{score}</span>
               </div>
            </div>

            <button onClick={togglePause} className="md:hidden ml-2 flex size-8 items-center justify-center rounded-full bg-white/10 text-white pointer-events-auto active:bg-white/20">
                <span className="material-symbols-outlined text-lg">{status === 'PAUSED' ? 'play_arrow' : 'pause'}</span>
            </button>
          </div>
        </div>

        {/* Game Items Layer */}
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            {items.map(item => (
                <div 
                    key={item.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item.id);
                    }}
                    className={`absolute p-2 rounded-full backdrop-blur-sm cursor-pointer transition-all duration-300 pointer-events-auto
                        ${highlightedItem === item.id 
                            ? 'bg-primary/40 scale-125 shadow-[0_0_50px_rgba(13,242,89,1)] border-4 border-primary z-30 animate-pulse' 
                            : 'bg-black/20 hover:bg-black/60 hover:scale-110 active:scale-95 shadow-lg border border-white/5'}
                    `}
                    style={{
                        top: `${item.y}%`,
                        left: `${item.x}%`,
                        color: item.color,
                        transform: highlightedItem === item.id ? 'scale(1.5)' : `scale(${item.scale})`
                    }}
                >
                    <span className="material-symbols-outlined text-4xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter">
                        {item.icon}
                    </span>
                    {highlightedItem === item.id && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce">
                            อยู่นี่จ้า!
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-6 z-40 flex gap-4">
             <button 
                onClick={togglePause} 
                className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#1a0c0c] border border-white/10 text-white hover:bg-primary hover:border-primary hover:text-black transition-all shadow-lg group"
            >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                    {status === 'PAUSED' ? 'play_arrow' : 'pause'}
                </span>
            </button>
             <button 
                onClick={(e) => { e.stopPropagation(); setShowSettings(true); }}
                className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#1a0c0c] border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg group"
            >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
            </button>
        </div>
        
        {/* Hint Button */}
        <div className="absolute bottom-6 right-6 z-40">
             <button 
                onClick={useHint}
                disabled={hintCount === 0 || items.length === 0 || status !== 'PLAYING'}
                className={`relative flex size-16 cursor-pointer items-center justify-center rounded-full transition-all shadow-[0_0_20px_rgba(13,242,89,0.3)] group
                    ${hintCount > 0 && status === 'PLAYING' ? 'bg-primary text-background-dark hover:bg-primary-dark hover:scale-105' : 'bg-gray-700 text-gray-500 cursor-not-allowed grayscale'}
                `}
            >
                <span className={`material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform`}>lightbulb</span>
                <span className="absolute -top-2 -right-2 bg-white text-black text-sm font-bold size-7 flex items-center justify-center rounded-full border-2 border-background-dark shadow-sm">
                    {hintCount}
                </span>
            </button>
        </div>

        {/* Pause Menu Modal */}
        {status === 'PAUSED' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="bg-[#1a0c0c] border border-white/10 p-8 rounded-3xl max-w-sm w-full shadow-2xl flex flex-col items-center gap-6">
                    <div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-white mb-2 border border-white/10">
                        <span className="material-symbols-outlined text-5xl">pause</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">พักการเล่น</h2>
                    <div className="flex flex-col gap-3 w-full">
                        <button 
                            onClick={togglePause}
                            className="w-full py-4 bg-primary text-black font-bold text-lg rounded-2xl hover:bg-primary-dark transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined">play_arrow</span>
                            เล่นต่อ
                        </button>
                        <button 
                            onClick={onExit}
                            className="w-full py-4 bg-white/5 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/5"
                        >
                             <span className="material-symbols-outlined">home</span>
                            กลับเมนูหลัก
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={(e) => e.stopPropagation()}>
                <div className="bg-[#1a0c0c] border border-white/10 p-8 rounded-3xl max-w-sm w-full shadow-2xl flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                         <h2 className="text-2xl font-bold text-white">ตั้งค่า</h2>
                         <button onClick={() => setShowSettings(false)} className="text-white/60 hover:text-white">
                             <span className="material-symbols-outlined">close</span>
                         </button>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/60">volume_up</span>
                                <span className="text-white font-medium">เสียงดนตรี</span>
                            </div>
                            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                             <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/60">graphic_eq</span>
                                <span className="text-white font-medium">เสียงเอฟเฟกต์</span>
                            </div>
                            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowSettings(false)}
                        className="w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                    >
                        ตกลง
                    </button>
                </div>
            </div>
        )}

      </main>

      {/* Desktop Info Panel */}
      <aside className="hidden md:flex w-[320px] bg-[#110a0a] border-l border-white/5 flex-col z-50 shrink-0 font-display">
        <div className="p-6 flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">สถานะเกม</h2>
                    <p className="text-sm text-white/40">ข้อมูลเรียลไทม์</p>
                </div>
                <div className={`size-3 rounded-full ${status === 'PLAYING' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-2">
                    <span className="text-xs text-white/40 font-bold uppercase tracking-wider">โหมดการเล่น</span>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-white">{config.difficulty === Difficulty.HARD ? 'ยาก (Hard)' : 'ปกติ (Normal)'}</span>
                        <span className="material-symbols-outlined text-primary">
                            {config.difficulty === Difficulty.HARD ? 'bolt' : 'stars'}
                        </span>
                    </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-2">
                     <span className="text-xs text-white/40 font-bold uppercase tracking-wider">เงื่อนไขการชนะ</span>
                     <ul className="text-sm text-gray-300 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                            หาให้ครบ {config.itemCount} ตัว
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                            เวลาไม่หมด (เหลือ {timeLeft}s)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                            ห้ามพลาดเกิน {maxLives} ครั้ง
                        </li>
                     </ul>
                </div>

                 <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-4 flex flex-col gap-2 border border-primary/20">
                     <span className="text-xs text-primary font-bold uppercase tracking-wider">คะแนนปัจจุบัน</span>
                     <span className="text-4xl font-black text-white tracking-tight">{score}</span>
                     <div className="w-full bg-black/20 h-1 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-primary" style={{width: `${(items.length / config.itemCount) * 100}%`}}></div>
                     </div>
                     <span className="text-xs text-white/40 text-right mt-1">เหลืออีก {items.length} ตัว</span>
                </div>
            </div>
            
            <div className="mt-auto opacity-50 text-xs text-center text-white/30">
                Debug ID: {config.name}-{Math.floor(Math.random() * 1000)}
            </div>
        </div>
      </aside>
    </div>
  );
};

export default GameScreen;