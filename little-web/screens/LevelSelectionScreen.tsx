import React from 'react';
import { Difficulty, GameScreenState, LevelConfig } from '../types';
import { LEVELS } from '../constants';

interface LevelSelectionScreenProps {
  onSelectLevel: (level: LevelConfig) => void;
  onBack: () => void;
}

const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({ onSelectLevel, onBack }) => {
  return (
    <div className="flex flex-col w-full max-w-[1200px] flex-1">
      {/* Navbar Overlay for Back Button */}
      <div className="w-full flex items-center justify-between mb-8">
         <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-[#28392e] text-white hover:bg-[#344a3c] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <button onClick={onBack} className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#28392e] text-white text-sm font-bold hover:bg-[#344a3c] transition-colors">
            <span className="truncate">กลับเมนูหลัก</span>
          </button>
        </div>
      </div>

      {/* Page Heading & Chips */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
              เลือกระดับความท้าทาย
            </h1>
          </div>
          <p className="text-slate-400 text-lg font-normal leading-normal">
            ฝึกสมองประลองปัญญา พัฒนาทักษะการคิด
          </p>
        </div>
        {/* Pro Chip */}
        <div className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#28392e] pl-3 pr-4 border border-[#344a3c]">
          <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
          <p className="text-white text-sm font-bold leading-normal">ฟีเจอร์ Pro</p>
        </div>
      </div>

      {/* Level Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {Object.values(LEVELS).map((level) => (
          <LevelCard key={level.difficulty} level={level} onSelect={() => onSelectLevel(level)} />
        ))}
      </div>
    </div>
  );
};

interface LevelCardProps {
  level: LevelConfig;
  onSelect: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onSelect }) => {
  const isHard = level.difficulty === Difficulty.HARD;
  const isEasy = level.difficulty === Difficulty.EASY;

  return (
    <div 
      onClick={onSelect}
      className={`group flex flex-col bg-card-dark rounded-[2rem] p-5 shadow-lg border border-transparent 
        ${isHard ? 'border-primary/40 hard-card-glow relative overflow-hidden' : 'hover:border-primary/30'}
        hover:bg-card-hover transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
    >
      <style>{`
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 10px rgba(13, 242, 89, 0.2); border-color: rgba(13, 242, 89, 0.3); }
            50% { box-shadow: 0 0 20px rgba(13, 242, 89, 0.5); border-color: rgba(13, 242, 89, 0.8); }
        }
        .hard-card-glow {
            animation: pulse-glow 3s infinite;
        }
      `}</style>
      
      {isHard && (
        <div className="absolute top-0 right-0 p-3 z-10">
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-full px-3 py-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-red-400 text-[16px]">bolt</span>
            <span className="text-red-100 text-xs font-bold">ระวัง!</span>
          </div>
        </div>
      )}

      <div className="w-full aspect-[4/3] rounded-2xl bg-[#1e2e24] overflow-hidden mb-5 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`material-symbols-outlined text-white/20 text-[80px] group-hover:text-primary/40 transition-colors`}>
            {isEasy ? 'visibility' : isHard ? 'psychology' : 'target'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">
               {level.difficulty === Difficulty.EASY ? 'Level 1' : level.difficulty === Difficulty.MEDIUM ? 'Level 2' : 'Level 3'}
            </span>
          </div>
        </div>
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay" 
          style={{ backgroundImage: `url("${level.bgImage}")` }}
        ></div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white text-2xl font-bold">{level.name.split(' ')[0]}</h3>
        </div>
        <p className="text-slate-400 text-sm mb-6 flex-grow">{level.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#111813] rounded-xl p-3 flex flex-col items-center justify-center gap-1 relative overflow-hidden">
             {isHard && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full -mr-1 -mt-1 blur-[2px]"></div>}
            <span className="material-symbols-outlined text-primary text-[20px]">search</span>
            <span className="text-white font-bold text-lg">{level.itemCount}</span>
            <span className="text-slate-400 text-xs">สิ่งที่ต้องหา</span>
          </div>
          <div className="bg-[#111813] rounded-xl p-3 flex flex-col items-center justify-center gap-1">
            <span className={`material-symbols-outlined ${isHard ? 'text-red-400' : 'text-primary'} text-[20px]`}>
                {isHard ? 'timer_off' : 'timer'}
            </span>
            <span className="text-white font-bold text-lg">{level.timeLimit}</span>
            <span className="text-slate-400 text-xs">{isHard ? 'วินาที + แฟลช' : 'วินาที'}</span>
          </div>
        </div>

        <button 
            className={`w-full h-12 flex items-center justify-center gap-2 rounded-full text-base font-bold transition-all 
            ${isEasy ? 'bg-primary text-[#111813] hover:bg-[#0be050] group-hover:shadow-[0_0_15px_rgba(13,242,89,0.4)]' : 
              isHard ? 'bg-primary text-[#111813] hover:bg-[#0be050] hover:scale-[1.02] shadow-[0_0_20px_rgba(13,242,89,0.3)] hover:shadow-[0_0_30px_rgba(13,242,89,0.6)]' :
              'bg-[#28392e] text-white group-hover:bg-primary group-hover:text-[#111813] group-hover:shadow-[0_0_15px_rgba(13,242,89,0.4)]'}`}
        >
          <span>{isHard ? 'ท้าทายเลย!' : 'เริ่มเล่น'}</span>
          <span className="material-symbols-outlined text-[20px]">{isHard ? 'rocket_launch' : 'play_arrow'}</span>
        </button>
      </div>
    </div>
  );
};

export default LevelSelectionScreen;