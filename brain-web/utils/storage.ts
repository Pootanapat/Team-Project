export interface LevelProgress {
  unlocked: boolean;
  highScore: number;
}

export interface UserSave {
  levels: Record<string, LevelProgress>;
}

const STORAGE_KEY = 'brain_booster_zoo_save_v1';

const DEFAULT_SAVE: UserSave = {
  levels: {
    easy: { unlocked: true, highScore: 0 },
    medium: { unlocked: false, highScore: 0 },
    hard: { unlocked: false, highScore: 0 }
  }
};

export const getSaveData = (): UserSave => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      // Merge with default to ensure all levels exist if we add more later
      return { ...DEFAULT_SAVE, ...JSON.parse(data), levels: { ...DEFAULT_SAVE.levels, ...JSON.parse(data).levels } };
    }
  } catch (e) {
    console.error("Failed to load save data", e);
  }
  return DEFAULT_SAVE;
};

export const saveGameResult = (levelId: string, score: number): UserSave => {
  const currentSave = getSaveData();
  const levelProgress = currentSave.levels[levelId] || { unlocked: false, highScore: 0 };

  // Update High Score
  if (score > levelProgress.highScore) {
    levelProgress.highScore = score;
  }
  
  currentSave.levels[levelId] = levelProgress;

  // Unlock next level logic
  if (levelId === 'easy') {
    currentSave.levels['medium'].unlocked = true;
  } else if (levelId === 'medium') {
    currentSave.levels['hard'].unlocked = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSave));
  } catch (e) {
    console.error("Failed to save data", e);
  }

  return currentSave;
};

export const getTotalHighScore = (): number => {
  const save = getSaveData();
  return Object.values(save.levels).reduce((acc, level) => acc + level.highScore, 0);
};