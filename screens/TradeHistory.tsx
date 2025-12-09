import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const TradeHistory: React.FC = () => {
  const { trades } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter trades based on search
  const filteredTrades = trades.filter(trade => 
    trade.pair.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trade.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.mood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-32 min-h-[100dvh] bg-background-light dark:bg-background-dark font-display transition-colors duration-300">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] backdrop-blur-md">
        {!isSearchActive ? (
            <>
                <div className="size-10"></div> 
                <h1 className="font-display text-xl font-bold text-slate-900 dark:text-[#F5F5F7]">Trade History</h1>
                <button 
                  onClick={() => setIsSearchActive(true)}
                  className="flex size-10 items-center justify-center rounded-full text-slate-500 dark:text-[#F5F5F7] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">search</span>
                </button>
            </>
        ) : (
            <div className="flex w-full items-center gap-2">
                <div className="flex flex-1 items-center rounded-xl bg-slate-100 dark:bg-[#1D1B27] px-3 py-2 border border-slate-200 dark:border-white/10">
                    <span className="material-symbols-outlined text-slate-400 dark:text-white/50">search</span>
                    <input 
                        autoFocus
                        inputMode="search"
                        enterKeyHint="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search trades..."
                        className="flex-1 bg-transparent px-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-none"
                    />
                </div>
                <button 
                  onClick={() => { setIsSearchActive(false); setSearchQuery(''); }}
                  className="text-slate-500 dark:text-white/70 font-medium"
                >
                    Cancel
                </button>
            </div>
        )}
      </div>

      {/* Trade List */}
      <div className="flex flex-col gap-4 px-4 py-2">
        {filteredTrades.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-white/40">
                <span className="material-symbols-outlined text-4xl mb-2">history_edu</span>
                <p>No trades found.</p>
            </div>
        )}

        {filteredTrades.map((trade) => {
          const isWin = trade.pnl >= 0;
          
          // Specific styling based on image
          const glowClass = isWin 
            ? 'shadow-[0_0_15px_rgba(0,255,133,0.3)] border-[#00FF85]/50 dark:border-[#00FF85]/50' 
            : 'shadow-[0_0_15px_rgba(255,0,92,0.3)] border-[#FF005C]/50 dark:border-[#FF005C]/50';
            
          const pnlColor = isWin ? 'text-[#00b359] dark:text-[#00FF85]' : 'text-[#d93434] dark:text-[#FF005C]';
          const pnlBg = isWin ? 'bg-[#00FF85]/10' : 'bg-[#FF005C]/10';

          return (
            <div 
              key={trade.id} 
              className={`group relative rounded-2xl bg-white dark:bg-[#1D1B27] p-5 transition-transform duration-300 hover:scale-[1.02] border ${glowClass}`}
            >
              <div className="relative z-10 flex flex-col gap-3">
                
                {/* Header Row: Pair + PnL */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h2 className="font-display text-lg font-bold leading-tight text-slate-900 dark:text-[#F5F5F7]">
                      {trade.pair} - {trade.type}
                    </h2>
                    <p className="font-display text-sm text-slate-500 dark:text-[#8A8A8E] mt-1">{trade.date}</p>
                  </div>
                  <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${pnlBg} ${pnlColor}`}>
                    <span>{isWin ? '+' : '-'}${Math.abs(trade.pnl).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* AI Text */}
                <p className="font-display text-base text-slate-600 dark:text-[#8A8A8E] leading-normal">
                  AI: {trade.notes}
                </p>

                {/* Footer Row: Risk + Mood */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-[#8A8A8E] mt-1">
                  <span>Risk: {trade.risk}%</span>
                  <div className="flex items-center gap-1.5">
                    <span>{trade.mood}</span>
                    <span className="text-base">
                      {trade.mood === 'Confident' ? '😊' : 
                       trade.mood === 'Anxious' ? '😟' : 
                       trade.mood === 'Focused' ? '🧐' : 
                       trade.mood === 'Greedy' ? '🤑' : '😐'}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};