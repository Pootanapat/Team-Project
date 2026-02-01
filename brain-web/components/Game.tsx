import React, { useState, useEffect, useRef } from 'react';
import { Star, Pause, Volume2, VolumeX, Search, Check, Lightbulb, Play, Home, RefreshCcw, XCircle, AlertCircle, Clock, Trophy } from 'lucide-react';
import { Animal, Level } from '../types';

interface GameProps {
  level: Level;
  onEndGame: (score: number) => void;
  onExit: () => void;
}

// Extended list of available icons (Emojis) for targets and distractors
const ALL_ICONS = [
    'Cat', 'Bird', 'Rabbit', 'Dog', 'Lion', 
    'Fish', 'Bear', 'Bug', 'Snail', 'Turtle', 
    'Snake', 'Mouse', 'Fox', 'Owl', 'Frog',
    'Tiger', 'Panda', 'Koala', 'Pig', 'Cow',
    'Chicken', 'Duck', 'Bee', 'Butterfly', 'Octopus'
];

// Data for different levels
const LEVEL_ANIMALS: Record<string, Animal[]> = {
  easy: [
    { id: '1', name: 'Cat', icon: 'Cat', x: 0, y: 0, isFound: false },
    { id: '2', name: 'Bird', icon: 'Bird', x: 0, y: 0, isFound: false },
    { id: '3', name: 'Rabbit', icon: 'Rabbit', x: 0, y: 0, isFound: false },
    { id: '4', name: 'Dog', icon: 'Dog', x: 0, y: 0, isFound: false },
    { id: '5', name: 'Lion', icon: 'Lion', x: 0, y: 0, isFound: false },
  ],
  medium: [
    { id: 'm1', name: 'Cat', icon: 'Cat', x: 0, y: 0, isFound: false },
    { id: 'm2', name: 'Bird', icon: 'Bird', x: 0, y: 0, isFound: false },
    { id: 'm3', name: 'Rabbit', icon: 'Rabbit', x: 0, y: 0, isFound: false },
    { id: 'm4', name: 'Dog', icon: 'Dog', x: 0, y: 0, isFound: false },
    { id: 'm5', name: 'Lion', icon: 'Lion', x: 0, y: 0, isFound: false },
    { id: 'm6', name: 'Fish', icon: 'Fish', x: 0, y: 0, isFound: false },
    { id: 'm7', name: 'Bear', icon: 'Bear', x: 0, y: 0, isFound: false },
    { id: 'm8', name: 'Bug', icon: 'Bug', x: 0, y: 0, isFound: false },
    { id: 'm9', name: 'Snail', icon: 'Snail', x: 0, y: 0, isFound: false },
    { id: 'm10', name: 'Turtle', icon: 'Turtle', x: 0, y: 0, isFound: false },
  ],
  hard: [
    { id: 'h1', name: 'Cat', icon: 'Cat', x: 0, y: 0, isFound: false },
    { id: 'h2', name: 'Bird', icon: 'Bird', x: 0, y: 0, isFound: false },
    { id: 'h3', name: 'Rabbit', icon: 'Rabbit', x: 0, y: 0, isFound: false },
    { id: 'h4', name: 'Dog', icon: 'Dog', x: 0, y: 0, isFound: false },
    { id: 'h5', name: 'Lion', icon: 'Lion', x: 0, y: 0, isFound: false },
    { id: 'h6', name: 'Fish', icon: 'Fish', x: 0, y: 0, isFound: false },
    { id: 'h7', name: 'Bear', icon: 'Bear', x: 0, y: 0, isFound: false },
    { id: 'h8', name: 'Bug', icon: 'Bug', x: 0, y: 0, isFound: false },
    { id: 'h9', name: 'Snail', icon: 'Snail', x: 0, y: 0, isFound: false },
    { id: 'h10', name: 'Turtle', icon: 'Turtle', x: 0, y: 0, isFound: false },
    { id: 'h11', name: 'Snake', icon: 'Snake', x: 0, y: 0, isFound: false },
    { id: 'h12', name: 'Mouse', icon: 'Mouse', x: 0, y: 0, isFound: false },
    { id: 'h13', name: 'Fox', icon: 'Fox', x: 0, y: 0, isFound: false },
    { id: 'h14', name: 'Owl', icon: 'Owl', x: 0, y: 0, isFound: false },
    { id: 'h15', name: 'Frog', icon: 'Frog', x: 0, y: 0, isFound: false },
  ]
};

