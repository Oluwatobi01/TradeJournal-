import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppContext } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const { analytics, trades, user } = useAppContext();
  const [activeAsset, setActiveAsset] = useState<'Forex' | 'Crypto' | 'Stocks'>('Crypto');
  const [showNotifications, setShowNotifications] = useState(false);
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);
  
  const filteredTrades = trades.filter(t => t.assetType === activeAsset);
  const displayTrades = filteredTrades.slice(0, 5);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = () => {
    setShowNotifications(false);
  };

  return (
    <div className="pb-36 bg-background-light dark:bg-background-dark min-h-[100dvh] transition-colors duration-300 overflow-x-hidden">
      
      {/* Decorative Background Blob */}
      <div className="fixed top-[-10%] left-[-20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-float opacity-50 dark:opacity-30"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-[#00F0FF]/20 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-30"></div>

      <div className="relative z-10 pt-[calc(0.5rem+env(safe-area-inset-top))]">
        {/* Header */}
        <div className="flex items-center px-6 py-4 justify-between relative z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
                <div className="size-11 rounded-full bg-gradient-to-tr from-primary to-[#00F0FF] p-[2px]">
                    <div className="size-full rounded-full bg-slate-100 dark:bg-[#161521] bg-cover bg-center" style={{backgroundImage: `url("${user.avatarUrl}")`}}></div>
                </div>
                <div className="absolute bottom-0 right-0 size-3 bg-[#00FF94] border-2 border-white dark:border-[#161521] rounded-full"></div>
            </div>
            <div className="text-left">
                <p className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">{greeting}</p>
                <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{user.username} 👋</h1>
            </div>
          </button>
          
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className={`flex size-11 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 transition-all active:scale-90 ${showNotifications ? 'bg-primary text-white shadow-lg shadow-primary/30 border-transparent' : 'bg-white dark:bg-[#161521] text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-3 right-3.5 size-2 rounded-full bg-[#FF005C] animate-pulse border border-white dark:border-[#161521]"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
               <div className="absolute top-14 right-0 w-80 bg-white dark:bg-[#161521] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden animate-fadeInZoom origin-top-right ring-1 ring-black/5">
                 <div className="p-4 flex justify-between items-center bg-slate-50/50 dark:bg-white/5 backdrop-blur-md">
                   <h3 className="font-bold text-slate-900 dark:text-white text-sm">Alerts</h3>
                   <button onClick={() => setShowNotifications(false)} className="size-6 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                     <span className="material-symbols-outlined text-xs">close</span>
                   </button>
                 </div>
                 <div className="max-h-[60vh] overflow-y-auto p-2">
                   {/* Mock Item 1 */}
                   <div className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3 mb-1">
                      <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-lg">tips_and_updates</span>
                      </div>
                      <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Pattern Detected</p>
                          <p className="text-xs text-slate-500 dark:text-white/60">Win rate up 5% on "Breakouts".</p>
                      </div>
                   </div>
                   {/* Mock Item 2 */}
                   <div className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3 mb-1">
                      <div className="size-10 rounded-full bg-[#00FF94]/10 text-[#00FF94] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-lg">trending_up</span>
                      </div>
                      <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Weekly Goal Hit! 🎯</p>
                          <p className="text-xs text-slate-500 dark:text-white/60">You crossed $1,000 profit this week.</p>
                      </div>
                   </div>
                   {/* Mock Item 3 */}
                   <div className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3 mb-1">
                      <div className="size-10 rounded-full bg-[#FF005C]/10 text-[#FF005C] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-lg">warning</span>
                      </div>
                      <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Risk Alert</p>
                          <p className="text-xs text-slate-500 dark:text-white/60">Last trade risk exceeded your 2% limit.</p>
                      </div>
                   </div>
                 </div>
                 <button 
                    onClick={handleMarkAsRead}
                    className="w-full p-3 text-xs font-bold text-primary border-t border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                 >
                   Mark all as read
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* Asset Toggle Pill */}
        <div className="flex px-6 py-2">
          <div className="flex h-12 w-full items-center justify-center rounded-2xl bg-white dark:bg-[#161521] p-1.5 border border-slate-200 dark:border-white/5 shadow-sm">
            {(['Forex', 'Crypto', 'Stocks'] as const).map((asset) => (
               <button
                  key={asset}
                  onClick={() => setActiveAsset(asset)}
                  className={`flex h-full flex-1 cursor-pointer items-center justify-center rounded-xl px-2 transition-all duration-300 ${
                    activeAsset === asset 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg font-bold scale-[1.02]' 
                    : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
               >
                 <span className="truncate text-sm">{asset}</span>
               </button>
            ))}
          </div>
        </div>

        {/* Hero Chart Card */}
        <div className="px-6 py-4">
          <div className="group relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#1E1C29] to-[#161521] p-1 shadow-2xl shadow-primary/10 overflow-hidden border border-white/5">
            {/* Animated Glow Border effect via pseudo element */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-50"></div>
            
            <div className="relative rounded-[2.3rem] bg-[#161521] p-6 h-full">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-white/60 text-xs font-bold tracking-wider uppercase mb-1">Total Net P/L</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight flex items-baseline gap-2">
                            {analytics.netPnl >= 0 ? '+' : ''}${analytics.netPnl.toLocaleString()}
                            <span className="text-sm font-medium px-2 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20">
                                +{analytics.netPnlChange}%
                            </span>
                        </h2>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-[140px] w-[110%] -ml-[5%] mt-4 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.chartData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#4725f4" />
                          <stop offset="100%" stopColor="#00F0FF" />
                        </linearGradient>
                        <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.3}/>
                           <stop offset="100%" stopColor="#4725f4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke="url(#colorVal)" 
                        strokeWidth={4} 
                        fill="url(#colorFill)" 
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 gap-4 px-6 py-2">
          <StatCard 
            label="Win Rate" 
            value={`${analytics.winRate}%`} 
            subValue="+2.1%" 
            subColor="text-[#00FF94]" 
            icon="trophy" 
            color="text-[#FFD700]"
          />
          <StatCard 
            label="Avg R:R" 
            value={`${analytics.avgRisk}R`} 
            subValue="-0.1R" 
            subColor="text-[#FF005C]" 
            icon="balance" 
            color="text-[#00F0FF]"
          />
        </div>

        {/* Last Trades */}
        <div className="px-6 py-6">
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-slate-900 dark:text-white text-xl font-bold">Recent Activity</h2>
             <button className="text-primary text-sm font-bold hover:underline">See All</button>
          </div>
          
          <div className="flex flex-col gap-3">
            {displayTrades.map((trade) => {
                const coin = trade.pair.split('/')[0];
                const isWin = trade.pnl >= 0;
                return (
                    <div key={trade.id} className="group flex items-center justify-between rounded-3xl bg-white dark:bg-[#161521] p-4 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md dark:hover:shadow-[#00F0FF]/5 transition-all active:scale-[0.98]">
                        <div className="flex items-center gap-4">
                            <div className={`size-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-inner ${
                                coin === 'BTC' ? 'bg-[#F7931A]/10 text-[#F7931A]' : 
                                coin === 'ETH' ? 'bg-[#627EEA]/10 text-[#627EEA]' : 
                                coin === 'SOL' ? 'bg-[#14F195]/10 text-[#14F195]' : 'bg-slate-100 dark:bg-white/10 dark:text-white'
                            }`}>
                                {coin.substring(0, 3)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{trade.pair}</h3>
                                <div className="flex items-center gap-2">
                                   <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${trade.type === 'Long' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                     {trade.type}
                                   </span>
                                   <span className="text-xs text-slate-400">{trade.date.split(',')[0]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-base font-bold ${isWin ? 'text-[#00b359] dark:text-[#00FF94]' : 'text-[#FF005C]'}`}>
                                {isWin ? '+' : '-'}${Math.abs(trade.pnl).toFixed(2)}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">
                                {isWin ? 'Win' : 'Loss'}
                            </p>
                        </div>
                    </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, subValue, subColor, icon, color }: any) => (
    <div className="flex flex-col justify-between rounded-[2rem] p-5 bg-white dark:bg-[#161521] border border-slate-100 dark:border-white/5 shadow-sm hover:translate-y-[-2px] transition-transform">
        <div className="flex justify-between items-start mb-4">
            <div className={`size-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center ${color}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-opacity-10 ${subColor.replace('text-', 'bg-')} ${subColor}`}>
                {subValue}
            </span>
        </div>
        <div>
            <p className="text-slate-500 dark:text-white/60 text-xs font-bold uppercase tracking-wide">{label}</p>
            <p className="text-slate-900 dark:text-white text-2xl font-bold mt-1">{value}</p>
        </div>
    </div>
);