
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface AccountSettingsProps {
  onBack: () => void;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ onBack }) => {
  const { user, updateUser } = useAppContext();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    updateUser({ username, email });
    onBack();
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-32">
      {/* Header */}
      <div className="flex items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start text-slate-500 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center">Account Settings</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Form */}
        <div className="flex flex-col gap-4 bg-white dark:bg-[#1e1e1e]/50 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-white/10">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Display Name</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#131022] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00F5D4]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#131022] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00F5D4]"
            />
          </div>

          <div className="flex flex-col gap-2 opacity-50 pointer-events-none">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Password</label>
            <input 
              type="password" 
              value="********"
              readOnly
              className="w-full bg-slate-100 dark:bg-[#131022] border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white"
            />
          </div>

        </div>

        <button 
          onClick={handleSave}
          className="w-full rounded-full bg-[#00F5D4] py-4 text-base font-bold text-[#131022] shadow-lg shadow-[#00F5D4]/20 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
