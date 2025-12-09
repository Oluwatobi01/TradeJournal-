import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

interface NavButtonProps {
  item: { id: Tab; icon: string; label: string };
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ item, isActive, onClick }) => {
  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(5);
    onClick();
  }
  
  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 active:scale-90 relative w-14 ${
        isActive ? 'text-primary dark:text-[#00F0FF]' : 'text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/60'
      }`}
    >
      {isActive && (
        <span className="absolute -top-3 size-1 rounded-full bg-primary dark:bg-[#00F0FF] shadow-[0_0_10px_currentColor]"></span>
      )}
      <span className={`material-symbols-outlined text-[26px] transition-all duration-300 ${isActive ? 'filled -translate-y-0.5' : ''}`}>
        {item.icon}
      </span>
      <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'opacity-100' : 'opacity-0 scale-0 h-0'}`}>
        {item.label}
      </span>
    </button>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.Dashboard, icon: 'grid_view', label: 'Home' },
    { id: Tab.Analytics, icon: 'analytics', label: 'Stats' },
    { id: Tab.Journal, icon: 'book', label: 'Journal' },
    { id: Tab.Profile, icon: 'person', label: 'You' },
  ];

  const showAddButton = activeTab === Tab.Dashboard;

  const handleAddClick = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    onTabChange(Tab.LogTrade);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] z-40">
      
      {/* Floating Add Button with Neon Glow */}
      {showAddButton && (
        <div className="relative flex justify-center pointer-events-none z-50">
          <button 
            onClick={handleAddClick} 
            className="pointer-events-auto absolute -top-14 flex size-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-[#7C3AED] shadow-[0_0_30px_rgba(71,37,244,0.6)] hover:shadow-[0_0_40px_rgba(71,37,244,0.8)] hover:scale-110 transition-all duration-300 active:scale-90 border-2 border-white/20 group"
          >
            <span className="material-symbols-outlined text-4xl text-white font-bold group-hover:rotate-90 transition-transform duration-300">add</span>
          </button>
        </div>
      )}

      {/* Glassmorphism Island Nav */}
      <div className="flex h-[72px] items-center justify-around rounded-[2.5rem] border border-white/10 bg-white/80 dark:bg-[#161521]/80 shadow-2xl shadow-black/20 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle shine effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {navItems.map((item, index) => {
          // Spacer logic
          if (index === 2) {
            return (
              <React.Fragment key="spacer">
                {showAddButton && <div className="w-14" />}
                <NavButton 
                  item={item} 
                  isActive={activeTab === item.id} 
                  onClick={() => onTabChange(item.id)} 
                />
              </React.Fragment>
            );
          }
          return (
            <NavButton 
              key={item.id}
              item={item} 
              isActive={activeTab === item.id} 
              onClick={() => onTabChange(item.id)} 
            />
          );
        })}
      </div>
    </div>
  );
};