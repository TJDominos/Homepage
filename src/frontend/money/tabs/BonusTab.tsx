import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Gift,
  ArrowUpCircle,
  ArrowRight,
  ArrowRightLeft,
  ChevronDown, ChevronUp,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useTokenPrices, SUPPORTED_ASSETS } from "../../../hooks/useTokenPrices";
import { AssetIcon } from "../../../components/shared/AssetIcon";

interface BonusTabProps {
  expandWidget?: {id: string, ts: number} | null;
  isDesktop: boolean;
}

export function BonusTab({ isDesktop, expandWidget }: BonusTabProps) {
  const prices = useTokenPrices();

  // Bonus Tab States
  const [claimCode, setClaimCode] = useState("");
  const [expandedWidget, setExpandedWidget] = useState<string | null>(expandWidget?.id || null);
  
  useEffect(() => {
    if (expandWidget?.id) {
      setExpandedWidget(expandWidget.id);
      setTimeout(() => {
        const el = document.getElementById(`widget-${expandWidget.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [expandWidget]);
  const [claimStatus, setClaimStatus] = useState<
    "idle" | "processing" | "error" | "success"
  >("idle");
  const [claimMessage, setClaimMessage] = useState("");

  const [topUpCurrency, setTopUpCurrency] = useState<string>("WLT");
  const [swapCurrency, setSwapCurrency] = useState<string>("WLT");
  const [showSwapCurrencyDropdown, setShowSwapCurrencyDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpStatus, setTopUpStatus] = useState<
    "idle" | "processing" | "success"
  >("idle");

  const [swapAmount, setSwapAmount] = useState("");
    const [gcoinAmount, setGcoinAmount] = useState("");
  const [gcoinCurrency, setGcoinCurrency] = useState<string>("USDC");
  const [gcoinDirection, setGcoinDirection] = useState<"toGcoin" | "fromGcoin">("toGcoin");
  const [gcoinStatus, setGcoinStatus] = useState<"idle" | "processing" | "success">("idle");
  const [showGcoinCurrencyDropdown, setShowGcoinCurrencyDropdown] = useState(false);

  const [swapStatus, setSwapStatus] = useState<
    "idle" | "processing" | "success"
  >("idle");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyDropdown(false);
        setShowSwapCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const BONUS_PRICE_USD = 0.0001;
  const GCOIN_TO_BONUS = 1000;

  // 1 WLT = (stats.price / BONUS_PRICE_USD) Bonus

  const calculateBonusFromTopUp = () => {
    if (!topUpAmount) return 0;
    const num = parseFloat(topUpAmount.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    if (topUpCurrency === "Gcoin") {
      return num * GCOIN_TO_BONUS;
    } else {
      const priceUsd = prices[topUpCurrency]?.priceUsd || 0;
      return (num * priceUsd) / BONUS_PRICE_USD;
    }
  };

  const calculateTokenFromSwap = () => {
    if (!swapAmount) return 0;
    const num = parseFloat(swapAmount.replace(/,/g, ""));
    if (isNaN(num) || num < 1000) return 0;
    const priceUsd = prices[swapCurrency]?.priceUsd || 1;
    return (num * BONUS_PRICE_USD) / priceUsd;
  };

  const handleClaimSubmit = () => {
    if (!claimCode) return;
    setClaimStatus("processing");
    setTimeout(() => {
      if (claimCode === "12334") {
        setClaimStatus("error");
        setClaimMessage("Bonus code was not found");
      } else {
        setClaimStatus("success");
        setClaimMessage("0.1 ICP"); // example success
      }
    }, 1500);
  };

  const handleTopUpSubmit = () => {
    if (!topUpAmount || parseFloat(topUpAmount.replace(/,/g, "")) <= 0) return;
    setTopUpStatus("processing");
    setTimeout(() => {
      setTopUpStatus("success");
      setTopUpAmount("");
    }, 1500);
  };

    const calculateGcoinSwap = () => {
    if (!gcoinAmount) return 0;
    const num = parseFloat(gcoinAmount.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    return gcoinDirection === "toGcoin" ? num * 10 : num / 10;
  };

  const handleGcoinSubmit = () => {
    if (!gcoinAmount || parseFloat(gcoinAmount.replace(/,/g, "")) <= 0) return;
    setGcoinStatus("processing");
    setTimeout(() => {
      setGcoinStatus("success");
      setGcoinAmount("");
    }, 1500);
  };

  const handleSwapSubmit = () => {
    if (!swapAmount || parseFloat(swapAmount.replace(/,/g, "")) < 1000) return;
    setSwapStatus("processing");
    setTimeout(() => {
      setSwapStatus("success");
      setSwapAmount("");
    }, 1500);
  };

  const formatNumber = (num: number) => {
    return (num || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  return (
    <div className="flex flex-col mt-4">
      <h2 className="text-[16px] font-[600] text-slate-800 mb-2 px-1">Bonus & Gcoin Swap</h2>
      <div className="text-[12px] text-slate-500 leading-relaxed font-normal mb-5 px-1">
        Bonuses can be used for gameplay or converted to Tokens. Claim a bonus
        code, or top up by converting your Tokens.
      </div>

      <div
        className={`money-cards-grid ${isDesktop ? "grid grid-cols-3 gap-6 items-stretch" : "flex flex-col gap-4"}`}
      >
        {/* Top up bonus Widget */}
        <div 
          className={`bg-[#f0f2f5] rounded-[24px] border border-black/5 flex flex-col items-center text-center shadow-sm relative w-full transition-all duration-300 overflow-hidden ${(!isDesktop && expandedWidget !== 'topUp') ? "p-4 h-[72px] cursor-pointer hover:bg-black/5" : "px-6 pb-6 pt-3 h-[320px]"}`}
          onClick={() => { if (!isDesktop && expandedWidget !== 'topUp') setExpandedWidget('topUp'); }}
        >
          {(!isDesktop && expandedWidget !== 'topUp') ? (
            <div className="flex items-center justify-between w-full h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <ArrowUpCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-[16px] font-semibold text-black">Top Up Bonus</h3>
              </div>
              <ChevronDown className="w-5 h-5 text-black/40" />
            </div>
          ) : (
            <>
              {!isDesktop && (
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full cursor-pointer z-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedWidget(null);
                  }}
                >
                  <ChevronUp className="w-5 h-5 text-black/60" />
                </button>
              )}
              <AnimatePresence mode="wait">
            {topUpStatus === "idle" || topUpStatus === "processing" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center"
              >
                

                <div className="flex flex-col items-center w-full">
<motion.div
                  className="mb-4 mt-2 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                  animate={
                    topUpStatus === "processing"
                      ? { y: [0, -8, 0], scale: [1, 1.05, 1] }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowUpCircle
                    className="w-[40px] h-[40px] text-green-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="text-[16px] font-semibold text-black mb-1">
                  Top Up Bonus
                </h3>
                <p className="text-[12px] font-normal text-black/65 mb-4">
                  Exchange Tokens to Bonus
                </p>
                </div>
                <div className="w-full flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 items-end">
                      <div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                        ref={dropdownRef}
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button
                          disabled={topUpStatus === "processing"}
                          onClick={(e) => {
                            e.stopPropagation(); setShowCurrencyDropdown(!showCurrencyDropdown); setShowSwapCurrencyDropdown(false);
                          }}
                          className={`flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 focus:ring-2 focus:ring-black/10 pl-4 pr-3 h-[32px] rounded-full text-[14px] text-black font-medium transition-colors cursor-pointer ${showCurrencyDropdown ? "bg-white ring-2 ring-black/10" : ""} ${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
                            <AssetIcon type={topUpCurrency} className="w-4 h-4 shrink-0" />
                            <span className="truncate text-center">
                              {topUpCurrency}
                            </span>
                          </div>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />
                        </button>
                        {showCurrencyDropdown && (
                          <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                            {[...SUPPORTED_ASSETS].filter(a => a !== 'Gcoin').sort((a, b) => a.localeCompare(b)).map(asset => (
                              <button
                                key={asset}
                                onClick={(e) => {
                                  e.stopPropagation(); setTopUpCurrency(asset);
                                  setShowCurrencyDropdown(false);
        setShowSwapCurrencyDropdown(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-black/5 ${topUpCurrency === asset ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                              >
                                <AssetIcon type={asset} className="w-4 h-4" />
                                {asset}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder="Amount"
                          disabled={topUpStatus === "processing"}
                        value={topUpAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9.,]*$/.test(val)) setTopUpAmount(val);
                        }}
                        onBlur={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (val && !isNaN(Number(val))) {
                            setTopUpAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                          }
                        }}
                        className={`w-full bg-black/5 focus:bg-white rounded-full px-3 h-[32px] outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        />
                      </div>
                    </div>
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full">
                      {parseFloat(topUpAmount.replace(/,/g, "")) > 0 ? (
                        <span className="text-[12px] font-medium text-green-600 leading-[1]">
                          ≈ {formatNumber(calculateBonusFromTopUp())} Bonus
                        </span>
                      ) : !topUpAmount ? (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1 {topUpCurrency} ={" "}
                          {formatNumber(
                            (prices[topUpCurrency]?.priceUsd || 0) / BONUS_PRICE_USD,
                          )}{" "}
                          Bonus
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <button
                    onClick={handleTopUpSubmit}
                    disabled={topUpStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"} ${topUpStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-[0.98]"}`}
                  >
                    {topUpStatus === "processing" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                    ) : (
                      "Top Up"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full w-full relative z-10"
              >
                <div className="relative mb-6 mt-2 w-20 h-20 flex items-center justify-center shrink-0">
                  <motion.div
                    className="absolute inset-0 bg-green-100 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-green-200 rounded-full"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className="relative z-10 w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <ArrowUpCircle
                      className="w-8 h-8 text-green-500"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green-400 rounded-full shadow-sm"
                      initial={{
                        y: 10,
                        x: (i - 2) * 12,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        y: -40 - ((i * 17) % 20),
                        opacity: [0, 1, 0],
                        scale: ((i * 0.3) % 1) + 0.5,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />
                  ))}
                </div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[18px] font-semibold text-slate-800 mb-2"
                >
                  Top Up Successful!
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  Your bonus balance has been updated.
                </motion.p>
                <button
                  onClick={() => setTopUpStatus("idle")}
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            )}
                    </AnimatePresence>
            </>
          )}
        </div>

        {/* Swap Bonus Widget */}
        <div 
          className={`bg-[#f0f2f5] rounded-[24px] border border-black/5 flex flex-col items-center text-center shadow-sm relative w-full transition-all duration-300 overflow-hidden ${(!isDesktop && expandedWidget !== 'swap') ? "p-4 h-[72px] cursor-pointer hover:bg-black/5" : "px-6 pb-6 pt-3 h-[320px]"}`}
          onClick={() => { if (!isDesktop && expandedWidget !== 'swap') setExpandedWidget('swap'); }}
        >
          {(!isDesktop && expandedWidget !== 'swap') ? (
            <div className="flex items-center justify-between w-full h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <ArrowRight className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-[16px] font-semibold text-black">Redeem Token</h3>
              </div>
              <ChevronDown className="w-5 h-5 text-black/40" />
            </div>
          ) : (
            <>
              {!isDesktop && (
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full cursor-pointer z-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedWidget(null);
                  }}
                >
                  <ChevronUp className="w-5 h-5 text-black/60" />
                </button>
              )}
              <AnimatePresence mode="wait">
            {swapStatus === "idle" || swapStatus === "processing" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center"
              >
                <div className="flex flex-col items-center w-full">
<motion.div
                  className="mb-4 mt-2 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                  animate={
                    swapStatus === "processing" ? { rotate: [0, 180, 360] } : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight
                    className="w-[40px] h-[40px] text-purple-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="text-[16px] font-semibold text-black mb-1">
                  Redeem Token
                </h3>
                <p className="text-[12px] font-normal text-black/65 mb-4">
                  Exchange Bonus to Tokens
                </p>
                </div>
                <div className="w-full flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder="Min: 1,000 Bonus"
                        disabled={swapStatus === "processing"}
                        value={swapAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9.,]*$/.test(val)) setSwapAmount(val);
                        }}
                        onBlur={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (val && !isNaN(Number(val))) {
                            setSwapAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                          }
                        }}
                        className={`w-full bg-black/5 focus:bg-white rounded-full px-3 h-[32px] outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        />
                      </div>
                      <div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button
                          disabled={swapStatus === "processing"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSwapCurrencyDropdown(!showSwapCurrencyDropdown);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 focus:ring-2 focus:ring-black/10 pl-4 pr-3 h-[32px] rounded-full text-[14px] text-black font-medium transition-colors cursor-pointer ${showSwapCurrencyDropdown ? "bg-white ring-2 ring-black/10" : ""} ${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
                            <AssetIcon type={swapCurrency} className="w-4 h-4 shrink-0" />
                            <span className="truncate text-center">
                              {swapCurrency}
                            </span>
                          </div>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />
                        </button>
                        {showSwapCurrencyDropdown && (
                          <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                            {[...SUPPORTED_ASSETS].filter(a => a !== 'Gcoin' && a !== 'USDC' && a !== 'USDT').sort((a, b) => a.localeCompare(b)).map(asset => (
                              <button
                                key={asset}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSwapCurrency(asset);
                                  setShowSwapCurrencyDropdown(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-black/5 ${swapCurrency === asset ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                              >
                                <AssetIcon type={asset} className="w-4 h-4" />
                                {asset}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-1 w-full gap-1">
                      {parseFloat(swapAmount.replace(/,/g, "")) >= 1000 ? (
                        <span className="text-[12px] font-medium text-purple-600 leading-[1]">
                          ≈ {formatNumber(calculateTokenFromSwap())} {swapCurrency}
                        </span>
                      ) : swapAmount ? (
                        <span className="text-[12px] font-medium text-red-500 leading-[1]">
                          Minimum 1,000 Bonus
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1,000 Bonus ={" "}
                          {formatNumber(1000 * BONUS_PRICE_USD / (prices[swapCurrency]?.priceUsd || 1))} {swapCurrency}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        Conversion fee: 0.00 {swapCurrency}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSwapSubmit}
                    disabled={swapStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"} ${swapStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-95"}`}
                  >
                    {swapStatus === "processing" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                    ) : (
                      "Swap"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full w-full relative z-10"
              >
                <div className="relative mb-6 mt-2 w-20 h-20 flex items-center justify-center shrink-0">
                  <motion.div
                    className="absolute inset-0 bg-indigo-100 rounded-full"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  />
                  <motion.div
                    className="relative z-10 w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 150,
                    }}
                  >
                    <ArrowRight
                      className="w-8 h-8 text-indigo-500"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-indigo-400"
                      initial={{ opacity: 0, scale: 0, rotate: i * 90 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                        rotate: i * 90 + 180,
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.4 + i * 0.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        originX: 0.5,
                        originY: 2.5,
                      }}
                    >
                      <Sparkles size={14} />
                    </motion.div>
                  ))}
                </div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[18px] font-semibold text-slate-800 mb-2"
                >
                  Swap Successful!
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  Your {swapCurrency} has been credited to your balance.
                </motion.p>
                <button
                  onClick={() => setSwapStatus("idle")}
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            )}
                    </AnimatePresence>
            </>
          )}
        </div>
{/* Claim Bonus Code Widget */}
        <div 
          className={`bg-[#f0f2f5] rounded-[24px] border border-black/5 flex flex-col items-center text-center shadow-sm relative w-full transition-all duration-300 overflow-hidden ${(!isDesktop && expandedWidget !== 'claim') ? "p-4 h-[72px] cursor-pointer hover:bg-black/5" : "px-6 pb-6 pt-3 h-[320px]"}`}
          onClick={() => { if (!isDesktop && expandedWidget !== 'claim') setExpandedWidget('claim'); }}
        >
          {(!isDesktop && expandedWidget !== 'claim') ? (
            <div className="flex items-center justify-between w-full h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <Gift className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-[16px] font-semibold text-black">Claim Bonus Code</h3>
              </div>
              <ChevronDown className="w-5 h-5 text-black/40" />
            </div>
          ) : (
            <>
              {!isDesktop && (
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full cursor-pointer z-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedWidget(null);
                  }}
                >
                  <ChevronUp className="w-5 h-5 text-black/60" />
                </button>
              )}
              <AnimatePresence mode="wait">
            {claimStatus === "idle" || claimStatus === "processing" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center"
              >
                <div className="flex flex-col items-center w-full">
<motion.div
                  className="mb-4 mt-2 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                  animate={
                    claimStatus === "processing"
                      ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, -5, 0] }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Gift
                    className="w-[40px] h-[40px] text-blue-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="text-[16px] font-semibold text-black mb-6">
                  Claim Bonus Code
                </h3>
                
                </div>
                <div className="w-full flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-full">
                        <label className="text-[13px] font-normal text-transparent text-left pl-2 select-none block">Code</label>
                        <input
                          type="text"
                          placeholder="Enter Code"
                          value={claimCode}
                          disabled={claimStatus === "processing"}
                          onChange={(e) => {
                            setClaimCode(e.target.value);
                            setClaimStatus("idle");
                          }}
                          className={`w-full bg-black/5 focus:bg-white rounded-full px-5 h-[32px] outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${claimStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        />
                      </div>
                    </div>
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full"></div>
                  </div>
                  <button
                    onClick={handleClaimSubmit}
                    disabled={claimStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"} ${claimStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-95"}`}
                  >
                    {claimStatus === "processing" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : claimStatus === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full w-full"
              >
                <div className="mb-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Gift
                    className="w-[32px] h-[32px] text-slate-400 opacity-50"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[18px] font-semibold text-slate-800 mb-2">
                  Sorry!
                </h3>
                <p className="text-[14px] text-slate-500 mb-8 max-w-[200px]">
                  The bonus has been fully claimed.
                </p>
                <button
                  onClick={() => setClaimStatus("idle")}
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full w-full relative z-10"
              >
                <div className="relative mb-6 mt-2 w-20 h-20 flex items-center justify-center shrink-0">
                  <motion.div
                    className="absolute inset-0 bg-purple-100 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.div
                    className="relative z-10 w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center"
                    initial={{ y: 20, rotate: -15, scale: 0 }}
                    animate={{
                      y: 0,
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1,
                      duration: 0.6,
                    }}
                  >
                    <Gift
                      className="w-8 h-8 text-purple-500"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 60 * Math.PI) / 180;
                    const dist = 40;
                    return (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-purple-400" : "bg-pink-400"}`}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                          x: Math.cos(angle) * dist,
                          y: Math.sin(angle) * dist,
                          opacity: 0,
                          scale: 1.2,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </div>
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[18px] font-semibold text-slate-800 mb-2"
                >
                  Bonus Claimed!
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[16px] text-purple-600 font-medium mb-8"
                >
                  {claimMessage}
                </motion.p>
                <button
                  onClick={() => {
                    setClaimStatus("idle");
                    setClaimCode("");
                  }}
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            )}
                    </AnimatePresence>
            </>
          )}
        </div>
        {/* Convert Gcoin Widget */}
        <div id="widget-gcoin"
          className={`bg-[#f0f2f5] rounded-[24px] border border-black/5 flex flex-col items-center text-center shadow-sm relative w-full transition-all duration-300 overflow-hidden ${(!isDesktop && expandedWidget !== 'gcoin') ? "p-4 h-[72px] cursor-pointer hover:bg-black/5" : "px-6 pb-6 pt-3 h-[320px]"}`}
          onClick={() => { if (!isDesktop && expandedWidget !== 'gcoin') setExpandedWidget('gcoin'); }}
        >
          {(!isDesktop && expandedWidget !== 'gcoin') ? (
            <div className="flex items-center justify-between w-full h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <ArrowRightLeft className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="text-[16px] font-semibold text-black">Convert Gcoin</h3>
              </div>
              <ChevronDown className="w-5 h-5 text-black/40" />
            </div>
          ) : (
            <>
              {!isDesktop && (
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full cursor-pointer z-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedWidget(null);
                  }}
                >
                  <ChevronUp className="w-5 h-5 text-black/60" />
                </button>
              )}
              <AnimatePresence mode="wait">
            {gcoinStatus === "idle" || gcoinStatus === "processing" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center"
              >
                <div className="flex flex-col items-center w-full">
                <motion.div
                  className="mb-4 mt-2 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                  animate={
                    gcoinStatus === "processing" ? { rotate: [0, 180, 360] } : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRightLeft className="w-[40px] h-[40px] text-[#FFD700]" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-[16px] font-semibold text-black mb-1">
                  Convert Gcoin
                </h3>
                </div>
                <button 
                  onClick={() => setGcoinDirection(gcoinDirection === "toGcoin" ? "fromGcoin" : "toGcoin")}
                  className="flex items-center gap-2 mb-4 bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full mt-1 cursor-pointer transition-colors"
                >
                  {gcoinDirection === "toGcoin" ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type={gcoinCurrency} className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">{gcoinCurrency}</span>
                      </div>
                      <div className="p-1 rounded-full transition-colors text-black/40">
                        <ArrowRightLeft size={14} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type="Gcoin" className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">Gcoin</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type="Gcoin" className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">Gcoin</span>
                      </div>
                      <div className="p-1 rounded-full transition-colors text-black/40">
                        <ArrowRightLeft size={14} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type={gcoinCurrency} className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">{gcoinCurrency}</span>
                      </div>
                    </>
                  )}
                </button>
                <div className="w-full flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder={gcoinDirection === "toGcoin" ? "Amount in " + gcoinCurrency : "Amount in Gcoin"}
                          disabled={gcoinStatus === "processing"}
                          value={gcoinAmount}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^[0-9.,]*$/.test(val)) setGcoinAmount(val);
                          }}
                          onBlur={(e) => {
                            const val = e.target.value.replace(/,/g, "");
                            if (val && !isNaN(Number(val))) {
                              setGcoinAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            }
                          }}
                          className={`w-full bg-black/5 focus:bg-white rounded-full px-3 h-[32px] outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${gcoinStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        />
                      </div>
                      <div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">{gcoinDirection === "toGcoin" ? "From" : "To"}</label>
                        <button
                          disabled={gcoinStatus === "processing"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowGcoinCurrencyDropdown(!showGcoinCurrencyDropdown);
                            setShowCurrencyDropdown(false);
                            setShowSwapCurrencyDropdown(false);
                          }}
                          className={`flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 focus:ring-2 focus:ring-black/10 pl-4 pr-3 h-[32px] rounded-full text-[14px] text-black font-medium transition-colors cursor-pointer ${showGcoinCurrencyDropdown ? "bg-white ring-2 ring-black/10" : ""} ${gcoinStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
                            <AssetIcon type={gcoinCurrency} className="w-4 h-4 shrink-0" />
                            <span className="truncate text-center">
                              {gcoinCurrency}
                            </span>
                          </div>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />
                        </button>
                        {showGcoinCurrencyDropdown && (
                          <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                            {["USDC", "USDT"].map(asset => (
                              <button
                                key={asset}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGcoinCurrency(asset);
                                  setShowGcoinCurrencyDropdown(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-black/5 ${gcoinCurrency === asset ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                              >
                                <AssetIcon type={asset} className="w-4 h-4" />
                                {asset}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-1 w-full gap-1">
                      {gcoinAmount && parseFloat(gcoinAmount.replace(/,/g, "")) > 0 ? (
                        <span className="text-[12px] font-medium text-blue-600 leading-[1]">
                          ≈ {formatNumber(calculateGcoinSwap())} {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1 {gcoinCurrency} = 10 Gcoin
                        </span>
                      )}
                      {gcoinDirection === 'fromGcoin' && ['USDC', 'USDT'].includes(gcoinCurrency) && (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Conversion fee: 0.00 {gcoinCurrency}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleGcoinSubmit}
                    disabled={gcoinStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"} ${gcoinStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-95"}`}
                  >
                    {gcoinStatus === "processing" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                    ) : (
                      "Convert"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full w-full relative z-10"
              >
                <div className="relative mb-6 mt-2 w-20 h-20 flex items-center justify-center shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="absolute inset-0 bg-blue-100 rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <Sparkles className="w-10 h-10 text-blue-500 relative z-10" />
                  </motion.div>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[18px] font-semibold text-slate-800 mb-2"
                >
                  Conversion Successful!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  Your {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency} has been credited to your balance.
                </motion.p>
                <button
                  onClick={() => setGcoinStatus("idle")}
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto mt-auto"}`}
                >
                  Done
                </button>
              </motion.div>
            )}
                    </AnimatePresence>
            </>
          )}
        </div>

              </div>
    </div>
  );
}
