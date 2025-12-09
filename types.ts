
export interface Trade {
  id: string;
  pair: string;
  type: 'Long' | 'Short';
  assetType: 'Forex' | 'Crypto' | 'Stocks';
  date: string;
  pnl: number;
  pnlPercent: number;
  risk: number; // in R multiples or percentage
  mood: 'Confident' | 'Anxious' | 'Focused' | 'Greedy' | 'Fearful';
  notes: string;
  status: 'Win' | 'Loss';
}

export interface AiInsight {
  summary: string;
  pattern: string;
  emotionalInsight: string;
  coachingTip: string;
  performanceHighlight: string;
}

export interface AnalyticsData {
  winRate: number;
  winRateChange: number;
  netPnl: number;
  netPnlChange: number;
  avgRisk: number;
  totalTrades: number;
  dnaScore: {
    discipline: number;
    riskMgt: number;
    emotional: number;
  };
  mistakes: {
    label: string;
    value: number;
    color: string;
  }[];
  chartData: { name: string; val: number }[];
}

export interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
  isDarkMode: boolean;
}

export interface AppContextType {
  trades: Trade[];
  analytics: AnalyticsData;
  user: UserProfile;
  addTrade: (trade: Omit<Trade, 'id' | 'status' | 'pnl' | 'pnlPercent' | 'date' | 'assetType'> & { entryPrice: number; exitPrice: number; size: number }) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  toggleDarkMode: () => void;
}

export enum Tab {
  Dashboard = 'dashboard',
  Journal = 'journal',
  Analytics = 'analytics',
  Profile = 'profile',
  LogTrade = 'log_trade',
  ShareSnapshot = 'share_snapshot',
  AccountSettings = 'account_settings',
  Privacy = 'privacy',
  Notifications = 'notifications',
  Help = 'help',
}
