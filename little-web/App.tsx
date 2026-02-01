import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingScreen from './screens/LandingScreen';
import LevelSelectionScreen from './screens/LevelSelectionScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import HallOfFameScreen from './screens/HallOfFameScreen';
import { GameScreenState, LevelConfig, Difficulty } from './types';
import { LEVELS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreenState>(GameScreenState.LANDING);
  const [selectedLevel, setSelectedLevel] = useState<LevelConfig>(LEVELS.EASY);
  const [lastGameScore, setLastGameScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // Load high score and achievements on mount
  useEffect(() => {
    const storedScore = localStorage.getItem('lb_highscore');
    if (storedScore) {
      setHighScore(parseInt(storedScore, 10));
    }
    const storedAchievements = localStorage.getItem('lb_achievements');
    if (storedAchievements) {
      try {
        setUnlockedAchievements(JSON.parse(storedAchievements));
      } catch (e) {
        console.error("Failed to parse achievements", e);
      }
    }
  }, []);

  const handleLevelSelect = (level: LevelConfig) => {
    setSelectedLevel(level);
    setCurrentScreen(GameScreenState.GAME);
  };

  const checkAchievements = (score: number, win: boolean, stats: { lives: number, maxLives: number, timeLeft: number, difficulty: Difficulty }) => {
    const newUnlocked = new Set(unlockedAchievements);
    let hasChanges = false;

    if (win) {
        // Difficulty based
        if (stats.difficulty === Difficulty.EASY && !newUnlocked.has('animal_friend')) { newUnlocked.add('animal_friend'); hasChanges = true; }
        if (stats.difficulty === Difficulty.MEDIUM && !newUnlocked.has('sharp_eye')) { newUnlocked.add('sharp_eye'); hasChanges = true; }
        if (stats.difficulty === Difficulty.HARD && !newUnlocked.has('zoo_guardian')) { newUnlocked.add('zoo_guardian'); hasChanges = true; }

        // Score based
        if (score > 3000 && !newUnlocked.has('smart_brain')) { newUnlocked.add('smart_brain'); hasChanges = true; }
        if (score > 2000 && !newUnlocked.has('secret_3')) { newUnlocked.add('secret_3'); hasChanges = true; } // Super Star

        // Time based (Lightning: Win within 20s => TimeLeft > Limit - 20)
        // Stats Logic
        const timeUsed = (LEVELS[stats.difficulty].timeLimit) - stats.timeLeft;
        if (timeUsed <= 20 && !newUnlocked.has('lightning')) { newUnlocked.add('lightning'); hasChanges = true; }
        
        // Secret 1: Perfect Run Hard
        if (stats.difficulty === Difficulty.HARD && stats.lives === stats.maxLives && !newUnlocked.has('secret_1')) {
             newUnlocked.add('secret_1'); hasChanges = true;
        }

        // Secret 2: Time Lord (> 40s left)
        if (stats.timeLeft > 40 && !newUnlocked.has('secret_2')) {
            newUnlocked.add('secret_2'); hasChanges = true;
        }
    }

    if (hasChanges) {
        const arr = Array.from(newUnlocked);
        setUnlockedAchievements(arr);
        localStorage.setItem('lb_achievements', JSON.stringify(arr));
    }
  };

  const handleGameOver = (score: number, win: boolean, stats?: { lives: number, maxLives: number, timeLeft: number }) => {
    setLastGameScore(score);
    setIsWin(win);
    
    // Update high score
    if (win && score > highScore) {
      setHighScore(score);
      localStorage.setItem('lb_highscore', score.toString());
    }

    // Check Achievements
    if (stats) {
        checkAchievements(score, win, { ...stats, difficulty: selectedLevel.difficulty });
    }
    
    setCurrentScreen(GameScreenState.RESULT);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case GameScreenState.LANDING:
        return <LandingScreen onNavigate={setCurrentScreen} highScore={highScore} />;
      
      case GameScreenState.LEVEL_SELECT:
        return (
          <LevelSelectionScreen 
            onSelectLevel={handleLevelSelect} 
            onBack={() => setCurrentScreen(GameScreenState.LANDING)}
          />
        );
      
      case GameScreenState.GAME:
        return (
          <GameScreen 
            config={selectedLevel} 
            onGameOver={handleGameOver}
            onExit={() => setCurrentScreen(GameScreenState.LEVEL_SELECT)}
          />
        );

      case GameScreenState.RESULT:
        return (
          <ResultScreen 
            score={lastGameScore} 
            highScore={highScore}
            win={isWin}
            levelConfig={selectedLevel}
            onPlayAgain={() => setCurrentScreen(GameScreenState.LEVEL_SELECT)}
            onHome={() => setCurrentScreen(GameScreenState.LANDING)}
          />
        );
        
      case GameScreenState.HALL_OF_FAME:
        return (
            <HallOfFameScreen 
                onBack={() => setCurrentScreen(GameScreenState.LANDING)} 
                unlockedIds={unlockedAchievements}
            />
        );

      default:
        return <LandingScreen onNavigate={setCurrentScreen} highScore={highScore} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show Navbar only on non-game screens */}
      {currentScreen !== GameScreenState.GAME && (
        <Navbar onNavigate={setCurrentScreen} currentScreen={currentScreen} />
      )}

      {/* Main Content Area */}
      <div className={`flex-grow flex flex-col items-center w-full ${currentScreen !== GameScreenState.GAME ? 'px-4 sm:px-6 lg:px-8 py-8 lg:py-12' : ''}`}>
        {renderScreen()}
      </div>

      {/* Footer (Hide on Game Screen) */}
      {currentScreen !== GameScreenState.GAME && (
        <footer className="w-full border-t border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-background-dark py-8 px-4 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-70">
              <div className="size-6 text-primary">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">สุดยอดสมองน้อย © 2026</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-primary transition-colors">ติดต่อเรา</a>
              <a href="#" className="hover:text-primary transition-colors">เกี่ยวกับผู้พัฒนา</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-600">
              <span className="material-symbols-outlined text-sm">cloud_sync</span>
              <span>Auto-saved to LocalStorage</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;