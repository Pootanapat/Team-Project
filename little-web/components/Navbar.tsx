import React from 'react';
import { GameScreenState } from '../types';

interface NavbarProps {
  onNavigate: (screen: GameScreenState) => void;
  currentScreen: GameScreenState;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentScreen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-slate-200 dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 lg:px-10 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white cursor-pointer" onClick={() => onNavigate(GameScreenState.LANDING)}>
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined text-3xl">psychology</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">สุดยอดสมองน้อย</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-surface-dark rounded-full px-3 py-1.5 border border-slate-200 dark:border-border-dark">
            <span className="material-symbols-outlined text-green-500 text-sm">cloud_done</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">บันทึกแล้ว</span>
          </div>
          <div className="flex gap-2 items-center">
             {/* Hall of Fame Button */}
            <button 
                onClick={() => onNavigate(GameScreenState.HALL_OF_FAME)}
                className={`flex items-center justify-center rounded-full size-9 transition-colors ${currentScreen === GameScreenState.HALL_OF_FAME ? 'bg-primary text-background-dark' : 'bg-slate-100 dark:bg-surface-dark text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-card-hover'}`}
                title="Hall of Fame"
            >
                <span className="material-symbols-outlined text-[20px]">emoji_events</span>
            </button>

            <button className="hidden md:flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20 text-sm font-bold transition hover:bg-amber-400/20">
              <span className="truncate mr-1">Pro Version</span>
              <span className="material-symbols-outlined text-sm">verified</span>
            </button>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-primary" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnTpKxk9QZ76kwI-p3-zv9RjC_W-azMwDVzYGjE6G-Igj6J4BJToMgy15tpG0joIPZRtnI2fK3UbQtF_kp1WufURzTQT-sRfUQjkgDrf-EXoOAvjfyzpQ0ocz9Xj2bOHBqQUqP9xqWlrpvAZKW9lKTN8u7N7iLQzY0cTidjkufSYfaRHBcu6GeleQH7cXISFwzzfxBZU4TNkDBl2BLMY68J6j1YDJTiayI0j8hfHxxuQFwZBy4JxCRpD91yt6htf_SobxWz0R8CxeC")' }}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;