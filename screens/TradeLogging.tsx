import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface TradeLoggingProps {
  onClose: () => void;
}

export const TradeLogging: React.FC<TradeLoggingProps> = ({ onClose }) => {
  const { addTrade } = useAppContext();
  
  const [pair, setPair] = useState('');
  const [direction, setDirection] = useState<'Buy' | 'Sell'>('Buy');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [size, setSize] = useState('');
  const [risk, setRisk] = useState('1.5');
  const [mood, setMood] = useState<any>('🧘');
  const [notes, setNotes] = useState('');

  const moodMap: Record<string, string> = {
    '🧘': 'Focused',
    '🤯': 'Anxious',
    '🤩': 'Confident',
    '🤔': 'Fearful',
    '🤑': 'Greedy'
  };

  const handleLogTrade = () => {
    if (navigator.vibrate) navigator.vibrate(20);
    
    if (!pair || !entryPrice || !exitPrice || !size) {
        alert("Please fill in all required fields.");
        return;
    }
    addTrade({
        pair,
        type: direction === 'Buy' ? 'Long' : 'Short',
        entryPrice: parseFloat(entryPrice),
        exitPrice: parseFloat(exitPrice),
        size: parseFloat(size),
        risk: parseFloat(risk),
        mood: moodMap[mood] as any || 'Focused',
        notes: notes || 'No notes added.',
    });
    onClose();
  };

  const moods = ['🧘', '🤩', '🤑', '🤯', '🤔'];

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-[#f0f0f5] transition-colors duration-300">
      
      {/* Background decoration */}
      <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-20 flex min-h-[5rem] items-center px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))]">
        <button onClick={onClose} className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">New Trade</h1>
        <div className="size-10"></div>
      </header>

      {/* Main Form */}
      <main className="flex-1 overflow-y-auto px-6 pb-48 pt-2">
        <div className="flex flex-col gap-6">
          
          {/* Pair Input & Direction Toggle */}
          <div className="flex flex-col gap-4">
             <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider mb-2 block">Ticker</label>
                    <input 
                        value={pair}
                        onChange={(e) => setPair(e.target.value.toUpperCase())}
                        className="w-full bg-white dark:bg-[#161521] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-xl font-bold placeholder-slate-300 dark:placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none uppercase" 
                        placeholder="BTC/USD" 
                        autoFocus
                    />
                </div>
                <div className="flex-1">
                     <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider mb-2 block">Side</label>
                     <div className="flex h-[62px] bg-white dark:bg-[#161521] rounded-2xl p-1.5 border border-slate-200 dark:border-white/10">
                        <button onClick={() => setDirection('Buy')} className={`flex-1 rounded-xl font-bold text-sm transition-all ${direction === 'Buy' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'text-slate-400'}`}>Long</button>
                        <button onClick={() => setDirection('Sell')} className={`flex-1 rounded-xl font-bold text-sm transition-all ${direction === 'Sell' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'text-slate-400'}`}>Short</button>
                     </div>
                </div>
             </div>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-2 gap-4">
             <NumberInput label="Entry Price" value={entryPrice} setValue={setEntryPrice} placeholder="0.00" />
             <NumberInput label="Exit Price" value={exitPrice} setValue={setExitPrice} placeholder="0.00" />
             <NumberInput label="Position Size" value={size} setValue={setSize} placeholder="1.0" />
             <NumberInput label="Risk %" value={risk} setValue={setRisk} placeholder="1.0" />
          </div>

          {/* Mood Selector - Horizontal Scroll */}
          <div className="flex flex-col gap-2">
             <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider block">Your Vibe</label>
             <div className="flex gap-3 overflow-x-auto pb-4 pt-2 snap-x hide-scrollbar">
                {moods.map((m) => (
                    <button 
                        key={m}
                        onClick={() => setMood(m)}
                        className={`flex flex-col items-center justify-center min-w-[70px] h-[80px] rounded-2xl border transition-all snap-center ${
                            mood === m 
                            ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(71,37,244,0.3)] scale-105' 
                            : 'bg-white dark:bg-[#161521] border-slate-200 dark:border-white/10 opacity-70 grayscale'
                        }`}
                    >
                        <span className="text-3xl mb-1 filter drop-shadow-md">{m}</span>
                        <span className="text-[10px] font-bold text-slate-900 dark:text-white">{moodMap[m]}</span>
                    </button>
                ))}
             </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider block">Notes</label>
            <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 bg-white dark:bg-[#161521] border border-slate-200 dark:border-white/10 rounded-3xl p-5 text-base placeholder-slate-300 dark:placeholder-white/20 focus:ring-2 focus:ring-primary outline-none resize-none" 
                placeholder="What was the setup?..."
            ></textarea>
          </div>
        </div>
      </main>

      {/* Floating Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/90 dark:via-background-dark/90 to-transparent">
          
          {/* AI Hint */}
          <div className="flex items-center gap-3 mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 w-max mx-auto backdrop-blur-md">
            <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
            <p className="text-xs font-bold text-primary">High probability setup detected</p>
          </div>

          <button 
             onClick={handleLogTrade}
             className="w-full h-16 rounded-[2rem] bg-gradient-to-r from-primary to-[#7C3AED] text-white text-lg font-bold shadow-[0_10px_30px_rgba(71,37,244,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm Log</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
      </div>
    </div>
  );
};

const NumberInput = ({ label, value, setValue, placeholder }: any) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 dark:text-white/60 uppercase tracking-wider block">{label}</label>
        <input 
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white dark:bg-[#161521] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-lg font-bold placeholder-slate-300 dark:placeholder-white/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder={placeholder}
        />
    </div>
);