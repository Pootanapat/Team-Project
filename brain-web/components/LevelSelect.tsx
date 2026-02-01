import React from 'react';
import { ArrowLeft, Search, Timer, Lock, Play, Star } from 'lucide-react';
import { Level } from '../types';
import { UserSave } from '../utils/storage';

interface LevelSelectProps {
  onBack: () => void;
  onSelectLevel: (level: Level) => void;
  userProgress: UserSave;
}

const levels: Level[] = [
  {
    id: 'easy',
    name: 'Sunny Zoo',
    difficulty: 'Easy',
    description: 'Bright sunny zoo landscape with green grass.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzwFCnWHAiyOFZLlNX0O3EHVKmZDm0mWQknZOjM97X5405da9HLgrwLLXRgifGgxxHOxDIohJgZDmHkmyMB6dpQBusdgR1TW0Xbeleu2Ntg1sfrliKBBt8k-uSVvHpkxLlrkr3mFGlCBedR8Lrkde9rLwu22M8XdbN2UQKQ43_Je5rfiCNfVl9R1hpPbUzv9CCUXfpksTbV6Yt_1cveBy7ufqYnB8Ddsy9oEWIY_LwQX5ilHmT6Dz9iFhPaov4XYK57E-ZjdZyJKN',
    animalCount: 5,
    timeLimit: 180, // Changed from Unlimited to 180 seconds (3 mins)
    isLocked: false, // overridden by progress
    accentColor: 'text-yellow-400'
  },
  {
    id: 'medium',
    name: 'Rainforest',
    difficulty: 'Medium',
    description: 'Lush green rainforest dense with trees.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyP_tKoDL7MKWztxb6U2x3bJ72fa6tv7PGP9SxcJZ3S5QxmZLRGtOx_MC2lJbk9cW1-xav39IsXcrLZRACQJ_cvPBTeDAo5xSPcow3G3aNmLekaN5WytxgIpR8ECjRwH_9cMFHbHWjSSmEqYO3-NX6PAHEfQU38yE5p6YCGiPSfkNt8aehN8TwIv8RN6Y3yz4BZHO2gPtH5Rd68yPOcg0l9aDKt36YQxJjqVHiBBstLo3iN3oXxNLGQncjSj9r7CeH0mCZZXy41arx',
    animalCount: 10,
    timeLimit: 120,
    isLocked: true, // overridden by progress
    accentColor: 'text-green-500'
  },
  {
    id: 'hard',
    name: 'Night Safari',
    difficulty: 'Hard',
    description: 'Dark moody night safari landscape.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9byHjIE4l4rJrrcMcwCd0XkeVGV7I6G8WC6isXYtwA06u_vTS34jPbs-tpnxJOScYTsa9vTVKrFKn6Qp2NY1-uX3uAthNEGKKeP6ie3QD1vstAu_LEYDy2DirtFjGgDDOsNZ-t_5rjl_ZtIVmt3dGTKA7p4RkrwEoX76LY1FsM3MtVrew6GGG71VpVMyIHB_CzgNnWobJlvE-wjPbmKQ8R1TGtEjo3IJYhVH74nqqvpHalXAhQ_NyzGzBHlpojWtq3mttHNyrcvvo',
    animalCount: 15,
    timeLimit: 60,
    isLocked: true, // overridden by progress
    accentColor: 'text-purple-400'
  }
];

const LevelSelect: React.FC<LevelSelectProps> = ({ onBack, onSelectLevel, userProgress }) => {
  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col relative overflow-hidden">
        {/* Decorative Background Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
            <span className="material-symbols-outlined absolute top-[10%] left-[5%] text-8xl rotate-[-12deg]">pets</span>
            <span className="material-symbols-outlined absolute top-[20%] right-[10%] text-9xl rotate-[45deg]">pets</span>
            <span className="material-symbols-outlined absolute bottom-[15%] left-[15%] text-7xl rotate-[15deg]">cruelty_free</span>
        </div>

      <header className="w-full px-6 py-8 md:px-12 max-w-7xl mx-auto flex items-center relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center justify-center gap-3 bg-white dark:bg-surface-dark rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="group-hover:text-primary transition-colors" />
          <span className="font-bold text-lg hidden sm:block">Back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 md:px-10 pb-20 w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
            Choose Your <span className="text-primary-dark dark:text-primary">Adventure!</span>
          </h1>
          <p className="text-lg opacity-70 font-medium max-w-2xl mx-auto">
            Pick a level to start finding animals and boosting your brain power!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {levels.map((levelConfig) => {
            const progress = userProgress.levels[levelConfig.id];
            const isLocked = !progress?.unlocked;
            const highScore = progress?.highScore || 0;
            const level = { ...levelConfig, isLocked };

            return (
              <div 
                key={level.id}
                onClick={() => !isLocked && onSelectLevel(level)}
                className={`
                  group relative flex flex-col rounded-[2.5rem] p-6 shadow-xl border-4 transition-all duration-300 h-full
                  ${isLocked 
                    ? 'bg-white/80 dark:bg-surface-dark/80 border-gray-100 dark:border-white/5 opacity-80 cursor-not-allowed' 
                    : 'bg-white dark:bg-surface-dark border-transparent hover:border-primary/40 hover:-translate-y-2 cursor-pointer'
                  }
                `}
              >
                {!isLocked && highScore > 0 && (
                  <div className="absolute top-6 right-6 z-20 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    <Star size={12} fill="currentColor" />
                    <span>{highScore.toLocaleString()}</span>
                  </div>
                )}
                
                {!isLocked && highScore === 0 && (
                  <div className="absolute top-6 right-6 z-20">
                    <span className="bg-primary text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      New
                    </span>
                  </div>
                )}

                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-gray-100">
                   {isLocked && (
                      <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-[2px]">
                          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                              <Lock className="text-white w-8 h-8" />
                          </div>
                      </div>
                   )}
                  <img 
                    src={level.image} 
                    alt={level.name} 
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${!isLocked ? 'group-hover:scale-110' : 'grayscale'}`}
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <h2 className="text-2xl font-black mb-4">{level.difficulty}: {level.name}</h2>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-background-light dark:bg-white/5 px-4 py-2 rounded-full">
                      <Search size={18} className="opacity-50" />
                      <span className="text-sm font-bold opacity-70">{level.animalCount} Animals</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background-light dark:bg-white/5 px-4 py-2 rounded-full">
                      <Timer size={18} className="opacity-50" />
                      <span className="text-sm font-bold opacity-70">{level.timeLimit} {typeof level.timeLimit === 'number' ? 'Secs' : ''}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button 
                      className={`
                        w-full h-14 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300
                        ${isLocked 
                          ? 'bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed' 
                          : 'bg-primary hover:bg-primary-dark text-slate-900 shadow-lg hover:shadow-xl hover:shadow-primary/20'
                        }
                      `}
                    >
                      {isLocked ? (
                          <>
                              <Lock size={20} />
                              <span>Locked</span>
                          </>
                      ) : (
                          <>
                              <span>Start Adventure</span>
                              <Play size={20} className="fill-current group-hover:translate-x-1 transition-transform" />
                          </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default LevelSelect;