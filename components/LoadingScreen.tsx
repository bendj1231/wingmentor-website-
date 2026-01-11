
import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { EpauletBars } from './EpauletBars';

interface LoadingScreenProps {
  showBars?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ showBars = false }) => {
  const { config } = useConfig();
  const STARTUP_LOGO = "https://lh3.googleusercontent.com/d/1U7pwMY1-ZsvNYC0Np3fVw5OhW3rTD5DR";

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center overflow-hidden">
      <style>
        {`
          @keyframes logo-sequence {
            0% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
            15% { transform: scale(1); opacity: 1; filter: blur(0px); }
            85% { transform: scale(1.1); opacity: 1; filter: blur(0px); }
            100% { transform: scale(1.1); opacity: 0; filter: blur(0px); }
          }
          
          @keyframes bars-sequence {
            0% { opacity: 0; transform: translateY(10px); filter: blur(5px); }
            20% { opacity: 1; transform: translateY(0); filter: blur(0px); }
            75% { opacity: 1; transform: scale(1); filter: blur(0px); }
            100% { opacity: 0; transform: scale(1); filter: blur(0px); }
          }

          @keyframes shimmer-line {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .logo-anim {
            /* Total duration matches App.tsx loading sequence (approx 6s) */
            /* Adjusted to sync exit with bars around 5s mark */
            animation: logo-sequence 5.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }

          .bars-anim {
            /* Duration matches the 'LOADING' stage (approx 3.5s) */
            /* Adjusted to sync exit with logo */
            animation: bars-sequence 3.3s ease-in-out forwards;
          }
        `}
      </style>

      <div className="relative mb-12 flex flex-col items-center">
        <div className="relative z-10 logo-anim">
          <img 
              src={STARTUP_LOGO} 
              alt="WingMentor Startup Logo" 
              className="w-[280px] md:w-[420px] h-auto object-contain"
          />
        </div>
      </div>

      <div className={`flex flex-col items-center space-y-6 ${showBars ? 'bars-anim' : 'opacity-0'}`}>
        {showBars && (
          <>
            <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-center font-sans">
                <span className="text-black">APPS </span>
                <span className="text-red-600">FOR PILOTS </span>
                <span className="text-black">MADE </span>
                <span className="text-blue-600">BY PILOTS</span>
            </div>

            <div className="scale-90 opacity-80">
                <EpauletBars count={4} size="large" animated={true} />
            </div>
            
            <div className="text-center px-6 w-48">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Initializing</span>
                </div>
                <div className="h-[2px] w-full bg-zinc-100 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" style={{ animation: 'shimmer-line 1.5s infinite linear' }}></div>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
