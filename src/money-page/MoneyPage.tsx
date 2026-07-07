import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useWltPrice } from "../hooks/useWltPrice";
import {
  Wallet,
  LogIn,
  Banknote,
  HelpCircle,
  ArrowRight,
  Activity,
  ChevronRight,
  RefreshCw,
  Settings,
  Hexagon,
  User,
  X,
  Check,
} from "lucide-react";
import { getSysAvatar } from "../utils/avatar";
import { TransactionModals } from "./components/TransactionModals";
import { WalletMenuBar } from "./components/WalletMenuBar";
import { RewardsTab } from "./tabs/RewardsTab";
import { RecordTab } from "./tabs/RecordTab";
import { BonusTab } from "./tabs/BonusTab";
import { DepositTab } from "./tabs/DepositTab";
import { WithdrawTab } from "./tabs/WithdrawTab";
import "../money-page/MoneyPage.css";

interface MoneyPageProps {
  isDesktop: boolean;
  userAccount: string | null;
  onSignInClick: () => void;
  onAccountClick?: () => void;
  onEditProfileClick?: () => void;
  profile?: any;
}

export function MoneyPage({
  isDesktop,
  userAccount,
  onSignInClick,
  onAccountClick,
  onEditProfileClick,
  profile,
}: MoneyPageProps) {
  const navigate = useNavigate();
  const { stats } = useWltPrice();
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
          <div className="w-full sm:w-auto flex justify-between items-center pb-6 sm:pb-0 px-[8px] sm:px-0">
            <div
              className="flex flex-row items-center gap-[16px] shrink-0 cursor-pointer flex-1 min-w-0"
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
                <div className="flex flex-col sm:justify-center flex-1 min-w-0">
                  <div className="flex items-center gap-2 max-w-full">
                    <span className="font-bold sm:font-[600] text-[20px] sm:text-[16px] text-slate-800 leading-tight truncate shrink">
                      {profile?.username || userAccount.substring(0, 6)}
                    </span>
                    {!isDesktop && (
                      <div className="flex items-center bg-gradient-to-r from-[#9370DB]/30 to-transparent pr-3 rounded-r-md shrink-0">
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
                </div>
              )}
            </div>

            {/* Settings Button */}
            {userAccount && (
              <button
                className="w-[40px] h-[40px] flex items-center justify-center bg-[#e8e9ef] rounded-full shrink-0 ml-4 hover:bg-[#dce0ef] transition-colors"
                onClick={() => onEditProfileClick?.()}
              >
                <Hexagon
                  className="w-5 h-5 text-slate-700"
                  strokeWidth={1.5}
                  style={{ fill: "transparent" }}
                />
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
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
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
              onClick={() => setActiveMenu("deposit")}
            >
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
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
              onClick={() => setActiveMenu("bonus")}
            >
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
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
            <div 
              className="flex flex-col items-center shrink-0 cursor-pointer"
              onClick={() => setActiveMenu("withdraw")}
            >
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                <span className="text-[18px] font-bold text-[#111] font-mono leading-none tracking-tight">
                  {userAccount ? "0.00" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 font-normal text-[14px]">
                <span>WLT</span>
                <RefreshCw className="w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] text-purple-400 shrink-0" />
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
          <RewardsTab
            isDesktop={isDesktop}
            userAccount={userAccount}
            onSignInClick={onSignInClick}
          />
        )}

        {activeMenu === "record" && (
          <RecordTab
            isDesktop={isDesktop}
            userAccount={userAccount}
          />
        )}

        {activeMenu === "bonus" && (
          <BonusTab isDesktop={isDesktop} />
        )}

        {activeMenu === "deposit" && (
          <DepositTab isDesktop={isDesktop} />
        )}

        {activeMenu === "withdraw" && (
          <WithdrawTab isDesktop={isDesktop} />
        )}

        {activeMenu !== "rewards" &&
          activeMenu !== "record" &&
          activeMenu !== "bonus" &&
          activeMenu !== "deposit" &&
          activeMenu !== "withdraw" && (
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
      {activeModal !== "balance" &&
        activeModal !== "bonus" &&
        activeModal !== null && (
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
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={closeModal}
          ></div>

          <div
            className={`relative w-full max-w-[400px] bg-[#EAEAEA] rounded-t-16px sm:rounded-2xl overflow-hidden flex flex-col pointer-events-auto transform transition-transform ${isDesktop ? "h-auto max-h-[90vh]" : "mt-auto pb-4"}`}
          >
            <div className="px-6 py-6 flex flex-col relative text-left">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <h2 className="text-[16px] font-bold text-black">
                  Balance ≈ $-38.31
                </h2>
                <button className="text-black/40 hover:text-black transition-colors">
                  <RefreshCw size={14} className="text-[#A4A2F6]" />
                </button>
              </div>
              <div className="text-[12px] text-black/50 mb-6 text-center w-full max-w-[360px] mx-auto leading-relaxed font-normal">
                Balance is an estimated value based on the current crypto market
                and doesn't include your bonus and WL Points.
              </div>

              <div className="w-full h-[1px] bg-black/5 mb-4"></div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                    <span>Gcoin</span>
                    <span className="text-[12px] text-black/40 font-normal">
                      1 USDC = 10 Gcoin
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                      <div className="w-4 h-4 rounded-full bg-[#FFD700] shrink-0"></div>
                      <span>0.97</span>
                    </div>
                    <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                      ≈ $0.10
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                    <span>ICP</span>
                    <span className="text-[12px] text-black/40 font-normal">
                      1 USDC = 0.4490 ICP
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                      <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center font-bold text-black text-[10px] shrink-0">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-purple-500">
                          ∞
                        </span>
                      </div>
                      <span>-17.2467</span>
                    </div>
                    <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                      ≈ $-38.41
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                    <span>WLT</span>
                    <span className="text-[12px] text-black/40 font-normal">
                      1 USDC = 100 WLT
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                      <div className="flex gap-[1.5px] shrink-0 items-center justify-center w-4 h-4">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      </div>
                      <span>100.00</span>
                    </div>
                    <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                      ≈ $1.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-auto">
                <button
                  className="w-[96px] h-[28px] rounded-[14px] border-[1px] border-solid border-black text-black font-semibold text-[13px] hover:bg-black/5 transition-colors flex items-center justify-center"
                  onClick={() => handleModalOpen("withdraw")}
                >
                  Withdraw
                </button>
                <button
                  className="w-[96px] h-[28px] rounded-[14px] border-[1px] border-solid border-black bg-transparent text-black font-semibold text-[13px] hover:bg-black/5 transition-colors flex items-center justify-center"
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
