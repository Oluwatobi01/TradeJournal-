import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between overflow-hidden bg-background-dark p-6 text-white">
      {/* Background Abstract Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-[#9B5DE5]/20 blur-3xl animate-pulse"></div>
        <div className="absolute -right-1/4 -bottom-1/4 h-1/2 w-1/2 rounded-full bg-[#00F5D4]/20 blur-3xl"></div>
        <div className="absolute -left-1/4 bottom-0 h-1/3 w-1/3 rounded-full bg-[#00A8E8]/10 blur-3xl"></div>
      </div>

      <div className="flex-grow"></div>

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-xl bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm border border-white/10">
          <span className="material-symbols-outlined text-6xl text-[#00F5D4]">insights</span>
        </div>
        <h1 className="text-white font-display tracking-tight text-4xl font-bold leading-tight">
          Trade Smarter,<br />Not Harder
        </h1>
        <p className="text-white/60 font-display text-base font-normal leading-normal pt-4 max-w-xs">
          Your AI-powered journal to stop fumbling the bag and start stacking wins.
        </p>
      </div>

      <div className="flex-grow"></div>

      <div className="relative z-10 w-full max-w-sm pb-8">
        <button 
          onClick={onStart}
          className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-gradient-to-r from-[#00F5D4] to-[#4725f4] text-white text-lg font-bold leading-normal tracking-wide shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform active:scale-95"
        >
          <span className="truncate">Get Started</span>
        </button>
        <div className="mt-4">
          <p className="text-white/60 font-display text-sm font-normal leading-normal text-center">
            Already have an account? <a className="font-semibold text-[#00F5D4] underline" href="#">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};