import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';

interface AnalyticsProps {
  onShare: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({ onShare }) => {
  const { analytics, user } = useAppContext();
  const [timeframe, setTimeframe] = useState('Weekly');

  const radarData = [
    { subject: 'Discipline', A: analytics.dnaScore.discipline, fullMark: 100 },
    { subject: 'Risk Mgt', A: analytics.dnaScore.riskMgt, fullMark: 100 },
    { subject: 'Emotional', A: analytics.dnaScore.emotional, fullMark: 100 },
  ];

  return (
    <div className="min-h-[100dvh] bg-background-light dark:bg-background-dark pb-36 font-display transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="fixed top-20 left-[-100px] w-[300px] h-[300px] bg-[#00F0FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl px-6 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] justify-between">
        <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">Analytics</h2>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-xl">calendar_month</span>
        </button>
      </div>

      <div className="px-6 space-y-6 pt-2 relative z-10">
        
        {/* Timeframe Toggle */}
        <div className="flex p-1 bg-white dark:bg-[#161521] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
            {['Daily', 'Weekly', 'Monthly'].map((t) => (
                <button 
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                        timeframe === t 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md' 
                        : 'text-slate-400 dark:text-white/40'
                    }`}
                >
                    {t}
                </button>
            ))}
        </div>

        {/* Trader Profile Card - Glass Style */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161521] shadow-xl">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-[#7C3AED] opacity-20"></div>
            <div className="p-6 pt-8 relative">
                <div className="size-16 rounded-2xl bg-gradient-to-tr from-primary to-[#00F0FF] p-[2px] mb-4 shadow-lg shadow-primary/20">
                    <div className="size-full rounded-2xl bg-white dark:bg-[#161521] flex items-center justify-center">
                        <span className="text-3xl">🎯</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">The Disciplined Sniper</h3>
                <p className="text-sm text-slate-500 dark:text-white/60 leading-relaxed">
                    Your trading behavior shows a pattern of precise entries and a disciplined approach to risk management.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trader DNA Score */}
            <div className="rounded-[2rem] bg-white dark:bg-[#161521] p-6 shadow-sm border border-slate-200 dark:border-white/5 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                    <p className="font-bold text-slate-900 dark:text-white">DNA Score</p>
                    <span className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-1 rounded-lg">Top 10%</span>
                </div>
                <div className="h-[180px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke={user.isDarkMode ? "#333" : "#eee"} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: user.isDarkMode ? '#888' : '#888', fontSize: 10, fontWeight: 700 }} />
                            <Radar
                                name="Trader"
                                dataKey="A"
                                stroke="#7C3AED"
                                strokeWidth={3}
                                fill="#7C3AED"
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Win/Loss Ratio */}
            <div className="rounded-[2rem] bg-white dark:bg-[#161521] p-6 shadow-sm border border-slate-200 dark:border-white/5">
                <p className="font-bold text-slate-900 dark:text-white mb-4">Win Ratio</p>
                
                <div className="flex items-end gap-2 mb-6">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">{analytics.winRate}%</span>
                    <span className="text-sm font-bold text-slate-400 mb-2">/ 100</span>
                </div>
                
                <div className="w-full h-4 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mb-2">
                    <div 
                        className="h-full rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)]" 
                        style={{ 
                            width: `${analytics.winRate}%`,
                            background: 'linear-gradient(90deg, #4725f4 0%, #00F0FF 100%)'
                        }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>{analytics.winRate}% Won</span>
                    <span>{100 - analytics.winRate}% Lost</span>
                </div>
            </div>
        </div>

        {/* Biggest Mistakes */}
        <div className="rounded-[2rem] bg-white dark:bg-[#161521] p-6 shadow-sm border border-slate-200 dark:border-white/5">
            <p className="font-bold text-slate-900 dark:text-white mb-4">Areas to Improve</p>
            <div className="flex flex-col gap-5">
                {analytics.mistakes.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm font-bold">
                            <span className="text-slate-500 dark:text-white/70">{item.label}</span>
                            <span className="text-slate-900 dark:text-white">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full" 
                                style={{ 
                                    width: `${item.value}%`,
                                    background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Floating Share Button */}
      <div className="fixed bottom-[calc(7rem+env(safe-area-inset-bottom))] right-6 z-30">
        <button 
          onClick={onShare}
          className="size-14 rounded-full bg-white dark:bg-[#161521] text-slate-900 dark:text-white shadow-xl flex items-center justify-center border border-slate-100 dark:border-white/10 hover:scale-110 transition-transform active:scale-90"
        >
            <span className="material-symbols-outlined text-2xl">ios_share</span>
        </button>
      </div>

    </div>
  );
};