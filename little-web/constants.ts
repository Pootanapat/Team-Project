import { Difficulty, LevelConfig, Achievement, Animal } from './types';

export const LEVELS: Record<Difficulty, LevelConfig> = {
  [Difficulty.EASY]: {
    difficulty: Difficulty.EASY,
    name: 'ง่าย (Easy)',
    description: 'เหมาะสำหรับผู้เริ่มต้น ฝึกการสังเกตพื้นฐาน',
    itemCount: 8,
    timeLimit: 50,
    hasFlashPenalty: false,
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1xzHvR5KvcYELvIcYlqVJrIrYxWWgPAz_7whFraxrzdyx-El81DOvtjCWFfIBCFJmPbf79rhyM5GqXRiY-7zU3SboyjMpxHGGqg39PW5PO9yrQgrVzX9JvdN-z9-rv-Ew60Ce9V5ZjJpAEXCSxX-JPoruXxxKVuL-qJUPl4CURF_fb42iBFyK7Hm7VWPSKhPsZS5thPOkG8Vgh34_YjRjVjm9oukSZqN0LApbNsuGwHAMbHQ4LjxRNOj6yR5CbANYEnClr5QuXH37',
    bgAlt: 'Green abstract jungle',
    accentColor: '#0df259',
    starThresholds: {
      twoStars: 3000,
      threeStars: 4500
    }
  },
  [Difficulty.MEDIUM]: {
    difficulty: Difficulty.MEDIUM,
    name: 'ปานกลาง (Medium)',
    description: 'เพิ่มความท้าทายด้วยจำนวนของที่มากขึ้น',
    itemCount: 12,
    timeLimit: 45,
    hasFlashPenalty: false,
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTOKL9ZLD7yetPQ43aBlN55ao4KjuFyI1iP2P0ivTf3kiCj_4tvCoTOdvMbIllURPSTDFdASGW8UEcoC8srpXoZCIxVFTQlXJ0RCc-LjWdt4hohX6Lhekad8sGix6X9mtUaM-mQcnPyoV5AcoDYw_Sa-0MJPgkflF0-qSrVeDIZvY2JAzxt471Iod4o9_DvtNS_4X9LNeOJfW5F0moiJLMxaZcIERc4rcQa7joQh3X-xu36aqsyVgjAaGKSdqVbFFLmdume-hgDIfq',
    bgAlt: 'Blue geometric shapes',
    accentColor: '#3b82f6',
    starThresholds: {
      twoStars: 4500,
      threeStars: 6000
    }
  },
  [Difficulty.HARD]: {
    difficulty: Difficulty.HARD,
    name: 'ยาก (Hard)',
    description: 'ทดสอบขีดจำกัด มีสิ่งรบกวนสายตา',
    itemCount: 16,
    timeLimit: 40, // Reduced for difficulty
    hasFlashPenalty: true,
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4nQQVB8fs0-P4N3NKAbHkyN8AFyQeyxgWAEnrqrAMSP_oOTxE5Ia6eEI6De3niEgaC_s4PLLerBn7iDfPmemY-Ud9vESBu6IpeddqeZGEuuR2OSUVeVqqXFlJQy4EImQHNMPuX-xbNRuaCIoNVyhwNEk0llnVSW3jz7JtU7E8RI1DqkBZT_v1qGOf0s9mdsczgTdCfS9Yd0Nwa9XFOeVkFRQwdDIwj5XbyRLuvCWiNUlwgLPgII5GWHolqTnq_SpquSgFqsV_nos',
    bgAlt: 'Dark complex maze',
    accentColor: '#ef4444',
    starThresholds: {
      twoStars: 5500,
      threeStars: 7000
    }
  }
};

