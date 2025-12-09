
import React from 'react';

interface HelpSupportProps {
  onBack: () => void;
}

export const HelpSupport: React.FC<HelpSupportProps> = ({ onBack }) => {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-32">
      <div className="flex items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start text-slate-500 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center">Help & Support</h2>
        <div className="w-12"></div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold px-2">Frequently Asked Questions</h3>
            <div className="flex flex-col gap-2 bg-white dark:bg-[#1e1e1e]/50 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-white/10">
                <details className="group p-4 border-b border-slate-100 dark:border-white/5">
                    <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                        <span>How is DNA Score calculated?</span>
                        <span className="transition group-open:rotate-180">
                            <span className="material-symbols-outlined">expand_more</span>
                        </span>
                    </summary>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 group-open:animate-fadeIn">
                        It is based on your discipline, risk management consistency, and emotional tags logged with each trade.
                    </p>
                </details>
                <details className="group p-4 border-b border-slate-100 dark:border-white/5">
                    <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                        <span>Can I export my data?</span>
                        <span className="transition group-open:rotate-180">
                            <span className="material-symbols-outlined">expand_more</span>
                        </span>
                    </summary>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 group-open:animate-fadeIn">
                        Yes, go to Account Settings to download a CSV of your trade history.
                    </p>
                </details>
                <details className="group p-4">
                    <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                        <span>Is my data secure?</span>
                        <span className="transition group-open:rotate-180">
                            <span className="material-symbols-outlined">expand_more</span>
                        </span>
                    </summary>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 group-open:animate-fadeIn">
                        Absolutely. We use industry-standard encryption for all your personal and trade data.
                    </p>
                </details>
            </div>
        </div>

        <button 
          onClick={() => window.open('mailto:support@tradejournal.ai')}
          className="w-full rounded-full bg-[#F15BB5] py-4 text-base font-bold text-white shadow-lg shadow-[#F15BB5]/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">mail</span>
          Contact Support
        </button>

      </div>
    </div>
  );
};
