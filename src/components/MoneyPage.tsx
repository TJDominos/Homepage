import React, { useState } from "react";
import {
  Wallet,
  LogIn,
  Gift,
  Banknote,
  HelpCircle,
  ArrowRight,
  Activity,
  Star,
  Shell,
  ChevronRight,
  RefreshCw,
  Settings,
  Hexagon,
  Share2,
  User,
  X,
  ChevronDown,
  Copy,
  ArrowRightLeft,
  Check,
  Info,
} from "lucide-react";
import { getSysAvatar } from "../utils/avatar";
import { TransactionModals } from "./TransactionModals";
import { WalletMenuBar } from "./WalletMenuBar";
import "./MoneyPage.css";

interface MoneyPageProps {
  isDesktop: boolean;
  userAccount: string | null;
  onSignInClick: () => void;
  onAccountClick?: () => void;
  profile?: any;
}

export function MoneyPage({
  isDesktop,
  userAccount,
  onSignInClick,
  onAccountClick,
  profile,
}: MoneyPageProps) {
  const [activeModal, setActiveModal] = useState<
    "balance" | "deposit" | "withdraw" | "record" | "bonus" | null
  >(null);
  const [activeMenu, setActiveMenu] = useState<
    "rewards" | "bonus" | "deposit" | "withdraw" | "record"
  >("rewards");
  const [modalStep, setModalStep] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  const handleModalOpen = (
    modal: "balance" | "deposit" | "withdraw" | "record" | "bonus",
  ) => {
    if (!userAccount) {
      onSignInClick();
    } else {
      setModalStep(0);
      setSelectedCurrency("");
      setActiveModal(modal);
    }
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div
      className={`money-page-container ${isDesktop ? "desktop-layout" : ""}`}
    >
      <div
        className={`money-content-wrapper max-w-[1024px] mx-auto px-4 w-full pb-4 z-20 relative pt-4`}
      >
        {/* User Info and Balances Row */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center pb-6">
          {/* User Info (Left) */}
          <div className="w-full sm:w-auto flex justify-between items-center pb-6 sm:pb-0">
            <div
              className="flex flex-row items-center gap-3 shrink-0 cursor-pointer"
              onClick={userAccount ? onAccountClick : onSignInClick}
            >
              <div className="relative w-[53px] h-[53px] mr-0 sm:mr-0 rounded-full shrink-0 flex items-center justify-center">
                {!userAccount ? (
                  <div className="w-full h-full rounded-full border-2 border-[#111] bg-[#f4f4f5] flex items-center justify-center overflow-hidden">
                    <User size={26} className="text-slate-400" />
                  </div>
                ) : (
                  <>
                    <img
                      src={getSysAvatar(profile?.avatarCode || "01")}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full border-2 border-[#111]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-[20px] h-[20px] bg-[#FFC107] border-[2px] border-white rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  </>
                )}
              </div>

              {userAccount && (
                <div className="flex flex-col sm:justify-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold sm:font-[600] text-[20px] sm:text-[16px] text-slate-800 leading-tight">
                      {profile?.username || userAccount.substring(0, 6)}
                    </span>
                    {!isDesktop && (
                      <div className="flex items-center bg-gradient-to-r from-[#9370DB]/30 to-transparent pr-3 rounded-r-md">
                        <div
                          className="w-[20px] h-[20px] bg-[#9370DB] text-white flex items-center justify-center text-[11px] font-bold shadow-sm"
                          style={{
                            clipPath:
                              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          }}
                        >
                          S
                        </div>
                        <span className="text-[13px] font-medium text-[#7C3AED] ml-1">
                          Staker
                        </span>
                      </div>
                    )}
                  </div>
                  {isDesktop && (
                    <button
                      className="flex items-center mt-1"
                      onClick={onAccountClick}
                    >
                      <Hexagon
                        className="w-4 h-4 text-slate-600"
                        strokeWidth={1.5}
                        style={{ fill: "transparent" }}
                      />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Settings Icon */}
            {!isDesktop && userAccount && (
              <button
                className="flex items-center justify-center shrink-0 bg-transparent rounded-full ml-2"
                onClick={onAccountClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] h-12 bg-black/10 mx-8 shrink-0"></div>

          {/* Balances (Right) */}
          <div className="flex flex-row items-center justify-between sm:justify-center gap-2 sm:gap-12 flex-1 overflow-x-auto hide-scrollbar px-2 sm:px-0">
            {/* Balance */}
            <div
              className="flex flex-col items-center shrink-0 cursor-pointer"
              onClick={() => handleModalOpen("balance")}
            >
              <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                <span className="text-[18px] font-bold text-[#111] font-mono leading-none tracking-tight">
                  {userAccount ? "≈ $0.00" : "≈ $0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center text-slate-600 font-normal text-[14px]">
                <span>Balance</span>
              </div>
            </div>

            {/* Gcoin */}
            <div
              className="flex flex-col items-center shrink-0 cursor-pointer"
              onClick={() => handleModalOpen("deposit")}
            >
              <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                <span className="text-[18px] font-bold text-[#111] font-mono leading-none tracking-tight">
                  {userAccount ? "123,343.00" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 font-normal text-[14px]">
                <span>Gcoin</span>
                <RefreshCw className="w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] text-purple-400 shrink-0" />
              </div>
            </div>

            {/* Bonus */}
            <div
              className="flex flex-col items-center shrink-0 cursor-pointer"
              onClick={() => handleModalOpen("bonus")}
            >
              <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                <span className="text-[18px] font-bold text-[#111] font-mono leading-none tracking-tight">
                  {userAccount ? "12" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center text-slate-600 font-normal text-[14px]">
                <span>Bonus</span>
              </div>
            </div>

            {/* WLT Amount */}
            <div className="flex flex-col items-center shrink-0 cursor-pointer">
              <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                <span className="text-[18px] font-bold text-[#111] font-mono leading-none tracking-tight">
                  {userAccount ? "0.00" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center text-slate-600 font-normal text-[14px]">
                <span>WLT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Wallet Actions */}
        <WalletMenuBar
          activeTab={activeMenu}
          onTabChange={setActiveMenu as any}
        />

        {activeMenu === "rewards" && (
          <>
            {/* Rewards Title */}
            <div className="flex items-center justify-between mb-3 px-1 mt-2">
              <h2 className="text-[16px] font-[600] text-slate-800">
                Tasks & Rewards
              </h2>
            </div>

            <div
              className={`money-cards-grid ${isDesktop ? "grid grid-cols-2 gap-4 items-start" : "flex flex-col gap-3"}`}
            >
              <div className="flex flex-col gap-3">
                {/* First Deposit Bonus Widget */}
                <div
                  className="bg-[#f0f2f5] rounded-2xl px-4 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm"
                  style={{ height: "64px" }}
                  onClick={onSignInClick}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm relative overflow-hidden">
                      <Gift className="w-[22px] h-[22px] text-blue-500 relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-black leading-tight">
                        First Deposit Bonus
                      </h3>
                      <p className="text-[12px] text-black/50 mt-1 leading-tight">
                        Deposit to get 0.1 ICP bonus
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/5 text-black/50 font-medium">
                    <ChevronRight className="w-4 h-4 ml-[2px]" />
                  </div>
                </div>

                {/* Invite Friends Widget - Mobile Only */}
                {!isDesktop && (
                  <div
                    className="bg-[#f0f2f5] rounded-2xl px-4 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm"
                    style={{ height: "64px" }}
                    onClick={onSignInClick}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm relative overflow-hidden">
                        <Share2
                          className="w-[20px] h-[20px] text-purple-500 relative z-10"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-black leading-tight">
                          Invite Friends
                        </h3>
                        <p className="text-[12px] text-black/50 mt-1 leading-tight">
                          Up to 5% earnings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/5 text-black/50 font-medium">
                      <ChevronRight className="w-4 h-4 ml-[2px]" />
                    </div>
                  </div>
                )}

                {/* WL Point Card */}
                <div className="bg-[#f0f2f5] rounded-3xl p-4 sm:p-5 shadow-sm border border-black/5 font-sans">
                  <div className="flex justify-between items-start mb-5 border-b border-black/5 pb-5">
                    <div>
                      <h3 className="font-semibold text-[15px] text-black mb-3 flex items-center gap-1.5">
                        WL Point <Info className="w-4 h-4 text-slate-400" />
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-[30px] h-[30px] rounded-full bg-[#FFD700] flex items-center justify-center shrink-0">
                          <Star className="w-[18px] h-[18px] text-white fill-white" />
                        </div>
                        <span className="text-[32px] font-bold text-black leading-none font-serif tracking-tight ml-2">
                          {userAccount ? "8" : "0"}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-[80px] h-[28px] border border-[#111] bg-transparent text-[#111] rounded-[14px] flex items-center justify-center text-[12px] font-semibold mt-8 transition-colors hover:bg-black/5"
                      onClick={onSignInClick}
                    >
                      Redeem
                    </button>
                  </div>
                  <div>
                    <div className="flex justify-between items-center px-1">
                      <div>
                        <h4 className="font-semibold text-[15px] text-black leading-tight">
                          Daily Check-in
                        </h4>
                        <p className="text-[13px] text-black/40 mt-1.5">
                          Earn points by clicking the button
                        </p>
                      </div>
                      <button
                        className="w-[80px] h-[28px] bg-[#333] text-white rounded-[14px] flex items-center justify-center text-[12px] font-semibold"
                        onClick={onSignInClick}
                      >
                        {userAccount ? "Claimed" : "Get Points"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Display only on Desktop */}
              {isDesktop && (
                <div className="flex flex-col gap-4">
                  {!userAccount ? (
                    <div
                      className="bg-[#f0f2f5] rounded-2xl px-4 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm"
                      style={{ height: "64px" }}
                      onClick={onSignInClick}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm relative overflow-hidden">
                          <Share2
                            className="w-[20px] h-[20px] text-purple-500 relative z-10"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-black leading-tight">
                            Invite Friends
                          </h3>
                          <p className="text-[12px] text-black/50 mt-1 leading-tight">
                            Up to 5% earnings
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/5 text-black/50 font-medium">
                        <ChevronRight className="w-4 h-4 ml-[2px]" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#f0f2f5] rounded-2xl p-6 border border-black/5 relative overflow-hidden flex flex-col h-full min-h-[380px]">
                      <h2 className="text-[20px] font-bold text-black mb-4">
                        Invite Friends
                      </h2>

                      <div className="mb-6 flex-1">
                        <p className="text-[14px] text-black/70 mb-4 font-medium leading-relaxed">
                          New User gets $WLT Airdrop and Free Gcoins
                          <br />
                          Inviter gets up to 5% earnings from every friend's
                          spending
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-black/5 shadow-sm">
                            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-2">
                              <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
                            </div>
                            <span className="text-[13px] font-bold">
                              Gcoin Bonus
                            </span>
                          </div>
                          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-black/5 shadow-sm">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                              <div className="w-6 h-6 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-[13px] font-bold">
                              $WLT Airdrop
                            </span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl p-5 flex items-center justify-between mb-8">
                          <span className="text-[14px] font-bold text-purple-900 w-1/2">
                            50% of Platform Revenue Return to Invites Rewards
                          </span>
                          <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-4 border-indigo-400"></div>
                        </div>

                        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-black/5 shadow-sm">
                          <span className="text-[14px] font-medium text-black/80 max-w-[200px]">
                            Scan the QR code to play and win!
                          </span>
                          <div className="w-24 h-24 bg-black/5 rounded-lg border border-black/10 overflow-hidden relative">
                            <img
                              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://randseed.org"
                              alt="QR"
                              className="w-full h-full object-cover mix-blend-multiply opacity-80"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center gap-2 text-[12px] text-black/60 mb-4 justify-center">
                          <span>
                            Invite Link: https://randseed.org/?invite=M82A5
                          </span>
                          <button className="hover:text-black transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex justify-center mb-6">
                          <button className="w-[80px] h-[28px] rounded-[14px] border border-black text-black font-semibold text-[13px] hover:bg-black/5 transition-colors flex items-center justify-center">
                            Save
                          </button>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-black/10">
                          <button className="text-[14px] text-black/60 flex items-center gap-1 hover:text-black">
                            invited{" "}
                            <span className="font-bold text-black mx-1">0</span>{" "}
                            friends <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {activeMenu !== "rewards" && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="capitalize text-lg font-medium mb-2">
              {activeMenu} Content
            </span>
            <span className="text-sm">
              This section is currently under construction.
            </span>
          </div>
        )}
      </div>

      {/* Modals */}
      {activeModal !== "balance" && (
        <TransactionModals
          activeModal={
            activeModal as "deposit" | "withdraw" | "record" | "bonus"
          }
          onClose={closeModal}
          isDesktop={isDesktop}
        />
      )}

      {activeModal === "balance" && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div
            className={`relative w-full max-w-[500px] bg-[#EAEAEA] rounded-t-16px sm:rounded-2xl overflow-hidden flex flex-col pointer-events-auto transform transition-transform ${isDesktop ? "h-auto max-h-[90vh]" : "mt-auto pb-4"}`}
          >
            <div className="px-4 py-3 flex flex-col relative text-left min-h-[400px]">
              <h2 className="text-sm font-medium text-black mb-4 text-center">
                Balance
              </h2>
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 text-black/40 hover:text-black"
              >
                <X size={20} />
              </button>
              <div className="text-sm text-black/40 border border-black/10 rounded-2xl p-4 mb-4 text-center w-full max-w-[360px] mx-auto">
                Balance is an estimated value based on the current crypto market
                and doesn't include your bonus and WL Points.
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-bold text-black">
                  Balance ≈ $-42.80
                </span>
                <button className="text-[#6A3FE6] hover:rotate-180 transition-transform">
                  <RefreshCw size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-black/60 w-full">
                    Gcoin{" "}
                    <span className="text-sm text-black/40">
                      1 USDC = 10 Gcoin
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-medium text-sm text-black">
                    <div className="w-6 h-6 rounded-full bg-yellow-400 shrink-0 border border-black/10"></div>
                    <span className="min-w-[60px] text-right">0.97</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-black/60 w-full">
                    ICP{" "}
                    <span className="text-sm text-black/40">
                      1 USDC = 0.4020 ICP
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-medium text-sm text-black">
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center font-bold text-black text-sm shrink-0 border border-black/10">
                      ∞
                    </div>
                    <span className="min-w-[60px] text-right">-17.2</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-black/60 w-full">
                    WLT
                  </div>
                  <div className="flex items-center gap-4 font-medium text-sm text-black">
                    <div className="flex gap-1 shrink-0">
                      <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                      <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="min-w-[60px] text-right">100.00</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <button
                  className="flex-1 py-3 rounded-2xl border-[1.5px] border-black text-black font-semibold text-sm hover:bg-black/5 transition-colors"
                  onClick={() => handleModalOpen("withdraw")}
                >
                  Withdraw
                </button>
                <button
                  className="flex-1 py-3 rounded-2xl border border-black/10 bg-transparent text-black font-semibold text-sm hover:bg-black/5 transition-colors"
                  onClick={() => handleModalOpen("deposit")}
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
