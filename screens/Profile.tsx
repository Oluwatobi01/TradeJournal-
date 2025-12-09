
import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';

interface ProfileProps {
  onLogout: () => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout, onBack, onNavigate }) => {
  const { user, updateUser, toggleDarkMode, analytics } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                updateUser({ avatarUrl: reader.result });
            }
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display text-slate-900 dark:text-white pb-32">
      {/* Header */}
      <div className="flex items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <div className="flex size-12 shrink-0 items-center">
          <button 
            onClick={onBack}
            className="material-symbols-outlined text-slate-900 dark:text-white text-3xl hover:opacity-70 transition-opacity"
          >
            arrow_back_ios_new
          </button>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Profile</h2>
        <div className="flex size-12 shrink-0 items-center justify-end">
          <button 
            onClick={() => alert('More options menu')}
            className="material-symbols-outlined text-slate-900 dark:text-white text-3xl hover:opacity-70 transition-opacity"
          >
            more_horiz
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 p-4">
        {/* Avatar Section */}
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="relative group">
            <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-2 border-[#9B5DE5] transition-transform duration-300 group-hover:scale-105" 
                style={{backgroundImage: `url("${user.avatarUrl}")`}}
            ></div>
            <button 
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#00F5D4] text-background-dark shadow-md border border-white/20 hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button onClick={() => onNavigate('account_settings')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{user.username}</p>
                <span className="material-symbols-outlined text-sm text-slate-400 dark:text-white/50">edit</span>
            </button>
            <p className="text-slate-500 dark:text-[#888888] text-base font-normal leading-normal text-center">{user.email}</p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="flex flex-col gap-4 bg-white dark:bg-[#1e1e1e]/50 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-white/10 dark:shadow-[0_0_15px_rgba(0,245,212,0.1),0_0_20px_rgba(155,93,229,0.1)]">
          <h3 className="text-slate-900 dark:text-white/90 text-lg font-bold px-2">Performance Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-slate-50 dark:bg-background-dark/60 hover:bg-slate-100 dark:hover:bg-background-dark/80 transition-colors">
              <p className="text-slate-500 dark:text-[#888888] text-sm font-medium leading-normal">Overall P/L</p>
              <p className="text-[#00c9ae] dark:text-[#00F5D4] text-xl font-bold leading-tight">{analytics.netPnl >= 0 ? '+' : ''}${analytics.netPnl.toLocaleString()}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-slate-50 dark:bg-background-dark/60 hover:bg-slate-100 dark:hover:bg-background-dark/80 transition-colors">
              <p className="text-slate-500 dark:text-[#888888] text-sm font-medium leading-normal">Win Rate</p>
              <p className="text-[#008cc9] dark:text-[#00A6FB] text-xl font-bold leading-tight">{analytics.winRate}%</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-slate-50 dark:bg-background-dark/60 hover:bg-slate-100 dark:hover:bg-background-dark/80 transition-colors">
              <p className="text-slate-500 dark:text-[#888888] text-sm font-medium leading-normal">Total Trades</p>
              <p className="text-[#8e44ad] dark:text-[#9B5DE5] text-xl font-bold leading-tight">{analytics.totalTrades}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-4 bg-slate-50 dark:bg-background-dark/60 hover:bg-slate-100 dark:hover:bg-background-dark/80 transition-colors">
              <p className="text-slate-500 dark:text-[#888888] text-sm font-medium leading-normal">Best Asset</p>
              <p className="text-[#e91e63] dark:text-[#F15BB5] text-xl font-bold leading-tight">TSLA</p>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex flex-col gap-1 bg-white dark:bg-[#1e1e1e]/50 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-white/10 dark:shadow-[0_0_15px_rgba(0,245,212,0.1),0_0_20px_rgba(155,93,229,0.1)]">
          
          {/* Dark Mode */}
          <div 
            onClick={toggleDarkMode}
            className="flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl p-3 cursor-pointer transition-colors active:scale-[0.99]"
          >
            <div className="text-[#9B5DE5] flex items-center justify-center rounded-lg bg-[#9B5DE5]/10 shrink-0 size-10">
              <span className="material-symbols-outlined">dark_mode</span>
            </div>
            <p className="text-base font-medium leading-normal flex-1 truncate">Dark Mode</p>
            <div className="shrink-0 pointer-events-none">
               {/* Toggle Switch */}
              <div className="relative inline-flex items-center">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={user.isDarkMode} 
                    readOnly
                />
                <div className="w-14 h-8 bg-slate-200 dark:bg-background-dark/80 rounded-full border border-slate-300 dark:border-white/20 peer-checked:bg-slate-800 dark:peer-checked:bg-background-dark/80 p-1 flex items-center transition-colors duration-300">
                    <div className={`w-6 h-6 rounded-full bg-white dark:bg-[#00F5D4] shadow-md transform transition-transform duration-300 ease-in-out ${user.isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div 
            onClick={() => onNavigate('account_settings')} 
            className="flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl p-3 cursor-pointer transition-colors active:scale-[0.99]"
          >
            <div className="text-[#00c9ae] dark:text-[#00F5D4] flex items-center justify-center rounded-lg bg-[#00F5D4]/10 shrink-0 size-10">
              <span className="material-symbols-outlined">person</span>
            </div>
            <p className="text-base font-medium leading-normal flex-1 truncate">Account Settings</p>
            <div className="shrink-0 text-slate-400 dark:text-white/50">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

          {/* Privacy */}
          <div 
            onClick={() => onNavigate('privacy')}
            className="flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl p-3 cursor-pointer transition-colors active:scale-[0.99]"
          >
            <div className="text-[#008cc9] dark:text-[#00A6FB] flex items-center justify-center rounded-lg bg-[#00A6FB]/10 shrink-0 size-10">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <p className="text-base font-medium leading-normal flex-1 truncate">Privacy & Security</p>
            <div className="shrink-0 text-slate-400 dark:text-white/50">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

          {/* Notifications */}
          <div 
            onClick={() => onNavigate('notifications')}
            className="flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl p-3 cursor-pointer transition-colors active:scale-[0.99]"
          >
            <div className="text-[#8e44ad] dark:text-[#9B5DE5] flex items-center justify-center rounded-lg bg-[#9B5DE5]/10 shrink-0 size-10">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <p className="text-base font-medium leading-normal flex-1 truncate">Notifications</p>
            <div className="shrink-0 text-slate-400 dark:text-white/50">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

          {/* Help */}
          <div 
            onClick={() => onNavigate('help')}
            className="flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl p-3 cursor-pointer transition-colors active:scale-[0.99]"
          >
            <div className="text-[#e91e63] dark:text-[#F15BB5] flex items-center justify-center rounded-lg bg-[#F15BB5]/10 shrink-0 size-10">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <p className="text-base font-medium leading-normal flex-1 truncate">Help & Support</p>
            <div className="shrink-0 text-slate-400 dark:text-white/50">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-[#F15BB5]/10 dark:bg-[#F15BB5]/20 text-[#e91e63] dark:text-[#F15BB5] text-base font-bold leading-normal tracking-[0.015em] w-full mt-4 hover:bg-[#F15BB5]/20 dark:hover:bg-[#F15BB5]/30 transition-colors active:scale-[0.98]"
        >
          <span className="truncate">Logout</span>
        </button>

      </div>
    </div>
  );
};
