import React, { useState } from "react";
import { Wallet, LogIn, Gift, Banknote, HelpCircle, ArrowRight, Activity, Star, Shell, ChevronRight, RefreshCw, Settings, Hexagon, Share2, User, X, ChevronDown, Copy } from "lucide-react";
import { getSysAvatar } from "../utils/avatar";
import "./MoneyPage.css";

interface MoneyPageProps {
  isDesktop: boolean;
  userAccount: string | null;
  onSignInClick: () => void;
  onAccountClick?: () => void;
}

export function MoneyPage({ 
  isDesktop, 
  userAccount, 
  onSignInClick,
  onAccountClick
}: MoneyPageProps) {
  const [activeModal, setActiveModal] = useState<'balance' | 'gcoin' | 'bonus' | null>(null);

  const handleModalOpen = (modal: 'balance' | 'gcoin' | 'bonus') => {
    if (!userAccount) {
      onSignInClick();
    } else {
      setActiveModal(modal);
    }
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className={`money-page-container ${isDesktop ? "desktop-layout" : ""}`}>
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#D5D6F7] via-[#E1E2F9] to-[#D3C3FB] border-b border-purple-200/30 shadow-sm ${isDesktop ? 'hidden' : ''}`}>
        <div className="max-w-[1024px] mx-auto px-[16rem] h-[68rem] flex items-center justify-center relative cursor-default select-none">
          <div className="absolute left-[16rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-[32rem] h-[32rem] bg-purple-100 rounded-full cursor-pointer">
            <Shell className="text-purple-600" size={20} />
          </div>
          <div className="text-[16rem] font-semibold text-black tracking-[-0.64px]" style={{ fontFamily: "inherit" }}>
            Money
          </div>
        </div>
      </div>

      <div className={`money-content-wrapper max-w-[896rem] mx-auto px-[16rem] w-full pb-[40rem] z-20 relative ${isDesktop ? 'pt-[8rem]' : 'pt-[88rem]'}`}>
        {/* User Info Bar */}
        <div className="w-full px-[8rem] flex justify-between items-center gap-[16rem] pb-[20rem]">
          <div className="flex items-center flex-1">
            {userAccount ? (
              <>
                <div onClick={onAccountClick} className="account-toggle-button relative w-[60rem] h-[60rem] mr-[14rem] rounded-full overflow-hidden border-2 border-black/10 shrink-0 cursor-pointer bg-white flex items-center justify-center text-slate-500">
                  <img src={getSysAvatar("01")} alt="avatar" className="w-full h-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-[#f0f2f5] text-slate-500"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>';
                  }}/>
                  <div className="absolute bottom-[-2px] right-[-2px] w-[18rem] h-[18rem] border-2 border-white rounded-full bg-yellow-400 flex items-center justify-center z-10">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-[8rem]">
                  <span className="font-[600] text-[16rem] text-slate-800">{userAccount ? userAccount.substring(0, 6) : "User"}</span>
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
                    <div className="absolute bottom-[-6px] w-[20rem] h-[12rem] bg-black/20 rounded-[10rem]"></div>
                  </div>
                </div>
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
          <div className="flex flex-col flex-1 items-center cursor-pointer" onClick={() => handleModalOpen('balance')}>
            <div className="flex items-center gap-[4rem] mb-[8rem]">
              <span className="text-[18rem] font-medium text-[#111] font-mono leading-none tracking-tight">
                {userAccount ? "≈ $-40.13" : "-"}
              </span>
              <ChevronRight className="w-[16rem] h-[16rem] text-slate-800" strokeWidth={2.5} />
            </div>
            <span className="text-[14rem] text-slate-600 font-medium">Balance</span>
          </div>

          {/* Gcoin */}
          <div className="flex flex-col flex-1 items-center cursor-pointer" onClick={() => handleModalOpen('gcoin')}>
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
          <div className="flex flex-col flex-1 items-center cursor-pointer" onClick={() => handleModalOpen('bonus')}>
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
          <div className="bg-white rounded-[20rem] border border-black/10 shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] w-full max-w-full flex-col justify-between font-sans flex mx-auto relative overflow-hidden group" style={{ minHeight: "143px", padding: "14px 18px 12px" }}>
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

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          <div className={`relative w-full max-w-[500px] bg-[#EAEAEA] rounded-t-[24rem] sm:rounded-[24rem] overflow-hidden flex flex-col pointer-events-auto transform transition-transform ${isDesktop ? 'h-auto max-h-[90vh]' : 'mt-auto pb-[20rem]'}`}>
            {activeModal === 'bonus' && (
              <div className="px-[24rem] py-[32rem] flex flex-col relative text-center">
                <h2 className="text-[20rem] font-bold text-black mb-[24rem]">Bonus</h2>
                <button onClick={closeModal} className="absolute right-[24rem] top-[24rem] text-black/40 hover:text-black">
                  <X size={20} />
                </button>
                <p className="text-[16rem] text-black/80 leading-relaxed max-w-[400px] mx-auto mb-[40rem]">
                  Bonuses can only be used for play and are non-withdrawable. When playing, bonus is used first, following by your ballance.
                </p>
                <div className="flex items-center gap-[16rem]">
                  <button className="flex-1 py-[16rem] rounded-[24rem] border-[1.5px] border-black text-black font-semibold text-[16rem] hover:bg-black/5 transition-colors">
                    Get Bonus
                  </button>
                  <button className="flex-1 py-[16rem] rounded-[24rem] border-[1.5px] border-black text-black font-semibold text-[16rem] hover:bg-black/5 transition-colors">
                    Go to Play
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'gcoin' && (
              <div className="px-[24rem] py-[32rem] flex flex-col relative text-center">
                <h2 className="text-[20rem] font-bold text-black mb-[16rem]">Deposit</h2>
                <button onClick={closeModal} className="absolute right-[24rem] top-[24rem] text-black/40 hover:text-black">
                  <X size={20} />
                </button>
                <div className="flex items-center justify-center gap-[16rem] text-black/40 text-[14rem] mb-[24rem]">
                  <span className="flex items-center gap-[4rem]"><RefreshCw size={14} /> Gcoin: 0.97</span>
                  <span>1 USDC = 10 Gcoin</span>
                </div>
                
                <div className="flex items-center gap-[12rem] justify-center mb-[24rem]">
                  <button className="flex items-center justify-between px-[16rem] py-[12rem] bg-black/5 rounded-[24rem] text-[16rem] text-black font-medium w-[140rem]">
                    <span className="flex items-center gap-[8rem]">
                      <div className="w-[20rem] h-[20rem] rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[10rem] font-bold">$</div>
                      USDC
                    </span>
                    <ChevronDown size={16} className="text-black/40" />
                  </button>
                  <button className="flex items-center justify-between px-[16rem] py-[12rem] bg-black/5 rounded-[24rem] text-[16rem] text-black font-medium w-[160rem]">
                    <span className="flex items-center gap-[8rem]">
                      <div className="w-[20rem] h-[20rem] rounded-full overflow-hidden flex items-center justify-center bg-transparent"><img src="/solana-logo.png" alt="SOL" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-black"></div>'; }} className="w-[20rem] h-[20rem] object-contain"/></div>
                      SOLANA
                    </span>
                    <ChevronDown size={16} className="text-black/40" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-[8rem] text-[18rem] mb-[24rem]">
                  <span className="text-black">Your Address:</span>
                  <span className="text-[#6A3FE6] font-medium">FfTfJ...sjCHD</span>
                  <button className="text-[#6A3FE6] hover:opacity-80">
                    <Copy size={20} />
                  </button>
                </div>

                <div className="flex justify-center mb-[24rem]">
                  <div className="w-[120rem] h-[120rem] bg-white rounded-lg flex items-center justify-center p-[4rem]">
                    {/* Placeholder QR Code */}
                    <div className="w-[110rem] h-[110rem] bg-black" style={{ maskImage: "url('data:image/svg+xml;utf8,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3 3H9V9H3V3ZM5 5H7V7H5V5ZM15 3H21V9H15V3ZM17 5H19V7H17V5ZM3 15H9V21H3V15ZM5 17H7V19H5V17ZM11 3H13V5H11V3ZM11 7H13V9H11V7ZM13 5H15V7H13V5ZM15 11H21V13H15V11ZM11 11H13V15H11V11ZM3 11H9V13H3V11ZM13 15H15V21H13V15ZM15 15H17V17H15V15ZM21 15H17V17H19V21H21V15Z\" fill=\"black\"/></svg>')", WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3 3H9V9H3V3ZM5 5H7V7H5V5ZM15 3H21V9H15V3ZM17 5H19V7H17V5ZM3 15H9V21H3V15ZM5 17H7V19H5V17ZM11 3H13V5H11V3ZM11 7H13V9H11V7ZM13 5H15V7H13V5ZM15 11H21V13H15V11ZM11 11H13V15H11V11ZM3 11H9V13H3V11ZM13 15H15V21H13V15ZM15 15H17V17H15V15ZM21 15H17V17H19V21H21V15Z\" fill=\"black\"/></svg>')", maskSize: "cover", WebkitMaskSize: "cover" }}></div>
                  </div>
                </div>

                <p className="text-[12rem] text-black/60 leading-relaxed text-center px-[24rem]">
                  Deposits under $1.00 won't show up until they total $1.00 or more. USDC auto-converts to Gcoin, withdrawable anytime as USDC. Refresh your balance if it seems wrong, or contact <a href="mailto:support@randseed.org" className="text-[#6A3FE6] hover:underline">support@randseed.org</a> for help.
                </p>
              </div>
            )}

            {activeModal === 'balance' && (
              <div className="px-[24rem] py-[32rem] flex flex-col relative text-left min-h-[400px]">
                <h2 className="text-[16rem] font-medium text-black mb-[16rem] text-center">Balance</h2>
                <button onClick={closeModal} className="absolute right-[24rem] top-[24rem] text-black/40 hover:text-black">
                  <X size={20} />
                </button>
                <div className="text-[12rem] text-black/40 border border-black/10 rounded-[12rem] p-[16rem] mb-[24rem] text-center w-full max-w-[360px] mx-auto">
                  Balance is an estimated value based on the current crypto market and doesn't include your bonus and WL Points.
                </div>

                <div className="flex items-center gap-[8rem] mb-[24rem]">
                  <span className="text-[20rem] font-bold text-black">Balance ≈ $-42.80</span>
                  <button className="text-[#6A3FE6] hover:rotate-180 transition-transform"><RefreshCw size={18} /></button>
                </div>

                <div className="flex flex-col gap-[16rem] mb-[40rem] flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8rem] text-[14rem] text-black/60 w-[140rem]">
                      Gcoin <span className="text-[12rem] text-black/40">1 USDC = 10 Gcoin</span>
                    </div>
                    <div className="flex items-center gap-[8rem] font-medium text-[16rem] text-black">
                      <div className="w-[16rem] h-[16rem] rounded-full bg-yellow-400"></div>
                      0.97
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8rem] text-[14rem] text-black/60 w-[140rem]">
                      ICP <span className="text-[12rem] text-black/40">1 USDC = 0.4020 ICP</span>
                    </div>
                    <div className="flex items-center gap-[8rem] font-medium text-[16rem] text-black">
                      <div className="w-[16rem] h-[16rem] rounded-full bg-black/10 flex items-center justify-center font-bold text-black text-[8rem]">∞</div>
                      -17.2467
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8rem] text-[14rem] text-black/60 w-[140rem]">
                      WLT
                    </div>
                    <div className="flex items-center gap-[8rem] font-medium text-[16rem] text-black">
                      <div className="flex gap-[1rem]">
                        <div className="w-[6rem] h-[6rem] bg-blue-500 rounded-full"></div>
                        <div className="w-[6rem] h-[6rem] bg-purple-500 rounded-full"></div>
                        <div className="w-[6rem] h-[6rem] bg-red-500 rounded-full"></div>
                      </div>
                      100.00
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[16rem] mt-auto">
                  <button className="flex-1 py-[16rem] rounded-[24rem] border-[1.5px] border-black text-black font-semibold text-[16rem] hover:bg-black/5 transition-colors">
                    Withdraw
                  </button>
                  <button className="flex-1 py-[16rem] rounded-[24rem] border border-black/10 bg-transparent text-black font-semibold text-[16rem] hover:bg-black/5 transition-colors">
                    Deposit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
