
import React, { useState } from 'react';

interface NotificationsSettingsProps {
  onBack: () => void;
}

export const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({ onBack }) => {
  const [tradeAlerts, setTradeAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-32">
      <div className="flex items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start text-slate-500 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center">Notifications</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 bg-white dark:bg-[#1e1e1e]/50 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-white/10">
          
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Trade Alerts</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Get notified for risk/reward hits.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={tradeAlerts} onChange={() => setTradeAlerts(!tradeAlerts)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B5DE5]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Weekly Reports</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Summary of your trading week.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={weeklyReport} onChange={() => setWeeklyReport(!weeklyReport)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B5DE5]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Marketing</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Product updates and offers.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={marketing} onChange={() => setMarketing(!marketing)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B5DE5]"></div>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};
