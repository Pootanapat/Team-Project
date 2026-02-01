export type ViewState = 'HOME' | 'LEVEL_SELECT' | 'GAME' | 'RESULT';

export interface Animal {
  id: string;
  name: string;
  icon: string; // Using Lucide icon names conceptually, or mapped strings
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  isFound: boolean;
  scale?: number;
  rotation?: number;
}

export interface Level {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  image: string;
  animalCount: number;
  timeLimit: number | 'Unlimited'; // Seconds or string
  isLocked: boolean;
  accentColor: string;
}

export interface GameStats {
  score: number;
  totalTime: number;
  foundCount: number;
  totalCount: number;
}