// Helper to generate random safe positions avoiding UI overlap
const generateRandomAnimals = (baseAnimals: (Animal & { isDistractor?: boolean })[]) => {
  const positions: {x: number, y: number}[] = [];
  
  // SAFE ZONES (Percentage of container)
  const minX = 8; 
  const maxX = 92;
  const minY = 25; 
  const maxY = 60; 

  return baseAnimals.map(animal => {
    let x, y, overlapping;
    let attempts = 0;
    
    do {
      x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      
      overlapping = positions.some(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx*dx + dy*dy) < 10;
      });
      attempts++;
    } while (overlapping && attempts < 100);

    positions.push({x, y});

    return {
      ...animal,
      x,
      y,
      rotation: Math.floor(Math.random() * 30) - 15,
      scale: 0.8 + Math.random() * 0.4
    };
  });
};

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const Game: React.FC<GameProps> = ({ level, onEndGame, onExit }) => {
  const initialTime = typeof level.timeLimit === 'number' ? level.timeLimit : 300; 
  
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [score, setScore] = useState(0); 
  
  const [animals, setAnimals] = useState<(Animal & { isDistractor?: boolean })[]>(() => {
    const baseList: Animal[] = JSON.parse(JSON.stringify(LEVEL_ANIMALS[level.id] || LEVEL_ANIMALS['easy']));
    
    // Generate Distractors
    const targetNames = new Set(baseList.map(a => a.name));
    const availableDistractors = ALL_ICONS.filter(icon => !targetNames.has(icon));
    const distractorCount = level.difficulty === 'Hard' ? 5 : level.difficulty === 'Medium' ? 3 : 2;
    const distractors: (Animal & { isDistractor?: boolean })[] = [];

    for (let i = 0; i < distractorCount; i++) {
        if (availableDistractors.length === 0) break;
        const randomIconIndex = Math.floor(Math.random() * availableDistractors.length);
        const randomIcon = availableDistractors[randomIconIndex];
        
        distractors.push({
            id: `distractor-${i}`,
            name: randomIcon,
            icon: randomIcon,
            x: 0, y: 0,
            isFound: false,
            isDistractor: true
        });
        availableDistractors.splice(randomIconIndex, 1);
    }

    return generateRandomAnimals([...baseList, ...distractors]);
  });

  const [gameState, setGameState] = useState<'PLAYING' | 'PAUSED' | 'WON' | 'GAME_OVER'>('PLAYING');
  const [penaltyMessage, setPenaltyMessage] = useState<{ text: string, type: 'MISS' | 'WRONG' } | null>(null);
  const [clickPos, setClickPos] = useState<{x: number, y: number} | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hintActiveId, setHintActiveId] = useState<string | null>(null);
  
  // Ref to access current state in intervals/timeouts without triggering re-renders
  const scoreRef = useRef(score);
  const timeRef = useRef(timeLeft);
  
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { timeRef.current = timeLeft; }, [timeLeft]);

  // Timer logic - FIXED: Removed score from dependency array to prevent reset on click
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    if (level.timeLimit === 'Unlimited') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('GAME_OVER');
          // Pass current score on game over
          setTimeout(() => onEndGame(scoreRef.current), 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, level.timeLimit]); // Only depends on game state, not score!

  // Check win condition
  useEffect(() => {
    const targets = animals.filter(a => !a.isDistractor);
    const allFound = targets.every(a => a.isFound);
    
    if (allFound && gameState === 'PLAYING') {
      setGameState('WON'); // Transition to WON state to show summary
    }
  }, [animals, gameState]);

  // Handle Win Summary calculation
  const getWinSummary = () => {
      const baseScore = score;
      // Increased multiplier to 30 for better rewards
      const timeBonus = level.timeLimit === 'Unlimited' ? 0 : timeLeft * 30; 
      const totalScore = baseScore + timeBonus;
      return { baseScore, timeBonus, totalScore };
  };

  const handleFinishLevel = () => {
      const { totalScore } = getWinSummary();
      onEndGame(totalScore);
  };

  const triggerPenalty = (type: 'MISS' | 'WRONG') => {
      setScore(s => Math.max(0, s - 50));
      if (level.timeLimit !== 'Unlimited') {
          setTimeLeft(t => Math.max(0, t - 5));
      }
      setPenaltyMessage({ 
          text: type === 'MISS' ? 'Missed!' : 'Wrong One!', 
          type 
      });
      setTimeout(() => setPenaltyMessage(null), 800);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'PLAYING') return;

    const target = e.target as HTMLElement;
    if (target.getAttribute('data-animal') === 'true' || target.closest('[data-animal="true"]')) return;
    
    // Miss Click
    triggerPenalty('MISS');
    
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPos({
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top
    });

    setTimeout(() => {
        setClickPos(null);
    }, 800);
  };

  const handleAnimalClick = (e: React.MouseEvent, id: string, isDistractor?: boolean) => {
    e.stopPropagation(); 
    if (gameState !== 'PLAYING') return;

    if (isDistractor) {
        triggerPenalty('WRONG');
        return;
    }

    setAnimals(prev => prev.map(a => {
      if (a.id === id && !a.isFound) {
        setScore(s => s + 100); 
        return { ...a, isFound: true };
      }
      return a;
    }));
  };

  const useHint = () => {
    if (gameState !== 'PLAYING') return;
    if (hintActiveId) return; 

    const hiddenAnimals = animals.filter(a => !a.isFound && !a.isDistractor);
    if (hiddenAnimals.length === 0) return;

    if (score < 50) return;
    
    setScore(s => s - 50);

    const randomAnimal = hiddenAnimals[Math.floor(Math.random() * hiddenAnimals.length)];
    setHintActiveId(randomAnimal.id);

    setTimeout(() => {
        setHintActiveId(null);
    }, 2000);
  };

  const togglePause = () => {
    if (gameState === 'WON' || gameState === 'GAME_OVER') return;
    setGameState(prev => prev === 'PLAYING' ? 'PAUSED' : 'PLAYING');
  };

  const getIcon = (name: string, sizeClass: string = "text-6xl") => {
     switch(name) {
         case 'Cat': return <span className={sizeClass}>🐱</span>;
         case 'Bird': return <span className={sizeClass}>🐦</span>;
         case 'Rabbit': return <span className={sizeClass}>🐰</span>;
         case 'Dog': return <span className={sizeClass}>🐶</span>;
         case 'Lion': return <span className={sizeClass}>🦁</span>;
         case 'Fish': return <span className={sizeClass}>🐟</span>;
         case 'Bear': return <span className={sizeClass}>🐻</span>;
         case 'Bug': return <span className={sizeClass}>🐛</span>;
         case 'Snail': return <span className={sizeClass}>🐌</span>;
         case 'Turtle': return <span className={sizeClass}>🐢</span>;
         case 'Snake': return <span className={sizeClass}>🐍</span>;
         case 'Mouse': return <span className={sizeClass}>🐭</span>;
         case 'Fox': return <span className={sizeClass}>🦊</span>;
         case 'Owl': return <span className={sizeClass}>🦉</span>;
         case 'Frog': return <span className={sizeClass}>🐸</span>;
         case 'Tiger': return <span className={sizeClass}>🐯</span>;
         case 'Panda': return <span className={sizeClass}>🐼</span>;
         case 'Koala': return <span className={sizeClass}>🐨</span>;
         case 'Pig': return <span className={sizeClass}>🐷</span>;
         case 'Cow': return <span className={sizeClass}>🐮</span>;
         case 'Chicken': return <span className={sizeClass}>🐔</span>;
         case 'Duck': return <span className={sizeClass}>🦆</span>;
         case 'Bee': return <span className={sizeClass}>🐝</span>;
         case 'Butterfly': return <span className={sizeClass}>🦋</span>;
         case 'Octopus': return <span className={sizeClass}>🐙</span>;
         default: return <span>?</span>;
     }
  };

  const maxTime = typeof level.timeLimit === 'number' ? level.timeLimit : 1;
  const timeProgress = level.timeLimit === 'Unlimited' ? 100 : (timeLeft / maxTime) * 100;
  
  const targets = animals.filter(a => !a.isDistractor);
  const foundCount = targets.filter(a => a.isFound).length;
  const totalCount = targets.length;

  const sortedTrayAnimals = [...targets].sort((a, b) => {
      if (a.isFound === b.isFound) return 0;
      return a.isFound ? 1 : -1;
  });

  return (
    <div className="h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col overflow-hidden relative select-none">
      
      {/* Header HUD */}
      <header className="flex-none h-24 px-6 py-4 flex items-center justify-between bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 z-50">
        <div className="flex items-center gap-4 bg-background-light dark:bg-[#25382b] pl-3 pr-8 py-2 rounded-full border border-gray-100 dark:border-white/10 shadow-sm transition-transform hover:scale-105">
            <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Star className="fill-current text-slate-900" size={24} />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Score</span>
                <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">{score.toLocaleString()}</span>
            </div>
        </div>

        <div className="flex flex-col items-center flex-1 max-w-lg px-8">
            <div className="flex justify-between w-full text-xs font-bold mb-2 uppercase tracking-wide opacity-80">
                <span>Time Remaining</span>
                <span className={`${timeLeft < 10 && level.timeLimit !== 'Unlimited' ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                    {level.timeLimit === 'Unlimited' ? '∞' : formatTime(timeLeft)}
                </span>
            </div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner relative">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-orange-400 opacity-20"></div>
                <div 
                    className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-[0_0_10px_rgba(13,242,89,0.5)] transition-all duration-1000 ease-linear"
                    style={{ width: `${timeProgress}%` }}
                ></div>
            </div>
        </div>

        <div className="flex gap-4">
            <button 
                onClick={() => setIsMuted(!isMuted)}
                className="size-12 rounded-full bg-background-light dark:bg-[#25382b] hover:bg-gray-100 dark:hover:bg-[#2f4536] flex items-center justify-center transition-colors border border-gray-100 dark:border-white/10 shadow-sm group"
            >
                {isMuted ? (
                    <VolumeX className="text-gray-400" size={24} />
                ) : (
                    <Volume2 className="text-slate-900 dark:text-white group-hover:scale-110 transition-transform" size={24} />
                )}
            </button>
            <button 
                onClick={togglePause} 
                className="size-12 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center text-slate-900 transition-colors shadow-lg shadow-primary/30 group"
            >
                {gameState === 'PAUSED' ? (
                     <Play className="fill-current group-hover:scale-110 transition-transform" size={24} />
                ) : (
                     <Pause className="fill-current group-hover:scale-110 transition-transform" size={24} />
                )}
            </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 relative p-4 md:p-6 overflow-hidden flex flex-col justify-center">
        <div 
            className="relative w-full h-full bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white dark:border-white/10 ring-1 ring-gray-200 dark:ring-black/50 cursor-crosshair group/canvas"
            onClick={handleCanvasClick}
        >
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[30s] ease-linear hover:scale-105"
                style={{ backgroundImage: `url('${level.image}')` }}
            >
                 <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>

            {/* Animals */}
            {animals.map((animal) => (
                !animal.isFound && (
                    <div 
                        key={animal.id}
                        data-animal="true"
                        onClick={(e) => handleAnimalClick(e, animal.id, animal.isDistractor)}
                        className={`
                            absolute group/item cursor-pointer transition-transform active:scale-95
                            ${hintActiveId === animal.id ? 'z-30' : 'z-10'}
                        `}
                        style={{ 
                            left: `${animal.x}%`, 
                            top: `${animal.y}%`,
                            transform: `scale(${animal.scale || 1}) rotate(${animal.rotation || 0}deg)`
                        }}
                    >
                         {/* Only show glow/hint effects for valid targets, not distractors */}
                         {!animal.isDistractor && (
                             <div className="absolute inset-0 bg-white/30 blur-xl rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                         )}
                         
                         {/* Hint Effect */}
                         {hintActiveId === animal.id && (
                             <div className="absolute -inset-8 bg-yellow-400/50 blur-xl rounded-full animate-pulse z-0"></div>
                         )}
                         {hintActiveId === animal.id && (
                             <div className="absolute -inset-4 border-4 border-yellow-400 rounded-full animate-bounce z-10"></div>
                         )}

                        <div className="relative z-20 group-hover/item:scale-110 transition-transform">
                            {getIcon(animal.name, "text-5xl md:text-7xl drop-shadow-2xl filter shadow-black")}
                        </div>
                    </div>
                )
            ))}

            {/* Penalty Feedback */}
            {penaltyMessage && (
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <div className="bg-red-500/90 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce flex flex-col items-center gap-1 border-2 border-white/20 backdrop-blur-sm">
                         <div className="flex items-center gap-2 mb-1">
                             {penaltyMessage.type === 'MISS' ? <XCircle size={28} /> : <AlertCircle size={28} />}
                             <span className="text-2xl font-black uppercase tracking-wider">{penaltyMessage.text}</span>
                         </div>
                         <div className="flex gap-4 text-base font-bold opacity-90">
                            <span className="bg-black/20 px-3 py-1 rounded-full">-50 Pts</span>
                            {level.timeLimit !== 'Unlimited' && <span className="bg-black/20 px-3 py-1 rounded-full">-5 Sec</span>}
                         </div>
                    </div>
                </div>
            )}
             {clickPos && (
                 <div 
                    className="absolute size-12 rounded-full border-4 border-red-500 opacity-0 animate-[ping_0.5s_ease-out]"
                    style={{ left: clickPos.x - 24, top: clickPos.y - 24 }}
                 />
             )}
        </div>
        
        {/* Pause Overlay */}
        {gameState === 'PAUSED' && (
            <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center border-4 border-white dark:border-white/10">
                    <h2 className="text-3xl font-black mb-2">Paused</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Take a breather!</p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={togglePause}
                            className="w-full bg-primary hover:bg-primary-dark text-slate-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Play size={20} className="fill-current" />
                            Resume Game
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCcw size={20} />
                            Restart
                        </button>
                        <button 
                            onClick={onExit}
                            className="w-full border-2 border-gray-200 dark:border-white/10 hover:border-red-500 hover:text-red-500 text-gray-500 dark:text-gray-400 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            Quit to Menu
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Win/Level Complete Summary Overlay */}
        {gameState === 'WON' && (
            <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full border-4 border-primary/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-yellow-400 to-primary"></div>
                    
                    <div className="text-center mb-8">
                        <div className="mx-auto size-20 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <Trophy size={40} className="fill-current animate-bounce-slow" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Level Complete!</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Outstanding performance!</p>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Star size={20} /></div>
                                <span className="font-bold text-gray-600 dark:text-gray-300">Base Score</span>
                            </div>
                            <span className="font-bold text-xl">{getWinSummary().baseScore}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><Clock size={20} /></div>
                                <span className="font-bold text-gray-600 dark:text-gray-300">Time Bonus</span>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-xl block">+{getWinSummary().timeBonus}</span>
                                {level.timeLimit !== 'Unlimited' && (
                                    <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">{timeLeft}s x 30pts</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-2xl mt-4">
                            <span className="font-black text-lg text-primary-dark dark:text-primary uppercase tracking-wide">Total Score</span>
                            <span className="font-black text-3xl text-primary-dark dark:text-primary">{getWinSummary().totalScore}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleFinishLevel}
                        className="w-full bg-primary hover:bg-primary-dark text-slate-900 font-black py-4 rounded-2xl text-lg shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Continue</span>
                        <Play size={20} className="fill-current" />
                    </button>
                </div>
            </div>
        )}
      </main>

      {/* Bottom Tray */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4">
        <div className="bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-3 md:p-4 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 pl-3 border-r border-gray-200 dark:border-gray-700 pr-6 mr-2">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-2xl">
                    <Search size={28} />
                </div>
                <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Find</span>
                    <span className="text-lg font-bold whitespace-nowrap">Animals</span>
                    <span className="text-xs font-bold text-primary">{foundCount}/{totalCount} Found</span>
                </div>
            </div>

            <div className="flex-1 flex justify-start gap-3 md:gap-6 overflow-x-auto pb-1 md:pb-0 scrollbar-hide mask-fade-right">
                {/* Sorted list: Unfound First, then Found */}
                {sortedTrayAnimals.map((animal) => (
                    <div key={animal.id} className={`relative flex flex-col items-center gap-2 transition-all duration-300 ${animal.isFound ? 'opacity-40 order-last grayscale' : 'opacity-100 hover:opacity-100'}`}>
                        <div className={`
                            size-14 md:size-18 rounded-2xl flex items-center justify-center border-4 transition-transform
                            ${animal.isFound 
                                ? 'bg-gray-100 dark:bg-white/5 border-transparent' 
                                : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10 shadow-sm hover:-translate-y-1'
                            }
                        `}>
                            {getIcon(animal.name, "text-2xl md:text-3xl")}
                            {animal.isFound && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background-light/50 rounded-xl">
                                    <Check size={20} className="text-green-600" strokeWidth={4} />
                                </div>
                            )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wide truncate max-w-[60px] ${animal.isFound ? 'text-gray-300' : 'text-slate-700 dark:text-gray-300'}`}>{animal.name}</span>
                    </div>
                ))}
            </div>

            <button 
                onClick={useHint}
                className="flex-none hidden md:flex flex-col items-center gap-2 group ml-2 active:scale-95 transition-transform"
                disabled={score < 50}
            >
                <div className={`size-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm
                    ${score >= 50 
                        ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/40 cursor-pointer' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    }
                `}>
                    <Lightbulb size={24} className={score >= 50 ? 'fill-current' : ''} />
                </div>
                <span className={`text-[10px] font-bold uppercase ${score >= 50 ? 'text-orange-500/80' : 'text-gray-400'}`}>
                    Hint (-50)
                </span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Game;