import React, { useState } from 'react';
import { GameScreenState } from '../types';

interface LandingScreenProps {
  onNavigate: (screen: GameScreenState) => void;
  highScore: number;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate, highScore }) => {
  const [activeModal, setActiveModal] = useState<'NONE' | 'HOW_TO_PLAY' | 'PRO_DETAILS'>('NONE');

  return (
    <div className="w-full max-w-6xl flex flex-col gap-12 relative">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-center bg-white dark:bg-surface-dark rounded-3xl p-6 lg:p-10 border border-slate-200 dark:border-border-dark shadow-xl shadow-primary/5 relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col gap-6 relative z-10 order-2 lg:order-1">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            พร้อมผจญภัย
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              ค้นหา<span className="text-primary">สัตว์ซ่อนแอบ</span><br />ในสวนสัตว์มหาสนุก!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md leading-relaxed">
              เกมฝึกทักษะสมอง EF สำหรับเด็ก ช่วยพัฒนาการสังเกตและความจำ สนุกไปกับการเรียนรู้ที่ไม่รู้จบ
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <button 
              onClick={() => onNavigate(GameScreenState.LEVEL_SELECT)}
              className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-primary hover:bg-primary-dark text-background-dark text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/25 w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-2xl">play_circle</span>
              <span>เริ่มเล่น</span>
            </button>
            <button 
              onClick={() => setActiveModal('HOW_TO_PLAY')}
              className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-slate-100 dark:bg-border-dark hover:bg-slate-200 dark:hover:bg-[#34463b] text-slate-900 dark:text-white text-lg font-bold transition-all w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-2xl">menu_book</span>
              <span>วิธีเล่น</span>
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 dark:border-border-dark order-1 lg:order-2 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
            <div>
              <p className="text-white text-sm font-medium opacity-90">ด่านปัจจุบัน</p>
              <p className="text-white text-xl font-bold">ป่าอเมซอน</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 text-white">
              <span className="material-symbols-outlined">map</span>
            </div>
          </div>
          <div 
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAC6B3WPUJWqSa3ttdLZpdm4GVGi_qQZ7rG3sTjmplomMOBpigAoAijjGHBLyr3Q9_qVNAphnuRoSjJJNVvxWwDCWr6IUk8GvIKa4T1SPm2DOT5lDAC_HlmxDlWZ7KADdcIcd7C8wM1QwpHPMB5kfuuX9IyPan9RlWLZN4K5r2aWq7mvaZ3MbUp0N5CVDLX7rGWk2MMUC1DLxbw3A0AIdYpoz0N_PH__6KaiU-EpShLZMbV8oarYNmh6DxyXqo_5VltjFdwEVhF7Joq")' }}
          ></div>
        </div>
      </div>

      {/* Stats & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="col-span-1 md:col-span-1 bg-gradient-to-br from-slate-100 to-white dark:from-surface-dark dark:to-[#16201a] border border-slate-200 dark:border-border-dark rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">emoji_events</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined">trophy</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">สถิติสูงสุด</h3>
            </div>
            <p className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {highScore.toLocaleString()}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">คะแนนที่ดีที่สุดของคุณ</p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-primary text-sm font-bold bg-primary/10 w-fit px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span>+ใหม่ล่าสุด</span>
          </div>
        </div>

        {/* Pro Features */}
        <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-3xl p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                ฟีเจอร์ <span className="text-primary">Pro</span>
                <span className="material-symbols-outlined text-amber-400">star</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">อัปเกรดเพื่อประสบการณ์ที่ดีที่สุด</p>
            </div>
            <button 
              onClick={() => setActiveModal('PRO_DETAILS')}
              className="flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-primary/20 text-primary text-sm font-bold hover:bg-primary hover:text-background-dark transition-colors"
            >
              <span>ดูรายละเอียด</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard icon="block" color="red" title="ไม่มีโฆษณา" desc="เล่นต่อเนื่องไม่มีสะดุด" />
            <FeatureCard icon="lock_open" color="purple" title="ด่านลับพิเศษ" desc="ปลดล็อกโซนไดโนเสาร์" />
            <FeatureCard icon="save" color="blue" title="บันทึก Cloud" desc="เล่นได้ทุกอุปกรณ์" />
          </div>
        </div>
      </div>

      {/* How To Play Modal */}
      {activeModal === 'HOW_TO_PLAY' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal('NONE')}></div>
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-8 rounded-3xl max-w-lg w-full shadow-2xl relative z-10 flex flex-col gap-6 animate-float">
                <div className="flex items-center justify-between">
                     <h2 className="text-3xl font-bold text-slate-900 dark:text-white">วิธีเล่น</h2>
                     <button onClick={() => setActiveModal('NONE')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                     </button>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary">search</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">1. ค้นหา</h3>
                            <p className="text-slate-500 dark:text-slate-400">มองหาสัตว์ที่ซ่อนอยู่ในภาพตามเงาหรือคำใบ้ที่กำหนดให้</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                        <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-blue-500">touch_app</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">2. แตะเพื่อเก็บ</h3>
                            <p className="text-slate-500 dark:text-slate-400">เมื่อเจอแล้ว ให้แตะที่ตัวสัตว์เพื่อสะสมแต้ม ระวังแตะผิดนะ!</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                        <div className="size-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-red-500">timer</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">3. แข่งกับเวลา</h3>
                            <p className="text-slate-500 dark:text-slate-400">ต้องรีบหน่อยนะ! เพราะเวลาจะนับถอยหลังเรื่อยๆ ยิ่งเร็วยิ่งได้แต้มเยอะ</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => { setActiveModal('NONE'); onNavigate(GameScreenState.LEVEL_SELECT); }}
                    className="w-full py-4 bg-primary text-black font-bold text-xl rounded-2xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 mt-2"
                >
                    เข้าใจแล้ว! เริ่มเล่นเลย
                </button>
            </div>
        </div>
      )}

      {/* Pro Details Modal */}
      {activeModal === 'PRO_DETAILS' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal('NONE')}></div>
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-8 rounded-3xl max-w-lg w-full shadow-2xl relative z-10 flex flex-col gap-6 animate-float">
                <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-full text-amber-500 mb-2">
                        <span className="material-symbols-outlined text-4xl">verified</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center">อัปเกรดเป็น <span className="text-amber-500">Pro</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 text-center">ปลดล็อกความสนุกไร้ขีดจำกัด</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-3xl">block</span>
                        <h4 className="font-bold text-slate-900 dark:text-white">ไร้โฆษณา</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">เล่นได้ต่อเนื่องไม่มีสะดุด</p>
                     </div>
                     <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-2">
                        <span className="material-symbols-outlined text-purple-500 text-3xl">token</span>
                        <h4 className="font-bold text-slate-900 dark:text-white">ด่านพิเศษ</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">โซนไดโนเสาร์ & อวกาศ</p>
                     </div>
                     <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-2">
                        <span className="material-symbols-outlined text-blue-500 text-3xl">cloud_upload</span>
                        <h4 className="font-bold text-slate-900 dark:text-white">Cloud Save</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ซิงค์ข้อมูลได้ทุกเครื่อง</p>
                     </div>
                     <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-3xl">palette</span>
                        <h4 className="font-bold text-slate-900 dark:text-white">Theme สี</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ปรับแต่งหน้าตาแอพ</p>
                     </div>
                </div>

                <div className="mt-4">
                    <button className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold text-xl rounded-2xl hover:from-amber-500 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20 mb-3 flex items-center justify-center gap-2">
                        <span>ซื้อเลยเพียง ฿99</span>
                    </button>
                    <button onClick={() => setActiveModal('NONE')} className="w-full py-3 text-slate-500 dark:text-slate-400 font-bold hover:text-slate-700 dark:hover:text-white transition-colors">
                        ไว้คราวหลัง
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

const FeatureCard: React.FC<{ icon: string, color: string, title: string, desc: string }> = ({ icon, color, title, desc }) => {
  const colorClasses: Record<string, string> = {
    red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  };

  return (
    <div className="bg-white dark:bg-[#111813] p-4 rounded-2xl border border-slate-100 dark:border-border-dark flex flex-col gap-3 transition hover:border-primary/50">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
      </div>
    </div>
  );
};

export default LandingScreen;