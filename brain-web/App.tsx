import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';
import Result from './components/Result';
import { ViewState, Level } from './types';
import { getSaveData, saveGameResult, getTotalHighScore, UserSave } from './utils/storage';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [lastScore, setLastScore] = useState(0);
  const [userProgress, setUserProgress] = useState<UserSave>(getSaveData());
  const [totalHighScore, setTotalHighScore] = useState(0);

  // Initialize total score on mount
  useEffect(() => {
    setTotalHighScore(getTotalHighScore());
  }, []);

  const startLevelSelection = () => {
    // Refresh progress when entering selection screen to ensure up-to-date unlock status
    setUserProgress(getSaveData());
    setView('LEVEL_SELECT');
  };
  
  const startGame = (level: Level) => {
    // Basic image preloader optimization
    const img = new Image();
    img.src = level.image;
    
    setCurrentLevel(level);
    setView('GAME');
  };

  const endGame = (score: number) => {
    if (currentLevel) {
      // Save data to "Database" (local storage)
      const newProgress = saveGameResult(currentLevel.id, score);
      setUserProgress(newProgress);
      setTotalHighScore(getTotalHighScore());
    }
    setLastScore(score);
    setView('RESULT');
  };

  const goHome = () => {
    setTotalHighScore(getTotalHighScore());
    setView('HOME');
    setCurrentLevel(null);
  };

  const restartGame = () => {
    if (currentLevel) {
      // Temporarily toggle view or just let the key change handle reset if we were generating new ID
      // Here we keep same level, so we just set view. 
      // Ideally Game component resets state on mount.
      setView('GAME');
    } else {
      setView('LEVEL_SELECT');
    }
  };

  return (
    <>
      {view === 'HOME' && (
        <Home 
          onStart={startLevelSelection} 
          totalHighScore={totalHighScore} 
        />
      )}
      {view === 'LEVEL_SELECT' && (
        <LevelSelect 
          onBack={goHome} 
          onSelectLevel={startGame}
          userProgress={userProgress}
        />
      )}
      {view === 'GAME' && currentLevel && (
        <Game 
          key={currentLevel.id + Date.now()} 
          level={currentLevel} 
          onEndGame={endGame} 
          onExit={startLevelSelection} 
        />
      )}
      {view === 'RESULT' && (
        <Result 
          score={lastScore} 
          onRestart={restartGame} 
          onHome={goHome} 
        />
      )}
    </>
  );
};

export default App;