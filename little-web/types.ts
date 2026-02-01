export enum GameScreenState {
  LANDING = 'LANDING',
  LEVEL_SELECT = 'LEVEL_SELECT',
  GAME = 'GAME',
  RESULT = 'RESULT',
  HALL_OF_FAME = 'HALL_OF_FAME'
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface LevelConfig {
  difficulty: Difficulty;
  name: string;
  description: string;
  itemCount: number;
  timeLimit: number; // in seconds
  hasFlashPenalty: boolean;
  bgImage: string;
  bgAlt: string;
  accentColor: string; // Tailwind color class or hex
  starThresholds: {
    twoStars: number;
    threeStars: number;
  };
}

export interface Animal {
  id: string;
  icon: string;
  name: string;
  color: string;
  x: number; // percentage
  y: number; // percentage
  scale: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  levelRequired: string; // e.g., "Easy", "Hard"
  icon: string;
  colorClass: string;
  isUnlocked: boolean;
  secret?: boolean;
}