import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface WLPointRedeemProps {
  onBack: () => void;
  isDesktop?: boolean;
}

export function WLPointRedeem({ onBack, isDesktop }: WLPointRedeemProps) {
  const [amount, setAmount] = useState(30);

  const handleMinus = () => setAmount((prev) => Math.max(0, prev - 1));
  const handlePlus = () => setAmount((prev) => Math.min(1000, prev + 1));

  const content = (
    <div className={`flex flex-col h-full bg-[#f0f2f5] ${isDesktop ? "rounded-3xl border border-black/5" : "rounded-3xl border border-black/5"}`}>
      <div className="flex items-center justify-center px-4 py-6 shrink-0 relative">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors absolute left-4"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <div className="text-center">
          <h2 className="text-[18px] font-semibold text-black leading-tight mb-1">Redeem Points</h2>
          <div className="text-[13px] text-black/40">You have 53 Points</div>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[15px] font-semibold text-black leading-tight mb-1">Amount</div>
            <div className="text-[12px] text-black/40">Maximum 1000 Points</div>
          </div>
          <div className="flex items-center bg-black/5 rounded-full px-1 py-1">
            <button onClick={handleMinus} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-lg text-black/60 shrink-0">-</button>
            <input 
              type="text" 
              value={amount} 
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setAmount(Math.min(1000, val));
              }}
              className="w-12 text-center bg-transparent border-none outline-none font-semibold text-[15px] text-black" 
            />
            <button onClick={handlePlus} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-lg text-black/60 shrink-0">+</button>
          </div>
        </div>
        <div className="border-b border-black/5 mb-4"></div>
        <div className="text-[15px] font-semibold text-[#5B3E96] mb-8">
          {amount} Gcoin Bonus
        </div>

        <button 
          className="w-[180px] h-[44px] mx-auto bg-[#2A2A2A] text-white rounded-full font-semibold text-[15px] mt-auto hover:bg-[#1A1A1A] transition-colors flex items-center justify-center"
          onClick={onBack}
        >
          Redeem Now
        </button>
      </div>
    </div>
  );

  return (
    <div className={`w-full ${isDesktop ? 'h-full' : ''}`}>
      {content}
    </div>
  );
}
