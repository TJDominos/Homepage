import React from "react";
import "./index.scss";
import svgPaths from "../../imports/svg-401s87trfk";
import { Trophy } from "lucide-react";

interface TabSwitchProps {
  activePage: 'money' | 'play' | 'rank' | 'history' | string;
  setActivePage: (page: 'money' | 'play' | 'rank' | 'history' | string) => void;
}

const TabSwitch = ({ activePage, setActivePage }: TabSwitchProps) => {
  return (
    <div 
      className="tab-switch-page-v2-bottom fixed bottom-0 left-0 w-full flex justify-center items-center"
      style={{ zIndex: 100 }}
    >
      <div className="tab-switch-page-v2-bottom-box">
        <div className="tab-switch-page-v2-bottom-box-container max-w-full mx-auto">
          <button
            onClick={() => setActivePage("money")}
            className={activePage === "money" ? "nav-link active" : "nav-link"}
          >
            <div className="tab-icon money">
              <svg className="w-full h-full" viewBox="0 0 27 27" fill="none">
                <rect fill="transparent" height="27" width="27" />
                <path 
                  d={svgPaths.p1bf39e00} 
                  fill="currentColor" 
                  fillOpacity={activePage === 'money' ? '1' : '0.65'} 
                />
              </svg>
            </div>
            <div className="label">Money</div>
          </button>
          
          <button
            onClick={() => setActivePage("play")}
            className={activePage === "play" ? "nav-link active" : "nav-link"}
          >
            <div className="tab-icon play">
              <svg className="w-full h-full" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" fill={activePage === 'play' ? "currentColor" : "none"} r="15" />
                <circle cx="15" cy="15" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1" fill="none" style={{ display: activePage === 'play' ? 'none' : 'block' }} r="14.5" />
                <g>
                  <path d={svgPaths.p170a5300} stroke={activePage === 'play' ? "#fff" : "currentColor"} strokeOpacity={activePage === 'play' ? '1' : '0.65'} strokeWidth="1.4728" />
                  <path d={svgPaths.p12adf040} stroke={activePage === 'play' ? "#fff" : "currentColor"} strokeOpacity={activePage === 'play' ? '1' : '0.65'} strokeWidth="1.26015" />
                  <circle cx="20.8592" cy="20.1715" r="2.27122" stroke={activePage === 'play' ? "#fff" : "currentColor"} strokeOpacity={activePage === 'play' ? '1' : '0.65'} strokeWidth="1.18139" />
                </g>
              </svg>
            </div>
            <div className="label">Play</div>
          </button>
          
          <button
            onClick={() => setActivePage("rank")}
            className={activePage === "rank" ? "nav-link active" : "nav-link"}
          >
            <div className={`tab-icon rank flex items-center justify-center ${activePage === 'rank' ? 'text-[#333]' : 'text-black/65'}`}>
              <Trophy size={activePage === 'rank' ? 26 : 24} strokeWidth={activePage === 'rank' ? 2 : 1.5} />
            </div>
            <div className="label">Rank</div>
          </button>
          
          <button
            onClick={() => setActivePage("history")}
            className={activePage === "history" ? "nav-link active" : "nav-link"}
          >
            <div className="tab-icon history">
              <svg className="w-full h-full" viewBox="0 0 27 27" fill="none">
                <path 
                  d={svgPaths.p2891d1d0} 
                  fill="currentColor" 
                  fillOpacity={activePage === 'history' ? '1' : '0.65'} 
                />
              </svg>
            </div>
            <div className="label">History</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabSwitch;
