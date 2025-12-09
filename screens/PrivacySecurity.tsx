
import React, { useState } from 'react';

interface PrivacySecurityProps {
  onBack: () => void;
}

export const PrivacySecurity: React.FC<PrivacySecurityProps> = ({ onBack }) => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-32">
      <div className="flex items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start text-slate-500 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center">Privacy & Security</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 bg-white dark:bg-[#1e1e1e]/50 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-white/10">
          
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Two-Factor Auth</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Secure your account with 2FA.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A6FB]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Data Sharing</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Share anonymized data for AI training.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={dataSharing} onChange={() => setDataSharing(!dataSharing)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A6FB]"></div>
            </label>
          </div>

        </div>

        <button className="flex w-full items-center justify-between rounded-2xl bg-white dark:bg-[#1e1e1e]/50 p-4 shadow-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left">
           <span className="font-medium text-[#FF5B5B]">Delete Account</span>
           <span className="material-symbols-outlined text-[#FF5B5B]">delete</span>
        </button>
      </div>
    </div>
  );
};
