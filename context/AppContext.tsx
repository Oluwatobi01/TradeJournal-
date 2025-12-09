import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trade, AnalyticsData, UserProfile, AppContextType } from '../types';

// Mock Initial Data
const INITIAL_TRADES: Trade[] = [
  { 
    id: '1', 
    pair: 'BTC/USDT', 
    type: 'Long', 
    assetType: 'Crypto',
    date: 'Oct 26, 9:41 PM', 
    pnl: 150.75, 
    pnlPercent: 5.2, 
    risk: 1, 
    mood: 'Confident', 
    status: 'Win', 
    notes: 'Good entry based on RSI divergence.' 
  },
  { 
    id: '2', 
    pair: 'ETH/USD', 
    type: 'Short', 
    assetType: 'Crypto',
    date: 'Oct 25, 11:15 AM', 
    pnl: -88.20, 
    pnlPercent: -2.1, 
    risk: 1.5, 
    mood: 'Anxious', 
    status: 'Loss', 
    notes: 'Entry was a bit late, consider waiting for confirmation.' 
  },
  { 
    id: '3', 
    pair: 'SOL/USDT', 
    type: 'Long', 
    assetType: 'Crypto',
    date: 'Oct 24, 3:30 PM', 
    pnl: 210.45, 
    pnlPercent: 8.5, 
    risk: 0.8, 
    mood: 'Focused', 
    status: 'Win', 
    notes: 'Excellent risk management on this trade.' 
  },
  { 
    id: '4', 
    pair: 'EUR/USD', 
    type: 'Short', 
    assetType: 'Forex',
    date: 'Oct 23, 2:10 PM', 
    pnl: 120.00, 
    pnlPercent: 0.5, 
    risk: 1.0, 
    mood: 'Focused', 
    status: 'Win', 
    notes: 'Classic trend follow.' 
  },
  { 
    id: '5', 
    pair: 'TSLA', 
    type: 'Long', 
    assetType: 'Stocks',
    date: 'Oct 22, 10:00 AM', 
    pnl: -45.50, 
    pnlPercent: -1.2, 
    risk: 1.0, 
    mood: 'Greedy', 
    status: 'Loss', 
    notes: 'Chased the pump.' 
  },
];

// Helper to generate a wavy chart line from data or random noise for demo
const generateChartData = (currentTrades: Trade[], initialBalance = 1000) => {
  // Sort trades by date (mocking reverse order here as trades are usually new->old)
  const sortedTrades = [...currentTrades].reverse();
  
  let balance = initialBalance;
  const dataPoints = [{ name: 'Start', val: balance }];

  // If we have very few trades, add some noise points to make the chart look "alive"
  if (sortedTrades.length < 10) {
      for(let i=0; i<10; i++) {
        balance += (Math.random() - 0.5) * 50;
        dataPoints.push({ name: `p${i}`, val: balance });
      }
  }

  sortedTrades.forEach((trade, index) => {
    balance += trade.pnl;
    dataPoints.push({ name: `${index}`, val: balance });
  });

  return dataPoints;
};

const INITIAL_ANALYTICS: AnalyticsData = {
  winRate: 68,
  winRateChange: -1,
  netPnl: 1250,
  netPnlChange: 15.2,
  avgRisk: 1.5,
  totalTrades: 42,
  dnaScore: {
    discipline: 90,
    riskMgt: 70,
    emotional: 60,
  },
  mistakes: [
    { label: 'Held Losers', value: 75, color: '#FF00FF' },
    { label: 'FOMO Entry', value: 45, color: '#FF69B4' },
    { label: 'Over-leveraged', value: 20, color: '#8A2BE2' },
  ],
  chartData: generateChartData(INITIAL_TRADES)
};

const INITIAL_USER: UserProfile = {
  username: 'SynthTrader99',
  email: 'synth.trader@email.com',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZZ-SkT6FPVxrYZ9IkMXKicF7xgTd8e4VUWRo5Xq-p9lyeUAHrEI-XupIAhesgW869P6qylv_B7TwBi7-RUWQqOaaAe7AhE8loEy-B7_JlADBQ3BzKieDbOO_7_b5D-Hpy3kM4CTbVUJlUPQduR9KhwEtWC-p0XtWQIfxsabV5D0gib7Uc4-fbePZX9smUUXFwwJ02G0uHSdvXt8UfTYvbEkoCoU0HfSVUClg0pjH9xVDQQ6I7_rPPJBtIAdUM2Q82GcSxAAcdPRys',
  isDarkMode: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trades, setTrades] = useState<Trade[]>(INITIAL_TRADES);
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Apply Theme Effect
  useEffect(() => {
    const html = document.documentElement;
    const metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (user.isDarkMode) {
      html.classList.add('dark');
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#0B0A14");
    } else {
      html.classList.remove('dark');
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#f6f5f8");
    }
  }, [user.isDarkMode]);

  const determineAssetType = (pair: string): 'Crypto' | 'Forex' | 'Stocks' => {
    const p = pair.toUpperCase();
    if (p.includes('BTC') || p.includes('ETH') || p.includes('SOL') || p.includes('DOGE') || p.includes('USDT')) return 'Crypto';
    if (p.includes('/') && (p.includes('USD') || p.includes('EUR') || p.includes('JPY'))) return 'Forex';
    return 'Stocks';
  };

  const recalculateAnalytics = (currentTrades: Trade[]) => {
    const total = currentTrades.length + 37; // Mock base count
    const wins = currentTrades.filter(t => t.status === 'Win').length + 25; // Mock base wins
    const winRate = Math.round((wins / total) * 100);
    const netPnl = currentTrades.reduce((acc, t) => acc + t.pnl, 902.5); // Base PnL to align with UI mockup roughly
    
    setAnalytics(prev => ({
      ...prev,
      winRate,
      netPnl: parseFloat(netPnl.toFixed(2)),
      totalTrades: total,
      chartData: generateChartData(currentTrades, 902.5),
    }));
  };

  const addTrade = (tradeData: Omit<Trade, 'id' | 'status' | 'pnl' | 'pnlPercent' | 'date' | 'assetType'> & { entryPrice: number; exitPrice: number; size: number }) => {
    const isLong = tradeData.type === 'Long';
    const priceDiff = tradeData.exitPrice - tradeData.entryPrice;
    
    // Simple PnL Calc: (Price Diff) * Size * Direction
    const directionMultiplier = isLong ? 1 : -1;
    const pnl = priceDiff * tradeData.size * directionMultiplier;
    const pnlPercent = (priceDiff / tradeData.entryPrice) * 100 * directionMultiplier;
    
    const newTrade: Trade = {
      id: Date.now().toString(),
      pair: tradeData.pair,
      type: tradeData.type,
      assetType: determineAssetType(tradeData.pair),
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
      pnl: parseFloat(pnl.toFixed(2)),
      pnlPercent: parseFloat(pnlPercent.toFixed(2)),
      risk: tradeData.risk,
      mood: tradeData.mood,
      notes: tradeData.notes,
      status: pnl >= 0 ? 'Win' : 'Loss',
    };

    const updatedTrades = [newTrade, ...trades];
    setTrades(updatedTrades);
    recalculateAnalytics(updatedTrades);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => {
    setUser(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  return (
    <AppContext.Provider value={{ trades, analytics, user, addTrade, updateUser, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};