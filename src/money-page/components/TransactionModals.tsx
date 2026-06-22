import React, { useState } from "react";
import {
  ChevronDown,
  Copy,
  RefreshCw,
  X,
  ChevronLeft,
  CheckCircle2,
  ChevronRight,
  Activity,
} from "lucide-react";

interface TransactionModalsProps {
  activeModal: "deposit" | "withdraw" | "record" | "bonus" | null;
  onClose: () => void;
  isDesktop: boolean;
}

export function TransactionModals({
  activeModal,
  onClose,
  isDesktop,
}: TransactionModalsProps) {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<string>("");

  if (!activeModal) return null;

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={onClose}></div>

      <div
        className={`relative w-full ${activeModal === "record" ? "max-w-[800px]" : "max-w-[500px]"} bg-[#EAEAEA] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col pointer-events-auto transform transition-transform ${isDesktop ? "h-auto max-h-[90vh]" : "mt-auto pb-4 h-[85vh] sm:h-auto"}`}
      >
        {/* Modals Header Shared (Optional back button based on step) */}
        <div className="relative pt-4 pb-2 px-4 flex items-center justify-between">
          {step > 0 || activeModal === "deposit" ? (
            <button
              onClick={handleBack}
              className="text-black/60 hover:text-black"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-6" /> // spacer
          )}
          <h2 className="text-[18px] font-bold text-black flex-1 text-center">
            {activeModal === "deposit" &&
              (step === 0
                ? "Select the type of Deposit"
                : `Deposit ${currency}`)}
            {activeModal === "withdraw" &&
              (step === 0 ? "Select withdrawal funds" : `Withdraw ${currency}`)}
            {activeModal === "bonus" && "Get Bonus"}
            {activeModal === "record" && "Record"}
          </h2>
          <button onClick={onClose} className="text-black/40 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* Modal Bodies */}
        <div className="px-4 py-2 min-h-[350px] flex flex-col">
          {/* DEPOSIT */}
          {activeModal === "deposit" && step === 0 && (
            <div className="flex flex-col gap-4 flex-1">
              <button
                className={`w-full p-4 flex items-center justify-between border-b border-black/5 hover:bg-black/5 transition-colors text-left ${currency === "Gcoin" ? "bg-black/5" : ""}`}
                onClick={() => setCurrency("Gcoin")}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-400 border border-black/10 shrink-0"></div>
                    Gcoin
                  </span>
                  <span className="text-sm text-black/50">
                    Gcoin can be used to play games
                  </span>
                </div>
                {currency === "Gcoin" && (
                  <CheckCircle2 className="w-6 h-6 text-[#6A3FE6]" />
                )}
              </button>

              <button
                className={`w-full p-4 flex items-center justify-between border-b border-black/5 hover:bg-black/5 transition-colors text-left ${currency === "ICP" ? "bg-black/5" : ""}`}
                onClick={() => setCurrency("ICP")}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold border border-black/10 shrink-0">
                      ∞
                    </div>
                    ICP
                  </span>
                  <span className="text-sm text-black/50">
                    ICP can be used for staking
                  </span>
                </div>
                {currency === "ICP" && (
                  <CheckCircle2 className="w-6 h-6 text-[#6A3FE6]" />
                )}
              </button>

              <div className="mt-auto pt-6 flex justify-center">
                <button
                  className={`px-12 py-3 rounded-[24px] text-white font-bold text-lg shadow-md transition-colors ${currency ? "bg-black" : "bg-black/20 cursor-not-allowed"}`}
                  disabled={!currency}
                  onClick={() => setStep(1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeModal === "deposit" && step === 1 && (
            <div className="flex flex-col relative text-center flex-1 pb-4">
              <div className="flex items-center justify-center gap-4 text-black/40 text-sm mb-6 mt-2">
                <span className="flex items-center gap-2">
                  <RefreshCw size={14} /> Gcoin: 0.97
                </span>
                <span>1 USDC = 10 Gcoin</span>
              </div>

              <div className="flex items-center gap-4 justify-center mb-6">
                <button className="flex items-center justify-between px-4 py-3 bg-black/5 rounded-2xl text-sm text-black font-medium w-full hover:bg-black/10">
                  <span className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                      $
                    </div>
                    USDC
                  </span>
                  <ChevronDown size={16} className="text-black/40" />
                </button>
                <button className="flex items-center justify-between px-4 py-3 bg-black/5 rounded-2xl text-sm text-black font-medium w-full hover:bg-black/10">
                  <span className="flex items-center gap-3">
                    <div className="w-6 h-6 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
                      <img
                        src="/solana-logo.png"
                        alt="SOL"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML =
                            '<div class="w-full h-full bg-black"></div>';
                        }}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    SOLANA
                  </span>
                  <ChevronDown size={16} className="text-black/40" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 text-[15px] mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-black font-semibold">
                    Your Address:
                  </span>
                  <span className="text-[#6A3FE6] font-bold">
                    FfTfJ...sjCHD
                  </span>
                  <button className="text-[#6A3FE6] hover:opacity-80">
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-[160px] h-[160px] bg-white rounded-xl flex items-center justify-center p-3 shadow-sm border border-black/5">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FfTfJ...sjCHD"
                    alt="QR"
                    className="w-full h-full opacity-90"
                  />
                </div>
              </div>

              <p className="text-[13px] text-black/60 leading-relaxed text-center px-2 mt-auto">
                Deposits under $1.00 won't show up until they total $1.00 or
                more. USDC auto-converts to Gcoin, withdrawable anytime as USDC.
                Refresh your balance if it seems wrong, or contact{" "}
                <a
                  href="mailto:support@randseed.org"
                  className="text-[#6A3FE6] hover:underline hover:opacity-80 transition-opacity"
                >
                  support@randseed.org
                </a>{" "}
                for help.
              </p>
            </div>
          )}

          {/* WITHDRAW */}
          {activeModal === "withdraw" && step === 0 && (
            <div className="flex flex-col gap-2 flex-1">
              <button
                className={`w-full p-4 flex items-center justify-between border-b border-black/5 hover:bg-black/5 transition-colors text-left ${currency === "Gcoin" ? "bg-black/5" : ""}`}
                onClick={() => setCurrency("Gcoin")}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black flex items-center gap-2 text-[15px]">
                    <div className="w-5 h-5 rounded-full bg-yellow-400 border border-black/10 shrink-0"></div>
                    Gcoin
                  </span>
                  <span className="text-[13px] text-black/40">
                    Withdraw as USDC
                  </span>
                </div>
                {currency === "Gcoin" && (
                  <CheckCircle2 className="w-6 h-6 text-[#6A3FE6]" />
                )}
              </button>

              <button
                className={`w-full p-4 flex items-center justify-between border-b border-black/5 hover:bg-black/5 transition-colors text-left ${currency === "ICP" ? "bg-black/5" : ""}`}
                onClick={() => setCurrency("ICP")}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black flex items-center gap-2 text-[15px]">
                    <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold border border-black/10 shrink-0">
                      ∞
                    </div>
                    ICP
                  </span>
                  <span className="text-[13px] text-black/40">
                    Direct withdrawal to your account
                  </span>
                </div>
                {currency === "ICP" && (
                  <CheckCircle2 className="w-6 h-6 text-[#6A3FE6]" />
                )}
              </button>

              <button
                className={`w-full p-4 flex items-center justify-between border-b border-black/5 hover:bg-black/5 transition-colors text-left ${currency === "WLT" ? "bg-black/5" : ""}`}
                onClick={() => setCurrency("WLT")}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black flex items-center gap-2 text-[15px]">
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center border border-black/10 rounded-full bg-white overflow-hidden">
                      <div className="w-[10px] h-[10px] bg-gradient-to-tr from-purple-500 to-blue-500 rounded-[2px] transform rotate-45"></div>
                    </div>
                    WLT
                  </span>
                  <span className="text-[13px] text-black/40">
                    Direct withdrawal to your account
                  </span>
                </div>
                {currency === "WLT" && (
                  <CheckCircle2 className="w-6 h-6 text-[#6A3FE6]" />
                )}
              </button>

              <div className="mt-auto pt-6 flex justify-center">
                <button
                  className={`px-12 py-3 rounded-[24px] text-white font-bold text-lg shadow-md transition-colors ${currency ? "bg-black" : "bg-black/20 cursor-not-allowed"}`}
                  disabled={!currency}
                  onClick={() => setStep(1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeModal === "withdraw" && step === 1 && (
            <div className="flex flex-col relative flex-1 text-left">
              <p className="text-[13px] text-black/70 mb-6 px-1">
                Withdraw is processed through the blockchain network. Wrong
                crypto address will result in the loss of funds.
              </p>

              <div className="mb-4">
                <label className="block text-[14px] font-semibold text-black mb-2 px-1">
                  Choose Network
                </label>
                <div className="flex items-center gap-4">
                  <button className="flex items-center justify-between px-4 py-3 bg-black/5 rounded-2xl text-[14px] text-black/60 font-medium w-full border border-black/5">
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#2775CA]/50 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                        $
                      </div>
                      USDC
                    </span>
                    <ChevronDown size={16} />
                  </button>
                  <button className="flex items-center justify-between px-4 py-3 bg-black/5 rounded-2xl text-[14px] text-black font-medium w-full border border-black/5 hover:bg-black/10">
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
                        <img
                          src="/solana-logo.png"
                          alt="SOL"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.innerHTML =
                              '<div class="w-full h-full bg-black"></div>';
                          }}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      SOLANA
                    </span>
                    <ChevronDown size={16} className="text-black/40" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[14px] font-semibold text-black mb-2 px-1">
                  Withdraw Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="w-full bg-black/5 border border-black/5 rounded-2xl px-4 py-3 text-[14px] outline-none focus:bg-white focus:border-[#6A3FE6] transition-colors"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[14px] font-semibold text-black mb-2 px-1">
                  Withdraw Amount
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Minimum 20"
                    className="flex-1 min-w-0 bg-black/5 border border-black/5 rounded-2xl px-4 py-3 text-[14px] outline-none focus:bg-white focus:border-[#6A3FE6] transition-colors"
                  />
                  <div className="px-4 py-3 bg-black/5 rounded-2xl text-[14px] text-black/40 font-medium whitespace-nowrap">
                    Gcoin
                  </div>
                  <button className="px-6 py-3 bg-[#2a2a2a] text-white rounded-2xl text-[14px] font-semibold hover:bg-black transition-colors whitespace-nowrap">
                    Max
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-3 px-1">
                  <span className="text-[12px] text-black/40">
                    Balance 0.97 Gcoin | Network Fee 0.05 USD
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full bg-black/10 flex items-center justify-center text-[10px] text-black/40 ml-1 cursor-help">
                    ?
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 flex flex-col items-center">
                <button className="w-[200px] py-3 rounded-[24px] bg-[#2a2a2a] hover:bg-black text-white font-bold text-[16px] shadow-sm transition-colors mb-4">
                  Withdraw
                </button>
                <a
                  href="mailto:support@randseed.org"
                  className="text-[13px] text-[#6A3FE6] hover:underline mb-4"
                >
                  support@randseed.org
                </a>
                <p className="text-[12px] text-black/40 text-center leading-relaxed">
                  If you have trouble to withdraw or have not received your
                  withdrawal, please contact us with your withdrawal address.
                </p>
              </div>
            </div>
          )}

          {/* BONUS */}
          {activeModal === "bonus" && (
            <div className="flex flex-col items-center justify-center text-center flex-1 py-6">
              <div className="w-[100px] h-[100px] mb-6 relative">
                {/* Decorative Chest Image fallback */}
                <div className="absolute inset-0 bg-[#e3deee] rounded-xl flex shadow-sm items-center justify-center">
                  <img
                    src="/get_bonus.png"
                    alt="Chest"
                    className="w-[64px] h-[64px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Enter Code"
                className="w-full max-w-[280px] bg-black/5 border border-black/5 rounded-[24px] px-6 py-3 text-[15px] outline-none text-center focus:bg-white focus:border-[#6A3FE6] transition-colors mb-6 placeholder-black/30"
              />

              <button className="w-[180px] py-3 rounded-[24px] bg-[#2a2a2a] hover:bg-black text-white font-bold text-[16px] shadow-sm transition-colors mb-8">
                Submit
              </button>

              <div className="w-full h-[1px] bg-black/5 mb-6"></div>

              <div className="w-full space-y-3">
                <button className="w-full py-4 rounded-2xl border-[1.5px] border-black/10 text-black font-semibold text-[15px] hover:bg-black/5 transition-colors flex items-center justify-between px-6">
                  <span>Convert Bonus</span>
                  <ChevronRight size={18} className="text-black/40" />
                </button>
                <button className="w-full py-4 rounded-2xl border-[1.5px] border-black/10 text-black/50 font-semibold text-[15px] bg-black/5 flex items-center justify-between px-6 cursor-not-allowed">
                  <div className="flex items-center gap-2">
                    <span>Buy Bonus</span>
                    <span className="text-[10px] uppercase font-bold bg-[#6A3FE6]/10 text-[#6A3FE6] px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-black/20" />
                </button>
              </div>
            </div>
          )}

          {/* RECORD - removed as it's now in MoneyPage */}
        </div>
      </div>
    </div>
  );
}
