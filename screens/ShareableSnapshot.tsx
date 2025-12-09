
import React from 'react';

interface ShareableSnapshotProps {
  onClose: () => void;
}

export const ShareableSnapshot: React.FC<ShareableSnapshotProps> = ({ onClose }) => {
  
  const handleShare = () => {
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'My Weekly Trading Snapshot',
            text: 'Just crushed it this week on TradeJournal AI! 🚀',
            url: 'https://tradejournal.ai', // Use a valid public URL to avoid 'Invalid URL' errors in preview environments
        }).catch((err) => {
            console.error("Share failed:", err);
            // Fallback visual feedback if share is cancelled or fails
            alert("Share functionality simulated! (Native share dismissed)");
        });
    } else {
        alert("Share functionality simulated! (Native share not supported on this browser)");
    }
  };

  const handleCustomize = () => {
    alert("Customize Themes coming soon! 🎨");
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#101012] p-4 font-display pb-32">
      {/* Close Button */}
      <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] right-4 z-50">
        <button 
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full bg-background-dark/80 text-white backdrop-blur-md hover:bg-white/10 transition-colors border border-white/10"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <main className="w-full max-w-sm">
        {/* Card Container with Neon Glow Effect */}
        <div className="relative w-full rounded-[3rem]">
          {/* Glow/Border Element - Simulates the CSS ::before mask effect */}
          <div 
            className="absolute -inset-[2px] rounded-[3rem] opacity-70 blur-md"
            style={{
              background: 'linear-gradient(145deg, #00BFFF, #FF00FF, #39FF14)',
              zIndex: 0
            }}
          />
          
          {/* Main Card Content */}
          <div className="relative z-10 flex flex-col rounded-[3rem] bg-background-dark p-6 sm:p-8">
            
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div 
                className="h-14 w-14 shrink-0 rounded-full bg-cover bg-center bg-no-repeat" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMyNQ0MpxzRNWtatqbo4zvhQqJKHWGLB86xVCIRa6Yx7XRcSMk_qH0mDfT7gGD0fhv9QqgG0s7D2UaJIcW9WuxTBlY8VdJ3VZ8rIW-NulVRcReGU8ZShHFTCwN9E6dEIexEprWG1guj_7fbqK7tB_vVP3EX2NLJWE8fRwGEwewzc4HNLppCRl5F9M3uPqREFjW_cce5fP1HLWotJpsBGeJDlGT4pBETuLOXQG2bQVR-eEXiom9QrHJFachomBkNzYxuwLodVl04T_K")'}}
              ></div>
              <div className="flex flex-col">
                <p className="font-display text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">
                  @zenith_trader
                </p>
              </div>
            </div>

            {/* Emoji and Headline */}
            <div className="mt-8 flex flex-col items-center text-center">
              <div className="relative">
                {/* Subtle glow behind emoji */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                <h1 className="relative font-display text-[64px] font-bold leading-tight tracking-light text-white">
                  🚀
                </h1>
              </div>
              <h2 className="font-display text-[28px] font-bold leading-tight tracking-light text-white mt-2">
                Crushed it this week!
              </h2>
              <p className="font-display pt-1 pb-3 text-sm font-normal leading-normal text-[#A0A0A0]">
                Last 7 Days
              </p>
            </div>

            {/* Stats Grid */}
            <div className="mt-4 flex flex-col gap-4">
              {/* Win Rate */}
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-2xl bg-primary/10 p-6 shadow-[0_0_15px_2px_rgba(71,37,244,0.3)] border border-primary/20">
                <p className="font-display text-base font-medium leading-normal text-white/80">Win Rate</p>
                <p className="font-display text-2xl font-bold leading-tight tracking-light text-white">72%</p>
              </div>

              {/* P/L */}
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-2xl bg-primary/10 p-6 shadow-[0_0_15px_2px_rgba(71,37,244,0.3)] border border-primary/20">
                <p className="font-display text-base font-medium leading-normal text-white/80">P/L</p>
                <p className="font-display text-2xl font-bold leading-tight tracking-light text-white">+15.3% risked</p>
              </div>

              {/* Trades */}
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-2xl bg-primary/10 p-6 shadow-[0_0_15px_2px_rgba(71,37,244,0.3)] border border-primary/20">
                <p className="font-display text-base font-medium leading-normal text-white/80">Trades</p>
                <p className="font-display text-2xl font-bold leading-tight tracking-light text-white">34</p>
              </div>
            </div>

            {/* Footer Branding */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">insights</span>
              <p className="font-display text-sm font-medium text-[#A0A0A0]">TradeJournal AI</p>
            </div>
          </div>
        </div>
      </main>

      {/* Action Buttons */}
      <div className="fixed bottom-[calc(2.5rem+env(safe-area-inset-bottom))] left-0 right-0 w-full px-4 z-40">
        <div className="mx-auto max-w-sm flex flex-col gap-3 sm:flex-row bg-[#101012]/80 backdrop-blur-md p-2 rounded-3xl border border-white/10">
          <button 
            onClick={handleCustomize}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white/10 px-6 font-display font-bold text-white transition-colors hover:bg-white/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">palette</span>
            Customize
          </button>
          <button 
            onClick={handleShare}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 font-display font-bold text-white transition-colors hover:bg-primary/90 shadow-[0_0_15px_rgba(71,37,244,0.5)] active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">ios_share</span>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
