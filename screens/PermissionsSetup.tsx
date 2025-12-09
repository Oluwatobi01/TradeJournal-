
import React, { useState } from 'react';

interface PermissionsSetupProps {
  onFinish: () => void;
}

export const PermissionsSetup: React.FC<PermissionsSetupProps> = ({ onFinish }) => {
  const [brokerState, setBrokerState] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [personalizeState, setPersonalizeState] = useState<'idle' | 'processing' | 'done'>('idle');

  const handleConnectBroker = () => {
    if (brokerState !== 'idle') return;
    setBrokerState('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setBrokerState('connected');
    }, 2000);
  };

  const handlePersonalize = () => {
    if (personalizeState !== 'idle') return;
    setPersonalizeState('processing');
    // Simulate personalization analysis
    setTimeout(() => {
      setPersonalizeState('done');
    }, 1500);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col text-white bg-background-dark font-display">
      {/* Top App Bar */}
      <div className="flex flex-col gap-2 px-4 pb-2 pt-[calc(1rem+env(safe-area-inset-top))]">
        <div className="flex h-12 items-center justify-between">
          <button onClick={onFinish} className="flex h-12 w-12 shrink-0 items-center justify-start text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <p className="tracking-light text-[28px] font-bold leading-tight">Permissions & Setup</p>
      </div>

      {/* Body Text */}
      <p className="text-base font-normal leading-normal px-4 pb-3 pt-1 text-white/70">
        Let's get you set up for smarter trading.
      </p>

      {/* Progress Indicator */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
          <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
          <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
        </div>
        <p className="pt-2 text-sm font-normal text-white/70">Step 3 of 3</p>
      </div>

      {/* List Items Container */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 px-4 py-2">
          
          {/* List Item 1: Push Notifications */}
          <div className="flex min-h-[72px] items-center justify-between gap-4 rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-3xl">notifications</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium leading-normal text-white line-clamp-1">Push Notifications</p>
                <p className="text-sm font-normal leading-normal text-white/70 line-clamp-2">Get trade alerts and AI insights.</p>
              </div>
            </div>
            <div className="shrink-0">
              <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-white/10 p-0.5 has-[:checked]:bg-primary transition-colors">
                <input defaultChecked className="peer sr-only" type="checkbox" />
                <div className="h-full w-[27px] transform rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-[calc(100%-4px)]"></div>
              </label>
            </div>
          </div>

          {/* List Item 2: Connect Brokerage */}
          <div className="flex min-h-[72px] items-center justify-between gap-4 rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-3xl">monitoring</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium leading-normal text-white line-clamp-1">Connect Brokerage</p>
                <p className="text-sm font-normal leading-normal text-white/70 line-clamp-2">
                  {brokerState === 'connected' ? 'Account linked successfully.' : 'Securely link your account.'}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <button 
                onClick={handleConnectBroker}
                disabled={brokerState !== 'idle'}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all border ${
                    brokerState === 'connected' 
                    ? 'bg-[#00FF85]/20 text-[#00FF85] border-[#00FF85]/30' 
                    : brokerState === 'connecting'
                    ? 'bg-white/10 text-white/50 border-white/10 cursor-wait'
                    : 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/30'
                }`}
              >
                {brokerState === 'idle' && 'Connect'}
                {brokerState === 'connecting' && 'Linking...'}
                {brokerState === 'connected' && 'Linked'}
              </button>
            </div>
          </div>

          {/* List Item 3: Personalize Trading Style */}
          <div className="flex min-h-[72px] items-center justify-between gap-4 rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium leading-normal text-white line-clamp-1">Personalize Style</p>
                <p className="text-sm font-normal leading-normal text-white/70 line-clamp-2">
                   {personalizeState === 'done' ? 'AI calibrated to your style.' : 'Tailor AI insights.'}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <button 
                onClick={handlePersonalize}
                disabled={personalizeState !== 'idle'}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all border ${
                    personalizeState === 'done' 
                    ? 'bg-[#00FF85]/20 text-[#00FF85] border-[#00FF85]/30' 
                    : personalizeState === 'processing'
                    ? 'bg-white/10 text-white/50 border-white/10 cursor-wait'
                    : 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/30'
                }`}
              >
                 {personalizeState === 'idle' && 'Start'}
                 {personalizeState === 'processing' && '...'}
                 {personalizeState === 'done' && 'Done'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer CTA */}
      <div className="sticky bottom-0 bg-background-dark p-4 pb-8 pt-4">
        <button 
          onClick={onFinish}
          className="w-full rounded-full bg-primary py-4 text-base font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/25"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};
