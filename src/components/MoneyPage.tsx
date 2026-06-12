import React from "react";
import { Wallet, LogIn, Gift, Banknote, HelpCircle, ArrowRight, Activity, Star, Shell, ChevronRight, RefreshCw, Settings, Hexagon, Share2 } from "lucide-react";
import "./MoneyPage.css";

interface MoneyPageProps {
  isDesktop: boolean;
  userAccount: string | null;
  onSignInClick: () => void;
}

export function MoneyPage({ isDesktop, userAccount, onSignInClick }: MoneyPageProps) {
  return (
    <div className={`money-page-container ${isDesktop ? "desktop-layout" : ""}`}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#D5D6F7] via-[#E1E2F9] to-[#D3C3FB] border-b border-purple-200/30 shadow-sm">
        <div className="max-w-[1024rem] mx-auto px-[16rem] h-[68rem] flex items-center justify-center relative cursor-default select-none">
          <div className="absolute left-[16rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-[32rem] h-[32rem] bg-purple-100 rounded-full cursor-pointer">
            <Shell className="text-purple-600" size={20} />
          </div>
          <div className="text-[16rem] font-semibold text-black tracking-[-0.64px]" style={{ fontFamily: "inherit" }}>
            Money
          </div>
        </div>
      </div>

      <div className="money-content-wrapper max-w-[896rem] mx-auto px-[16rem] w-full pb-[40rem] pt-[75rem] z-20 relative">
        {/* User Info Bar */}
        <div className="w-full px-[8rem] flex justify-between items-center gap-[16rem] pb-[20rem]">
          <div className="flex items-center flex-1">
            {userAccount ? (
              <>
                <div className="relative w-[53rem] h-[53rem] mr-[14rem] rounded-full overflow-hidden border-2 border-black/10 shrink-0 cursor-pointer bg-red-400">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TJ" alt="avatar" className="w-full h-full object-cover bg-[#9c27b0]" />
                  <div className="absolute bottom-[-2rem] right-[-2rem] w-[18rem] h-[18rem] border-2 border-white rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-[8rem]">
                  <span className="font-[600] text-[16rem] text-slate-800">TJ</span>
                  <div className="flex items-center text-[#9c27b0] pl-[6rem] pr-[10rem] py-[4rem] rounded-[12rem] line-height-1" style={{ background: "linear-gradient(90deg, rgba(156, 39, 176, 0.2) 0%, rgba(156, 39, 176, 0.05) 100%)" }}>
                    <div className="w-[18rem] h-[18rem] bg-[#9c27b0] text-white flex items-center justify-center rounded-[6rem] mr-[4rem]">
                      <span className="font-bold text-[11rem]">S</span>
                    </div>
                    <span className="text-[12rem] font-medium">Staker</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div 
                  className="w-[53rem] h-[53rem] mr-[14rem] bg-black/5 rounded-full flex justify-center items-center cursor-pointer overflow-hidden shrink-0" 
                  onClick={onSignInClick}
                >
                  <div className="w-[26rem] h-[26rem] border-2 border-black/20 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="w-[12rem] h-[12rem] bg-black/20 rounded-full mb-[10rem]"></div>
                    <div className="absolute bottom-[-6rem] w-[20rem] h-[12rem] bg-black/20 rounded-[10rem]"></div>
                  </div>
                </div>
                <button
                  className="community-btn"
                  onClick={onSignInClick}
                >
                  <Wallet size={16} /> Sign In
                </button>
              </>
            )}
          </div>
          {userAccount && (
            <button className="flex items-center justify-center w-[36rem] h-[36rem] shrink-0">
              <Hexagon className="w-[26rem] h-[26rem] text-slate-800" strokeWidth={2} />
              <div className="absolute w-[6rem] h-[6rem] bg-slate-800 rounded-full"></div>
            </button>
          )}
        </div>

        {/* Balances Row */}
        <div className="flex items-center justify-between px-[8rem] mb-[24rem]">
          {/* Balance */}
          <div className="flex flex-col flex-1 items-center cursor-pointer" onClick={onSignInClick}>
            <div className="flex items-center gap-[4rem] mb-[8rem]">
              <span className="text-[18rem] font-medium text-[#111] font-mono leading-none tracking-tight">
                {userAccount ? "≈ $-40.13" : "-"}
              </span>
              <ChevronRight className="w-[16rem] h-[16rem] text-slate-800" strokeWidth={2.5} />
            </div>
            <span className="text-[14rem] text-slate-600 font-medium">Balance</span>
          </div>

          {/* Gcoin */}
          <div className="flex flex-col flex-1 items-center cursor-pointer" onClick={onSignInClick}>
            <div className="flex items-center gap-[4rem] mb-[8rem]">
              <span className="text-[18rem] font-medium text-[#111] font-mono leading-none tracking-tight">
                {userAccount ? "0.97" : "-"}
              </span>
              <ChevronRight className="w-[16rem] h-[16rem] text-slate-800" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-[4rem]">
              <span className="text-[14rem] text-slate-600 font-medium">Gcoin</span>
              <RefreshCw className="w-[12rem] h-[12rem] text-indigo-400" />
            </div>
          </div>

          {/* Bonus */}
          <div className="flex flex-col flex-1 items-center cursor-pointer" onClick={onSignInClick}>
            <div className="flex items-center gap-[4rem] mb-[8rem]">
              <span className="text-[18rem] font-medium text-[#111] font-mono leading-none tracking-tight">
                {userAccount ? "0.00" : "-"}
              </span>
              <ChevronRight className="w-[16rem] h-[16rem] text-slate-800" strokeWidth={2.5} />
            </div>
            <span className="text-[14rem] text-slate-600 font-medium">Bonus</span>
          </div>
        </div>

        <div className={`money-cards-grid ${isDesktop ? 'grid grid-cols-2 gap-[24rem]' : 'flex flex-col gap-[10rem]'}`}>
          
          {/* Main Actions Card */}
          <div className="bg-white rounded-[20rem] border border-black/10 shadow-[0_4rem_12rem_0_rgba(0,0,0,0.1)] w-full max-w-full flex-col justify-between font-sans flex mx-auto relative overflow-hidden group" style={{ minHeight: "143rem", padding: "14rem 18rem 12rem" }}>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="grid grid-cols-4 gap-[12rem] px-[3rem] pb-[10rem]">
                <button className="flex flex-col items-center gap-[7rem] bg-transparent border-none p-0 cursor-pointer text-black" onClick={onSignInClick}>
                  <div className="w-[50rem] h-[50rem] rounded-[25rem] bg-[#e3deee] flex items-center justify-center transition-colors">
                    {/* User can map imported icons here */}
                    <img src="/deposit.png" alt="Deposit" className="w-[20rem] h-[20rem] object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <span className="text-[12rem] font-semibold leading-[1.2] whitespace-nowrap text-center">Deposit</span>
                </button>
                <button className="flex flex-col items-center gap-[7rem] bg-transparent border-none p-0 cursor-pointer text-black" onClick={onSignInClick}>
                  <div className="w-[50rem] h-[50rem] rounded-[25rem] bg-[#e3deee] flex items-center justify-center transition-colors">
                    <img src="/withdraw.png" alt="Withdraw" className="w-[20rem] h-[20rem] object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <span className="text-[12rem] font-semibold leading-[1.2] whitespace-nowrap text-center">Withdraw</span>
                </button>
                <button className="flex flex-col items-center gap-[7rem] bg-transparent border-none p-0 cursor-pointer text-black" onClick={onSignInClick}>
                  <div className="w-[50rem] h-[50rem] rounded-[25rem] bg-[#e3deee] flex items-center justify-center transition-colors">
                    <img src="/record.png" alt="Record" className="w-[20rem] h-[20rem] object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <span className="text-[12rem] font-semibold leading-[1.2] whitespace-nowrap text-center">Record</span>
                </button>
                <button className="flex flex-col items-center gap-[7rem] bg-transparent border-none p-0 cursor-pointer text-black" onClick={onSignInClick}>
                  <div className="w-[50rem] h-[50rem] rounded-[25rem] bg-[#e3deee] flex items-center justify-center transition-colors">
                    <img src="/get_bonus.png" alt="Get Bonus" className="w-[20rem] h-[20rem] object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <span className="text-[12rem] font-semibold leading-[1.2] whitespace-nowrap text-center">Get Bonus</span>
                </button>
              </div>

              {/* Get Invite Rewards */}
              <button className="flex items-center justify-between mt-[6rem] pt-[11rem] px-[2rem] border-t border-black/10 cursor-pointer w-full bg-transparent pb-0" onClick={onSignInClick}>
                <div className="flex items-center gap-[12rem] min-w-0">
                  <Share2 className="w-[24rem] h-[24rem] flex-shrink-0 text-[#6A3FE6]" strokeWidth={2.5} />
                  <span className="text-[14rem] font-bold text-black leading-[1.2]">Get Invite Rewards</span>
                </div>
                <div className="inline-flex items-center gap-[4rem] text-black/65 text-[12rem] font-normal leading-[1.2] whitespace-nowrap">
                  Invite Now
                  <ChevronRight className="w-[12rem] h-[12rem] flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>

          {/* Marketing Widget */}
          <div className="money-card bg-gradient-to-r from-blue-500 to-purple-600 rounded-[24rem] p-[24rem] text-white shadow-md relative overflow-hidden flex flex-col justify-center cursor-pointer transform hover:scale-[1.02] transition-transform">
            <div className="relative z-10">
              <h3 className="text-[20rem] font-bold mb-[8rem]">Exclusive Airdrop</h3>
              <p className="text-white/80 text-[14rem] mb-[16rem]">Complete tasks to earn WL tokens before the launch!</p>
              <div className="inline-flex items-center text-[14rem] font-semibold text-white bg-white/20 px-[16rem] py-[8rem] rounded-[999rem] backdrop-blur-sm">
                View More <ArrowRight className="w-[16rem] h-[16rem] ml-[4rem]" />
              </div>
            </div>
          </div>

          {/* Staking Card */}
          <div className="money-card bg-white rounded-[24rem] p-[20rem] shadow-sm border border-slate-100 font-sans">
            <div className="flex justify-between items-center mb-[16rem]">
              <h3 className="font-bold text-[18rem] text-slate-800">Staking Pool</h3>
              <span className="text-purple-600 text-[14rem] font-medium cursor-pointer hover:underline">View More &gt;</span>
            </div>
            <div className="space-y-[12rem] mb-[20rem]">
              <div className="flex justify-between items-center text-[14rem]">
                <span className="text-slate-500">Total Staked</span>
                <span className="font-semibold text-[14rem]">324.5 ICP</span>
              </div>
              <div className="flex justify-between items-center text-[14rem]">
                <span className="text-slate-500">Stakers</span>
                <span className="font-semibold text-[14rem]">1,248</span>
              </div>
              <div className="flex justify-between items-center text-[14rem]">
                <span className="text-slate-500 bg-green-50 text-green-700 px-[8rem] py-[2rem] rounded-[4rem] font-medium">Reward Yield (APR)</span>
                <span className="font-bold text-green-600 text-[14rem]">8.5% ~ 12.0%</span>
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white rounded-[16rem] py-[12rem] font-semibold text-[14rem] hover:bg-slate-800 transition-colors" onClick={onSignInClick}>
              Start Staking
            </button>
          </div>

          {/* Point Card */}
          <div className="money-card bg-[#fffdf0] rounded-[24rem] p-[20rem] shadow-sm border border-[#f0e6b6] font-sans">
            <div className="flex justify-between items-start mb-[16rem] border-b border-[#f0e6b6] pb-[12rem]">
              <div>
                <h3 className="font-bold text-[18rem] text-slate-800 mb-[4rem] flex items-center gap-[4rem]">
                  <Star className="w-[16rem] h-[16rem] text-orange-500 fill-orange-500" /> WL Point
                </h3>
                <div className="text-[24rem] font-bold font-mono text-orange-600">
                  {userAccount ? "450" : "-"}
                </div>
              </div>
              <button className="bg-orange-500 text-white px-[16rem] py-[6rem] rounded-[999rem] text-[14rem] font-semibold hover:bg-orange-600 shadow-sm" onClick={onSignInClick}>
                Redeem
              </button>
            </div>
            <div className="space-y-[16rem]">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-[14rem] text-slate-800 leading-tight">Daily Login</h4>
                  <p className="text-[12rem] text-slate-500 mt-[2rem]">Log in everyday to get points</p>
                </div>
                <button className="bg-white border border-slate-200 text-slate-700 px-[12rem] py-[6rem] rounded-[12rem] text-[12rem] font-semibold shadow-sm" onClick={onSignInClick}>
                  {userAccount ? "Claimed" : "Get Points"}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-[14rem] text-slate-800 leading-tight">First Deposit</h4>
                  <p className="text-[12rem] text-slate-500 mt-[2rem]">Deposit at least 1 ICP</p>
                </div>
                <button className="bg-slate-900 text-white px-[12rem] py-[6rem] rounded-[12rem] text-[12rem] font-semibold shadow-sm" onClick={onSignInClick}>
                  Get Points
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
