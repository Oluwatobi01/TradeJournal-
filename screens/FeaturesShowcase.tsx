import React from 'react';

interface FeaturesShowcaseProps {
  onContinue: () => void;
  onSkip: () => void;
}

export const FeaturesShowcase: React.FC<FeaturesShowcaseProps> = ({ onContinue, onSkip }) => {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display group/design-root overflow-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))] justify-between">
        <div className="flex size-12 shrink-0 items-center"></div>
        <div className="flex w-auto items-center justify-end">
          <button 
            onClick={onSkip}
            className="text-neutral-400 dark:text-neutral-500 text-base font-bold leading-normal tracking-[0.015em] shrink-0 hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        {/* Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8">
          <div className="flex items-center gap-6 w-full px-2">
            
            {/* Card 1: AI Analytics */}
            <div className="flex flex-col gap-6 rounded-lg min-w-full flex-shrink-0 snap-center text-center items-center">
              <div className="w-full max-w-sm bg-black/20 dark:bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-[#00FFFF]/50 shadow-[0_0_15px_4px_rgba(0,255,255,0.3),0_0_5px_1px_rgba(0,255,255,0.2)]">
                <div className="flex justify-center mb-6">
                  <span className="material-symbols-outlined text-[64px] text-[#00FFFF]" style={{ fontSize: '64px' }}>insights</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-[#00FFFF]">AI-Powered Insights</h2>
                <p className="text-neutral-600 dark:text-neutral-300 text-base font-normal leading-normal mt-2">
                  Get smarter analytics and identify trading patterns automatically.
                </p>
              </div>
            </div>

            {/* Card 2: Trade Logging */}
            <div className="flex flex-col gap-6 rounded-lg min-w-full flex-shrink-0 snap-center text-center items-center">
              <div className="w-full max-w-sm bg-black/20 dark:bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-[#FF00FF]/50 shadow-[0_0_15px_4px_rgba(255,0,255,0.3),0_0_5px_1px_rgba(255,0,255,0.2)]">
                <div className="flex justify-center mb-6">
                  <span className="material-symbols-outlined text-[64px] text-[#FF00FF]" style={{ fontSize: '64px' }}>add_circle</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-[#FF00FF]">Log Trades in Seconds</h2>
                <p className="text-neutral-600 dark:text-neutral-300 text-base font-normal leading-normal mt-2">
                  Effortlessly journal and track your performance on the go.
                </p>
              </div>
            </div>

            {/* Card 3: Shareable Snapshots */}
            <div className="flex flex-col gap-6 rounded-lg min-w-full flex-shrink-0 snap-center text-center items-center">
              <div className="w-full max-w-sm bg-black/20 dark:bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-[#00FF00]/50 shadow-[0_0_15px_4px_rgba(0,255,0,0.3),0_0_5px_1px_rgba(0,255,0,0.2)]">
                <div className="flex justify-center mb-6">
                  <span className="material-symbols-outlined text-[64px] text-[#00FF00]" style={{ fontSize: '64px' }}>ios_share</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-[#00FF00]">Flex Your Wins</h2>
                <p className="text-neutral-600 dark:text-neutral-300 text-base font-normal leading-normal mt-2">
                  Create and share visually stunning snapshots of your best trades.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-4 py-6 flex flex-col gap-6 pb-12">
        {/* Page Indicators (Visual Only for MVP) */}
        <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
          <div className="h-2.5 w-6 rounded-full bg-[#00FFFF]"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700 dark:bg-neutral-600"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700 dark:bg-neutral-600"></div>
        </div>

        {/* Single Button */}
        <div className="flex justify-center">
          <button 
            onClick={onContinue}
            className="flex min-w-[84px] max-w-[480px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 flex-1 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
          >
            <span className="truncate">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};