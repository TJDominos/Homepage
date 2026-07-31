import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useNavigate } from "react-router";
import { useTokenPrices, SUPPORTED_ASSETS } from "../hooks/useTokenPrices";
import { AssetIcon } from "../components/shared/AssetIcon";
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
import { TransactionModals } from "./money/components/TransactionModals";
import { WalletMenuBar } from "./money/components/WalletMenuBar";
import { RewardsTab } from "./money/tabs/RewardsTab";
import { RecordTab } from "./money/tabs/RecordTab";
import { BonusTab } from "./money/tabs/BonusTab";
import { BalanceModal } from "./money/components/BalanceModal";
import { DepositTab } from "./money/tabs/DepositTab";
import { WithdrawTab } from "./money/tabs/WithdrawTab";
import "./MoneyPage.css";

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
  const prices = useTokenPrices();
  const [activeModal, setActiveModal] = useState<
    "balance" | "deposit" | "withdraw" | "record" | "bonus" | null
  >(null);
  const [activeMenu, setActiveMenu] = useState<
    "rewards" | "bonus" | "deposit" | "withdraw" | "record"
  >("rewards");
  const [isRefreshingGcoin, setIsRefreshingGcoin] = useState(false);
  const [isRefreshingWlt, setIsRefreshingWlt] = useState(false);
  const [targetBonusWidget, setTargetBonusWidget] = useState<{id: string, ts: number} | null>(null);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);
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
                <span className="text-[18px] font-bold text-[#111]  leading-none tracking-tight">
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
                <span className="text-[18px] font-bold text-[#111]  leading-none tracking-tight">
                  {userAccount ? "123,343.00" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 font-normal text-[14px]">
                <span>Gcoin</span>
                <RefreshCw 
                  className={`w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] text-purple-400 shrink-0 cursor-pointer transition-transform ${isRefreshingGcoin ? "animate-spin" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isRefreshingGcoin) return;
                    setIsRefreshingGcoin(true);
                    setTimeout(() => setIsRefreshingGcoin(false), 1000);
                  }}
                />
              </div>
            </div>

            {/* Bonus */}
            <div
              className="flex flex-col items-center shrink-0 cursor-pointer"
              onClick={() => setActiveMenu("bonus")}
            >
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                <span className="text-[18px] font-bold text-[#111]  leading-none tracking-tight">
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
                <span className="text-[18px] font-bold text-[#111]  leading-none tracking-tight">
                  {userAccount ? "0.00" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 font-normal text-[14px]">
                <span>WLT</span>
                <RefreshCw 
                  className={`w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] text-purple-400 shrink-0 cursor-pointer transition-transform ${isRefreshingWlt ? "animate-spin" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isRefreshingWlt) return;
                    setIsRefreshingWlt(true);
                    setTimeout(() => setIsRefreshingWlt(false), 1000);
                  }}
                />
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
          <BonusTab isDesktop={isDesktop} expandWidget={targetBonusWidget} />
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

      <BalanceModal isOpen={activeModal === "balance"} onClose={closeModal} isDesktop={isDesktop} prices={prices} onConvertGcoin={() => { closeModal(); setTargetBonusWidget({ id: "gcoin", ts: Date.now() }); setActiveMenu("bonus"); }} />
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
