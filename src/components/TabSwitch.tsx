import React from "react";
import svgPaths from "../imports/svg-401s87trfk";

interface TabSwitchProps {
  activePage: 'money' | 'play' | 'inbox' | 'history';
  setActivePage: (page: 'money' | 'play' | 'inbox' | 'history') => void;
}

export function TabSwitch({ activePage, setActivePage }: TabSwitchProps) {
  return (
    <nav className="flex-shrink-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl sticky bottom-0 z-50">
      <div className="max-w-[1024rem] mx-auto flex justify-around items-center py-[6rem]">
        {/* Money */}
        <button 
          onClick={() => setActivePage('money')}
          className={`flex flex-col items-center gap-[2rem] transition-colors px-[24rem] py-[4rem] ${
            activePage === 'money' ? 'text-black' : 'text-black/65 hover:text-black'
          }`}
        >
          <svg className="w-[27rem] h-[27rem]" viewBox="0 0 27 27" fill="none">
            <rect fill="transparent" height="27" width="27" />
            <path 
              d={svgPaths.p1bf39e00} 
              fill="currentColor" 
              fillOpacity={activePage === 'money' ? '1' : '0.65'} 
            />
          </svg>
          <span style={{ fontSize: '16rem', fontWeight: 400 }}>Money</span>
        </button>

        {/* Play */}
        <button 
          onClick={() => setActivePage('play')}
          className={`flex flex-col items-center gap-[2rem] transition-colors px-[24rem] py-[4rem] ${
            activePage === 'play' ? 'text-black' : 'text-black/65 hover:text-black'
          }`}
        >
          <svg className="w-[27rem] h-[27rem]" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" fill="currentColor" fillOpacity={activePage === 'play' ? '1' : '0.65'} r="15" />
            <g>
              <path d={svgPaths.p170a5300} stroke="currentColor" strokeOpacity={activePage === 'play' ? '1' : '0.65'} strokeWidth="1.4728" />
              <path d={svgPaths.p12adf040} stroke="currentColor" strokeOpacity={activePage === 'play' ? '1' : '0.65'} strokeWidth="1.26015" />
              <circle cx="20.8592" cy="20.1715" r="2.27122" stroke="currentColor" strokeOpacity={activePage === 'play' ? '1' : '0.65'} strokeWidth="1.18139" />
            </g>
          </svg>
          <span style={{ fontSize: '16rem', fontWeight: 400 }}>Play</span>
        </button>

        {/* Inbox */}
        <button 
          onClick={() => setActivePage('inbox')}
          className={`flex flex-col items-center gap-[2rem] transition-colors px-[24rem] py-[4rem] ${
            activePage === 'inbox' ? 'text-black' : 'text-black/65 hover:text-black'
          }`}
        >
          <svg className="w-[27rem] h-[27rem]" viewBox="0 0 27 27" fill="none">
            <path 
              d={svgPaths.p213e89c0} 
              fill="currentColor" 
              fillOpacity={activePage === 'inbox' ? '1' : '0.65'} 
            />
          </svg>
          <span style={{ fontSize: '16rem', fontWeight: 400 }}>Inbox</span>
        </button>

        {/* History */}
        <button 
          onClick={() => setActivePage('history')}
          className={`flex flex-col items-center gap-[2rem] transition-colors px-[24rem] py-[4rem] ${
            activePage === 'history' ? 'text-black' : 'text-black/65 hover:text-black'
          }`}
        >
          <svg className="w-[27rem] h-[27rem]" viewBox="0 0 27 27" fill="none">
            <path 
              d={svgPaths.p2891d1d0} 
              fill="currentColor" 
              fillOpacity={activePage === 'history' ? '1' : '0.65'} 
            />
          </svg>
          <span style={{ fontSize: '16rem', fontWeight: 400 }}>History</span>
        </button>
      </div>
    </nav>
  );
}