
import React, { useState, useEffect } from 'react';
import { Welcome } from './screens/Welcome';
import { FeaturesShowcase } from './screens/FeaturesShowcase';
import { PermissionsSetup } from './screens/PermissionsSetup';
import { Dashboard } from './screens/Dashboard';
import { Analytics } from './screens/Analytics';
import { TradeHistory } from './screens/TradeHistory';
import { ShareableSnapshot } from './screens/ShareableSnapshot';
import { TradeLogging } from './screens/TradeLogging';
import { Profile } from './screens/Profile';
import { AccountSettings } from './screens/AccountSettings';
import { PrivacySecurity } from './screens/PrivacySecurity';
import { NotificationsSettings } from './screens/NotificationsSettings';
import { HelpSupport } from './screens/HelpSupport';
import { BottomNav } from './components/BottomNav';
import { Tab } from './types';
import { AppProvider } from './context/AppContext';

type OnboardingStep = 'welcome' | 'features' | 'permissions' | 'complete';

const MainApp: React.FC = () => {
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);

  useEffect(() => {
    const visited = localStorage.getItem('has_visited');
    if (visited) {
      setOnboardingStep('complete');
    }
  }, []);

  const completeOnboarding = () => {
    setOnboardingStep('complete');
    localStorage.setItem('has_visited', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('has_visited');
    setOnboardingStep('welcome');
    setActiveTab(Tab.Dashboard);
  };

  const handleProfileNavigate = (screen: string) => {
      switch(screen) {
          case 'account_settings': setActiveTab(Tab.AccountSettings); break;
          case 'privacy': setActiveTab(Tab.Privacy); break;
          case 'notifications': setActiveTab(Tab.Notifications); break;
          case 'help': setActiveTab(Tab.Help); break;
          default: setActiveTab(Tab.Profile);
      }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return <Dashboard />;
      case Tab.Journal:
        return <TradeHistory />;
      case Tab.Analytics:
        return <Analytics onShare={() => setActiveTab(Tab.ShareSnapshot)} />;
      case Tab.Profile:
        return <Profile onLogout={handleLogout} onBack={() => setActiveTab(Tab.Dashboard)} onNavigate={handleProfileNavigate} />;
      case Tab.LogTrade:
        return <TradeLogging onClose={() => setActiveTab(Tab.Dashboard)} />;
      case Tab.ShareSnapshot:
        return <ShareableSnapshot onClose={() => setActiveTab(Tab.Analytics)} />;
      case Tab.AccountSettings:
        return <AccountSettings onBack={() => setActiveTab(Tab.Profile)} />;
      case Tab.Privacy:
        return <PrivacySecurity onBack={() => setActiveTab(Tab.Profile)} />;
      case Tab.Notifications:
        return <NotificationsSettings onBack={() => setActiveTab(Tab.Profile)} />;
      case Tab.Help:
        return <HelpSupport onBack={() => setActiveTab(Tab.Profile)} />;
      default:
        return <Dashboard />;
    }
  };

  // Onboarding Flow
  if (onboardingStep === 'welcome') {
    return <Welcome onStart={() => setOnboardingStep('features')} />;
  }

  if (onboardingStep === 'features') {
    return <FeaturesShowcase onContinue={() => setOnboardingStep('permissions')} onSkip={completeOnboarding} />;
  }

  if (onboardingStep === 'permissions') {
    return <PermissionsSetup onFinish={completeOnboarding} />;
  }

  // Determine if BottomNav should be visible
  const hideBottomNavTabs = [
      Tab.LogTrade, 
      Tab.ShareSnapshot, 
      Tab.AccountSettings, 
      Tab.Privacy, 
      Tab.Notifications, 
      Tab.Help
  ];
  const showBottomNav = !hideBottomNavTabs.includes(activeTab);

  // Main App
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-[100dvh] text-slate-900 dark:text-white font-display overflow-hidden transition-colors duration-300">
      {renderScreen()}
      
      {/* Conditionally render BottomNav */}
      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
