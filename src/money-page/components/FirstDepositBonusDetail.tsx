import React, { useState } from "react";
import { ChevronLeft, User, Clock, Zap, X } from "lucide-react";

interface FirstDepositBonusDetailProps {
  onBack: () => void;
  isDesktop?: boolean;
  status?: "unclaimed" | "claimed" | "received" | "ineligible";
  userAccount?: string | null;
  onSignInClick?: () => void;
}

export function FirstDepositBonusDetail({
  onBack,
  isDesktop,
  status = "unclaimed",
  userAccount,
  onSignInClick,
}: FirstDepositBonusDetailProps) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  let buttonText = "Get Bonus";
  let bottomText = "Log in to claim 200 Gcoin Bonus";
  let buttonDisabled = false;

  if (userAccount) {
    bottomText = "Claim your 200 Gcoin Bonus"; // Default when logged in and unclaimed
    if (status === "claimed") {
      bottomText = "Bonus fully claimed, We will add it soon";
      buttonText = "Bonus fully claimed";
      buttonDisabled = true;
    } else if (status === "received") {
      bottomText = "You have already received the bonus.";
      buttonText = "Bonus received";
      buttonDisabled = true;
    } else if (status === "ineligible") {
      bottomText = "Sorry, you are not eligible for the bonus";
      buttonText = "Deposit";
      buttonDisabled = true;
    }
  }

  const handleButtonClick = () => {
    if (!userAccount && onSignInClick) {
      onSignInClick();
    } else if (userAccount) {
      setShowSuccessPopup(true);
    }
  };

  return (
    <div className={`h-[500px] w-full relative overflow-hidden ${isDesktop ? 'rounded-3xl' : 'rounded-2xl'}`}>
      <div className="flex flex-col h-full bg-[#EFA2BA] relative overflow-hidden">
        {/* Background Graphic / Header */}
      <div className="relative pt-6 pb-24 px-4 bg-gradient-to-b from-[#4A3289] to-[#EFA2BA] flex-shrink-0 flex flex-col items-center justify-center text-center">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors z-20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="relative z-10 mt-6">
          <h2 className="text-[32px] font-bold text-white leading-tight italic drop-shadow-md">
            New User Airdrop
          </h2>
          <p className="text-[16px] font-bold text-white mt-1 drop-shadow-md">
            Get 200 Gcoin ($20 USDC) Free
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32 -mt-16 relative z-10 custom-scrollbar">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-black/5 flex flex-col">
          <h3 className="text-center font-bold text-[#4A3289] text-[16px] mb-6">
            How to Claim
          </h3>
          <div className="flex justify-between items-center mb-8 px-2">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#F4F4F8] flex items-center justify-center shadow-inner">
                <User className="w-6 h-6 text-[#4A3289]" />
              </div>
              <span className="text-[12px] font-semibold text-[#4A3289]">
                Sign Up
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#F4F4F8] flex items-center justify-center shadow-inner">
                <Clock className="w-6 h-6 text-[#4A3289]" />
              </div>
              <span className="text-[12px] font-semibold text-[#4A3289]">
                Claim in 12h
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#F4F4F8] flex items-center justify-center shadow-inner">
                <Zap className="w-6 h-6 text-[#4A3289]" />
              </div>
              <span className="text-[12px] font-semibold text-[#4A3289]">
                Instant Win
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-black/10 pt-6">
            <h3 className="text-center font-bold text-[#4A3289] text-[16px] mb-4">
              Airdrop Bonus Details
            </h3>
            <ul className="text-[12px] text-[#4A3289]/80 space-y-3 leading-relaxed list-disc pl-4">
              <li>
                <span className="font-semibold text-[#4A3289]">
                  Eligibility:
                </span>{" "}
                New users only. Claim within 12 hours of signup (1 per device).
              </li>
              <li>
                <span className="font-semibold text-[#4A3289]">Usage:</span>{" "}
                Valid on Instant Win games only. Cannot be used on "Daily 4
                Game."
              </li>
              <li>
                <span className="font-semibold text-[#4A3289]">
                  Withdrawal:
                </span>{" "}
                Deposit & play requirements apply to cash out winnings.
              </li>
              <li>
                <span className="font-semibold text-[#4A3289]">Security:</span>{" "}
                Multi-accounts or abuse will result in immediate
                disqualification.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-black/5 px-6 py-4 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <p className="text-center text-[12px] text-black/60 mb-3">
          {bottomText}
        </p>
        <button
          className={`w-[120px] h-[40px] mx-auto rounded-full font-semibold text-[16px] transition-colors flex items-center justify-center ${
            buttonDisabled
              ? "bg-[#DED9EA] text-[#A49EBB] cursor-not-allowed"
              : "bg-[#5B4897] text-white hover:bg-[#4A3289]"
          }`}
          disabled={buttonDisabled}
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>

    {/* Success Popup */}
    {showSuccessPopup && (
      <div className="fixed inset-0 z-[1000] bg-black/60 flex flex-col items-center justify-center p-4 fade-in">
        <div className="bg-white rounded-[24px] w-[300px] p-6 flex flex-col items-center relative overflow-hidden shadow-2xl mt-[-60px]">
          {/* Coin Graphic */}
          <div className="w-[80px] h-[80px] rounded-full bg-[#F4C443] flex items-center justify-center relative mb-4 shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)]">
            <div className="w-[60px] h-[60px] rounded-full bg-[#E5B539]"></div>
            <div className="absolute inset-0 bg-white/20 transform rotate-45 pointer-events-none w-1/2 h-full"></div>
          </div>
          
          <h3 className="text-[20px] font-bold text-black mb-2 text-center">
            Congratulations!
          </h3>
          <p className="text-[14px] text-black/80 text-center mb-6">
            10 Gcoin bonus has been added.
          </p>
          
          <button 
            className="w-full h-[48px] bg-[#5B4897] hover:bg-[#4A3289] text-white rounded-full font-semibold text-[16px] transition-colors"
            onClick={() => setShowSuccessPopup(false)}
          >
            Go to play
          </button>
        </div>

        {/* Close Button */}
        <button 
          className="mt-8 w-[48px] h-[48px] bg-[#222222] rounded-full flex items-center justify-center hover:bg-[#333333] transition-colors"
          onClick={() => setShowSuccessPopup(false)}
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
    )}
    </div>
  );
}