export const ALL_ANIMALS: Animal[] = [
  { id: '1', icon: 'pets', name: 'Lion', color: '#eab308', x: 0, y: 0, scale: 1 },
  { id: '2', icon: 'flutter_dash', name: 'Bird', color: '#38bdf8', x: 0, y: 0, scale: 1 },
  { id: '3', icon: 'gesture', name: 'Snake', color: '#4ade80', x: 0, y: 0, scale: 1 },
  { id: '4', icon: 'cruelty_free', name: 'Rabbit', color: '#f472b6', x: 0, y: 0, scale: 1 },
  { id: '5', icon: 'bug_report', name: 'Bug', color: '#a3e635', x: 0, y: 0, scale: 1 },
  { id: '6', icon: 'water_drop', name: 'Fish', color: '#67e8f9', x: 0, y: 0, scale: 1 },
  { id: '7', icon: 'savings', name: 'Pig', color: '#a8a29e', x: 0, y: 0, scale: 1 },
  { id: '8', icon: 'emoji_nature', name: 'Butterfly', color: '#c084fc', x: 0, y: 0, scale: 1 },
  { id: '9', icon: 'pest_control_rodent', name: 'Squirrel', color: '#fb923c', x: 0, y: 0, scale: 1 },
  { id: '10', icon: 'raven', name: 'Raven', color: '#94a3b8', x: 0, y: 0, scale: 1 },
  { id: '11', icon: 'spider', name: 'Spider', color: '#fca5a5', x: 0, y: 0, scale: 1 },
  { id: '12', icon: 'public', name: 'Globe', color: '#2dd4bf', x: 0, y: 0, scale: 1 },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'zoo_guardian',
    title: 'ผู้พิทักษ์สวนสัตว์',
    description: 'ชนะระดับยาก (Hard)',
    levelRequired: 'ระดับยาก',
    icon: 'pets',
    colorClass: 'from-yellow-200 to-yellow-500',
    isUnlocked: false,
  },
  {
    id: 'sharp_eye',
    title: 'นักสืบตาไว',
    description: 'ชนะระดับกลาง (Medium)',
    levelRequired: 'ระดับกลาง',
    icon: 'visibility',
    colorClass: 'from-blue-200 to-blue-500',
    isUnlocked: false,
  },
  {
    id: 'animal_friend',
    title: 'เพื่อนรักสัตว์โลก',
    description: 'ชนะระดับง่าย (Easy)',
    levelRequired: 'ระดับง่าย',
    icon: 'favorite',
    colorClass: 'from-green-200 to-green-500',
    isUnlocked: false,
  },
  {
    id: 'smart_brain',
    title: 'สมองใสไวปานวอก',
    description: 'ได้คะแนนมากกว่า 3000 คะแนน',
    levelRequired: 'คะแนนสูง',
    icon: 'psychology',
    colorClass: 'from-purple-200 to-purple-500',
    isUnlocked: false,
  },
  {
    id: 'lightning',
    title: 'สายฟ้าแลบ',
    description: 'จบเกมภายใน 20 วินาที',
    levelRequired: 'ความเร็ว',
    icon: 'bolt',
    colorClass: 'from-orange-200 to-orange-500',
    isUnlocked: false,
  },
  {
    id: 'secret_1',
    title: 'Perfect Run',
    description: 'ชนะระดับยากโดยไม่เสียพลังชีวิตเลย',
    levelRequired: 'ภารกิจลับ',
    icon: 'lock',
    colorClass: 'from-red-200 to-red-500',
    isUnlocked: false,
    secret: true
  },
  {
    id: 'secret_2',
    title: 'Time Lord',
    description: 'จบเกมโดยเหลือเวลามากกว่า 40 วินาที',
    levelRequired: 'ภารกิจลับ',
    icon: 'timer',
    colorClass: 'from-indigo-200 to-indigo-500',
    isUnlocked: false,
    secret: true
  },
  {
    id: 'secret_3',
    title: 'Super Star',
    description: 'เก็บดาวครบ 3 ดวง (คะแนน > 2000)',
    levelRequired: 'ภารกิจลับ',
    icon: 'star',
    colorClass: 'from-pink-200 to-pink-500',
    isUnlocked: false,
    secret: true
  }
];