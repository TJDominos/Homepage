import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Gift,
  ArrowUpCircle,
  ArrowRightLeft,
  ChevronDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useWltPrice } from "../../hooks/useWltPrice";

interface BonusTabProps {
  isDesktop: boolean;
}

export function BonusTab({ isDesktop }: BonusTabProps) {
  const { stats } = useWltPrice();

  // Bonus Tab States
  const [claimCode, setClaimCode] = useState("");
  const [claimStatus, setClaimStatus] = useState<
    "idle" | "processing" | "error" | "success"
  >("idle");
  const [claimMessage, setClaimMessage] = useState("");

  const [topUpCurrency, setTopUpCurrency] = useState<"wlt" | "gcoin">("wlt");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpStatus, setTopUpStatus] = useState<
    "idle" | "processing" | "success"
  >("idle");

  const [swapAmount, setSwapAmount] = useState("");
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const BONUS_PRICE_USD = 0.0001;
  const GCOIN_TO_BONUS = 1000;

  // 1 WLT = (stats.price / BONUS_PRICE_USD) Bonus
  const WLT_TO_BONUS = stats.price ? stats.price / BONUS_PRICE_USD : 0;

  const calculateBonusFromTopUp = () => {
    if (!topUpAmount) return 0;
    const num = parseFloat(topUpAmount);
    if (isNaN(num)) return 0;
    if (topUpCurrency === "gcoin") {
      return num * GCOIN_TO_BONUS;
    } else {
      return num * WLT_TO_BONUS;
    }
  };

  const calculateWltFromSwap = () => {
    if (!swapAmount) return 0;
    const num = parseFloat(swapAmount);
    if (isNaN(num) || num < 1000) return 0;
    return WLT_TO_BONUS > 0 ? num / WLT_TO_BONUS : 0;
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
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) return;
    setTopUpStatus("processing");
    setTimeout(() => {
      setTopUpStatus("success");
      setTopUpAmount("");
    }, 1500);
  };

  const handleSwapSubmit = () => {
    if (!swapAmount || parseFloat(swapAmount) < 1000) return;
    setSwapStatus("processing");
    setTimeout(() => {
      setSwapStatus("success");
      setSwapAmount("");
    }, 1500);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  return (
    <div className="flex flex-col mt-4">
      <h2 className="text-[16px] font-[600] text-slate-800 mb-2 px-1">Bonus</h2>
      <div className="text-[14px] text-slate-500 leading-relaxed font-normal mb-5 px-1">
        Bonuses can be used for gameplay or converted to WLT. Claim a bonus
        code, or top up by converting your Gcoin and WLT.
      </div>

      <div
        className={`money-cards-grid ${isDesktop ? "grid grid-cols-3 gap-6 items-stretch" : "flex flex-col gap-4"}`}
      >
        {/* Claim Bonus Code Widget */}
        <div className="bg-[#f0f2f5] rounded-[24px] p-6 border border-black/5 flex flex-col items-center text-center shadow-sm relative overflow-hidden w-full h-[320px]">
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
                <div className="w-full flex-1 flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      placeholder="Enter Code"
                      value={claimCode}
                      disabled={claimStatus === "processing"}
                      onChange={(e) => {
                        setClaimCode(e.target.value);
                        setClaimStatus("idle");
                      }}
                      className={`w-full bg-black/5 focus:bg-white rounded-full px-5 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${claimStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full"></div>
                  </div>
                  <button
                    onClick={handleClaimSubmit}
                    disabled={claimStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"} ${claimStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-95"}`}
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
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"}`}
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
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top up bonus Widget */}
        <div className="bg-[#f0f2f5] rounded-[24px] p-6 border border-black/5 flex flex-col items-center text-center shadow-sm relative overflow-hidden w-full h-[320px]">
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
                  Top up bonus
                </h3>
                <p className="text-[12px] font-normal text-black/65 mb-4 flex-1">
                  Exchange WLT or Gcoin to Bonus
                </p>
                <div className="w-full flex-1 flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2">
                      <div
                        className="relative shrink-0 w-[40%] min-w-[90px]"
                        ref={dropdownRef}
                      >
                        <button
                          disabled={topUpStatus === "processing"}
                          onClick={() => {
                            setShowCurrencyDropdown(!showCurrencyDropdown);
                          }}
                          className={`flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 focus:ring-2 focus:ring-black/10 pl-4 pr-3 py-3 rounded-full text-[14px] text-black font-medium transition-colors cursor-pointer ${showCurrencyDropdown ? "bg-white ring-2 ring-black/10" : ""} ${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <span className="truncate flex-1 text-center">
                            {topUpCurrency === "wlt" ? "WLT" : "Gcoin"}
                          </span>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />
                        </button>
                        {showCurrencyDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-hidden">
                            <button
                              onClick={() => {
                                setTopUpCurrency("wlt");
                                setShowCurrencyDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-[13px] hover:bg-black/5 ${topUpCurrency === "wlt" ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                            >
                              WLT
                            </button>
                            <button
                              onClick={() => {
                                setTopUpCurrency("gcoin");
                                setShowCurrencyDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-[13px] hover:bg-black/5 ${topUpCurrency === "gcoin" ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                            >
                              Gcoin
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Amount"
                        disabled={topUpStatus === "processing"}
                        value={
                          topUpAmount
                            ? Number(topUpAmount).toLocaleString("en-US", {
                                maximumFractionDigits: 6,
                              })
                            : ""
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (!val) setTopUpAmount("");
                          else if (!isNaN(Number(val)) && Number(val) >= 0)
                            setTopUpAmount(val);
                        }}
                        className={`flex-1 w-2/3 bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                      />
                    </div>
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full">
                      {parseFloat(topUpAmount) > 0 ? (
                        <span className="text-[12px] font-medium text-green-600 leading-[1]">
                          ≈ {formatNumber(calculateBonusFromTopUp())} Bonus
                        </span>
                      ) : !topUpAmount ? (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1 {topUpCurrency.toUpperCase()} ={" "}
                          {formatNumber(
                            topUpCurrency === "wlt"
                              ? WLT_TO_BONUS
                              : GCOIN_TO_BONUS,
                          )}{" "}
                          Bonus
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <button
                    onClick={handleTopUpSubmit}
                    disabled={topUpStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"} ${topUpStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-[0.98]"}`}
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
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swap WLT Widget */}
        <div className="bg-[#f0f2f5] rounded-[24px] p-6 border border-black/5 flex flex-col items-center text-center shadow-sm relative overflow-hidden w-full h-[320px]">
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
                  <ArrowRightLeft
                    className="w-[40px] h-[40px] text-purple-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="text-[16px] font-semibold text-black mb-1">
                  Swap WLT
                </h3>
                <p className="text-[12px] font-normal text-black/65 mb-4 flex-1">
                  Convert Bonus to WLT
                </p>
                <div className="w-full flex-1 flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      placeholder="Min Amount: 1,000 Bonus"
                      disabled={swapStatus === "processing"}
                      value={
                        swapAmount
                          ? Number(swapAmount).toLocaleString("en-US", {
                              maximumFractionDigits: 6,
                            })
                          : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value.replace(/,/g, "");
                        if (!val) setSwapAmount("");
                        else if (!isNaN(Number(val)) && Number(val) >= 0)
                          setSwapAmount(val);
                      }}
                      className={`w-full bg-black/5 focus:bg-white rounded-full px-5 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium ${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full">
                      {parseFloat(swapAmount) >= 1000 ? (
                        <span className="text-[12px] font-medium text-purple-600 leading-[1]">
                          ≈ {formatNumber(calculateWltFromSwap())} WLT
                        </span>
                      ) : swapAmount ? (
                        <span className="text-[12px] font-medium text-red-500 leading-[1]">
                          Minimum 1,000 Bonus
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1,000 Bonus ={" "}
                          {formatNumber(1000 / WLT_TO_BONUS)} WLT
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSwapSubmit}
                    disabled={swapStatus === "processing"}
                    className={`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"} ${swapStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-95"}`}
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
                    <ArrowRightLeft
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
                  Your WLT has been credited to your balance.
                </motion.p>
                <button
                  onClick={() => setSwapStatus("idle")}
                  className={`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto ${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"}`}
                >
                  OK
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
